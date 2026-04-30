"use server";

import { promises as fs } from "fs";
import path from "path";

const FILE = path.join(process.cwd(), "data", "bookings.json");

const OPEN_MIN = 8 * 60;
const CLOSE_MIN = 18 * 60;
const BOOKING_MIN = 4 * 60;
const SLOT_INCREMENT_MIN = 60;

type Slots = Record<string, string[]>;

async function read(): Promise<Slots> {
  try {
    const raw = await fs.readFile(FILE, "utf8");
    return JSON.parse(raw) as Slots;
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code === "ENOENT") return {};
    throw e;
  }
}

async function write(slots: Slots) {
  try {
    await fs.mkdir(path.dirname(FILE), { recursive: true });
    await fs.writeFile(FILE, JSON.stringify(slots, null, 2));
  } catch (e) {
    const code = (e as NodeJS.ErrnoException).code;
    if (code === "EROFS" || code === "EACCES" || code === "EPERM") {
      console.warn(
        `[bookings] read-only filesystem (${code}); skipping persistence`,
      );
      return;
    }
    throw e;
  }
}

function toMinutes(time: string): number | null {
  const m = /^(\d{2}):(\d{2})$/.exec(time);
  if (!m) return null;
  const h = Number(m[1]);
  const min = Number(m[2]);
  if (h < 0 || h > 23 || min < 0 || min > 59) return null;
  return h * 60 + min;
}

function overlaps(a: number, b: number) {
  return Math.abs(a - b) < BOOKING_MIN;
}

export async function getBookedSlots(): Promise<Slots> {
  return await read();
}

export async function tryReserveSlot(
  date: string,
  time: string,
): Promise<boolean> {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return false;
  const startMin = toMinutes(time);
  if (startMin === null) return false;
  if (startMin < OPEN_MIN || startMin + BOOKING_MIN > CLOSE_MIN) return false;
  if ((startMin - OPEN_MIN) % SLOT_INCREMENT_MIN !== 0) return false;

  const slots = await read();
  const existing = slots[date] ?? [];

  for (const t of existing) {
    const m = toMinutes(t);
    if (m !== null && overlaps(m, startMin)) return false;
  }

  slots[date] = [...existing, time].sort();
  await write(slots);
  return true;
}

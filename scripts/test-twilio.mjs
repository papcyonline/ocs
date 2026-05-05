import { readFileSync } from "node:fs";
import twilio from "twilio";

const env = Object.fromEntries(
  readFileSync(new URL("../.env.local", import.meta.url), "utf8")
    .split("\n")
    .filter((l) => l && !l.startsWith("#") && l.includes("="))
    .map((l) => {
      const i = l.indexOf("=");
      return [l.slice(0, i).trim(), l.slice(i + 1).trim()];
    }),
);

const sid = env.TWILIO_ACCOUNT_SID;
const token = env.TWILIO_AUTH_TOKEN;
const from = env.TWILIO_FROM;
const to = process.argv[2] || "+15023907925";

if (!sid || !token || !from) {
  console.error("Missing Twilio env vars in .env.local");
  process.exit(1);
}

const client = twilio(sid, token);
const body =
  "OCS Twilio test — wiring check. New OCS booking: Test Customer — deep cleaning on Tuesday, May 5, 2026, 9 AM – 1 PM. Phone: 555-555-5555.";

console.log(`Sending test SMS:      ${from} -> ${to}`);
console.log(`Sending test WhatsApp: whatsapp:${from} -> whatsapp:${to}`);
console.log("");

const results = await Promise.allSettled([
  client.messages.create({ from, to, body }).then((m) => ({
    label: "SMS",
    sid: m.sid,
    status: m.status,
  })),
  client.messages
    .create({ from: `whatsapp:${from}`, to: `whatsapp:${to}`, body })
    .then((m) => ({
      label: "WhatsApp",
      sid: m.sid,
      status: m.status,
    })),
]);

for (const r of results) {
  if (r.status === "fulfilled") {
    console.log(`OK    ${r.value.label.padEnd(8)} sid=${r.value.sid} status=${r.value.status}`);
  } else {
    const err = r.reason;
    const label = err?.moreInfo?.includes("whatsapp") ? "WhatsApp" : "send";
    console.log(`FAIL  ${label.padEnd(8)} code=${err?.code} status=${err?.status} msg=${err?.message}`);
  }
}

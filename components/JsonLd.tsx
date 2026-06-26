// Renders a JSON-LD <script> for structured data. Server component — the
// markup ships in the initial HTML so crawlers and answer engines read it
// without executing JavaScript.
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

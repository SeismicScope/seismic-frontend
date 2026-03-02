import type { Event, WithContext } from "schema-dts";

export function StructuredData({ ldJson }: { ldJson: WithContext<Event> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(ldJson),
      }}
    />
  );
}

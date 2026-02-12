import Link from "next/link";

type MapPopupProps = {
  magnitude: number;
  depth?: number;
  location?: string | null;
  occurredAt?: string | null;
  id?: string | null;
};

function MapPopup({
  magnitude,
  depth,
  location,
  occurredAt,
  id,
}: MapPopupProps) {
  const occurredAtDate = occurredAt
    ? new Date(occurredAt).toLocaleString()
    : "N/A";

  return (
    <div className="flex flex-col text-sm">
      <p className="text-foreground font-semibold">
        Magnitude: {magnitude ? magnitude : "N/A"}
      </p>
      <p className="text-foreground font-semibold">
        Depth: {depth ? depth : "N/A"}
      </p>
      <p className="text-foreground font-semibold">
        Location: {location ? location : "N/A"}
      </p>
      <p className="text-foreground font-semibold">Date: {occurredAtDate}</p>

      <Link
        href={`/earthquake/${id}`}
        className="mt-2 font-semibold text-blue-500 uppercase hover:opacity-60"
      >
        More info
      </Link>
    </div>
  );
}

export default MapPopup;

import Link from "next/link";

type MapPopupProps = {
  magnitude: number;
  depth?: number;
  location?: string | null;
  occuredAt?: string | null;
  id?: string | null;
};

function MapPopup({
  magnitude,
  depth,
  location,
  occuredAt,
  id,
}: MapPopupProps) {
  const occuredAtDate = occuredAt
    ? new Date(occuredAt).toLocaleString()
    : "N/A";

  return (
    <div className="flex flex-col text-sm">
      <p className="font-semibold">
        Magnitude: {magnitude ? magnitude : "N/A"}
      </p>
      <p className="font-semibold">Depth: {depth ? depth : "N/A"}</p>
      <p className="font-semibold">Location: {location ? location : "N/A"}</p>
      <p className="font-semibold">Date: {occuredAtDate}</p>

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

export function formatDate({
  dateStr,
  month = "short",
}: {
  dateStr: string;
  month?: "short" | "long";
}) {
  const date = new Date(dateStr);

  return date.toLocaleDateString("en-US", { year: "numeric", month });
}

export function formatDate(dateString: string): string {
  // Append time to avoid off-by-one day from UTC timezone shifts
  return new Date(dateString + "T00:00:00").toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

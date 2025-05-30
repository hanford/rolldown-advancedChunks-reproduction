/**
 * Format date in a user-friendly way
 */
export function formatDate(
  date: string | Date,
  format: "short" | "long" | "relative" = "short"
): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;

  if (format === "relative") {
    const now = new Date();
    const diffMs = now.getTime() - dateObj.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    return dateObj.toLocaleDateString();
  }

  return format === "long"
    ? dateObj.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : dateObj.toLocaleDateString();
}

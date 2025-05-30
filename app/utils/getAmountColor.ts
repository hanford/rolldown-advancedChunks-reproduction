/**
 * Get color class based on transaction amount (positive/negative)
 */
export function getAmountColor(amount: number): string {
  if (amount > 0) return "text-success-600";
  if (amount < 0) return "text-error-600";
  return "text-neutral-600";
}

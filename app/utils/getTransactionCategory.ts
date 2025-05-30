/**
 * Categorize transaction type and return icon + label
 */
export function getTransactionCategory(
  type: string,
  description?: string
): { icon: string; label: string; color: string } {
  const lowerType = type.toLowerCase();
  const lowerDesc = description?.toLowerCase() || "";

  if (lowerType.includes("deposit") || lowerType.includes("credit")) {
    return { icon: "💰", label: "Deposit", color: "text-success-600" };
  }

  if (lowerDesc.includes("grocery") || lowerDesc.includes("food")) {
    return { icon: "🛒", label: "Groceries", color: "text-warning-600" };
  }

  if (lowerDesc.includes("gas") || lowerDesc.includes("fuel")) {
    return { icon: "⛽", label: "Gas", color: "text-accent-600" };
  }

  if (lowerType.includes("transfer")) {
    return { icon: "🔄", label: "Transfer", color: "text-primary-600" };
  }

  return { icon: "💳", label: "Purchase", color: "text-neutral-600" };
}

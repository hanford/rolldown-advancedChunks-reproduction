/**
 * Mask account number for security (show last 4 digits)
 */
export function maskAccountNumber(accountNumber: string): string {
  if (accountNumber.length <= 4) return accountNumber;
  const masked = "*".repeat(accountNumber.length - 4);
  return masked + accountNumber.slice(-4);
}

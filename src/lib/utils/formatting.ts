/**
 * Formats a date in a consistent way between server and client
 * to avoid hydration errors.
 *
 * @param date The date to format (Date object or timestamp)
 * @param format The format to use ('short' or 'full')
 * @returns Formatted date string
 */
export function formatDate(
  date: Date | string | number,
  format: "short" | "full" = "short"
): string {
  const dateObj = date instanceof Date ? date : new Date(date);

  // Format: DD/MM/YYYY
  const day = dateObj.getDate().toString().padStart(2, "0");
  const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
  const year = dateObj.getFullYear();

  if (format === "short") {
    return `${day}/${month}/${year}`;
  }

  // Format: DD/MM/YYYY HH:MM
  const hours = dateObj.getHours().toString().padStart(2, "0");
  const minutes = dateObj.getMinutes().toString().padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

/**
 * Formats a number as currency with consistent output
 * between server and client to avoid hydration errors.
 *
 * @param amount The amount to format
 * @param currency The currency code ('VND' or 'USD')
 * @returns Formatted currency string
 */
export function formatCurrency(
  amount: number,
  currency: "VND" | "USD" = "VND"
): string {
  // For Vietnamese Dong (VND)
  if (currency === "VND") {
    return `${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} ₫`;
  }

  // For US Dollar (USD)
  return `$${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}

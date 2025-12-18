import { CURRENCY_SYMBOL } from "../constants";

export function formatCurrency(amount: number): string {
  return `${CURRENCY_SYMBOL}${amount.toLocaleString()}`;
}

export function formatNumber(num: number): string {
  return num.toLocaleString();
}

export function formatClassLevel(level: string): string {
  const lower = level.toLowerCase();
  if (lower === "ug" || lower === "pg") {
    return level.toUpperCase();
  }
  const num = Number(level);
  if (!Number.isNaN(num) && num >= 1 && num <= 12) {
    return `CLASS ${num}`;
  }
  return level;
}

export function pluralize(
  count: number,
  singular: string,
  plural?: string,
): string {
  if (count === 1) return singular;
  return plural || `${singular}s`;
}

export function formatMonthShort(date: Date = new Date()): string {
  return date.toLocaleString("en-US", { month: "short" });
}

export function formatFullDate(date: Date = new Date()): string {
  return date.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function getCurrentDayName(day?: number): string {
  const dayIndex = day ?? new Date().getDay();
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[dayIndex];
}

export function formatPercentage(value: number): number {
  return Math.round(value);
}

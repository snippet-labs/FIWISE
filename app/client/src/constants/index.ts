export const MONTHS_PER_YEAR = 12;

export const PAYMENT_STATUS = {
  FULL: 12,
  PARTIAL_MIN: 1,
  PARTIAL_MAX: 11,
  NONE: 0,
} as const;

export const ANIMATION_TIMINGS = {
  MONTH_CLICK: 300,
  MODAL_TRANSITION: 300,
} as const;

export const TOAST_DURATION = 3000;
export const DEBOUNCE_SEARCH = 250;

export const CLASS_LEVELS = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "UG",
  "PG",
] as const;

export const CLASS_ORDER_MAP = Object.fromEntries(
  CLASS_LEVELS.map((cls, idx) => [cls.toLowerCase(), idx]),
);

export const CURRENCY_SYMBOL = "₹";

export const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

export const DAYS_FULL = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

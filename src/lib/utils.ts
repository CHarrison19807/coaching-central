import { Coach, ReplayOfTheWeek, TankOfTheWeek } from "@/payload-types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(
  price: number | string,
  options: {
    currency?: "USD" | "EUR" | "GBP" | "BDT";
    notation?: Intl.NumberFormatOptions["notation"];
  } = {}
) {
  const { currency = "USD", notation = "compact" } = options;

  const numericPrice = typeof price === "string" ? parseFloat(price) : price;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    notation,
    maximumFractionDigits: 2,
  }).format(numericPrice);
}

export function getValidUrls(
  quantity: number,
  item: ReplayOfTheWeek | TankOfTheWeek | Coach
) {
  // TODO: Add support for multiple images
  if (quantity === 1) {
    return (
      item.image
        ? typeof item.image === "number"
          ? item.image
          : item.image.url
        : null
    ) as string;
  }
}

/**
 * lib/cn.ts
 *
 * className combiner. Always use this instead of string concatenation or
 * template literals so Tailwind class conflicts are resolved deterministically.
 *
 *   import { cn } from "@/lib/cn";
 *   <button className={cn("bg-gold text-midnight", isLarge && "px-8")} />
 */

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

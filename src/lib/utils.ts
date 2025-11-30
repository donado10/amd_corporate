import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { sha256 } from "js-sha256";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function hashString(str: string) {
  const input = str + Date.now();
  const hash = sha256(input);
  console.log(hash);
  return hash;
}

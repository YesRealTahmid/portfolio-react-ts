import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Define the type of the 'inputs' parameter as a rest parameter that takes any number of strings or objects.
export function cn(...inputs: (string | undefined | false | null | Record<string, any>)[]): string {
    return twMerge(clsx(inputs));
}

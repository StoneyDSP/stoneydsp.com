import { isString } from "../isString";
import { toUpperCase } from "./toUpperCase";

/**
 * ---
 *
 * Converts the first alphabetic character in a string to uppercase. Leaves all
 * other characters unchanged.
 *
 * ---
 *
 * @example
 * ```ts
 * const myString: "Only uppercase" = capitalize("only uppercase")
 * ```
 *
 * ---
 *
 * @template {string} S
 * @param {S} str
 * @returns {Capitalize<S>}
 */
export function capitalize<S extends string>(str: S): Capitalize<S> {
  if (!isString(str))
    throw new Error(`capitalize() expected a string; recieved a ${typeof str}`);
  return (toUpperCase(str[0]!) + str.slice(1)) as Capitalize<typeof str>;
}

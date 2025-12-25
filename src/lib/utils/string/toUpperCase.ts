import { isString } from "../isString";

/**
 * ---
 *
 * Converts all the alphabetic characters in a string to uppercase.
 *
 * ---
 *
 * @example
 * ```ts
 * const myString: "ALWAYS UPPERCASE" = toUpperCase("Always Uppercase")
 * ```
 *
 * ---
 *
 * @template {string} S
 * @param {S} str
 * @returns {Uppercase<S>}
 */
export function toUpperCase<S extends string>(str: S): Uppercase<S> {
  if (!isString(str))
    throw new Error(
      `toLowerCase() expected a string; recieved a ${typeof str}`
    );
  return str.toUpperCase() as Uppercase<typeof str>;
}

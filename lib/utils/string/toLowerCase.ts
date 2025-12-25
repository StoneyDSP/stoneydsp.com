import { isString } from "../isString";

/**
 * ---
 *
 * Converts all the alphabetic characters in a string to lowercase.
 *
 * ---
 *
 * @example
 * ```ts
 * const myString: "always lowercase" = toLowerCase("Always lowercase")
 * ```
 *
 * ---
 *
 * @template {string} S
 * @param {S} str
 * @returns {Lowercase<S>}
 */
export function toLowerCase<S extends string>(str: S): Lowercase<S> {
  if (!isString(str))
    throw new Error(
      `toLowerCase() expected a string; recieved a ${typeof str}`
    );
  return str.toLowerCase() as Lowercase<typeof str>;
}

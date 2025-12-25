import { isString } from "../isString";
import { toLowerCase } from "./toLowerCase";

/**
 * ---
 *
 * Converts the first alphabetic character in a string to lowercase. Leaves all
 * other characters unchanged.
 *
 * ---
 *
 * @example
 * ```ts
 * const myString: "only lowercase" = uncapitalize("Only lowercase")
 * ```
 *
 * ---
 *
 * @template {string} S
 * @param {S} str
 * @returns {Uncapitalize<S>}
 */
export function uncapitalize<S extends string>(str: S): Uncapitalize<S> {
  if (!isString(str))
    throw new Error(
      `uncapitalize() expected a string; recieved a ${typeof str}`
    );
  return (toLowerCase(str[0]!) + str.slice(1)) as Uncapitalize<typeof str>;
}

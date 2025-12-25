/**
 * ---
 *
 * Prevents the modification of existing property attributes and values, and
 * prevents the addition of new properties.
 *
 * ---
 *
 * @example
 * ```ts
 * type MyObject = {
 *   bool: true;
 *   num: 3.14,
 *   str: "my string";
 * };
 *
 * const myObject: Readonly<MyObject> = freezeObject<MyObject>({
 *   bool: true,
 *   num: 3.14,
 *   str: "my string"
 * });
 * ```
 *
 * ---
 *
 * @example
 * ```ts
 * const myObject: Readonly<{
 *   bool: true;
 *   num: 3.14,
 *   str: "my string";
 * }> = freezeObject({
 *   bool: true,
 *   num: 3.14,
 *   str: "my string"
 * });
 * ```
 *
 * ---
 *
 * @template [T]
 * @param {T | null} obj
 * @returns {Readonly<T | null>}
 */

// export function freezeObject<T extends Function>(f: T): T;
// export function freezeObject<
//   T extends { [idx: string]: U | null | undefined | object },
//   U extends string | bigint | number | boolean | symbol,
// >(o: T): Readonly<T>;
export function freezeObject<T>(obj: T | null): Readonly<T | null> {
  return Object.freeze(obj);
}

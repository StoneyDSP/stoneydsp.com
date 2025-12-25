/**
 * ---
 *
 * Creates an object that has the specified prototype or that has `null`
 * prototype.
 *
 * ---
 *
 * @example
 * ```ts
 * const myObject = createObject<{
 *   bool: boolean;
 *   num: number;
 *   str: string;
 * }>({
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
 * type MyObject = {
 *   bool: boolean;
 *   num: number;
 *   str: string;
 * };
 *
 * const myObject: MyObject = createObject<MyObject>({
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
 * const myObject: {
 *   bool: boolean;
 *   num: number;
 *   str: string;
 * } = createObject({
 *   bool: true,
 *   num: 3.14,
 *   str: "my string"
 * });
 * ```
 *
 * ---
 *
 * @template {object} [T=object] Can either accept a typed object, or infer a type from the passed-in object.
 * @param {T | null} obj
 * @returns {T}
 */
export function createObject<T extends object = object>(obj: T | null): T {
  return Object.create(obj) as T;
}

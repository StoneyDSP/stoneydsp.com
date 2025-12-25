export function isBigInt(val: unknown): val is bigint {
  return typeof val === "bigint";
}

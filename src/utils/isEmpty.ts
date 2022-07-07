export function isEmpty(value: unknown): value is undefined | null {
  return value === null || value === undefined;
}

export function isBool(value: unknown): value is boolean {
  return value === true || value === false;
}

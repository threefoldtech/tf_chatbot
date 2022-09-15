export function isBool(value: unknown): value is boolean {
  return value === true || value === false;
}

export function isEmpty(value: unknown): value is undefined | null {
  return value === null || value === undefined;
}

export function objectToQueryString(obj: Record<string, any>): string {
  return Object.entries(obj)
    .filter(([_, value]) => value !== null && value !== undefined)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
}
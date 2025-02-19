export function objectToQueryString(obj: Record<string, any>): string {
  return Object.entries(obj)
    .filter(([_, value]) => value !== null && value !== undefined && value!='')
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
}
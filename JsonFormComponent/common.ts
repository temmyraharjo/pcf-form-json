export function convertToJson<T>(value: string | null) {
  try {
    return JSON.parse(value || '') as T;
  } catch {
    return {} as T;
  }
}

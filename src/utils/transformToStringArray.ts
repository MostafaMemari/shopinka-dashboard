export function transformToStringArray(originalValue: unknown): string[] {
  if (Array.isArray(originalValue)) {
    return originalValue
      .filter((v): v is string => typeof v === 'string')
      .map(v => v.trim())
      .filter(v => v.length > 0)
  }

  if (typeof originalValue === 'string') {
    return originalValue
      .split(',')
      .map(v => v.trim())
      .filter(v => v.length > 0)
  }

  return []
}

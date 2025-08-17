export function isEqual<T, U>(a: T, b: U): boolean {
  if (a === null || a === undefined || b === null || b === undefined) {
    return (a as any) === (b as any)
  }

  if (typeof a !== typeof b) {
    return false
  }

  if (typeof a === 'string' || typeof a === 'number' || typeof a === 'boolean') {
    return (a as any) === (b as any)
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) {
      return false
    }

    return a.every((item, index) => isEqual(item, b[index]))
  }

  if (typeof a === 'object' && typeof b === 'object') {
    const keysA = Object.keys(a as object)
    const keysB = Object.keys(b as object)

    if (keysA.length !== keysB.length) {
      return false
    }

    return keysA.every(key => isEqual((a as any)[key], (b as any)[key]))
  }

  return false
}

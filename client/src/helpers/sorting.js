export const sortUp = (firstKey, secondKey) => {
  if (secondKey === '' || secondKey === undefined) {
    return (a, b) => {
      const x =
        typeof a[firstKey] === 'string'
          ? a[firstKey].toString().toLowerCase()
          : parseFloat(a[firstKey])
      const y =
        typeof b[firstKey] === 'string'
          ? b[firstKey].toString().toLowerCase()
          : parseFloat(b[firstKey])
      if (x < y) {
        return -1
      }
      if (x > y) {
        return 1
      }
      return 0
    }
  }
  return (a, b) => {
    const x =
      typeof a[firstKey][secondKey] === 'string'
        ? a[firstKey][secondKey].toString().toLowerCase()
        : parseFloat(a[firstKey][secondKey])
    const y =
      typeof b[firstKey][secondKey] === 'string'
        ? b[firstKey][secondKey].toString().toLowerCase()
        : parseFloat(b[firstKey][secondKey])
    if (x < y) {
      return -1
    }
    if (x > y) {
      return 1
    }
    return 0
  }
}

export const sortDown = (firstKey, secondKey) => {
  if (secondKey === '' || secondKey === undefined) {
    return (a, b) => {
      const x =
        typeof a[firstKey] === 'string'
          ? a[firstKey].toString().toLowerCase()
          : parseFloat(a[firstKey])
      const y =
        typeof b[firstKey] === 'string'
          ? b[firstKey].toString().toLowerCase()
          : parseFloat(b[firstKey])
      if (x < y) {
        return 1
      }
      if (x > y) {
        return -1
      }
      return 0
    }
  }
  return (a, b) => {
    const x =
      typeof a[firstKey][secondKey] === 'string'
        ? a[firstKey][secondKey].toString().toLowerCase()
        : parseFloat(a[firstKey][secondKey])
    const y =
      typeof b[firstKey][secondKey] === 'string'
        ? b[firstKey][secondKey].toString().toLowerCase()
        : parseFloat(b[firstKey][secondKey])
    if (x < y) {
      return 1
    }
    if (x > y) {
      return -1
    }
    return 0
  }
}

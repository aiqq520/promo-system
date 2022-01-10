import utils from './utils'

export function looseEqual(a, b) {
  if (a === b) return true
  const isObjectA = isObject(a)
  const isObjectB = isObject(b)
  if (isObjectA && isObjectB) {
    try {
      const isArrayA = Array.isArray(a)
      const isArrayB = Array.isArray(b)
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every((e, i) => {
          return looseEqual(e, b[i])
        })
      } else if (!isArrayA && !isArrayB) {
        const keysA = Object.keys(a)
        const keysB = Object.keys(b)
        return keysA.length === keysB.length && keysA.every(key => {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

export function filterSearchObj(searchObj = {}) {
  const filter = function filterEmptySearchValue(value) {
    if (utils.isArray(value)) {
      if (value.length === 0) {
        return false
      }
    } else {
      return value !== '' && value !== undefined && value !== null
    }
    return true
  }

  const result = {}

  for (let k in searchObj) {
    const v = searchObj[k]
    if (filter(v)) {
      result[k] = v
    }
  }

  return result
}

export default {
  looseEqual,
  filterSearchObj
}

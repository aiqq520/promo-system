function isObject(obj) {
  return obj !== null && typeof obj === 'object'
}

function isArray(target) {
  return Object.prototype.toString.call(target) === '[object Array]'
}

export default {
  isObject,
  isArray
}

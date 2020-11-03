const contains = function (other) {
  if (arguments.length < 1) {
    throw new TypeError('1 argument is required')
  }
  if (typeof other !== 'object') {
    throw new TypeError('Argument 1 (”other“) to Node.contains must be an instance of Node')
  }

  let node = other
  do {
    if (this === node) {
      return true
    }
    if (node) {
      node = node.parentNode
    }
  } while (node)

  return false
}

export default function registerDocumentContainsPolyfill () {
  // tslint:disable-next-line
  if (typeof document === 'object' && typeof document.contains !== 'function') {
    Object.getPrototypeOf(document).contains = contains
  }
}

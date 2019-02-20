module.exports = function check(str = '', bracketsConfig = []) {
    const data = str.split('')
    let heap = []

    const result = data.every(item => {
      if (isSameBrakets(item, bracketsConfig) && item === heap[heap.length-1]) {
        heap.pop()
        return true
      }
      if (isOpeningBraket(item, bracketsConfig)) {
        heap.push(item)
        return true
      }
      return isClosingBraket(item, heap.pop(), bracketsConfig)
    })

    return heap.length ? false : result
}

const isSameBrakets = (braket, config) => {
  return config.some(([opening, closing]) => {
    return opening === braket && closing === braket
  })
}

const isOpeningBraket = (opening, config) => {
  return config.some(element => element[0] === opening)
}

const isClosingBraket = (closing, opening, config) => {
  return config.some(element => element[0] === opening && element[1] === closing)
}

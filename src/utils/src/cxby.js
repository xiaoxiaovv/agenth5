/**
 * 判断非空对象的value是否存在空字符串
 *
 * @param {*} obj         对象
 * @returns               true/false
 */
function hasEmptyStrValueOfObject (obj) {
  if (typeof obj !== 'object') {
    return
  }
  let keys = Object.keys(obj)
  if (!keys.length) {
    return
  }
  let values = Object.values(obj)
  values = values.map(item => {
    if (typeof item === 'string') {
      item = item.trim()
    }
    return item
  })
  return (values.indexOf('') !== -1)
}

/**
 * 判断是否为空对象
 *
 * @param {*} obj       对象
 * @returns             true/false
 */
function isEmptyObject (obj) {
  if (typeof obj !== 'object') {
    return
  }
  let keys = Object.keys(obj)
  return keys.length === 0
}

// 银行卡号用*代替
 const cardFilter = (num) => {
  if (num) {
    return '****  ****  ****  ' + num.substring(num.length - 4);
  }
}
export default {
  hasEmptyStrValueOfObject,
  isEmptyObject,
  cardFilter
}

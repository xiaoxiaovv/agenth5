/**
 * 身份证号码验证
 * @param {*} ID
 * @returns {Boolean}
 */
export const validID = (ID) => {
  // let reg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|31)|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}([0-9]|x|X)$/
  let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  return ID && reg.test(ID)
}

/**
 * 手机号和固话号码验证
 * @param {*} phone
 * @returns {Boolean}
 */
export const validPhoneOrMobild = (phone) => {
  // let reg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|31)|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}([0-9]|x|X)$/
  let isPhone = /^([0-9]{3,4}-)?[0-9]{7,8}$/
  let isMobile = /^[0-9][0-9][0-9]{9}$/
  if (isMobile.test(phone) || isPhone.test(phone)) {
    return true
  } else {
    return false
  }
  // return phone && reg.test(phone)
}
/**
 * 手机号号码验证
 * @param {*} phone
 * @returns {Boolean}
 */
export const validPhone = (phone) => {
  // let reg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|31)|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}([0-9]|x|X)$/
  let isMobile = /^[1][0-9][0-9]{9}$/
  if (isMobile.test(phone)) {
    return true
  } else {
    return false
  }
  // return phone && reg.test(phone)
}

export default class Validator {
  constructor (reg, msg) {
    this.reg = reg
    this.msg = msg
  }
  reg = null
  msg = ''
  valid (value) {
    return this.reg.test(value)
  }
  // 将reg的值替换为sign
  replace (value, sign) {
    return String(value).replace(this.reg, sign)
  }
}

// 密码
export const passwordValid = new Validator(
  /^[\d|\w|_]{6,16}$/,
  '密码必须为6-16位字母、数字、下划线'
)

// 邮箱验证
export const emailValid = (email) => {
  const isEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  if (isEmail.test(email)) {
    return true
  } else {
    return false
  }
}

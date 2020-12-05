import {
  storage
} from 'vma-vue-assist'
import * as names from './names'
/**
    property
      name        [String] 名称
      encrypt     [Boolean] 存储时是否加密
      namespace   [String|Function] 命名空间，存储时会添加命名空间
    method
      set(data)             [any] 存储数据
      get()                 [void]  取数据
      setByNamespace(data)  [any] 添加命名空间存储数据
      getByNamespace()      [void]  读取命名空间下的数据
      remove()              [void]  删除存储的数据
 */

export const demoLocal = new storage.LocalItem({
  name: names.DEMO
})

/**
 * 用户登录信息
 * 用户名，用户密码
 * @type {storage.LocalItem}
 */
export const loginInfoLocal = new storage.LocalItem({
  name: names.LOGIN_INFO
})

/**
 * 用户登录信息
 * 登录后的信息
 * @type {storage.LocalItem}
 */
export const afterLoginInfoLocal = new storage.LocalItem({
  name: names.AFTER_LOGIN_INFO
})

/**
 * 用户登录信息
 * 是否显示底部
 * @type {storage.LocalItem}
 */
export const isShowFooterLocal = new storage.LocalItem({
  name: names.IS_SHOW_FOOTER
})

export const clientInfoDetailIDLocal = new storage.SessionItem({
  name: names.CLIENT_INFO_DETAIL_ID
})

export const clientInfoDetailLocal = new storage.SessionItem({
  name: names.CLIENT_INFO_DETAIL
})

export const clientInfoDetailMerchantNameLocal = new storage.SessionItem({
  name: names.CLIENT_INFO_DETAIL_MERCHANT_NAME
})

export const fromReactNativeLocal = new storage.LocalItem({
  name: names.FROM_REACT_NATIVE
})

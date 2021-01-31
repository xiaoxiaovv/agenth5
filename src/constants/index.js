import { clientInfoApi } from '@/api'
export const SEX_MAN = 1
export const SEX_MALE = 2

const PROCESS_NAME = {
  SXF: '随行付',
  WX: '官方',
  LS: '乐刷',
  YS: '威富通', // 原名：银盛
  CH: '传化',
  ZFB: '官方',
  FY: '富友',
  LKL: '拉卡拉',
  sjPos: '手机pos',
  KDB: '开店宝'
}
let PROCESS = {
  SXF: false,
  WX: false,
  LS: false,
  YS: false,
  CH: false,
  ZFB: false,
  FY: false,
  LKL: false,
  sjPos: false,
  KDB:false
}

// 通道开启状态
export async function getProcess() {
  await clientInfoApi.getStatus().then(res => {
    let result = res.obj
    console.log('result', result)
    for (let key in PROCESS) {
      PROCESS[key] = result.includes(PROCESS_NAME[key])
    }
  })
  return PROCESS
}

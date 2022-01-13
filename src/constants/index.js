import { clientInfoApi } from '@/api'
export const SEX_MAN = 1
export const SEX_MALE = 2

const PROCESS_NAME = {
  //所有字母必须大写
  SXF: '天阙随行付',
  WX: '官方',
  LS: '乐刷',
  YS: '银盛',
  CH: '传化',
  ZFB: '官方',
  FY: '富友',
  LKL: '拉卡拉',
  SJPOS: '手机pos',
  KDB: '开店宝',
  CJ:'畅捷支付',
  YIS:'易生',
  MF:'敏付'
}
let PROCESS = {
  //所有字母必须大写
  SXF: false,
  WX: false,
  LS: false,
  YS: false,
  CH: false,
  ZFB: false,
  FY: false,
  LKL: false,
  SJPOS: false,
  KDB:false,
  CJ:false,
  YIS:false,
  MF:false
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

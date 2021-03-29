import { close } from 'muse-ui-toast';
import { isProd } from '../../config';
<template>
  <div class="commission-apply frame-container box align-default">

    <!-- 补白 -->
    <!--    <div class="commission-apply__padding"></div>-->

    <!-- 导航栏 -->
    <div class="commission-apply__nav align-hor-bet box plr-40 ">
      <!--      <div class="pass"></div>-->
      <div class="icon iconfont iconreturn" @click="$router.back(-1)"></div>
      <div class="title">提现管理</div>
      <div class="search"
           @click="">
        <!-- <img
          class="match-parent iconfont iconsearch"/> -->
      </div>
    </div>

    <div class="pandect-data">
      <div class="text-left pl-30 commission-apply__title">
        <p class="title-text">未提现分润</p>
        <p class="money mt-2"><span>¥</span><span>5000000000</span></p>
      </div>

    </div>




    <!-- 数据列表 -->
    <div class="commission-apply__content ">
     <!-- <div class="client-info-detail__content box match-left-space">

        <div class="match-width box align-default">


          <div class="item"
               style="color:red;background:#fff;border-bottom:none;"
               v-if="Number(detail.businessType) === 1">请填写对公账户信息</div>
          <div class="item"
               style="color:red;background:#fff;border-bottom:none;"
               v-else>请填写法人银行卡信息</div>
          <div class="item">
            <div class="subtitle">
              <span class="star">*</span>开户总行银行
            </div>
            &lt;!&ndash; <div class="match-left-space align-right">
              <div class="input align-right"
                   @click="callActionSheet('bank')">
                <div>{{detail.bnkCdName}}</div>
                <div class="icon iconfont iconenter ml-10"></div>
              </div>
            </div> &ndash;&gt;
            <div class="match-left-space align-right">
              <div class="input align-right">
                <input placeholder="例：上海浦东发展银行"
                       v-model="detail.bnkCdName" />
              </div>
            </div>
          </div>
          <div class="item">
            <div class="subtitle">
              <span class="star">*</span>开户支行所在省行政
            </div>
            <div class="match-left-space align-right">
              <div class="input align-right"
                   @click="callActionSheet('province')">
                <div>{{detail.lbnkProvName}}</div>
                <div class="icon iconfont iconenter ml-10"></div>
              </div>
            </div>
          </div>
          <div class="item">
            <div class="subtitle">
              <span class="star">*</span>开户支行所在市行政
            </div>
            <div class="match-left-space align-right">
              <div class="input align-right"
                   @click="callActionSheet('city')">
                <div>{{detail.lbnkCityName}}</div>
                <div class="icon iconfont iconenter ml-10"></div>
              </div>
            </div>
          </div>
          <div class="item">
            <div class="subtitle">
              <span class="star">*</span>开户行所在支行
            </div>
            <div class="match-left-space align-right">
              <div class="input align-right"
                   @click="callActionSheet('branch')">
                <div>{{detail.lbnkNoName}}</div>
                <div class="icon iconfont iconenter ml-10"></div>
              </div>
            </div>
          </div>
          <div class="item">
            <div class="subtitle">
              <span class="star">*</span>开户名称
            </div>
            <div class="match-left-space align-right">
              <div class="input align-right">
                <input placeholder="请输入内容"
                       v-model="detail.accountHolder" />
              </div>
            </div>
          </div>
          <div class="item">
            <div class="subtitle">
              <span class="star">*</span>开户账号
            </div>
            <div class="match-left-space align-right">
              <div class="input align-right">
                <input placeholder="请输入内容"
                       v-model="detail.accountNumber" />
              </div>
            </div>
          </div>
          <div class="item">
            <div class="subtitle">
              <span class="star">*</span>开户预留手机号
            </div>
            <div class="match-left-space align-right">
              <div class="input align-right">
                <input placeholder="请输入内容"
                       v-model="detail.bankPhone" />
              </div>
            </div>
          </div>
        </div>
        <div class="match-width box align-center">
          <div class="next box align-center"
               @click="openAlertDialog">
            下一步
          </div>
        </div>

        &lt;!&ndash; action-sheet 编码 &ndash;&gt;
        <mu-bottom-sheet :open.sync="open">
          <div class="action-sheet box align-default">

            <div class="title box align-hor-bet plr-30">
              <div @click="onActionSheetClose">
                返回
              </div>
              <div class="confirm"
                   @click="onActionSheetConfirm">
                确定
              </div>
            </div>
            <div class="input-wrap plr-60">
              <i class="iconfont iconsearch pre-icon"></i>
              <input v-model="keyword"
                     class="input"
                     :placeholder="codeType === 'branch'?'例：浦发银行北京富丰路支行':'请输入关键字搜索'"
                     @keyup.enter="handleSearch" />
            </div>
            <div class="max-sheet-height">
              &lt;!&ndash; 银行编码 &ndash;&gt;
              <div class="match-width"
                   v-for="(item, index) in searchResultList"
                   :key="index"
                   v-if="codeType === 'bank'">
                <div :class="['item align-hor-bet plr-30 ptb-30', item.bnkCode==curBnkCode?'active':'']"
                     @click="changeItem(item)">
                  <div class="flex-1">
                    <div>{{item.bnkName}}</div>
                    <div>{{item.bnkCode}}</div>
                  </div>
                  <div v-if="item.bnkCode==curBnkCode"
                       class="icon iconfont iconcheck">
                  </div>
                  <div class="pass"
                       v-else></div>
                </div>
              </div>
              &lt;!&ndash; 省编码 &ndash;&gt;
              <div class="match-width"
                   v-for="(item, index) in searchResultList"
                   :key="index"
                   v-if="codeType === 'province'">
                <div :class="['item align-hor-bet plr-30 ptb-30', item.provinceCode==curProvinceCode?'active':'']"
                     @click="changeItem(item)"
                     style="height:auto;">
                  <div class="flex-1">
                    <div>{{item.provinceName}}</div>
                    &lt;!&ndash; <div>{{item.provinceCode}}</div> &ndash;&gt;
                  </div>
                  <div v-if="item.provinceCode==curProvinceCode"
                       class="icon iconfont iconcheck">
                  </div>
                  <div class="pass"
                       v-else></div>
                </div>
              </div>
              &lt;!&ndash; 市编码 &ndash;&gt;
              <div class="match-width"
                   v-for="(item, index) in searchResultList"
                   :key="index"
                   v-if="codeType === 'city'">
                <div :class="['item align-hor-bet plr-30 ptb-30', item.cityCode==curCityCode?'active':'']"
                     @click="changeItem(item)"
                     style="height:auto;">
                  <div class="flex-1">
                    <div>{{item.cityName}}</div>
                    &lt;!&ndash; <div>{{item.cityCode}}</div> &ndash;&gt;
                  </div>
                  <div v-if="item.cityCode==curCityCode"
                       class="icon iconfont iconcheck">
                  </div>
                  <div class="pass"
                       v-else></div>
                </div>
              </div>
              &lt;!&ndash; 支行编码 &ndash;&gt;
              <div class="match-width"
                   v-for="(item, index) in searchResultList"
                   :key="index"
                   v-if="codeType === 'branch'">
                <div :class="['item align-hor-bet plr-30 ptb-30', item.lbnkNo==curBranchCode?'active':'']"
                     @click="changeItem(item)"
                     style="height:auto;">
                  <div class="flex-1">
                    <div>{{item.lbnkNm}}</div>
                    <div>{{item.lbnkNo}}</div>
                  </div>
                  <div v-if="item.lbnkNo==curBranchCode"
                       class="icon iconfont iconcheck">
                  </div>
                  <div class="pass"
                       v-else></div>
                </div>
              </div>
            </div>
            &lt;!&ndash; 补脚 &ndash;&gt;
            <div class="action-sheet__padding"></div>

          </div>
        </mu-bottom-sheet>

        &lt;!&ndash; action-sheet &ndash;&gt;
        <mu-bottom-sheet :open.sync="openMenu">
          <div class="action-sheet box align-default menu">

            <div class="item align-center"
                 @click="onTakePhoto(1)">
              拍照
            </div>

            <div class="item align-center"
                 @click="onTakePhoto(2)">
              从手机相册选择
            </div>

            <div class="item align-center cancel"
                 @click="onActionMenuShow(2)">
              取消
            </div>

            &lt;!&ndash; 补脚 &ndash;&gt;
            <div class="action-sheet__padding"></div>

          </div>
        </mu-bottom-sheet>
        &lt;!&ndash; 隐藏获取图片 &ndash;&gt;
        <div class="file">
          <input type="file"
                 ref="fileCamera"
                 capture="camera"
                 accept="image/*"
                 @change="onFileChange" />
          <div class="cover"></div>
        </div>
        &lt;!&ndash; 隐藏获取图片 &ndash;&gt;
        <div class="file">
          <input type="file"
                 ref="file"
                 accept="image/*"
                 @change="onFileChange" />
          <div class="cover"></div>
        </div>

      </div>-->
    </div>
    <div class="commission-apply__out-login center-flex">
      <p @click="commissionApplyAuth">提交申请</p>
    </div>
    <!--<div class="commission-apply__out-login center-flex">
      <p @click="commissionApplyCommit">获取token</p>
    </div>-->
    <!-- 补脚 -->
    <!--    <div class="commission-apply__footer"></div>-->

  </div>
</template>

<script>
// clientInfoDetailIDLocal
import { afterLoginInfoLocal } from '@/storage'
import { commissionApi } from '@/api'
import { isProd } from '@/config'
// CLIENT_INFO_DETAIL
import { CLIENT_INFO_DETAIL, CLIENT_INFO_RECORD } from '@/router/types'
import VmaNoData from '@/components/common/vmaNoData'
import {passwordValid} from "../../../utils";
export default {

  data() {
    return {
    }
  },
  /*beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.refresh()
    })
  },*/
  mounted() {
    // TODO
    console.log('============================111')

    // this.getMerchantList()
  },
  methods: {
    commissionApplyAuth(){
      let params = {
        password:'123456'
      }
  commissionApi.commissionApplyAuth(params).then(res=>{
    if(res.code === 200){
      let params = {
        validCode:res.obj,
        accountType:'3',
        applyAmount:'1'

      }
      commissionApi.commissionApplyCommit(params).then(res=>{
        if(res.code === 200){

        }else {
          if (res && res.msg) {
            this.$toast.error(res.msg)
          }
        }
      })
    }else{
      if (res && res.msg) {
        this.$toast.error(res.msg)
      }
    }

  })
    },
    commissionApplyCommit(){
      commissionApi.commissionApplyCommit()
    }

  },

  filters: {

  }
}
</script>

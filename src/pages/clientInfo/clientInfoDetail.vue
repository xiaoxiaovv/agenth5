<template>
  <div class="client-info-detail frame-container box align-default">
    <!-- 补白 -->
    <div class="client-info-detail__padding"></div>
    <!-- 导航栏 -->
    <div class="client-info-detail__nav box plr-30 align-hor-bet">
      <div class="icon iconfont iconreturn"
           @click="onBack"></div>
      <div class="title">{{detail.merchantName}}</div>
      <div class="text"
           v-if="isEdit"
           @click="toEdit">录入资料</div>
      <div class="text"
           v-else></div>
    </div>

    <!-- 信息主体 -->
    <div class="client-info-detail__content box match-left-space pb-40">
      <mu-container>
        <mu-tabs :value.sync="active"
                 @change="handleTab">
          <mu-tab v-for="(item, index) in tabList"
                  :key="index"
                  v-show="item.open">{{item.name}}</mu-tab>
          <!-- <mu-tab>基本材料</mu-tab>
          <mu-tab>随行付</mu-tab>
          <mu-tab>微信</mu-tab>
          <mu-tab>支付宝</mu-tab>
          <mu-tab>乐刷</mu-tab>
          <mu-tab>威富通</mu-tab>
          <mu-tab>传化</mu-tab> -->
        </mu-tabs>
        <div class="demo-text"
             v-if="active === 0">
          <div class="client-info-detail__content box match-left-space pb-40">
            <div class="match-width box align-default">
              <div class="item">
                <div class="subtitle">法人/经营者身份证正面</div>
                <div class="match-left-space align-right ellipsis">
                  <div v-if="detail.epresentativePhotoId"
                       @click="previewImage(detail.epresentativePhotoId)">
                    <img class="match-parent"
                         :src="detail.epresentativePhotoId | loadImage" />
                  </div>
                </div>
              </div>
              <div class="item">
                <div class="subtitle">法人/经营者身份证反面</div>
                <div class="match-left-space align-right ellipsis">
                  <div v-if="detail.epresentativePhotoId2"
                       @click="previewImage(detail.epresentativePhotoId2)">
                    <img class="match-parent"
                         :src="detail.epresentativePhotoId2 | loadImage" />
                  </div>
                </div>
              </div>
              <div class="item">
                <div class="subtitle">姓名</div>
                <div class="match-left-space align-right">{{detail.representativeName}}</div>
              </div>
              <div class="item">
                <div class="subtitle">身份证号码</div>
                <div class="match-left-space align-right">{{detail.certificateNum}}</div>
              </div>
              <div class="item">
                <div class="subtitle">有效期</div>
                <div class="match-left-space align-right">{{detail.startCertificateTime}}~{{detail.endCertificateTime==='2099-12-31'?'长期':detail.endCertificateTime}}</div>
              </div>
              <div class="item">
                <div class="subtitle">法人手机号</div>
                <div class="match-left-space align-right">{{detail.legalPersonPhone}}</div>
              </div>
              <div class="item">
                <div class="subtitle">营业执照（小微商户请忽略）</div>
                <div class="match-left-space align-right ellipsis">
                  <div v-if="detail.businessLicensePhotoId"
                       @click="previewImage(detail.businessLicensePhotoId)">
                    <img class="match-parent"
                         :src="detail.businessLicensePhotoId | loadImage" />
                  </div>
                </div>
              </div>
              <div class="item">
                <div class="subtitle">注册号</div>
                <div class="match-left-space align-right">{{detail.license}}</div>
              </div>
              <div class="item">
                <div class="subtitle">名称</div>
                <div class="match-left-space align-right">{{detail.businessLicenseName}}</div>
              </div>
              <div class="item">
                <div class="subtitle">类型</div>
                <div class="match-left-space align-right">{{['企业','个体工商户'][detail.businessType-1]}}</div>
              </div>
              <div class="item">
                <div class="subtitle">地址</div>
                <div class="match-left-space align-right">{{detail.registerAddress}}</div>
              </div>
              <div class="item">
                <div class="subtitle">法定代表人/经营者</div>
                <div class="match-left-space align-right">{{detail.person}}</div>
              </div>
              <div class="item">
                <div class="subtitle">营业期限</div>
                <div class="match-left-space align-right">{{detail.startBusinessTime}}~{{detail.endBusinessTime==='2099-12-31'?'长期':detail.endBusinessTime}}</div>
              </div>
            </div>

            <div class="match-width box align-default">
              <div class="title">结算信息</div>
              <div class="item"
                   v-if="Number(detail.businessType) === 1">
                <div class="subtitle">对公账户开户许可证</div>
                <div class="match-left-space align-right ellipsis">
                  <div v-if="detail.openingAccountLicensePicId"
                       @click="previewImage(detail.openingAccountLicensePicId)">
                    <img class="match-parent"
                         :src="detail.openingAccountLicensePicId | loadImage" />
                  </div>
                </div>
              </div>
              <div class="item"
                   v-else>
                <div class="subtitle">经营者银行卡</div>
                <div class="match-left-space align-right ellipsis">
                  <div v-if="detail.bankCardPositivePicId"
                       @click="previewImage(detail.bankCardPositivePicId)">
                    <img class="match-parent"
                         :src="detail.bankCardPositivePicId | loadImage" />
                  </div>
                </div>
              </div>
              <div class="item">
                <div class="subtitle">开户总行银行</div>
                <div class="match-left-space align-right">{{detail.bnkCdName}}</div>
              </div>
              <div class="item">
                <div class="subtitle">开户支行所在省行政</div>
                <div class="match-left-space align-right">{{detail.lbnkProvName}}</div>
              </div>
              <div class="item">
                <div class="subtitle">开户支行所在市行政</div>
                <div class="match-left-space align-right">{{detail.lbnkCityName}}</div>
              </div>
              <div class="item">
                <div class="subtitle">开户支行所在支行</div>
                <div class="match-left-space text-right">{{detail.lbnkNoName}}</div>
              </div>
              <div class="item">
                <div class="subtitle">开户名称</div>
                <div class="match-left-space align-right">{{detail.accountHolder}}</div>
              </div>
              <div class="item">
                <div class="subtitle">开户账号</div>
                <div class="match-left-space align-right">{{detail.accountNumber}}</div>
              </div>
              <div class="item">
                <div class="subtitle">开户预留手机号</div>
                <div class="match-left-space align-right">{{detail.bankPhone}}</div>
              </div>
            </div>

            <div class="match-width box align-default">
              <div class="title">基本信息</div>
              <div class="item">
                <div class="subtitle">店内门头照</div>
                <div class="match-left-space align-right ellipsis">
                  <div v-if="detail.storeEntrancePicId"
                       @click="previewImage(detail.storeEntrancePicId)">
                    <img class="match-parent"
                         :src="detail.storeEntrancePicId | loadImage" />
                  </div>
                </div>
              </div>
              <div class="item">
                <div class="subtitle">店内环境照片</div>
                <div class="match-left-space align-right ellipsis">
                  <div v-if="detail.indoorPicId"
                       @click="previewImage(detail.indoorPicId)">
                    <img class="match-parent"
                         :src="detail.indoorPicId | loadImage" />
                  </div>
                </div>
              </div>
              <div class="item">
                <div class="subtitle">经营省市区</div>
                <div class="match-left-space align-right">{{detail.regProvCdName}}{{detail.regCityCdName}}{{detail.regDistCdName}}</div>
              </div>
              <div class="item">
                <div class="subtitle">经营地址</div>
                <div class="match-left-space text-right">{{detail.address}}</div>
              </div>
              <div class="item">
                <div class="subtitle">联系人</div>
                <div class="match-left-space align-right">{{detail.contact}}</div>
              </div>
              <div class="item">
                <div class="subtitle">手机号码</div>
                <div class="match-left-space align-right">{{detail.phone}}</div>
              </div>
              <div class="item">
                <div class="subtitle">常用邮箱</div>
                <div class="match-left-space align-right">{{detail.email}}</div>
              </div>
              <div class="item">
                <div class="subtitle">客服电话</div>
                <div class="match-left-space align-right">{{detail.cusServiceTel}}</div>
              </div>
              <div class="item">
                <div class="subtitle">用户简称</div>
                <div class="match-left-space align-right">{{detail.shortName}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="demo-text"
             v-if="active === 1">
          <div class="client-info-detail__content box match-left-space pb-40"
               v-show="PROCESS.SXF">
            <div class="match-width box align-default">
              <div class="title">随行付通道</div>
              <div class="item">
                <div class="subtitle">经营类目</div>
                <div class="match-left-space align-right">{{detail.mccCdName}}</div>
              </div>
              <div class="item">
                <div class="subtitle">费率</div>
                <div class="match-left-space align-right">{{detail.sxfRate}}</div>
              </div>

              <div v-if="sxfData"
                   style="width:100%">
                <div class="title">进件状态</div>
                <div class="item">
                  <div class="subtitle">商户编号</div>
                  <div class="match-left-space align-right">{{sxfData.mno}}</div>
                </div>
                <div class="item">
                  <div class="subtitle">注册名称</div>
                  <div class="match-left-space align-right">{{sxfData.name}}</div>
                </div>
                <div class="item">
                  <div class="subtitle">支付费率</div>
                  <div class="match-left-space align-right">{{sxfData.alipayRate}}</div>
                </div>
                <div class="item">
                  <div class="subtitle">微信费率</div>
                  <div class="match-left-space align-right">{{sxfData.wxRate}}</div>
                </div>
                <div class="item">
                  <div class="subtitle">进件状态</div>
                  <div class="match-left-space align-right">{{['未知','审核中','审核通过','审核驳回','资料不齐全', '进件失败','商户验证'][Number(sxfData.status)-1]}}</div>
                </div>
                <div class="item">
                  <div class="subtitle">进件结果</div>
                  <div class="match-left-space align-right">{{sxfData.result}}</div>
                </div>
                <div class="item">
                  <div class="subtitle">提交时间</div>
                  <div class="match-left-space align-right">{{sxfData.commitTime}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="demo-text"
             v-if="active === 2">
          <div class="client-info-detail__content box match-left-space pb-40"
               v-show="PROCESS.WX">
            <div class="title">微信官方通道</div>
            <div class="item">
              <div class="subtitle">经营描述</div>
              <div class="match-left-space align-right">{{detail.productDesc}}</div>
            </div>
            <div class="item">
              <div class="subtitle">经营行业</div>
              <div class="match-left-space align-right">{{detail.merchantBusiness}}</div>
            </div>
            <template v-if="Number(this.detail.businessType) === 1">
              <div class="item">
                <div class="subtitle">法人银行卡</div>
                <div class="match-left-space align-right ellipsis">
                  <div v-if="detail.personAccountPicId"
                       @click="previewImage(detail.personAccountPicId)">
                    <img class="match-parent"
                         :src="detail.personAccountPicId | loadImage" />
                  </div>
                </div>
              </div>
              <div class="item">
                <div class="subtitle">开户名称</div>
                <div class="match-left-space align-right">{{detail.personAccountName}}</div>
              </div>
              <div class="item">
                <div class="subtitle">开户总行名称</div>
                <div class="match-left-space align-right">{{detail.personAccountBank}}</div>
              </div>
              <div class="item">
                <div class="subtitle">开户银行账号</div>
                <div class="match-left-space align-right">{{detail.personAccountNumber}}</div>
              </div>
              <div class="item">
                <div class="subtitle">开户支行所在地</div>
                <div class="match-left-space align-right">{{detail.accounRegProvName}}{{detail.accounRegCityName}}</div>
              </div>
              <div class="item">
                <div class="subtitle">开户行银行全称（包括支行）</div>
                <div class="match-left-space align-right">{{detail.personBankName}}</div>
              </div>
            </template>
            <div class="item">
              <div class="subtitle">特殊资质</div>
              <div class="match-left-space align-right ellipsis">
                <div v-if="detail.specialQualificationPhotoId"
                     @click="previewImage(detail.specialQualificationPhotoId)">
                  <img class="match-parent"
                       :src="detail.specialQualificationPhotoId | loadImage" />
                </div>
              </div>
            </div>
            <div v-if="wxData">
              <div class="title">微信进件状态</div>
              <div class="item">
                <div class="subtitle">小微商户号</div>
                <div class="match-left-space align-right">{{wxData.subMchId}}</div>
              </div>
              <div class="item">
                <div class="subtitle">进件状态</div>
                <div class="match-left-space align-right">{{wxData.wxFeedStatus}}</div>
              </div>
              <div class="item">
                <div class="subtitle">提交时间</div>
                <div class="match-left-space align-right">{{wxData.commitTime}}</div>
              </div>
              <div class="item">
                <div class="subtitle">申请错误原因描述</div>
                <div class="match-left-space align-right">{{wxData.errCodeDes}}</div>
              </div>
              <div class="item"
                   v-if="wxData.status==4">
                <div class="subtitle">驳回审核细节</div>
                <div class="match-left-space align-right">{{wxData.auditetail}}</div>
              </div>
              <div class="item">
                <a class
                   :href="wxData.signUrl">入驻签约链接</a>
                <span>(使用微信扫码确认)</span>
                <!-- <div class="match-left-space align-right">{{wxData.signUrl}}</div> -->
              </div>
              <div class="item">
                <a class
                   :href="wxData.upgradeSingUrl"
                   v-if="detail.businessLicensePhotoId && wxData.status === 3">商户升级签约链接</a>
                <!-- <d class="match-left-space align-right">{{wxData.upgradeSingUrl}}</d> -->
              </div>
            </div>
          </div>
        </div>
        <div class="demo-text"
             v-if="active === 3">
          <div class="client-info-detail__content box match-left-space pb-40"
               v-show="PROCESS.ZFB">
            <div class="match-width box align-default">
              <div class="title">支付宝</div>
              <div class="item">
                <div class="subtitle">商家支付宝账号</div>
                <div class="match-left-space align-right">{{detail.aliAccount}}</div>
              </div>
              <div class="item">
                <div class="subtitle">商家签约费率</div>
                <div class="match-left-space align-right">{{detail.aliRate}}</div>
              </div>
              <div class="item">
                <div class="subtitle">经营行业</div>
                <div class="match-left-space align-right"
                     v-if="detail.aliFirstLevel">{{detail.aliFirstLevel}}/{{detail.aliSecondLevel}}/{{detail.aliThirdLevel}}</div>
              </div>
              <div class="item"
                   v-if="detail.aliSpecialLicensePic">
                <div class="subtitle">特殊资质图片</div>
                <div class="match-left-space align-right ellipsis">
                  <div v-if="detail.aliSpecialLicensePic"
                       @click="previewImage(detail.aliSpecialLicensePic)">
                    <img class="match-parent"
                         :src="detail.aliSpecialLicensePic | loadImage" />
                  </div>
                </div>
              </div>
              <div v-if="zfbData"
                   style="width:100%">
                <div class="title">进件状态</div>
                <div class="item">
                  <div class="subtitle">商户PID</div>
                  <div class="match-left-space align-right">{{zfbData.merchantPid}}</div>
                </div>
                <div class="item">
                  <div class="subtitle">应用ID</div>
                  <div class="match-left-space align-right">{{zfbData.agentAppId}}</div>
                </div>
                <div class="item">
                  <div class="subtitle">支付宝进件状态</div>
                  <div class="match-left-space align-right">{{['未知','审核中','审核通过','审核驳回','资料不齐全', '进件失败','商户验证'][Number(zfbData.status)-1]}}</div>
                </div>
                <div class="item">
                  <div class="subtitle">签约链接</div>
                  <div class="match-left-space align-right">{{zfbData.confirmUrl}}</div>
                </div>
                <div class="item"
                     v-if="zfbData.errorDesc || zfbData.rejectReason">
                  <div class="subtitle">失败原因</div>
                  <div class="match-left-space align-right">{{zfbData.errorDesc}} {{zfbData.rejectReason}}</div>
                </div>
                <!-- <div class="item">
                  <div class="subtitle">审核失败原因</div>
                  <div class="match-left-space align-right">{{zfbData.rejectReason}}</div>
                </div> -->
                <div class="item">
                  <div class="subtitle">提交时间</div>
                  <div class="match-left-space align-right">{{zfbData.commitTime}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="demo-text"
             v-if="active === 4">
          <div class="client-info-detail__content box match-left-space pb-40"
               v-show="PROCESS.LS">
            <div class="match-width box align-default">
              <div class="title">乐刷通道</div>
              <div class="item">
                <div class="subtitle">是否为餐饮</div>
                <div class="match-left-space align-right">{{detail.isIndustryDining?'是':'否'}}</div>
              </div>
              <div class="item"
                   v-if="detail.isIndustryDining">
                <div class="subtitle">食品卫生许可证</div>
                <div class="match-left-space align-right ellipsis">
                  <div v-if="detail.foodHealthPermissionPic"
                       @click="previewImage(detail.foodHealthPermissionPic)">
                    <img class="match-parent"
                         :src="detail.foodHealthPermissionPic | loadImage" />
                  </div>
                </div>
              </div>
              <div class="item">
                <div class="subtitle">收银台照片</div>
                <div class="match-left-space align-right ellipsis">
                  <div v-if="detail.cashierDeskPicId"
                       @click="previewImage(detail.cashierDeskPicId)">
                    <img class="match-parent"
                         :src="detail.cashierDeskPicId | loadImage" />
                  </div>
                </div>
              </div>
              <div class="item">
                <div class="subtitle">经营类目</div>
                <div class="match-left-space align-right">{{detail.leMccName || '-'}}</div>
              </div>
              <div class="item">
                <div class="subtitle">微信费率</div>
                <div class="match-left-space align-right">{{detail.leWxRate}}</div>
              </div>
              <div class="item">
                <div class="subtitle">阿里费率</div>
                <div class="match-left-space align-right">{{detail.leAliRate}}</div>
              </div>
              <div v-if="lsData"
                   style="width:100%">
                <div class="title">进件状态</div>
                <div class="item">
                  <div class="subtitle">商户编号</div>
                  <div class="match-left-space align-right">{{lsData.mno}}</div>
                </div>
                <div class="item">
                  <div class="subtitle">注册名称</div>
                  <div class="match-left-space align-right">{{lsData.name}}</div>
                </div>
                <div class="item">
                  <div class="subtitle">支付宝费率</div>
                  <div class="match-left-space align-right">{{lsData.alipayRate}}</div>
                </div>
                <div class="item">
                  <div class="subtitle">微信费率</div>
                  <div class="match-left-space align-right">{{lsData.wxRate}}</div>
                </div>
                <div class="item">
                  <div class="subtitle">进件状态</div>
                  <div class="match-left-space align-right">{{['未知','审核中','审核通过','审核驳回','资料不齐全', '进件失败','商户验证'][Number(lsData.status)-1]}}</div>
                </div>
                <div class="item">
                  <div class="subtitle">进件结果</div>
                  <div class="match-left-space align-right">{{lsData.result}}</div>
                </div>
                <div class="item">
                  <div class="subtitle">提交时间</div>
                  <div class="match-left-space align-right">{{lsData.commitTime}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="demo-text"
             v-if="active === 5">
          <div class="client-info-detail__content box match-left-space pb-40"
               v-show="PROCESS.YS">
            <div class="match-width box align-default">
              <div class="title">威富通通道</div>
              <div class="item">
                <div class="subtitle">经营类目</div>
                <div class="match-left-space text-right"
                     v-if="detail.ysFirstName">{{detail.industrName}}</div>
              </div>
              <div class="item">
                <div class="subtitle">结算费率</div>
                <div class="match-left-space align-right">{{detail.ysRate}}</div>
              </div>
              <div class="item">
                <div class="subtitle">商家协议</div>
                <div class="match-left-space align-right ellipsis">
                  <div v-if="detail.pro"
                       v-for="(item, index) in detail.pro"
                       :key="index"
                       @click="previewImage(item)">
                    <img class="match-parent"
                         :src="item | loadImage"
                         style="margin-right:4px;" />
                  </div>
                </div>
              </div>
              <div v-if="ysData"
                   style="width:100%">
                <div class="title">进件状态</div>
                <div class="item">
                  <div class="subtitle">商户编号</div>
                  <div class="match-left-space align-right">{{ysData.mno}}</div>
                </div>
                <div class="item">
                  <div class="subtitle">注册名称</div>
                  <div class="match-left-space align-right">{{ysData.name}}</div>
                </div>
                <div class="item">
                  <div class="subtitle">进件状态</div>
                  <div class="match-left-space align-right">{{['未知','审核中','审核通过','审核驳回','资料不齐全', '进件失败','商户验证'][Number(ysData.status)-1]}}</div>
                </div>
                <div class="item">
                  <div class="subtitle">进件结果</div>
                  <div class="match-left-space align-right">{{ysData.result}}</div>
                </div>
                <div class="item">
                  <div class="subtitle">提交时间</div>
                  <div class="match-left-space align-right">{{ysData.commitTime}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="demo-text"
             v-if="active === 6">
          <div class="client-info-detail__content box match-left-space pb-40"
               v-show="PROCESS.CH">
            <div class="match-width box align-default">
              <div class="title">传化通道</div>
              <div class="item">
                <div class="subtitle">经营类目</div>
                <div class="match-left-space text-right"
                     v-if="detail.chMccCodeName">{{detail.chMccCodeName}}</div>
              </div>
              <div class="item">
                <div class="subtitle">费率</div>
                <div class="match-left-space align-right">{{detail.chRate}}</div>
              </div>
              <div v-if="chData"
                   style="width:100%">
                <div class="title">进件状态</div>
                <div class="item">
                  <div class="subtitle">商户编号</div>
                  <div class="match-left-space align-right">{{chData.mno}}</div>
                </div>
                <div class="item">
                  <div class="subtitle">注册名称</div>
                  <div class="match-left-space align-right">{{chData.name}}</div>
                </div>
                <div class="item">
                  <div class="subtitle">支付费率</div>
                  <div class="match-left-space align-right">{{chData.alipayRate}}</div>
                </div>
                <div class="item">
                  <div class="subtitle">微信费率</div>
                  <div class="match-left-space align-right">{{chData.wxRate}}</div>
                </div>
                <div class="item">
                  <div class="subtitle">进件状态</div>
                  <div class="match-left-space align-right">{{['未知','审核中','审核通过','审核驳回','资料不齐全', '进件失败','商户验证'][Number(chData.status)-1]}}</div>
                </div>
                <div class="item">
                  <div class="subtitle">进件结果</div>
                  <div class="match-left-space align-right">{{chData.result}}</div>
                </div>
                <div class="item">
                  <div class="subtitle">提交时间</div>
                  <div class="match-left-space align-right">{{chData.commitTime}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="demo-text"
             v-if="active === 7">
          <div class="client-info-detail__content box match-left-space pb-40"
               v-show="PROCESS.FY">
            <div class="match-width box align-default">
              <div class="title">富友通道</div>
              <div class="item">
                <div class="subtitle">经营类目</div>
                <div class="match-left-space text-right"
                     v-if="detail.fuiouFirstMccCode">{{detail.fuiouFirstMccCode}}/{{detail.fuiouSecondMccCode}}/{{detail.fuiouBusiness}}</div>
              </div>
              <div class="item">
                <div class="subtitle">商户营业地区补充</div>
                <div class="match-left-space text-right"
                     v-if="detail.fuiouAreaName">{{detail.fuiouAreaName}}</div>
              </div>
              <div class="item">
                <div class="subtitle">支付宝费率</div>
                <div class="match-left-space align-right">{{detail.fuiouAliRate}}</div>
              </div>
              <div class="item">
                <div class="subtitle">微信费率</div>
                <div class="match-left-space align-right">{{detail.fuiouWxRate}}</div>
              </div>
              <div class="item">
                <div class="subtitle">小微商户手持证件照</div>
                <div class="match-left-space align-right ellipsis">
                  <div v-if="detail.inHandPicId"
                       @click="previewImage(detail.inHandPicId)">
                    <img class="match-parent"
                         :src="detail.inHandPicId | loadImage" />
                  </div>
                </div>
              </div>
              <div class="item">
                <div class="subtitle">经营许可证</div>
                <div class="match-left-space align-right ellipsis">
                  <div v-if="detail.businessCertPicId"
                       @click="previewImage(detail.businessCertPicId)">
                    <img class="match-parent"
                         :src="detail.businessCertPicId | loadImage" />
                  </div>
                </div>
              </div>
              <div v-if="fyData"
                   style="width:100%">
                <div class="title">进件状态</div>
                <div class="item">
                  <div class="subtitle">商户编号</div>
                  <div class="match-left-space align-right">{{fyData.fuiouMchntId}}</div>
                </div>
                <div class="item">
                  <div class="subtitle">注册名称</div>
                  <div class="match-left-space align-right">{{fyData.fuiouRegisterName}}</div>
                </div>
                <div class="item">
                  <div class="subtitle">支付宝费率</div>
                  <div class="match-left-space align-right">{{fyData.fuiouAliRate}}</div>
                </div>
                <div class="item">
                  <div class="subtitle">微信费率</div>
                  <div class="match-left-space align-right">{{fyData.fuiouWxRate}}</div>
                </div>
                <div class="item">
                  <div class="subtitle">进件状态</div>
                  <div class="match-left-space align-right">{{fyEntryStatus[fyData.entryStatus]}}</div>
                </div>
                <div class="item">
                  <div class="subtitle">进件结果</div>
                  <div class="match-left-space align-right">{{fyData.fuiouCodeMesg}}</div>
                </div>
                <div class="item">
                  <div class="subtitle">提交时间</div>
                  <div class="match-left-space align-right">{{fyData.commitTime}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
<!--        银联现在没有 8-->
<!--        拉卡拉现在没有 9-->
        <div class="demo-text"
             v-if="active === 8">
          <div class="client-info-detail__content box match-left-space pb-40"
               v-show="PROCESS.SJPOS">
            <div class="match-width box align-default">
              <div class="title">手机pos通道</div>
              <div class="item">
                <div class="subtitle">手机pos交易费率</div>
                <div class="match-left-space align-right">{{detail.posTradeRate}}%</div>
              </div>
              <div class="item">
                <div class="subtitle">手机pos提现费</div>
                <div class="match-left-space align-right">{{detail.posDrawFee}}</div>
              </div>
              <div class="item">
                <div class="subtitle">网联交易费率</div>
                <div class="match-left-space align-right">{{detail.quickTradeRate}}%</div>
              </div>
              <div class="item">
                <div class="subtitle">网联提现费</div>
                <div class="match-left-space align-right">{{detail.quickDrawFee}}</div>
              </div>
              <div class="item">
                <div class="subtitle">商户手持证件照</div>
                <div class="match-left-space align-right ellipsis">
                  <div v-if="detail.holdingCardId"
                       @click="previewImage(detail.holdingCardId)">
                    <img class="match-parent"
                         :src="detail.holdingCardId | loadImage" />
                  </div>
                </div>
              </div>
              <div class="item">
                <div class="subtitle">结算卡背面</div>
                <div class="match-left-space align-right ellipsis">
                  <div v-if="detail.bankPhotoId"
                       @click="previewImage(detail.bankPhotoId)">
                    <img class="match-parent"
                         :src="detail.bankPhotoId | loadImage" />
                  </div>
                </div>
              </div>
             <!-- <div class="item">
                <div class="subtitle">经营许可证</div>
                <div class="match-left-space align-right ellipsis">
                  <div v-if="detail.businessCertPicId"
                       @click="previewImage(detail.businessCertPicId)">
                    <img class="match-parent"
                         :src="detail.businessCertPicId | loadImage" />
                  </div>
                </div>
              </div>-->
              <div v-if="sjPosData"
                   style="width:100%">
                <div class="title">进件状态</div>
                <div class="item">
                  <div class="subtitle">商户编号</div>
                  <div class="match-left-space align-right">{{sjPosData.posMchId}}</div>
                </div>
                <div class="item">
                  <div class="subtitle">注册名称</div>
                  <div class="match-left-space align-right">{{sjPosData.posRegisName}}</div>
                </div>
                <div class="item">
                  <div class="subtitle">手机pos交易费率</div>
                  <div class="match-left-space align-right">{{sjPosData.posTradeRate}}%</div>
                </div>
                <div class="item">
                  <div class="subtitle">手机pos提现费</div>
                  <div class="match-left-space align-right">{{sjPosData.posDrawFee}}</div>
                </div>
                <div class="item">
                  <div class="subtitle">网联交易费率</div>
                  <div class="match-left-space align-right">{{sjPosData.quickTradeRate}}%</div>
                </div>
                <div class="item">
                  <div class="subtitle">网联提现费</div>
                  <div class="match-left-space align-right">{{sjPosData.quickDrawFee}}</div>
                </div>
                <div class="item">
                  <div class="subtitle">进件状态</div>
                  <div class="match-left-space align-right">{{entryStatus[sjPosData.entryStatus]}}</div>
                </div>
                <div class="item">
                  <div class="subtitle">进件结果</div>
                  <div class="match-left-space align-right">{{sjPosData.posMsg}}</div>
                </div>
                <div class="item">
                  <div class="subtitle">提交时间</div>
                  <div class="match-left-space align-right">{{sjPosData.commitTime}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div class="demo-text"
             v-if="active == 9">
          <div class="client-info-detail__content box match-left-space pb-40"
               v-show="PROCESS.KDB">
            <div class="match-width box align-default">
              <div class="title">开店宝通道</div>
              <div class="item">
                <div class="subtitle">开店宝交易费率</div>
                <div class="match-left-space align-right">{{detail.kdbWxTradeRate}}%</div>
              </div>

              <div class="item">
                <div class="subtitle">商户手持证件照</div>
                <div class="match-left-space align-right ellipsis">
                  <div v-if="detail.holdingCardId"
                       @click="previewImage(detail.holdingCardId)">
                    <img class="match-parent"
                         :src="detail.holdingCardId | loadImage" />
                  </div>
                </div>
              </div>
              <div class="item">
                <div class="subtitle">结算卡背面</div>
                <div class="match-left-space align-right ellipsis">
                  <div v-if="detail.bankPhotoId"
                       @click="previewImage(detail.bankPhotoId)">
                    <img class="match-parent"
                         :src="detail.bankPhotoId | loadImage" />
                  </div>
                </div>
              </div>
              <!-- <div class="item">
                 <div class="subtitle">经营许可证</div>
                 <div class="match-left-space align-right ellipsis">
                   <div v-if="detail.businessCertPicId"
                        @click="previewImage(detail.businessCertPicId)">
                     <img class="match-parent"
                          :src="detail.businessCertPicId | loadImage" />
                   </div>
                 </div>
               </div>-->
              <div v-if="kdbData"
                   style="width:100%">
                <div class="title">进件状态</div>
                <div class="item">
                  <div class="subtitle">商户编号</div>
                  <div class="match-left-space align-right">{{kdbData.kdbMchId || "--"}}</div>
                </div>
                <div v-if="kdbDetailShow">
                  <div v-if="kdbKaShow">
                    <div class="item">
                      <div class="subtitle">卡支付渠道</div>
                      <div class="match-left-space align-right">{{kdbKaStateText}}</div>
                    </div>
                    <div class="item" v-if="kdbKaMsgShow">
                      <div class="subtitle">失败原因</div>
                      <div class="match-left-space align-right">{{kdbKaMsg}}</div>
                    </div>
                  </div>
                  <div v-if="kdbZfbShow">
                    <div class="item">
                      <div class="subtitle">支付宝支付渠道</div>
                      <div class="match-left-space align-right">{{kdbZfbStateText}}</div>
                    </div>
                    <div class="item" v-if="kdbZfbMsgShow">
                      <div class="subtitle">失败原因</div>
                      <div class="match-left-space align-right">{{kdbZfbMsg}}</div>
                    </div>
                  </div>
                  <div v-if="kdbWxShow">
                    <div class="item">
                      <div class="subtitle">微信支付渠道</div>
                      <div class="match-left-space align-right">{{kdbWxStateText}}</div>
                    </div>
                    <div class="item" v-if="kdbWxMsgShow">
                      <div class="subtitle">失败原因</div>
                      <div class="match-left-space align-right">{{kdbWxMsg}}</div>
                    </div>
                  </div>
                </div>
                <div v-else>
                  <div class="item">
                    <div class="subti;ltle">进件结果</div>
                    <div class="match-left-space align-right">{{kdbData.kdbMsg}}</div>
                  </div>
                </div>

                <div class="item">
                  <div class="subtitle">提交时间</div>
                  <div class="match-left-space align-right">{{kdbData.commitTime}}</div>
                </div>


              </div>
            </div>
          </div>
        </div>

        <div class="demo-text"
             v-if="active === 10">
          <div class="client-info-detail__content box match-left-space pb-40"
               v-show="PROCESS.FY">
            <div class="match-width box align-default">
              <div class="title">畅捷通道</div>

              <div class="item">
                <div class="subtitle">费率</div>
                <div class="match-left-space align-right">{{detail.chanpayTradeRate}} %</div>
              </div>
              <div class="item">
                <div class="subtitle">经营许可证</div>
                <div class="match-left-space align-right ellipsis">
                  <div v-if="detail.businessCertPicId"
                       @click="previewImage(detail.businessCertPicId)">
                    <img class="match-parent"
                         :src="detail.businessCertPicId | loadImage" />
                  </div>
                </div>
              </div>
              <div v-if="cjData"
                   style="width:100%">
                <div class="title">进件状态</div>
                <div class="item">
                  <div class="subtitle">商户编号</div>
                  <div class="match-left-space align-right">{{cjData.chanpayMchId}}</div>
                </div>

                <!--<div class="item">
                  <div class="subtitle">费率</div>
                  <div class="match-left-space align-right">{{cjData.chanpayTradeRate}}</div>
                </div>-->
                <div class="item">
                  <div class="subtitle">进件状态</div>
                  <div class="match-left-space align-right">{{entryStatus[cjData.entryStatus]}}</div>
                </div>
                <div class="item">
                  <div class="subtitle">进件结果</div>
                  <div class="match-left-space align-right">{{cjData.chanpayMsg}}</div>
                </div>
                <div class="item">
                  <div class="subtitle">提交时间</div>
                  <div class="match-left-space align-right">{{cjData.commitTime}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </mu-container>
    </div>

    <!-- 图片预览 -->
    <div class="cover-x align-default"
         v-if="isImagePreview"
         @click="isImagePreview = false">
      <div class="match-left-space"></div>
      <div class="image-preview">
        <img class="match-parent"
             :src="imgUrl | previewLoadImage" />
      </div>
      <div class="match-left-space"></div>
    </div>
  </div>
</template>

<script>
import { clientInfoDetailLocal, clientInfoDetailMerchantNameLocal } from '@/storage'
import { clientInfoApi } from '@/api'
import { url } from '@/utils/src/request'
import { CLIENT_INFO, CLIENT_INFO_RECORD } from '@/router/types'
// import PROCESS from '@/constants'
import { getProcess } from '@/constants'
export default {
  data() {
    return {
      // PROCESS,
      PROCESS: {
        SXF: false,
        WX: false,
        LS: false,
        YS: false,
        CH: false,
        ZFB: false,
        FY: false,
        LAL: false,
        SJPOS:false,
        KDB:false,
        CJ:false
      },
      isEdit: false,
      detail: {
        id: ''
      },
      sxfData: '',
      wxData: '',
      lsData: '',
      ysData: '',
      chData: '',
      fyData: '',
      zfbData: '',
      lklData:'',
      sjPosData:'',
      kdbData:'',
      cjData:'',
      active: 0,
      wxList: [],
      sellCheck: [],
      isImagePreview: false,
      imgUrl: '',
      sellScene_offline: false,
      sellScene_wxapp: false,
      sellScene_website: false,
      sellScene_app: false,
      isDirect: 0,

      //详情表头
      tabList: [
        { index: 0, name: '基本材料', open: true },
        { index: 1, name: '随行付', open: true },
        { index: 2, name: '微信', open: true },
        { index: 3, name: '支付宝', open: true },
        { index: 4, name: '乐刷', open: true },
        { index: 5, name: '威富通', open: true },
        { index: 6, name: '传化', open: true },
        { index: 7, name: '富友', open: true },
        // { index: 8, name: '银联', open: true },
        // { index: 9, name: '拉卡拉', open: true }
        { index: 10, name: '手机pos', open: true },
        { index: 11, name: '开店宝', open: true },
        { index: 12, name: '畅捷', open: true },
      ],
      fyEntryStatus: {
        '-1': '进件失败',
        1: '待进件',
        2: '进件审核中',
        3: '进件成功'
      },
      //我们系统的状态
      entryStatus: {
        '-1': '进件失败',
        1: '待进件',
        2: '进件审核中',
        3: '进件成功'
      },
      //开店宝枚举
      kdbEnum: {
        kdbMsg:{
          wayType:{
            1:'卡支付渠道',
            7:'支付宝支付渠道',
            8:'微信支付渠道'
          },
          state:{
            1: '审核通过',
            2: '审核失败',
            3: '审核中'
          }
        }
      },
      kdbKaStateText:'',
      kdbKaMsg:'',
      kdbKaShow: false,
      kdbKaMsgShow: false,
      kdbZfbStateText:'',
      kdbZfbMsg:'',
      kdbZfbShow: false,
      kdbZfbMsgShow: false,
      kdbWxStateText:'',
      kdbWxMsg:'',
      kdbWxShow: false,
      kdbWxMsgShow: false,
      kdbDetailShow: false
    }
  },

  methods: {

    // 返回
    onBack() {
      this.$router.push({
        name: CLIENT_INFO
      })
    },
    // tab切换
    handleTab(e) {
      console.log('e', e)
    },
    // 录入资料
    onRecord() {
      this.$router.push({
        name: CLIENT_INFO_RECORD
      })
    },
    isJson(str) {
      if (typeof str == 'string') {
        try {
          var obj = JSON.parse(str);
          if (typeof obj == 'object' && obj) {
            return true;
          } else {
            return false;
          }
        } catch (e) {
          console.log('error：' + str + '!!!' + e);
          return false;
        }
      }
      console.log('It is not a string!')
    },
    // 获取列表详情
    getMchInfo(id) {
      clientInfoApi.getMchInfo({ id }).then(res => {
        res.obj.accountHolder = res.obj.accountHolder || res.obj.contact
        res.obj.pro = res.obj.pro ? res.obj.pro.split(';') : []
        this.detail = Object.assign({}, this.detail, res.obj)
      })
    },
    getWxOrsxfcode(item) {
      if (item.channel === 2) { // 微信
        clientInfoApi.getWxcode({ merDetailId: item.id }).then(res => {
          this.wxData = res.obj
          console.log(res)
        })
      } else if (item.channel === 1) { // 随行付
        clientInfoApi.getSxfcode({ id: item.id }).then(res => {
          this.sxfData = res.obj
          console.log('suixingfuchannel========================',res)
        })
      } else if (item.channel === 3) { // 乐刷
        clientInfoApi.getLsCode({ id: item.id }).then(res => {
          this.lsData = res.obj
          console.log(res)
        })
      } else if (item.channel === 4) { // 威富通
        clientInfoApi.getYsCode({ id: item.id }).then(res => {
          this.ysData = res.obj
          console.log(res)
        })
      } else if (item.channel === 5) { // 传化
        clientInfoApi.getChCode({ id: item.id }).then(res => {
          this.chData = res.obj
          console.log(res)
        })
      } else if (item.channel === 6) { // 富友
        clientInfoApi.getFyCode({ id: item.id }).then(res => {
          this.fyData = res.obj
          console.log('fuyouchannel========================',res)
        })
      } else if (item.channel === 7) { // 支付宝
        clientInfoApi.getZfbCode({ id: item.id }).then(res => {
          this.zfbData = res.obj
          console.log(res)
        })
      }/*else if (item.channel === 8) { // 银联
        clientInfoApi.getLklCode({ id: item.id }).then(res => {
          this.lklData = res.obj
          console.log(res)
        })
      }else if (item.channel === 9) { // 拉卡拉
        clientInfoApi.getLklCode({ id: item.id }).then(res => {
          this.lklData = res.obj
          console.log(res)
        })
      }*/else if (item.channel === 10) { // 手机pos &网联
        clientInfoApi.getSjPosCode({ id: item.id }).then(res => {
          this.sjPosData = res.obj
          // console.log('手机pos进件info==================',res)
        })
      }else if (item.channel === 11) { // 开店宝
        clientInfoApi.getKdbCode({ id: item.id }).then(res => {
          this.kdbData = res.obj
          let jsonFlag= false
          jsonFlag = this.isJson(this.kdbData.kdbMsg)
          if(jsonFlag){
            this.kdbData.kdbMsg = JSON.parse(this.kdbData.kdbMsg)
          }
          this.kdbData.jsonFlag = jsonFlag
          this.kdbMsgHandle(this.kdbData)
          // console.log('this.kdbData0000000000',this.kdbData)

          // console.log('this.kdbData11111111111',this.kdbData)

          // console.log('开店宝进件info==================',res)
        })
      }else if (item.channel === 12) { // 畅捷
        clientInfoApi.getCjCode({ id: item.id }).then(res => {
          this.cjData = res.obj
          // console.log('this.cjData0000000000',this.cjData)
          // this.cjData.cjMsg = this.cjData.cjMsg
          // console.log('this.cjData11111111111',this.cjData)
          // this.cjMsgHandle(this.cjData)
          // console.log('开店宝进件info==================',res)
        })
      }


    },
    toEdit() {
      console.log('this')
      this.$router.push({
        name: CLIENT_INFO_RECORD,
        query: {
          id: this.detail.id
        }
      })
    },
    // 获取商户详情 这个方法没有任何地方调用
    getMerchantDetail() {
      let id = this.id.id
      // console.log(555, id)
      if (id) {
        clientInfoApi.getMerchantDetail(id).then(
          res => {
            if (res.code === 200) {
              // console.log(888, res)
              this.detail = res.obj
              this.detail.wxRate =
                Number(this.detail.wxRate) >= 0
                  ? (Number(this.detail.wxRate) * 100).toFixed(2) + '%'
                  : '*'
              this.detail.zfbRate =
                Number(this.detail.zfbRate) >= 0
                  ? (Number(this.detail.zfbRate) * 100).toFixed(2) + '%'
                  : '*'
              this.detail.sxfWxRate =
                Number(this.detail.sxfWxRate) >= 0
                  ? (Number(this.detail.sxfWxRate) * 100).toFixed(2) + '%'
                  : '*'
              this.detail.sxfZfbRate =
                Number(this.detail.sxfZfbRate) >= 0
                  ? (Number(this.detail.sxfZfbRate) * 100).toFixed(2) + '%'
                  : '*'
              this.detail.fyWxRate =
                Number(this.detail.fyWxRate) >= 0
                  ? (Number(this.detail.fyWxRate) * 100).toFixed(2) + '%'
                  : '*'
              this.detail.fyZfbRate =
                Number(this.detail.fyZfbRate) >= 0
                  ? (Number(this.detail.fyZfbRate) * 100).toFixed(2) + '%'
                  : '*'
              this.detail.fyLkaRate =
                Number(this.detail.fyLkaRate) >= 0
                  ? (Number(this.detail.fyLkaRate) * 100).toFixed(2) + '%'
                  : '*'
              // 存入缓存
              for (let i in this.detail) {
                if (this.detail[i] === null) {
                  this.detail[i] = ''
                }
              }
              clientInfoDetailLocal.set(JSON.stringify(this.detail))
              clientInfoDetailMerchantNameLocal.set(
                JSON.stringify({
                  merchantName: this.detail.merchantName
                })
              )
              this.sellCheck = JSON.parse(res.obj.sellCheck)
              this.showSell()
            } else {
              if (res && res.msg) {
                this.$toast.error(res.msg)
              }
            }
          },
          err => {
            if (err && err.msg) {
              this.$toast.error(err.msg)
            }
          }
        )
      } else {
        // 跳转回去
        // this.onBack()
      }
    },
    /**
     *显示不同售卖场景下的表单
     */
    showSell: function () {
      let select = this.sellCheck
      let offlice = false
      let wxapp = false
      let website = false
      let app = false
      // 判断是否有选中某个属性
      for (let i in select) {
        if (select[i] === '1') {
          offlice = true
        }
        if (select[i] === '2') {
          wxapp = true
        }
        if (select[i] === '3') {
          website = true
        }
        if (select[i] === '4') {
          app = true
        }
      }
      this.sellScene_offline = offlice
      this.sellScene_wxapp = wxapp
      this.sellScene_website = website
      this.sellScene_app = app
    },
    // 获取图片
    getImage(id) {
      return id ? url + `/fms/upload/resource/thumbnail/${id}` : ''
    },
    // 预览图片
    previewImage(id) {
      // console.log(id)
      if (id) {
        this.imgUrl = id
        this.isImagePreview = true
      }
    },
    kdbMsgHandle(kdbData){
      if(kdbData.jsonFlag ){
        this.kdbDetailShow = true;
      }else {
        this.kdbDetailShow = false;
         return //这代表kdbData.kdbMsg不是json，不需要下方的json处理
      }

      let msgArr = kdbData.kdbMsg
      for(let i=0;i<msgArr.length;i++){
        if(msgArr[i].wayType === 1){

          this.kdbKaStateText = this.kdbEnum.kdbMsg.state[msgArr[i].state]
          this.kdbKaMsg = msgArr[i].message
          this.kdbKaShow = true;
          if(msgArr[i].state === 2){
            this.kdbKaMsgShow = true
          }
        }else if(msgArr[i].wayType === 7){
          this.kdbZfbStateText = this.kdbEnum.kdbMsg.state[msgArr[i].state]
          this.kdbZfbMsg = msgArr[i].message
          this.kdbZfbShow = true;
          if(msgArr[i].state === 2){
            this.kdbZfbMsgShow = true
          }
        }else if(msgArr[i].wayType === 8){
          this.kdbWxStateText = this.kdbEnum.kdbMsg.state[msgArr[i].state]
          this.kdbWxMsg = msgArr[i].message
          this.kdbWxShow = true;
          if(msgArr[i].state === 2){
            this.kdbWxMsgShow = true
          }
        }
      }
    }
  },

  filters: {
    /**
     *
     * 工具
     * @param ts 时间戳
     * @returns {string} 格式化事时间
     */
    // 时间格式化
    /*formatTime: function (ts) {
      /!**
       * 补充0
       * @param  m 月和日，补齐2位
       * @returns {string} 补齐2二位后的时间
       *!/
      function  add0 (m) {
        return m < 10 ? '0' + m : m
      };
      let time = new Date(ts)
      let y = time.getFullYear()
      let m = time.getMonth() + 1
      let d = time.getDate()
      let h = time.getHours();  //时
      let mm = time.getMinutes();  //分
      let s = time.getSeconds();  //秒
      return y + '-' + add0(m) + '-' + add0(d)+ ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s)
    },*/

    representativeTypeFil: function (val) {
      let v = parseInt(val)
      let txt = ''
      switch (v) {
        case 1:
          txt = '法人'
          break
        case 2:
          txt = '经办人'
          break
        default:
          break
      }
      return txt
    },
    // 经营类目
    businessLevFilter(businessLev) {
      if (!businessLev) {
        return ''
      }
      return '、' + businessLev
    },
    // 销售商品场景
    sellCheckFilter(sellCheck) {
      if (!sellCheck) {
        return ''
      }
      let scenes = ['线下', '公众号/小程序', '网站', 'APP']
      sellCheck = JSON.parse(sellCheck)
      sellCheck = sellCheck.map(x => {
        return scenes[x - 1]
      })
      let tmpStr = sellCheck.join('、')
      return tmpStr
    },
    // 获取图片
    loadImage(id) {
      return id ? url + `/fms/upload/resource/thumbnail/${id}` : ''
    },
    previewLoadImage(id) {
      return id ? url + `/fms/upload/resource/${id}` : ''
    },
    // 证件类型
    certificateFilter(type) {
      return type === 1 ? '身份证' : type === 2 ? '护照' : ''
    }
  },

  mounted() {
    // console.log('PROCESS', this.PROCESS)
    this.detail.id = this.$route.query.id
    this.isEdit = this.$route.query.isEdit || false
    // debugger
    this.wxList = (this.$route.query.list && this.$route.query.list.length) ? JSON.parse(this.$route.query.list) : []
    // console.log('bbbbbbbbbbbbbbbbbb==========',this.wxList)
    getProcess().then(res => {
      this.PROCESS = res
      this.tabList[1].open = res.SXF
      this.tabList[2].open = res.WX
      this.tabList[3].open = res.ZFB
      this.tabList[4].open = res.LS
      this.tabList[5].open = res.YS
      this.tabList[6].open = res.CH
      this.tabList[7].open = res.FY
      // this.tabList[8].open = res.YL
      // this.tabList[9].open = res.LKL
      this.tabList[8].open = res.SJPOS
      this.tabList[9].open = res.KDB
      this.tabList[10].open = res.CJ

    })
    this.wxList.forEach(item => {
      this.getWxOrsxfcode(item)
    })
    if (this.detail.id) {
      this.getMchInfo(this.detail.id)
    } else {
      this.$toast.error('详情数据丢失')
    }
  }
}
</script>

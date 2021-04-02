<template>
  <div class="client-info-detail client-info-last frame-container box align-default short">
    <!-- 补白 -->
    <div class="client-info-detail__padding"></div>

    <!-- 导航栏 -->
    <div class="client-info-detail__nav box plr-30 align-hor-bet">
      <div class="icon iconfont iconreturn"
           @click="onBack"></div>
      <div class="title">{{detail.merchantName}}</div>
      <div class="text"
           @click="handleReset">重置</div>
    </div>

    <!-- 信息主体 -->
    <div class="client-info-detail__content box match-left-space">
      <!--易生通道-->
      <div class="match-width box align-default"
           v-if="PROCESS.YIS">
        <div class="title">
          <mu-checkbox v-model="checkboxObj.yiS"
                       label="易生通道"></mu-checkbox>
        </div>
        <div class="item">
          <VmaCascaderTree v-model="cjCascaderArr"
                           class="client-info"
                           :dataTree="yiSMaccTree"
                           :placeholder="'请选择类目'"
                           :modalLabel="'选择类目'"
                           :required="checkboxObj.yiS"
                           label="经营类目"
                           @change="changeYiSMenu"></VmaCascaderTree>
        </div>
        <div class="item">
          <VmaCascaderTree class="client-info"
                           v-model="yiSAddressArr"
                           :dataTree="yiSAddressTree"
                           :label="'商户营业地区补充'"
                           :placeholder="'请选择省市'"
                           :modalLabel="'选择省市'"
                           :required="checkboxObj.yiS"
                           @change="changeYiSAddress"></VmaCascaderTree>
        </div>
        <div class="item"
             v-if="from!=='share'">
          <div class="subtitle">
            <span class="star" v-show="checkboxObj.yiS">*</span>费率
          </div>
          <div class="match-left-space align-right input-number">
            <input type="number"
                   placeholder="请填写真实费率"
                   v-model="detail.ysWxRate" />%
          </div>
        </div>
        <div class="item">
          <div class="subtitle">
            <span class="star" v-show="checkboxObj.yiS">*</span>到账周期
          </div>
          <div class="match-left-space box align-right"
               @click="callSimpleTree(5)">
            <div class="input ellipsis"
                 style="text-align: right" v-text="yiSSettlementCycleTypeText">
            </div>
            <div class="icon iconfont iconenter ml-10"></div>
          </div>
        </div>
      </div>


      <!--畅捷-->
      <div class="match-width box align-default"
           v-if="PROCESS.CJ">
        <div class="title">
          <mu-checkbox v-model="checkboxObj.cj"
                       label="畅捷通道"></mu-checkbox>
        </div>
        <div class="item">
          <VmaCascaderTree v-model="cjCascaderArr"
                           class="client-info"
                           :dataTree="cjMaccTree"
                           :placeholder="'请选择类目'"
                           :modalLabel="'选择类目'"
                           :required="checkboxObj.cj"
                           label="经营类目"
                           @change="changeCjMenu"></VmaCascaderTree>
        </div>
        <div class="item">
          <VmaCascaderTree class="client-info"
                           v-model="cjAddressArr"
                           :dataTree="cjAddressTree"
                           :label="'商户营业地区补充'"
                           :placeholder="'请选择省市'"
                           :modalLabel="'选择省市'"
                           :required="checkboxObj.cj"
                           @change="changeCjAddress"></VmaCascaderTree>
        </div>
        <div class="item"
             v-if="from!=='share'">
          <div class="subtitle">
            <span class="star" v-show="checkboxObj.cj">*</span>费率
          </div>
          <div class="match-left-space align-right input-number">
            <input type="number"
                   placeholder="请填写真实费率"
                   v-model="detail.chanpayTradeRate" />%
          </div>
        </div>
      </div>

      <!--开店宝-->
      <div class="match-width box align-default"
           v-if="PROCESS.KDB">
        <div class="title">
          <mu-checkbox v-model="checkboxObj.kdb"
                       label="开店宝通道"></mu-checkbox>
        </div>
        <div class="item">
          <VmaCascaderTree v-model="kdbCascaderArr"
                           class="client-info"
                           :dataTree="kdbMaccTree"
                           :placeholder="'请选择类目'"
                           :modalLabel="'选择类目'"
                           :required="checkboxObj.kdb"
                           label="经营类目"
                           @change="changeKdbMenu"></VmaCascaderTree>
        </div>
        <div class="item">
          <VmaCascaderTree class="client-info"
                           v-model="kdbAddressArr"
                           :dataTree="kdbAddressTree"
                           :label="'商户营业地区补充'"
                           :placeholder="'请选择省市'"
                           :modalLabel="'选择省市'"
                           :required="checkboxObj.kdb"
                           @change="changeShopAddress"></VmaCascaderTree>
        </div>




        <div class="item" v-show="checkboxObj.kdb&&detail.businessLicensePhotoId">
          <div class="subtitle">
            <span class="star">*</span>公司类型
          </div>
          <div class="match-left-space box align-right"
               @click="callSimpleTree(1)">
            <div class="input ellipsis"
                 style="text-align: right" v-text="kdbCompanyTypeText">
            </div>
            <div class="icon iconfont iconenter ml-10"></div>
          </div>
        </div>
        <div class="item">
          <div class="subtitle">
            <span class="star" v-show="checkboxObj.kdb">*</span>到账周期
          </div>
          <div class="match-left-space box align-right"
               @click="callSimpleTree(2)">
            <div class="input ellipsis"
                 style="text-align: right" v-text="kdbSettlementCycleTypeText">
            </div>
            <div class="icon iconfont iconenter ml-10"></div>
          </div>
        </div>
        <div class="item">
          <div class="subtitle">
            <span class="star" v-show="checkboxObj.kdb">*</span>性别
          </div>
          <div class="match-left-space box align-right"
               @click="callSimpleTree(3)">
            <div class="input ellipsis"
                 style="text-align: right" v-text="kdbSexText">
            </div>
            <div class="icon iconfont iconenter ml-10"></div>
          </div>
        </div>
        <div class="item">
          <div class="subtitle">
            <span class="star"  v-show="checkboxObj.kdb">*</span>结算账户类型
          </div>
          <div class="match-left-space box align-right"
               @click="callSimpleTree(4)">
            <div class="input ellipsis"
                 style="text-align: right" v-text="kdbAccountTypeText">
            </div>
            <div class="icon iconfont iconenter ml-10"></div>
          </div>
        </div>
        <div class="item"
             v-if="from!=='share'">
          <div class="subtitle">
            <span class="star"
                  v-show="checkboxObj.kdb">*</span>费率
          </div>
          <div class="match-left-space align-right input-number">
            <input type="number"
                   placeholder="请填写真实费率"
                   v-model="detail.kdbWxTradeRate" />%
          </div>
        </div>
        <!--<div class="item"
             v-if="from!=='share'">
          <div class="subtitle">
            <span class="star"
                  v-show="checkboxObj.kdb">*</span>D0手续费
          </div>
          <div class="match-left-space align-right input-number">
            <input type="number"
                   placeholder="请填写真实手续费"
                   v-model="detail.kdbServiceRate" /> （元）
          </div>
        </div>-->


        <div class="item" style="border:0;">
          <div class="subtitle">
            <span class="star"  v-show="checkboxObj.kdb&&detail.businessLicensePhotoId&&detail.businessType==1">*</span>注册登记表照片
          </div>
        </div>
        <div class="item id_img_wp">
          <div class="img_wp img_wp_width">
            <!-- <input class="file"
                   type="file"
                   ref="out"
                   accept="image/*"
                   @change="onFileChange($event, 'out')" /> -->
            <vmaUploadImg ref="kdbRegistryId"
                          @change="onFileChange($event, 'kdbRegistryId')"></vmaUploadImg>
            <div>
              <i v-if="detail.kdbRegistryId"
                 class="icon iconfont iconshanchu"
                 @click="deleteImg('kdbRegistryId')"></i>
              <div class="icon iconfont iconzhaoxiangji ml-10"
                   style="font-size:30px;"></div>
              <img v-if="detail.kdbRegistryId"
                   :src="detail.kdbRegistryId | previewLoadImage"
                   @click="previewImage(detail.kdbRegistryId)" />
            </div>
            <p class="img_intro">注册登记表照片</p>
          </div>
        </div>
        <div class="item"
             style="border:0;">
          <div class="subtitle">
            <span class="star"  v-show="checkboxObj.kdb&&detail.businessLicensePhotoId&&detail.businessType==1">*</span>收单协议照片
          </div>
        </div>
        <div class="item id_img_wp">
          <div class="img_wp img_wp_width">
            <!-- <input class="file"
                   type="file"
                   ref="out"
                   accept="image/*"
                   @change="onFileChange($event, 'out')" /> -->
            <vmaUploadImg ref="kdbAgreementId"
                          @change="onFileChange($event, 'kdbAgreementId')"></vmaUploadImg>
            <div>
              <i v-if="detail.kdbAgreementId"
                 class="icon iconfont iconshanchu"
                 @click="deleteImg('kdbAgreementId')"></i>
              <div class="icon iconfont iconzhaoxiangji ml-10"
                   style="font-size:30px;"></div>
              <img v-if="detail.kdbAgreementId"
                   :src="detail.kdbAgreementId | previewLoadImage"
                   @click="previewImage(detail.kdbAgreementId)" />
            </div>
            <p class="img_intro">收单协议照片</p>
          </div>
        </div>
        <div class="item"  v-if="detail.businessLicensePhotoId&&detail.businessType==1"
             style="border:0;">
          <div class="subtitle">
            商户变更登记表照片(变更时必传)
          </div>
        </div>
        <div class="item id_img_wp" v-if="detail.businessLicensePhotoId&&detail.businessType==1">
          <div class="img_wp img_wp_width">
            <!-- <input class="file"
                   type="file"
                   ref="out"
                   accept="image/*"
                   @change="onFileChange($event, 'out')" /> -->
            <vmaUploadImg ref="kdbUpregisterId"
                          @change="onFileChange($event, 'kdbUpregisterId')"></vmaUploadImg>
            <div>
              <i v-if="detail.kdbUpregisterId"
                 class="icon iconfont iconshanchu"
                 @click="deleteImg('kdbUpregisterId')"></i>
              <div class="icon iconfont iconzhaoxiangji ml-10"
                   style="font-size:30px;"></div>
              <img v-if="detail.kdbUpregisterId"
                   :src="detail.kdbUpregisterId | previewLoadImage"
                   @click="previewImage(detail.kdbUpregisterId)" />
            </div>
            <p class="img_intro">商户变更登记表</p>
          </div>
        </div>
      </div>


      <div class="match-width box align-default"
           v-if="PROCESS.SJPOS && from!=='share'">
        <div class="title">
          <mu-checkbox v-model="checkboxObj.sjPos"
                       label="手机pos通道"></mu-checkbox>
        </div>
        <div class="item"
             v-if="from!=='share'">
          <div class="subtitle">
            <span class="star"
                  v-show="checkboxObj.sjPos">*</span>手机pos交易费率
          </div>
          <div class="match-left-space align-right input-number">
            <input type="number"
                   placeholder="请填写真实费率"
                   v-model="detail.posTradeRate" />%
          </div>
        </div>
        <div class="item">
          <div class="subtitle">
            <span class="star"
                  v-show="checkboxObj.sjPos">*</span>手机pos提现费
          </div>
          <div class="match-left-space align-right">
            <input placeholder="请输入"
                   v-model="detail.posDrawFee" />
          </div>
        </div>
        <div class="item"
             v-if="from!=='share'">
          <div class="subtitle">
            <span class="star"
                  v-show="checkboxObj.sjPos">*</span>网联交易费率
          </div>
          <div class="match-left-space align-right input-number">
            <input type="number"
                   placeholder="请填写真实费率"
                   v-model="detail.quickTradeRate" />%
          </div>
        </div>
        <div class="item">
          <div class="subtitle">
            <span class="star"
                  v-show="checkboxObj.sjPos">*</span>网联提现费
          </div>
          <div class="match-left-space align-right">
            <input placeholder="请输入"
                   v-model="detail.quickDrawFee" />
          </div>
        </div>
        <!--<div class="item"
             style="border:0;">
          <div class="subtitle">结算银行卡背面照片</div>
        </div>
        <div class="item id_img_wp"
             style="border:0;">
          <div class="img_wp img_wp_width">

            <vmaUploadImg ref="sjPosYinHangKaBeiMian"
                          @change="onFileChange($event, 'sjPosYinHangKaBeiMian')"></vmaUploadImg>
            <i v-if="detail.bankPhotoId"
               class="icon iconfont iconshanchu"
               @click="deleteImg('sjPosYinHangKaBeiMian')"></i>
            <div class="icon iconfont iconzhaoxiangji ml-10"
                 style="font-size:30px;"></div>
            <img v-if="detail.bankPhotoId"
                 :src="detail.bankPhotoId | previewLoadImage"
                 @click="previewImage(detail.bankPhotoId)" />
          </div>
        </div>-->
        <!--<div class="item"
             style="border:0;">
          <div class="subtitle">手持身份证照片</div>
        </div>
        <div class="item id_img_wp"
             style="border:0;">
          <div class="img_wp img_wp_width">
            <vmaUploadImg ref="sjPosShouChi"
                          @change="onFileChange($event, 'sjPosShouChi')"></vmaUploadImg>
            <i v-if="detail.holdingCardId"
               class="icon iconfont iconshanchu"
               @click="deleteImg('sjPosShouChi')"></i>
            <div class="icon iconfont iconzhaoxiangji ml-10"
                 style="font-size:30px;"></div>
            <img v-if="detail.holdingCardId"
                 :src="detail.holdingCardId | previewLoadImage"
                 @click="previewImage(detail.holdingCardId)" />
          </div>
        </div>-->
      </div>


      <div class="match-width box align-default"
           v-if="PROCESS.SXF">
        <div class="title">
          <mu-checkbox v-model="checkboxObj.sxf"
                       label="随行付通道"></mu-checkbox>
        </div>
        <div class="item">
          <VmaCascaderTree v-model="cascaderArr"
                           class="client-info"
                           :dataTree="maccList"
                           :placeholder="'请选择类目'"
                           :modalLabel="'选择类目'"
                           :required="checkboxObj.sxf"
                           label="经营类目"
                           @change="changeMenu"></VmaCascaderTree>
        </div>
        <div class="item"
             v-if="from!=='share'">
          <div class="subtitle">
            <span class="star"
                  v-show="checkboxObj.sxf">*</span>费率
          </div>
          <div class="match-left-space align-right input-number">
            <input type="number"
                   placeholder="请填写真实费率"
                   v-model="detail.sxfRate" />%
          </div>
        </div>
      </div>
      <div class="match-width box align-default"
           v-if="PROCESS.WX">
        <div class="title">
          <mu-checkbox v-model="checkboxObj.wx"
                       label="微信官方通道"></mu-checkbox>
        </div>
        <div class="item">
          <div class="subtitle">
            <span class="star"
                  v-show="checkboxObj.wx">*</span>经营描述
          </div>
          <div class="match-left-space align-right">
            <div class="input align-right"
                 @click="callActionSheet(2)">
              <div>{{detail.productDesc}}</div>
              <div class="icon iconfont iconenter ml-10"></div>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="subtitle">
            <span class="star"
                  v-show="checkboxObj.wx">*</span>经营行业
          </div>
          <div class="match-left-space align-right">
            <div class="input align-right"
                 @click="callActionSheet(1)">
              <div>{{detail.merchantBusiness}}</div>
              <div class="icon iconfont iconenter ml-10"></div>
            </div>
          </div>
        </div>
        <template v-if="Number(detail.businessType)===1">
          <div class="item"
               style="border:0;">
            <div class="subtitle">
              <span class="star"
                    v-show="checkboxObj.wx">*</span>
              法人银行卡
            </div>
          </div>
          <div class="item id_img_wp">
            <div class="img_wp img_wp_width">
              <!-- <input
                class="file"
                type="file"
                ref="bank"
                accept="image/*"
                @change="onFileChange($event, 'bank')"
                style="height:100%;width:100%;display:inline-block;"
              /> -->
              <vmaUploadImg ref="bank"
                            @change="onFileChange($event, 'bank')"></vmaUploadImg>
              <div>
                <i v-if="detail.personAccountPicId"
                   class="icon iconfont iconshanchu"
                   @click="deleteImg('bank')"></i>
                <div class="icon iconfont iconzhaoxiangji ml-10"
                     style="font-size:30px;"></div>
                <img v-if="detail.personAccountPicId"
                     :src="detail.personAccountPicId | previewLoadImage"
                     @click="previewImage(detail.personAccountPicId)" />
              </div>
            </div>
          </div>
          <div class="item">
            <div class="subtitle">
              <span class="star"
                    v-show="checkboxObj.wx">*</span>开户名称
            </div>
            <div class="match-left-space align-right">
              <input placeholder="开户名称"
                     v-model="detail.personAccountName" />
            </div>
          </div>
          <div class="item">
            <div class="subtitle">
              <span class="star"
                    v-show="checkboxObj.wx">*</span>开户总行名称
            </div>
            <div class="match-left-space align-right">
              <input placeholder="开户总行名称"
                     v-model="detail.personAccountBank" />
            </div>
          </div>
          <div class="item">
            <div class="subtitle">
              <span class="star"
                    v-show="checkboxObj.wx">*</span>开户银行账号
            </div>
            <div class="match-left-space align-right">
              <input placeholder="请输入银行账号并仔细核对"
                     v-model="detail.personAccountNumber" />
            </div>
          </div>
          <div class="item">
            <VmaCascaderTree class="client-info"
                             v-model="provinceArr"
                             :dataTree="cascaderTree"
                             :label="'开户支行所在地'"
                             :placeholder="'请选择省市'"
                             :modalLabel="'选择省市'"
                             :required="checkboxObj.wx"
                             @change="changeCity"></VmaCascaderTree>
          </div>
          <div class="item">
            <div class="subtitle">
              <span class="star"
                    v-show="checkboxObj.wx">*</span>开户行银行全称
              <div>（包括支行）</div>
            </div>
            <div class="match-left-space align-right">
              <div class="input align-right"
                   @click="callActionSheet(3)">
                <div style="flex:1;">{{detail.personBankName}}</div>
                <i class="icon iconfont iconenter ml-10"></i>
              </div>
            </div>
          </div>
        </template>
        <div class="item"
             style="border:0;">
          <div class="subtitle">特殊资质</div>
        </div>
        <div class="item id_img_wp">
          <div class="img_wp img_wp_width">
            <!-- <input
              class="file"
              type="file"
              ref="zizhi"
              accept="image/*"
              @change="onFileChange($event, 'zizhi')"
              style="height:100%;width:100%;display:inline-block;"/> -->
            <vmaUploadImg ref="zizhi"
                          @change="onFileChange($event, 'zizhi')"></vmaUploadImg>
            <i v-if="detail.specialQualificationPhotoId"
               class="icon iconfont iconshanchu"
               @click="deleteImg('zizhi')"></i>
            <div class="icon iconfont iconzhaoxiangji ml-10"
                 style="font-size:30px;"></div>
            <img v-if="detail.specialQualificationPhotoId"
                 :src="detail.specialQualificationPhotoId | previewLoadImage"
                 @click="previewImage(detail.specialQualificationPhotoId)" />
          </div>
        </div>
      </div>
      <div class="match-width box align-default"
           v-if="PROCESS.ZFB">
        <div class="title">
          <mu-checkbox v-model="checkboxObj.zfb"
                       label="支付宝"></mu-checkbox>
        </div>
        <div class="item">
          <div class="subtitle">
            <span class="star"
                  v-show="checkboxObj.zfb">*</span>商家支付宝账号
          </div>
          <div class="match-left-space align-right">
            <input placeholder="请输入"
                   v-model="detail.aliAccount" />
          </div>
        </div>
        <div class="item">
          <VmaCascaderTree v-model="zfbCascaderArr"
                           class="client-info"
                           :dataTree="zfbMaccList"
                           :placeholder="'请选择类目'"
                           :modalLabel="'选择类目'"
                           :required="true"
                           label="经营行业"
                           :hasId="true"
                           @change="changeZfbMenu"></VmaCascaderTree>
        </div>
        <div class="item"
             v-if="from!=='share'">
          <div class="subtitle">
            <span class="star"
                  v-show="checkboxObj.zfb">*</span>费率
          </div>
          <div class="match-left-space align-right input-number">
            <input type="number"
                   placeholder="请填写真实费率"
                   v-model="detail.aliRate" />%
          </div>
        </div>
        <div class="item"
             style="border:0;">
          <div class="subtitle">特殊资质</div>
        </div>
        <div class="item id_img_wp"
             style="border:0;">
          <div class="img_wp img_wp_width">

            <vmaUploadImg ref="zfbZizhi"
                          @change="onFileChange($event, 'zfbZizhi')"></vmaUploadImg>
            <i v-if="detail.aliSpecialLicensePic"
               class="icon iconfont iconshanchu"
               @click="deleteImg('zfbZizhi')"></i>
            <div class="icon iconfont iconzhaoxiangji ml-10"
                 style="font-size:30px;"></div>
            <img v-if="detail.aliSpecialLicensePic"
                 :src="detail.aliSpecialLicensePic | previewLoadImage"
                 @click="previewImage(detail.aliSpecialLicensePic)" />
          </div>
        </div>
        <div class="item text-left"
             style="border:0;font-size: 12px;color:red;"
             v-if="needQualification">提示：当前所选行业需要特殊资质：{{needQualification}}</div>
      </div>
      <div class="match-width box align-default"
           v-if="PROCESS.LS">
        <div class="title">
          <mu-checkbox v-model="checkboxObj.ls"
                       label="乐刷通道"></mu-checkbox>
        </div>
        <div class="item">
          <div class="subtitle">
            <span class="star">*</span>是否为餐饮
          </div>
          <div class="match-left-space align-right input-number">
            <mu-switch v-model="detail.isIndustryDining"></mu-switch>
          </div>
        </div>
        <div class="item"
             style="border:0;"
             v-if="detail.isIndustryDining">
          <div class="subtitle">食品卫生许可证</div>
        </div>
        <div class="item id_img_wp"
             v-if="detail.isIndustryDining">
          <div class="img_wp img_wp_width">
            <!-- <input
              class="file"
              type="file"
              ref="leShipin"
              accept="image/*"
              @change="onFileChange($event, 'leShipin')"
              style="height:100%;width:100%;display:inline-block;"
            /> -->
            <vmaUploadImg ref="leShipin"
                          @change="onFileChange($event, 'leShipin')"></vmaUploadImg>
            <i v-if="detail.foodHealthPermissionPic"
               class="icon iconfont iconshanchu"
               @click="deleteImg('leShipin')"></i>
            <div class="icon iconfont iconzhaoxiangji ml-10"
                 style="font-size:30px;"></div>
            <img v-if="detail.foodHealthPermissionPic"
                 :src="detail.foodHealthPermissionPic | previewLoadImage"
                 @click="previewImage(detail.foodHealthPermissionPic)" />
          </div>
        </div>
        <!--<div class="item"
             style="border:0;">
          <div class="subtitle"><span class="star">*</span>收银台照片</div>
        </div>
        <div class="item id_img_wp">
          <div class="img_wp img_wp_width">
            &lt;!&ndash; <input
              class="file"
              type="file"
              ref="leshouyin"
              accept="image/*"
              @change="onFileChange($event, 'leshouyin')"
              style="height:100%;width:100%;display:inline-block;"
            /> &ndash;&gt;
            <vmaUploadImg ref="leshouyin"
                          @change="onFileChange($event, 'leshouyin')"></vmaUploadImg>
            <i v-if="detail.cashierDeskPicId"
               class="icon iconfont iconshanchu"
               @click="deleteImg('leshouyin')"></i>
            <div class="icon iconfont iconzhaoxiangji ml-10"
                 style="font-size:30px;"></div>
            <img v-if="detail.cashierDeskPicId"
                 :src="detail.cashierDeskPicId | previewLoadImage"
                 @click="previewImage(detail.cashierDeskPicId)" />
          </div>
        </div>-->
        <div class="item">
          <VmaCascaderTree v-model="lsCascaderArr"
                           class="client-info"
                           :dataTree="lsMaccList"
                           :placeholder="'请选择类目'"
                           :modalLabel="'选择类目'"
                           :required="true"
                           label="经营类目"
                           @change="changeLsMenu"></VmaCascaderTree>
        </div>
        <div class="item"
             v-if="from!=='share'">
          <div class="subtitle">
            <span class="star">*</span>微信费率
          </div>
          <div class="match-left-space align-right input-number">
            <input type="number"
                   placeholder="请填写真实费率"
                   v-model="detail.leWxRate" />%
          </div>
        </div>
        <div class="item"
             v-if="from!=='share'">
          <div class="subtitle">
            <span class="star">*</span>阿里费率
          </div>
          <div class="match-left-space align-right input-number">
            <input type="number"
                   placeholder="请填写真实费率"
                   v-model="detail.leAliRate" />%
          </div>
        </div>
      </div>
      <div class="match-width box align-default"
           v-if="PROCESS.YS">
        <div class="title">
          <mu-checkbox v-model="checkboxObj.ys"
                       label="威富通通道"></mu-checkbox>
        </div>
        <div class="item">
          <VmaCascaderTree v-model="ysCascaderArr"
                           class="client-info"
                           :dataTree="ysMaccList"
                           :placeholder="'请选择类目'"
                           :modalLabel="'选择类目'"
                           :required="checkboxObj.ys"
                           label="经营类目"
                           @change="changeYsMenu"></VmaCascaderTree>
        </div>
        <div class="item"
             v-if="from!=='share'">
          <div class="subtitle">
            <span class="star"
                  v-show="checkboxObj.ys">*</span>结算费率
          </div>
          <div class="match-left-space align-right input-number">
            <input type="number"
                   placeholder="请填写真实费率"
                   v-model="detail.ysRate" />%
          </div>
        </div>
        <div class="item"
             style="border:0;">
          <div class="subtitle"><span class="star"
                  v-show="checkboxObj.ys">*</span>商家协议</div>
        </div>
        <div class="item id_img_wp">
          <div class="img_wp img_wp_width"
               v-if="proImgList.length"
               v-for="(item, index) in proImgList"
               :key="index"
               style="margin-bottom:20px;">
            <i class="icon iconfont iconshanchu"
               @click="deleteProImg(index)"></i>
            <img :src="item | previewLoadImage"
                 @click="previewImage(item)" />
          </div>
          <div class="img_wp img_wp_width"
               v-if="proImgList.length<4"
               style="margin-bottom:20px;">
            <!-- <input
              class="file"
              type="file"
              ref="xieyi"
              accept="image/*"
              @change="onFileChange($event, 'xieyi')"
              style="height:100%;width:100%;display:inline-block;"
            /> -->
            <vmaUploadImg ref="xieyi"
                          @change="onFileChange($event, 'xieyi')"></vmaUploadImg>
            <div class="icon iconfont iconzhaoxiangji ml-10"
                 style="font-size:30px;"></div>
          </div>
        </div>
      </div>
      <div class="match-width box align-default"
           v-if="PROCESS.CH">
        <div class="title">
          <mu-checkbox v-model="checkboxObj.ch"
                       label="传化通道"></mu-checkbox>
        </div>
        <div class="item">
          <VmaCascaderTree v-model="chCascaderArr"
                           class="client-info"
                           :dataTree="chMaccList"
                           :placeholder="'请选择类目'"
                           :modalLabel="'选择类目'"
                           :required="checkboxObj.ch"
                           label="经营类目"
                           @change="changeChMenu"></VmaCascaderTree>
        </div>
        <div class="item"
             v-if="from!=='share'">
          <div class="subtitle">
            <span class="star"
                  v-show="checkboxObj.ch">*</span>费率
          </div>
          <div class="match-left-space align-right input-number">
            <input type="number"
                   v-model="detail.chRate" />%
          </div>
        </div>
      </div>
      <div class="match-width box align-default"
           v-if="PROCESS.FY">
        <div class="title">
          <mu-checkbox v-model="checkboxObj.fy"
                       label="富友通道"></mu-checkbox>
        </div>
        <div class="item">
          <div class="subtitle">
            <span class="star"
                  v-show="checkboxObj.wx">*</span>商户营业地区补充
          </div>
          <div class="match-left-space align-right">
            <div class="input align-right"
                 @click="callActionSheet(4)">
              <div>{{detail.fuiouAreaName}}</div>
              <div class="icon iconfont iconenter ml-10"></div>
            </div>
          </div>
        </div>
        <div class="item">
          <VmaCascaderTree v-model="fyCascaderArr"
                           class="client-info"
                           :dataTree="fyMaccList"
                           :placeholder="'请选择类目'"
                           :modalLabel="'选择类目'"
                           :required="checkboxObj.fy"
                           label="经营类目"
                           @change="changeFyMenu"></VmaCascaderTree>
        </div>
        <div class="item"
             v-if="from!=='share'">
          <div class="subtitle">
            <span class="star"
                  v-show="checkboxObj.fy">*</span>支付宝费率
          </div>
          <!--          <div class="match-left-space align-right input-number">-->
          <!--            <input type="number"-->
          <!--                   v-model="detail.fuiouAliRate" />%-->
          <!--          </div>-->
          <div class="match-left-space align-right">
            <div class="input align-right"
                 @click="callActionSheet(5)">
              <div>{{fuiouAliRate}}</div>
              <div class="icon iconfont iconenter ml-10"></div>
            </div>
          </div>
        </div>
        <div class="item"
             v-if="from!=='share'">
          <div class="subtitle">
            <span class="star"
                  v-show="checkboxObj.fy">*</span>微信费率
          </div>
          <!--          <div class="match-left-space align-right input-number">-->
          <!--            <input type="number"-->
          <!--                   v-model="detail.fuiouWxRate" />%-->
          <!--          </div>-->
          <div class="match-left-space align-right">
            <div class="input align-right"
                 @click="callActionSheet(6)">
              <div>{{fuiouWxRate}}</div>
              <div class="icon iconfont iconenter ml-10"></div>
            </div>
          </div>
        </div>
        <div class="item"
             style="border:0;">
          <div class="subtitle"><span class="star"
                  v-show="!detail.businessLicensePhotoId">*</span>小微商户手持证件照</div>
        </div>
        <div class="item id_img_wp">
          <div class="img_wp img_wp_width">
            <vmaUploadImg ref="fyXiaowei"
                          @change="onFileChange($event, 'fyXiaowei')"></vmaUploadImg>
            <i v-if="detail.inHandPicId"
               class="icon iconfont iconshanchu"
               @click="deleteImg('fyXiaowei')"></i>
            <div class="icon iconfont iconzhaoxiangji ml-10"
                 style="font-size:30px;"></div>
            <img v-if="detail.inHandPicId"
                 :src="detail.inHandPicId | previewLoadImage"
                 @click="previewImage(detail.inHandPicId)" />
          </div>
        </div>
        <div class="item"
             style="border:0;">
          <div class="subtitle">经营许可证</div>
        </div>
        <div class="item id_img_wp">
          <div class="img_wp img_wp_width">
            <vmaUploadImg ref="fyXuke"
                          @change="onFileChange($event, 'fyXuke')"></vmaUploadImg>
            <i v-if="detail.businessCertPicId"
               class="icon iconfont iconshanchu"
               @click="deleteImg('fyXuke')"></i>
            <div class="icon iconfont iconzhaoxiangji ml-10"
                 style="font-size:30px;"></div>
            <img v-if="detail.businessCertPicId"
                 :src="detail.businessCertPicId | previewLoadImage"
                 @click="previewImage(detail.businessCertPicId)" />
          </div>
        </div>
      </div>

      <!--<div class="match-width box align-default"
           v-if="PROCESS.LKL">
        <div class="title">
          <mu-checkbox v-model="checkboxObj.lkl"
                       label="拉卡拉通道"></mu-checkbox>
        </div>
        <div class="item">
          <VmaCascaderTree v-model="lklCascaderArr"
                           class="client-info"
                           :dataTree="lklMaccList"
                           :placeholder="'请选择类目'"
                           :modalLabel="'选择类目'"
                           :required="checkboxObj.lkl"
                           :hasId="true"
                           label="经营类目"
                           @change="changeLklMenu"></VmaCascaderTree>
        </div>
        <div class="item"
             v-if="from!=='share'">
          <div class="subtitle">
            <span class="star"
                  v-show="checkboxObj.lkl">*</span>费率
          </div>
          <div class="match-left-space align-right input-number">
            <input type="number"
                   v-model="detail.lakalaRate" />%
          </div>
        </div>
       &lt;!&ndash; <div class="item"
             v-if="from!=='share'">
          <div class="subtitle">
            <span class="star"
                  v-show="checkboxObj.lkl">*</span>支付宝费率
          </div>
          &lt;!&ndash;          <div class="match-left-space align-right input-number">&ndash;&gt;
          &lt;!&ndash;            <input type="number"&ndash;&gt;
          &lt;!&ndash;                   v-model="detail.fuiouAliRate" />%&ndash;&gt;
          &lt;!&ndash;          </div>&ndash;&gt;
          <div class="match-left-space align-right">
            <div class="input align-right"
                 @click="callActionSheet(5)">
              <div>{{lklAliRate}}</div>
              <div class="icon iconfont iconenter ml-10"></div>
            </div>
          </div>
        </div>&ndash;&gt;
       &lt;!&ndash; <div class="item"
             v-if="from!=='share'">
          <div class="subtitle">
            <span class="star"
                  v-show="checkboxObj.lkl">*</span>微信费率
          </div>
          &lt;!&ndash;          <div class="match-left-space align-right input-number">&ndash;&gt;
          &lt;!&ndash;            <input type="number"&ndash;&gt;
          &lt;!&ndash;                   v-model="detail.fuiouWxRate" />%&ndash;&gt;
          &lt;!&ndash;          </div>&ndash;&gt;
          <div class="match-left-space align-right">
            <div class="input align-right"
                 @click="callActionSheet(6)">
              <div>{{lklWxRate}}</div>
              <div class="icon iconfont iconenter ml-10"></div>
            </div>
          </div>
        </div>&ndash;&gt;
      </div>-->
      <div class="match-width box align-center">
        <div class="next box align-center"
             @click="onNext">提交</div>
      </div>

<!--简单树-->
      <mu-bottom-sheet :open.sync="openSimpleTree">
        <div class="action-sheet box align-default">
          <div class="title box align-hor-bet plr-30">
            <div @click="simpleTreeBack">返回</div>
            <!-- <div class="confirm">
              <div  @click="onActionSheetConfirm(2)">确定</div>
              <div v-else @click="onNextStep">取消</div>
            </div> -->
          </div>
        </div>
        <div v-if="simpleTreeStatus === 1">
          <div class="action-sheet__header align-left box plr-30">请选择公司类型</div>
          <div class="action-sheet__content">
            <div class="match-width"
                 v-for="(item, index) in kdbcompanyTypeList"
                 :key="index">
              <div :class="['item align-hor-bet plr-30 ptb-30', (item.value === detail.kdbCompanyType)?'active':'']"
                   @click="simpleTreeSelect(item)">
                <div>{{item.name}}</div>
                <!-- <div v-if="item.value === threeList[curThree]" class="icon iconfont iconcheck"></div> -->
                <!-- <div class="pass" v-else></div> -->
              </div>
            </div>
          </div>
        </div>

        <div v-if="simpleTreeStatus === 2">
          <div class="action-sheet__header align-left box plr-30">请选择到账周期类型</div>
          <div class="action-sheet__content">
            <div class="match-width"
                 v-for="(item, index) in kdbSettlementCycleTypeList"
                 :key="index">
              <div :class="['item align-hor-bet plr-30 ptb-30', (item.value === detail.kdbWxSettlementCycle)?'active':'']"
                   @click="simpleTreeSelect(item)">
                <div>{{item.name}}</div>
                <!-- <div v-if="item.value === threeList[curThree]" class="icon iconfont iconcheck"></div> -->
                <!-- <div class="pass" v-else></div> -->
              </div>
            </div>
          </div>
        </div>

        <div v-if="simpleTreeStatus === 3">
          <div class="action-sheet__header align-left box plr-30">请选择性别</div>
          <div class="action-sheet__content">
            <div class="match-width"
                 v-for="(item, index) in kdbsexList"
                 :key="index">
              <div :class="['item align-hor-bet plr-30 ptb-30', (item.value === detail.kdbSex)?'active':'']"
                   @click="simpleTreeSelect(item)">
                <div>{{item.name}}</div>
                <!-- <div v-if="item.value === threeList[curThree]" class="icon iconfont iconcheck"></div> -->
                <!-- <div class="pass" v-else></div> -->
              </div>
            </div>
          </div>
        </div>

        <div v-if="simpleTreeStatus === 4">
          <div class="action-sheet__header align-left box plr-30">请选择结算账户类型</div>
          <div class="action-sheet__content">
            <div class="match-width"
                 v-for="(item, index) in kdbAccountTypeList"
                 :key="index">
              <div :class="['item align-hor-bet plr-30 ptb-30', (item.value === detail.kdbAccountType)?'active':'']"
                   @click="simpleTreeSelect(item)">
                <div>{{item.name}}</div>
                <!-- <div v-if="item.value === threeList[curThree]" class="icon iconfont iconcheck"></div> -->
                <!-- <div class="pass" v-else></div> -->
              </div>
            </div>
          </div>
        </div>

        <div v-if="simpleTreeStatus === 5">
          <div class="action-sheet__header align-left box plr-30">请选择到账周期类型</div>
          <div class="action-sheet__content">
            <div class="match-width"
                 v-for="(item, index) in yiSSettlementCycleTypeList"
                 :key="index">
              <div :class="['item align-hor-bet plr-30 ptb-30', (item.value === detail.ysIsService)?'active':'']"
                   @click="simpleTreeSelect(item)">
                <div>{{item.name}}</div>
                <!-- <div v-if="item.value === threeList[curThree]" class="icon iconfont iconcheck"></div> -->
                <!-- <div class="pass" v-else></div> -->
              </div>
            </div>
          </div>
        </div>

      </mu-bottom-sheet>

<!--易生验证码-->
      <mu-dialog title="提示"
                 width="600"
                 max-width="80%"
                 :esc-press-close="false"
                 :overlay-close="false"
                 :open.sync="openAlert">
        <!--      <p class="fs-14 mb-12">请输入登录密码</p>-->
        <input
          type="text"
          placeholder="请输入易生手机验证码"
          v-model="yiSMsgCode" />
        <mu-button slot="actions"
                   flat
                   color="primary"
                   @click="closeAlertDialog">取消</mu-button>
        <mu-button slot="actions"
                   flat
                   color="primary"
                   @click="sendYiSMsgCode">确定</mu-button>
      </mu-dialog>
      <!-- action-sheet -->
      <mu-bottom-sheet :open.sync="open">
        <div class="action-sheet box align-default">
          <div class="title box align-hor-bet plr-30">
            <div @click="onActionSheetClose">返回</div>
            <div class="confirm"
                 @click="onActionSheetConfirm">确定</div>
          </div>

          <!-- 经营行业 -->
          <div v-if="status == 1"
               class="fixed-height">
            <div class="match-width"
                 v-for="(item, index) in accountTypes"
                 :key="index">
              <div :class="['item align-hor-bet plr-30 ptb-30', index==curBusiness?'active':'']"
                   @click="changeBusiness(index)">
                <div>{{item}}</div>
                <div v-if="index==curBusiness"
                     class="icon iconfont iconcheck"></div>
                <div class="pass"
                     v-else></div>
              </div>
            </div>
          </div>
          <!-- 经营描述 -->
          <div v-if="status == 2"
               class="fixed-height">
            <div class="match-width"
                 v-for="(item, index) in productDesc"
                 :key="index">
              <div :class="['item align-hor-bet plr-30 ptb-30', index==curDesc?'active':'']"
                   @click="changeDesc(index)">
                <div>{{item}}</div>
                <div v-if="index==curDesc"
                     class="icon iconfont iconcheck"></div>
                <div class="pass"
                     v-else></div>
              </div>
            </div>
          </div>
          <!-- 商户营业地区补充 -->
          <div v-if="status == 4"
               class="fixed-height 123">
            <div class="match-width"
                 v-for="(item, index) in merchantAreaList"
                 :key="index">
              <div :class="['item align-hor-bet plr-30 ptb-30', index==curMerchantAreaIndex?'active':'']"
                   @click="changeMerchantArea(index)">
                <div>{{item.areaName}}</div>
                <div v-if="index==curMerchantAreaIndex"
                     class="icon iconfont iconcheck"></div>
                <div class="pass"
                     v-else></div>
              </div>
            </div>
          </div>
          <!-- 费率 -->
          <div v-if="status == 5 || status == 6"
               class="fixed-height">
            <div class="match-width"
                 v-for="(item, index) in rateList"
                 :key="index">
              <div :class="['item align-hor-bet plr-30 ptb-30', index==curRateIndex?'active':'']"
                   @click="changeRate(index)">
                <div>{{item.rateDesc}}</div>
                <div v-if="index==curRateIndex"
                     class="icon iconfont iconcheck"></div>
                <div class="pass"
                     v-else></div>
              </div>
            </div>
          </div>
          <!-- 开户行银行名称 -->
          <div class="input-wrap plr-60"
               v-if="status == 3">
            <i class="iconfont iconsearch pre-icon"></i>
            <input v-model="keyword"
                   class="input"
                   placeholder="例：xx银行xx支行"
                   @keyup.enter="handleSearch"
                   @input="handleInputSearch" />
          </div>
          <div style="min-height:100px;max-height:300px;overflow-y:auto;"
               v-if="status == 3">
            <div class="match-width"
                 v-for="(item, index) in bankNameList"
                 :key="index">

              <div :class="['item align-hor-bet plr-30 ptb-30', index===curBankName?'active':'']"
                   @click="changeBankName(index)">
                <div style="width:80%">{{item.bankName}}</div>
                <div v-if="index===curBankName"
                     class="icon iconfont iconcheck"></div>
                <div class="pass"
                     v-else></div>
              </div>
            </div>
          </div>
              <!--选择到账周期-->

          <!--<div v-if="status == 7">
            <div class="action-sheet__content">
              <div class="match-width"
                   v-for="(item, index) in kdbSettlementCycleTypeList"
                   :key="index">
                <div :class="['item align-hor-bet plr-30 ptb-30', (item.kdbWxSettlementCycle === detail.settlementCycle)?'active':'']"
                     @click="getSettlementCycle(item)">
                  <div>{{item.label}}</div>
                  &lt;!&ndash; <div v-if="item.value === threeList[curThree]" class="icon iconfont iconcheck"></div> &ndash;&gt;
                  &lt;!&ndash; <div class="pass" v-else></div> &ndash;&gt;
                </div>
              </div>
            </div>
          </div>-->


          <!-- 补脚 -->
          <div class="action-sheet__padding"></div>
        </div>
      </mu-bottom-sheet>

      <!-- action-sheet -->
      <mu-bottom-sheet :open.sync="openMenu">
        <div class="action-sheet box align-default menu">
          <div class="item align-center"
               @click="onTakePhoto(1)">拍照</div>

          <div class="item align-center"
               @click="onTakePhoto(2)">从手机相册选择</div>

          <div class="item align-center cancel"
               @click="onActionMenuShow(2)">取消</div>

          <!-- 补脚 -->
          <div class="action-sheet__padding"></div>
        </div>
      </mu-bottom-sheet>
      <!-- 隐藏获取图片 -->
      <div class="file">
        <input type="file"
               ref="fileCamera"
               capture="camera"
               accept="image/*"
               @change="onFileChange" />
        <div class="cover"></div>
      </div>
      <!-- 隐藏获取图片 -->
      <div class="file">
        <input type="file"
               ref="file"
               accept="image/*"
               @change="onFileChange" />
        <div class="cover"></div>
      </div>
    </div>
    <!-- 图片预览 -->
    <vmaImagePreview :dialog="previewDialog"></vmaImagePreview>
  </div>
</template>

<script>
import { url } from '@/utils/src/request'
import { initProvinces } from '@/utils/src/common'
import { CLIENT_INFO_BASE, CLIENT_INFO_DETAIL } from '@/router/types'
// clientInfoDetailIDLocal
import VmaCascaderTree from '@/components/common/vmaCascaderTree'

import { clientInfoDetailLocal, clientInfoDetailMerchantNameLocal, fromReactNativeLocal } from '@/storage'
import { clientInfoApi, agentOrClient } from '@/api'
import vmaUploadImg from '@/components/common/vmaUploadImg'
import vmaImagePreview from '@/components/common/vmaImagePreview'
import indexMixins from './src/mixins'
// import PROCESS from '@/constants'
import { getProcess } from '@/constants'
import { NativeAppRouter } from '../../utils/src/webviewBridgeUtils'


export default {
  components: {
    VmaCascaderTree,
    vmaUploadImg,
    vmaImagePreview
  },
  mixins: [indexMixins],
  data() {
    return {
      // PROCESS,
      PROCESS: {
          //所有的值会被mounted里接口请求的数据覆盖
          YL:false,
        SXF: false,
        WX: false,
        LS: false,
        YS: false,
        CH: false,
        ZFB: false,
        FY: false,
        LKL:false,
        SJPOS:false,
        KDB:false,
        CJ:false, //畅捷
        YIS:false

      },
      checkboxObj: {
        sxf: false,
        wx: false,
        zfb: false,
        ls: false,
        ys: false,
        ch: false,
        fy: false,
        lkl: false,
        sjPos: false,
        kdb:false,
        cj:false, //畅捷
        yiS:false
      },
      openAlert: false,
      openSimpleTree:false, //简单选择树
      simpleTreeStatus: 0,

      kdbJjkTradeRate:'0.37',  //二级经营类目id
      curBankName: '',
      keyword: '',
      bankNameList: [],
      from: sessionStorage.from || '',
      // link: sessionStorage.link,
      // iframe: sessionStorage.iframe ? JSON.parse(sessionStorage.iframe) : false,
      options: [],
      proImgList: [], // 商家协议图片id列表

      kdbCompanyTypeText:'请选择公司类型',
      kdbcompanyTypeList: [
        {value:'1',
          name:'股份有限责任公司'
        },
        {value:'2',
          name:'有限责任公司'
        },
        {value:'3',
          name:'非公司企业法人'
        },
        {value:'4',
          name:'私营合伙企业5'
        },
        {value:'5',
          name:'私营独资企业'
        },
        {value:'6',
          name:'个体工商户'
        },
      ],
      kdbSettlementCycleTypeList: [
        {
          value: 0,
          name: 'D0'
        },
        {
          value: 1,
          name: 'T1'
        }
      ],//结算周期类型列表
      yiSSettlementCycleTypeList: [
        {
          value: 1,
          name: 'D0'
        },
        {
          value: 0,
          name: 'T1'
        }
      ],//结算周期类型列表
      kdbsexList: [
        {
          value: 1,
          name: '男'
        },
        {
          value: 2,
          name: '女'
        }
      ],
      kdbAccountTypeList: [
        {
          value: 1,
          name: '对私结算'
        },
        {
          value: 2,
          name: '对公结算'
        }
      ],
      kdbSexText:'请选择性别',
      kdbSettlementCycleTypeText:'请选择到账周期类型',
      kdbAccountTypeText:'请选择结算账户类型',
      yiSSettlementCycleTypeText:'请选择到账周期类型',
      yiSMsgCode:'',
      yiSUserId:'', //获取验证码的接口返回的
      detail: {
        importNums:[], //勾选则进件，不勾选不进件（以前的后台逻辑是该通道有值就会进件，会出现重复进件情况）
        isCommit: 1,
        sxfRate: 0.38,
        kdbWxTradeRate: 0.38,
        productDesc: '',
        personBankName: '',
        personAccountNumber: '',
        personAccountBank: '',
        personAccountName: '',
        personAccountPicId: '',
        aliSpecialLicensePic: '',
        specialQualificationPhotoId: '',
        accounRegProvCd: '',
        accounRegCityCd: '',
        //  手机pos
        posDrawFee: '', // 手机pos提现费
        posTradeRate: '', // 手机pos交易费率
        quickDrawFee: '', // 网联提现费
        quickTradeRate: '', // 网联交易费率
        bankPhotoId: '', //手机pos银行卡背面照片ID
        holdingCardId: '', //手机pos手持身份证照片
      //  开店宝

        kdbCompanyType:'', //公司类型
        kdbWxSettlementCycle:'',//结算周期
        kdbProvinceId:'',
        kdbCityId:'',
        kdbAreaId:'',
        kdbAccountType:'',  //结算账户类型 1对私结算  2对公结算
        kdbSex:'', //性别
        kdbRegistryId:'',  //注册登记表照片id
        kdbAgreementId:'',  //收单协议照片id
        kdbUpregisterId:'',  //开店宝商户变更登记表照片id
        kdbBusinessId:'',  //二级经营类目id
        kdbBusinessId1:'',  //一级经营类目id
      //  开店宝手动赋值字段--开始
        kdbJjkTradeRate:'',  //
        kdbDjkTradeRate:'',  //
        kdbJjkSettlementCycle:'',  //
        kdbDjkSettlementCycle:'',  //
        kdbJjkDiscountRate:'',  //
        kdbDjkDiscountRate:'',  //
        kdbSingleServiceFeeUpLimit:'',  //
        kdbServiceRate:'',
      //  开店宝手动赋值字段--结束
      //  畅捷
        mccCodeClass: '', //一级经营类目    反显用
        mccCode:'',  //二级经营类目id
        mccName:'',  //二级经营类目name
        productCode:'',
        chanpayTradeRate:'',
        operationProvinceCode:'',
        operationProvinceName:'',
        operationCityCode:'',
        operationCityName:'',
        operationDistrictCode:'',
        operationDistrictName:'',

      //  易生
        ysJjkRate:  '',  //银联借记卡费率  0.55
        ysDjkRate:  '',  //银联贷记卡费率 0.55
        ysZfbRate:  '',  //支付宝费率  0.38
        ysWxRate:  '',  //微信费率  0.38
        ysYlRate:  '',  //银联费率  0.38
        ysJjkDiscountRate:  '',  //借记卡封顶金额 20
        ysServiceType :  '',  //实时到账服务计费类型 0-按笔数（单位：元）;1-按比例（单位：%）  1
        ysJjkRateType:  '',  //借记卡扣率方式 :1-封顶;0-不封顶  1
        ysJjkRateMin :  '',  //借记卡手续费最低值 0
        ysDjkRateMin :  '',  //信用卡手续费最低值 0
        ysAgreementId:  '',  // 易生协议图片id
        ysRegistryId:  '',  // 易生注册登记表图片id
        ysIsService :  '',  //是否开通D0秒到服务  0否1是
        ysYloneAreaCode:  '',  //银联标准一级区域编码
        ysYltwoAreaCode:  '',  //银联标准二级区域编码
        ysYlthreeAreaCode:  '',  //银联标准三级区域编码
        ysYloneMccCode:  '',  //银联标准一级Mcc编码
        ysYltwoMccCode:  '',  //银联标准二级Mcc编码
        ysYlthreeMccCode:  '',  //银联标准三级Mcc编码

      },
      //经营类目渲染树用
      maccList: [],
      lsMaccList: [],
      ysMaccList: [],
      zfbMaccList: [],
      fyMaccList: [],
      lklMaccList: [],
      chMaccList: [],
      cascaderArr: [], // (随行付)经营类目
      provinceArr: [],
      cascaderTree: [],
      kdbAddressTree: [], //开店宝经营地址树
      kdbMaccTree:[],
      cjMaccTree:[],
      cjAddressTree: [],
      yiSMaccTree:[],
      yiSAddressTree: [],


      // 经营类目返显用
      ysCascaderArr: [], // (威富通)经营类目
      lsCascaderArr: [], // (乐刷)经营类目
      chCascaderArr: [], // (传化)经营类目
      zfbCascaderArr: [], // (支付宝)经营行业
      fyCascaderArr: [], // (富友)经营行业
      lklCascaderArr: [], // (拉卡拉)经营行业
      kdbCascaderArr: [], // (开店宝)经营行业 v-module
      kdbAddressArr: [], // (开店宝)经营地址反显
      cjAddressArr: [],
      cjCascaderArr: [], // (畅捷)经营行业 v-module
      yiSAddressArr: [],
      yiSCascaderArr: [], // (畅捷)经营行业 v-module

      rate: {},
      open: false,
      status: 0,
      scenes: ['线下', '公众号/小程序', '网站', 'APP'],
      curScene: 0,
      majors: ['企业', '个体工商户'],
      curMajor: 0,
      appStates: ['已上线', '未上线'],
      curAppState: 0,
      openMenu: false,
      photoTaker: 0,
      accountTypes: [], // 经营行业
      productDesc: [], // 经营描述
      merchantAreaList: [], // 商户营业地区补充
      curBusiness: 0,
      curDesc: 0,
      curMerchantAreaIndex: 0,
      isImagePreview: false,
      openMacc: false,
      imgUrl: '',
      merchantName: '',
      fuiouAliRate: '',
      fuiouWxRate: '',
      rateList: [], // 费率列表
      curRateIndex: 0, // 当前选中的费率
      curZfbRateIndex: 0,
      curWxRateIndex: 0,
      levelIndex: 0, // 遍历树结构数据的所在层级
      needQualification: null // 某需要行业需要特殊资质
    }
  },
  watch: {
    proImgList(val) {
      if (!val.length) {
        this.detail.pro = ''
      } else {
        this.detail.pro = val.join(';')
      }
    },
    provinceArr(val) {
      if (val.length) {
        this.detail.accounRegProvCd = val[0]
        if (val.length > 1) {
          this.detail.accounRegCityCd = val[1]
        }
      } else {
        this.detail.accounRegProvCd = ''
        this.detail.accounRegCityCd = ''
        this.detail.accounRegProvName = ''
        this.detail.accounRegCityName = ''
      }
    },
    cascaderArr(val) {
      if (val.length) {
        this.detail.mccClassCd = val[0]
        if (val.length > 1) {
          this.detail.mccCd = val[1]
        }
      } else {
        this.detail.mccCd = ''
        this.detail.mccClassCd = ''
      }
    },
    lsCascaderArr(val) {
      if (val.length) {
        this.detail.leFirstMccCode = val[0]
        this.detail.leSecondMccCode = val[1]
        this.detail.leMccCode = val[2]
      } else {
        this.detail.leFirstMccCode = ''
        this.detail.leSecondMccCode = ''
        this.detail.leMccCode = ''
      }
    },
    ysCascaderArr(val) {
      if (val.length) {
        this.detail.ysFirstName = val[0]
        this.detail.ysSecondName = val[1]
        this.detail.industrId = val[2]
      } else {
        this.detail.ysFirstName = ''
        this.detail.ysSecondName = ''
        this.detail.industrId = ''
      }
    },
    chCascaderArr(val) {
      if (val.length) {
        this.detail.chMccCode = val[0]
        this.detail.chSubMccCode = val[1]
      } else {
        this.detail.chMccCode = ''
        this.detail.chSubMccCode = ''
      }
    },
    zfbCascaderArr(val) {
      if (val.length) {
        // this.detail.aliFirstLevel = val[0]
        // this.detail.aliSecondLevel = val[1]
        this.detail.aliMccCode = val[2]
      } else {
        this.detail.aliFirstLevel = ''
        this.detail.aliSecondLevel = ''
        this.detail.aliThirdLevel = ''
        this.detail.aliMccCode = ''
      }
    },
    fyCascaderArr(val) {
      if (val.length) {
        // this.detail.fuiouFirstMccCode = val[0]
        // this.detail.fuiouSecondMccCode = val[1]
        // this.detail.fuiouBusiness = val[2]
      } else {
        this.detail.fuiouFirstMccCode = ''
        this.detail.fuiouSecondMccCode = ''
        this.detail.fuiouBusiness = ''
      }
    },
    //复制的  CascaderArr
    lklCascaderArr(val) {
      console.log('lklCascaderArrwacht===========',val)
      if (val.length) {
        this.detail.lakalaMccCode = val[0]
        // this.detail.lklMccClassCd = val[0]
        /*if (val.length > 1) {
          this.detail.lakalaMccCode = val[0]
        }*/
      } else {
        this.detail.lakalaMccCode = ''
        // this.detail.lklMccClassCd = ''
      }
    },

  },
  methods: {
    closeAlertDialog() {
      this.openAlert = false
    },
    sendYiSMsgCode(){
      this.openAlert = false
      Object.assign(this.detail,{userId:this.yiSUserId, messageCode:this.yiSMsgCode})
      clientInfoApi.sendYiSMsgCode(this.detail).then(res=>{

        this.submitMchIfo(this.detail,{ysRegistryId:res.obj.ysRegistryId,ysAgreementId:res.obj.ysAgreementId});
        },
        err => {
          if (err && err.msg) {
            this.$toast.error(err.msg)
          }
        })
    },
    getYiSMsgCode(){
      clientInfoApi.getYiSMessageCode(this.detail).then(res=>{
        this.yiSUserId = res.obj
        this.openAlert = true;
        // this.sendYiSMsgCode();

      },
        err => {
          if (err && err.msg) {
            this.$toast.error(err.msg)
          }
        })
    },
    handleSearch() {
      this.getBranchCode(this.keyword)
    },
   /* getSettlementCycle(item) {
      this.detail.settlementCycle = String(item.value)
    },*/
    handleInputSearch() {
      // this.handleSearch()
    },
    changeCity(item) {
      this.detail.accounRegProvName = item[0].name
      this.detail.accounRegCityName = item[1].name
    },

    //经营地址省市区选择  畅捷
    changeCjAddress(val) {
      // id
      this.detail.operationProvinceCode = val[0].id
      this.detail.operationProvinceName = val[0].name
      this.detail.operationCityCode = val[1].id
      this.detail.operationCityName = val[1].name
      this.detail.operationDistrictCode = ''
      this.detail.operationDistrictName = ''
      if (val.length === 3) {
        this.detail.operationDistrictCode = val[2].id
        this.detail.operationDistrictName = val[2].name
      }
    },
    //经营地址省市区选择  开店宝
    changeShopAddress(val) {
      // id
      this.detail.kdbProvinceId = val[0].id
      this.detail.kdbCityId = val[1].id
      this.detail.kdbAreaId = ''

      if (val.length === 3) {
        this.detail.kdbAreaId = val[2].id
      }
    },
    // 选择随行付经营类目
    changeMenu(item) {
      this.detail.mccCdName = item ? item.map(res => res.name).join('/') : ''
    },
    // 选择乐刷经营类目
    changeLsMenu(item) {
      this.detail.leMccName = item ? item.map(res => res.name).join('/') : ''
    },
    // 选择威富通经营类目
    changeYsMenu(item) {
      this.detail.industrName = item ? item.map(res => res.name).join('/') : ''
    },
    // 选择传化经营类目
    changeChMenu(item) {
      this.detail.chMccCodeName = item ? item.map(res => res.name).join('/') : ''
    },
    // 选择支付宝经营行业
    changeZfbMenu(item) {
      console.log('选择支付宝经营行业i', item)
      if (item.length) {
        this.detail.aliFirstLevel = item[0].name
        this.detail.aliSecondLevel = item[1].name
        this.detail.aliThirdLevel = item[2].name
        this.needQualification = item[2].remark
      }
    },

    // 选择富友经营类目
    changeFyMenu(item) {
      if (item.length) {
        this.detail.fuiouFirstMccCode = item[0].name
        this.detail.fuiouSecondMccCode = item[1].name
        this.detail.fuiouBusiness = item[2].name
      }
    },
    // 选择开店宝经营类目
    changeKdbMenu(item) {
      if (item.length) {
        // console.log('选择开店宝经营类目8888888888:',item[0].id)
        // console.log('选择开店宝经营类目999999999:',item[1].id)
        this.$set(this.detail, "kdbBusinessId1", item[0].id);
        this.$set(this.detail, "kdbBusinessId", item[1].id);
      }
    },
    // 选择畅捷经营类目
    changeCjMenu(item) {
      if (item.length) {
        // console.log('选择开店宝经营类目8888888888:',item[0].id)
        // console.log('选择开店宝经营类目999999999:',item[1].id)
        this.$set(this.detail, "mccCodeClass", item[0].id);
        this.$set(this.detail, "mccCode", item[1].id);
        this.$set(this.detail, "mccName", item[1].name);
      }
    },
    // 选择拉卡拉经营类目
    changeLklMenu(item) {
      /*this.detail.lklMccCdName = item ? item.map(res => res.name).join('/') : '';
      this.detail.lakalaMccCode = item ? item[0].code:'';*/
    },
// ===================================================================
    // 选择经营类目  易生
    changeYiSMenu(item) {
      if (item.length) {
        this.detail.ysYloneMccCode = item[0].id
        this.detail.ysYltwoMccCode = item[1].id
        this.detail.ysYlthreeMccCode = item[2].id
        // console.log('选择开店宝经营类目8888888888:',item[0].id)
        // console.log('选择开店宝经营类目999999999:',item[1].id)
        /*this.$set(this.detail, "mccCodeClass", item[0].id);
        this.$set(this.detail, "mccCode", item[1].id);
        this.$set(this.detail, "mccName", item[1].name);*/
      }
    },

    //经营地址省市区选择  易生
    changeYiSAddress(val) {
      this.detail.ysYloneAreaCode = val[0].id
      // this.detail.operationProvinceName = val[0].name
      this.detail.ysYltwoAreaCode = val[1].id
      // this.detail.operationCityName = val[1].name
      this.detail.ysYlthreeAreaCode = ''
      // this.detail.operationDistrictName = ''
      if (val.length === 3) {
        this.detail.ysYlthreeAreaCode = val[2].id
        // this.detail.operationDistrictName = val[2].name
      }
    },


    /**
     * 删除图片，清空相关的所有数据
     */
    deleteImg(type) {
      if (type === 'bank') {
        this.detail.personAccountPicId = ''
        this.detail.personAccountName = ''
        this.detail.personAccountBank = ''
        this.detail.personAccountNumber = ''
        this.detail.personBankName = ''
        this.provinceArr = []
      }
      if (type === 'zizhi') {
        this.detail.specialQualificationPhotoId = ''
      }
      if (type === 'leShipin') {
        this.detail.foodHealthPermissionPic = ''
      }
      /*if (type === 'leshouyin') {
        this.detail.cashierDeskPicId = ''
      }*/
      if (type === 'fyXiaowei') {
        this.detail.inHandPicId = ''
      }
      if (type === 'fyXuke') {
        this.detail.businessCertPicId = ''
      }
      if (type === 'sjPosYinHangKaBeiMian') {
        this.detail.bankPhotoId = ''
      }
      if (type === 'sjPosShouChi') {
        this.detail.holdingCardId = ''
      }else if(type === 'kdbRegistryId'){
        //开店宝注册登记表照片id
        this.detail.kdbRegistryId = ''
      }else if(type === 'kdbAgreementId'){
        //开店宝收单协议照片id
        this.detail.kdbAgreementId = ''
      }else if(type === 'kdbUpregisterId'){
        //开店宝开店宝商户变更登记表照片id
        this.detail.kdbUpregisterId = ''
      }


    },
    // 删除商家协议图片
    deleteProImg(index) {
      this.proImgList.splice(index, 1)
    },
    // 重置
    handleReset() {
      this.cascaderArr = []
      this.provinceArr = []
      this.detail.mccCdName = ''
      this.detail.productDesc = ''
      this.detail.merchantBusiness = ''
      // this.detail.accountType = ''
      this.detail.personAccountPicId = ''
      this.detail.personAccountName = ''
      this.detail.personAccountBank = ''
      this.detail.personAccountNumber = ''
      this.detail.personBankName = ''
      this.detail.specialQualificationPhotoId = ''

      // 支付宝
      this.detail.aliAccount = ''
      this.zfbCascaderArr = []
      this.detail.aliSpecialLicensePic = ''
      // 乐刷
      this.detail.aliAccount = ''
      this.detail.isIndustryDining = false
      this.detail.foodHealthPermissionPic = ''
      // this.detail.cashierDeskPicId = ''
      this.lsCascaderArr = []
      this.detail.leMccName = ''
      // 威富通
      this.ysCascaderArr = []
      this.detail.industrName = ''
      this.proImgList = []
      // 传化
      this.chCascaderArr = []
      this.detail.chMccCodeName = ''
      // 富友
      this.fyCascaderArr = []
      this.detail.businessCertPicId = ''
      this.detail.inHandPicId = ''
      this.detail.fuiouAreaName = ''
      this.detail.fuiouAreaId = ''
      // 拉卡拉
      this.lklCascaderArr = []
      this.detail.lakalaMccCode = ''
      //  手机pos
      this.detail.posDrawFee = '' // 手机pos提现费
      this.detail.posTradeRate = '' // 手机pos交易费率
      this.detail.quickDrawFee = '' // 网联提现费
      this.detail.quickTradeRate = '' // 网联交易费率
      this.detail.bankPhotoId = '', //手机pos银行卡背面照片ID
      this.detail.holdingCardId = '' //手机pos手持身份证照片

      if (this.from !== 'share') { // 复制链接进件时，不要重置费率
        this.detail.sxfRate = ''
        this.detail.ysRate = ''
        this.detail.chRate = ''
        this.detail.leWxRate = ''
        this.detail.leAliRate = ''
        this.detail.aliRate = ''
        this.detail.fuiouWxRate = ''
        this.detail.fuiouAliRate = ''
        this.detail.lakalaRate = ''
        this.detail.posDrawFee = '' // 手机pos提现费
        this.detail.posTradeRate = '' // 手机pos交易费率
        this.detail.quickDrawFee = '' // 网联提现费
        this.detail.quickTradeRate = '' // 网联交易费率
       /* this.detail.lklWxRate = ''
        this.detail.lklAliRate = ''*/
      }
    },
    // 返回
    onBack() {
      // TODO
      this.$router.push({
        name: CLIENT_INFO_BASE,
        query: {
          id: this.detail.id
        }
      })
    },
    // 选择经营行业
    changeBusiness(index) {
      this.curBusiness = index
      // this.detail.merchantBusiness = this.accountTypes[index]
    },
    // 获取经营行业
    getBusiness() {
      // let that = this
      agentOrClient.getBusiness({ type: this.detail.businessType }).then(res => {
        this.accountTypes = res.obj
      })
    },
    // 选择经营描述
    changeDesc(index) {
      this.curDesc = index
    },
    // 获取经营描述
    getProductDesc() {
      // let that = this
      agentOrClient.getProductDesc().then(res => {
        this.productDesc = res.obj
      })
    },
    // 选择商户区域地区
    changeMerchantArea(index) {
      this.curMerchantAreaIndex = index
    },
    // 获取商户区域地区补充
    getMerchantAreaList() {
      // let that = this
      agentOrClient.getFyAreaList({ provinceName: this.detail.regProvCdName, cityName: this.detail.regCityCdName }).then(res => {
        this.merchantAreaList = res.obj
      })
    },
    // （富友）选择费率
    changeRate(index) {
      if (this.status === 5) { // 支付宝
        this.curZfbRateIndex = index
      } else if (this.status === 6) { // 微信
        this.curWxRateIndex = index
      }
      this.curRateIndex = index
    },
    // 选择开户银行总称
    changeBankName(index) {
      this.curBankName = index
      // this.detail.merchantBusiness = this.accountTypes[index]
    },
    /**
     * 获取省市区
     */
    getProviceAndCity() {
      let that = this
      agentOrClient.getBankProvice().then(res => {
        let arr = res.obj.map(item => {
          let newItem = {}
          newItem.id = item.provinceCode
          newItem.name = item.provinceName
          if (item.list) {
            newItem.children = item.list.map(node => {
              let newNode = {}
              newNode.id = node.cityCode
              newNode.name = node.cityName
              return newNode
            })
          } else {
            newItem.children = []
          }
          return newItem
        })
        that.cascaderTree = this.sortArr(arr)
        if (this.provinceArr.length) {
          this.cascaderTree.forEach(node => {
            if (this.provinceArr[0] === node.id) {
              this.detail.accounRegProvName = node.name
              node.children.forEach(n => {
                if (this.provinceArr[1] === n.id) {
                  this.detail.accounRegCityName = n.name
                }
              })
            }
          })
        }
        // if (this.$route.query.id) {
        //   this.getDetail()
        // }
      })
    },

    /**
     * 省市排序--排序规则
     */
    sortCompare(a, b) {
      a = parseInt(a.id)
      b = parseInt(b.id)
      return a - b
    },
    /**
     * 省市排序
     */
    sortArr(arr) {
      arr.sort(this.sortCompare)
      return arr
    },
    setSimpleTreeText(detailData){
      if(detailData.kdbCompanyType){
        this.kdbCompanyTypeText =this.kdbcompanyTypeList[Number(detailData.kdbCompanyType)-1].name;
      }
      if(detailData.kdbWxSettlementCycle===0 || detailData.kdbWxSettlementCycle){
        this.kdbSettlementCycleTypeText = this.kdbSettlementCycleTypeList[detailData.kdbWxSettlementCycle].name;
      }
      if(detailData.ysIsService===0 || detailData.ysIsService){
        this.yiSSettlementCycleTypeText = this.yiSSettlementCycleTypeList[detailData.ysIsService].name;
      }
      if(detailData.kdbSex){
        this.kdbSexText = this.kdbsexList[Number(detailData.kdbSex)-1].name;
      }
      if(detailData.kdbAccountType){
        this.kdbAccountTypeText = this.kdbAccountTypeList[Number(detailData.kdbAccountType)-1].name;
      }
    },
    // 获取列表详情
    getMchInfo(id) {
      return clientInfoApi.getMchInfo({ id }).then(res => {
        console.log('getMchInfo=============================',res.obj)
        this.detail = Object.assign({}, this.detail, res.obj)

        //获取详情后重新给这些值赋默认值；目前不需要，但是接口为必填--开始
        this.detail.kdbJjkTradeRate = '0.55';  //
        this.detail.kdbDjkTradeRate = '0.55';  //
        this.detail.kdbJjkDiscountRate = '0.38';  //
        this.detail.kdbDjkDiscountRate = '0.38';  //
        this.detail.kdbSingleServiceFeeUpLimit = '20';  //
        this.detail.kdbServiceRate = '0.02'; //d0手续费  百分比
        //获取详情后重新给这些值赋默认值；目前不需要，但是接口为必填--结束
        //设置开店宝默认费率
        this.detail.kdbWxTradeRate = this.detail.kdbWxTradeRate || '0.36'
        //设置手机pos默认费率 'posTradeRate', 'posDrawFee','quickTradeRate', 'quickDrawFee'
        this.detail.posTradeRate = this.detail.posTradeRate || '0.55'
        this.detail.posDrawFee = this.detail.posDrawFee || '3'
        this.detail.quickTradeRate = this.detail.quickTradeRate || '0.55'
        this.detail.quickDrawFee = this.detail.quickDrawFee || '3'




        this.proImgList = this.detail.pro ? this.detail.pro.split(';') : []
        this.detail.industrId = this.detail.industrId + ''
        this.detail.isIndustryDining = Boolean(this.detail.isIndustryDining)
        this.cascaderArr = [this.detail.mccClassCd, this.detail.mccCd] //随行付
        this.kdbAddressArr = [this.detail.kdbProvinceId, this.detail.kdbCityId, this.detail.kdbAreaId] //开店宝省市区
        this.cjAddressArr = [this.detail.operationProvinceCode, this.detail.operationCityCode, this.detail.operationDistrictCode] //畅捷省市区
        this.yiSAddressArr = [this.detail.ysYloneAreaCode, this.detail.ysYltwoAreaCode, this.detail.ysYlthreeAreaCode] //易生省市区
        //todo 开店宝经营类目回显
        this.kdbCascaderArr = [this.detail.kdbBusinessId1, this.detail.kdbBusinessId] //开店宝
        this.cjCascaderArr = [this.detail.mccCodeClass, this.detail.mccCode] //畅捷
        this.yiSCascaderArr = [this.detail.ysYloneMccCode, this.detail.ysYltwoMccCode, this.detail.ysYlthreeMccCode] //易生
        this.lsCascaderArr = [this.detail.leFirstMccCode, this.detail.leSecondMccCode, this.detail.leMccCode]
        this.ysCascaderArr = [this.detail.ysFirstName, this.detail.ysSecondName, this.detail.industrId]
        let zfbNameArr = [this.detail.aliFirstLevel, this.detail.aliSecondLevel, this.detail.aliThirdLevel]
        let fyNameArr = [this.detail.fuiouFirstMccCode, this.detail.fuiouSecondMccCode, this.detail.fuiouBusiness]
        this.zfbCascaderArr = this.detail.aliFirstLevel ? this.loopCall(this.zfbMaccList, zfbNameArr, []) : []
        this.fyCascaderArr = this.detail.fuiouFirstMccCode ? this.loopCall(this.fyMaccList, fyNameArr, []) : []
        this.lklCascaderArr = [this.detail.lakalaMccCode] //拉卡拉
        this.chCascaderArr = [this.detail.chMccCode, this.detail.chSubMccCode]
        this.provinceArr = [this.detail.accounRegProvCd, this.detail.accounRegCityCd]
        if (this.detail.fuiouAliRate !== null) {
          this.fuiouAliRate = this.detail.fuiouAliRate + (this.detail.fuiouAliRate ? '%，无封顶' : '%，零扣率')
        }
        if (this.detail.fuiouWxRate !== null) {
          this.fuiouWxRate = this.detail.fuiouWxRate + (this.detail.fuiouWxRate ? '%，无封顶' : '%，零扣率')
        }
        this.setSimpleTreeText(this.detail)
      })
    },
    loopCall(dataArr, val, arr) {
      if (dataArr.length) {
        for (let i = 0; i < dataArr.length; i++) {
          if (val[0] === dataArr[i].name) {
            arr.push(dataArr[i].id)
            val.splice(0, 1)
            if (dataArr[i].children && dataArr[i].children.length) {
              arr = this.loopCall(dataArr[i].children, val, arr)
            }
            break
          }
        }
      }
      return arr
    },
    // 获取随行付经营类目
    getMccCdList() {
      if (!this.PROCESS.SXF) return
      clientInfoApi.getMccCdList().then(res => {
        this.maccList = res.obj.map(item => {
          item.id = item.classCode
          item.name = item.className
          if (item.list) {
            item.children = item.list.map(item => {
              item.id = item.mccCode
              item.name = item.mccName
              return item
            })
          } else {
            item.children = []
          }

          return item
        })
      })
    },
    // 获取乐刷经营类目
    getLsMccList() {
      if (!this.PROCESS.LS) return
      clientInfoApi.getLsMccLists().then(res => {
        this.lsMaccList = this.forTree(res.obj)
      })
    },
    // 获取威富通经营类目
    getYsMccList() {
      if (!this.PROCESS.YS) return
      clientInfoApi.getYsMccList().then(res => {
        this.ysMaccList = this.forTree(res.obj)
      })
    },
    // 获取传化经营类目
    getChMccList() {
      console.log('this.PROCESS', this.PROCESS)
      if (!this.PROCESS.CH) return
      clientInfoApi.getChMccList().then(res => {
        this.chMaccList = this.forTree(res.obj)
        console.log('this.chMaccList==================',this.chMaccList)
      })
    },
    // 获取支付宝经营行业
    getZfbMccList() {
      if (!this.PROCESS.ZFB) {
        return Promise.resolve()
      }
      return clientInfoApi.getZfbMccList().then(res => {
        this.zfbMaccList = this.sortTreeAttr(res.obj)
      })
    },
    // 获取富有经营类目
    getFyMccList() {
      if (!this.PROCESS.FY) return
      clientInfoApi.getFyMccList().then(res => {
        this.fyMaccList = this.sortTreeAttr(res.obj)
      })
    },
    // 获取富友费率列表
    getFyRateList() {
      if (!this.PROCESS.FY) return
      clientInfoApi.getFyRateList().then(res => {
        this.rateList = res.obj
      })
    },
    // 获取拉卡拉经营类目
    getLklMccList() {
      if (!this.PROCESS.LKL) return
     /* clientInfoApi.getLklMccList().then(res => {
        this.lklMaccList = this.sortTreeAttr(res.obj,'lkl')
        console.log('this.lklMaccList================',this.lklMaccList)
      })*/
    },



    // 获取拉卡拉费率列表
  /*  getLklRateList() {
      if (!this.PROCESS.LKL) return
      clientInfoApi.getLklRateList().then(res => {
        this.rateList = res.obj
      })
    },*/
    /**
     * 获取开店宝省市区
     */
    async getKdbProviceAndCity() {
      let that = this
      await clientInfoApi.getKdbAddressList().then(res => {
        // let resObj = res
        //请求失败也会返回200
        if(!res.obj){
          return
        }
        that.kdbAddressTree = initProvinces(res.obj.data, 'areaId', 'areaName', 'cities', 'areaId', 'areaName', 'counties', 'areaId', 'areaName')
        // console.log('kaidianbaotree==========================',this.kdbAddressTree)
      })
    },
    // 获取开店宝经营类目
    getKdbMccList() {
      if (!this.PROCESS.KDB) return
      clientInfoApi.getKdbMccList().then(res => {
        //请求失败也会返回200
        if(!res.obj){
          return
        }
        res.obj = JSON.parse(res.obj)
        this.kdbMaccTree = this.sortTreeAttr(res.obj.data,'kdb')
      })
    },
    /**
     * 获取畅捷省市区
     */
    async getCjProviceAndCity() {
      let that = this
      await clientInfoApi.getCjAddressList().then(res => {
        // let resObj = res
        //请求失败也会返回200
        if(!res.obj){
          return
        }
        that.cjAddressTree =  res.obj
        // that.cjAddressTree = initProvinces(res.obj.data, 'areaId', 'areaName', 'cities', 'areaId', 'areaName', 'counties', 'areaId', 'areaName')
        // console.log('kaidianbaotree==========================',this.kdbAddressTree)
      })
    },
    // 获取畅捷经营类目
    getCjMccList() {
      if (!this.PROCESS.CJ) return
      clientInfoApi.getCjMccList().then(res => {
        //请求失败也会返回200
        if(!res.obj){
          return
        }
        // res.obj = JSON.parse(res.obj)
        this.cjMaccTree = res.obj
        // this.cjMaccTree = this.sortTreeAttr(res.obj.data,'cj')
      })
    },
    /**
     * 获取易生省市区
     */
    async getYiSProviceAndCity() {
      let that = this
      await clientInfoApi.getYiSProviceAndCity().then(res => {
        // let resObj = res
        //请求失败也会返回200
        if(!res.obj){
          return
        }
        that.yiSAddressTree =  res.obj
        // that.cjAddressTree = initProvinces(res.obj.data, 'areaId', 'areaName', 'cities', 'areaId', 'areaName', 'counties', 'areaId', 'areaName')
        // console.log('kaidianbaotree==========================',this.kdbAddressTree)
      })
    },
    // 获取易生经营类目
    getYiSMccList() {
      // if (!this.PROCESS.CJ) return
      clientInfoApi.getYiSMccList().then(res => {
        //请求失败也会返回200
        if(!res.obj){
          return
        }
        // res.obj = JSON.parse(res.obj)
        this.yiSMaccTree = res.obj
        // this.cjMaccTree = this.sortTreeAttr(res.obj.data,'cj')
      })
    },
    // 最大只到2级
    sortTreeAttr(dataTree,channelName) {

      this.levelIndex = this.levelIndex + 1
      console.log('最大只到2级', dataTree, this.levelIndex)
      let arr = [];
      if(channelName === 'kdb'){
        arr = dataTree.map((item, index) => {
          if(channelName === 'kdb'){
            item.name = item.title;
            item.children = item.children.map((secondItem, secondIndex) => {
              secondItem.name = secondItem.title
              return secondItem
            })
          }
          return item
        })
        return  arr
      }


      arr = dataTree.map((item, index) => {

        if(channelName === 'lkl'){
          item.id = item.code
        }else{
          item.id = item.name + index
        }

        if (item.list) {
          item.children = item.list.map((secondItem, secondIndex) => {
            secondItem.id = secondItem.name + index + secondIndex
            secondItem.children = []
            if (secondItem.list) {
              secondItem.children = secondItem.list.map((thirdItem, thirdIndex) => {
                thirdItem.id = thirdItem.id || thirdItem.name + index + secondIndex + thirdIndex
                thirdItem.children = thirdItem.list || []
                return thirdItem
              })
            }
            return secondItem
          })
        }
        return item
      })
      return arr
    },
    // 最大只到2级
    // sortTreeAttr(dataTree, name, children) {
    //   this.levelIndex = this.levelIndex + 1
    //   let arr = dataTree.map((item, index) => {
    //     item.name = item[name]
    //     item.id = item.name + index
    //     item.children = []
    //     if (item[children]) {
    //       item.children = item[children].map((secondItem, secondIndex) => {
    //         secondItem.name = secondItem[name]
    //         secondItem.id = secondItem.name + index + secondIndex
    //         secondItem.children = []
    //         if (secondItem[children]) {
    //           secondItem.children = secondItem[children].map((thirdItem, thirdIndex) => {
    //             thirdItem.name = thirdItem[name]
    //             thirdItem.id = thirdItem.mccCode || thirdItem.name + index + secondIndex + thirdIndex
    //             thirdItem.children = []
    //             return thirdItem
    //           })
    //         }
    //         return secondItem
    //       })
    //     }
    //     return item
    //   })
    //   return arr
    // },
    // 遍历树结构
    forTree(dataTree) {
      for (let i in dataTree) {
        if (dataTree[i].list) {
          dataTree[i].children = dataTree[i].list
          this.forTree(dataTree[i].children)
        } else {
          return
        }
      }
      return dataTree
    },
    //唤醒简单树
    callSimpleTree(status){
      this.openSimpleTree = true;
      this.simpleTreeStatus = status;
    },
    //simpleTree 选中
    simpleTreeSelect(item){
      if(this.simpleTreeStatus === 1){
        // this.detail.kdbCompanyType = item.value;
        this.$set(this.detail, "kdbCompanyType", item.value);
        this.kdbCompanyTypeText = item.name;
      }else if(this.simpleTreeStatus === 2){
        this.$set(this.detail, "kdbWxSettlementCycle", item.value);
        this.kdbSettlementCycleTypeText = item.name;
      }else if(this.simpleTreeStatus === 3){
        this.$set(this.detail, "kdbSex", item.value);
        this.kdbSexText = item.name;
      }else if(this.simpleTreeStatus === 4){
        this.$set(this.detail, "kdbAccountType", item.value);
        this.kdbAccountTypeText = item.name;
      }else if(this.simpleTreeStatus === 5){
        this.detail.ysIsService = item.value
        this.yiSSettlementCycleTypeText = item.name;
      }
      this.openSimpleTree = false;

    },
    simpleTreeBack(){
      this.openSimpleTree = false;
    },
    // 唤醒action-sheet
    callActionSheet(status) {
      if (status === 3) {
        if (!this.detail.personAccountBank) {
          this.$toast.error('请输入开户总行名称！')
          return
        }
        if (!this.detail.accounRegProvName) {
          this.$toast.error('请选择开户支行所在地！')
          return
        }
        this.getBranchCode()
      }
      if (status === 5) {
        this.curRateIndex = this.curZfbRateIndex
      }
      if (status === 6) {
        this.curRateIndex = this.curWxRateIndex
      }

      this.open = true
      this.status = +status
    },
    // 获取支行编码
    getBranchCode(keyWord) {
      let params = {
        bankName: this.detail.personAccountBank,
        province: this.detail.accounRegProvName,
        city: this.detail.accounRegCityName,
        appointBankName: keyWord || ''
      }
      clientInfoApi.getBranchCodeNew(params).then(res => {
        this.bankNameList = res.obj
      })
    },

    // action-sheet取消
    onActionSheetClose() {
      this.open = false
      this.keyword = ''
    },
    // action-sheet确认
    onActionSheetConfirm() {
      this.onActionSheetClose()
      if (this.status === 1) {
        // 经营行业
        this.detail.merchantBusiness = this.accountTypes[this.curBusiness]
      } else if (this.status === 2) {
        this.detail.productDesc = this.productDesc[this.curDesc]
      } else if (this.status === 3) {
        if (!this.bankNameList.length) return
        this.detail.personBankName = this.bankNameList[this.curBankName].bankName
        this.bankNameList = []
        this.curBankName = ''
      } else if (this.status === 4) {
        this.detail.fuiouAreaName = this.merchantAreaList[this.curMerchantAreaIndex].areaName
        this.detail.fuiouAreaId = this.merchantAreaList[this.curMerchantAreaIndex].areaId
      } else if (this.status === 5) { // （富友）支付宝费率
        this.fuiouAliRate = this.rateList[this.curZfbRateIndex].rateDesc
        console.log('this.fuiouAliRate', this.fuiouAliRate)
        this.detail.fuiouAliRate = Number(this.rateList[this.curZfbRateIndex].rateDesc.split('%')[0])
        this.detail.fuiouAliRateCode = this.rateList[this.curZfbRateIndex].rateCode
      } else if (this.status === 6) { // （富友）微信费率
        this.fuiouWxRate = this.rateList[this.curWxRateIndex].rateDesc
        this.detail.fuiouWxRate = Number(this.rateList[this.curWxRateIndex].rateDesc.split('%')[0])
        this.detail.fuiouWxRateCode = this.rateList[this.curWxRateIndex].rateCode
      }
    },
    // 切换选项
    // 控制actionSheetMenu显隐
    onActionMenuShow(status) {
      if (+status === 2) {
        this.openMenu = false
      } else if (+status === 1) {
        this.openMenu = true
      }
    },
    // 相机打开
    onTakePhoto(status) {
      if (+status === 1) {
        // 拍照
        this.$refs.fileCamera.click()
      } else if (+status === 2) {
        // 从相机打开
        this.$refs.file.click()
      }
      // console.log('相机', this.photoTaker, status)
      this.openMenu = false
    },
    // 获取图片
    callTakePhoto(index) {
      this.openMenu = true
      this.photoTaker = +index
      // index
      // 1  组织机构代码照片
    },
    //提交进件接口
    submitMchIfo(data) {
      clientInfoApi.submitMchIfo(data).then(
        res => {
          if (res.code === 200) {
            this.$toast.success('提交成功')
            let from = fromReactNativeLocal.get()
            if (from === 'iframe') { // 是否为iframe内嵌的环境
              console.log('iframe内嵌的环境：触发')
              let data = {}
              window.parent.postMessage(data, '*')
              return
            }
            // 分销APPRN来源
            if (from === 'react-native') {
              NativeAppRouter.goBack()
              return
              // return window.ReactNativeWebView && window.ReactNativeWebView.postMessage('goBack')
            }

            if (this.from === 'share' && sessionStorage.link) {
              return (window.location.href = sessionStorage.link)
            }
            // this.$router.push({
            //   name: CLIENT_INFO
            // })
            this.$router.push({
              name: CLIENT_INFO_DETAIL,
              query: {
                id: this.detail.id
              }
            })
          } else {
            this.$toast.error(res.msg)
          }
        },
        err => {
          this.$toast.error(err.msg)
        }
      )
    },
    // 下一步
    onNext() {
      this.detail.isIndustryDining = this.detail.isIndustryDining ? 1 : 0
      //开店宝借记卡和贷记卡结算周期都取页面上的周期
      this.detail.kdbJjkSettlementCycle = this.detail.kdbWxSettlementCycle;
      this.detail.kdbDjkSettlementCycle = this.detail.kdbWxSettlementCycle;
      //易生写死字段--开始
      this.detail.ysJjkRate = '0.55';
      this.detail.ysDjkRate = '0.55';
      this.detail.ysZfbRate = this.detail.ysWxRate;
      this.detail.ysYlRate = this.detail.ysWxRate;
      this.detail.ysJjkDiscountRate = '20';
      this.detail.ysServiceType = '1';
      this.detail.ysJjkRateMin = '0';
      this.detail.ysDjkRateMin = '0';
      //易生写死字段--结束
      //重置已勾选的进件项，下方重新判断添加
      this.detail.importNums = []
      // 随行付通道必填字段
      let sxfRequiredData = ['sxfRate', 'mccCd', 'mccClassCd']
      // 微信官方通道必填字段
      let wxRequireData = [
        'productDesc',
        'merchantBusiness',
        'personAccountPicId',
        'personAccountName',
        'personAccountBank',
        'personAccountNumber',
        'personBankName'
      ]
      //businessType  1企业    2个体
      if (Number(this.detail.businessType) === 2) {
        wxRequireData = [
          'productDesc',
          'merchantBusiness'
        ]
      }
      // 支付宝通道必填字段
      let zfbRequiredData = ['aliAccount', 'aliFirstLevel', 'aliRate']
      // 乐刷通道必填字段
      let lsRequireData = [/*'cashierDeskPicId',*/ 'leFirstMccCode', 'leSecondMccCode', 'leMccCode', 'leWxRate', 'leAliRate']
      // 威富通通道必填字段
      let ysRequireData = ['ysFirstName', 'ysSecondName', 'ysRate', 'pro']
      // 传化通道必填字段
      let chRequireData = ['chMccCode', 'chSubMccCode', 'chRate']
      // 富友通道必填字段
      let fyRequireData = ['fuiouFirstMccCode', 'fuiouAreaName', 'fuiouAliRate', 'fuiouWxRate']
      // 拉卡拉通道必填字段
      let lklRequireData = ['lakalaMccCode', /*'lklMccClassCd',*/'lakalaRate'/*, 'lklAliRate', 'lklWxRate'*/]
      // 开店宝通道必填字段
      let kdbRequireData = ['kdbProvinceId', 'kdbCityId', 'kdbAreaId', 'kdbBusinessId', 'kdbWxTradeRate', 'kdbWxSettlementCycle', 'kdbSex', 'kdbAccountType']
      // 手机pos必填字段
      /*posDrawFee 手机pos提现费
      posTradeRate手机pos交易费率
      quickDrawFee网联提现费
      quickTradeRate网联交易费率
      bankPhotoId银行卡背面照片ID
      holdingCardId手持身份证照片*/
      let sjPosRequireData = ['posTradeRate', 'posDrawFee','quickTradeRate', 'quickDrawFee']
      //畅捷通道必填字段
      let cjRequireData = ['mccCode', 'mccName','operationProvinceCode', 'operationProvinceName', 'operationCityCode', 'operationCityName', 'operationDistrictCode', 'operationDistrictName', 'chanpayTradeRate']
      let yiSRequireData = ['ysWxRate', 'ysIsService','ysYloneAreaCode', 'ysYltwoAreaCode', 'ysYlthreeAreaCode', 'ysYloneMccCode', 'ysYltwoMccCode', 'ysYlthreeMccCode']


      if (this.detail.businessLicensePhotoId&&this.detail.businessType==1) {
        //营业执照
        kdbRequireData.push('kdbCompanyType', 'kdbRegistryId', 'kdbAgreementId')
      }
      if (!this.detail.businessLicensePhotoId) {
        //营业执照
        fyRequireData.push('inHandPicId')
      }
      //share 不需要填费率
      if (this.from === 'share') {
        sxfRequiredData = ['mccCd', 'mccClassCd']
        ysRequireData = ['ysFirstName', 'ysSecondName', 'pro']
        chRequireData = ['chMccCode', 'chSubMccCode']
        lsRequireData = [/*'cashierDeskPicId',*/ 'leFirstMccCode', 'leSecondMccCode', 'leMccCode']
        zfbRequiredData = ['aliAccount', 'aliFirstLevel']
        fyRequireData = ['fuiouFirstMccCode', 'fuiouAreaName']
        // todo 是否需要处理share
        lklRequireData = ['lakalaMccCode', /*'lklMccClassCd',*/'lakalaRate'/*, 'lklAliRate', 'lklWxRate'*/]
        cjRequireData = ['mccCode', 'mccName','operationProvinceCode', 'operationProvinceName', 'operationCityCode', 'operationCityName', 'operationDistrictCode', 'operationDistrictName']
        sjPosRequireData = ['bankPhotoId','holdingCardId']
        kdbRequireData = ['kdbProvinceId', 'kdbCityId', 'kdbAreaId', 'kdbBusinessId', 'kdbWxSettlementCycle', 'kdbSex', 'kdbAccountType', 'kdbRegistryId', 'kdbAgreementId']
        yiSRequireData = ['ysIsService','ysYloneAreaCode', 'ysYltwoAreaCode', 'ysYlthreeAreaCode', 'ysYloneMccCode', 'ysYltwoMccCode', 'ysYlthreeMccCode']
      }

      if (this.detail.isIndustryDining) {
        lsRequireData.push('foodHealthPermissionPic')
      }
      // 判断通道方式是否已有数据填入，有一项填入，全部为必填
      // let zfbFlag = zfbRequiredData.every(attr => !this.detail[attr] !== '' && this.detail[attr] !== null)
      let checkProcess = false // 只要勾选了一个通道就为true
      for (let attr in this.checkboxObj) {
        if (this.PROCESS[attr.toLocaleUpperCase()]) {
          if (this.checkboxObj[attr]) {
            checkProcess = true
          }
        }
      }
      if (!checkProcess) {
        this.$toast.error('至少勾选一种通道！')
        return
      }
      // 勾选了通道，则为必填
      //天阙随行付是12
      if (this.checkboxObj.sxf && this.PROCESS.SXF) {
        this.detail.importNums.push('7')
        if (!sxfRequiredData.every(attr => this.detail[attr] !== '' && this.detail[attr] !== null)) {
          this.$toast.error('有内容未填入')
          return
        }
        if (this.from !== 'share' && Number(this.detail.sxfRate) <= 0) {
          this.$toast.error('费率必须大于0')
          return
        }
        if (this.from !== 'share' && Number(this.detail.sxfRate) >= 1) {
          this.$toast.error('费率必须小于1')
          return
        }
      }
      if (this.checkboxObj.wx && this.PROCESS.WX) {
        this.detail.importNums.push('WX')
        if (!wxRequireData.every(attr => this.detail[attr] !== '' && this.detail[attr] !== null)) {
          this.$toast.error('有内容未填入')
          return
        }
      }
      if (this.checkboxObj.zfb && this.PROCESS.ZFB) {
        this.detail.importNums.push('ZFB')
        if (!zfbRequiredData.every(attr => this.detail[attr] !== '' && this.detail[attr] !== null)) {
          this.$toast.error('有内容未填入')
          return
        }
        if (this.from !== 'share' && Number(this.detail.aliRate) > 3) {
          this.$toast.error('支付宝的费率要在0.38~3之间')
          return
        }
        if (this.from !== 'share' && Number(this.detail.aliRate) < 0.38) {
          this.$toast.error('支付宝的费率要在0.38~3之间')
          return
        }
      }
      if (this.checkboxObj.ls && this.PROCESS.LS) {
        this.detail.importNums.push('10')
        if (!lsRequireData.every(attr => this.detail[attr] !== '' && this.detail[attr] !== null)) {
          this.$toast.error('有内容未填入')
          return
        }
        if (this.from !== 'share' && (Number(this.detail.leAliRate) >= 1 || Number(this.detail.leWxRate) >= 1)) {
          this.$toast.error('费率必须小于1')
          return
        }
        if (this.from !== 'share' && (Number(this.detail.leAliRate) <= 0 || Number(this.detail.leWxRate) <= 0)) {
          this.$toast.error('费率必须大于0')
          return
        }
      }
      if (this.checkboxObj.ys && this.PROCESS.YS) {
        this.detail.importNums.push('9')
        if (!ysRequireData.every(attr => this.detail[attr] !== '' && this.detail[attr] !== null)) {
          this.$toast.error('有内容未填入')
          return
        }
        if (this.from !== 'share' && Number(this.detail.ysRate) <= 0) {
          this.$toast.error('费率必须大于0')
          return
        }
        if (this.from !== 'share' && Number(this.detail.ysRate) >= 1) {
          this.$toast.error('费率必须小于1')
          return
        }
      }
      if (this.checkboxObj.ch && this.PROCESS.CH) {
        this.detail.importNums.push('11')
        if (!chRequireData.every(attr => this.detail[attr] !== '' && this.detail[attr] !== null)) {
          this.$toast.error('有内容未填入')
          return
        }
        if (this.from !== 'share' && Number(this.detail.chRate) <= 0) {
          this.$toast.error('费率必须大于0')
          return
        }
        if (Number(this.detail.chRate) >= 1) {
          this.$toast.error('费率不能超过1')
          return
        }
      }


      if (this.checkboxObj.kdb && this.PROCESS.KDB) {
        this.detail.importNums.push('19')
        //开店宝
        if (!kdbRequireData.every(attr => this.detail[attr] !== '' && this.detail[attr] !== null)) {
          this.$toast.error('有内容未填入')
          return
        }
        if (this.from !== 'share' && Number(this.detail.kdbWxTradeRate) <= 0) {
          this.$toast.error('费率必须大于0')
          return
        }
        if (Number(this.detail.kdbWxTradeRate) >= 1) {
          this.$toast.error('费率不能超过1')
          return
        }
      }
      if (this.checkboxObj.cj && this.PROCESS.CJ) {
        this.detail.importNums.push('20')
        //畅捷
        if (!cjRequireData.every(attr => this.detail[attr] !== '' && this.detail[attr] !== null)) {
          this.$toast.error('有内容未填入')
          return
        }
        if (this.from !== 'share' && Number(this.detail.chanpayTradeRate) <= 0) {
          this.$toast.error('费率必须大于0')
          return
        }
        if (Number(this.detail.chanpayTradeRate) >= 1) {
          this.$toast.error('费率不能超过1')
          return
        }
      }
      if (this.checkboxObj.yiS && this.PROCESS.YIS) {
        this.detail.importNums.push('13')
        //畅捷
        if (!yiSRequireData.every(attr => this.detail[attr] !== '' && this.detail[attr] !== null)) {
          this.$toast.error('有内容未填入')
          return
        }
        if (this.from !== 'share' && Number(this.detail.ysWxRate) <= 0) {
          this.$toast.error('费率必须大于0')
          return
        }
        if (Number(this.detail.ysWxRate) >= 1) {
          this.$toast.error('费率不能超过1')
          return
        }
      }

      if (this.checkboxObj.fy && this.PROCESS.FY) {
        this.detail.importNums.push('6')
        if (!fyRequireData.every(attr => this.detail[attr] !== '' && this.detail[attr] !== null)) {
          this.$toast.error('有内容未填入')
          return
        }
      }
      //TODO 是否需要处理share
      if (this.checkboxObj.lkl && this.PROCESS.LKL) {
        this.detail.importNums.push('8')
        if (!lklRequireData.every(attr => this.detail[attr] !== '' && this.detail[attr] !== null)) {
          this.$toast.error('有内容未填入')
          return
        }
      }
      if (this.checkboxObj.sjPos && this.PROCESS.SJPOS) {
        this.detail.importNums.push('17')
        if (!sjPosRequireData.every(attr => this.detail[attr] !== '' && this.detail[attr] !== null)) {
          this.$toast.error('有内容未填入')
          return
        }
      }
      // this.detail.importNums = []
      if (this.from === 'share') {
        this.detail.isCommit = 0
      } else {
        this.detail.isCommit = 1
      }

      if (this.checkboxObj.yiS && this.PROCESS.YIS) {
        this.getYiSMsgCode()
      }else{
        this.submitMchIfo()
      }


    },
    // 时间改变
    onDateTimeChange(status, index, e) {
      //    status          index
      // 1  组织机构有效期   开始时间
      // 2                  结束时间
      if (+status === 1) {
        let startTime = this.detail.startOrganizationTime
        let endTime = this.detail.endOrganizationTime
        if (startTime && endTime) {
          startTime = this.getTimestamp(startTime)
          endTime = this.getTimestamp(endTime)
          if (startTime >= endTime) {
            this.$toast.error('开始时间必须早于结束时间')
            this.detail.startOrganizationTime = ''
            this.detail.endOrganizationTime = ''
          } else {
            this.detail.startOrganizationTime = this.getTime(this.detail.startOrganizationTime)
            this.detail.endOrganizationTime = this.getTime(this.detail.endOrganizationTime)
          }
        }
      }
    },
    // 时间戳
    getTimestamp(str) {
      return str ? new Date(Date.parse(str)).getTime() : 0
    },
    // 获取年月日
    getTime(str) {
      if (str) {
        // let tmp = new Date(Date.parse(str)).toLocaleDateString()
        let date = new Date(Date.parse(str))
        let y = date.getFullYear()
        let m = date.getMonth() + 1
        if (m < 10) {
          m = '0' + m
        }
        let d = date.getDate()
        if (d < 10) {
          d = '0' + d
        }
        // tmp = tmp.split('/').join('-')
        let tmp = y + '-' + m + '-' + d
        return tmp
      }
      return ''
    },
    // 初始化详情数据 20010131 韩注释 搜索发现没有引用
   /* initDetail() {
      this.detail = JSON.parse(clientInfoDetailLocal.get())
      console.log('初始化详情数据', this.detail)
      this.rate.wxRate = Number(this.detail.wxRate) ? Number(this.detail.wxRate) * 100 : 0 // 微信费率
      this.rate.zfbRate = Number(this.detail.zfbRate) ? Number(this.detail.zfbRate) * 100 : 0 // 支付宝费率
      this.rate.sxfZfbRate = Number(this.detail.sxfZfbRate)
        ? Number(this.detail.sxfZfbRate) * 100
        : 0 // 随行付费率
      this.rate.sxfWxRate = Number(this.detail.sxfWxRate) ? Number(this.detail.sxfWxRate) * 100 : 0
      this.rate.fyZfbRate = Number(this.detail.fyZfbRate) ? Number(this.detail.fyZfbRate) * 100 : 0// 富友费率
      this.rate.fyWxRate = Number(this.detail.fyWxRate) ? Number(this.detail.fyWxRate) * 100 : 0
      this.rate.lakalaRate = Number(this.detail.lakalaRate) ? Number(this.detail.lakalaRate) * 100 : 0
      /!*this.rate.lklZfbRate = Number(this.detail.lklZfbRate) ? Number(this.detail.lklZfbRate) * 100 : 0// 拉卡拉费率
      this.rate.lklWxRate = Number(this.detail.lklWxRate) ? Number(this.detail.lklWxRate) * 100 : 0*!/

      this.merchantName = JSON.parse(clientInfoDetailMerchantNameLocal.get())
      this.merchantName = this.merchantName.merchantName
    },*/
    // 获取银行卡信息
    getBankInfo(pathId) {
      this.loading = true
      clientInfoApi
        .getBankCard(pathId)
        .then(res => {
          // this.detail.bnkCd = res.obj.bnkCd || '' // 开户行总行行(银行编码)
          this.detail.personAccountBank = res.obj.bankInfo || '' // 开户行总行行(银行编码)
          // this.detail.accounRegProvCd = res.obj.bankAreaBO.provinceCode || '' // 开户支行所在省编码
          // this.detail.accounRegCityCd = res.obj.bankAreaBO.cityCode || '' // 开户支行所在市编码
          this.provinceArr = [
            res.obj.bankAreaBO.provinceCode || '',
            res.obj.bankAreaBO.cityCode || ''
          ]
          if (res.obj.bankAreaBO.provinceCode && res.obj.bankAreaBO.cityCode) {
            this.cascaderTree.forEach(node => {
              if (res.obj.bankAreaBO.provinceCode === node.id) {
                this.detail.accounRegProvName = node.name
                node.children.forEach(n => {
                  if (res.obj.bankAreaBO.cityCode === n.id) {
                    this.detail.accounRegCityName = n.name
                  }
                })
              }
            })
          }
          // this.detail.lbnkNo = '' // 开户支行行号编码
          this.detail.personAccountNumber = res.obj.cardNo
        })
        .finally(() => {
          this.loading = false
        })
    },
    // 文件改变
    onFileChange(file, type) {
      // if (!e.target.files) {
      //   return
      // }
      // let file = e.target.files[0]
      // if (file.size / 1024 / 1024 > 2) {
      //   this.$toast.error('图片不能大于2M')
      //   return
      // }
      // let file = this.$refs.file.files[0]
      if (file) {
        clientInfoApi.uploadImage(file).then(
          res => {
            if (res.code === 200) {
              this.$toast.success('图片上传成功')
              // console.log('this.$refs[type]77777777777777777777777777',this.$refs[type])
              this.$refs[type].$refs.file.value = ''
              // console.log('aaa=======================',this.$refs)
              let photoId = res.obj

              if (type === 'bank') {
                // 获取银行卡照片
                this.$set(this.detail, 'personAccountPicId', photoId)
                this.getBankInfo(photoId)
              }else if (type === 'sjPosShouChi') {
                // 手机pos手持身份证
                this.$set(this.detail, 'holdingCardId', photoId)
              }else if (type === 'sjPosYinHangKaBeiMian') {
                // 手机pos结算银行卡背面
                this.$set(this.detail, 'bankPhotoId', photoId)
              } else if (type === 'zizhi') {
                // 获取微信特殊资质照片
                this.$set(this.detail, 'specialQualificationPhotoId', photoId)
                // this.getBankInfo(photoId)
              } else if (type === 'zfbZizhi') {
                // 获取支付宝特殊资质照片
                this.$set(this.detail, 'aliSpecialLicensePic', photoId)
              } else if (type === 'leShipin') {
                // (乐刷)获取食品卫生许可证照片
                this.$set(this.detail, 'foodHealthPermissionPic', photoId)
              } /*else if (type === 'leshouyin') {
                // (乐刷)获取收银台照片
                this.$set(this.detail, 'cashierDeskPicId', photoId)
              }*/ else if (type === 'fyXiaowei') {
                // (富友)获取小微商户
                this.$set(this.detail, 'inHandPicId', photoId)
              } else if (type === 'fyXuke') {
                // (富友)获取经营许可证
                this.$set(this.detail, 'businessCertPicId', photoId)
              } else if (type === 'xieyi') {
                // 商家协议
                this.proImgList.push(photoId)
              }else if(type === 'kdbRegistryId'){
                //开店宝注册登记表照片id
                this.$set(this.detail, 'kdbRegistryId', photoId)
              }else if(type === 'kdbAgreementId'){
                //开店宝收单协议照片id
                this.$set(this.detail, 'kdbAgreementId', photoId)
              }else if(type === 'kdbUpregisterId'){
                //开店宝开店宝商户变更登记表照片id
                this.$set(this.detail, 'kdbUpregisterId', photoId)
              }
            } else {
              this.$toast.error(res.msg)
            }
          },
          err => {
            this.$toast.error(err.msg)
          }
        )
      }
    }
  },

  filters: {
    // 获取图片
    loadImage(id) {
      return id ? url + `/fms/upload/resource/thumbnail/${id}` : ''
    },
    previewLoadImage(id) {
      return id ? url + `/fms/upload/resource/${id}` : ''
    }
  },

  mounted() {
    this.detail.id = this.$route.query.id
    if (this.detail.id) {
      this.getZfbMccList().finally(() => {
        this.getMchInfo(this.detail.id).then(res => {
          this.getProviceAndCity()
          this.getBusiness()
          this.getProductDesc()
          this.getMerchantAreaList()
        })
      }) // 支付宝经营行业

      getProcess().then(res => {
        this.PROCESS = res
        if(this.PROCESS.SXF){
          this.getMccCdList() // 随行付经营类目
        }
        if(this.PROCESS.LS){
          this.getLsMccList() // 乐刷经营类目
        }
        if(this.PROCESS.YS){
          this.getYsMccList() // 威富通经营类目
        }
        if(this.PROCESS.CH){
          this.getChMccList() // 传化经营类目
        }
        if(this.PROCESS.FY){
          this.getFyMccList() // 富友经营类目
          this.getFyRateList() // 获取富友交易费率列表
        }
        if(this.PROCESS.LKL){
          this.getLklMccList() // 拉卡拉经营类目
        }
        if(this.PROCESS.KDB){
          this.getKdbMccList() // 开店宝经营类目
          //  开店宝地址树
          this.getKdbProviceAndCity();
        }
        if(this.PROCESS.CJ){
          this.getCjMccList() // 畅捷经营类目
          //  畅捷地址树
          this.getCjProviceAndCity();
        }
        if(this.PROCESS.YIS){
          this.getYiSMccList() // 畅捷经营类目
          //  畅捷地址树
          this.getYiSProviceAndCity();
        }
      })

    } else {
      this.$toast.error('详情数据丢失')
    }


  },

}
</script>

<style scoped>
.action-sheet .item {
  height: auto;
}
</style>
<style>
.client-info-last .vm-select-tip {
  margin-left: 0;
  margin-top: 0;
  position: static;
  margin-right: 8px;
}
.client-info-last .vm-select {
  display: flex;
}
.client-info-last .vm-select-content {
  padding-left: 0 !important;
}
.fixed-height {
  width: 100%;
  max-height: 300px;
  overflow-y: auto;
}
</style>

<template>
  <!-- 图片预览 -->
  <div class="cover-x align-default"
       v-if="dialog.open"
       @click="closeDialog"
       style="z-index: 9;">
    <div class="match-left-space"></div>
    <div class="image-preview"
         :style="{backgroundImage: 'url(\''+ createImgUrl(dialog.id) +'\')'}">
      <!--<img class="match-parent" :src="imgUrl | previewLoadImage">-->
    </div>
    <div class="match-left-space"></div>
  </div>
</template>
<script>
import { url } from '@/utils/src/request'
export default {
  props: {
    dialog: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  methods: {
    // 关闭弹窗
    closeDialog() {
      this.dialog.open = false
    },

    // 生成图片地址
    createImgUrl(id) {
      return id ? url + `/fms/upload/resource/${id}` : ''
    }
  }
}
</script>

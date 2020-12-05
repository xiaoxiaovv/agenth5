<template>
  <input class="file"
         type="file"
         ref="file"
         accept="image/*"
         mutiple="mutiple"
         @change="onFileChanges" />
</template>
<script>
// import { clientInfoApi } from '@/api'
// import ImageConversion from 'image-conversion'
import { Compress, convertBase64ToFile } from 'compress_image'
export default {
  props: {
    size: { // 图片大小限制，默认2M
      type: Number,
      default: 2
    }
    // ref: {
    //   type: String,
    //   default: 'file'
    // }
  },
  data() {
    return {
      headerImage: ''
    }
  },
  created() {

  },
  methods: {
    onFileChanges(e) {
      if (!e.target.files) {
        return
      }
      let file = e.target.files[0]
      const size = e.size
      if (size < 600 * 1024) return this.$emit('change', file, file.name)
      console.log('file', file)
      new Compress().compress([
        file
      ], {
        quality: 0.5
      }).then((results) => {
        return convertBase64ToFile(results[0].data, file.name)
      }).then((data) => {
        console.log('data', data)
        this.$emit('change', new File([data], file.name))
      })
    },
    onFileChange(e) {
      console.log('上传回调', e)
      if (!e.target.files) {
        return
      }
      let file = e.target.files[0]
      this.imgPreview(file)
      // // reader.readAsDataURL(file)
      // console.log('reader.readAsDataURL(file)', reader.readAsDataURL(file))
      // reader.onload = function (ev) {
      //   console.log('ev', ev)
      // }

      // if (file.size / 1024 / 1024 > this.size) {
      //   this.$toast.error('图片不能大于' + this.size + 'M')
      //   return
      // }
      // if (file) {
      //   this.$emit('change', file)
      // }
    },
    postImg() {
      // 这里写接口
      console.log('this.headerImage', this.headerImage)
    },
    imgPreview(file, Orientation) {
      let self = this
      //  看支持不支持FileReader
      if (!file || !window.FileReader) return
      // 创建一个reader
      let reader = new FileReader()
      // 将图片2将转成 base64 格式
      reader.readAsDataURL(file)
      // 读取成功后的回调
      reader.onloadend = function (e) {
        console.log('读取成功后的回调', e, this)
        let result = this.result
        let img = new Image()
        img.src = result
        // 判断图片是否大于100K,是就直接上传，反之压缩图片
        if (this.result.length <= (100 * 1024)) {
          self.headerImage = this.result
          self.postImg()
        } else {
          img.onload = function () {
            let data = self.compress(img, e.total)
            self.headerImage = data
            self.postImg()
          }
        }
      }
    },
    /**
     * imgSize-上传图片大小（K）
     */
    compress(img, imgSize) {
      // console.log('img', img)
      let canvas = document.createElement('canvas')
      let ctx = canvas.getContext('2d')
      // 瓦片canvas
      let tCanvas = document.createElement('canvas')
      let tctx = tCanvas.getContext('2d')
      // let initSize = img.src.length
      let initSize = imgSize
      let width = img.width
      let height = img.height
      // 如果图片大于四百万像素，计算压缩比并将大小压至400万以下
      let ratio
      if ((ratio = width * height / 4000000) > 1) {
        console.log('大于400万像素')
        ratio = Math.sqrt(ratio)
        width /= ratio
        height /= ratio
      } else {
        ratio = 1
      }
      canvas.width = width
      canvas.height = height
      // 铺底色
      ctx.fillStyle = '#fff'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      // 如果图片像素大于100万则使用瓦片绘制
      let count
      if ((count = width * height / 1000000) > 1) {
        console.log('超过100W像素')
        count = ~~(Math.sqrt(count) + 1) // 计算要分成多少块瓦片
        // 计算每块瓦片的宽和高
        let nw = ~~(width / count)
        let nh = ~~(height / count)
        tCanvas.width = nw
        tCanvas.height = nh
        for (let i = 0; i < count; i++) {
          for (let j = 0; j < count; j++) {
            tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh)
            ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh)
          }
        }
      } else {
        ctx.drawImage(img, 0, 0, width, height)
      }
      // 进行最小压缩
      let ndata = canvas.toDataURL('image/jpeg', 0.1)
      console.log('压缩前：' + initSize)
      console.log('压缩后：' + ndata.length)
      console.log('压缩率：' + ~~(100 * (initSize - ndata.length) / initSize) + '%')
      tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0
      return ndata
    }
  }
}
</script>

<template>
  <div class="container-sign">
    <div id="canvasBox" :style="getHorizontalStyle" v-show="!showBox">
      <div class="greet">
        <span>{{msg}}</span>
        <input class="sign-btns" type="button" value="重写" @touchstart="clear" @mousedown="clear"/>
        <input class="sign-btns ml-30" type="button" value="确认" @touchstart="savePNG" @mousedown="savePNG"/>
      </div>
      <canvas class="canvas-sign"></canvas>
    </div>
    <div class="image-box" v-show="showBox">
      <header>
        请长按图片并保存至本地后发送好友
        <input type="button" value="返回" @click="showBox = false"/>
      </header>
      <img :src="signImage">
    </div>
  </div>
</template>

<script>
// import draw from '../utils';
import { Draw } from '@/utils'
export default {
  name: 'signCanvas',
  data() {
    return {
      msg: '请在下方空白处签名（身份证姓名）',
      degree: 90,
      signImage: null,
      showBox: false,
    };
  },
  components: {
    Draw,
  },
  beforeCreate() {
    // document.title = '手写签名';
  },
  mounted() {
    let that = this;
    this.canvasBox = document.getElementById('canvasBox');
    setTimeout(function (){
      that.initCanvas();
    },400)

  },
  computed: {
    getHorizontalStyle() {
      // console.log('computedcomputedcomputedcomputedcomputed')
      const d = document;
      const w = window.innerWidth || d.documentElement.clientWidth || d.body.clientWidth;
      const h = window.innerHeight || d.documentElement.clientHeight || d.body.clientHeight;
      let length = (h - w) / 2;
      let width = w;
      let height = h;

      switch (this.degree) {
        case -90:
          length = -length;
        case 90:
          width = h;
          height = w;
          break;
        default:
          length = 0;
      }
      if (this.canvasBox) {
        this.canvasBox.removeChild(document.querySelector('canvas'));
        this.canvasBox.appendChild(document.createElement('canvas'));
        setTimeout(() => {
          this.initCanvas();
        }, 400);
      }
      return {
        transform: `rotate(${this.degree}deg) translate(${length}px,${length}px)`,
        width: `${width}px`,
        height: `${height}px`,
        transformOrigin: 'center center',
      };
    },
  },
  methods: {
    initCanvas() {
      const canvas = document.querySelector('canvas');
      this.draw = new Draw(canvas, -this.degree);
    },
    clear() {
      this.draw.clear();
    },
    download() {
      this.draw.downloadPNGImage(this.draw.getPNGImage());
    },
    savePNG() {
      this.signImage = this.draw.getPNGImage();
      // console.log(this.signImage);
      this.$emit('signStr',this.signImage)
      // this.showBox = true;
    },
    upload() {
      const image = this.draw.getPNGImage();
      const blob = this.draw.dataURLtoBlob(image);

      const url = '';
      const successCallback = (response) => {
        console.log(response);
      };
      const failureCallback = (error) => {
        console.log(error);
      };
      this.draw.upload(blob, url, successCallback, failureCallback);
    },
  },
};


</script>

<style >
/*.container-sign {
  width: 100%;
  height: 100%;
}
#canvasBox {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.greet {
  padding: 20px;
  font-size: 20px;
  user-select: none;
}
input {
  font-size: 20px;
}
.greet select {
  font-size: 18px;
}
.canvas-sign {
  flex: 1;
  cursor: crosshair;
  border:2px dashed lightgray;
}
.image-box {
  width: 100%;
  height: 100%;
}
.image-box header{
  font-size: 18px;
}
.image-box img {
  max-width: 80%;
  max-height: 80%;
  margin-top: 50px;
  border: 1px solid gray;
}*/
</style>

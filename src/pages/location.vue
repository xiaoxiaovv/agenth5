<template>
  <div style="padding: 100px 10px;">
    <mu-button color="primary" @click="geolocationFn">定位</mu-button>
    <mu-card style="width: 85%; margin: 40px auto;padding: 20px;font-size: 15px;min-height: 70px;">
      {{shopAddress}}
    </mu-card>
    <mu-button color="info" @click="updateLocation">提交定位</mu-button>
  </div>
</template>

<script>
import { agentOrClient, clientInfoApi } from '@/api'
import AMapLoader from '@amap/amap-jsapi-loader';
export default {
  data() {
    return {
      merId: '',
      lng: '',
      lat: '',
      shopAddress: '点击定位按钮获取位置定位~',
      geocoder: null,
      geolocation: null,
    }
  },
  created() {
    console.log(this.$route.query.merId)
    this.merId = this.$route.query.merId
    this.getGaoDeKey()
  },
  methods: {
    getGaoDeKey(){
      agentOrClient.getGaoDeKey('1218861037927170048').then(res => {
        this.gdWebKey = res.obj.gdWebSideKey;
        this.AMapLoader();
      })
    },
    AMapLoader(){
      AMapLoader.load({
        // "key": "ec2655d926a9b2662c416608d087fff6",              // 申请好的Web端开发者Key，首次调用 load 时必填
        "key":this.gdWebKey,
        "version": "1.4.15",   // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        "plugins": ['AMap.Geocoder', 'AMap.Geolocation'],           // 需要使用的的插件列表，如比例尺'AMap.Scale'等
        "AMapUI": {             // 是否加载 AMapUI，缺省不加载
          "version": '1.1',   // AMapUI 缺省 1.1
          "plugins":[],       // 需要加载的 AMapUI ui插件
        },
        "Loca":{                // 是否加载 Loca， 缺省不加载
          "version": '1.3.2'  // Loca 版本，缺省 1.3.2
        },
      }).then((AMap)=>{
        // map = new AMap.Map('container');
        this.geocoder = new AMap.Geocoder({
          city: "", //城市设为北京，默认：“全国”
        });
        this.geolocation = new AMap.Geolocation({
          enableHighAccuracy: true, //是否使用高精度定位，默认:true
          timeout: 30000, //超过10秒后停止定位，默认：5s
          // position: 'RB', //定位按钮的停靠位置
          // buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
          // zoomToAccuracy: true //定位成功后是否自动调整地图视野到定位点
        })
      }).catch(e => {
        console.log(e);
      })
    },
    //获取坐标转为中文地址
    geolocationFn(){
      this.loading = true
      console.log(this.geolocation)
      // var  that = this;
      this.geolocation.getCurrentPosition((status, result) => {
        this.loading = false
        if (status == 'complete') {
          /*this.params.autoGetlongitude = result.position.lng
          this.params.autoGetlatitude = result.position.lat*/
          // this.longitude = result.position.lng
          // this.latitude = result.position.lat
          console.log('获取坐标================',result.position.lng+','+result.position.lat)
          this.lng = result.position.lng
          this.lat = result.position.lat
          this.geocoder.getAddress([result.position.lng, result.position.lat], (status, result)=> {
            if (status === 'complete'&&result.regeocode) {
              let address = result.regeocode.formattedAddress;
              this.shopAddress = address

              console.log('经纬度转地址==================',address)
              // alert('经纬度转地址'+address)
            }else{
              log.error('根据经纬度查询地址失败')
            }
          });
          // 应该监听这四个数据 当全部存在时 执行
          // if(this.oilData.longitude && this.oilData.latitude && this.oilData.phone && this.startGet) {
            // this.init()
          // }

        } else {
          this.$toast.error('定位失败,'+result.message)
        }
      })
    },
    updateLocation() {
      if(!this.lng) {
        this.$toast.warning('请先获取定位位置！')
        return
      }
      const params = {
      	id: this.merId,
      	longitude: this.lng,
      	latitude: this.lat,
      	locationAddress: this.shopAddress
      }
      clientInfoApi.updateLocation(params).then(res => {

      })
    }
  }
}
</script>

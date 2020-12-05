<template>
  <div>
    <p>{{date | date}}</p>
    <img :src="'http://wawaji.h5h5h5.cn/FtUSzVJ8HFO5ZQVfAk394gUYjrB2' | imageView2"
         width="200" />
  </div>
</template>

<script>
// import { demoApi } from '@/api'
import { demoLocal, demoSession } from '@/storage'

export default {
  data() {
    return {
      date: new Date()
    }
  },
  created() {
    console.log(demoLocal.get())
    console.log(demoSession.get())
    demoLocal.set('demoLocal-value')
    demoSession.set('demoSession-value')

    // demoApi.list().then(data => {
    //   this.success('success')
    // }, err => {
    //   this.error('error')
    //   Promise.reject(err)
    // })
  }
}
</script>

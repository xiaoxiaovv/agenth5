<template>
  <div class="vm-text-center page-nodata">
    <div class="vm-inline-block">
      <div class="page-nodata-icon">
        <span class="icon iconfont iconwushuju"></span>
      </div>
      <div class="page-nodata-title">{{title}}</div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    title: {
      type: String,
      default: '暂无数据'
    }
  },
  data() {
    return {}
  },
  watch: {},
  methods: {}
}
</script>

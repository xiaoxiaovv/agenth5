<template>
  <div>
    <input type="text">
  </div>
</template>

<script>

export default {
  props: ['active', 'tabList'],
  data() {
    return {
      currActive: 0
    }
  },
  watch: {
    active(val) {
      this.currActive = val
    }
  },
  methods: {
  }
}
</script>

<template>
  <div>
    <!-- <div class="vm-tabs-ul">
      <div class="vm-tabs-li" v-for="(item,i) in tabList" :key="`tabList_${i}`" :class="item.value === currActive ? 'active':''">
        <span @click="change(item.value)">{{item.name}}</span>
      </div>
    </div> -->
    <div class="vm-tabs-ul-scroll">
      <!-- <div class="vm-flex"> -->
        <div class="vm-tabs-li" v-for="(item,i) in tabList" :key="`tabList_${i}`" :class="item.value === currActive ? 'active':''" :style="{marginLeft: i ==0 ? marginLeftVal: ''}">
          <span @click="change(item.value)">{{item.name}}</span>
        </div>
      <!-- </div> -->
    </div>
    <!--
    <mu-tabs :value.sync="currActive"
             inverse
             color='primary'
             text-color="primary"
             indicator-color="white"
             full-width
             @change="change"
             class="va-tabs">
      <mu-tab v-for="(item,i) in tabList"
              :value="item.value"
              :key="`tabList_${i}`">
        <span class="tabs-name">{{item.name}}</span>
      </mu-tab>
    </mu-tabs>
    -->
  </div>
</template>

<script>

export default {
  props: ['active', 'tabList'],
  data() {
    return {
      currActive: '',
      marginLeftVal: ''
    }
  },
  watch: {
    active(val) {
      if (val.indexOf('代理') !== -1) {
        this.currActive = ''
      } else {
        this.currActive = val
      }
    },
    tabList(val) {
      this.currActive = val[0].value
      this.countWidth()
    }
  },
  created() {
    this.countWidth()
  },
  methods: {
    countWidth() {
      if (this.tabList.length === 3) {
        this.marginLeftVal = '20%'
      } else {
        this.marginLeftVal = ''
      }
    },
    change(val) {
      if (this.currActive === val) {
        return
      }
      this.currActive = val
      this.$emit('change', val)
    }
  }
}
</script>

<template>
  <div style="width: 100%;">
    <div class="vm-select" @click="showModal" :style="selectStyle">
      <div class="vm-select-tip" v-if="required">*</div>
      <div class="vm-select-content">
        <div class="vm-select-label">{{label}}</div>
        <div class="vm-select-value">
          <span class="vm-font-color-9" v-if="!checkArr.length">{{placeholder}}</span>
          <span v-else><template v-for="item in laskCheck">{{item.name}} </template></span>
        </div>
        <div class="vm-select-icon">
          <span class="icon iconfont iconenter"></span>
        </div>
      </div>
    </div>
    <div class="vm-modal-select" :class='isShow?"active":""'>
      <div class="vm-modal-mask" @click="cancel"></div>
      <div class="vm-modal-container">
        <div class="vm-modal-header">
          <div class="vm-modal-back"><span class="icon iconfont  iconreturn" @click="turnBack"></span></div>
          <div class="vm-modal-title">{{modalLabel}}</div>
          <div class="vm-modal-btn" @click="turnNext">{{(checkArr[level] && checkArr[level].children && checkArr[level].children.length) ? '下一步':'确定'}}</div>
        </div>
        <div class="vm-modal-select-title" v-if="copyProvinceAndCityDatas.length">
          <div class="vm-ell">
            <span v-if="!checkArr.length">请选择</span>
            <span v-else>已选择:
              <template v-for="item in checkArr">{{item.name}} </template>
            </span>
          </div>
        </div>
        <div class="vm-modal-body" ref="vmModalBody">
          <div class="input-wrap plr-60">
            <i class="iconfont iconsearch pre-icon"></i>
            <input v-model="keyword"
                  class="input"
                  placeholder="请输入关键字搜索"
                  @keyup.enter="handleSearch" />
          </div>
          <div class="vm-modal-ul" v-if="treeArr.length">
            <div class="vm-modal-li" :class='(checkArr[level] && item[compareDefaultValue]===checkArr[level][compareDefaultValue])?"active":""' v-for="(item, index) in treeArr" :key="index" @click="sureSelect(item)">
              <div class="vm-modal-li-name">{{item.name}}</div>
              <div class="vm-modal-li-icon" :class='(checkArr[level] && item[compareDefaultValue]===checkArr[level][compareDefaultValue])?"active":""'>
                <mu-icon size="18" value="check"></mu-icon>
              </div>
            </div>
<!--            <div v-if="!hasId"-->
<!--                 class="vm-modal-li"-->
<!--                 :class='(checkArr[level] && item.name===checkArr[level].name)?"active":""'-->
<!--                 v-for="(item, index) in treeArr"-->
<!--                 :key="index"-->
<!--                 @click="sureSelect(item)">-->
<!--              <div class="vm-modal-li-name">{{item.name}}</div>-->
<!--              <div class="vm-modal-li-icon" :class='(checkArr[level] && item.name===checkArr[level].name)?"active":""'>-->
<!--                <mu-icon size="18" value="check"></mu-icon>-->
<!--              </div>-->
<!--            </div>-->
          </div>
          <div class="vm-modal-nodata" v-else>
            暂无选项
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    selectStyle: {
      default: ''
    },
    //应该是v-module传过来的数据
    value: {
      type: Array,
      default: function() {
        return []
      }
    },
    hasId: {
      type: Boolean,
      default: function() {
        return true
      }
    },
    dataTree: {
      type: Array,
      default: function() {
        return []
      }
    },
    placeholder: {
      type: String,
      default: function() {
        return '请选择'
      }
    },
    label: {
      type: String,
      default: function() {
        return '类目'
      }
    },
    required: {
      type: Boolean,
      default: function() {
        return false
      }
    },
    modalLabel: {
      type: String,
      default: function() {
        return '类目'
      }
    }
  },
  data() {
    return {
      keyword: '', // 搜索的关键字
      isShow: false,
      selectName: '',
      treeArr: [],
      checkArr: [],
      laskCheck: [],
      level: 0,
      treeLevelData: {},
      copyProvinceAndCityDatas: [],
      compareDefaultValue: 'id' // 默认比较得属性为id
    }
  },
  watch: {
    'dataTree' (val) {
      if (val && val.length) {
        this.initData()
      }
    },
    'value' (val, oldVal) {
      this.initData()
    }
  },
  created() {
  },
  methods: {
    initData() {
      this.$nextTick(() => {
        let arr = []
        let val = [...this.value]
        if (val.length) {
          if (!this.hasId) {
            console.log('val===', val)
          }
          arr = this.getCheckInfo(val, arr)
          this.checkArr = [...arr]
          this.laskCheck = [...arr]

          console.log("來了老弟")
        } else {
          this.checkArr = []
          this.laskCheck = []
        }
      })
    },
    // 搜索
    handleSearch() {
      let keyword = this.keyword
      this.treeArr = this.copyProvinceAndCityDatas.filter(({name}) => {
        return name.indexOf(keyword) !== -1
      })
    },
    getCheckInfo(val, arr) {
      let dataTree = [...this.dataTree]
      let newArr = this.loopCall(dataTree, val, arr)
      // console.log(5555555555555555,newArr)
      return newArr

    },
    loopCall(dataArr, val, arr) {
      if (dataArr.length) {
        for (let i = 0; i < dataArr.length; i++) {
          if (/*Number(val[0]) === Number(dataArr[i][this.compareDefaultValue]) ||*/ val[0] == dataArr[i][this.compareDefaultValue]) {
            arr.push(dataArr[i])
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
    showModal() {
      this.isShow = true
      this.keyword = ''
      if (this.hasId) {
        this.compareDefaultValue = 'id'
      } else {
        this.compareDefaultValue = 'name'
      }
      this.treeArr = [...this.dataTree]
      console.log('showModal', this.treeArr)
      this.copyProvinceAndCityDatas = JSON.parse(JSON.stringify(this.treeArr))
      this.level = 0
    },
    cancel() {
      this.isShow = false
      this.checkArr = [...this.laskCheck]
    },
    turnBack() {
      let level = this.level - 1
      if (level > 0) {
        this.treeArr = [...this.checkArr[level - 1].children]
        this.level -= 1
      } else if (level === 0) {
        this.level -= 1
        this.treeArr = [...this.dataTree]
      }
      this.copyProvinceAndCityDatas = JSON.parse(JSON.stringify(this.treeArr))
      this.scrollTopCall('vmModalBody')
    },
    getIdsArr(val) {
      let arr = []
      for (let i = 0; i < val.length; i++) {
        arr.push(val[i][this.compareDefaultValue])
      }
      return arr
    },
    turnNext(sure = true) {
      console.log('下一个', this.checkArr)
      if (this.checkArr.length === this.level + 1) {
        if (this.checkArr[this.level] && this.checkArr[this.level].children && this.checkArr[this.level].children.length) {
          let newArr = this.checkArr[this.level].children
          this.treeArr = [...newArr]
          this.level += 1
        } else {
          if (sure) {
            // 提交
            console.log('提交')
            this.laskCheck = [...this.checkArr]
            this.isShow = false
            this.$emit('change', this.laskCheck)
            let arr = this.getIdsArr(this.laskCheck)
            this.$emit('input', arr)
          }
        }
      } else {
        if (this.checkArr[this.level] && JSON.stringify(this.checkArr[this.level].children).indexOf(JSON.stringify(this.checkArr[this.level + 1])) > -1) {
          let newArr = this.checkArr[this.level].children
          this.treeArr = [...newArr]
          this.level += 1
        } else {
          this.$toast.message('请先选择选项')
          return
        }
      }
      this.copyProvinceAndCityDatas = JSON.parse(JSON.stringify(this.treeArr))
    },
    sureSelect(item) {
      let oldCheckArr = [...this.checkArr]
      this.keyword = ''
      if (oldCheckArr[this.level] && oldCheckArr[this.level][this.compareDefaultValue] && oldCheckArr[this.level][this.compareDefaultValue] !== item.id) {
        this.checkArr.splice(this.level + 1)
      }
      this.$set(this.checkArr, this.level, item)
      if (this.checkArr[this.level] && this.checkArr[this.level].children && this.checkArr[this.level].children.length) {
        this.$nextTick(() => {
          this.scrollTopCall('vmModalBody')
        })
      }
      this.turnNext(false)
    },
    scrollTopCall(key, val = 0) {
      let eles = this.$refs[key]
      eles.scrollTop = val
    }
  }
}
</script>

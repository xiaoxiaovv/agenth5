<template>
  <div>
    <mu-bottom-sheet :open.sync="open">
      <mu-list @item-click="closeBottomSheet">
        <mu-sub-header>Select One</mu-sub-header>
        <mu-list-item button>
          <mu-list-item-action>
            <mu-icon value="grade"
                     color="orange"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>Star</mu-list-item-title>
        </mu-list-item>
      </mu-list>
    </mu-bottom-sheet>
  </div>
</template>

<script>

export default {
  props: ['openBottomSt'],
  data() {
    return {
      open: false
    }
  },
  watch: {
    openBottomSt(val) {
      console.log(val)
      this.open = val
    }
  },
  methods: {
    closeBottomSheet() {
      this.open = false
    },
    openBotttomSheet() {
      this.open = true
    }
  }
}
</script>

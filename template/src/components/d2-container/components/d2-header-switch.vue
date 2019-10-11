<template>
  <div
    v-if="show"
    class="d2-header-switch"
    :class="{ 'd2-header-switch--active': isActive }"
    @click="handleClick">
    <d2-el-icon :name="name"/>
     <!-- <li :class="$store.state.d2admin.tsearch.active?'fa fa-compress':'fa fa-expand'"></li> -->
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      isActive: false,
      path: ''
    }
  },
  computed: {
    show() {
      return true
    },
    name() {
      return this.$store.state.d2admin.tsearch.active ? 'top-right' : 'bottom-left'
    }
  },
  mounted() {
    setTimeout(() => (this.isActive = true), 0)
  },
  methods: {
    ...mapMutations('d2admin/tsearch', ['toggle']),
    // 点击按钮的时候跳转到源代码
    handleClick() {
      this.toggle()
    }
  }
}
</script>

<style lang="scss" scoped>
.d2-header-switch {
  $borderRadius: 30px;
  $paddingLR: 30px;
  $paddingTB: 2px;
  $fontSize: 12px;
  $rightOuter: $paddingLR / 2;
  opacity: 0;
  position: absolute;
  z-index: 2019;
  right: 20%;
  bottom: -17px;
  font-size: $fontSize;
  line-height: $fontSize;
  font-weight: bold;
  border-radius: 0  0 $borderRadius $borderRadius;
  padding: $paddingTB $paddingLR;
  background-color: rgba(#fff, 1);
  border: 1px solid #DCDFE6;
  border-top: none;
  color: #606266;
  transition: all .3s;
  @extend %unable-select;
  &.d2-header-switch--active {
    opacity: 1;
  }
}
</style>

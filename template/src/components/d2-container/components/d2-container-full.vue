<template>
  <div class="d2-container-full">
    <div v-if="$slots.header" class="d2-container-full__header" ref="header" :class="this.active?'active':'close'">
      <slot name="header" />
      <d2-header-switch />
    </div>
    <div class="d2-container-full__body" ref="body">
      <slot />
    </div>
    <div v-if="$slots.footer" class="d2-container-full__footer" ref="footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script>
import scroll from './mixins/normal'
export default {
  name: 'd2-container-full',
  mixins: [scroll],
  components: {
    d2HeaderSwitch: () => import('./d2-header-switch.vue')
  },
  data() {
    return {
      oHeaderStyle: {
        padding: '20px 20px 0 20px'
      }
    }
  },
  computed: {
    active() {
      return this.$store.state.d2admin.tsearch.active
    }
  },
  mounted() {
    // 增加滚动事件监听
    this.addScrollListener()
  },
  beforeDestroy() {
    // 移除滚动事件监听
    this.removeScrollListener()
  }
}
</script>

<style lang="scss">
.d2-container-full {
  .d2-container-full__header {
    position: relative;
    transition: all .2s ease;
    &.close{
      height: 0;
      padding: 0 20px !important;
      form{
        opacity: 0;
      }
      border-bottom-color:rgba(0,0,0,0) !important;
    }
    .el-form-item{
      margin-bottom: 4px;
    }
  }
}
</style>

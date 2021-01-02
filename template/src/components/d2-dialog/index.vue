<!-- 弹窗 -->
<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="isVisible"
      :show-close="showClose"
      :before-close="handleClose"
      :close-on-click-modal="false"
      :width="width"
    >
      <slot></slot>
      <div slot="footer">
        <slot name="btn-start"></slot>
        <el-button
          v-if="!noCancel"
          @click="handleClose"
        >取消</el-button>
        <el-button
          type="primary"
          @click="handleConfirm"
          :loading="$store.state.d2admin.loading.value"
        ></el-button>
        <slot name="btn-middle"></slot>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'd2-dialog',
  data() {
    return {
    }
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    isVisible: {
      type: Boolean,
      default: false
    },
    showClose: {
      type: Boolean,
      default: true
    },
    btnOkLabel: {
      type: String,
      default: '确定'
    },
    noCancel: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: '580px'
    }
  },

  methods: {
    handleClose() {
      this.$emit('closeDialog')
    },
    handleConfirm() {
      this.$emit('confirmDialog')
    }
  }
}

</script>
<style scoped>
</style>

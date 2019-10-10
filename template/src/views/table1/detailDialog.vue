<!-- 查看详情  -->
<template>
  <div class="detailDialog">
    <el-dialog
      :visible.sync="isVisible"
      :title="title"
      :before-close="handleClose"
      :close-on-click-modal="false"
      width="860px"
      >
      <iframe width="100%" height="700px" scrolling="yes" frameborder="0" :src="pdfUrl"></iframe>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'DetailDialog',
  data() {
    return {
    }
  },

  props: {
    isVisible: {
      type: Boolean,
      default: false
    },
    title: String,
    pdfUrl: String
  },

  mounted() {},

  methods: {
    handleClose() {
      this.$emit('closeDialog')
    }
  }
}

</script>
<style lang="scss">
.detailDialog{
  .el-dialog__header {
    padding: 10px 16px 4px;
    background-color: #141516;
    .el-dialog__title{
      color: #fff;
      font-size: 16px;
    }
  }
  .el-dialog__body {
    padding: 0;
    background-color: #202223
  }
}
</style>

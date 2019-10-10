import Vue from 'vue'

export default new Vue({
  methods: {
    warningTips(message) {
      this.$notify({
        type: 'warning',
        title: message
      })
    },
    okTips(message) {
      this.$notify({
        type: 'success',
        title: message || '操作成功'
      })
    },
    errorTips(message) {
      this.$notify({
        type: 'error',
        title: message || '操作失败'
      })
    }
  }
})

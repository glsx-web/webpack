<!-- 新增/编辑车辆弹窗 -->
<template>
  <div>
      <el-dialog
        :title="title"
        :visible.sync="isVisible"
        :before-close="handleClose"
        :close-on-click-modal="false"
        width="580px"
      >
        <el-form
          :model="editForm"
          :rules="rules"
          ref="editRuleForm"
          label-width="110px"
        >
          <el-form-item label="订单编号" prop="orderCode">
            <el-input v-model="editForm.orderCode" maxlength="14"
              :show-word-limit="true" placeholder="请输入订单编号" clearable></el-input>
          </el-form-item>
          <el-form-item label="申请人" prop="userName">
            <el-input v-model="editForm.userName"  maxlength="32"
              :show-word-limit="true"  placeholder="请输入申请人" clearable></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button
            type="primary"
            @click="handleConfirm"
            :loading="$store.state.d2admin.loading.value"
          >保存</el-button>
          <el-button
            @click="handleClose"
          >取消</el-button>
        </div>
      </el-dialog>
  </div>
</template>

<script>
// import { isExistApi } from '@api/subSysManagement'
// import { isTrafficExistApi } from '@api/trafficManagement'
export default {
  name: 'EditDialog',
  data() {
    return {
      disabled: false,
      title: '添加子系统',
      rules: {
        orderCode: [
          { required: true, message: '请输入订单编号', trigger: 'change' }
        ],
        userName: [
          { required: true, message: '请输入申请人', trigger: 'blur' }
        ]
      }
    }
  },
  props: {
    isVisible: {
      type: Boolean,
      default: false
    },
    editForm: Object
  },

  watch: {
    isVisible(val) {
      // this.disabled = !!this.editForm.subsystemCode
      this.title = !this.editForm.id ? '添加子系统' : '编辑子系统'
      this.$refs.editRuleForm && this.$refs.editRuleForm.resetFields()
    }
  },

  methods: {
    // async isCodeExist(rule, value, callback) {
    //   if (this.editForm.trafficCode && !this.editForm.id) {
    //     const res = await isExistApi({ subsystemCode: value, trafficCode: this.editForm.trafficCode })
    //     res.subsystemCode ? callback(new Error(rule.message)) : callback()
    //   }
    // },

    // async isTrafficCodeExist(rule, value, callback) {
    //   if (!this.editForm.id) {
    //     const res = await isTrafficExistApi({ trafficCode: value })
    //     res.trafficCode ? callback() : callback(new Error(rule.message))
    //   }
    // },

    // isNum(rule, value, callback) {
    //   const regNum = /^[\d]{4,4}$/
    //   regNum.test(value) ? callback() : callback(new Error(rule.message))
    // },

    // isNumOrString(rule, value, callback) {
    //   const regNum = /^[A-Z\d]{14,14}$/
    //   regNum.test(value) ? callback() : callback(new Error(rule.message))
    // },

    // validateCode(value) {
    //   this.$refs.editRuleForm.validateField('subsystemCode')
    // },

    handleClose() {
      this.$emit('closeDialog')
    },
    handleConfirm() {
      this.$refs.editRuleForm.validate((vaild) => {
        if (vaild) {
          this.$emit('confirmDialog')
        }
      })
    }
  }
}

</script>
<style scoped>
</style>

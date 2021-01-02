<template>
  <el-dialog
    center
    title="用户注册"
    :visible.sync="dialogVisible"
    :before-close="handleClose"
    width="680px"
    :close-on-click-modal="false"
    custom-class="reg-dialog"
  >
    <el-form
      ref="regForm"
      :model="regForm"
      label-width="120px"
      class="reg-dialog-form"
      :rules="rules"
    >
      <el-form-item label="用户名：" prop="userName">
        <el-input v-model="regForm.userName" requred maxlength="10" clearable placeholder="请输入用户名" :show-word-limit="true"></el-input>
      </el-form-item>
      <el-form-item label="密码：" prop="password">
        <el-input type="password" v-model="regForm.password" placeholder="请输入密码" clearable maxlength="12" :show-word-limit="true" :show-password="true"></el-input>
      </el-form-item>
      <el-form-item label="确认密码：" prop="confirm">
        <el-input type="password" v-model="regForm.confirm" placeholder="请再输入一次密码" clearable maxlength="12" :show-word-limit="true" :show-password="true"></el-input>
      </el-form-item>
      <el-form-item flex="main:left cross:center"></el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click="submit" type="primary" :loading="$store.state.d2admin.loading.value" class="button-submit">提交</el-button>
      <el-button @click="handleClose" type="plain" class="button-submit">取消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { Reg } from '@/api/sys.account'
import notice from '@/common/notice'
export default {
  name: 'DialogReg',
  props: {
    isVisible: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    dialogVisible() {
      return this.isVisible
    }
  },
  data() {
    return {
      company: [],
      regForm: {
        userName: '',
        password: '',
        confirm: ''
      },
      rules: Object.freeze({
        userName: [
          { required: true, message: '用户名不能为空', trigger: ['blur'] }
        ],
        password: [
          { required: true,
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请输入密码'))
              } else {
                if (this.regForm.confirm !== '') {
                  this.$refs.regForm.validateField('confirm')
                }
                callback()
              }
            },
            trigger: 'blur'
          }
        ],
        confirm: [
          { required: true,
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请再次输入密码'))
              } else if (value !== this.regForm.password) {
                callback(new Error('两次输入密码不一致!'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ],
        // userName: [
        //   { required: true, message: '姓名不能为空', trigger: ['blur'] }
        // ],
        mobile: [
          { required: true,
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('联系方式不能为空'))
              } else {
                if (/^1\d{10}$/.test(value)) {
                  callback()
                } else {
                  return callback(new Error('联系方式错误'))
                }
              }
            },
            trigger: ['blur'] }
        ],
        companyName: [
          { required: true, message: '所属公司不能为空', trigger: ['blur'] }
        ],
        departName: [
          { required: true, message: '部门不能为空', trigger: ['blur'] }
        ],
        postCode: [
          { required: true, message: '职务不能为空', trigger: ['blur'] }
        ],
        stationCode: [
          { required: true, message: '所属站点不能为空', trigger: ['blur'] }
        ]
      })
    }
  },
  methods: {
    handleClose() {
      this.$refs.regForm.resetFields()
      this.$event.$emit('e-reg-dialog', false)
    },
    // 提交注册数据
    submit() {
      this.$refs.regForm.validate(vaild => {
        if (vaild) {
          var __p = this.regForm
          Reg(__p).then(res => {
            const { operateStatus } = res
            if (operateStatus) {
              notice.okTips('注册信息已提交，请等待管理员审核')
              this.handleClose()
            } else {
              notice.errorTips('注册失败！')
            }
          })
        }
      })
    }
  },
  mounted() {
  }
}
</script>
<style lang="scss">
$login-dialog-lable-width: 90px;
$login-dialog-font: 13px;
.reg-dialog {
  background: #fff;
  box-shadow: 0 8px 20px 0 rgba(0, 0, 0, 0.06);
  border-radius: 9px;
  .reg-dialog-form {
    width: 600px;
    .el-form-item {
      margin-bottom: 20px;
      .el-input__inner {
        height: 35px;
        line-height: 35px;
        border-radius: 2px;
      }
    }
  }
  .el-dialog__title {
    font-size: 20px;
    color: #333;
  }
  .el-dialog__body {
    display: flex;
    justify-content: center;
    padding: 25px 25px 0 30px;
    .el-form-item__label {
      //   width: $login-dialog-lable-width !important;
      //   text-align: right;
      font-size: $login-dialog-font;
    }
    // .el-form-item__content {
    //   margin-left: $login-dialog-lable-width;
    //   font-size: $login-dialog-font;
    // }
  }
  .el-dialog__footer {
      padding-top:0;
      display: flex;
      justify-content: flex-end;
    // padding: 0 0 38px 0 !important;
  }
  .sigle-select {
    width: 100%;
  }
}
</style>

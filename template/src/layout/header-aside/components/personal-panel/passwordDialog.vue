<!-- 详情弹框 -->
<template>
  <div class="password-detail">
    <el-dialog
      title="修改密码"
      :visible.sync="visible"
      :before-close="handleClose"
      :append-to-body="true"
      :close-on-click-modal="false"
      width="600px"
    >
      <el-form label-width="120px" v-if="info" :model="info" :rules="rules"  ref="passwordForm">
        <el-form-item label="用户名：" prop="userName">
          <el-input disabled="disabled" v-model="info.userName"></el-input>
        </el-form-item>
        <el-form-item label="原密码：" prop="oldPassword">
          <el-input type="password" maxlength="12" :show-password="true" v-model="info.oldPassword" />
        </el-form-item>
        <el-form-item label="新密码：" prop="newPassword">
          <el-input type="password" maxlength="12" :show-password="true" v-model="info.newPassword" />
        </el-form-item>
        <el-form-item label="确认密码：" prop="confirm">
          <el-input type="password" maxlength="12" :show-password="true" v-model="info.confirm" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submit">保 存</el-button>
        <el-button @click="handleClose">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { ModifyPassword } from '@api/sys.account'
export default {
  name: 'PasswordDialog',
  components: {},
  data() {
    return {
      rules: Object.freeze({
        oldPassword: [
          { required: true, message: '请输入旧密码', trigger: ['blur'] }
        ],
        newPassword: [
          { required: true,
            validator: (rule, value, callback) => {
              if (!value) {
                callback(new Error('请输入新密码'))
              } else {
                if (this.info.confirm) {
                  this.$refs.passwordForm.validateField('confirm')
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
              if (!value) {
                callback(new Error('请再次输入新密码'))
              } else if (value !== this.info.newPassword) {
                callback(new Error('两次新密码不一致!'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ]
      })
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    user: Object
  },
  computed: {
    info() {
      return this.user
    }
  },
  methods: {
    // 修改密码
    submit() {
      this.$refs.passwordForm.validate(async valid => {
        if (valid) {
          const { userId, oldPassword, newPassword } = this.info
          const result = await ModifyPassword({ userId, oldPassword, newPassword })
          const { operateStatus } = result
          if (operateStatus) {
            this.emit(true)
            return
          }
          this.$message.error('修改密码失败')
        }
      })
    },
    handleClose() {
      this.emit(false)
    },
    emit(is2Login) {
      this.$event.$emit('e-ps-close', is2Login)
      this.$refs.passwordForm.validateField()
    }
  }
}
</script>

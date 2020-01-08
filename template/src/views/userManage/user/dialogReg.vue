<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    :before-close="handleClose"
    width="720px"
    custom-class="reg-dialog-admin"
    :close-on-click-modal="false"
    v-if="dialogVisible"
    :append-to-body="true"
    :lock-scroll="false"
  >
    <el-form
      ref="regForm"
      :model="regForm"
      label-width="120px"
      class="reg-dialog-form"
      :rules="rules"
    >
      <el-form-item label="用户名：" prop="loginName">
        <el-input
          v-model="regForm.loginName"
          :disabled="!!regForm.userId"
          requred
          maxlength="10"
          placeholder="请输入用户名"
          clearable
          :show-word-limit="true"
        ></el-input>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="姓名：" prop="userName">
            <el-input
              v-model="regForm.userName"
              placeholder="请输入姓名"
              maxlength="8"
              :show-word-limit="true"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="角色：" prop="roleId">
            <el-select v-model="regForm.roleId" placeholder="请选择">
              <el-option
                :label="role.roleName"
                :value="role.roleId"
                v-for="(role,index) in baseData.roles"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer">
      <el-button @click="submit" type="primary" :loading="$store.state.d2admin.loading.value" class="button-submit">提交</el-button>
      <el-button @click="handleClose" type="plain" class="button-submit">取消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { mapActions } from 'vuex'
import notice from '@/common/notice'
import { RegistType, POST_DISABLED } from '@/common/constants'
import util from '@/libs/util'
export default {
  name: 'DialogReg',
  props: {
    isVisible: {
      type: Boolean,
      default: false
    },
    editData: {
      type: Object,
      default: null
    },
    verify: {
      type: Function,
      default: null
    }
  },
  watch: {
    editData: {
      handler: function(value) {
        if (!value || !value.data) return
        const { data } = value
        const { title, submit } = data
        this.title = title
        this.submitFunction = submit
        delete value.data
        Object.assign(this.regForm, value)
      },
      immediate: true
    }
  },
  computed: {
    dialogVisible() {
      if (!this.isVisible) {
        util.resetForm.call(this, 'regForm')
      }
      return this.isVisible
    }
  },
  data() {
    return {
      POST_DISABLED,
      regForm: {
        createType: RegistType.BY_ADMIN, // 1 自注册 2 管理员创建
        loginName: '',
        userName: '',
        roleId: ''
      },
      title: '',
      submitFunction: null,
      rules: Object.freeze({
        loginName: [
          { required: true, message: '用户名不能为空', trigger: ['blur'] }
        ],
        userName: [
          { required: true, message: '姓名不能为空', trigger: ['blur'] }
        ],
        // mobile: [
        //   {
        //     required: true,
        //     validator: (rule, value, callback) => {
        //       if (value === '') {
        //         callback(new Error('联系方式不能为空'))
        //       } else {
        //         if (/^1\d{10}$/.test(value)) {
        //           callback()
        //         } else {
        //           return callback(new Error('联系方式错误'))
        //         }
        //       }
        //     },
        //     trigger: ['blur']
        //   }
        // ],
        // companyName: [
        //   { required: true, message: '所属公司不能为空', trigger: ['blur'] }
        // ],
        // departName: [
        //   { required: true, message: '部门不能为空', trigger: ['blur'] }
        // ],
        // postCode: [
        //   { required: true, message: '职务不能为空', trigger: ['blur'] }
        // ],
        // stationCode: [
        //   { required: true, message: '所属站点不能为空', trigger: ['blur'] }
        // ],
        roleId: [{ required: true, message: '角色不能为空', trigger: ['blur'] }]
      }),
      /* -----------------------基础数据---------------------- */
      baseData: {
        // 所属站点
        stations: [],
        // 职务
        posts: [],
        // roles
        roles: []
      }
    }
  },
  methods: {
    ...mapActions('d2admin/base', ['load']),
    handleClose(done) {
      this.$event.$emit('e-reg-dialog-close', false)
    },
    // 提交注册或审核数据
    submit() {
      this.$refs.regForm.validate(vaild => {
        if (vaild) {
          var __p = this.regForm
          __p.createType = RegistType.BY_ADMIN
          // __p.postName = this.baseData.posts.find(post => post.confCode === __p.postCode).confValue
          this.submitFunction(__p).then(res => {
            const { operateStatus } = res
            if (operateStatus) {
              notice.okTips(`${this.title}成功！`)
              this.$refs.regForm.resetFields()
              this.$event.$emit('e-reg-dialog-close', true)
            } else {
              notice.errorTips(`${this.title}失败！`)
            }
          })
        }
      })
    },
    // 加载业务所需所有数据
    async fetchData() {
      const { role, station, post } = await this.load()
      this.baseData.posts = post
      this.baseData.stations = station
      this.baseData.roles = role.roles
      Object.freeze(this.baseData)
    }
  },
  mounted() {
    this.fetchData()
  }
}
</script>

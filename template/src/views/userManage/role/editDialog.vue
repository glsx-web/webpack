<template>
  <el-dialog
    :title="title"
    :before-close="handleClose"
    :visible.sync="dialogVisible"
    width="720px"
    custom-class="edit-role-dialog"
    :close-on-click-modal="false"
    v-if="dialogVisible"
  >
    <el-form
      ref="roleForm"
      :model="roleForm"
      label-width="120px"
      class="edit-dialog-form"
      :rules="rules"
    >
      <el-form-item label="角色名：" prop="roleName">
        <el-input v-model="roleForm.roleName" requred maxlength="10" :show-word-limit="true" clearable placeholder="请输入角色名" :disabled="!!roleForm.roleId"></el-input>
      </el-form-item>
      <el-form-item label="描述：">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="角色描述"
          clearable
          maxlength="50"
          :show-word-limit="true"
          v-model="roleForm.description">
        </el-input>
      </el-form-item>
    </el-form>
    <el-divider content-position="left">权限设置</el-divider>
    <RoleTree :resources="resources" :authIds="authIds" ref="roleTree" :close="dialogVisible"></RoleTree>
    <div slot="footer">
      <el-button @click="submit" type="primary" :loading="$store.state.d2admin.loading.value" class="button-submit">保存</el-button>
      <el-button @click="handleClose" type="plain" class="button-submit">取消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { RoleReg, RoleModify } from '@/api/sys.account'
import notice from '@/common/notice'
import RoleTree from './roleTree'
import { localRoutes } from '@/router/routes'
import util from '@/libs/util.js'
export default {
  name: 'editDialog',
  props: {
    isVisible: {
      type: Boolean,
      default: false
    },
    editData: {
      type: Object,
      default: null
    }
  },
  components: {
    RoleTree
  },
  watch: {
    editData: {
      handler: function(value) {
        this.title = value && value.roleId ? '编辑角色' : '创建角色'
        Object.assign(this.roleForm, value)
        this.authIds = this.roleForm.authes || []
        delete this.roleForm.authes
      },
      immediate: true
    }
  },
  computed: {
    dialogVisible() {
      if (!this.isVisible) {
        util.resetForm.call(this, 'roleForm')
      }
      return this.isVisible
    },
    resources() {
      const clone = util.deepClone(Object.values(localRoutes))
      const { menus } = util.permision.packMenusBtns(clone)
      const all = util.permision.flatten(clone)
      menus.find(o => o.authId === '101').disabled = true
      return { menus, all }
    }
  },
  data() {
    return {
      authIds: [],
      title: '',
      roleForm: {
        roleName: '',
        description: ''
      },
      rules: Object.freeze({
        roleName: [
          { required: true, message: '角色名不能为空', trigger: ['blur'] }
        ]
      })
    }
  },
  methods: {
    handleClose(done) {
      this.emitClose(false)
    },
    emitClose(reload) {
      this.$event.$emit('e-role-dialog-close', reload)
      reload && this.$refs.roleForm.resetFields()
    },
    submit() {
      this.$refs.roleForm.validate(vaild => {
        if (vaild) {
          const authIds = this.$refs.roleTree.getCheckedNodes()
          var __p = { ...this.roleForm, authIds }
          const fMethod = __p.roleId ? RoleModify : RoleReg
          fMethod(__p).then(res => {
            const { operateStatus } = res
            if (operateStatus) {
              notice.okTips(`${this.title}成功！`)
              this.emitClose(true)
            } else {
              notice.errorTips(`${this.title}失败！`)
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
.edit-role-dialog {
  .el-divider--horizontal{
      margin: 30px 0px 20px;
  }
  .role-tree{
    height: 443px;overflow-y: auto;
  }
}
</style>

<!-- 详情弹框 -->
<template>
  <div class="personal-detail">
    <el-dialog
      title="个人信息"
      :visible.sync="visible"
      :before-close="handleClose"
      :append-to-body="true"
      :close-on-click-modal="false"
      width="600px"
    >
      <el-form v-if="user" label-width="120px" :model="user">
        <el-form-item label="用户名：" prop="loginName">
          <el-input disabled v-model="user.loginName"></el-input>
        </el-form-item>
        <el-form-item label="姓名：" prop="userName">
          <el-input disabled v-model="user.userName"></el-input>
        </el-form-item>
        <el-form-item label="联系方式：" prop="mobile">
          <el-input disabled v-model="user.mobile"></el-input>
        </el-form-item>
        <el-form-item label="所属公司：" prop="companyName">
          <el-input disabled v-model="user.companyName"></el-input>
        </el-form-item>
        <el-form-item label="部门：" prop="departName">
          <el-input disabled v-model="user.departName"></el-input>
        </el-form-item>
        <el-form-item label="职务：" prop="postName">
          <el-input disabled v-model="user.postName"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <!-- <el-button type="primary" @click="personDialogVisible = false">确 定</el-button> -->
        <el-button @click="handleClose">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import { ctMethods, request } from '@/api'
export default {
  name: 'personalDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    user: Object
  },
  methods: {
    handleClose() {
      this.$event.$emit('e-pd-close')
    }
  }
}
</script>

<!-- 用户管理 -->
<template>
  <d2-container class="user">
    <el-form :inline="true" :model="searchForm" label-width="85px" slot="header">
      <el-form-item label="用户：">
        <el-input v-model="searchForm.userName" placeholder="请输入用户名/姓名/联系电话" clearable></el-input>
      </el-form-item>
      <el-form-item label="角色：">
        <el-select v-model="searchForm.roleId" clearable placeholder="请选择">
          <el-option
            :label="role.roleName"
            :value="role.roleId"
            v-for="(role,index) in baseData.roles"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>
       <el-form-item label="注册时间：">
        <el-date-picker
          v-model="searchTimes"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"  icon="el-icon-search" :id="tableParams.btnId">查询</el-button>
      </el-form-item>
    </el-form>
    <d2-table-header title="用户列表"><auth-button category="action" label="创建用户"></auth-button></d2-table-header>
    <d2-table
      ref="userTable"
      :searchForm="searchForm"
      :tableParams="tableParams"
      :getListApi="getListApi"
    >
      <auth-button
        slot="auth-button"
        slot-scope="scope"
        :data="scope.scope"
        :mapping="mapping"
      ></auth-button>
    </d2-table>
    <dialog-reg :isVisible="registerDialogVisible" :editData="editData" :key="key"/>
  </d2-container>
</template>

<script>
import {
  UserList,
  PassWordReset,
  AccountModify,
  AccountIncrease,
  AccountForbidden,
  AccountValidate,
  AccountActived,
  Reg
} from '@/api/sys.account'
import notice from '@/common/notice'
import { mapActions } from 'vuex'
import util from '@/libs/util'
export default {
  name: 'FimsUsers',
  components: {
    DialogReg: () => import('./dialogReg')
  },
  data() {
    return {
      getListApi: UserList,
      key: new Date(),
      mapping: Object.freeze({
        field: 'status',
        '1': ['重置密码', '编辑', '延期', '禁用'],
        '2': ['重置密码', '编辑', '激活'],
        '3': ['重置密码', '编辑', '激活'],
        '4': ['审核']
      }),
      apiMapping: Object.freeze({
        '重置密码': PassWordReset,
        '延期': AccountIncrease,
        '禁用': AccountForbidden,
        '激活': AccountActived
      }),
      // 新增/编辑弹窗
      registerDialogVisible: false,
      editData: {},
      // 搜索
      searchForm: {
        userName: '',
        status: '',
        stationCode: '',
        postCode: '',
        startTime: '',
        endTime: ''
      },
      searchTimes: [],
      // 表格
      // 表格参数
      tableParams: {
        btnId: new Date().getTime() + parseInt(Math.random() * 1000),
        listName: 'userList',
        tag: Object.freeze({
          type: ['', 'success', 'info', 'danger', 'warning'],
          label: ['未知', '正常', '已过期', '禁用', '待审核']
        }),
        tableOption: true,
        tableColumns: [{
          label: '用户名',
          prop: 'loginName',
          width: '200'
        }, {
          label: '角色',
          prop: 'roleName',
          width: '140'
        }, {
          label: '注册时间',
          prop: 'registerTime',
          minWidth: '200'
        }, {
          label: '有效期',
          prop: 'validTime',
          minWidth: '200'
        }, {
          label: '状态',
          prop: 'status',
          width: '100',
          tagLabel: true
        }, {
          label: '姓名',
          prop: 'userName',
          width: '120'
        }]
      },
      /* -----------------------基础数据---------------------- */
      baseData: {
        // 所属站点
        stations: [],
        // 职务
        posts: [],
        // 角色
        roles: []
      }
    }
  },

  watch: {
    'searchTimes'(value) {
      Object.assign(this.searchForm, util.formatTime(this.searchTimes))
    },
    '$store.state.d2admin.base.role'(value) {
      this.baseData.roles = value
      this.key = new Date()
    }
  },

  mounted() {
    this.fetchData()
    this.$event.$on('e-reg-dialog-close', isReload => {
      isReload && this.$refs.userTable.refreshTable()
      this.registerDialogVisible = false
    })
  },

  methods: {
    ...mapActions('d2admin/base', ['load']),
    // 加载业务所需所有数据
    fetchData() {
      this.loadBaseData()
    },

    async loadBaseData() {
      const { role, station, post } = await this.load()
      this.baseData.posts = post
      this.baseData.stations = station
      this.baseData.roles = role
      Object.freeze(this.baseData)
    },
    /* 接口请求-start */
    filterTag(value, row) {
      return row.status === value
    },
    handleRegister() {
      const row = {
        data: {
          title: '用户创建',
          submit: Reg
        }
      }
      this.openDialog(row)
    },
    handleEdit(row) {
      row = util.deepClone(row)
      row.data = {
        title: '用户编辑',
        submit: AccountModify
      }
      this.openDialog(row)
    },
    openDialog(row) {
      this.registerDialogVisible = true
      this.editData = row
    },
    handleVerify(row) {
      row = util.deepClone(row)
      row.data = {
        title: '用户审核',
        submit: AccountValidate
      }
      this.openDialog(row)
    },
    // ------------
    // 列表各种操作
    async handleOperation(row, e) {
      const _actionText = e.target.innerText
      const res = await this.apiMapping[_actionText]({ userId: row.userId })
      const { operateStatus } = res
      if (operateStatus) {
        notice.okTips(`${_actionText}成功!`)
        this.$refs.userTable.refreshTable()
      } else {
        notice.errorTips(`${_actionText}失败！`)
      }
    }
  }
}
</script>
<style scoped>
</style>

<!-- 登陆日志 -->
<template>
  <d2-container class="loginLogs">
    <el-form
      :inline="true"
      :model="searchForm"
      label-width="85px"
      slot="header"
    >
      <el-form-item label="用户">
          <el-input v-model="searchForm.userName" placeholder="请输入用户名/姓名/联系电话" clearable></el-input>
      </el-form-item>
      <el-form-item label="登录方式">
          <el-select v-model="searchForm.loginType" placeholder="请选择" clearable filterable>
            <el-option label="PC" value="1"></el-option>
            <el-option label="小程序" value="2"></el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="登录时间">
        <el-date-picker
          v-model="loginTime"
          type="daterange"
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
          <el-button type="primary"  icon="el-icon-search" :id="tableParams.btnId">查询</el-button>
      </el-form-item>
    </el-form>
    <d2-table-header title="登录日志列表"></d2-table-header>
    <d2-table
      :searchForm="searchForm"
      :tableParams="tableParams"
      :getListApi="getListApi"
    ></d2-table>
  </d2-container>
</template>

<script>
import { getLoginlogs } from '@api/sys.account'
import util from '@/libs/util'
export default {
  name: 'FimsLoginLogs',
  data() {
    return {
      getListApi: getLoginlogs,
      loginTime: '',
      searchForm: {
        startTime: '',
        endTime: '',
        userName: '',
        loginType: ''
      },
      // 表格参数
      tableParams: {
        btnId: new Date().getTime() + parseInt(Math.random() * 1000),
        listName: 'loges',
        tableColumns: [{
          label: '登录时间',
          prop: 'loginTime',
          width: '200px'
        }, {
          label: '登录用户',
          prop: 'loginName'
        }, {
          label: '姓名',
          prop: 'userName'
        }, {
          label: '联系电话',
          prop: 'mobile',
          width: '180px'
        }, {
          label: '登录方式',
          prop: 'loginTypeValue'
        }, {
          label: '登录设备',
          prop: 'deviceCode',
          width: '300px'
        }]
      }
    }
  },

  watch: {
    'loginTime'(value) {
      Object.assign(this.searchForm, util.formatTime(this.loginTime))
    }
  },

  mounted() {},

  methods: {}
}

</script>
<style scoped>
</style>

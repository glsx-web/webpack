<!-- 表格组件-使用 -->
<template>
  <d2-container>
    <el-form
      :inline="true"
      :model="searchForm"
      label-width="85px"
      slot="header"
    >
      <el-form-item label="名称">
        <el-input
          v-model="searchForm.name"
          placeholder="请输入名称"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-date-picker
          v-model="createTime"
          type="daterange"
          value-format="yyyy-MM-dd"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          :id="tableParams.btnId"
        >查询</el-button>
      </el-form-item>
    </el-form>
    <d2-table-header title="列表标题">
      <auth-button
        category="Button"
        :data="editFormReset"
      ></auth-button>
    </d2-table-header>
    <d2-table
      ref="table"
      :searchForm="searchForm"
      :tableParams="tableParams"
      :getListApi="getListApi"
    >
      <auth-button
        slot="auth-button"
        slot-scope="scope"
        :data="scope.scope"
      ></auth-button>
    </d2-table>
    <edit-dialog
      :isVisible="editVisible"
      :editForm="editForm"
      @closeDialog="handleEditClose"
      @confirmDialog="handleEditConfirm"
    ></edit-dialog>
  </d2-container>
</template>

<script>
import EditDialog from './editDialog'
import { getListApi, editApi, removeApi } from '@api/table1'
import notice from '@/common/notice'
import util from '@/libs/util'
export default {
  name: 'fimsTable1',
  components: {
    EditDialog
  },
  data() {
    return {
      editVisible: false,
      // 搜索
      createTime: '',
      searchForm: {
        name: '',
        startTime: '',
        endTime: ''
      },
      editFormReset: {
        orderCode: '',
        userName: ''
      },
      editForm: {
        id: '',
        orderCode: '',
        userName: ''
      },
      // 表格参数
      tableParams: {
        mutiSelectName: 'table1',
        mutiSelectUniqueKey: 'id',
        btnId: new Date().getTime() + parseInt(Math.random() * 1000),
        listName: 'orderList',
        tag: Object.freeze({
          type: ['', '', 'info', 'danger', 'warning', 'success'],
          label: ['', '状态一', '状态二', '状态三', '状态四', '状态五']
        }),
        tableOption: true,
        tableColumns: [{
          label: '订单编号',
          prop: 'orderCode',
          minWidth: '200'
        }, {
          label: '销量',
          prop: 'sales',
          minWidth: '180',
          sortable: 'custom',
          momFlag: 'salesMom',
          addSymbol: '元'
        }, {
          label: '类型',
          prop: 'orderType',
          width: '120',
          formatter: (cellValue) => {
            if (cellValue.orderType) {
              return {
                1: '物料申请',
                2: '物料报废'
              }[cellValue.orderType]
            }
          }
        }, {
          label: '申请人',
          prop: 'userName',
          width: '140'
        }, {
          label: '状态',
          prop: 'status',
          tagLabel: true
        }]
      },
      getListApi: getListApi
    }
  },

  watch: {
    'createTime'(value) {
      Object.assign(this.searchForm, util.formatTime(this.createTime))
    }
  },

  mounted() { },

  methods: {
    handleEditClose() {
      this.editVisible = !this.editVisible
    },

    handleEditConfirm() {
      var editParams = JSON.parse(JSON.stringify(this.editForm))
      editApi(editParams).then(res => {
        notice.okTips()
        this.editVisible = false
        // 删除操作后，删除表格。d2-admin设置一个ref
        this.$refs.table.refreshTable()
      }).catch(() => { })
    },

    // 表格-编辑
    handleEdit(row) {
      this.editForm = JSON.parse(JSON.stringify(row))
      this.handleEditClose()
    },

    // 批量操作
    handleOperate(row) {
      this.$notify({
        title: '表格中选中的数据如下：',
        message: this.$refs.table.mutiSelectArr[this.tableParams.mutiSelectName],
        duration: 0
      })
    },

    handleDelete(row) {
      this.$confirm('确认删除?', '删除', {
        comfirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        removeApi({
          orderCode: row.orderCode
        }).then(() => {
          // 删除操作后，删除表格。d2-admin设置一个ref
          this.$refs.table.refreshTable()
          notice.okTips()
        }).catch(() => {
          notice.errorTips()
        })
      }).catch(() => { })
    }
  }
}

</script>
<style scoped>
</style>

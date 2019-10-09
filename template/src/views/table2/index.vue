<!-- 物料列表 -->
<template>
  <d2-container>
    <el-form
      :inline="true"
      :model="searchForm"
      label-width="85px"
      slot="header"
    >
      <el-form-item label="名称">
        <el-input v-model="searchForm.keyWord" placeholder="请输入名称" clearable></el-input>
      </el-form-item>
      <el-form-item>
          <el-button type="primary"  icon="el-icon-search" @click="getList">查询</el-button>
      </el-form-item>
    </el-form>
     <d2-table-header title="物料列表"></d2-table-header>
     <d2-table
      ref="table"
      :searchForm="searchForm"
      :tableData="tableData"
      :tableTotal="tableTotal"
      :tableParams="tableParams"
      @refreshTable="getList"
     ></d2-table>
  </d2-container>
</template>

<script>
import { getListApi } from '@api/table2'
import notice from '@/common/notice'
export default {
  name: 'fimsTable2',
  data() {
    return {
      searchForm: {
        keyWord: ''
      },
      getListApi: getListApi,
      // 表格
      tableData: [],
      tableTotal: 10,
      tableParams: {
        listName: 'deviceList',
        tableColumns: [{
          label: '物料代码',
          prop: 'deviceNum',
          width: '170'
        }, {
          label: '物料编码',
          prop: 'deviceCode',
          width: '170'
        }, {
          label: 'CRC物料号',
          prop: 'crcCode',
          width: '170'
        }, {
          label: '图号',
          prop: 'drawNum',
          width: '170'
        }, {
          label: '物料名称',
          prop: 'deviceName',
          minWidth: '200'
        }, {
          label: '规格',
          prop: 'specifications',
          width: '140'
        }, {
          label: '责任人',
          prop: 'responsible',
          width: '120'
        }]
      }
    }
  },

  mounted() {
    this.getList()
  },

  methods: {
    getList(page) {
      const params = {
        ...(page || { pageCount: 10, pageSize: 1 }),
        ...this.searchForm
      }
      getListApi(params).then(res => {
        console.log(res)
        this.tableData = res.data
        this.tableTotal = res.pagination.totalCount
      }).catch(() => {
        notice.errorTips()
      })
    }
  }
}

</script>
<style scoped>
</style>

<template>
<d2-container>
  <el-table
    :data="tableData"
    border
    size="small"
    style="width: 100%">
    <el-table-column
      fixed
      prop="date"
      label="日期"
      >
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
     >
    </el-table-column>
    <el-table-column
      prop="province"
      label="省份"
      >
    </el-table-column>
    <el-table-column
      prop="city"
      label="市区"
      >
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址"
      >
    </el-table-column>
    <el-table-column
      prop="zip"
      label="邮编"
      >
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      >
      <template slot-scope="scope">
        <auth-button label="查看" @e-auth-click="handleClick(scope.row)"/>
        <auth-button label="编辑" @e-auth-click="handleClick(scope.row)"/>
        <auth-button label="看不见我" @e-auth-click="handleClick(scope.row)"/>
        <el-button label="222222" v-auth></el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-input v-model="testCache" type="text"></el-input>
  </d2-container>
</template>

<script>
export default {
  name: 'page2',
  methods: {
    handleClick(row) {
      alert(JSON.stringify(row))
    }
  },
  data() {
    return {
      testCache: '',
      btn: {
        lable: '测试',
        action: 'test'
      },
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }]
    }
  }
}
</script>

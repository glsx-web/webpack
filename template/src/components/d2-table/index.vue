<!-- 表格+分页 -->
<template>
  <div>
    <el-table
      :data="getListApi ? data : tableData"
      v-loading="$store.state.d2admin.loading.value"
      border
      :highlight-current-row="true"
      :stripe="true"
    >
      <el-table-column
        align="center"
        width="60px"
        label="序号"
        type='index'
        :index="index=>index+(page.pageSize - 1) * page.pageCount + 1"
      ></el-table-column>
      <el-table-column
        v-for="(item, index) in tableParams.tableColumns"
        :key="index"
        :label="item.label"
        :prop="item.prop"
        :width="item.width"
        :min-width="item.minWidth"
        :align="item.align||'center'"
      >
        <template slot-scope="scope">
          <template v-if="item.tagLabel">
            /* eslint-disable no-alert, no-console */
            <el-tag
              v-if="!item.tagName"
              :type="tableParams.tag.type[scope.row[item.prop]]"
            >{{tableParams.tag['label'][scope.row[item.prop]]}}
            </el-tag>
            <el-tag
              v-else
              :type="tableParams[item.tagName].type[scope.row[item.prop]]"
            >{{tableParams[item.tagName].label[scope.row[item.prop]]}}
            </el-tag>
            /* eslint-enable no-alert, no-console */
          </template>
          <template v-else-if="item.formatter">
            {{item.formatter(scope.row)}}
          </template>
          <template v-else-if="getListApi">
            {{data[scope.$index][item.prop]}}
          </template>
          <template v-else>
            {{tableData[scope.$index][item.prop]}}
          </template>
        </template>
      </el-table-column>
      <el-table-column
        v-if="tableParams.tableOption"
        label="操作"
        :align="tableParams.tableOption.align||'center'"
        :width="tableParams.tableOption.width||'200'"
        fixed="right"
      >
        <template slot-scope="scope">
          <slot
            name="auth-button"
            :scope="scope.row"
          ></slot>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="pagination"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page.pageSize"
      :page-sizes="[10,20,30,40]"
      :page-size="page.pageCount"
      :total="getListApi ? total : tableTotal"
      layout="sizes,total,->,prev,pager,next,jumper"
    >
    </el-pagination>
  </div>
</template>

<script>
import notice from '@/common/notice'
export default {
  name: 'd2-table',
  data() {
    return {
      oldValue: {},
      data: [],
      // 页码
      page: {
        pageCount: 10,
        pageSize: 1
      },
      total: 10
    }
  },

  props: {
    // 搜索条件
    searchForm: {
      type: Object,
      default: () => []
    },
    // 表格数据-外部传入
    tableData: {
      type: Array,
      default: () => []
    },
    tableTotal: {
      type: Number,
      default: 10
    },
    // 获取列表接口
    getListApi: {
      type: Function,
      default: null
    },
    // 分页，默认有
    pagination: {
      type: Boolean,
      default: true
    },
    tableParams: {
      type: Object,
      default: () => {
        return {
          // 搜索按钮id；new Date().getTime() + parseInt(Math.random() * 1000)
          // btnId: {
          //   type: String,
          //   default: ''
          // },
          // 后端返回列表参数名
          listName: {
            type: String,
            default: ''
          },
          // 标签-默认标签名为tag；若有多个，那么需要在表格栏的列中加“tagName”
          // tag: {
          //   type: Array,
          //   default: () => []
          // },
          // 表格操作，默认没有
          // tableOption: {
          //   type: Object,
          //   default: null
          // },
          // 表格栏
          tableColumns: {
            type: Array,
            default: () => []
          }
        }
      }
    }
  },

  watch: {
    searchForm: {
      handler(val) {
        const attr = Object.keys(val).find(item => val[item] !== this.oldValue[item])
        if (!val[attr] && this.oldValue[attr]) {
          this.getListApi ? this.refreshTable() : this.$emit('refreshTable', this.page)
        }
        this.oldValue = _.cloneDeep(val)
      },
      deep: true
    },
    '$store.state.d2admin.refreshtable.value'(val) {
      this.refreshTable()
    }
  },

  mounted() {
    const btn = document.getElementById(this.tableParams.btnId)
    btn && btn.addEventListener('click', this.refreshTable)
    this.getListApi && this.refreshTable()
  },

  methods: {

    refreshTable() {
      const params = {
        ...this.page,
        ...this.searchForm
      }
      // console.log(params)
      this.getListApi(params).then(res => {
        this.data = res[this.tableParams.listName]
        res.pagination && (this.total = res.pagination.totalCount)
      }).catch(() => {
        notice.errorTips()
      })
    },

    // 页码
    handleSizeChange(value) {
      this.page.pageCount = value
      this.getListApi ? this.refreshTable() : this.$emit('refreshTable', this.page)
    },

    handleCurrentChange(value) {
      this.page.pageSize = value
      this.getListApi ? this.refreshTable() : this.$emit('refreshTable', this.page)
    }
  }
}

</script>
<style>
</style>

<!-- 表格+分页 -->
<template>
  <div class="d2-table">
    <el-table
      :ref="tableParams.mutiSelectName + 'MutiTable' || 'mutiTable'"
      :data="getListApi ? data : tableData"
      :row-key="tableParams.mutiSelectUniqueKey || ''"
      v-loading="loading"
      border
      :highlight-current-row="true"
      :stripe="true"
      @sort-change="sortChange"
      @selection-change="handleSelect"
    >
      <el-table-column
        v-if="tableParams.mutiSelectUniqueKey"
        type="selection"
        width="55"
        :reserve-selection="true"
      >
      </el-table-column>
      <el-table-column
        v-if="hasNum"
        align="center"
        width="60px"
        label="序号"
        type='index'
        :index="index=>index+(pagination.pageSize - 1) * pagination.pageCount + 1"
      ></el-table-column>
      <el-table-column
        v-for="(item, index) in tableParams.tableColumns"
        :key="index"
        :label="item.label"
        :prop="item.prop"
        :width="item.width"
        :min-width="item.minWidth"
        :align="item.align||'center'"
        :sortable="item.sortable"
      >
        <template slot-scope="scope">
          <slot
            v-if="item.addHtml"
            :name="item.addHtml"
            :scope="scope.row"
            :prop="item.prop"
            :width="item.width"
          ></slot>
          <template v-else-if="item.tagLabel">
            <el-tag
              v-if="!item.tagName"
              :type="tableParams.tag.type[scope.row[item.prop]]"
              v-text="tableParams.tag.label[scope.row[item.prop]]"
            >
            </el-tag>
            <el-tag
              v-else
              :type="tableParams[item.tagName].type[scope.row[item.prop]]"
              v-text="tableParams[item.tagName].label[scope.row[item.prop]]"
            ></el-tag>
          </template>
          <template v-else-if="item.formatter">
            <span v-text="item.formatter(scope.row)"></span>
          </template>
          <template v-else-if="getListApi">
            <p v-text="data[scope.$index][item.prop]"></p>
          </template>
          <template v-else>
            <p v-text="tableData[scope.$index][item.prop]"></p>
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
      v-if="hasPage"
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
export default {
  name: 'd2-table',
  data() {
    return {
      loading: false,
      oldValue: {},
      data: [],
      // 页码
      page: {
        pageCount: 10,
        pageSize: 1
      },
      total: 10,
      // 排序
      sortColum: '',
      sort: '',
      pagination: {},
      // 多选数组
      mutiSelectArr: {}
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
    hasPage: {
      type: Boolean,
      default: true
    },
    // 序号，默认有
    hasNum: {
      type: Boolean,
      default: true
    },
    tableParams: {
      type: Object,
      default: () => {
        return {
          // 多选-判断来自哪个页面
          // mutiSelectName: {
          //   type: String,
          //   default: ''
          // },
          // 多选-唯一标识
          // mutiSelectUniqueKey: {
          //     type: String,
          //     default: ''
          // },
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
    // searchForm: {
    //   handler(val) {
    //     const attr = Object.keys(val).find(item => val[item] !== this.oldValue[item])
    //     if (!val[attr] && this.oldValue[attr]) {
    //       this.getListApi ? this.refreshEmit() : this.$emit('refreshTable', this.page)
    //     }
    //     this.oldValue = _.cloneDeep(val)
    //   },
    //   deep: true
    // },
    // 调用其他接口，导致表格刷新-标识
    // '$store.state.d2admin.refreshtable.value'(val) {
    //   (val === 'fresh') && this.refreshEmit()
    // }
  },
  mounted() {
    const btn = document.getElementById(this.tableParams.btnId)
    btn && btn.addEventListener('click', this.refreshEmit)
    this.getListApi && this.refreshTable()
  },

  methods: {

    // 排序
    sortChange({ column, prop, order }) {
      this.sortColum = order ? prop : ''
      this.sort = order
      this.refreshTable()
    },

    // 多选
    handleSelect(val) {
      this.mutiSelectArr[this.tableParams.mutiSelectName] = val
    },

    // 清空多选
    clearMutiSelect() {
      this.mutiSelectArr[this.tableParams.mutiSelectName] = []
      this.$refs[this.tableParams.mutiSelectName + 'MutiTable'].clearSelection()
    },

    // 发布事件，以期查询条件改变后，页面图表需要刷新
    refreshEmit() {
      this.$emit('searchChange')
      this.refreshTable()
    },

    refreshTable(clearMuti = true) {
      // 清空多选
      clearMuti && this.clearMutiSelect()
      this.loading = true
      var params = {
        ...this.page,
        ...this.searchForm
      }
      if (this.sort) {
        params.sortColum = this.sortColum
        params.sort = this.sort === 'descending' ? 1 : 0
      }
      this.getListApi(params).then(res => {
        this.pagination = res.pagination ? res.pagination : this.page
        this.data = res[this.tableParams.listName]
        res.pagination && (this.total = res.pagination.totalCount)
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },

    // 页码
    handleSizeChange(value) {
      this.page.pageCount = value
      this.getListApi ? this.refreshTable(false) : this.$emit('refreshTable', this.page)
    },

    handleCurrentChange(value) {
      this.page.pageSize = value
      this.getListApi ? this.refreshTable(false) : this.$emit('refreshTable', this.page)
    }
  }
}

</script>
<style>
.a-click {
  cursor: pointer;
}
.el-table .cell {
  line-height: 14px;
}
.d2-table p {
  margin: 10px 0;
}
</style>

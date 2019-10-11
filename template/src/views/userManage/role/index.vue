<!-- 权限管理 -->
<template>
  <d2-container class="role">
    <d2-table-header title="角色列表"><auth-button category="action" label="创建角色"></auth-button></d2-table-header>
    <d2-table
      :tableParams="tableParams"
      :pagination="pagination"
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
      :editData="editData"
    ></edit-dialog>
  </d2-container>
</template>

<script>
import { RoleList, RoleDetail } from '@/api/sys.account'
// import notice from '@/common/notice'
import { mapActions } from 'vuex'
import { BaseData } from '@/common/constants'
export default {
  name: 'FimsRoles',
  components: {
    'EditDialog': () => import('./editDialog')
  },
  data() {
    return {
      getListApi: RoleList,
      // 新增/编辑弹窗
      editVisible: false,
      // 表格
      pagination: false,
      // 表格参数
      tableParams: {
        btnId: new Date().getTime() + parseInt(Math.random() * 1000),
        listName: 'roles',
        tableOption: true,
        tableColumns: Object.freeze([
          {
            label: '角色名称',
            prop: 'roleName'
          },
          {
            label: '描述',
            prop: 'description'
          },
          {
            label: '创建时间',
            prop: 'createTime'
          }
        ])
      }
    }
  },
  mounted() {
    // this.fetchData()
    this.$event.$on('e-role-dialog-close', async isReload => {
      if (isReload) {
        const { roles } = await RoleList()
        this.set({ name: BaseData.ROLE.KEY, value: roles })
      }
      this.editVisible = false
    })
  },

  methods: {
    ...mapActions('d2admin/base', ['set']),

    async handleEdit(row) {
      // this.editData = row && await RoleDetail({ roleId: row.roleId })
      this.editData = Object.assign(row, await RoleDetail({ roleId: row.roleId }))
      this.editVisible = true
    }
  }
}
</script>
<style scoped>
</style>

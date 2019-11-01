<template>
  <div class="role-tree">
    <el-tree
      :data="resources.menus"
      show-checkbox
      ref="tree"
      node-key="authId"
      :default-expand-all="true"
      :check-strictly="true"
      @check-change="treeCheckChange"
      :expand-on-click-node="true"
    >
      <span class="role-tree-node" slot-scope="{ node, data }">
        <span></span>
        <div class="role-tree-auth">
          <template v-if="data.auth">
            <el-checkbox-group size="mini" v-model="checked">
              <el-checkbox
                v-for="(btn,index) in data.auth"
                :key="index"
                :label="btn.authId"
                @change="(sta)=>btnChange(node,btn,sta)"
              ></el-checkbox>
            </el-checkbox-group>
          </template>
        </div>
      </span>
    </el-tree>
  </div>
</template>
<script>
export default {
  data() {
    return { checked: [] }
  },
  props: {
    resources: {
      type: Object,
      default: null
    },
    authIds: [],
    close: Boolean
  },
  watch: {
    close(value) {
      //   !value && this.reset();
    },
    authIds: {
      handler(value) {
        if (!value) return
        const chk = []
        const treeChk = ['101']
        this.$nextTick(() => {
          value.forEach(v => {
            v.authId += ''
            const node = this.find(v.authId)
            if (!node) return true
            const check = node.hasOwnProperty('label') ? chk : treeChk
            check.push(v.authId)
          })
          this.$refs.tree.setCheckedKeys(treeChk)
          this.checked = chk
        })
      },
      immediate: true
    }
  },
  methods: {
    treeCheckChange(node, checked, childChecked) {
      // if(node.parentId ==='0') return
      // this.checked=checked?[...this.resources.all.filter(res=> res.parentId === node.authId),...this.checked]:this.checked.filter(obj=>obj.parentId!==node.authId)
      // !checked && (this.checked = this.checked.filter(obj=>this.resources.all.find( res => res.authId === obj).parentId!==node.authId))
      // this.setCheckedNodes()
    },
    btnChange(node, data, sta) {
      const checked = sta // || this.checked.some(child => child.parentId === node.key && child.authId !== data.authId);
      checked && this.$refs.tree.setChecked(node.key, checked, true)
      // this.setCheckedNodes()
    },
    getCheckedNodes() {
      const { getCheckedKeys, getHalfCheckedKeys } = this.$refs.tree
      let checkedIds = [
        ...getCheckedKeys(),
        ...getHalfCheckedKeys(),
        ...this.checked
      ]
      checkedIds = checkedIds.map(node => {
        const { authId, parentId } = this.resources.all.find(
          res => res.authId === node
        )
        return { authId, parentId }
      })
      return checkedIds
      // this.$emit('update:authIds', checkedIds)
    },
    reset() {
      this.checked = []
      this.$refs.tree.setCheckedKeys([])
      // this.$emit('update:authIds', [])
    },
    find(authId) {
      return this.resources.all.find(res => res.authId === authId)
    }
  }
}
</script>

<style lang="scss">
.role-tree {
  padding-left: 30px;
  .role-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding: 8px;
  }
  .el-tree-node__content {
    height: 34px;
    .el-checkbox {
      margin-right: 5px;
      .el-checkbox__label {
        padding: 0;
      }
    }
  }
  &-auth {
    word-break: break-all;
    word-wrap: break-word;
    white-space: normal;
    position: absolute;
    left: 200px;
    background-color: rgba(0, 0, 0, 0.05);
    padding: 5px 0;
  }
}
</style>

<template>
  <el-table
    :data="list"
    v-bind="table">
    <el-table-column
      prop="title"
      align="center"
      width="160"/>
    <el-table-column
      label="预览"
      width="120">
      <div
        slot-scope="scope"
        class="theme-preview"
        :style="{
          backgroundImage: `url(${$baseUrl}${scope.row.preview})`
        }">
      </div>
    </el-table-column>
    <el-table-column
      prop="address"
      align="center">
      <template slot-scope="scope">
        <el-button
          v-if="activeName === scope.row.name"
          type="primary"
          icon="el-icon-check"
          class="btn-active-success"
          round>
          已激活
        </el-button>
        <el-button
          v-else
          round
          @click="handleSelectTheme(scope.row)">
          使用
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'd2-theme-list',
  data() {
    return {
      table: {
        showHeader: false,
        border: true
      }
    }
  },
  computed: {
    ...mapState('d2admin/theme', [
      'list',
      'activeName'
    ])
  },
  methods: {
    ...mapActions('d2admin/theme', [
      'set'
    ]),
    ...mapActions('d2admin/color', { setColor: 'set' }),
    handleSelectTheme(row) {
      const { name, color } = row
      this.set(name)
      this.setColor(color)
    }
  }
}
</script>

<style lang="scss" scoped>
.theme-preview {
  height: 50px;
  width: 100px;
  border-radius: 4px;
  background-size: cover;
  border: 1px solid $color-border-1;
}
</style>
<style lang="scss">
  .btn-active-success{
    &:hover{
      background-color: "#67C23A" !important;
    }
  }
</style>

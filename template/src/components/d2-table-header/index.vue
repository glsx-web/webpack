<template>
  <el-row class="table-header">
    <el-col :span="12">
      <d2-el-icon name="s-grid" />
       {{title}}
    </el-col>
    <el-col :span="12">
      <slot></slot>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'd2-teble-header',
  props: {
    title: {
      type: String,
      required: false,
      default: ''
    }
  }
}
</script>

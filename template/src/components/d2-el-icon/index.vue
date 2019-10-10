<template>
  <i :class="`el-icon-${name}`" aria-hidden="true"></i>
</template>

<script>
export default {
  name: 'd2-el-icon',
  props: {
    name: {
      type: String,
      required: false,
      default: ''
    }
  }
}
</script>

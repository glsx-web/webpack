<template>
  <el-tooltip
    effect="dark"
    :content="active ? '退出全屏' : '全屏'"
    placement="bottom">
    <el-button class="d2-mr btn-text can-hover" type="text" @click="toggle">
      <d2-el-icon v-if="active" name="aim"/>
      <d2-el-icon v-else name="full-screen" style="font-size: 16px"/>
    </el-button>
  </el-tooltip>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState('d2admin/fullscreen', [
      'active'
    ])
  },
  methods: {
    ...mapActions('d2admin/fullscreen', [
      'toggle'
    ])
  }
}
</script>

<template>
<div>

  <!-- <el-dropdown size="small" class="d2-mr">
    <span class="btn-text">{{info.name ? `你好 ${info.name}` : '未登录'}}</span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item @click.native="logOff">
        <d2-icon name="power-off" class="d2-mr-5"/>
        注销
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>-->
  <div v-popover:popover-personal class="d2-mr personal-wrap">
    <span class="btn-text">{{info && info.userName ? `${info.userName}` : '未登录'}} <d2-el-icon name="caret-bottom"/></span>
    <el-popover ref="popover-personal" placement="bottom-end" trigger="hover">
      <personal-panel :user="info"></personal-panel>
    </el-popover>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex'
import PersonalPanel from '../personal-panel'
export default {
  components: {
    PersonalPanel
  },
  mounted() {
    this.$event.$on('e-password-dialog', res => (this.passVisible = res))
  },
  computed: {
    ...mapState('d2admin/user', ['info'])
  }
}
</script>
<style lang="scss" scoped>
  .personal-wrap{
    transform: translateY(-3px);
  }
</style>

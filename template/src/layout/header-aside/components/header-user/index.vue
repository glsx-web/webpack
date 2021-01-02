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
    <span v-if="show" class="btn-text">{{info && info.userName ? `${info.userName}` : '未登录'}} <d2-el-icon name="caret-bottom"/></span>
    <el-popover ref="popover-personal" placement="bottom-end" trigger="hover">
      <personal-panel :user="info"></personal-panel>
    </el-popover>
  </div>
</div>
</template>

<script>
import { mapActions } from 'vuex'
import PersonalPanel from '../personal-panel'
export default {
  data() {
    return {
      show: true
    }
  },
  components: {
    PersonalPanel
  },
  mounted() {
    this.show = false
    this.$event.$on('e-password-dialog', res => (this.passVisible = res))
    this.getInfo()
  },
  methods: {
    ...mapActions('d2admin/user', ['load']),
    async getInfo() {
      this.info = await this.load()
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .personal-wrap{
    transform: translateY(-3px);
  }
</style>

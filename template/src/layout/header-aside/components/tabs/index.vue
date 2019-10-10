<template>
  <div class="d2-multiple-page-control-group" flex>
    <div class="d2-multiple-page-control-content" flex-box="1">
      <div class="d2-multiple-page-control-content-inner">
        <d2-contextmenu
          :visible.sync="contextmenuFlag"
          :x="contentmenuX"
          :y="contentmenuY">
          <d2-contextmenu-list
            :menulist="tagName === '/index' ? contextmenuListIndex : contextmenuList"
            @rowClick="contextmenuClick"/>
        </d2-contextmenu>
        <el-tabs
          class="d2-multiple-page-control"
          :value="current"
          type="card"
          :closable="true"
          @tab-click="handleClick"
          @edit="handleTabsEdit"
          @contextmenu.native="handleContextmenu">
          <el-tab-pane
            v-for="page in opened"
            :key="page.fullPath"
            :name="page.fullPath">
            <span slot="label"><d2-el-icon :name="page.meta.icon"/> {{page.meta&&page.meta.title}}</span>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div
      class="d2-multiple-page-control-btn"
      flex-box="0">
      <el-button-group>
        <el-button icon="el-icon-error" @click="closeAll"></el-button>
        <el-button icon="el-icon-refresh" @click="reload" :disabled="current==='/index'"></el-button>
      </el-button-group>
       <!-- <el-dropdown
        size="default"
        split-button
        @click="closeAll"
        @command="command => handleControlItemClick(command)">
        <d2-el-icon name="error"/>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="reload">
            <d2-el-icon name="refresh"/>
            刷新
          </el-dropdown-item>
         <el-dropdown-item command="left">
            <d2-el-icon name="back" class="d2-mr-10"/>
            关闭左侧
          </el-dropdown-item>
          <el-dropdown-item command="right">
            <d2-el-icon name="right" class="d2-mr-10"/>
            关闭右侧
          </el-dropdown-item>
          <el-dropdown-item command="other">
            <d2-el-icon name="circle-close" class="d2-mr-10"/>
            关闭其它
          </el-dropdown-item>
          <el-dropdown-item command="all">
            <d2-el-icon name="error" class="d2-mr-10"/>
            全部关闭
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>-->
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
const CMD_MAP = {
  'left': 'closeLeft',
  'right': 'closeRight',
  'other': 'closeOther',
  'all': 'closeAll',
  'reload': 'reload'
}
export default {
  components: {
    D2Contextmenu: () => import('../contextmenu'),
    D2ContextmenuList: () => import('../contextmenu/components/contentmenuList')
  },
  data() {
    return {
      contextmenuFlag: false,
      contentmenuX: 0,
      contentmenuY: 0,
      contextmenuListIndex: [
        { icon: 'error', title: '关闭全部', value: 'all' }
      ],
      contextmenuList: [
        { icon: 'back', title: '关闭左侧', value: 'left' },
        { icon: 'right', title: '关闭右侧', value: 'right' },
        { icon: 'circle-close', title: '关闭其它', value: 'other' },
        { icon: 'error', title: '关闭全部', value: 'all' }
      ],
      tagName: '/index'
    }
  },
  computed: {
    ...mapState('d2admin/page', [
      'opened',
      'current'
    ])
  },
  mounted() {
    this.$event.$on('e-reload', this.reload)
  },
  methods: {
    ...mapActions('d2admin/page', [
      'close',
      'closeLeft',
      'closeRight',
      'closeOther',
      'closeAll'
    ]),
    ...mapMutations('d2admin/page', ['keepAliveRemove', 'keepAlivePush']),
    /**
     * @description 右键菜单功能点击
     */
    handleContextmenu(event) {
      let target = event.target
      // 解决 https://github.com/d2-projects/d2-admin/issues/54
      let flag = false
      if (target.className.indexOf('el-tabs__item') > -1) flag = true
      else if (target.parentNode.className.indexOf('el-tabs__item') > -1) {
        target = target.parentNode
        flag = true
      }
      if (flag) {
        event.preventDefault()
        event.stopPropagation()
        this.contentmenuX = event.clientX
        this.contentmenuY = event.clientY
        this.tagName = target.getAttribute('aria-controls').slice(5)
        this.contextmenuFlag = true
      }
    },
    /**
     * @description 右键菜单的row-click事件
     */
    contextmenuClick(command) {
      this.handleControlItemClick(command, this.tagName)
    },
    /**
     * @description 接收点击关闭控制上选项的事件
     */
    handleControlItemClick(command, tagName = null) {
      if (tagName) {
        this.contextmenuFlag = false
      }
      const params = {
        pageSelect: tagName
      }
      this[CMD_MAP[command]](params)
    },
    /**
     * @description 接收点击 tab 标签的事件
     */
    handleClick(tab, event) {
      // 找到点击的页面在 tag 列表里是哪个
      const page = this.opened.find(page => page.fullPath === tab.name)
      const { name, params, query } = page
      if (page) {
        this.$router.push({ name, params, query })
      }
    },
    async reload() {
      const name = this.$router.currentRoute.name
      await this.keepAliveRemove(name)
      await this.$router.replace('/refresh')
      var __timer = setInterval(() => {
        if (this.$router.currentRoute.name === name) {
          clearInterval(__timer)
          this.keepAlivePush(name)
        }
      }, 10)
    },
    /**
     * @description 点击 tab 上的删除按钮触发这里 首页的删除按钮已经隐藏 因此这里不用判断是 index
     */
    handleTabsEdit(tagName, action) {
      if (action === 'remove') {
        this.close({
          tagName
        })
      }
    }
  }
}
</script>

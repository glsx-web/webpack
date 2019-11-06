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
            <span slot="label"><d2-el-icon :name="page.meta.icon"/> <span v-text="(page.meta && page.meta.title) || '未命名'"></span></span>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div
      class="d2-multiple-page-control-btn"
      flex-box="0">
      <el-button-group>
        <el-button icon="el-icon-error" @click="closeAll"></el-button>
        <el-tooltip class="item" effect="dark" :content="cacheTip" placement="bottom">
          <el-button :icon="kaIcon" @click="handleCache"></el-button>
        </el-tooltip>
        <el-button icon="el-icon-refresh" @click="reload" :disabled="current==='/index'"></el-button>
      </el-button-group>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
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
      'current',
      'keepAlive'
    ]),
    isCached() {
      const _curPage = this.opened.find(page => page.fullPath === this.current)
      const _cache = _curPage && _curPage.meta.cache
      return _cache
    },
    cacheTip() {
      return this.isCached ? '已缓存当前页面数据' : '不缓存当前页面数据'
    },
    kaIcon() {
      return this.isCached ? 'el-icon-star-on' : 'el-icon-star-off'
    }
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
      'closeAll',
      'keepAliveRemove',
      'keepAlivePush'
    ]),
    /**
     * @description 右键菜单功能点击
     */
    handleContextmenu(event) {
      let target = event.target
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
    handleCache() {
      this[this.isCached ? 'keepAliveRemove' : 'keepAlivePush'](this.$router.currentRoute.name)
    },
    async reload() {
      if (this.isCached) {
        const name = this.$router.currentRoute.name
        await this.keepAliveRemove(name)
        var __timer = setInterval(() => {
          if (this.$router.currentRoute.name === name) {
            clearInterval(__timer)
            this.keepAlivePush(name)
          }
        }, 10)
      }
      this.$router.replace('/refresh')
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

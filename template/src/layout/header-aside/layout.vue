<template>
  <div
    class="d2-layout-header-aside-group"
    :style="styleLayoutMainGroup"
    :class="{grayMode: grayActive}">
    <!-- 半透明遮罩 -->
    <div class="d2-layout-header-aside-mask"></div>
    <!-- 主体内容 -->
    <div class="d2-layout-header-aside-content" flex="dir:top">
      <!-- 顶栏 -->
      <div
        class="d2-theme-header"
        :style="{
          opacity: this.searchActive ? 0.5 : 1
        }"
        flex-box="0"
        flex>
        <div class="logo-group d2-theme-header-logo" :class="asideCollapse ? 'logo-only' : 'logo-all'" flex-box="0">
          <img v-if="asideCollapse" src="../../assets/icon-only.png">
          <img v-else src="../../assets/all.png">
        </div>
        <hamburger :onClick="handleToggleAside" :isActive="asideCollapse" flex-box="0" class="toggle-aside-btn"></hamburger>
        <span class="header-title">{{headerTitle}}</span>
        <d2-menu-header flex-box="1"/>
        <!-- 顶栏右侧 -->
        <div class="d2-header-right" flex-box="0">
          <d2-header-datetime />
          <!-- 如果你只想在开发环境显示这个按钮请添加 v-if="$env === 'development'" -->
          <!-- <d2-header-search @click="handleSearchClick"/> -->
          <!-- <d2-header-log v-if="$env === 'development'"/> -->
          <!-- <d2-header-size/> -->
          <d2-header-fullscreen/>
          <!-- <d2-header-locales v-if="$env === 'development'"/> -->
          <!-- <d2-header-theme/> -->
          <!-- <d2-header-color/> -->
          <d2-header-user/>
        </div>
      </div>
      <!-- 下面 主体 -->
      <div class="d2-theme-container" flex-box="1" flex>
        <!-- 主体 侧边栏 -->
        <div
          flex-box="0"
          ref="aside"
          class="d2-theme-container-aside"
          :style="{
            width: asideCollapse ? asideWidthCollapse : asideWidth,
            opacity: this.searchActive ? 0.5 : 1
          }">
          <d2-menu-side/>
        </div>
        <!-- 主体 -->
        <div class="d2-theme-container-main" :class="this.searchActive ? 'is-search' : ''"  flex-box="1" flex>
          <!-- 搜索 -->
          <transition name="fade-scale">
            <div v-if="searchActive" class="d2-theme-container-main-layer" flex>
              <d2-panel-search
                ref="panelSearch"
                @close="searchPanelClose"/>
            </div>
          </transition>
          <!-- 内容 -->
          <transition name="fade-scale">
            <div v-if="!searchActive" class="d2-theme-container-main-layer" flex="dir:top">
              <!-- tab -->
              <div class="d2-theme-container-main-header" flex-box="0">
                <d2-tabs/>
              </div>
              <!-- 页面 -->
              <div class="d2-theme-container-main-body" flex-box="1">
                <transition :name="transitionActive ? 'el-fade-in' : ''" mode="linear">
                  <keep-alive :include="keepAlive">
                    <router-view/>
                  </keep-alive>
                </transition>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import d2MenuSide from './components/menu-side'
import d2MenuHeader from './components/menu-header'
import d2Tabs from './components/tabs'
import d2HeaderFullscreen from './components/header-fullscreen'
// import d2HeaderLocales from './components/header-locales'
// import d2HeaderSearch from './components/header-search'
// import d2HeaderSize from './components/header-size'
// import d2HeaderTheme from './components/header-theme'
import d2HeaderUser from './components/header-user'
// import d2HeaderLog from './components/header-log'
// import d2HeaderColor from './components/header-color'
import hamburger from './components/hamburger'
import d2HeaderDatetime from './components/header-datetime'
import { mapState, mapGetters, mapActions } from 'vuex'
import mixinSearch from './mixins/search'
import { localRoutes } from '@/router/routes'
export default {
  name: 'd2-layout-header-aside',
  mixins: [
    mixinSearch
  ],
  components: {
    d2MenuSide,
    d2MenuHeader,
    d2Tabs,
    d2HeaderFullscreen,
    // d2HeaderLocales,
    // d2HeaderSearch,
    // d2HeaderSize,
    // d2HeaderTheme,
    d2HeaderUser,
    // d2HeaderLog,
    // d2HeaderColor,
    hamburger,
    d2HeaderDatetime
  },
  data() {
    return {
      // [侧边栏宽度] 正常状态
      asideWidth: '200px',
      // [侧边栏宽度] 折叠状态
      asideWidthCollapse: '65px',
      headerTitle: ''
    }
  },
  mounted() {
    this.routerPath = []
    Object.values(localRoutes).forEach((item, index) => {
      this.routerPath.push(item.meta)
    })
    var targetItem = this.$route.matched
    this.findTitle(targetItem[targetItem.length - 1].meta)
  },
  watch: {
    '$route.matched'(val) {
      var targetItem = val[val.length - 1].meta
      this.headerTitle = ''
      this.findTitle(targetItem)
    }
  },
  computed: {
    ...mapState('d2admin', {
      keepAlive: state => state.page.keepAlive,
      grayActive: state => state.gray.active,
      transitionActive: state => state.transition.active,
      asideCollapse: state => state.menu.asideCollapse
    }),
    ...mapGetters('d2admin', {
      themeActiveSetting: 'theme/activeSetting'
    }),
    /**
     * @description 最外层容器的背景图片样式
     */
    styleLayoutMainGroup() {
      return {
        ...this.themeActiveSetting.backgroundImage ? {
          backgroundImage: `url('${this.$baseUrl}${this.themeActiveSetting.backgroundImage}')`
        } : {}
      }
    }
  },
  methods: {
    ...mapActions('d2admin/menu', [
      'asideCollapseToggle'
    ]),
    /**
     * 接收点击切换侧边栏的按钮
     */
    handleToggleAside() {
      this.asideCollapseToggle()
    },
    findTitle(val) {
      this.headerTitle = val.title + (this.headerTitle ? ' / ' : '') + this.headerTitle
      if (+val.parentId !== 0) {
        return this.findTitle(this.routerPath.find(item => item.authId === val.parentId))
      }
    }
  }
}
</script>

<style lang="scss">
// 注册主题
@import '~@/assets/style/theme/register.scss';
@keyframes lightflow {
  90% {
    left: -300px; /*起始位置*/
  }
  100% {
    left: 300px; /*结束位置*/
  }
}
.logo-all{
  width: 200px;
  img{
    width: 188px;
    height: 34px !important;
    // height: 75px !important;
    transform: translate3d(0, 20px, 0) !important;
  }
}
.logo-only{
  width:65px;
  img{
    width: 32px;
    height: 34px !important;
    // height: 35px !important;
    transform: translate3d(0,16px,0) !important;
  }
}
.header-title {
  line-height: 60px;
  color: #606266;
  margin-left: 20px;
}
</style>

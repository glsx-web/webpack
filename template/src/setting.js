export default {
  // 快捷键
  // 支持快捷键 例如 ctrl+shift+s
  hotkey: {
    search: {
      open: 's',
      close: 'esc'
    }
  },
  // 侧边栏默认折叠状态
  menu: {
    asideCollapse: false
  },
  // 在读取持久化数据失败时默认页面
  page: {
    opened: [
      {
        name: 'index',
        fullPath: '/index',
        meta: {
          title: '首页',
          auth: false
        }
      }
    ]
  },
  // 菜单搜索
  search: {
    enable: true
  },
  // 注册的主题
  theme: {
    list: [
      {
        title: 'classic',
        name: 'classic',
        color: '#2A58AD',
        preview: 'image/theme/classic/preview@2x.png'
      },
      {
        title: 'dark',
        name: 'dark',
        color: '#314256',
        preview: 'image/theme/dark/preview@2x.png'
      },
      {
        title: 'blue',
        name: 'blue',
        color: '#652DED',
        preview: 'image/theme/blue/preview@2x.png'
      },
      {
        title: 'plane',
        name: 'plane',
        color: '#377DE7',
        backgroundImage: 'image/theme/plane/bg.jpg',
        preview: 'image/theme/plane/preview@2x.png'
      }
      // {
      //   title: 'd2admin 经典',
      //   name: 'd2',
      //   preview: 'image/theme/d2/preview@2x.png'
      // },
      // {
      //   title: '紫罗兰',
      //   name: 'violet',
      //   preview: 'image/theme/violet/preview@2x.png'
      // },
      // {
      //   title: '简约线条',
      //   name: 'line',
      //   backgroundImage: 'image/theme/line/bg.jpg',
      //   preview: 'image/theme/line/preview@2x.png'
      // },
      // {
      //   title: '流星',
      //   name: 'star',
      //   backgroundImage: 'image/theme/star/bg.jpg',
      //   preview: 'image/theme/star/preview@2x.png'
      // },
      // {
      //   title: 'Tomorrow Night Blue (vsCode)',
      //   name: 'tomorrow-night-blue',
      //   preview: 'image/theme/tomorrow-night-blue/preview@2x.png'
      // }
    ]
  },
  // 是否默认开启页面切换动画
  transition: {
    active: true
  }
}

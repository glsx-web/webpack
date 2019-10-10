<template>
  <d2-container>
    <template slot="header">Page 1 header</template>
    Hello World
    <el-button>sssssssssssssssssss</el-button>
        <!--默认插槽、无名插槽-->
        <p>测试在render渲染函数中插槽的使用</p>
        <slot name="aaaa"></slot>
  </d2-container>
</template>

<script>
export default {
  name: 'page1',
  render: function(createElement) {
    return createElement('div', { attrs: { class: 'd2-layout-header-aside-menu-side' }
    }, [
      createElement('el-menu', {
        props: { collapse: this.asideCollapse, uniqueOpened: true, defaultActive: this.active },
        ref: 'menu',
        on: { select: this.handleMenuSelect }
      }),
      ...this.aside.length === 0 && !this.asideCollapse ? [
        createElement('div', { attrs: { class: 'd2-layout-header-aside-menu-empty', flex: 'dir:top main:center cross:center' } }, [
          createElement('d2-icon', { props: { name: 'inbox' } }),
          createElement('span', {}, '没有侧栏菜单')
        ])
      ] : []
    ])
  }
}
</script>

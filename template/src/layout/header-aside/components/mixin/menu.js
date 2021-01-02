/*
 * @Descripttion:
 * @version:
 * @Author: limin
 * @Date: 2020-12-23 17:06:59
 * @LastEditors: limin
 * @LastEditTime: 2020-12-24 10:07:54
 */
export default {
  methods: {
    handleMenuSelect(index, indexPath) {
      if (/^d2-menu-empty-\d+$/.test(index) || index === undefined) {
        this.$message.warning('临时菜单')
      } else if (/^https:\/\/|http:\/\//.test(index)) {
        this.$open(index)
      } else {
        this.$router.push({
          path: index
        })
      }
    }
  }
}

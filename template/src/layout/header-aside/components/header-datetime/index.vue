<template>
  <div class="header-datetime"></div>
</template>

<script>
import dayjs from 'dayjs'
const sFormat = 'YYYY年MM月DD日'
const WEEK = ['天', '一', '二', '三', '四', '五', '六']
export default {
  name: 'd2-header-datetime',
  data() {
    return {
      timeInterval: null,
      time: `${dayjs().format(sFormat)} 星期${WEEK[dayjs().day()]} `
    }
  }
}
</script>
<style lang="scss">
.header-datetime{
  font-size: 12px;
  transform: translateX(-10px);
}
</style>

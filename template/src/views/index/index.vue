<!-- 首页 -->
<template>
  <d2-container class="indexPage">
    <div class="echarts">
      <el-row>
        <el-col :span="24">
          <div
            id="totalEcharts"
            style="width: 100%; height: 400px;"
          ></div>
        </el-col>
      </el-row>
    </div>
  </d2-container>
</template>

<script>
import { reportApi } from '@api/systemMonitor'
import notice from '@/common/notice'
export default {
  name: 'index',
  data() {
    return {
      radio: '全部',
      // 绘图
      totalECharts: '',
      totalOptions: {
        title: [{
          text: '标题',
          x: '49.5%',
          y: '8%',
          textAlign: 'center'
        }],
        tooltip: {},
        series: [{
          name: '在网情况',
          type: 'pie',
          radius: ['35%', '55%'],
          label: {
            normal: {
              fontSize: 16,
              formatter: '{b}: {c}'
            }
          },
          data: [{
            name: '在网',
            value: 0,
            itemStyle: {
              color: '#00b639'
            }
          }, {
            name: '离网',
            value: 0,
            itemStyle: {
              color: '#999999'
            }
          }]
        }]
      }
    }
  },

  mounted() {
    this.$echarts = echarts
    this.totalECharts = this.$echarts.init(document.getElementById('totalEcharts'))
    this.getPie()
  },

  methods: {

    getPie(label = '') {
      const params = {
        subsystemTypeCode: label ? this.baseData.subsys.find(item => item.confValue === label).confCode : ''
      }
      reportApi(params).then(res => {
        this.drawPie(res)
      }).catch(() => {
        notice.errorTips()
      })
    },
    /* 接口请求-end */
    // onlineNum 在网数量
    // offlineNum 离网数量
    // normalNum 正常数量
    // breakdownNum 故障数量
    drawPie(params) {
      const item = this.totalOptions.series[0]
      item.data[0].value = params.onlineNum ? params.onlineNum : 0
      item.data[1].value = params.offlineNum ? params.offlineNum : 0

      this.totalECharts.setOption(this.totalOptions)
    }
  }
}

</script>
<style>
</style>

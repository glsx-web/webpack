<!-- 首页 -->
<template>
  <d2-container class="indexPage">
    <div class="echarts">
      <el-row>
        <el-col :span="24">
          <span style="margin-right: 20px;color:#909399"><d2-el-icon name="s-data"/> 类型</span>
          <el-radio-group v-model="radio" @change="getPie">
            <el-radio-button
              v-for="(item, index) in baseData.subsys"
              :key="index"
              :value="item.confCode"
              :label="item.confValue"
            >
            </el-radio-button>
          </el-radio-group>
        </el-col>
        <el-col :span="24">
          <div id="totalEcharts" style="width: 100%; height: 400px;"></div>
        </el-col>
      </el-row>
    </div>
  </d2-container>
</template>

<script>
import { reportApi } from '@api/systemMonitor'
import notice from '@/common/notice'
import { mapActions } from 'vuex'
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
            // selected: true
          }]
        }]
      },
      baseData: {
        station: [],
        subsys: []
      }
    }
  },

  mounted() {
    this.$echarts = echarts
    this.loadBaseData()
    this.totalECharts = this.$echarts.init(document.getElementById('totalEcharts'))
    this.getPie()
  },

  methods: {
    ...mapActions('d2admin/base', ['load']),

    async loadBaseData() {
      /**
       * 全局方法-获取公共参数
       */
      const { station, subsys } = await this.load()
      this.baseData.station = _.cloneDeep(station)
      this.baseData.subsys = _.cloneDeep(subsys)
      this.baseData.subsys.unshift({ confCode: '', confValue: '全部' })
    },

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
    // handleEdit() {
    // exportApi(this.searchForm).then(res => {
    //   this.$open(res.url)
    //   notice.okTips()
    // }).catch(() => {
    //   notice.errorTips()
    // })
    // }
    /* 接口请求-end */
    // onlineNum 在网数量
    // offlineNum 离网数量
    // normalNum 正常数量
    // breakdownNum 故障数量
    drawPie(params) {
      let item = this.totalOptions.series[0]
      item.data[0].value = params.onlineNum ? params.onlineNum : 0
      item.data[1].value = params.offlineNum ? params.offlineNum : 0

      this.totalECharts.setOption(this.totalOptions)
    }
  }
}

</script>
<style>
</style>

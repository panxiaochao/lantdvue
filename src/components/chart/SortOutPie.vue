<template>
<div class="echarts-box">
  <div :id="id" :style="{height:height, width:width}" :data="data" ref="myEchart"></div>
</div>
</template>

<script>
import echarts from "echarts";
import 'echarts/theme/macarons.js'
export default {
  name: "SortOutPie",
  props: {
    id: {
      type: String,
      required: true
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "350px"
    },
    data: {
      type: Array
    }
  },
  data() {
    return {
      chart: null
    };
  },
  mounted() {
    this.initChart();
  },
  beforeDestroy() {
    //console.log("beforeDestroy");
    if (!this.chart) {
      return;
    }
    // 注销实例
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      const that = this
      that.chart = echarts.init(this.$refs.myEchart, 'macarons');
      const legendData = []
      for (let i = 0; i < this.data.length; i++) {
        legendData.push(this.data[i].name)
      }
      const option = {
        tooltip: {
          trigger: 'item',
          confine: true,
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          x: 'center',
          data: legendData
        },
        series: [{
          name: '资金账户',
          type: 'pie',
          minAngle: 15,
          minShowLabelAngle: 15,
          radius: '45%',
          center: ['50%', '50%'],
          data: this.data,
          label: {
            fontSize: '14'
          },
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      }
      // 把配置和数据放这里
      that.chart.setOption(option);
      window.onresize = () => {
        that.chart.resize()
      }
    }
  }
};
</script>

<style>

</style>

<template>
<div class="echarts-box">
  <div :id="id" :style="{height:height, width:width}" :data="data" ref="myEchart"></div>
</div>
</template>

<script>
import echarts from "echarts";
import 'echarts/theme/macarons.js'
export default {
  name: "Salarybar",
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
      type: Object
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
      const option = {
        title: {
          text: '账户资金类别',
          textStyle: {
            fontSize: 16
          },
          top: '10px',
          x: 'center'
        },
        grid: {
          //top: '10%',
          left: '3%',
          right: '3%',
          bottom: '3%',
          containLabel: true
        },
        tooltip: {
          axisPointer: {
            type: 'cross'
          },
          formatter: '{b}：{c} 元'
        },
        xAxis: {
          type: 'category',
          axisTick: {
            alignWithLabel: true
          },
          axisLabel: {
            interval: 0,
            rotate: 20
          },
          data: this.data.xAxis
        },
        yAxis: {
          type: 'value',
          name: '单位：元'
        },
        series: [{
          name: '账户资金类别',
          data: this.data.data,
          type: 'bar',
          barWidth: '30'
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

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
      this.chart = echarts.init(this.$refs.myEchart, 'macarons');
      const option = {
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series: [{
          name: '访问来源',
          type: 'pie',
          radius: '70%',
          center: ['50%', '50%'],
          data: this.data,
          label: {
            fontSize: '16'
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
      this.chart.setOption(option);
    }
  }
};
</script>

<style>

</style>

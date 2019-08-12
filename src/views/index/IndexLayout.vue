<template>
<div class="index">
  <a-row :gutter="24" class="card-row">
    <a-col :md="24">
      <a-card :loading="salarychart.loading" :bordered="false">
        <template v-slot:title>
          <div class="card-cus-title">
            <div>账户总览</div>
            <div class="salarysumtext"></div>
          </div>
        </template>
        <a-row>
          <a-col :md="16">
            <Salarybar id="salarybar" height="400px" :data="salarychart.data" />
          </a-col>
          <a-col :md="8">
            <rank-list title="账户排行榜" :list="salarychart.rankList" />
          </a-col>
        </a-row>
      </a-card>
    </a-col>
  </a-row>
  <a-row :gutter="24" class="card-row">
    <a-col :md="12">
      <a-card title="3月支出类别占比" :loading="sortoutpie.loading" :bordered="false">
        <SortOutPie id="sortoutpie" :data="sortoutpie.data" />
      </a-card>
    </a-col>
    <a-col :md="12">
      <a-card title="3月收入排行" :loading="sortinpie.loading" :bordered="false">
        <SortOutPie id="sortinpie" :data="sortinpie.data" />
      </a-card>
    </a-col>
  </a-row>
</div>
</template>
<script>
import {
  getBankValueList
} from '@/api/fundbank'

import {
  getSortGroupBy
} from '@/api/fundsalary'

import RankList from '@/components/index/RankList'
import Salarybar from '@/components/chart/Salarybar'
import SortOutPie from '@/components/chart/SortOutPie'
import SortInPie from '@/components/chart/SortInPie'

export default {
  components: {
    RankList,
    Salarybar,
    SortOutPie,
    SortInPie
  },
  data() {
    return {
      salarychart: {
        loading: true,
        data: [],
        rankList: [],
        salarysum: 0
      },
      sortoutpie: {
        loading: true,
        data: [],
      },
      sortinpie: {
        loading: true,
        data: [],
      }
    }
  },
  // 页面初始化
  mounted() {
    this.salarychartinit();
    this.sortoutpieinit();
    this.sortinpieinit();
  },
  methods: {
    salarychartinit() {
      const that = this
      const rankList = []
      const salarychartObj = {
        xAxis: [],
        data: []
      }
      getBankValueList()
        .then(data => {
          var arr = JSON.parse(data)
          //  console.log(arr)
          for (let i = 0; i < arr.length; i++) {
            rankList.push({
              name: arr[i].name,
              total: arr[i].value
            })
            salarychartObj.xAxis.push(arr[i].name)
            salarychartObj.data.push(arr[i].value)
          }
          that.salarychart.rankList = rankList
          that.salarychart.data = salarychartObj
          setTimeout(function() {
            that.salarychart.loading = false
          }, 200)
        }).catch(error => {
          //message.error(error.message)
          that.salarychart.loading = false
        })
    },
    sortoutpieinit() {
      const that = this
      getSortGroupBy({
          tradetype: 'out'
        })
        .then(data => {
          var arr = JSON.parse(data)
          //console.log(arr)
          that.sortoutpie.data = arr
          setTimeout(function() {
            that.sortoutpie.loading = false
          }, 200)
        }).catch(error => {
          //message.error(error.message)
          that.sortoutpie.loading = false
        })
    },
    sortinpieinit() {
      const that = this
      getSortGroupBy({
          tradetype: 'in'
        })
        .then(data => {
          var arr = JSON.parse(data)
          //  console.log(arr)
          that.sortinpie.data = arr
          setTimeout(function() {
            that.sortinpie.loading = false
          }, 200)
        }).catch(error => {
          //message.error(error.message)
          that.sortinpie.loading = false
        })
    }
  }
}
</script>

<style scoped>
.card-row {
  margin-right: 0 !important;
  margin-left: 0 !important;
  margin-bottom: 15px;
}

.ant-card-head-title .card-cus-title {
  display: flex;
  justify-content: space-between;
}

.ant-card-head-title .card-cus-title>.salarysumtext>span {
  color: #F44336;
  font-weight: 600;
}
</style>

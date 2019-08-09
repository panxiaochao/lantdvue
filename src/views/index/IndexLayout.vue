<template>
<div class="index">
  <a-row :gutter="24" class="card-row">
    <a-col :md="24">
      <a-card :loading="salarychart.loading" :bordered="false">
        <template v-slot:title>
          <div class="card-cus-title">
            <div>账户总览</div>
            <div class="salarysumtext">资金总额：<span> 元</span>
            </div>
          </div>
        </template>
        <a-row>
          <a-col :md="16">
            <Salarybar id="salarybar" :data="salarychart.data" />
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
      <a-card title="3月支出类别占比" loading :bordered="false">
        <p>card content</p>
      </a-card>
    </a-col>
    <a-col :md="12">
      <a-card title="3月收入排行" :bordered="false">
        <p>card content</p>
      </a-card>
    </a-col>
  </a-row>
  <a-row :gutter="24" class="card-row">
    <a-col :md="12">
      <a-card title="支出统计" :bordered="false">
        <p>card content</p>
      </a-card>
    </a-col>
    <a-col :md="12">
      <a-card title="收入统计" :bordered="false">
        <p>card content</p>
      </a-card>
    </a-col>
  </a-row>
</div>
</template>
<script>
import {
  getBankValueList
} from '@/api/fundbank'

import RankList from '@/components/index/RankList'
import Salarybar from '@/components/chart/Salarybar'

export default {
  components: {
    RankList,
    Salarybar
  },
  data() {
    return {
      salarychart: {
        loading: true,
        data: [],
        rankList: [],
        salarysum: 0
      }
    }
  },
  mounted() {
    // 页面初始化
    this.salarychartinit();
  },
  methods: {
    salarychartinit() {
      const that = this
      const rankList = []
      getBankValueList()
        .then(data => {
          var arr = JSON.parse(data)
          console.log(arr)
          that.salarychart.data = arr
          for (let i = 0; i < arr.length; i++) {
            rankList.push({
              name: arr[i].name,
              total: arr[i].value
            })
          }
          that.salarychart.rankList = rankList
          setTimeout(function() {
            that.salarychart.loading = false
          }, 200)
        }).catch(error => {
          //message.error(error.message)
          that.salarychart.loading = false
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

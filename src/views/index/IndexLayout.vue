<template>
<div class="index">
  <a-row :gutter="24" class="card-row">
    <a-col :md="24">
      <a-card title="账户总览" :loading="salarychart.loading" :bordered="false">
        <a-row>
          <a-col :md="16">
            <Salarybar id="salarybar" :data="salarychart.data" />
          </a-col>
          <a-col :md="8">
            <rank-list title="金额排行榜" :list="salarychart.rankList" />
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
        rankList: []
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
      const data = [{
          value: 335,
          name: '直接访问'
        },
        {
          value: 310,
          name: '邮件营销'
        },
        {
          value: 234,
          name: '联盟广告'
        },
        {
          value: 135,
          name: '视频广告'
        },
        {
          value: 1548,
          name: '搜索引擎'
        }
      ]
      that.salarychart.data = data
      //
      const rankList = []
      for (let i = 0; i < 7; i++) {
        rankList.push({
          name: '工商银行 ' + (i + 1) + ' 号店',
          total: 1234.56 - i * 100
        })
      }
      that.salarychart.rankList = rankList
      //
      setTimeout(function() {
        that.salarychart.loading = false
      }, 500)
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
</style>

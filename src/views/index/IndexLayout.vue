<template>
<div class="index">
  <a-row :gutter="24" class="card-row">
    <a-col :span="12">
      <a-card title="3月支出类别占比" :bordered="false">
        <p>card content</p>
      </a-card>
    </a-col>
    <a-col :span="12">
      <a-card title="3月收入排行" :bordered="false">
        <p>card content</p>
      </a-card>
    </a-col>
  </a-row>
  <a-row :gutter="24" class="card-row">
    <a-col :span="12">
      <a-card title="支出统计" :bordered="false">
        <p>card content</p>
      </a-card>
    </a-col>
    <a-col :span="12">
      <a-card title="收入统计" :bordered="false">
        <p>card content</p>
      </a-card>
    </a-col>
  </a-row>
</div>
</template>
<script>


</script>

<style scoped>
.card-row {
  margin-right: 0 !important;
  margin-left: 0 !important;
  margin-bottom: 15px;
}
</style>

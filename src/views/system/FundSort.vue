<template>
<div class="fundsort">
  <a-row class="tools">
    <a-button type="primary" @click="showModal">新 增</a-button>
  </a-row>
  <a-table :columns="columns" :dataSource="data" bordered :pagination="false" size="middle" />
  <a-modal title="新增" :maskClosable="false" v-model="visible" @ok="handleOk">
    <a-form :form="form">
      <a-form-item label="Note" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <a-input />
      </a-form-item>
    </a-form>
  </a-modal>
</div>
</template>
<script>
const columns = [{
  title: '类别名',
  dataIndex: 'name',
  key: 'name',
}, {
  title: '排序',
  dataIndex: 'age',
  key: 'age',
  width: '12%',
}, {
  title: '状态',
  dataIndex: 'address',
  key: 'address',
}];

export default {
  name: 'FundSort',
  data() {
    return {
      data: this.$store.state.fundSortList,
      columns,
      visible: false,
      form: this.$form.createForm(this)
    }
  },
  methods: {
    showModal() {
      this.visible = true
    },
    handleOk(e) {
      console.log(e);
      this.visible = false
    },
  },
  computed: {

  }
}
</script>
<style scoped>
.fundsort {
  padding: 15px;
}

.tools {
  margin-bottom: 10px;
  text-align: right;
  border-bottom: 1px solid #ebeef5;
  padding-bottom: 10px;
}
</style>

<template>
<div class="fundsort">
  <a-row class="tools">
    <a-button type="primary" @click="showModal">新 增</a-button>
  </a-row>
  <a-table :columns="columns" :dataSource="data" bordered size="middle">
    <template slot="operation" slot-scope="text, record">
      <span>
        <a-button type="primary" size="small">编辑</a-button>
        <a-divider type="vertical" />
        <a-button type="danger" size="small">删除</a-button>
      </span>
    </template>
  </a-table>
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
  dataIndex: 'sortname',
  key: 'sortname'
}, {
  title: '类型',
  dataIndex: 'sorttype',
  key: 'sorttype'
}, {
  title: '操作',
  dataIndex: 'operation',
  key: 'operation',
  scopedSlots: {
    customRender: 'operation'
  },
  width: '40%'
}];

export default {
  name: 'FundSort',
  data() {
    return {
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
    }
  },
  computed: {
    data() {
      return this.$store.state.fundsort.data
    }
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

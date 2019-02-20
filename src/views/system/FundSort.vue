<template>
<div class="fundsort">
  <a-row class="tools">
    <a-button type="primary" @click="showModal">新 增</a-button>
  </a-row>
  <a-table :columns="columns" :dataSource="data" bordered :pagination="false" size="middle" :defaultExpandAllRows="true" :loading="{tip:'数据加载中......'}" />
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
import FundBankAdd from './FundBankAdd'
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

const data = [{
  key: 1,
  name: '出入规则',
  age: 60,
  address: 'New York No. 1 Lake Park',
  children: [{
    key: 11,
    name: 'John Brown',
    age: 42,
    address: 'New York No. 2 Lake Park',
  }, {
    key: 12,
    name: 'John Brown jr.',
    age: 30,
    address: 'New York No. 3 Lake Park',
    children: [{
      key: 121,
      name: 'Jimmy Brown',
      age: 16,
      address: 'New York No. 3 Lake Park',
    }],
  }, {
    key: 13,
    name: 'Jim Green sr.',
    age: 72,
    address: 'London No. 1 Lake Park',
    children: [{
      key: 131,
      name: 'Jim Green',
      age: 42,
      address: 'London No. 2 Lake Park',
      children: [{
        key: 1311,
        name: 'Jim Green jr.',
        age: 25,
        address: 'London No. 3 Lake Park',
      }, {
        key: 1312,
        name: 'Jimmy Green sr.',
        age: 18,
        address: 'London No. 4 Lake Park',
      }],
    }],
  }],
}, {
  key: 2,
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
}];

export default {
  name: 'FundSort',
  data() {
    return {
      data,
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

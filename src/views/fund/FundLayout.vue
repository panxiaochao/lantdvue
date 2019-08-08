<template>
<a-layout :style="alheight">
  <a-layout-sider theme="light" width="230px">
    <bank-nav :super-this="superthis" />
  </a-layout-sider>
  <a-layout-content>
    <div class="fundtable">
      <a-row class="tools">
        <Add :super-this="superthis" :params="params" is-add />
      </a-row>
      <a-table :columns="columns" :dataSource="tableData" bordered size="middle" rowKey="id" :loading="loading" :pagination="pagination" @change="onPaginationChange">
        <span slot="income" slot-scope="income" style="color:#F44336;">
          <b>{{income}}</b>
        </span>
        <span slot="pay" slot-scope="pay" style="color:#4caf50;">
          <b>{{pay}}</b>
        </span>
        <span slot="balance" slot-scope="balance" style="color:#6D4C41;">
          <b>{{balance}}</b>
        </span>
        <template slot="operation" slot-scope="text, record">
          <span>
            <Deatils :data="record" />
            <a-divider type="vertical" />
            <a-popconfirm title="确认删除此条，并且还原数据？" @confirm="() => onDelete(record.id)">
              <a href="javascript:;">删 除</a>
            </a-popconfirm>
          </span>
        </template>
      </a-table>
    </div>
  </a-layout-content>
</a-layout>
</template>
<script>
import {
  getListSalaryTable,
  deleteById
} from '@/api/fundsalary'

import BankNav from './BankNav'
import Add from './modules/Add'
import Edit from './modules/Edit'
import Deatils from './modules/Deatils'

const columns = [{
  title: '支付方式',
  dataIndex: 'bankname',
  key: 'bankname'
}, {
  title: '交易时间',
  dataIndex: 'tradetimeStr',
  key: 'tradetime'
}, {
  title: '收入(元)',
  dataIndex: 'income',
  key: 'income',
  scopedSlots: {
    customRender: 'income'
  }
}, {
  title: '支出(元)',
  dataIndex: 'pay',
  key: 'pay',
  scopedSlots: {
    customRender: 'pay'
  }
}, {
  title: '账户余额(元)',
  dataIndex: 'balance',
  key: 'balance',
  scopedSlots: {
    customRender: 'balance'
  }
}, {
  title: '操作',
  dataIndex: 'operation',
  key: 'operation',
  scopedSlots: {
    customRender: 'operation'
  },
  align: 'center',
  width: '120px'
}];

export default {
  name: 'FundLayout',
  components: {
    BankNav,
    Add,
    Edit,
    Deatils
  },
  data() {
    return {
      alheight: {
        height: '100%'
      },
      tableData: [],
      pagination: {
        current: 1,
        pageSize: 8,
        total: 0
      },
      columns,
      loading: {
        spinning: false,
        tip: '数据加载中......'
      },
      superthis: this,
      isAdd: true, // 默认新增
      params: {
        bankid: '',
        bankname: ''
      }
    }
  },
  created: function() {
    // `this` 指向 vm 实例
    const that = this;
    //console.log(that.$children);
    var h = document.documentElement.clientHeight || document.body.clientHeight;
    //that.alheight.height = h + 'px';
    //console.log(h)
  },
  methods: {
    onPaginationChange(page, pageSize) {
      //console.log(page)
      //console.log(pageSize)
      this.loadTable(page.current)
    },
    // 加载table数据
    loadTable(current) {
      current = current || 1
      this.loading.spinning = true
      const params = this.params
      params.pageNumber = current
      params.pageSize = this.pagination.pageSize
      //
      getListSalaryTable(params)
        .then(data => {
          var arr = JSON.parse(data)
          //console.log(arr)
          this.tableData = arr.list
          this.pagination.total = arr.total
          this.pagination.current = current
          this.loading.spinning = false
        }).catch(error => {
          //message.error(error.message)
          this.loading.spinning = false
        })
    },
    // 新增table数据
    addBank() {
      //已采用组件方式
    },
    // 删除table数据
    onDelete(key) {
      const that = this
      this.loading.spinning = true
      deleteById({
          id: key
        })
        .then(data => {
          var res = JSON.parse(data)
          if (!res.success) {
            that.$message.error(res.errorMsg, 1)
          } else {
            that.loadTable(1)
          }
          this.loading.spinning = false
        }).catch(error => {
          this.loading.spinning = false
        })
    }

  }
}
</script>
<style lang="scss" scoped>
.ant-layout-sider {
    overflow: auto;
    border-right: 1px solid #ebeef5;
}

.ant-layout-sider {
    .banknav {
        padding: 15px;
    }

}

.ant-layout-content {
    background-color: #fff;
    .fundtable {
        padding: 15px;
        .tools {
            margin-bottom: 10px;
            text-align: right;
            border-bottom: 1px solid #ebeef5;
            padding-bottom: 10px;
        }
    }
}
</style>

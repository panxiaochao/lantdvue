<template>
<a-layout :style="alheight">
  <a-layout-sider theme="light" width="250px">
    <div class="banknav">
      <h3>银行卡类别管理</h3>
      <a-tree :loadData="onLoadNav" :treeData="treeData" @select="onSelect" />
    </div>
  </a-layout-sider>
  <a-layout-content>
    <div class="fundbank">
      <a-row class="tools">
        <Add :super-this="superthis" :params="params" is-add />
      </a-row>
      <a-table :columns="columns" :dataSource="tableData" bordered size="middle" :loading="loading">
        <template slot="operation" slot-scope="text, record">
          <span>
            <Edit :super-this="superthis" :data="record" :params="params" :is-add="false" />
            <a-divider type="vertical" />
            <a-popconfirm title="确认删除此条吗？" @confirm="() => onDelete(record.key)">
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
  getListBankTree,
  getListBankTable,
  deleteById
} from '@/api/fundbank'

import Add from './modules/Add'
import Edit from './modules/Edit'

const columns = [{
  title: '银行卡',
  dataIndex: 'bankname',
  key: 'bankname',
  width: '250px'
}, {
  title: '类别',
  dataIndex: 'bankflag',
  key: 'bankflag'
}, {
  title: '编码',
  dataIndex: 'banktype',
  key: 'banktype'
}, {
  title: '操作',
  dataIndex: 'operation',
  key: 'operation',
  scopedSlots: {
    customRender: 'operation'
  },
  width: '30%'
}];

export default {
  name: 'FundBankLayout',
  components: {
    Add,
    Edit
  },
  data() {
    return {
      alheight: {
        height: '100%'
      },
      treeData: [{
        title: '银行卡类别',
        key: 'root',
        banktype: 'root'
      }],
      tableData: [],
      columns,
      loading: {
        spinning: false,
        tip: '数据加载中......'
      },
      superthis: this,
      isAdd: true, // 默认新增
      params: {
        parentid: ''
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
  beforeRouteLeave(to, from, next) {
    // 导航离开该组件的对应路由时调用
    next()
  },
  methods: {
    // nav 选择事件
    onSelect(selectedKeys, e) {
      console.log(e)
      if (e.selected) {
        this.params.parentid = selectedKeys[0]
        this.loadTable(selectedKeys[0])
      }
    },
    // 异步加载nav数据
    onLoadNav(treeNode) {
      //console.log("onLoadData")
      //this.treeNode = treeNode
      return new Promise((resolve) => {
        getListBankTree({
            parentid: treeNode.dataRef.key
          })
          .then(data => {
            let treedata = JSON.parse(data)
            treeNode.dataRef.children = treedata
            this.treeData = [...this.treeData]
            resolve()
          }).catch(error => {
            //console.log(error)
            //this.$message.error(error.message)
            resolve()
            return
          })
      })
    },
    // 重新加载nav
    reloadNav() {
      //console.log("reloadNav")

    },
    // 加载table数据
    loadTable(key) {
      key = key || ''
      this.loading.spinning = true
      getListBankTable({
          parentid: key
        })
        .then(data => {
          //  console.log(data)
          var arr = JSON.parse(data)
          this.tableData = arr
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
    // 编辑table数据
    editTable() {
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
            that.loadTable(this.params.parentid)
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
}

.fundbank {
    padding: 15px;
}

.tools {
    margin-bottom: 10px;
    text-align: right;
    border-bottom: 1px solid #ebeef5;
    padding-bottom: 10px;
}
</style>

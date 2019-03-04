<template>
<div class="fundsort">
  <a-row class="tools">
    <a-button type="primary" @click="add">新 增</a-button>
  </a-row>
  <a-table :columns="columns" :dataSource="tabledata" bordered size="middle">
    <template slot="operation" slot-scope="text, record">
      <span>
        <a href="javascript:void(0);" @click="edit(record.key)">编辑</a>
        <a-divider type="vertical" />
        <a-popconfirm title="确认删除此条吗？" @confirm="() => onDelete(record.key)">
          <a href="javascript:;">Delete</a>
        </a-popconfirm>
      </span>
    </template>
  </a-table>
  <fund-sort-add :visible="visible" :sortid="sortid" :sorttype="sorttype" :sortname="sortname" :title="title" ref="collectionForm" @cancel="handleCancel" @create="handleOk" />
</div>
</template>
<script>
import FundSortAdd from './FundSortAdd'
//
import {
  addOrupdate,
  getListSortTable,
  deleteById,
  getSort
} from '@/api/fundsort'
//
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
  components: {
    FundSortAdd
  },
  data() {
    return {
      columns,
      visible: false,
      sorttype: '',
      sortname: '',
      title: '',
      sortid: ''
      //form: this.$form.createForm(this)
    }
  },
  methods: {
    add() {
      const that = this
      that.sorttype = this.$store.getters.treeNode.sorttype
      that.title = this.$store.getters.treeNode.title
      that.sortid = ''
      that.sortname = ''
      that.visible = true
    },
    edit(key) {
      const that = this
      getSort({
          id: key
        })
        .then(data => {
          var res = JSON.parse(data)
          console.log(res)
          that.sorttype = res.sorttype
          that.sortname = res.sortname
          that.title = this.$store.getters.treeNode.title
          that.sortid = res.id
          that.visible = true
        })
    },
    handleCancel() {
      this.visible = false
    },
    handleOk() {
      //this.visible = false
      const form = this.$refs.collectionForm.form;
      const that = this
      // 提前更新nav=false
      this.$store.dispatch('reloadnav', false)
      form.validateFields((err, values) => {
        if (!err) {
          values.parentid = this.$store.getters.treeNode.key
          if (typeof(values.parentid) === "undefined" || values.parentid === '') {
            that.$message.error("请点击节点操作！", 0.5)
            return
          }
          console.log(values);
          addOrupdate(values)
            .then(data => {
              var res = JSON.parse(data)
              if (!res.success) {
                that.$message.error(res.errorMsg)
              } else {
                // 更新树节点
                this.$store.dispatch('reloadnav', true)
                // 更新table表格
                that.reload()
                // 关闭弹窗
                that.visible = false
                // 重置表单
                form.resetFields()
              }
            }).catch(error => {
              that.$message.error(error.message)
            })
        }
      });
    },
    reload() {
      const parentid = this.$store.getters.treeNode.key
      this.$store.dispatch('loadtable', {
        parentid: parentid
      }).then(() => {
        this.$store.dispatch('reloadnav', true)
      })
    },
    onDelete(key) {
      //console.log(key)
      const that = this
      this.$store.dispatch('reloadnav', false)
      deleteById({
          id: key
        })
        .then(data => {
          var res = JSON.parse(data)
          if (!res.success) {
            that.$message.error(res.errorMsg, 0.5)
          } else {
            that.reload()
          }
        }).catch(error => {
          that.$message.error(error.message)
        })
    }

  },
  computed: {
    tabledata() {
      return this.$store.getters.tabledata
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

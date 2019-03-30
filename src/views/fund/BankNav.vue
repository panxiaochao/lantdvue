<template>
<div class="banknav">
  <h3>银行卡管理</h3>
  <a-tree :loadData="onLoadData" :treeData="treeData" @select="onSelect" />
</div>
</template>

<script>
import {
  getListBankTree
} from '@/api/fundsalary'
export default {
  name: 'BankNav',
  props: {
    // index.vue 的this 可用于刷新数据
    superThis: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      treeData: [{
        title: '银行卡类别',
        key: 'root',
        sorttype: 'root',
        isLeaf: false
      }]
    }
  },
  methods: {
    onSelect(selectedKeys, e) {
      //console.log(this.$dayjs(1318781876406).format('YYYY-MM-DD HH:mm:ss'))
      if (e.selected && e.node.dataRef.isLeaf) {
        this.superThis.params.bankid = selectedKeys[0]
        this.superThis.params.bankname = e.node.dataRef.title
        this.superThis.loadTable(1)
      }
    },
    onLoadData(treeNode) {
      //console.log("onLoadData")
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
    }
  }
}
</script>

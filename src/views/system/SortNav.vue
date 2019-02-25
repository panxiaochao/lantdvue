<template>
<div class="sortnav">
  <h3>资金类别</h3>
  <a-tree :loadData="onLoadData" :treeData="treeData" @select="onSelect" />
</div>
</template>

<script>
import {
  getListSortTree
} from '@/api/fundsort'
export default {
  name: 'SortNav',
  data() {
    return {
      treeData: [{
        title: '资金类别',
        key: 'root'
      }]
    }
  },
  methods: {
    onSelect(selectedKeys, e) {
      //console.log(selectedKeys)
      const data = [{
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
      }, {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
      }, {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
      }]

      this.$store.dispatch('syncFundSortData', data)
    },
    onLoadData(treeNode) {
      return new Promise((resolve) => {
        getListSortTree({
            parentid: treeNode.dataRef.key
          })
          .then(data => {
            let treedata = JSON.parse(data)
            treeNode.dataRef.children = treedata
            this.treeData = [...this.treeData]
            resolve()
          }).catch(error => {
            console.log(error)
            this.$message.error(error.message)
            resolve()
            return
          })
      })
    }
  }
}
</script>

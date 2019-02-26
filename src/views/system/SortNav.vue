<template>
<div class="sortnav">
  <h3>资金类别</h3>
  <a-tree :loadData="onLoadData" :treeData="treeData" @select="onSelect" />
</div>
</template>

<script>
import {
  getListSortTree,
  getListSortTable
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
      //console.log(e)
      if (e.selected) {
        getListSortTable({
            parentid: selectedKeys[0]
          })
          .then(data => {
            //  console.log(data)
            var arr = JSON.parse(data)
            this.$store.dispatch('syncFundSortData', arr)
          }).catch(error => {
            this.$message.error(error.message)
          })
      }
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

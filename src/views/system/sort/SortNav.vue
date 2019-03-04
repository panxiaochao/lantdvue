<template>
<div class="sortnav">
  <h3>资金类别管理</h3>
  <input type="hidden" :value="reloadnav" />
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
        key: 'root',
        sorttype: 'root'
      }],
      treeNode: null
    }
  },
  methods: {
    onSelect(selectedKeys, e) {
      //console.log(e.node.dataRef)
      if (e.selected) {
        this.$store.dispatch('loadtable', {
          parentid: selectedKeys[0]
        })
        this.$store.dispatch('setTreeNode', e.node.dataRef)
        this.treeNode = e.node
      }
    },
    onLoadData(treeNode) {
      console.log("onLoadData")
      //this.treeNode = treeNode
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
            //console.log(error)
            //this.$message.error(error.message)
            resolve()
            return
          })
      })
    },
    reloadNav() {
      console.log("reloadNav")
      const treeNode = this.treeNode
      if (treeNode !== null) {
        getListSortTree({
            parentid: treeNode.dataRef.key
          })
          .then(data => {
            let treedata = JSON.parse(data)
            treeNode.dataRef.children = treedata
            this.treeData = [...this.treeData]
          })
      }
    }
  },
  computed: {
    reloadnav() {
      const reload = this.$store.getters.reloadnav
      if (reload) {
        this.reloadNav()
      }
      return reload
    }
  }
}
</script>

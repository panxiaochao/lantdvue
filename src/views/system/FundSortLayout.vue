<template>
<a-layout :style="alheight">
  <a-layout-sider theme="light" width="250px">
    <sort-nav />
  </a-layout-sider>
  <a-layout-content>
    <fund-sort />
  </a-layout-content>
</a-layout>
</template>
<script>
import SortNav from './SortNav'
import FundSort from './FundSort'
export default {
  name: 'FundSortLayout',
  components: {
    SortNav,
    FundSort
  },
  data() {
    return {
      alheight: {
        height: '100%'
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
  }
}
</script>
<style lang="scss" scoped>
.ant-layout-sider {
    border-right: 1px solid #ebeef5;
}

.ant-layout-sider {
    .sortnav {
        padding: 15px;
    }

}

.ant-layout-content {
    background-color: #fff;
}
</style>

<template>
<a-layout :style="alheight">
  <a-layout-sider theme="dark" width="230px">
    <bank-nav />
  </a-layout-sider>
  <a-layout-content>Content</a-layout-content>
</a-layout>
</template>
<script>
import BankNav from './BankNav'
export default {
  name: 'FundLayout',
  components: {
    BankNav
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
<style scoped>

</style>

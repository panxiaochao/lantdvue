<template>
<div id="container">
  <a-layout :style="alheight">
    <a-layout-sider :trigger="null" collapsible v-model="collapsed" width="230px">
      <div class="logo">LYPXC</div>
      <nav-menu />
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <a-icon class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="()=> collapsed = !collapsed" />
      </a-layout-header>
      <a-layout-content class="content">
        <app-main />
      </a-layout-content>
    </a-layout>
  </a-layout>
</div>
</template>
<script>
import NavMenu from './NavMenu'
import AppMain from './AppMain'
export default {
  name: 'Layout',
  components: {
    NavMenu,
    AppMain
  },
  data() {
    return {
      collapsed: false,
      alheight: {
        height: '500px'
      }
    }
  },
  created: function() {
    // `this` 指向 vm 实例
    const that = this;
    //console.log(that.$children);
    var h = document.documentElement.clientHeight || document.body.clientHeight;
    that.alheight.height = h + 'px';
    //console.log(h)
  }
}
</script>
<style scoped>
#container .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color .3s;
}

#container .trigger:hover {
  color: #1890ff;
}

#container .logo {
  height: 32px;
  background: rgba(255, 255, 255, .2);
  margin: 15px;
  color: #fff;
  text-align: center;
  font-size: 18px;
  line-height: 32px;
}

#container .ant-layout-sider-collapsed .logo {
  font-size: 14px;
}

#container .content {
  margin: 15px;
  /*padding: 15px;*/
  background: #fff;
  min-height: 280px;
}
</style>

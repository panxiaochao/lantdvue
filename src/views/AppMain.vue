<style scoped>
.app-main {
  /*50 = navbar  */
  height: 100%;
  position: relative;
  overflow: auto;
}
</style>

<template>
<div class="app-main">
  <transition name="fade" mode="out-in">
    <!-- or name="fade" -->
    <!-- <router-view :key="key"></router-view> -->
    <router-view />
  </transition>
</div>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    /*key() {
       return this.$route.name !== undefined ? this.$route.name +'-' +new Date() : this.$route + '-'+new Date()
    }*/
  }
}
</script>

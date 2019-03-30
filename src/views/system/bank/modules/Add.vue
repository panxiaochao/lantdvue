<template>
<div class="aform">
  <a-button type="primary" @click="onClick">新增</a-button>
  <a-form ref="form" :super-this="superThis" :is-add="isAdd" />
</div>
</template>
<script>
import aForm from './Form'
export default {
  components: {
    aForm
  },
  props: {
    data: {
      type: Object
    },
    // index.vue 的this 可用于刷新数据
    superThis: {
      type: Object,
      required: true
    },
    isAdd: {
      type: Boolean
    },
    params: {
      type: Object
    }
  },
  methods: {
    onClick() {
      const _this = this.$refs.form
      const formdata = this.data || {}
      _this.pbankname = this.params.pbankname
      _this.formdata = {
        pbankid: this.params.parentid,
        bankflag: '1',
        bankvalue: 0
      }
      _this.visible = true
    }
  }
}
</script>

<style scoped>
.aform {
  display: inline-block;
}
</style>

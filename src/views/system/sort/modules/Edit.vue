<template>
<div class="aform">
  <a href="javascript:void(0);" @click="onClick">编 辑</a>
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
      if (!this.isAdd) {
        const formdata = this.data || {}
        //console.log(formdata)
        _this.psortname = this.params.psortname
        _this.formdata = {
          id: formdata.key,
          psortid: this.params.parentid,
          sortname: formdata.sortname,
          sorttype: formdata.sorttype
        }
        //console.log(_this.formdata)
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

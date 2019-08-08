<template>
<div class="aform">
  <a href="javascript:void(0);" @click="onClick">查 看</a>
  <a-modal :title="title" :maskClosable="false" :visible="visible" @cancel="onCancel" :footer="null">
    <a-form :form="form">
      <a-form-item label="支付类别" :label-col="{span: 5}" :wrapper-col="{span: 16}">
        <span class="ant-form-text">【{{formdata.trdetype}}】{{formdata.sortname}}</span>
      </a-form-item>
      <a-form-item label="交易说明" :label-col="{span: 5}" :wrapper-col="{span: 16}">
        <span class="ant-form-text">
          {{formdata.summary}}
        </span>
      </a-form-item>
    </a-form>
  </a-modal>
</div>
</template>
<script>
export default {
  components: {},
  props: {
    data: {
      type: Object
    },
    params: {
      type: Object
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  data() {
    return {
      title: '详情',
      visible: false,
      formdata: {}
    }
  },
  methods: {
    onClick() {
      const formdata = this.data || {}
      console.log(formdata);
      this.formdata = {
        summary: formdata.summary,
        trdetype: formdata.trdetype == "in" ? '收入' : '支出',
        sortname: formdata.sortname
      }
      //console.log(_this.formdata)
      this.visible = true
    },
    onCancel() {
      console.log('cancel')
      this.form.resetFields()
      this.visible = false
    },
  }
}
</script>

<style scoped>
.aform {
  display: inline-block;
}

.ant-form-text {
  color: #333;
  font-weight: 600;
}
</style>

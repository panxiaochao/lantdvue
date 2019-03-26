<template>
<a-modal :title="title" :maskClosable="false" :visible="visible" @ok="onOk" @cancel="onCancel">
  <a-form :form="form">
    <a-form-item label="交易金额" :label-col="{span: 5}" :wrapper-col="{span: 16}">
      <a-input v-decorator="[
          'bankname',
          {initialValue: formdata.bankname, rules: [{ required: true, message: '请输入银行卡' }]}
        ]" />
    </a-form-item>
    <a-form-item label="交易时间" :label-col="{span: 5}" :wrapper-col="{span: 16}">
      <a-date-picker placeholder="请选择交易时间" v-decorator="[
          'tradetimeStr',
          {initialValue: formdata.tradetimeStr, rules: [{ required: true, message: '请选择交易时间' }]}
        ]" style="width: 100%" />

    </a-form-item>
    <a-form-item label="交易类别" :label-col="{span: 5}" :wrapper-col="{span: 16}">
      <a-input v-decorator="[
          'bankname',
          {initialValue: formdata.bankname, rules: [{ required: true, message: '请输入银行卡' }]}
        ]" />
    </a-form-item>
    <a-form-item label="支付方式" :label-col="{span: 5}" :wrapper-col="{span: 16}">
      <a-input v-decorator="[
          'bankname',
          {initialValue: formdata.bankname, rules: [{ required: true, message: '请输入银行卡' }]}
        ]" />
    </a-form-item>
    <a-form-item label="交易说明" :label-col="{span: 5}" :wrapper-col="{span: 16}">
      <a-textarea placeholder="交易说明" :rows="4" v-decorator="[
            'summary',
            {initialValue: formdata.summary}
          ]" />
    </a-form-item>
  </a-form>
</a-modal>
</template>

<script>
import {
  addOrupdate
} from '@/api/fundbank'

export default {
  name: 'FundBankForm',
  props: {
    isAdd: {
      type: Boolean,
      required: true
    },
    superThis: {
      type: Object,
      default: null
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  data() {
    return {
      title: this.isAdd ? '新增' : '修改',
      visible: false,
      formdata: {
        id: '',
        tradetimeStr: '',
        summary: ''
      }
    }
  },
  methods: {
    onOk() {
      //console.log('ok')
      const form = this.form
      const that = this
      form.validateFields((err, values) => {
        if (!err) {
          values.pbankid = this.formdata.pbankid
          if (typeof(values.pbankid) === "undefined" || values.pbankid === '') {
            that.$message.error("请点击节点操作！", 1)
            return
          }
          if (this.formdata.id !== '') {
            values.id = this.formdata.id
          }
          //console.log(values);
          addOrupdate(values)
            .then(data => {
              var res = JSON.parse(data)
              if (!res.success) {
                that.$message.error(res.errorMsg)
              } else {
                // 更新树节点
                //this.$store.dispatch('reloadnav', true)
                // 更新table表格
                that.superThis.loadTable(this.formdata.pbankid)
                // 关闭弹窗
                that.visible = false
                // 重置表单
                form.resetFields()
              }
            }).catch(error => {
              //that.$message.error(error.message)
            })
        }
      });
    },
    onCancel() {
      console.log('cancel')
      this.form.resetFields()
      this.visible = false
    }
  }
}
</script>

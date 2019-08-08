<template>
<a-modal :title="title" :maskClosable="false" :visible="visible" @ok="onOk" @cancel="onCancel">
  <a-form :form="form">
    <a-form-item label="父节点" :label-col="{span: 5}" :wrapper-col="{span: 16}">
      <span class="ant-form-text">
        {{pbankname}}
      </span>
    </a-form-item>
    <a-form-item label="银行卡" :label-col="{span: 5}" :wrapper-col="{span: 16}">
      <a-input v-decorator="[
          'bankname',
          {initialValue: formdata.bankname, rules: [{ required: true, message: '请输入银行卡' }]}
        ]" />
    </a-form-item>
    <a-form-item label="银行卡编码" :label-col="{span: 5}" :wrapper-col="{span: 16}">
      <a-input v-decorator="[
          'banktype',
          {initialValue: formdata.banktype, rules: [{ required: true, message: '银行卡编码' }]}
        ]" />
    </a-form-item>
    <a-form-item label="余额(元)" :label-col="{span: 5}" :wrapper-col="{span: 16}">
      <a-input v-decorator="[
          'bankvalue',
          {initialValue: formdata.bankvalue, rules: [{ required: true, message: '余额' }]}
        ]" />
    </a-form-item>
    <a-form-item label="银行卡类别" :label-col="{span: 5}" :wrapper-col="{span: 16}">
      <a-radio-group v-decorator="['bankflag', {initialValue: formdata.bankflag, rules: [{ required: true, message: '请选择银行卡类别' }]}]">
        <a-radio value="1">借记卡</a-radio>
        <a-radio value="2">信用卡</a-radio>
        <a-radio value="3">其它</a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item label="排序" :label-col="{span: 5}" :wrapper-col="{span: 16}">
      <a-input v-decorator="[
          'code',
          {initialValue: formdata.code}
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
      pbankname: '',
      formdata: {
        id: '',
        pbankid: '',
        bankname: '',
        banktype: '',
        bankflag: '1',
        bankvalue: 0
      }
    }
  },
  methods: {
    onOk() {
      //  console.log('ok')
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
                that.superThis.reloadNav();
                // 更新table表格
                that.superThis.loadTable(this.formdata.pbankid)
                // 关闭弹窗
                that.visible = false
                // 重置表单
                form.resetFields()
              }
            }).catch(error => {
              that.$message.error(error.message)
            })
        }
      });
    },
    onCancel() {
      //  console.log('cancel')
      this.form.resetFields()
      this.visible = false
    }
  }
}
</script>

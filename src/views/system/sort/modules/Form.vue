<template>
<a-modal :title="title" :maskClosable="false" :visible="visible" @ok="onOk" @cancel="onCancel">
  <a-form :form="form">
    <a-form-item label="父节点" :label-col="{span: 5}" :wrapper-col="{span: 16}">
      <span class="ant-form-text">
        {{psortname}}
      </span>
    </a-form-item>
    <a-form-item label="类别名" :label-col="{span: 5}" :wrapper-col="{span: 16}">
      <a-input v-decorator="[
          'sortname',
          {initialValue: formdata.sortname,rules: [{ required: true, message: '请输入类别名' }]}
        ]" />
    </a-form-item>
    <a-form-item label="类型" :label-col="{span: 5}" :wrapper-col="{span: 16}">
      <a-input v-decorator="[
          'sorttype',
          {initialValue: formdata.sorttype, rules: [{ required: true, message: '请输入类型' }]}
        ]" />
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
} from '@/api/fundsort'

export default {
  name: 'FundSortForm',
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
      psortname: '',
      formdata: {
        id: '',
        psortid: '',
        sortname: '',
        sorttype: ''
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
          values.parentid = this.formdata.psortid
          if (typeof(values.parentid) === "undefined" || values.parentid === '') {
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
                that.superThis.loadTable(this.formdata.psortid)
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
      //console.log('cancel')
      this.form.resetFields()
      this.visible = false
    }
  }
}
</script>

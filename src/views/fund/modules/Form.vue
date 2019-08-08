<template>
<a-modal :title="title" :maskClosable="false" :visible="visible" @ok="onOk" @cancel="onCancel" :footer="footer">
  <a-form :form="form">
    <a-form-item label="支付方式" :label-col="{span: 5}" :wrapper-col="{span: 16}">
      <span class="ant-form-text">
        {{bankName}}
      </span>
    </a-form-item>
    <a-form-item label="交易金额" :label-col="{span: 5}" :wrapper-col="{span: 16}">
      <a-input v-decorator="[
          'salarymoney',
          {initialValue: formdata.salarymoney, rules: [{ required: true, message: '请输入交易金额' }]}
        ]" />
    </a-form-item>
    <a-form-item label="交易时间" :label-col="{span: 5}" :wrapper-col="{span: 16}">
      <a-date-picker placeholder="请选择交易时间" v-decorator="[
          'tradetimeStr',
          {initialValue: formdata.tradetimeStr, rules: [{ required: true, message: '请选择交易时间' }]}
        ]" style="width: 100%" />

    </a-form-item>
    <a-form-item label="交易类别" :label-col="{span: 5}" :wrapper-col="{span: 16}">
      <a-cascader :options="sortinit" :loadData="loadSortData" placeholder="请选择交易类别" changeOnSelect v-decorator="[
          'sortid',
          {rules: [{ required: true, message: '请选择交易类别' }]}
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
  addOrupdate,
  getSalarySortTree
} from '@/api/fundsalary'

export default {
  props: {
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
      bankName: '',
      footer: '',
      formdata: {
        bankid: '',
        salarymoney: 0,
        tradetimeStr: '',
        summary: ''
      },
      sortinit: [{
        value: '1',
        label: '收入',
        isLeaf: false,
      }, {
        value: '0',
        label: '支出',
        isLeaf: false,
      }]
    }
  },
  methods: {
    onOk() {
      console.log('ok')
      const form = this.form
      const that = this
      form.validateFields((err, values) => {
        if (!err) {
          values.bankid = this.formdata.bankid
          if (typeof(values.bankid) === "undefined" || values.bankid === '') {
            that.$message.error("请点击节点操作！", 1)
            return
          }
          if (this.formdata.id !== '') {
            values.id = this.formdata.id
          }
          // 转化时间格式
          values.tradetimeStr = values.tradetimeStr.format('YYYY-MM-DD') + ' 00:00:00'
          // 获取最后一个id
          values.sortid = values.sortid[values.sortid.length - 1]
          // console.log(values);
          addOrupdate(values)
            .then(data => {
              var res = JSON.parse(data)
              if (!res.success) {
                that.$message.error(res.errorMsg)
              } else {
                // 更新table表格
                that.superThis.loadTable(1)
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
      console.log('cancel')
      this.form.resetFields()
      this.visible = false
    },
    loadSortData(selectedOptions) {
      const that = this
      const targetOption = selectedOptions[selectedOptions.length - 1];
      targetOption.loading = true;

      // 异步加载数据
      getSalarySortTree({
          parentid: targetOption.value
        })
        .then(data => {
          targetOption.loading = false;
          var res = JSON.parse(data)
          targetOption.children = res;
          this.sortinit = [...this.sortinit]
        }).catch(error => {
          console.error(error.message)
        })
    }
  }
}
</script>

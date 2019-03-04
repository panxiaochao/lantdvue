<template>
<a-modal title="新增或编辑" :maskClosable="false" :visible="visible" @ok="() => { $emit('create') }" @cancel="() => { $emit('cancel') }">
  <a-form :form="form">
    <a-form-item label="节点" :label-col="{span: 5}" :wrapper-col="{span: 16}">
      <span class="ant-form-text">
        {{title}}
      </span>
    </a-form-item>
    <a-form-item style="display:none">
      <a-input v-decorator="['id',  {initialValue: sortid}]" />
    </a-form-item>
    <a-form-item label="类别名" :label-col="{span: 5}" :wrapper-col="{span: 16}">
      <a-input v-decorator="[
          'sortname',
          {initialValue: sortname,rules: [{ required: true, message: '请输入类别名' }]}
        ]" />
    </a-form-item>
    <a-form-item label="类型" :label-col="{span: 5}" :wrapper-col="{span: 16}">
      <a-input v-decorator="[
          'sorttype',
          {initialValue: sorttype, rules: [{ required: true, message: '请输入类型' }]}
        ]" />
    </a-form-item>
  </a-form>
</a-modal>
</template>

<script>
export default {
  name: 'FundSortAdd',
  props: ['visible', 'sorttype', 'sortname', 'title', 'sortid'],
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  data() {
    return {}
  },
  methods: {}
}
</script>

<template>
  <tq-tree-table
    :columns="columns"
    :main-name="mainName"
    :condition="condition"
    :rules="rules"
    :methods="methods"
    :options="options"
  >
    <template #testin="{ column, form }">
      <el-input v-model="form[column.column]"></el-input>
    </template>
  </tq-tree-table>
</template>

<script setup>
import { reactive, ref } from 'vue';
import apis from 'api/organization';
import TqTreeTable from 'components/TqTreeTable.vue';

const props = defineProps(['appId']);

const mainName = ref('组织');
const condition = reactive({ appId: props.appId });
const methods = reactive({
  list: apis.loadOrgByAppId,
  save: apis.saveOrg,
  update: apis.updateOrg,
  remove: apis.removeOrg,
  batchRemove: apis.batchRemoveOrg,
});
const options = reactive([
  {
    name: '授权资源',
    slot: 'authorityRole',
    method: (row) => {
      console.log(row);
    },
    icon: 'el-icon-plus',
    inMore: true,
  },
]);
const columns = reactive([
  {
    column: 'id',
    label: 'ID',
    isShow: true,
    isEdit: false,
    type: 'input',
  },
  {
    column: 'name',
    label: '名称',
    isShow: true,
    isEdit: true,
    type: 'input',
  },
  {
    column: 'parentId',
    label: `上级${mainName.value}`,
    isShow: true,
    isEdit: true,
    type: 'select',
    option: {
      method: apis.loadOrgByAppId,
      condition: { appId: 1 },
      default: [{ id: -1, name: '顶级组织' }],
      key: 'name',
      value: 'id',
    },
  },
  {
    column: 'orgCode',
    label: `组织CODE`,
    isShow: true,
    isEdit: true,
    type: 'input',
  },
  {
    column: 'sequence',
    label: `序号`,
    isShow: true,
    isEdit: true,
    type: 'input',
  },
  {
    column: 'appId',
    label: `应用ID`,
    isShow: false,
    isEdit: false,
    hidden: true,
    type: 'input',
    default: props.appId,
  },
]);
const rules = reactive({
  name: [
    {
      required: true,
      message: '请输入路由名称',
      trigger: 'blur',
    },
  ],
  parentId: [
    {
      required: true,
      message: '请选择上级路由',
      trigger: 'change',
    },
  ],
});
</script>

<style scoped></style>

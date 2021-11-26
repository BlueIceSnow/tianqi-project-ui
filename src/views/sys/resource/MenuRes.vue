<template>
  <div>
    <tq-tree-table
      :columns="columns"
      :main-name="mainName"
      :condition="condition"
      :rules="rules"
      :methods="methods"
    >
      <template #closeable="{ row }">
        <span v-html="row.closeable ? '是' : '否'"></span>
      </template>
      <template #testin="{ column, form }">
        <el-input v-model="form[column.column]"></el-input>
      </template>
    </tq-tree-table>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import apis from 'api/resource';
import TqTreeTable from 'components/TqTreeTable.vue';

const props = defineProps(['appId']);
const mainName = ref('菜单');
const condition = reactive({ type: 'M', appId: props.appId });
const methods = reactive({
  list: apis.loadResByAppId,
  save: apis.saveRes,
  update: apis.updateRes,
  remove: apis.removeRes,
  batchRemove: apis.batchRemoveRes,
});

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
    column: 'url',
    label: '路径',
    isShow: true,
    isEdit: true,
    formSlot: 'testin',
    type: 'input',
  },
  {
    column: 'parentId',
    label: `上级${mainName.value}`,
    isShow: true,
    isEdit: true,
    type: 'select',
    option: {
      method: apis.loadResByAppId,
      condition: { type: 'M', appId: props.appId },
      default: [{ id: -1, name: '顶级菜单' }],
      key: 'name',
      value: 'id',
    },
  },
  {
    column: 'closeable',
    label: `可关闭`,
    isShow: true,
    isEdit: true,
    type: 'switch',
    slot: 'closeable',
  },
  {
    column: 'icon',
    label: `图标`,
    isShow: true,
    isEdit: true,
    type: 'input',
  },
  {
    column: 'type',
    label: `类型`,
    isShow: false,
    isEdit: false,
    hidden: true,
    default: 'M',
    type: 'switch',
  },
  {
    column: 'component',
    label: `组件`,
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
    default: 1,
  },
  {
    column: 'extField.isLink',
    label: `外链`,
    isShow: false,
    isEdit: true,
    type: 'switch',
  },
  {
    column: 'extField.isShow',
    label: `展示`,
    isShow: false,
    isEdit: true,
    type: 'switch',
  },
  {
    column: 'extField.isGroup',
    label: `分组`,
    isShow: false,
    isEdit: true,
    type: 'switch',
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

<style scoped lang="scss"></style>

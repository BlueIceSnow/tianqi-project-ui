<template>
  <div class="wrap">
    <tq-table
      :apis="apis"
      :columns="columns"
      :main-name="mainName"
      :condition="condition"
      :rules="rules"
      :methods="methods"
      :options="options"
    >
      <template #closeable="{ row }">
        <span v-html="row.closeable.value ? '是' : '否'"></span>
      </template>
    </tq-table>
    <tq-relation-tree-drawer
      drawer-title="授权菜单"
      submit-title="授权"
      node-key="id"
      label="name"
      main-param-key="roleId"
      sub-param-key="menuIds"
      relation-key="id"
      :submit-method="apis.authoriseMenuToRole"
      :load-data-method="() => resApis.loadResByAppId({ appId, type: 'M' })"
      ref="tqRelationTreeDrawer"
    />
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import apis from 'api/role';
import resApis from 'api/resource';
import TqTable from 'components/TqTable.vue';
import TqRelationTreeDrawer from 'components/TqRelationTreeDrawer.vue';

const props = defineProps(['appId']);

const mainName = ref('角色');
const condition = reactive({ appId: props.appId });

const tqRelationTreeDrawer = ref();

const options = reactive([
  {
    name: '授权',
    slot: 'authorityRole',
    method: (row) => tqRelationTreeDrawer.value.openDrawer(row),
    icon: 'el-icon-plus',
    inMore: true,
  },
]);

function addRole(row) {
  console.log(row);
}

const methods = reactive({
  list: apis.loadRoleListByPage,
  save: apis.saveRole,
  update: apis.updateRole,
  remove: apis.removeRoleByPage,
  batchRemove: apis.batchRemoveRoleByPage,
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
    search: true,
    default: null,
    type: 'input',
  },
  {
    column: 'code',
    label: '角色编码',
    isShow: true,
    isEdit: true,
    search: true,
    default: null,
    type: 'input',
  },
  {
    column: 'mutualExclusionRoles',
    label: '互斥角色',
    isShow: false,
    isEdit: true,
    default: [],
    type: 'multiple-select',
    option: {
      method: apis.loadRoleList,
      condition: {},
      default: [],
      key: 'name',
      value: 'id',
    },
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

<style scoped lang="scss">
.wrap {
  width: 100%;
  height: 100%;
}
</style>

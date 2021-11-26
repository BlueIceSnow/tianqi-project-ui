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
  <tq-relation-table-dialog
    :dialog-title="'授权用户'"
    :submit-title="'授权'"
    :relation-key="'id'"
    :relation-sub-key="'userId'"
    :main-param-key="'orgId'"
    :sub-param-key="'userIds'"
    :submit-method="apis.authorizeUserToOrg"
    :load-data-method="userApis.loadUserList"
    :load-relation-data-method="apis.loadAuthorizedUserList"
    :const-query-params="{ tenantId, appId }"
    :const-submit-params="{ appId: props.appId }"
    :show-fields="[
      { column: 'id', label: 'ID' },
      { column: 'name', label: '用户名' },
    ]"
    ref="authorizeUser"
  />
  <tq-relation-table-dialog
    :dialog-title="'授权角色'"
    :submit-title="'授权'"
    :relation-key="'id'"
    :relation-sub-key="'roleId'"
    :main-param-key="'orgId'"
    :sub-param-key="'roleIds'"
    :submit-method="apis.authorizeRoleToOrg"
    :load-data-method="roleApis.loadRoleList"
    :load-relation-data-method="apis.loadAuthorizedRoleList"
    :const-query-params="{ appId: props.appId, tenantId }"
    :show-fields="[
      { column: 'id', label: 'ID' },
      { column: 'name', label: '角色名' },
    ]"
    ref="authorizeRole"
  />
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useStore } from 'vuex';
import apis from 'api/organization';
import userApis from 'api/user';
import roleApis from 'api/role';
import TqTreeTable from 'components/TqTreeTable.vue';
import TqRelationTableDialog from 'components/TqRelationTableDialog.vue';

const props = defineProps(['appId']);
const store = useStore();
const tenantId = store.getters['user/userInfo']?.tenantId;

const authorizeUser = ref();
const authorizeRole = ref();

const mainName = ref('组织');
const condition = reactive({ appId: props.appId, tenantId });
const methods = reactive({
  list: apis.loadOrg,
  save: apis.saveOrg,
  update: apis.updateOrg,
  remove: apis.removeOrg,
  batchRemove: apis.batchRemoveOrg,
});
const options = reactive([
  {
    name: '授权用户',
    slot: 'authorityRole',
    method: (row) => authorizeUser.value.openDialog(row),
    icon: 'Plus',
    inMore: true,
  },
  {
    name: '授权角色',
    slot: 'authorityRole',
    method: (row) => authorizeRole.value.openDialog(row),
    icon: 'Plus',
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
      condition: { appId: props.appId },
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

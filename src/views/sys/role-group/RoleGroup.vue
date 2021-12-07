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
        <span v-html="row.closeable ? '是' : '否'"></span>
      </template>
    </tq-table>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import apis from 'api/role-group';
import roleApis from 'api/role';
import TqTable from 'components/TqTable.vue';
import { useStore } from 'vuex';
import tenantApis from '../../../api/tenant';

const props = defineProps(['appId']);
const mainName = ref('角色组');
const store = useStore();
const condition = reactive({
  appId: props.appId,
  tenantId: store.getters['user/userInfo']?.tenantId,
});

const options = reactive([]);

const methods = reactive({
  list: apis.loadRoleGroupListByPage,
  save: apis.saveRoleGroup,
  update: apis.updateRoleGroup,
  remove: apis.removeRoleGroupByPage,
  batchRemove: apis.batchRemoveRoleGroupByPage,
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
    column: 'appId',
    label: `应用ID`,
    isShow: false,
    isEdit: false,
    hidden: true,
    type: 'input',
    default: props.appId,
  },
  {
    column: 'includeRoles',
    label: '角色列表',
    isShow: false,
    isEdit: true,
    default: [],
    type: 'multiple-select',
    option: {
      method: roleApis.loadRoleList,
      condition: {
        appId: props.appId,
        tenantId: store.getters['user/userInfo']?.tenantId,
      },
      default: [],
      key: 'name',
      value: 'id',
    },
  },
]);
if (store.getters['user/userInfo']?.tenantId === 1) {
  columns.push({
    column: 'tenantId',
    label: '所属租户',
    isShow: true,
    isEdit: true,
    search: true,
    default: null,
    type: 'select',
    option: {
      method: tenantApis.loadTenantList,
      condition: {},
      default: [],
      key: 'name',
      value: 'id',
    },
  });
}
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

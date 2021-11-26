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
    <tq-relation-tree-drawer
      drawer-title="授权菜单"
      submit-title="授权"
      node-key="id"
      label="name"
      main-param-key="roleId"
      sub-param-key="resIds"
      relation-key="id"
      relation-sub-key="resourceId"
      :submit-method="apis.authoriseResToRole"
      :const-query-params="{ appId, type: 'M' }"
      :const-submit-params="{ tenantId: currentRow?.tenantId }"
      :load-relation-data-method="apis.loadAuthorisedResByRoleId"
      :load-data-method="resApis.loadResByAppId"
      ref="tqRelationTreeDrawer"
    />
    <tq-relation-tree-drawer
      drawer-title="授权接口"
      submit-title="授权"
      node-key="id"
      label="name"
      main-param-key="roleId"
      sub-param-key="resIds"
      relation-key="id"
      relation-sub-key="resourceId"
      :submit-method="apis.authoriseResToRole"
      :const-query-params="{ appId, type: 'U' }"
      :const-submit-params="{ tenantId: currentRow?.tenantId }"
      :load-relation-data-method="apis.loadAuthorisedResByRoleId"
      :load-data-method="resApis.loadResByAppId"
      ref="tqUrlRelationTreeDrawer"
    />
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import apis from 'api/role';
import resApis from 'api/resource';
import tenantApis from 'api/tenant';
import TqTable from 'components/TqTable.vue';
import { useStore } from 'vuex';
import TqRelationTreeDrawer from 'components/TqRelationTreeDrawer.vue';

const props = defineProps(['appId']);
const store = useStore();

const mainName = ref('角色');
const condition = reactive({ appId: props.appId });

const tqRelationTreeDrawer = ref();
const tqUrlRelationTreeDrawer = ref();
const currentRow = ref(null);
const options = reactive([
  {
    name: '授权菜单',
    slot: 'authorityRole',
    method: (row) => {
      currentRow.value = row;
      tqRelationTreeDrawer.value.openDrawer(row);
    },
    icon: 'Plus',
    inMore: true,
  },
  {
    name: '授权接口',
    slot: 'authorityUrl',
    method: (row) => {
      currentRow.value = row;
      tqUrlRelationTreeDrawer.value.openDrawer(row);
    },
    icon: 'Plus',
    inMore: true,
  },
]);

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
      condition: {
        appId: props.appId,
        tenantId: store.getters['user/userInfo']?.tenantId,
      },
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

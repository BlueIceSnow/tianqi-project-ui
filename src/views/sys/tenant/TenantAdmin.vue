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
    </tq-table>
    <tq-relation-table-dialog
      :dialog-title="'授权应用'"
      :submit-title="'授权'"
      :relation-key="'id'"
      :relation-sub-key="'appId'"
      :main-param-key="'tenantId'"
      :sub-param-key="'applicationIds'"
      :submit-method="apis.authoriseApplicationToTenant"
      :load-data-method="applicationApis.loadApplicationListByCurrentUser"
      :load-relation-data-method="apis.loadAuthorisedApplicationList"
      :show-fields="[
        { column: 'id', label: 'ID' },
        { column: 'name', label: '名称' },
        { column: 'appKey', label: '应用KEY' },
      ]"
      ref="dialog"
    />
  </div>
</template>

<script setup>
import { reactive, ref, provide, onMounted } from 'vue';
import apis from 'api/tenant';
import applicationApis from 'api/application';
import TqTable from 'components/TqTable.vue';
import TqRelationTableDialog from 'components/TqRelationTableDialog.vue';

const authorityApplicationDialogShow = ref(false);
provide('isShow', authorityApplicationDialogShow);
const mainName = ref('租户');
const condition = reactive({});
const methods = reactive({
  list: apis.loadTenantListByPage,
  save: apis.saveTenant,
  update: apis.updateTenant,
  remove: apis.removeTenantByPage,
  batchRemove: apis.batchRemoveTenantByPage,
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
]);

const dialog = ref(null);

const options = reactive([
  {
    name: '授权应用',
    slot: 'authorityRole',
    method: (row) => {
      dialog.value.openDialog(row);
    },
    icon: 'el-icon-plus',
    inMore: true,
  },
]);
const rules = reactive({
  name: [
    {
      required: true,
      message: '请输入应用名称',
      trigger: 'blur',
    },
  ],
  appKey: [
    {
      required: true,
      message: '请输入应用Key',
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

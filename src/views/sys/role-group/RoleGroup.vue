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
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import apis from 'api/role-group';
import TqTable from 'components/TqTable.vue';

const props = defineProps(['appId']);
const mainName = ref('角色组');
const condition = reactive({ appId: props.appId });

const options = reactive([
  {
    name: '授权',
    slot: 'authorityRole',
    method: addRole,
    icon: 'el-icon-plus',
    inMore: true,
  },
]);

function addRole(row) {
  console.log(row);
}

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

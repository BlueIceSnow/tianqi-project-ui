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
      :dialog-title="'授权角色'"
      :submit-title="'授权'"
      :relation-key="'id'"
      :relation-sub-key="'roleId'"
      :main-param-key="'userId'"
      :sub-param-key="'roleIds'"
      :submit-method="apis.authorizeRoleToUser"
      :load-data-method="roleApis.loadRoleList"
      :load-relation-data-method="apis.loadAuthorizedRoleList"
      :const-query-params="{ appId }"
      :const-submit-params="{ appId }"
      :show-fields="[
        { column: 'id', label: 'ID' },
        { column: 'name', label: '角色名' },
      ]"
      ref="authorizeRole"
    />
    <el-dialog v-model="selectAppDialog" title="选择应用" width="30%">
      <el-select v-model="appId" placeholder="请选择应用" style="width: 100%">
        <el-option
          v-for="item in appList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >
        </el-option>
      </el-select>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="selectAppDialog = false">取消</el-button>
          <el-button type="primary" @click="selectAppHandle">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useStore } from 'vuex';
import apis from 'api/user';
import tenantApis from 'api/tenant';
import roleApis from 'api/role';
import appApis from 'api/application';
import TqTable from 'components/TqTable.vue';
import TqRelationTableDialog from 'components/TqRelationTableDialog.vue';

const store = useStore();
const mainName = ref('用户');
const condition = reactive({});
const authorizeRole = ref();
const selectAppDialog = ref(false);
const methods = reactive({
  list: apis.loadUserListByPage,
  save: apis.saveUser,
  update: apis.updateUser,
  remove: apis.removeUserByPage,
  batchRemove: apis.batchRemoveUserByPage,
});

const appList = ref([]);

appApis.loadApplicationListByCurrentUser().then((res) => {
  appList.value.splice(0, appList.value.length);
  appList.value.push(...res.row);
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
    column: 'username',
    label: '用户名',
    isShow: true,
    isEdit: true,
    search: true,
    default: null,
    type: 'input',
  },
  {
    column: 'password',
    label: '密码',
    isShow: true,
    isEdit: true,
    search: true,
    default: null,
    type: 'password',
  },
  {
    column: 'sequence',
    label: '排序',
    isShow: true,
    isEdit: true,
    search: true,
    default: null,
    type: 'input',
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
    option: {
      method: tenantApis.loadTenantList,
      condition: {},
      default: [],
      key: 'name',
      value: 'id',
    },
    type: 'select',
  });
}

const appId = ref(1);
let currentRow = null;
const options = reactive([
  {
    name: '授权角色',
    slot: 'authorityRole',
    method: (row) => {
      selectAppDialog.value = true;
      currentRow = row;
    },
    icon: 'Plus',
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

function selectAppHandle() {
  selectAppDialog.value = false;
  authorizeRole.value.openDialog(currentRow);
}
</script>

<style scoped lang="scss">
.wrap {
  width: 100%;
  height: 100%;
}
</style>

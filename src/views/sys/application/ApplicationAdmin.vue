<template>
  <div class="wrap">
    <tq-table
      :apis="apis"
      :columns="columns"
      :main-name="mainName"
      :condition="condition"
      :rules="rules"
      :methods="methods"
    >
    </tq-table>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import apis from 'api/application';
import TqTable from 'components/TqTable.vue';

const mainName = ref('应用');
const condition = reactive({});
const methods = reactive({
  list: apis.loadAppListByPage,
  save: apis.saveApplication,
  update: apis.updateApplication,
  remove: apis.removeApplicationByPage,
  batchRemove: apis.batchRemoveApplicationByPage,
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
    column: 'appKey',
    label: '应用Key',
    isShow: true,
    isEdit: true,
    type: 'input',
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

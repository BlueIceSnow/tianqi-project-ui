<template>
  <div>
    <el-dialog
      v-model="authorityApplicationDialogShow"
      :title="props.dialogTitle"
      width="60%"
    >
      <div class="dialogTableWrap">
        <el-table
          ref="multipleTable"
          :data="tableData"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" />
          <template v-for="field in showFields">
            <el-table-column :property="field.column" :label="field.label" />
          </template>
        </el-table>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="authorityApplicationDialogShow = false"
            >取消</el-button
          >
          <el-button type="primary" @click="submit"
            ><span v-html="props.submitTitle"></span
          ></el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { reactive, ref, defineExpose, defineProps, onMounted } from 'vue';

const props = defineProps([
  'dialogTitle',
  'submitTitle',
  'showFields',
  'relationKey',
  'relationSubKey',
  'mainParamKey',
  'subParamKey',
  'submitMethod',
  'loadDataMethod',
  'loadRelationDataMethod',
  'constSubmitParams',
]);

const authorityApplicationDialogShow = ref(false);
const currentRow = ref(null);
const currentSelectionRows = ref([]);
const tableData = reactive([]);
const multipleTable = ref();
onMounted(() => {
  props.loadDataMethod().then((res) => {
    tableData.push(...res.row);
  });
});

function handleSelectionChange(row) {
  currentSelectionRows.value.splice(0, currentSelectionRows.value.length);
  currentSelectionRows.value.push(...row);
}

/**
 * 提交关系绑定
 */
function submit() {
  const mainKey = props.mainParamKey;
  const subKey = props.subParamKey;
  const params = {};
  params[mainKey] = currentRow.value[props.relationKey];
  params[subKey] = currentSelectionRows.value
    .map((item) => item[props.relationKey])
    .toString();
  props.submitMethod({ params, ...props.constSubmitParams }).then((res) => {
    authorityApplicationDialogShow.value = false;
  });
}

/**
 * 打开弹窗
 * @param row
 */
function openDialog(row) {
  authorityApplicationDialogShow.value = true;
  currentRow.value = row;
  currentSelectionRows.value = [];
  multipleTable.value?.clearSelection();
  props.loadRelationDataMethod(row[props.relationKey]).then((res) => {
    const keys = res.row.map((item) => item[props.relationSubKey]);
    const needSelectedRows = tableData.filter(
      (item) => keys.indexOf(item[props.relationKey]) > -1
    );
    needSelectedRows.forEach((item) => {
      multipleTable.value.toggleRowSelection(item, true);
    });
  });
}
defineExpose({
  openDialog,
});
</script>

<style scoped>
.dialogTableWrap {
  width: 100%;
  height: 400px;
  overflow-y: auto;
}
</style>

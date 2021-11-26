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
import { reactive, ref, onMounted, watch } from 'vue';

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
  'constQueryParams',
]);

watch(
  () => props.constQueryParams,
  () => {
    tableData.splice(0, tableData.length);
    props.loadDataMethod(props.constQueryParams).then((res) => {
      tableData.push(...res.row);
      const queryParams = {};
      if (currentRow.value) {
        queryParams[props.mainParamKey] = currentRow.value[props.relationKey];
      }
      props
        .loadRelationDataMethod({ ...queryParams, ...props.constQueryParams })
        .then((res) => {
          const keys = res.row.map((item) => item[props.relationSubKey]);
          beforeSelectIds.value = new Set([...keys]);
          const needSelectedRows = tableData.filter(
            (item) => keys.indexOf(item[props.relationKey]) > -1
          );
          needSelectedRows.forEach((item) => {
            multipleTable.value.toggleRowSelection(item, true);
          });
          console.log(keys);
        });
    });
  }
);

const authorityApplicationDialogShow = ref(false);
const currentRow = ref(null);
const currentSelectionRows = ref([]);
const tableData = reactive([]);
const multipleTable = ref();
const beforeSelectIds = ref(new Set([]));
onMounted(() => {
  props.loadDataMethod(props.constQueryParams).then((res) => {
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
  const selectedDataIds = currentSelectionRows.value.map(
    (item) => item[props.relationKey]
  );
  params[mainKey] = currentRow.value[props.relationKey];
  params[subKey] = [
    ...new Set(
      [...selectedDataIds].filter((item) => !beforeSelectIds.value.has(item))
    ),
  ].toString();
  params[`${subKey}Deleted`] = [
    ...new Set(
      [...beforeSelectIds.value].filter(
        (item) => !new Set([...selectedDataIds]).has(item)
      )
    ),
  ].toString();

  props.submitMethod({ ...params, ...props.constSubmitParams }).then((res) => {
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
  const queryParams = {};
  queryParams[props.mainParamKey] = row[props.relationKey];
  props
    .loadRelationDataMethod({ ...queryParams, ...props.constQueryParams })
    .then((res) => {
      const keys = res.row.map((item) => item[props.relationSubKey]);
      beforeSelectIds.value = new Set([...keys]);
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

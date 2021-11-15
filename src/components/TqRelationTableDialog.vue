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
import { reactive, ref, defineExpose, defineProps } from 'vue';

const props = defineProps([
  'dialogTitle',
  'submitTitle',
  'showFields',
  'mainKey',
  'subKey',
  'submitMethod',
]);

const authorityApplicationDialogShow = ref(false);
const currentRow = ref(null);
const tableData = reactive([
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-08',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-06',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-07',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]);

function handleSelectionChange(row) {}

function submit() {
  props
    .submitMethod({ mainKey: props.mainKey, subKey: props.subKey })
    .then((res) => {
      console.log(res);
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

<template>
  <el-drawer
    v-model="authorityApplicationDrawerShow"
    :title="props.drawerTitle"
    size="40%"
  >
    <div class="tree-wrap">
      <el-tree
        ref="tree"
        :data="treeData"
        :node-key="props.nodeKey"
        show-checkbox
      >
        <template #default="{ data }">
          {{ data[props.label] }}
        </template>
      </el-tree>
    </div>
    <div class="drawer-footer">
      <el-button @click="authorityApplicationDrawerShow = false"
        >取消</el-button
      >
      <el-button type="primary" @click="submit"
        ><span v-html="props.submitTitle"></span
      ></el-button>
    </div>
  </el-drawer>
</template>

<script setup>
import { defineExpose, defineProps, onMounted, ref } from 'vue';

const props = defineProps([
  'drawerTitle',
  'submitTitle',
  'relationKey',
  'relationSubKey',
  'mainParamKey',
  'subParamKey',
  'submitMethod',
  'loadDataMethod',
  'loadRelationDataMethod',
  'constSubmitParams',
  'nodeKey',
  'label',
]);

const currentRow = ref(null);
const authorityApplicationDrawerShow = ref(false);
const tree = ref();

const treeData = ref([]);
let treeList = [];
onMounted(() => {
  props.loadDataMethod().then((res) => {
    treeData.value.splice(0, treeData.value.length);
    treeList = res.row;
    const tree = buildTree(res.row, -1);
    treeData.value.push(...tree);
  });
});

/**
 * 构建树结构
 * @param list
 * @param parentId
 */
function buildTree(list, parentId) {
  const root = [];
  for (let i = 0; i < list.length; i++) {
    if (list[i].parentId === parentId) {
      root.push(list[i]);
      const children = buildTree(list, list[i].id);
      list[i].children = children;
    }
  }
  return root;
}

/**
 * 提交关系绑定
 */
function submit() {
  const mainKey = props.mainParamKey;
  const subKey = props.subParamKey;
  const params = {};
  params[mainKey] = currentRow.value[props.relationKey];
  params[subKey] = tree.value
    .getCheckedNodes(false, true)
    .map((item) => item[props.relationKey])
    .toString();
  props.submitMethod({ ...params, ...props.constSubmitParams }).then((res) => {
    authorityApplicationDialogShow.value = false;
  });
}
/**
 * 打开弹窗
 * @param row
 */
function openDrawer(row) {
  authorityApplicationDrawerShow.value = true;
  currentRow.value = row;
  // props.loadRelationDataMethod(row[props.relationKey]).then((res) => {
  //   const keys = res.row.map((item) => item[props.relationSubKey]);
  setTimeout(() => {
    [1, 3, 40, 45].forEach((item) => {
      const existEle = treeList.find(
        (element) => element[props.relationKey] === item
      );
      if (existEle.children.length === 0) {
        tree.value?.setChecked(existEle[props.relationKey], true);
      }
    });
  }, 1000);

  // });
}
defineExpose({
  openDrawer,
});
</script>

<style scoped>
.tree-wrap {
  width: 95%;
  height: 75%;
  overflow-y: auto;
  position: absolute;
}

.drawer-footer {
  width: 100%;
  height: 10%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0px;
}
</style>

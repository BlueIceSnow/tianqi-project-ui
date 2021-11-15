<template>
  <div class="resource-admin">
    <el-tabs
      v-model="activeAppName"
      tab-position="left"
      @tab-click="changeActiveAppHandle"
    >
      <el-tab-pane
        v-for="(application, index) in applicationList"
        :label="application.name"
        :name="application.name"
        :key="index"
      >
        <slot :application="application"></slot>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import apis from 'api/application';

const activeAppName = ref('app');
const applicationList = reactive([]);

apis.loadApplicationListByCurrentUser().then((res) => {
  applicationList.slice(0, applicationList.length);
  applicationList.push(...res.row);
  if (res.row.length !== 0) {
    activeAppName.value = res.row[0].name;
  }
});
/**
 * 切换选项卡触发事件
 * @param tabName 选项卡名称
 */
function changeTabHandle(tabName) {}
function changeActiveAppHandle(tabName) {}
</script>

<style scoped>
.resource-admin {
  height: 100%;
}
.resource-admin :deep(.el-tabs__content) {
  height: calc(100% - 30px);
  overflow-y: auto;
}
.resource-admin :deep(.el-tabs) {
  height: 100%;
}
</style>

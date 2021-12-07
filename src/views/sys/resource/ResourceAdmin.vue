<template>
  <div class="resource-admin">
    <el-tabs class="sub-tabs" v-model="activeTabName" type="border-card">
      <el-tab-pane label="菜单资源" name="menuRes">
        <menu-res :app-id="appId" />
      </el-tab-pane>
      <el-tab-pane label="接口资源" name="urlRes"
        ><url-res :app-id="appId"
      /></el-tab-pane>
      <el-tab-pane label="数据资源" name="dataRes">数据资源</el-tab-pane>
      <el-tab-pane label="按钮资源" name="buttonRes"
        ><button-res :app-id="appId"
      /></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useStore } from 'vuex';
import MenuRes from './MenuRes.vue';
import UrlRes from './UrlRes.vue';
import ButtonRes from './ButtonRes.vue';

const store = useStore();
const appId = store.getters['user/currentApplication'].id;

const activeTabName = ref('menuRes');
</script>

<style scoped>
.resource-admin {
  height: 100%;
}
.resource-admin :deep(.el-tabs__content) {
  height: calc(100% - 60px);
  overflow-y: auto;
}
.resource-admin :deep(.el-tabs) {
  height: 100%;
}
</style>

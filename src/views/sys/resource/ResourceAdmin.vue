<template>
  <div class="resource-admin">
    <el-tabs
      v-model="activeAppName"
      tab-position="left"
      @tab-click="changeActiveAppHandle"
    >
      <el-tab-pane label="认证平台" name="app0">
        <el-tabs
          class="sub-tabs"
          v-model="activeTabName"
          type="border-card"
          @tab-click="changeTabHandle"
        >
          <el-tab-pane label="菜单资源" name="menuRes">
            <menu-res :appId="1" />
          </el-tab-pane>
          <el-tab-pane label="接口资源" name="urlRes"><url-res /></el-tab-pane>
          <el-tab-pane label="数据资源" name="dataRes">数据资源</el-tab-pane>
          <el-tab-pane label="按钮资源" name="buttonRes"
            ><button-res :app-id="1"
          /></el-tab-pane>
        </el-tabs>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import MenuRes from './MenuRes.vue';
import UrlRes from './UrlRes.vue';
import ButtonRes from './ButtonRes.vue';

const activeTabName = ref('menuRes');
const activeAppName = ref('app0');
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

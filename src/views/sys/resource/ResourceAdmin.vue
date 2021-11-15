<template>
  <div class="resource-admin">
    <tq-application-tab>
      <template #default="{ application }">
        <el-tabs class="sub-tabs" v-model="activeTabName" type="border-card">
          <el-tab-pane label="菜单资源" name="menuRes">
            <menu-res :appId="application.id" />
          </el-tab-pane>
          <el-tab-pane label="接口资源" name="urlRes"
            ><url-res :appId="application.id"
          /></el-tab-pane>
          <el-tab-pane label="数据资源" name="dataRes">数据资源</el-tab-pane>
          <el-tab-pane label="按钮资源" name="buttonRes"
            ><button-res :app-id="application.id"
          /></el-tab-pane>
        </el-tabs>
      </template>
    </tq-application-tab>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import TqApplicationTab from 'components/TqApplicationTab.vue';
import MenuRes from './MenuRes.vue';
import UrlRes from './UrlRes.vue';
import ButtonRes from './ButtonRes.vue';

const activeTabName = ref('menuRes');
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

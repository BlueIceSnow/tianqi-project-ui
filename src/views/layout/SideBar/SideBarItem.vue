<template>
  <el-sub-menu :index="menu.id.toString()" :key="menu.id">
    <template #title>
      <Item :icon="menu.icon" :title="menu.name"></Item>
    </template>
    <el-menu-item
      v-if="menu.child.length === 0"
      :index="menu.id.toString()"
      @click="clickItem(menu.name, menu.url, menu.closeable.value, menu.id)"
    >
      <i :class="menu.icon"></i> {{ menu.name }}</el-menu-item
    >
  </el-sub-menu>
</template>

<script setup>
import Item from 'views/layout/SideBar/Item.vue';
import { useStore } from 'vuex';

const store = useStore();
defineProps(['menu']);
function clickItem(title, url, closable, index) {
  store.commit('app/ADD_TAG', { name: title, url, closable, index });
}
</script>

<style scoped></style>

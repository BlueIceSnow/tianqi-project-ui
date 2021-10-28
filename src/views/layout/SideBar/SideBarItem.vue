<template>
  <template v-if="menu.extField.isShow">
    <el-sub-menu
      v-if="menu.child.length !== 0 && !menu.extField.isGroup"
      :index="menu.id.toString()"
      :key="menu.id"
      @click.stop
      popper-append-to-body
    >
      <template #title>
        <Item :icon="menu.icon" :title="menu.name"></Item>
      </template>
      <side-bar-item
        v-for="child in menu.child"
        :menu="child"
        :key="child.id.toString()"
      ></side-bar-item>
    </el-sub-menu>
    <template v-else>
      <el-menu-item
        v-if="!menu.extField.isGroup"
        :index="menu.id.toString()"
        @click="clickItem(menu.name, menu.url, menu.closeable.value, menu.id)"
      >
        <i :class="menu.icon"></i>
        <template #title>{{ menu.name }}</template></el-menu-item
      >
      <el-menu-item-group v-else>
        <template #title>{{ menu.name }}</template>
        <side-bar-item
          v-for="child in menu.child"
          :menu="child"
          :key="child.id.toString()"
        ></side-bar-item>
      </el-menu-item-group>
    </template>
  </template>
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

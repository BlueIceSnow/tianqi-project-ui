<template>
  <div class="sideBar">
    <el-scrollbar>
      <div class="topLogo">
        <img
          class="logo"
          src="https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png"
          alt="Logo"
        />
        <div v-show="!showSideBar" class="title">智慧</div>
      </div>
      <el-menu
        :collapse-transition="false"
        mode="vertical"
        :collapse="showSideBar"
        :uniqueOpened="true"
        class="realSideBar"
        background-color="#303133"
        text-color="#fff"
        active-text-color="#ffd04b"
        :default-active="
          currentMenuItem.index ? currentMenuItem.index.toString() : '1'
        "
      >
        <side-bar-item
          v-for="menu in menus"
          :menu="menu"
          :key="menu.id"
        ></side-bar-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { computed } from 'vue';
import SideBarItem from './SideBarItem.vue';

const store = useStore();
const showSideBar = computed(() => store.getters['app/showSideBar']);
const currentMenuItem = computed(() => store.getters['app/currentOpenTag']);
const menus = store.getters['user/userInfo'].menus;
</script>

<style lang="scss" scoped>
@import 'styles/size/layout';

.sideBar {
  width: 100%;
  height: 100%;
  background-color: #303133;

  .topLogo {
    height: $logoContainerHeight;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;

    .logo {
      width: $logoWidth;
      height: $logoHeight;
    }

    .title {
      padding-left: 10px;
      height: $logoContainerHeight;
      line-height: $logoContainerHeight;
      color: white;
    }
  }
}

.el-menu {
  border: 0;
}
</style>

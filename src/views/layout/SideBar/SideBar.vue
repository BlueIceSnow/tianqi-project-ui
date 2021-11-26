<template>
  <div class="sideBar">
    <el-scrollbar>
      <div class="topLogo">
        <svg
          t="1637889307264"
          class="logo"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="33997"
          width="64"
          height="64"
        >
          <path
            d="M213.333333 874.666667C96 874.666667 0 778.666667 0 661.333333c0-76.8 42.666667-147.2 106.666667-185.6v-17.066666c0-100.266667 81.066667-181.333333 181.333333-181.333334 21.333333 0 44.8 4.266667 66.133333 12.8C403.2 192 505.6 128 618.666667 128c164.266667 0 298.666667 134.4 298.666666 298.666667v17.066666c66.133333 42.666667 106.666667 117.333333 106.666667 196.266667 0 115.2-85.333333 213.333333-198.4 232.533333-4.266667 2.133333-10.666667 2.133333-14.933333 2.133334H213.333333zM170.666667 541.866667c-51.2 19.2-85.333333 66.133333-85.333334 119.466666 0 70.4 57.6 128 128 128h593.066667c74.666667-8.533333 132.266667-72.533333 132.266667-149.333333 0-57.6-34.133333-110.933333-85.333334-134.4-17.066667-8.533333-27.733333-25.6-23.466666-44.8 2.133333-12.8 2.133333-23.466667 2.133333-34.133333 0-117.333333-96-213.333333-213.333333-213.333334-93.866667 0-174.933333 59.733333-202.666667 149.333334-4.266667 12.8-14.933333 23.466667-27.733333 27.733333-12.8 4.266667-27.733333 2.133333-38.4-6.4-17.066667-12.8-38.4-21.333333-59.733334-21.333333C234.666667 362.666667 192 405.333333 192 458.666667c0 10.666667 2.133333 19.2 4.266667 29.866666 6.4 21.333333-4.266667 44.8-25.6 53.333334z"
            fill="#4ab8f1"
            p-id="33998"
          ></path>
          <path
            d="M618.666667 384c36.266667 0 64 27.733333 64 64 0 23.466667 19.2 42.666667 42.666666 42.666667s42.666667-19.2 42.666667-42.666667c0-83.2-66.133333-149.333333-149.333333-149.333333-23.466667 0-42.666667 19.2-42.666667 42.666666s19.2 42.666667 42.666667 42.666667"
            fill="#4ab8f1"
            p-id="33999"
          ></path>
        </svg>
        <div v-show="!showSideBar" class="title">云认证平台</div>
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

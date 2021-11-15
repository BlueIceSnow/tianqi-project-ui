<template>
  <div class="nav-bar-container">
    <el-page-header
      :title="isOpen ? '打开菜单' : '关闭菜单'"
      @click.stop="changeSideBar"
      :icon="isOpen ? 'el-icon-s-fold' : 'el-icon-s-unfold'"
    >
      <template #icon
        ><el-icon><expand v-if="isOpen" /><fold v-else /></el-icon
      ></template>
      <template #content>
        <div style="height: 40px; line-height: 40px; padding-top: 13px">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item
              v-for="router in matchedRouters"
              :key="router.meta.url"
              :to="{ path: router.meta.url }"
              >{{ router.meta.title }}</el-breadcrumb-item
            >
          </el-breadcrumb>
        </div>
      </template>
    </el-page-header>
    <div
      style="
        height: 40px;
        width: 200px;
        padding: 5px;
        padding-right: 20px;
        display: flex;
        flex-direction: row;
        flex-flow: row-reverse;
      "
    >
      <el-space wrap :size="10">
        <el-dropdown @command="handleCommand">
          <el-avatar
            shape="square"
            :size="40"
            fit="fit"
            src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80"
          ></el-avatar>

          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="logout">个人信息</el-dropdown-item>
              <el-dropdown-item command="logout">修改密码</el-dropdown-item>
              <el-dropdown-item command="logout">组织信息</el-dropdown-item>
              <el-dropdown-item command="logout">更换头像</el-dropdown-item>
              <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown></el-space
      >
      <el-space wrap :size="10" v-if="hasFullScreen">
        <el-tooltip
          class="item"
          effect="dark"
          :content="isFullScreen ? '取消全屏' : '全屏'"
          placement="bottom-start"
        >
          <img
            :src="isFullScreen ? '/cancel-full.png' : '/full.png'"
            @click="fullScreen"
            style="width: 40px; height: 40px; border-radius: 10px"
          />
        </el-tooltip>
      </el-space>
    </div>
  </div>
</template>

<script setup>
import { computed, getCurrentInstance, onMounted, ref, watch } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const isOpen = computed(() => store.getters['app/showSideBar']);
const isFullScreen = computed(() => store.getters['app/fullScreen']);
const hasFullScreen = computed(() => store.getters['app/size'] === 'pc');
const matchedRouters = store.getters['app/matchedRouters'];
let instance;
onMounted(() => {
  instance = getCurrentInstance();
});
function changeSideBar() {
  store.dispatch('app/CHANGE_SHOW_SIDE_BAR');
}

/**
 * 处理下拉菜单点击事件
 * @param command
 */
function handleCommand(command) {}

/**
 * 全屏
 */
function fullScreen() {
  const element = document.documentElement;
  if (isFullScreen.value) {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
    store.commit('app/CHANGE_IS_FULL_SCREEN');
    return;
  }
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  }
  store.commit('app/CHANGE_IS_FULL_SCREEN');
}
</script>

<style lang="scss" scoped>
@import 'styles/size/layout';
.el-page-header,
.el-page-header__content {
  background-color: white;
  padding: 5px;
  width: calc(100% - 10px);
  height: calc(#{$navBarHeight} - 10px);
  line-height: calc(#{$navBarHeight} - 10px);
}
.nav-bar-container {
  box-shadow: 0px 1px 4px gainsboro;
  display: flex;
  flex-direction: row;
  z-index: 10;
}
</style>

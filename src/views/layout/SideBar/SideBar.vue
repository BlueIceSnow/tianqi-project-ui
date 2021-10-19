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
        :default-active="currentMenuItem.index"
      >
        <el-sub-menu index="1">
          <template #title>
            <i class="el-icon-location"></i>
            <span>导航一</span>
          </template>
          <el-menu-item-group>
            <template #title>分组一</template>
            <el-menu-item
              index="2"
              @click="clickItem('选项2', '/demo2', true, 2)"
              >选项2</el-menu-item
            >
            <el-menu-item
              index="3"
              @click="clickItem('选项1', '/demo', true, 3)"
              >选项3</el-menu-item
            >
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-sub-menu index="4">
            <template #title>选项4</template>
            <el-menu-item
              @click="clickItem('选项3', '/demo2/demo3', true, 4)"
              index="1-4-1"
              >选项1</el-menu-item
            >
          </el-sub-menu>
        </el-sub-menu>
        <el-menu-item index="6">
          <i class="el-icon-menu"></i>
          <template #title>导航二</template>
        </el-menu-item>
        <el-menu-item index="7" disabled>
          <i class="el-icon-document"></i>
          <template #title>导航三</template>
        </el-menu-item>
        <el-menu-item index="8">
          <i class="el-icon-setting"></i>
          <template #title>导航四</template>
        </el-menu-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { computed } from 'vue';

const store = useStore();
const showSideBar = computed(() => store.getters['app/showSideBar']);
const currentMenuItem = computed(() => store.getters['app/currentOpenTag']);
function clickItem(title, url, closable, index) {
  store.commit('app/ADD_TAG', { name: title, url, closable, index });
}
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

<template>
  <div class="container">
    <div
      :class="
        'widthTransition ' +
        (isPc
          ? showSideBar
            ? 'leftContentShrink'
            : 'leftContentExtend'
          : showSideBar
          ? 'leftContentFloatShrink'
          : 'leftContentFloatExtend')
      "
    >
      <SideBar />
    </div>
    <div
      :class="
        'widthTransition ' +
        (isPc
          ? showSideBar
            ? 'rightContent'
            : 'rightContentSmall'
          : 'rightContentAll')
      "
    >
      <NavBar />
      <LabelBar />
      <MainContent />
    </div>
  </div>
</template>

<script setup>
import LabelBar from 'views/layout/LabelBar/LabelBar.vue';
import MainContent from 'views/layout/MainContent/MainContent.vue';
import NavBar from 'views/layout/NavBar/NavBar.vue';
import SideBar from 'views/layout/SideBar/SideBar.vue';
import { computed, onMounted, ref, toRef } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const showSideBar = computed(() => {
  if (!isPc.value) {
    // 如果不是PC，则向DOM添加事件，关闭左侧浮动菜单
    if (store.getters['app/showSideBar']) {
      document.removeEventListener('click', closeFn);
    } else {
      document.addEventListener('click', closeFn);
    }
  }
  return store.getters['app/showSideBar'];
});
const isPc = computed(() => store.getters['app/size'] === 'pc');
const closeFn = () => {
  store.dispatch('app/CHANGE_SHOW_SIDE_BAR');
};
</script>

<style lang="scss" scoped>
@import 'styles/size/layout';

.widthTransition {
  transition: width, 0.3s;
}
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  & .leftContentShrink {
    width: $sideWidthShrink;
    height: 100%;
    background-color: chocolate;
    overflow-x: hidden;
    overflow-y: auto;
  }
  & .leftContentExtend {
    width: $sideWidthExtend;
    height: 100%;
    background-color: chocolate;
    overflow-x: hidden;
    overflow-y: auto;
  }

  & .leftContentFloatShrink {
    width: 0;
    height: 100%;
    background-color: chocolate;
    overflow-x: hidden;
    overflow-y: auto;
    z-index: 9999;
  }
  & .leftContentFloatExtend {
    width: $sideWidthExtend;
    height: 100%;
    background-color: chocolate;
    overflow-x: hidden;
    overflow-y: auto;
    z-index: 9999;
  }

  & .rightContent {
    width: calc(100vw - #{$sideWidthShrink});
    height: 100%;
    display: flex;
    flex-direction: column;
    position: absolute;
    left: $sideWidthShrink;
  }
  & .rightContentAll {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: absolute;
  }
  & .rightContentSmall {
    width: calc(100vw - #{$sideWidthExtend});
    height: 100%;
    display: flex;
    position: absolute;
    left: $sideWidthExtend;
    flex-direction: column;
  }
}
</style>

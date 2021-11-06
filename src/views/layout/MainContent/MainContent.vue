<template>
  <div class="content">
    <router-view v-slot="{ Component }">
      <transition name="fade-transform" mode="out-in" appear>
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
@import 'styles/size/layout';

.content {
  width: calc(100% - 20px);
  height: calc(100vh - (#{$navBarHeight + $labelBarHeight} + 20px));
  padding: 10px;
  position: relative;
  background-color: white;
  overflow: hidden;
  overflow-y: auto;
}

/* fade-transform */
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.5s;
}

.fade-transform-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>

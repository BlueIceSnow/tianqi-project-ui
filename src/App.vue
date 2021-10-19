<template>
  <router-view v-slot="{ Component }">
    <transition>
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<script setup>
import { useStore } from 'vuex';

const store = useStore();
window.addEventListener('resize', () => {
  const result = window.matchMedia('(min-width: 480px)').matches;
  const payload = result ? 'pc' : 'mobile';
  if (store.getters['app/size'] !== payload) {
    store.dispatch('app/SET_SIZE', payload);
  }
});
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
}
html,
body,
#app {
  width: 100%;
  height: 100%;
}

.fade-enter-active,
.fade-leave-active {
  transition: all, 0.28s;
}

.fade-enter,
.fade-leave-to {
  opacity: 1;
}
.fade-enter-to,
.fade-leave {
  opacity: 0.2;
}
.cover {
  //width: 100%;
  //height: 100%;
  //position: absolute;
  //left: 0px;
  //top: 0px;
  //background-color: white;
}
</style>

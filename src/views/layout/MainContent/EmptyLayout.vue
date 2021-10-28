<template>
  <router-view v-slot="{ Component }">
    <transition name="fade-transform" mode="out-in" appear>
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script setup></script>

<style scoped></style>

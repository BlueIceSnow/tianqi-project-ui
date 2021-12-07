<template>
  <div>
    <Role :appId="appId"></Role>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
import Role from './Role.vue';

const store = useStore();
const appId = store.getters['user/currentApplication'].id;
</script>

<style scoped lang="scss"></style>

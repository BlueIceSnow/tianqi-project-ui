<template>
  <div>
    <Organization :appId="appId"></Organization>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
import Organization from './Organization.vue';

const store = useStore();
const appId = store.getters['user/currentApplication'].id;
</script>

<style scoped lang="scss"></style>

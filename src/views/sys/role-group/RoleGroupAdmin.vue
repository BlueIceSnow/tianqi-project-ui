<template>
  <div>
    <RoleGroup :appId="appId"></RoleGroup>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
import RoleGroup from './RoleGroup.vue';

const store = useStore();
const appId = store.getters['user/currentApplication'].id;
</script>

<style scoped lang="scss"></style>

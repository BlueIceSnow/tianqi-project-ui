<template>
  <div>
    <tq-application-tab>
      <template #default="{ application }">
        <RoleGroup :appId="application.id"></RoleGroup>
      </template>
    </tq-application-tab>
  </div>
</template>

<script setup>
import TqApplicationTab from 'components/TqApplicationTab.vue';
import RoleGroup from './RoleGroup.vue';
</script>

<style scoped lang="scss"></style>

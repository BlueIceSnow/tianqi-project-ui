<template>
  <div>
    <tq-application-tab>
      <template #default="{ application }">
        <Organization :appId="application.id"></Organization>
      </template>
    </tq-application-tab>
  </div>
</template>

<script setup>
import TqApplicationTab from 'components/TqApplicationTab.vue';
import Organization from './Organization.vue';
</script>

<style scoped lang="scss"></style>

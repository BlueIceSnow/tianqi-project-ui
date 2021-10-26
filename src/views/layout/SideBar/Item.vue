<template>
  <div ref="root"></div>
</template>

<script setup>
import { h, onMounted, ref, render } from 'vue';

const prop = defineProps(['icon', 'title']);
const root = ref(null);
onMounted(() => {
  const vNode = h('div', [h('i', { class: prop.icon }), h('span', prop.title)]);
  render(vNode, root.value);
});
</script>

<style scoped></style>

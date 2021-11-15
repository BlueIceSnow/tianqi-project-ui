<template>
  <div ref="root">
    <el-icon><component :is="props.icon"></component></el-icon>
    <span v-html="props.title"></span>
  </div>
</template>

<script setup>
import { h, onMounted, ref, render } from 'vue';

const props = defineProps(['icon', 'title']);
const root = ref(null);
onMounted(() => {
  // const vNode = h('div', [h('i', { class: prop.icon }), h('span', prop.title)]);
  // render(vNode, root.value);
});
</script>

<style scoped></style>

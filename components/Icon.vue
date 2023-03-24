<template>
  <img class="w-4 h-4" :src="`/icons/${type}.svg`" />
</template>

<script setup lang="ts">
const props = defineProps({
  type: String
})
</script>

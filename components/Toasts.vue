<template>
  <div class="absolute w-full p-safe flex flex-col gap-2 z-[50]">
    <Toast 
      v-for="t in 2"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  type: String,
  invert: Boolean,
  size: String
})
</script>

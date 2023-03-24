<template>
  <div
    class="w-full p-2 flex justify-center align-center text-md text-dark-100 bg-white-100"
    :class="disabled ? '!bg-white-20' : ''"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  type: String,
  disabled: Boolean
})
</script>

<style scoped>
</style>

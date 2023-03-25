<template>
  <div
    v-if="type === 'dark'"
    class="w-full flex justify-center items-center text-white-100 bg-dark-50 backdrop-blur-md"
    :class="`${ disabled ? '!bg-white-20' : '' } ${ padding ? `p-${padding}` : 'p-1.5' }`"
  >
    <slot></slot>
  </div>
  <div
    v-else
    class="w-full flex justify-center items-center text-dark-100 bg-white-100"
    :class="`${ disabled ? '!bg-white-20' : '' } ${ padding ? `p-${padding}` : 'p-1.5' }`"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  type: String,
  disabled: Boolean,
  padding: String
})
</script>

<style scoped>
</style>

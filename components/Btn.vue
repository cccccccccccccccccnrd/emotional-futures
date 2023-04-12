<template>
  <div
    v-if="type === 'dark'"
    class="w-full flex justify-center items-center font-bold text-white-100 bg-dark-50 backdrop-blur-md border-2 border-transparent"
    :class="[disabled ? '!bg-dark-20' : '', padding ? `p-${padding}` : 'p-2']"
  >
    <slot />
  </div>
  <div
    v-else
    class="w-full flex justify-center items-center font-bold text-dark-100 bg-white-100 border-2 border-transparent"
    :class="[disabled ? '!bg-dark-20' : '', padding ? `p-${padding}` : 'p-2']"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  type: String,
  disabled: Boolean,
  padding: String
})
</script>

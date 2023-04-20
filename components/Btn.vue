<template>
  <div
    class="w-full flex justify-center items-center font-bold  backdrop-blur-md border-2 border-transparent"
    :class="[disabled ? '!bg-white-20' : '', padding ? padding : 'p-2', type === 'dark' ? 'text-white-100 bg-dark-50' : 'text-dark-100 bg-white-100']"
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

const padding = computed(() => {
  if (props.padding === '1') return 'p-1'
  if (props.padding === '1.5') return 'p-1.5'
  return 'p-2'
})
</script>

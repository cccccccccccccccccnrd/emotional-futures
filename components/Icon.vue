<template>
  <img
    :class="`${invert ? 'invert' : ''} ${size}`"
    :src="`/icons/${type}.svg`"
  />
</template>

<script setup lang="ts">
const props = defineProps({
  type: String,
  invert: Boolean,
  size: String
})

const size = computed(() => {
  if (props.size === 's') return 'w-[14px] h-[14px]'
  if (props.size === 's/m') return 'w-[16px] h-[16px]'
  if (props.size === 'm') return 'w-[20px] h-[20px]'
  if (props.size === 'l') return 'w-[40px] h-[40px]'
  return 'w-[18px] h-[18px]'
})
</script>

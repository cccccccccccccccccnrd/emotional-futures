<template>
  <img
    :class="`${invert ? 'invert' : ''} ${size} ${flash ? 'flash' : ''}`"
    :src="`/icons/${type}.svg`"
  />
</template>

<script setup lang="ts">
const props = defineProps({
  type: String,
  invert: Boolean,
  size: String,
  flash: Boolean
})

const size = computed(() => {
  if (props.size === 's') return 'w-[14px] h-[14px]'
  if (props.size === 's/m') return 'w-[16px] h-[16px]'
  if (props.size === 'm') return 'w-[20px] h-[20px]'
  if (props.size === 'l') return 'w-[40px] h-[40px]'
  return 'w-[18px] h-[18px]'
})
</script>

<style scoped>
.flash {
  animation: flash 800ms infinite alternate ease-in-out;
}

@keyframes flash {
  from {
    filter: none;
  }
  to {
    filter: invert(74%) sepia(83%) saturate(354%) hue-rotate(360deg) brightness(105%) contrast(84%);
  }
}
</style>

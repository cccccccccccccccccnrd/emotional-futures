<template>
  <div
    class="flex justify-between items-center h-[55px] px-5 bg-dark-50 backdrop-blur-md border-2 border-white-20"
    :class="disabled ? 'opacity-50' : ''"
  >
    <p class="capitalize">{{ title }}</p>
    <div v-if="icon && !disabled" class="flex gap-2 justify-center items-center">
      <Icon :type="icon" />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: false
  },
  disabled: {
    type: Boolean,
    required: false
  }
})
</script>

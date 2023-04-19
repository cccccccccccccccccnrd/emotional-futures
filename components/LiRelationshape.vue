<template>
  <div
    class="w-full h-full flex justify-center items-center backdrop-blur-md bg-cover bg-dark-50 border-2 rounded-md"
    :class="selected ? 'border-white-80' : 'border-transparent'"
    :style="
      selected ? 'filter: drop-shadow(0 0 0.25rem rgba(255, 255, 255, 0.5)' : ''
    "
  >
    <div
      v-if="available"
      class="relative flex justify-center items-center w-full h-full"
    >
      <img
        class="absolute p-2"
        :src="`/imgs/relationshapes/${relationshape?.id}.png`"
      />
      <p class="absolute text-sm capitalize w-full bottom-0 p-2 text-center">
        {{ relationshape.name }}
      </p>
    </div>
    <div v-else class="relative flex flex-col justify-center items-center w-full h-full">
      <p class="text-sm">Collect</p>
      <div class="p-1 flex gap-1 justify-center items-center">
        <p class="text-lg">{{ relationshape.collect }}</p>
        <img
          :src="`/imgs/drop-blood.png`"
          class="w-4"
        />
      </div>
      <p class="text-sm">to unlock</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  relationshape: {
    type: Object,
    required: true
  },
  selected: {
    type: Boolean,
    required: false
  },
  available: {
    type: Boolean,
    default: true,
    required: false
  }
})
</script>

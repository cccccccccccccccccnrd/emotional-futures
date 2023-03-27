<template>
  <div
    class="w-full h-full flex justify-center items-center p-5 backdrop-blur-md bg-cover bg-dark-50 border-2 rounded-sm"
    :class="selected ? 'border-white-80' : 'border-transparent'"
  >
    <img class="absolute p-2" :src="`/imgs/relationshapes/${relationshape?.id}.png`"/>
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
  }
})
</script>

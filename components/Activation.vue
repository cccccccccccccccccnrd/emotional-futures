<template>
  <div
    class="w-full h-full flex flex-col p-5 border-2 border-white-20 backdrop-blur-md bg-cover bg-dark-50"
    :style="emotion?.id ? `background-image: url('/imgs/emotions/${emotion.id}.png')` : ''"
  >
    <div>
      <p class="text-xs text-white-80 text-center">Accounterpart</p>
      <p class="text-xs text-white-100 text-center">{{ accounterpart.name }}</p>
    </div>
    <div v-if="emotion?.id" class="grow flex justify-center items-center">
      <Btn class="text-sm font-bold">Confirm Emotion</Btn>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  accounterpart: {
    type: Object,
    required: true
  },
  emotion: {
    type: Object,
    required: false
  },
  relationshape: {
    type: Object,
    required: false
  }
})
</script>

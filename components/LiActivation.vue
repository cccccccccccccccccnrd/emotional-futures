<template>
  <div
    class="flex justify-between items-center h-[55px] px-5 bg-dark-50 backdrop-blur-md border-2 border-white-20"
  >
    <div class="flex flex-col text-xs">
      <p class="capitalize">{{ emotions[activation.type[0]].name }}</p>
      <p class="capitalize">{{ relationshapes[activation.type[1]].name }}</p>
    </div>
    <div>
      <Icon v-if="activation.status === 'created'" type="drop-empty" />
      <Icon v-if="activation.status === 'accepted'" type="drop-half" />
      <Icon v-if="activation.status === 'completed'" type="drop-full" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Activation } from '~/types/futures'

const emotions: any = await useEmotions()
const relationshapes: any = await useRelationshapes()

const props = defineProps({
  activation: {
    type: Object,
    required: true
  }
})
</script>

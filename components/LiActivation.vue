<template>
  <div
    class="flex justify-between items-center h-[55px] px-5 bg-dark-50 backdrop-blur-md border-2 border-white-20"
  >
    <div v-if="accounterpart?.id" class="flex flex-col text-xs">
      <p class="capitalize">{{ emotions[activation.type[0] - 1].name }} {{ relationshapes[activation.type[1] - 1].name }}</p>
      <p>
        with <span class="font-bold">{{ accounterpart?.name }}</span>
      </p>
    </div>
    <div v-else class="flex flex-col text-xs">
      <p class="capitalize">{{ emotions[activation.type[0] - 1].name }}</p>
      <p class="capitalize">
        {{ relationshapes[activation.type[1] - 1].name }}
      </p>
    </div>
    <div class="flex gap-2 justify-center items-center">
      <Icon v-if="activation.status === 'created' && !invitation" type="time" />
      <Icon
        v-if="activation.status === 'created' && invitation"
        type="drop-empty"
      />
      <Icon v-if="activation.status === 'accepted'" type="drop-half" />
      <Icon v-if="activation.status === 'completed'" type="drop-full" />
    </div>
  </div>
</template>

<script setup lang="ts">
const emotions: any = await useEmotions()
const relationshapes: any = await useRelationshapes()

const props = defineProps({
  activation: {
    type: Object,
    required: true
  },
  invitation: {
    type: Boolean,
    required: false
  },
  accounterpart: {
    type: Object,
    required: false
  }
})
</script>

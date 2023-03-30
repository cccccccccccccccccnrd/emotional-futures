<template>
  <div class="h-full p-5 flex flex-col">
    <div class="flex justify-between items-center shrink">
      <p class="text-xl font-bold">Emotions</p>
      <Icon type="menu" />
    </div>
    <div class="flex flex-col grow items-center mt-5 overflow-hidden">
      <p v-if="selectedEmotion.id" class="text-lg font-bold text-center capitalize">
        {{ selectedEmotion.name }}
      </p>
      <p v-else class="text-lg font-bold text-center">Select Emotion</p>
      <div class="w-full flex flex-col items-center mt-5">
        <Emotions v-model="selectedEmotion" :availableEmotions="availableEmotions" />
      </div>
      <div class="w-full mt-5 overflow-scroll">
        <div v-if="completedActivations" class="flex flex-col gap-2">
          <LiActivation
            v-for="a in activationsByEmotion"
            @click="navigateTo(`/activation/${a.id}`)"
            :activation="a"
          />
        </div>
        <p v-else class="text-base font-bold text-center">No Activations</p>
      </div>
    </div>
    <div class="flex justify-center items-end shrink gap-2 mt-5">
      <Btn @click="navigateTo('/accounterparts')" type="dark">
        <Icon type="friends" size="m" />
      </Btn>
      <Btn @click="navigateTo('/emoxy')" type="dark">
        <Icon type="heart" size="m" />
      </Btn>
      <Btn @click="navigateTo('/emotions')">
        <Icon type="emotions" size="m" invert />
      </Btn>
    </div>
  </div>
  <div class="absolute top-0 left-0 h-full w-full z-[-10]">
    <div
      class="h-full w-full flex justify-center items-center bg-[url('/imgs/bg-1.png')] bg-cover"
    ></div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

const activations: any = await useActivations()
const emotions = await useEmotions()

const selectedEmotion = ref({
  id: null,
  name: null,
  color: null,
  prompts: []
})
const completedActivations = computed(() =>
  activations.filter((a: any) => a.status === 'completed')
)
const availableEmotions = computed(() =>
  emotions.filter((e: any) =>
    Array.from(
      new Set(completedActivations.value.map((a: any) => a.type[0]))
    ).includes(e.id)
  )
)

const activationsByEmotion = computed(() =>
  completedActivations.value.filter((a: any) => a.type[0] === selectedEmotion.value.id)
)
</script>

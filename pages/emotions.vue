<template>
  <div class="h-full p-safe flex flex-col">
    <div class="flex justify-between items-center shrink">
      <p class="text-xl font-bold">Emotions</p>
      <Icon type="menu" @click="handleMenuClick" />
    </div>
    <div
      class="flex flex-col grow items-center mt-5 bg-dark-50 backdrop-blur-md border-2 border-white-20 overflow-hidden"
    >
      <p
        v-if="selectedEmotion.name"
        class="mt-5 font-bold text-center capitalize"
      >
        {{ selectedEmotion.name }}
      </p>
      <p v-else class="mt-5 text-center capitalize">
        <span class="font-bold">{{ availableEmotions.length }}</span> Emotions
        Activated
      </p>
      <div class="w-full flex flex-col items-center mt-5">
        <Emotions
          v-model="selectedEmotion"
          :availableEmotions="availableEmotions"
        />
      </div>
      <div
        class="flex flex-col w-full mt-5 px-5 pb-5 overflow-hidden"
        :class="activationsByEmotion.length <= 0 ? 'flex flex-col grow' : ''"
      >
        <div
          v-if="!selectedEmotion?.id"
          class="grow flex flex-col justify-between"
        >
          <div>
            <p class="text-center">
              <span class="font-bold">{{ uniqueActivationTypes.length }}</span>
              Unique Activation{{ uniqueActivationTypes.length > 1 ? 's' : '' }}
            </p>
            <div
              class="w-full h-2 bg-white-20 rounded-full mt-5 overflow-hidden"
            >
              <div
                class="h-full bg-white-100 rounded-full transition-all ease-in-out duration-700"
                :style="`width: ${(uniqueActivationTypes.length / 64) * 100}%;`"
              ></div>
            </div>
          </div>
          <p class="text-xs text-center">
            Select an Emotion to view completed Activations
          </p>
        </div>
        <div
          v-if="activationsByEmotion.length > 0 || selectedEmotion?.id"
          class="flex flex-col overflow-hidden"
        >
          <p class="text-center">
            <span class="font-bold">{{ activationsByEmotion.length }}</span>
            Activation{{ activationsByEmotion.length !== 1 ? 's' : '' }} Played
          </p>
          <div
            class="flex-none w-full h-2 bg-white-20 rounded-full mt-5 overflow-hidden"
          >
            <div
              class="h-full bg-white-100 rounded-full transition-all"
              :style="`width: ${(uniqueRelationshapes.length / 8) * 100}%;`"
            ></div>
          </div>
          <div class="mt-5 overflow-y-scroll">
            <div class="flex flex-col gap-2">
              <LiActivation
                v-for="a in activationsByEmotion"
                @click="navigateTo(`/activation/${a.id}`)"
                :activation="a"
                :accounterpart="accounterpartFromActivation(a)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-center items-end shrink gap-2 mt-5">
      <Btn @click="navigateTo('/accounterparts')" type="dark" padding="1.5">
        <Icon type="accounterparts" size="m" />
      </Btn>
      <Btn @click="navigateTo('/emoxy')" type="dark" padding="1.5">
        <Icon type="heart" size="m" />
      </Btn>
      <Btn @click="navigateTo('/emotions')" padding="1.5">
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

const db = useDb()

const overlay = useOverlay()
const emotions = await useEmotions()

const selectedEmotion = ref({
  id: null,
  name: null,
  color: null,
  prompts: []
})

const completedActivations = computed(() =>
  db.value.activations.filter((a: any) => a.status === 'completed')
)

const availableEmotions = computed(() =>
  emotions.filter((e: any) =>
    Array.from(
      new Set(completedActivations.value.map((a: any) => a.type[0]))
    ).includes(e.id)
  )
)

const uniqueRelationshapes = computed(() =>
  Array.from(new Set(activationsByEmotion.value.map((a: any) => a.type[1])))
)

const uniqueActivationTypes = computed(() =>
  Array.from(new Set(completedActivations.value.map((a: any) => a.type)))
)

const activationsByEmotion = computed(() =>
  completedActivations.value.filter(
    (a: any) => a.type[0] === selectedEmotion.value.id
  )
)

function accounterpartFromActivation(a: any) {
  return db.value.friends.find(
    (f: any) => f.user_id === a.friend_id || f.user_id === a.user_id
  )
}

function handleMenuClick() {
  overlay.value.isOpen = true
  overlay.value.type = 'menu'
}
</script>

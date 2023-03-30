<template>
  <div class="h-full p-5 flex flex-col">
    <div class="flex justify-between items-center">
      <p class="text-xl font-bold">{{ emoxy.name }}</p>
      <Icon type="menu" />
    </div>
    <div class="flex flex-col grow items-center justify-between">
      <div class="flex justify-between w-full">
        <div v-for="(v, i) in emoxy.bst" class="flex justify-center flex-grow mt-5">
          <div class="flex gap-1 justify-center items-center">
            <p class="text-lg">{{ v }}</p>
            <img :src="`/imgs/drop-${ i === 0 ? 'blood' : i === 1 ? 'sweat' : 'tears' }.png`" class="w-4" />
          </div>
        </div>
      </div>
      <div class="h-1/2">
        <Emoxy />
      </div>
      <div class="w-full">
        <div
          class="flex justify-center items-center"
          :class="paused ? 'opacity-0' : 'opacity-1'"
        >
          <Icon type="audio" size="s" />
          <p class="text-xs ml-1.5">Sound playing</p>
        </div>
        <div
          class="w-full flex flex-col p-3 border-2 border-white-30 bg-dark-30 backdrop-blur-md rounded-2xl mt-2"
        >
          <p class="text-sm text-align">
            {{ say }}
          </p>
          <div v-if="!busy" class="flex gap-2 mt-3 text-sm">
            <Btn
              @click="navigateTo('/feed')"
              type="dark"
              padding="1"
              class="rounded-lg"
              >Feed</Btn
            >
            <Btn
              @click="audio.paused ? play() : pause()"
              type="dark"
              padding="1"
              class="rounded-lg"
            >
              <span v-if="paused">Hear</span>
              <Icon v-else type="pause" size="s" />
            </Btn>
          </div>
          <div v-else class="flex gap-2 mt-3 text-sm">
            <Btn
              @click="navigateTo(`/activation/${busy.id}`)"
              type="dark"
              padding="1"
              class="rounded-lg border-2 border-white-80"
              >Ongoing Activation</Btn
            >
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-center items-end gap-2 mt-5">
      <Btn @click="navigateTo('/accounterparts')" type="dark" padding="1.5">
        <Icon type="accounterparts" size="m" />
      </Btn>
      <Btn @click="navigateTo('/emoxy')" padding="1.5">
        <Icon type="heart" size="m" invert />
      </Btn>
      <Btn @click="navigateTo('/emotions')" type="dark" padding="1.5">
        <Icon type="emotions" size="m" />
      </Btn>
    </div>
    <div class="absolute top-0 left-0 h-full w-full z-[-10]">
      <div
        class="h-full w-full flex justify-center items-center bg-[url('/imgs/bg-1.png')] bg-cover"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

const emoxy: any = await useEmoxy()
const activations: any = await useActivations()
const emotions = await useEmotions()
const audio = ref(new Audio('/audios/0.mp3'))
const paused = ref(true)

const busy = computed(() => {
  return activations.find((a: any) => a.status === 'accepted' || a.status === 'created')
})

const say = computed(() => {
  const completed = activations.filter((a: any) => a.status === 'completed')
  if (completed.length === 0) return 'No activations yet'

  return emotions[completed[0].type[0] - 1].say[
    new Set(activations.map((a: any) => a.type[0])).size
  ]
})

function play() {
  paused.value = false
  audio.value.play()
  audio.value.loop = true
}

function pause() {
  paused.value = true
  audio.value.pause()
}

onUnmounted(() => {
  audio.value.pause()
})
</script>

<style scoped></style>

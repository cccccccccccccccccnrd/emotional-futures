<template>
  <div class="h-full p-5 flex flex-col">
    <div class="flex justify-between items-center shrink">
      <p class="text-xl font-bold">Emotions</p>
      <Icon type="menu" />
    </div>
    <div
      class="flex flex-col grow items-center justify-between overflow-hidden"
    >
      <p class="text-lg font-bold text-center mt-5">Select Emotion</p>
      <div class="overflow-scroll mt-5">
        {{ activations }}
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

const emoxy: any = await useEmoxy()
const friends: any = await useFriends()
const activations: any = await useActivations()
</script>

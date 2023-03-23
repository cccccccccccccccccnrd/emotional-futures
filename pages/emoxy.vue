<template>
  <div class="h-full p-4">
    <div class="h-[10%] flex justify-between items-center">
      <div>{{ emoxy.name }}</div>
      <div>Menu</div>
    </div>
    <div class="h-[80%] flex flex-col items-center justify-start">
      <div class="h-[10%]">
        <p>{{ emoxy.bst }}</p>
      </div>
      <div class="h-[70%]">
        <Emoxy />
      </div>
      <div class="h-[20%] flex flex-col justify-end">
        <p>
          This is the Emoxy saying something to the player, it should have up to
          XX characters.
        </p>
        <p v-if="activations.length > 0" class="mt-4">
          You have {{ activations.length }} activations
        </p>
        <div class="flex gap-4 mt-4">
          <Btn @click="navigateTo('/grow')">Grow</Btn>
          <Btn @click="">Hear</Btn>
        </div>
      </div>
    </div>
    <div class="h-[10%] flex justify-center items-center gap-4">
      <Btn @click="navigateTo('/friends')">f</Btn>
      <Btn @click="navigateTo('/emoxy')">o</Btn>
      <Btn @click="navigateTo('/activations')">e</Btn>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

const user = useSupabaseUser()
const emoxy: any = await useEmoxy()
const activations: any = await useActivations()
const friends: any = await useFriends()
</script>

<style scoped></style>

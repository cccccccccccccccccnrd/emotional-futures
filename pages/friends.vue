<template>
  <div class="h-[10%] flex justify-between items-center">
    <div>Friends</div>
    <div>Menu</div>
  </div>
  <div class="h-[80%] flex flex-col items-center justify-start">
    <p v-if="emoxy.friends.length === 0">No connections yet</p>
    <div v-if="friends.length > 0" class="w-full flex flex-col gap-4">
      <div v-for="friend in friends" class="w-full flex flex-col gap-4">
        <div class="w-full flex justify-between items-center">
          <div>{{ friend.name }} {{ friend.bst }}</div>
        </div>
      </div>
    </div>
    <Btn @click="" class="mt-4">Connect New Friend</Btn>
  </div>
  <div class="h-[10%] flex justify-center items-center gap-4">
    <Btn @click="navigateTo('/friends')">f</Btn>
    <Btn @click="navigateTo('/emoxy')">o</Btn>
    <Btn @click="navigateTo('/activations')">e</Btn>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

const user = useSupabaseUser()
const emoxy: any = await useEmoxy()
const friends: any = await useFriends()
</script>

<style scoped></style>

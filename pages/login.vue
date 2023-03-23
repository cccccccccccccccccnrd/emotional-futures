<template>
  <div class="h-1/4 flex flex-col justify-center items-center">
    <h2>Emotional Futures</h2>
    <p>the game</p>
  </div>
  <div class="h-2/4 flex flex-col items-center justify-center">
    <InputTxt v-model="email" placeholder="type your email"></InputTxt>
  </div>
  <div class="h-1/4 flex flex-col justify-center items-center">
    <Btn @click="handleSignIn" class="mt-4">Send me a Magic Link</Btn>
    <Btn @click="navigateTo('/')" class="mt-4">Back</Btn>
  </div>
</template>

<script setup lang="ts">
const user = useSupabaseUser()
const email = ref('')

if (user.value) {
  navigateTo('/emoxy')
}

function handleSignIn() {
  signInWithMagic(email.value)
}
</script>

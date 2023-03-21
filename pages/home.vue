<template>
  <div class="h-1/5 grid grid-cols-2 gap-4 content-end">
    <h2>{{ user?.user_metadata.username }}</h2>
    <Btn class="small" @click="handleLogoutClick">Logout</Btn>
  </div>
  <div class="h-3/5">
    <!-- <Emoxy /> -->
  </div>
  <div class="h-1/5 grid grid-cols-2 gap-4 content-start">
    <Btn>Balance</Btn>
    <Btn @click="handlePlayClick">Play</Btn>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

const user = useSupabaseUser()

async function handlePlayClick () {
  await updateEmoxy({ stage: 9 })
}

async function handleLogoutClick () {
  logout()
}
</script>

<style scoped></style>

<template>
  <div class="page create">
    <input type="text" v-model="username" />
    <button @click="handleSubmitClick">Update</button>
  </div>
</template>

<script setup lang="ts">
const username = ref('')

async function handleSubmitClick () {
  const response = await updateUser({ username: username.value })
  console.log(response)
}
</script>

<style scoped>
.top {
  background: blue;
}
</style>

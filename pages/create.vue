<template>
  <div class="page create">
    <input type="text" v-model="email" />
    <input type="text" v-model="password" />
    <button @click="handleSubmitClick">Reg</button>
  </div>
</template>

<script setup lang="ts">
const user = useSupabaseUser()

watchEffect(() => {
  if (user.value) {
    navigateTo('/')
  }
})

const email = ref('')
const password = ref('')

async function handleSubmitClick () {
  signUp(email.value, password.value)
}
</script>

<style scoped>
.top {
  background: blue;
}
</style>

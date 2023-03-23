<template class="p-4">
  <div class="h-full p-4">
    <div class="h-[10%] flex justify-between items-center">
      <div>Activations</div>
      <div>Menu</div>
    </div>
    <div class="h-[80%] flex flex-col items-center justify-start">
      <p v-if="activations.length === 0">No activations yet</p>
      <div v-if="activations.length > 0" class="w-full flex flex-col gap-4">
        <div
          v-for="activation in activations"
          class="w-full flex flex-col gap-4"
        >
          <div class="w-full flex justify-between items-center">
            <div>{{ activation }}</div>
          </div>
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
</script>

<style scoped></style>

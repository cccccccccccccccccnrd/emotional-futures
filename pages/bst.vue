<template>
  <Top class="center">
    <h2>Log your emotion</h2>
  </Top>
  <Mid @keyup.enter="handleSubmitClick" class="two-large-small">
    <section>
      <InputEmo v-model="emotion" />
    </section>
    <section>
      <ContentDoc path="/input" />
    </section>
  </Mid>
  <Btm>
    <Btn type="arrow-left"></Btn>
    <Btn type="arrow-right" @click="handleSubmitClick"></Btn>
  </Btm>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

const emotion = ref('50')

async function handleSubmitClick () {
  updateUser({
    b: Number(emotion.value)
  })
}
</script>

<style scoped></style>

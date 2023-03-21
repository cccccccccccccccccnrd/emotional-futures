<template>
  <Top class="center">
    <h2>Emotion</h2>
  </Top>
  <Mid @keyup.enter="" class="two-large-small">
    {{ $route.params.id }}
  </Mid>
  <Btm></Btm>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})
</script>

<style scoped></style>

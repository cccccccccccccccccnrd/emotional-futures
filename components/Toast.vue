<template>
  <div class="w-full flex flex-col p-5 text-sm border-2 border-red bg-dark-50 backdrop-blur-md">
    <p>Your Invite Was Accepted by <span class="font-bold">snuk</span></p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  type: String,
  invert: Boolean,
  size: String
})
</script>

<template>
  <div
    v-if="toasts.length > 0"
    class="absolute w-full p-safe flex flex-col gap-2 z-[100]"
  >
    <Toast
      v-for="(t, i) in toasts"
      :i="i"
      :type="t.type"
      :payload="t.payload"
    />
  </div>
</template>

<script setup lang="ts">
const toasts: any = useToasts()
</script>

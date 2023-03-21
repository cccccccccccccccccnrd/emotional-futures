<template>
  <div class="layout default">
    <div class="h-full w-full max-w-xs">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style>
.layout.default {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.page {
  width: 100%;
  max-width: 375px;
}

.section {
  display: flex;
  justify-content: center;
  width: 100%;
  height: var(--height-section);
  padding: 0 1.5em;
  gap: 0 1.5em;
}
</style>

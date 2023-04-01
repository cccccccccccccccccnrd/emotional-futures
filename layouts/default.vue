<template>
  <div class="h-screen flex flex-col justify-center items-center">
    <div
      class="h-full w-full relative overflow-hidden"
      :class="isMobile ? '' : 'max-w-[311px] rounded-2xl border-2 border-white-20'"
      :style="`max-height: ${maxH}px; ${isMobile ? '' : 'filter: drop-shadow(0 1rem 1rem rgba(0, 0, 0, 0.3));'}`"
    >
      <slot />
    </div>
    <div
      class="absolute w-full h-full bg-white-10 z-[-50]"
    ></div>
  </div>
</template>

<script setup lang="ts">
const isMobile = navigator.userAgent.match(
  /(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i
)

const max = 676
const maxH = computed(() => window.innerHeight <= max ? window.innerHeight : max)
</script>

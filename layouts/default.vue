<template>
  <div class="h-screen flex flex-col justify-center items-center">
    <div
      class="h-full w-full max-h-[676px] max-w-[311px] relative overflow-hidden"
      :class="isMobile ? '' : 'rounded-xl drop-shadow-xl'"
    >
      <slot />
    </div>
    <div
      class="absolute w-full h-full bg-white-10 backdrop-blur-md z-[-50]"
    ></div>
  </div>
</template>

<script setup lang="ts">
const isMobile = navigator.userAgent.match(
  /(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i
)
console.log(isMobile)
</script>

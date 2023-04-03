<template>
  <div class="h-full flex flex-col justify-center items-center" :class="isMobile ? '' : 'h-screen'">
    <div
      class="h-full w-full relative overflow-hidden"
      :class="isMobile ? '' : 'max-h-[676px] max-w-[311px] rounded-2xl border-2 border-white-20'"
      :style="`${isMobile ? sa ? 'height: 100vh;' : `height: ${h}px;` : 'filter: drop-shadow(0 1rem 1rem rgba(0, 0, 0, 0.3));'}`"
    >
      <Overlay v-if="overlay.isOpen" :type="overlay.type" :page="overlay.page"/>
      <slot />
    </div>
    <div
      class="absolute w-full h-full bg-white-10 z-[-50]"
    ></div>
  </div>
</template>

<script setup lang="ts">
const overlay = useOverlay()

const isMobile = navigator.userAgent.match(
  /(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i
)

const h = window.innerHeight
const sa = ((navigator as any).standalone || window.matchMedia('(display-mode: standalone)').matches) ? true : false
</script>

<style lang="postcss">
.p-safe {
  padding: max(env(safe-area-inset-top), 1.25rem) max(env(safe-area-inset-right), 1.25rem) max(env(safe-area-inset-bottom), 1.25rem) max(env(safe-area-inset-left), 1.25rem);
}
</style>

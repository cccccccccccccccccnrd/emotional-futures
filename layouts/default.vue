<template>
  <div
    class="h-full flex flex-col justify-center items-center"
    :class="isMobile ? '' : 'h-screen'"
  >
    <div
      class="h-full w-full relative overflow-hidden"
      style="filter: drop-shadow(0 1rem 1rem rgba(0, 0, 0, 0.5))"
      :class="
        isMobile
          ? ''
          : 'max-h-[676px] max-w-[311px] rounded-2xl border-2 border-white-20'
      "
      :style="`${sa ? 'height: 100vh;' : `height: ${h}px;`} ${
        loading ? 'filter: drop-shadow(0 1rem 1rem rgba(0, 0, 0, 0.5)) blur(7px)' : ''
      }`"
    >
      <Overlay
        v-if="overlay.isOpen"
        :type="overlay.type"
        :page="overlay.page"
      />
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
const nuxtApp = useNuxtApp()
const loading = ref(false)

nuxtApp.hook('page:start', () => {
  loading.value = true
})
nuxtApp.hook('page:finish', () => {
  loading.value = false
})

const overlay = useOverlay()

const isMobile = navigator.userAgent.match(
  /(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i
)

const h = ref(window.innerHeight)
const sa =
  (navigator as any).standalone ||
  window.matchMedia('(display-mode: standalone)').matches
    ? true
    : false

onMounted(() => {
  if (isMobile) {
    window.addEventListener('resize', () => {
      h.value = window.innerHeight
    })
  }
})
</script>

<style lang="postcss">
.p-safe {
  padding: max(env(safe-area-inset-top), 1.25rem)
    max(env(safe-area-inset-right), 1.25rem)
    max(env(safe-area-inset-bottom), 1.25rem)
    max(env(safe-area-inset-left), 1.25rem);
}
</style>

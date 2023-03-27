<template>
  <NuxtLayout>
    <div v-if="loading" class="absolute w-full h-full backdrop-blur-md z-10"></div>
    <NuxtPage />
  </NuxtLayout>
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
</script>

<style>
@font-face {
  font-family: 'UbuntuMono';
  src: url('~/assets/fonts/UbuntuMono-R.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: 'UbuntuMono';
  src: url('~/assets/fonts/UbuntuMono-B.ttf') format('truetype');
  font-weight: bold;
  font-style: bold;
}

:root {
  --color-bg: rgba(30, 30, 30, 1);
  --color-text: white;
  --height-section: 20vh;
  --indent: ;
}

* {
  box-sizing: border-box;
  user-select: none;
}

html,
body {
  margin: 0;
  padding: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  width: 100vw;
  font-family: 'UbuntuMono', sans-serif;
  font-size: 16px;
  line-height: 1;
  color: var(--color-text);
  background: var(--color-bg);
}

p {
  margin: 0;
  line-height: 1.1 !important;
}

h2 {
  margin: 0;
  font-size: 1.5em;
  font-weight: normal;
}

input {
  font-family: 'Jomolhari', sans-serif;
}

input:focus {
  outline: none;
}

input[type='range'] {
  width: 100%;
  height: 0.4em;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 100px;
  outline: none;
  appearance: none;
}

input[type='range']::-webkit-slider-thumb {
  appearance: none;
  width: 0.9em;
  height: 0.9em;
  background: var(--color-text);
  cursor: pointer;
  border-radius: 100px;
  outline: none;
}

input[type='range']::-webkit-slider-thumb:hover {
  box-shadow: 0 0 1em rgba(0, 0, 0, 0.3);
}
</style>

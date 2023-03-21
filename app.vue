<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
</script>

<style>
@font-face {
  font-family: 'Jomolhari';
  src: url('~/assets/fonts/Jomolhari-Regular.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

:root {
  --color-bg: rgba(30, 30, 30, 1);
  --color-text: white;
  --height-section: 20vh;
  --indent:
}

* {
  box-sizing: border-box;
  user-select: none;
}

html, body {
  margin: 0;
  padding: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  width: 100vw;
  font-family: 'Jomolhari', sans-serif;
  font-size: 14px;
  line-height: 1;
  color: var(--color-text);
  background: var(--color-bg);
}

p {
  margin: 0;
  line-height: 1.3;
  text-align: center;
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
</style>

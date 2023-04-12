<template>
  <VitePwaManifest />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <div
    class="absolute top-0 left-0 w-full h-full bg-white-10 bg-cover bg-center z-[-50]"
    :style="`background-image: url('/imgs/bg-bg-${
      Math.floor(Math.random() * 4) + 1
    }.png')`"
  ></div>
</template>

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
  color: white;
  background: black;
}

p {
  margin: 0;
  line-height: 1.1 !important;
}

::-webkit-scrollbar {
  width: 0 !important;
}

input:focus {
  outline: none;
}

input[type='range'] {
  width: 100%;
  height: 0.5rem;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 100px;
  outline: none;
  appearance: none;
}

input[type='range']::-webkit-slider-thumb,
input[type='range']::-moz-range-thumb {
  appearance: none;
  width: 1.2rem;
  height: 1.2rem;
  background: white;
  border-radius: 100px;
  outline: none;
}
</style>

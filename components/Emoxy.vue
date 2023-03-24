<template>
  <Renderer
    ref="renderer"
    resize
    antialias
    :orbit-ctrl="{ autoRotate: true, enableDamping: true, dampingFactor: 0.05 }"
  >
    <Camera :position="{ x: 0, y: 0, z: 10 }" />
    <Scene background="#000">
      <Box :size="2" :rotation="{ y: Math.PI / 4, z: Math.PI / 4 }">
        <MatcapMaterial name="2E763A_78A0B7_B3D1CF_14F209" />
      </Box>
    </Scene>
  </Renderer>
</template>

<script setup>
import {
  Box,
  Camera,
  Renderer,
  Scene,
  MatcapMaterial
} from 'troisjs'

const renderer = ref()
const light = ref()
const pointer = ref({})

onMounted(() => {
  init()
})

function init () {
  renderer.value.onBeforeRender(animate)
  /* renderer.value.three.setSize(window.innerWidth, window.innerHeight)
  document.querySelector('canvas').style = 'width: 100vw; height: 100vh; mix-blend-mode: screen; position: absolute; top: 0; left: 0; z-index: 0;' */
  document.querySelector('canvas').style = 'mix-blend-mode: screen;'
}

function animate () {
  const { pointer } = renderer.value.three
  pointer.value = pointer.positionV3
}
</script>

<style scoped></style>

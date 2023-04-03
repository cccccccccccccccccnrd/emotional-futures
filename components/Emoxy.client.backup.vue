<template>
  <Renderer
    ref="renderer"
    resize
    antialias
    :orbit-ctrl="{ autoRotate: true, enableDamping: true, dampingFactor: 0.05 }"
    width="300"
    height="300"
    alpha
  >
    <Camera :position="{ x: 0, y: 0, z: 10 }" />
    <Scene>
      <Box :size="4" :rotation="{ y: Math.PI / 4, z: Math.PI / 4 }">
        <MatcapMaterial name="2E763A_78A0B7_B3D1CF_14F209" />
      </Box>
    </Scene>
  </Renderer>
</template>

<script setup>
import { Box, Camera, Renderer, Scene, MatcapMaterial } from 'troisjs'

const renderer = ref()
const light = ref()
const pointer = ref({})

/* onMounted(() => {
  renderer.value.onBeforeRender(animate)
}) */

function animate () {
  const { pointer } = renderer.value.three
  pointer.value = pointer.positionV3
}
</script>

<style scoped></style>

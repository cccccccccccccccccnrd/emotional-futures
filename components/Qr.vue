<template>
  <div
    v-html="qr"
    class="rounded-lg overflow-hidden p-4 bg-white-100"
  >
  </div>
</template>

<script setup lang="ts">
import QRCode from 'qrcode'

const props = defineProps({
  value: String
})

const qr = ref('')

onMounted(async () => {
  if (!props.value) return

  qr.value = await QRCode.toString(props.value, {
    margin: 0
  })
  console.log('𝓘𝓷𝓿𝓲𝓽𝓪𝓽𝓲𝓸𝓷', props.value)
})

</script>

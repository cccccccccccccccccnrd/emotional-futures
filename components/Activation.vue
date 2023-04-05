<template>
  <div class="w-full h-full" style="perspective: 1000px">
    <div
      @click="locked ? null : (isRevealed = !isRevealed)"
      class="card absolute w-full h-full flex flex-col justify-between p-5 border-2 border-white-20"
      :style="
        isRevealed
          ? 'opacity: 0; transform: translateX(-700px)'
          : 'opacity: 1; transform: translateX(0)'
      "
    >
      <div
        v-if="waiting === 'accounting'"
        class="absolute top-0 left-0 h-full w-full p-5 flex flex-col justify-center items-center bg-dark-50 backdrop-blur-md z-[10]"
      >
        <Icon type="time" size="l" />
        <p class="text-center mt-5">
          Final Balance will become available as soon as your Accounterpart
          confirms their investment.
        </p>
      </div>
      <div
        v-if="waiting === 'feeding'"
        class="absolute top-0 left-0 h-full w-full p-5 flex flex-col justify-center items-center bg-dark-50 backdrop-blur-md z-[10]"
      >
        <Icon type="time" size="l" />
        <p class="text-center mt-5">
          Your Accounterpart {{ accounterpart.name }} still needs to feed their
          Emoxy.
        </p>
        <p class="text-center mt-5">
          It is time for you to inspire your Accounterpart to feed their Emoxy.
        </p>
      </div>
      <div
        v-if="ending"
        class="absolute top-0 left-0 h-full w-full p-5 flex flex-col justify-center items-center bg-dark-50 backdrop-blur-md z-[10]"
      >
        <div class="flex gap-2">
          <Icon type="drop-empty" size="l" />
          <Icon type="drop-half" size="l" />
          <Icon type="drop-full" size="l" />
        </div>
        <p class="text-center mt-5">
          Your activation with {{ accounterpart.name }} comes to an end.
        </p>
        <p class="text-center mt-5">
          Your Accounting results are ready. Soon you will feed your Emoxy with
          the Drops you gained (or perhaps lost) in the process.
        </p>
      </div>
      <div>
        <p class="text-xs text-white-80 text-center drop-shadow-md">
          Accounterpart
        </p>
        <p class="text-xs text-white-100 text-center font-bold drop-shadow-md">
          {{ accounterpart.name }}
        </p>
      </div>
      <div
        v-if="emotion?.id && !relationshape?.id"
        class="grow flex justify-center items-center"
      >
        <Btn class="text-sm font-bold">Confirm Emotion</Btn>
      </div>
      <div
        class="absolute left-0 top-0 w-full h-full flex justify-center items-center overflow-hidden z-[-1]"
      >
        <img
          class="max-h-full"
          v-if="relationshape?.id"
          :src="`/imgs/relationshapes/bg-${relationshape?.id}.png`"
        />
      </div>
      <div v-if="relationshape?.id">
        <p class="text-3xl font-bold text-center capitalize drop-shadow-md">
          {{ emotion?.name }}
        </p>
        <p class="text-3xl font-bold text-center capitalize drop-shadow-md">
          {{ relationshape?.name }}
        </p>
      </div>
      <div
        class="absolute left-0 top-0 w-full h-full bg-dark-50 bg-cover z-[-5]"
        :style="
          emotion?.id && bg
            ? `background-image: url('/imgs/emotions/bg-${emotion.id}.png')`
            : ''
        "
      ></div>
    </div>
    <div
      v-if="!locked"
      class="card absolute w-full h-full flex flex-col justify-between p-5 border-2 border-white-20 overflow-hidden"
      :style="
        isRevealed
          ? 'opacity: 1; transform: translateX(0);'
          : 'opacity: 0; transform: translateX(700px);'
      "
    >
      <div @click="isRevealed = !isRevealed">
        <p class="text-md text-center font-bold drop-shadow-md capitalize">
          {{ emotion?.name }} {{ relationshape?.name }}
        </p>
        <p class="text-xs text-white-80 text-center drop-shadow-md mt-5">
          Accounterpart
        </p>
        <p class="text-xs text-white-100 text-center font-bold drop-shadow-md">
          {{ accounterpart.name }}
        </p>
      </div>
      <div
        @click="isRevealed = !isRevealed"
        class="grow flex flex-col text-center font-bold mt-5 overflow-scroll"
      >
        <div
          v-html="
            relationshape?.id ? emotion?.prompts[relationshape.id - 1] : ''
          "
          class="my-auto"
        ></div>
      </div>
      <div v-if="!results">
        <div class="px-10 flex justify-center items-center mt-5">
          <Icon v-for="d in relationshape?.id" type="drop-full" />
        </div>
        <div class="px-10 mt-5 flex justify-between items-center">
          <Icon type="book" />
          <div>
            <Icon v-if="paused" @click="play()" type="audio" />
            <Icon v-else @click="pause()" type="pause" />
          </div>
          <Icon @click="isRevealed = !isRevealed" type="flip" />
        </div>
      </div>
      <div v-if="results">
        <div class="px-5 mt-5 flex justify-between items-center">
          <div v-for="(r, i) in results" class="flex flex-col">
            <div class="flex justify-center items-center gap-1">
              <p class="font-bold">{{ r }}</p>
              <img
                :src="`/imgs/drop-${
                  i === 0 ? 'blood' : i === 1 ? 'sweat' : 'tears'
                }.png`"
                class="w-3"
              />
            </div>
            <p v-if="i === 0" class="text-xs mt-0.5">Blood</p>
            <p v-if="i === 1" class="text-xs mt-0.5">Sweat</p>
            <p v-if="i === 2" class="text-xs mt-0.5">Tears</p>
          </div>
        </div>
      </div>
      <div class="absolute left-0 top-0 w-full h-full bg-dark-50 z-[-10]"></div>
      <div
        class="absolute left-0 top-0 w-full h-full flex justify-center items-center blur-md overflow-hidden z-[-15]"
      >
        <img
          v-if="relationshape?.id"
          class="absolute z-[-15] max-h-full"
          :src="`/imgs/relationshapes/bg-${relationshape?.id}.png`"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  accounterpart: {
    type: Object,
    required: true
  },
  emotion: {
    type: Object,
    required: false
  },
  relationshape: {
    type: Object,
    required: false
  },
  locked: {
    type: Boolean,
    required: false
  },
  bg: {
    type: Boolean,
    required: false
  },
  waiting: {
    type: String,
    required: false
  },
  ending: {
    type: Boolean,
    required: false
  },
  results: {
    type: Array,
    required: false
  },
  isRevealed: {
    type: Boolean,
    required: false
  }
})

onUnmounted(() => {
  audio.value.pause()
})

const isRevealed = ref(props.isRevealed)

const audio = ref(
  new Audio(
    `/audios/emotions/${props.emotion?.id}/${props.relationshape?.id}.mp3`
  )
)
const paused = ref(true)

function play () {
  paused.value = false
  audio.value.play()
  audio.value.loop = true

  if ('mediaSession' in navigator) {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: cap(props.relationshape?.name),
      artist: cap(props.emotion?.name),
      album: 'Emotional Futures',
      artwork: [
        { src: '/imgs/app/app-192.png', sizes: '192x192', type: 'image/png' },
        { src: '/imgs/app/app-512.png', sizes: '512x512', type: 'image/png' }
      ]
    })
  }
}

function pause () {
  paused.value = true
  audio.value.pause()
}

function cap(s: string) {
    return s.charAt(0).toUpperCase() + s.slice(1)
}
</script>

<style scoped>
.card {
  transition: all 0.8s;
  transform-style: preserve-3d;
  backface-visibility: hidden;
}
</style>

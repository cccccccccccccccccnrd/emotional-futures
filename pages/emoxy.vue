<template>
  <div class="h-full p-safe flex flex-col">
    <div class="flex justify-between items-center">
      <p class="text-xl font-bold">{{ db.emoxy.name }}</p>
      <Icon type="menu" @click="handleMenuClick" class="pointer-events-auto"/>
    </div>
    <div
      class="flex flex-col grow items-center justify-between"
    >
      <div class="flex justify-between w-full">
        <div
          v-for="(v, i) in db.emoxy.bst"
          class="flex justify-center flex-grow mt-5"
        >
          <div class="flex gap-1 justify-center items-center">
            <p class="text-lg">{{ v }}</p>
            <img
              :src="`/imgs/drop-${
                i === 0 ? 'blood' : i === 1 ? 'sweat' : 'tears'
              }.png`"
              class="w-4"
            />
          </div>
        </div>
      </div>
      <div class="w-full grow"></div>
      <div class="w-full">
        <div
          class="flex justify-center items-center"
          :class="paused ? 'opacity-0' : 'opacity-1'"
        >
          <Icon type="audio" size="s" />
          <p class="text-xs ml-1.5">Sound playing</p>
        </div>
        <div
          class="w-full flex flex-col p-3 border-2 border-white-30 bg-dark-30 backdrop-blur-md rounded-2xl mt-2"
        >
          <p class="text-sm text-align">
            {{ say }}
          </p>
          <div v-if="!busy" class="flex gap-2 mt-3 text-sm">
            <Btn
              @click="navigateTo('/feed')"
              type="dark"
              padding="1"
              class="rounded-lg pointer-events-auto"
              >Feed</Btn
            >
            <Btn
              @click="audio.paused ? play() : pause()"
              type="dark"
              padding="1"
              class="rounded-lg pointer-events-auto"
            >
              <span v-if="paused">Hear</span>
              <Icon v-else type="pause" size="s" />
            </Btn>
          </div>
          <div v-else class="flex gap-2 mt-3 text-sm">
            <Btn
              @click="navigateTo(`/activation/${busy?.id}`)"
              type="dark"
              padding="1"
              class="rounded-lg border-2 border-white-80 pointer-events-auto"
              >{{ busyStatus }}</Btn
            >
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-center items-end gap-2 mt-5">
      <Btn
        @click="navigateTo('/accounterparts')"
        type="dark"
        padding="1"
        class="pointer-events-auto"
      >
        <Icon type="accounterparts" size="m" />
      </Btn>
      <Btn
        @click="navigateTo('/emoxy')"
        padding="1"
        class="pointer-events-auto"
      >
        <Icon type="heart" size="m" invert />
      </Btn>
      <Btn
        @click="navigateTo('/activations')"
        type="dark"
        padding="1"
        class="pointer-events-auto"
      >
        <Icon type="activation" size="m" />
      </Btn>
    </div>
    <div class="absolute top-0 left-0 h-full w-full z-[-5]">
      <Emoxy
        :activations="db.activations.filter((a: any) => a.status === 'completed')"
        :emoxy="db.emoxy"
        class="!pointer-events-auto"
      />
    </div>
    <div class="absolute top-0 left-0 h-full w-full z-[-10]">
      <div
        class="absolute h-full w-full flex justify-center items-center bg-[url('/imgs/bg-1.png')] bg-cover"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

useHead({
  style: [{ children: '* { pointer-events: none; }' }]
})

const route = useRoute()
if (route.query.init) {
  await initDb()
}

onUnmounted(() => {
  audio.value.pause()
})

const db = useDb()

const user = useSupabaseUser()
const overlay = useOverlay()
const emotions = await useEmotions()
const paused = ref(true)

const busy = computed(() => {
  return db.value.activations.find(
    (a: any) =>
      a.status === 'accepted' /* ||
      (a.status === 'created' && a.user_id === user.value?.id) */
  )
})

const busyStatus = computed(() => {
  if (busy.value?.status === 'created') {
    return 'Awaiting Confirmation'
  } else if (busy.value?.status === 'accepted' && busy.value.accounts?.length === 1) {
    const f = busy.value?.accounts.find((a: any) => a.userId === user.value?.id)
    if (f) {
      return 'Awaiting Accounting'
    } else {
      return 'Ongoing Activation'
    }
  } else if (
    busy.value?.status === 'accepted' &&
    busy.value.accounts?.length === 2 &&
    busy.value.fed?.length === 0
  ) {
    return 'Accounting Results'
  } else if (
    busy.value?.status === 'accepted' &&
    busy.value.accounts?.length === 2 &&
    busy.value.fed?.length === 1
  ) {
    const f = busy.value?.fed.find((id: any) => id === user.value?.id)
    if (f) {
      return 'Awaiting Feeding'
    } else {
      return 'Accounting Results'
    }
  }
  return 'Ongoing Activation'
})

const emoxyLevel = computed(() => {
  const completed = db.value.activations.filter((a: any) => a.status === 'completed')
  const s = new Set(completed.map((a: any) => a.type[0])).size
  return s > 7 ? 7 : s
})

console.log(`%c𝓔𝓶𝓸𝔁𝔂 __𝓹𝓻𝓸𝓽𝓸__ ${db.value.emoxy.name}`, 'font-size: 20px; color: blue;')
console.table({
  level: emoxyLevel.value,
  activations: db.value.activations.length
})

const say = computed(() => {
  const s = emotions[emoxyLevel.value].say
  return s[Math.floor(Math.random() * s.length)]
})

const audio = ref(
  new Audio(
    `/audios/emoxy/${emoxyLevel.value}/${
      Math.floor(Math.random() * emotions[emoxyLevel.value].hear) + 1
    }.mp3`
  )
)

function play() {
  paused.value = false
  audio.value.play()
  audio.value.loop = true

  if ('mediaSession' in navigator) {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: say.value,
      artist: db.value.emoxy.name,
      album: 'Emotional Futures',
      artwork: [
        { src: '/imgs/app/app-192.png', sizes: '128x128', type: 'image/png' },
        { src: '/imgs/app/app-192.png', sizes: '192x192', type: 'image/png' },
        { src: '/imgs/app/app-512.png', sizes: '256x256', type: 'image/png' },
        { src: '/imgs/app/app-512.png', sizes: '384x384', type: 'image/png' },
        { src: '/imgs/app/app-512.png', sizes: '512x512', type: 'image/png' }
      ]
    })
  }
}

function pause() {
  paused.value = true
  audio.value.pause()
}

function handleMenuClick() {
  overlay.value.isOpen = true
  overlay.value.type = 'menu'
  overlay.value.page = ['emoxy', 0]
}
</script>

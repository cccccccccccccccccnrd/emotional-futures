<template>
  <div class="flex flex-col">
    <div class="flex justify-between w-full">
      <div v-for="(v, i) in db.emoxy.bst" class="flex justify-center flex-grow">
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
    <p v-if="level === 0" class="text-sm mt-3">Collect 100 Drops to grow your Emoxy by playing Activations.</p>
    <p v-if="level !== 0" class="text-sm mt-3">Collect {{ left }} Drops to grow your Emoxy by playing Activations.</p>
    <div class="w-full h-2 bg-white-20 rounded-full mt-3 overflow-hidden">
      <div class="h-full bg-white-100 rounded-full" :style="`width: ${percent}%;`"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  type: String
})

const db = useDb()

const dist = [0, 100, 300, 600, 1000, 1500, 2200]

const total = computed(() => {
  return db.value.emoxy.bst[0] + db.value.emoxy.bst[1] + db.value.emoxy.bst[2]
})

const level = computed(() => {
  const l = dist.map((n, index) => total.value >= n ? index : null).filter(Boolean)
  return l[l.length - 1] || 0
})

const left = computed(() => {
  return dist[level.value + 1] - total.value
})

const percent = computed(() => {
  return Math.floor((total.value / dist[level.value + 1]) * 100)
})
</script>

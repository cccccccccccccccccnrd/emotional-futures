<template>
  <div class="flex flex-col">
    <div class="flex justify-between w-full">
      <div v-for="(v, i) in bst" class="flex justify-center flex-grow">
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
    <p v-if="isLevelUp || left === -1" class="text-sm mt-3">You collected enough Drops to grow your Emoxy.</p>
    <p v-else-if="results" class="text-sm mt-3">Still {{ left }} Drop{{ left > 1 ? 's' : '' }} to grow your Emoxy.</p>
    <p v-else class="text-sm mt-3">Collect {{ left }} Drop{{ left > 1 ? 's' : '' }} to grow your Emoxy by playing Activations.</p>
    <div class="w-full h-2 bg-white-20 rounded-full mt-3 overflow-hidden">
      <div class="h-full bg-white-100 rounded-full" :style="isLevelUp ? 'width: 100%;' : `width: ${percent}%;`"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  results: {
    type: Array<number>,
    required: false
  }
})

const db = useDb()

const dist = [0, 100, 300, 600, 1000, 1500, 2200]

const bst = computed(() => {
  if (props.results) {
    return [db.value.emoxy.bst[0] + props.results[0], db.value.emoxy.bst[1] + props.results[1], db.value.emoxy.bst[2] + props.results[2]]
  } else {
    return db.value.emoxy.bst
  }
})

const total = computed(() => {
  return bst.value[0] + bst.value[1] + bst.value[2]
})

const level = computed(() => {
  const l = dist.map((n, index) => total.value >= n ? index : null).filter(Boolean)
  return l[l.length - 1] || 0
})

const curLevel = computed(() => {
  const l = dist.map((n, index) => (db.value.emoxy.bst[0] + db.value.emoxy.bst[1] + db.value.emoxy.bst[2]) >= n ? index : null).filter(Boolean)
  return l[l.length - 1] || 0
})

const left = computed(() => {
  const l = dist[level.value + 1] - total.value
  return Number.isNaN(l) ? -1 : l
})

const percent = computed(() => {
  return Math.floor((total.value / dist[level.value + 1]) * 100)
})

const isLevelUp = computed(() => {
  if (props.results) {
    return level.value > curLevel.value
  } else {
    return false
  }
})
</script>

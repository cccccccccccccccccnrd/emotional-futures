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
    <div class="flex flex-col border-2 border-white-20 backdrop-blur-md mt-5">
      <div class="flex bg-dark-50 border-b-2 border-white-20">
        <div
          class="px-2 py-1 flex flex-col justify-center items-center border-r-2 border-white-20"
        >
          <p class="text-2xl font-bold">{{ level < 7 ? level : '∞' }}</p>
          <p class="text-sm opacity-50">level</p>
        </div>
        <div class="px-2 py-1 flex justify-center items-center">
          <div v-if="results">
            <p v-if="isLevelUp">
              You collected enough Drops to grow your Emoxy.
            </p>
            <p v-else-if="left === -1">
              You can always enhance your Emotional Future Crystal.
            </p>
            <p v-else="results">
              You still need {{ left }} Drop{{ left > 1 ? 's' : '' }} to grow your Emoxy.
            </p>
          </div>
          <div v-else>
            <p v-if="left === -1">
              Emoxy is fully grown, your Emotional Future Crystal.
            </p>
            <p v-else>
              Collect {{ dist[level] }} Total Drops to grow your Emoxy.
            </p>
          </div>
        </div>
      </div>
      <div class="flex flex-col py-3 px-2 pb-2 bg-dark-30">
        <div class="w-full h-2 bg-white-20 rounded-full overflow-hidden">
          <div
            class="h-full bg-white-100 rounded-full"
            :style="isLevelUp ? 'width: 100%;' : `width: ${percent}%;`"
          ></div>
        </div>
        <p class="text-sm mt-2">{{ total }} Total Drops</p>
      </div>
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

const dist = [0, 50, 250, 500, 750, 1000, 1500]

const bst = computed(() => {
  if (props.results) {
    return [
      db.value.emoxy.bst[0] + props.results[0],
      db.value.emoxy.bst[1] + props.results[1],
      db.value.emoxy.bst[2] + props.results[2]
    ]
  } else {
    return db.value.emoxy.bst
  }
})

const total = computed(() => {
  return bst.value[0] + bst.value[1] + bst.value[2]
})

const level = computed(() => {
  const l = dist
    .map((n, index) => (total.value >= n ? index : null))
    .filter(Boolean)
  return (l[l.length - 1] || 0) + 1
})

const curLevel = computed(() => {
  const l = dist
    .map((n, index) =>
      db.value.emoxy.bst[0] + db.value.emoxy.bst[1] + db.value.emoxy.bst[2] >= n
        ? index
        : null
    )
    .filter(Boolean)
  return (l[l.length - 1] || 0) + 1
})

const left = computed(() => {
  const l = dist[level.value] - total.value
  return Number.isNaN(l) ? -1 : l
})

const percent = computed(() => {
  return Math.floor((total.value / dist[level.value]) * 100)
})

const isLevelUp = computed(() => {
  if (props.results) {
    return level.value > curLevel.value
  } else {
    return false
  }
})
</script>

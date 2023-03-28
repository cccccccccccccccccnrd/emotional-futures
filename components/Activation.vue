<template>
  <div class="w-full h-full" style="perspective: 1000px">
    <div
      @click="locked ? null : (isRevealed = !isRevealed)"
      class="card absolute w-full h-full flex flex-col justify-between p-5 border-2 border-white-20"
      :style="isRevealed ? 'transform: rotateY(180deg)' : ''"
    >
      <div v-if="waiting === 'accounting'" class="absolute top-0 left-0 h-full w-full p-5 flex flex-col justify-center items-center bg-dark-50 backdrop-blur-md z-[10]">
        <Icon type="time" size="l"/>
        <p class="text-center mt-5">Final Balance will become available as soon as your Accounterpart confirms their investment.</p>
      </div>
      <div v-if="waiting === 'feeding'" class="absolute top-0 left-0 h-full w-full p-5 flex flex-col justify-center items-center bg-dark-50 backdrop-blur-md z-[10]">
        <Icon type="time" size="l"/>
        <p class="text-center mt-5">Your Accounterpart {{ accounterpart.name }} still needs to feed their Emoxy.</p>
        <p class="text-center mt-5">It is time for you to inspire your Accounterpart to feed their Emoxy.</p>
      </div>
      <div v-if="ending" class="absolute top-0 left-0 h-full w-full p-5 flex flex-col justify-center items-center bg-dark-50 backdrop-blur-md z-[10]">
        <div class="flex gap-2">
          <Icon type="drop-empty" size="l"/>
          <Icon type="drop-half" size="l"/>
          <Icon type="drop-full" size="l"/>
        </div>
        <p class="text-center mt-5">Your activation with {{ accounterpart.name }} comes to an end.</p>
        <p class="text-center mt-5">Your Accounting results are ready. Soon you will feed your Emoxy with the Drops you gained (or perhaps lost) in the process.</p>
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
      <div class="absolute left-0 top-0 w-full h-full flex justify-center items-center z-[-10]">
        <img
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
        class="absolute left-0 top-0 w-full h-full bg-cover z-[-20]"
        :style="
          emotion?.id
            ? `background-image: url('/imgs/emotions/${emotion.id}.png')`
            : ''
        "
      ></div>
    </div>
    <div
      v-if="!locked"
      class="card absolute w-full h-full flex flex-col justify-between p-5 border-2 border-white-20"
      style="transform: rotateY(180deg)"
      :style="isRevealed ? 'transform: rotateY(360deg)' : ''"
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
        class="grow flex justify-center items-center text-center font-bold"
      >
        {{ relationshape?.id ? emotion?.prompts[relationshape.id - 1] : '' }}
      </div>
      <div>
        <div class="px-10 flex justify-center items-center">
          <Icon v-for="d in relationshape?.id" type="drop-full" />
        </div>
        <div class="px-10 mt-5 flex justify-between items-center">
          <Icon type="book" />
          <Icon type="audio" />
          <Icon @click="isRevealed = !isRevealed" type="flip" />
        </div>
      </div>
      <div
        class="absolute left-0 top-0 w-full h-full bg-dark-50 backdrop-blur-md z-[-10]"
      ></div>
      <img
        v-if="relationshape?.id"
        class="absolute z-[-15]"
        :src="`/imgs/relationshapes/bg-${relationshape?.id}.png`"
      />
      <div
        class="absolute left-0 top-0 w-full h-full bg-cover z-[-20]"
        :style="
          emotion?.id
            ? `background-image: url('/imgs/emotions/${emotion.id}.png')`
            : ''
        "
      ></div>
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
  waiting: {
    type: String,
    required: false
  },
  ending: {
    type: Boolean,
    required: false
  },
  completed: {
    type: Boolean,
    required: false
  }
})

const isRevealed = ref(false)
</script>

<style>
.card {
  transition: transform 0.8s;
  transform-style: preserve-3d;
  backface-visibility: hidden;
}
</style>

<template>
  <div class="h-[11.5rem] w-[11.5rem] flex flex-col items-center ease-in-out duration-300" :style="`transform: rotate(-${ (emotionsValue.id - 1) * 45 }deg)`">
    <div class="circle-container">
      <img
        v-for="(emotion, index) in emotions"
        @click="handleEmotionClick(emotion)"
        :src="`/imgs/emotions/drop-${emotion.id}.png`"
        :class="!availableEmotions.find((e: any) => e.id === emotion.id) ? '!grayscale' : ''"
        :style="emotionsValue.id === emotion.id ? 'filter: drop-shadow(0 -0.2rem 0.5rem rgba(255, 255, 255, 1)' : 'filter: brightness(0.6)'"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  },
  availableEmotions: {
    type: Array,
    required: true
  }
})

const emotions = await useEmotions()
const emotionsValue: any = ref(props.modelValue)

const emit = defineEmits(['update:modelValue'])

function handleEmotionClick(emotion: any) {
  if (!props.availableEmotions.find((e: any) => e.id === emotion.id)) return

  if (emotionsValue.value === emotion) {
    emotionsValue.value = 0
  } else {
    emotionsValue.value = emotion
  }
  emit('update:modelValue', emotionsValue.value)
}
</script>

<style lang="scss">
@mixin on-circle($item-count, $circle-size, $item-size) {
  position: relative;
  width: $circle-size;
  height: $circle-size;
  padding: 0;
  border-radius: 50%;
  list-style: none;

  > * {
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    width: $item-size;
    height: auto;
    margin: - calc($item-size / 2);

    $angle: calc(360 / $item-count);
    $rot: 0;

    @for $i from 1 through $item-count {
      &:nth-of-type(#{$i}) {
        transform: rotate($rot * 1deg)
          translate(calc($circle-size / 2))
          rotate($rot * -1deg)
          rotate(270deg + (($i - 1) * $angle * 1deg));
      }

      $rot: $rot + $angle;
    }
  }
}

.circle-container {
  @include on-circle($item-count: 8, $circle-size: 6rem, $item-size: 3rem);
  transform: translateY(2.75em) translateX(-1.1em) rotate(-90deg);
}
</style>

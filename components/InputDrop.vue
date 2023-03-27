<template>
  <div class="h-full w-full max-h-[250px]">
    <div class="relative h-full max-h-[200px] flex justify-center items-center">
      <p class="absolute text-xl z-[10]">{{ amount }}</p>
      <img
        :src="`/imgs/drop-${type}.png`"
        :style="`transform: scale(${Number(amount) / 10})`"
        class="absolute h-full"
      />
      <img
        :src="`/imgs/drop-${type}.png`"
        class="absolute z-[-10] h-full"
        style="
          filter: drop-shadow(2px 1px 0 white) drop-shadow(-1px -1px 0 white)
            grayscale(1);
        "
      />
    </div>
    <input
      v-on:input="updateValue"
      :value="amount"
      class="mt-10"
      type="range"
      min="1"
      max="10"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const amount = ref(props.modelValue)

function updateValue(event: Event) {
  const target = event.target as HTMLInputElement
  amount.value = target.value
  console.log('amount', amount.value)
  emit('update:modelValue', target.value)
}
</script>

<style scoped>
.inner {
  background: red;
  border-radius: 100px;
}
</style>

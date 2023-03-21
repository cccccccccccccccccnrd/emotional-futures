<template>
  <div class="emotion outer">
    <div class="inner" :style="`width: ${amount}%; height: ${amount}%;`"></div>
  </div>
  <input type="range" min="0" max="100" v-on:input="updateValue" />
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: String
})

const emit = defineEmits(['update:modelValue'])

const amount = ref(props.modelValue)

function updateValue (event: Event) {
  const target = event.target as HTMLInputElement
  amount.value = target.value
  emit('update:modelValue', target.value)
}
</script>

<style scoped>
.emotion {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 7.5em;
  height: 15em;
  border: 1px solid white;
  border-radius: 100px;
}

.inner {
  background: red;
  border-radius: 100px;
}

input[type="range"]{
  height: 0.2em;
  margin: 4em 0 0 0;
  background: var(--color-text);
  border: none;
  border-radius: 100px;
  outline: none;
  appearance: none;
}

input[type="range"]::-webkit-slider-thumb {
  appearance: none;
  width: 1em;
  height: 1em;
  background: var(--color-text);
  cursor: pointer;
  border-radius: 5px;
  outline: none;
}

input[type="range"]::-webkit-slider-thumb:hover {
  box-shadow: 0 0 0.6em var(--color-text);
}
</style>

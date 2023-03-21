<template>
  <div class="input-text">
    <svg
      v-if="type === 'email'"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M22 6L12 13L2 6"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
    <input
      ref="inputText"
      type="text"
      :placeholder="placeholder"
      :value="modelValue"
      @input="updateValue"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: String,
  type: String,
  placeholder: String,
  focus: Boolean
})

const inputText = ref()

const emit = defineEmits(['update:modelValue'])

function updateValue (event: any) {
  emit('update:modelValue', event.target.value)
}

onMounted(() => {
  inputText.value.focus()
})
</script>

<style scoped>
input[type='text'] {
  display: block;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 1em;
  margin: 0.5em 0;
  color: var(--color-text);
  font-size: 1.5em;
  border: 0;
  background: transparent;
}

.input-text {
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--color-text);
}

.input-text:hover {
  box-shadow: 0 1em 1em -1.2em var(--color-text);
}

svg {
  margin: 0 1em 0 0;
}
</style>

<template>
  <input
    class="w-full flex justify-center items-center font-bold text-white-100 bg-dark-50 border-2 border-white-20 backdrop-blur-md p-2 focus:bg-white-100 focus:text-dark-80"
    ref="inputText"
    type="text"
    :placeholder="placeholder"
    :value="modelValue"
    @input="updateValue"
  />
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

function updateValue(event: any) {
  emit('update:modelValue', event.target.value)
}

onMounted(() => {
  inputText.value.focus()
})
</script>

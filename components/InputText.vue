<template>
  <input
    class="w-full flex justify-center items-center font-bold leading-3 text-white-100 bg-dark-50 border-2 border-white-20 backdrop-blur-md p-1.5 focus:bg-white-100 focus:text-dark-80"
    ref="inputText"
    :type="password ? 'password' : 'text'"
    :placeholder="placeholder"
    :value="modelValue"
    @input="updateValue"
    spellcheck="false"
  />
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: String,
  type: String,
  placeholder: String,
  password: Boolean,
  focus: Boolean
})

const inputText = ref()

const emit = defineEmits(['update:modelValue'])

function updateValue(event: any) {
  emit('update:modelValue', event.target.value)
}

onMounted(() => {
  if (props.focus) {
    inputText.value.focus()
  }
})
</script>

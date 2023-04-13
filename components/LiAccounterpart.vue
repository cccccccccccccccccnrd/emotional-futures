<template>
  <div
    class="flex justify-between items-center h-[55px] px-5 bg-dark-50 backdrop-blur-md border-2 border-white-20"
    :class="selected ? '!border-2 !border-white-80' : ''"
    :style="disabled ? 'opacity: 0.5;' : ''"
  >
    <div class="flex flex-col">
      <div>
        <p :class="busy || unavailable ? 'text-sm' : ''">{{ name }}</p>
      </div>
      <p v-if="busy" class="text-sm">is playing with you</p>
      <p v-else-if="unavailable" class="text-sm">is in another activation</p>
    </div>
    <div
      v-if="activations.length > 0 && !selected"
      class="flex justify-center items-center h-6 w-6 border-2 border-white-20 font-bold"
      :class="invitation ? 'border-red' : ''"
    >
      {{ activations?.length }}
    </div>
    <div
      v-if="activations.length === 0 && !selected"
      class="flex justify-center items-center h-6 px-2 border-2 border-white-20 font-bold"
    >
      New
    </div>
    <div v-if="selected">
      <Icon type="check" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Activation } from '~/types/futures'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  activations: {
    type: Array<Activation>,
    required: true
  },
  selected: {
    type: Boolean,
    required: true
  },
  busy: {
    type: Boolean,
    required: false
  },
  unavailable: {
    type: Boolean,
    required: true
  },
  invitation: {
    type: Boolean,
    required: false
  },
  invited: {
    type: Boolean,
    required: false
  },
  disabled: {
    type: Boolean,
    required: false
  }
})
</script>

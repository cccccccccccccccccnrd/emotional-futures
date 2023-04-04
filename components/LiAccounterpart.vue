<template>
  <div
    class="flex justify-between items-center h-[55px] px-5 bg-dark-50 backdrop-blur-md border-2 border-white-20"
    :class="selected ? '!border-2 !border-white-80' : ''"
  >
    <div class="flex flex-col">
      <div>
        {{ name }}
      </div>
      <div v-if="unavailable || busy">
        <small v-if="busy">is playing with you</small>
        <small v-else>is in another activation</small>
      </div>
    </div>
    <div
      v-if="activations.length > 0 && !selected && !invitation"
      class="flex justify-center items-center h-6 w-6 border-2 border-white-20 font-bold"
    >
      {{ activations?.length }}
    </div>
    <div
      v-if="activations.length === 0 && !selected"
      class="flex justify-center items-center h-6 px-2 border-2 border-white-20 font-bold"
    >
      New
    </div>
    <div
      v-if="invitation"
      class="flex justify-center items-center h-6 px-2 border-2 border-red font-bold"
    >
      New Invite
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
  }
})
</script>

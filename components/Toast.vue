<template>
  <div
    class="toast-in w-full flex flex-col p-5 border-2 border-red bg-dark-80"
    :class="out ? 'toast-out' : ''"
  >
    <div class="flex gap-3">
      <div v-if="type === 'invite-accepted'">
        <p>
          <span class="capitalize font-bold"
            >{{ emotions[activation.type[0] - 1].name }}
            {{ relationshapes[activation.type[1] - 1].name }}</span
          >
          was accepted by
          <span class="font-bold">{{ accounterpart?.name }}</span>
        </p>
      </div>
      <Icon type="close" size="s/m" @click="handleCloseClick" />
    </div>
    <div
      @click="handleTaskClick"
      class="mt-2 flex justify-center gap-2 py-2 px-3 bg-dark-50 rounded-sm"
    >
      <Icon type="eye" />
      <p class="font-bold">View Task</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  i: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  activation: {
    type: Object,
    required: true
  }
})

const db = useDb()
const toasts = useToasts()

const emotions: any = useEmotions()
const relationshapes: any = useRelationshapes()

const out = ref(false)

function handleCloseClick() {
  out.value = true
  setTimeout(() => {
    toasts.value.splice(props.i, 1)
  }, 400)
}

function handleTaskClick() {
  handleCloseClick()
  navigateTo(`/activation/${props.activation.id}`)
}

const accounterpart = computed(() => {
  return db.value.friends.find(
    (f: any) =>
      f.user_id === props.activation.friend_id ||
      f.user_id === props.activation.user_id
  )
})
</script>

<style scoped>
* {
  pointer-events: auto;
}

.toast-in {
  animation: toast-in 500ms ease-in-out 1;
}

.toast-out {
  animation: toast-out 500ms ease-in-out 1;
}

@keyframes toast-in {
  0% {
    opacity: 0;
    transform: translate3d(0, -100%, 0);
  }
  to {
    opacity: 1;
    transform: translateZ(0);
  }
}

@keyframes toast-out {
  0% {
    opacity: 1;
    transform: translateZ(0);
  }
  to {
    opacity: 0;
    transform: translate3d(0, -100%, 0);
  }
}
</style>

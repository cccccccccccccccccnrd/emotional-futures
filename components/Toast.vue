<template>
  <div
    class="toast-in w-full flex flex-col p-5 border-2 border-red bg-dark-100"
    :class="out ? 'toast-out' : ''"
  >
    <div v-if="type === 'invite-accepted'">
      <div class="flex gap-3">
        <div>
          <p>
            <span class="font-bold">{{ accounterpart?.name }}</span> accepted
            your invite to play
            <span class="capitalize font-bold"
              >{{ emotions[payload.type[0] - 1].name }}
              {{ relationshapes[payload.type[1] - 1].name }}</span
            >.
          </p>
        </div>
        <Icon type="close" size="s/m" @click="handleCloseClick" />
      </div>
      <div
        @click="handleTaskClick"
        class="mt-3 flex justify-center gap-2 py-2 px-3 bg-dark-50 rounded-sm"
      >
        <Icon type="eye" />
        <p class="font-bold">View Task</p>
      </div>
    </div>
    <div v-if="type === 'relationshapes-unlocked'">
      <div class="flex gap-3">
        <div>
          <p>
            You unlocked <span class="capitalize">{{ payload.map((r: any) => r.name).join(', ') }}</span> Relationshape{{
              payload.length > 1 ? 's' : ''
            }}
          </p>
        </div>
        <Icon type="close" size="s/m" @click="handleCloseClick" />
      </div>
      <div
        @click="handleFeedClick"
        class="mt-3 flex justify-center gap-2 py-2 px-3 bg-dark-50 rounded-sm"
      >
        <p class="font-bold">Initiate New Activation</p>
      </div>
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
  payload: {
    type: Object || Array,
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
  navigateTo(`/activation/${props.payload.id}`)
}

function handleFeedClick() {
  handleCloseClick()
  navigateTo(`/feed?init=true`)
}

const accounterpart = computed(() => {
  return db.value.friends.find(
    (f: any) =>
      f.user_id === props.payload.friend_id ||
      f.user_id === props.payload.user_id
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

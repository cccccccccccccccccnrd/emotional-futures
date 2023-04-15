<template>
  <div
    class="flex justify-between items-center px-5 py-3 bg-dark-50 backdrop-blur-md border-2 border-white-20"
    :class="disabled ? 'opacity-50' : ''"
  >
    <div class="flex-1 flex flex-col text-sm">
      <p class="capitalize text-ellipsis overflow-hidden">
        {{ emotions[activation.type[0] - 1].name }}
        {{ relationshapes[activation.type[1] - 1].name }}
      </p>
      <p v-if="own">
        you invited <span class="font-bold">{{ accounterpart?.name }}</span>
      </p>
      <p v-else>
        with <span class="font-bold">{{ accounterpart?.name }}</span>
      </p>
    </div>
    <div>
      <Icon
        v-if="activation.status === 'created' && friendUnavailable && !own"
        type="time"
      />
      <div
        v-if="activation.status === 'created' && !friendUnavailable && !own"
        class="flex justify-center items-center h-6 px-2 border-2 border-red"
      >
        Invite
      </div>
      <div
        v-if="activation.status === 'accepted'"
        class="flex justify-center items-center h-6 px-2 border-2 border-red"
      >
        Ongoing
      </div>
      <Icon v-if="activation.status === 'completed'" type="check" />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  activation: {
    type: Object,
    required: true
  },
  friendUnavailable: {
    type: Boolean,
    required: false
  },
  disabled: {
    type: Boolean,
    required: false
  }
})

const user = useSupabaseUser()
const db = useDb()

const emotions: any = useEmotions()
const relationshapes: any = useRelationshapes()

const own = computed(() => props.activation.user_id === user.value?.id)
const accounterpart = computed(() =>
  db.value.friends.find(
    (f: any) =>
      f.user_id === props.activation.friend_id ||
      f.user_id === props.activation.user_id
  )
)
const busy = computed(() => {
  return db.value.activations.find((a: any) => a.status === 'accepted')
    ? true
    : false
})
</script>

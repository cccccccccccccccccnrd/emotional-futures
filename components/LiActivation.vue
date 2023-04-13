<template>
  <div
    class="flex justify-between items-center h-[55px] px-5 bg-dark-50 backdrop-blur-md border-2 border-white-20"
    :style="activation.status === 'created' && friendUnavailable && !own ? 'opacity: 0.5;' : ''"
  >
    <div class="flex flex-col text-sm">
      <p class="capitalize">
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
      <Icon v-if="activation.status === 'created' && friendUnavailable && !own" type="time" />
      <div
        v-if="activation.status === 'created' && !friendUnavailable && !own"
        class="flex justify-center items-center h-6 px-2 border-2 border-red"
      >
        New Invite
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
const emotions: any = await useEmotions()
const relationshapes: any = await useRelationshapes()

const props = defineProps({
  activation: {
    type: Object,
    required: true
  },
  friendUnavailable: {
    type: Boolean,
    required: false
  }
})

const user = useSupabaseUser()
const db = useDb()

const own = computed(() => props.activation.user_id === user.value?.id)
const accounterpart = computed(() =>
  db.value.friends.find(
    (f: any) =>
      f.user_id === props.activation.friend_id ||
      f.user_id === props.activation.user_id
  )
)
</script>

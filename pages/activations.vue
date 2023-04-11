<template>
  <div class="h-full p-safe flex flex-col">
    <div class="flex justify-between items-center shrink">
      <p class="text-xl font-bold">Activations</p>
      <Icon type="plus" @click="navigateTo('/feed')" />
    </div>
    <div class="flex flex-col grow items-center mt-5 overflow-hidden">
      <div class="flex w-full gap-2">
        <Btn :type="completedTab ? '' : 'dark'" @click="completedTab = true"
          >Completed [{{ all.length }}]</Btn
        >
        <Btn :type="!completedTab ? '' : 'dark'" @click="completedTab = false"
          >Invites [{{ invites.length }}]</Btn
        >
      </div>
      <div class="grow flex flex-col w-full mt-2 overflow-y-scroll">
        <div v-if="completedTab" class="flex flex-col w-full mt-2 gap-2">
          <LiActivation
            v-for="a in all"
            @click="navigateTo(`/activation/${a.id}`)"
            :activation="a"
            :accounterpart="getAccounterpartFromActivation(a)"
          />
        </div>
        <div v-else class="flex flex-col w-full mt-2 gap-2">
          <LiActivation
            v-for="a in invites"
            @click="handleInviteClick(a)"
            :activation="a"
            :accounterpart="getAccounterpartFromActivation(a)"
            :disabled="isFriendUnavailable(a.user_id)"
          />
        </div>
      </div>
      <div v-if="!completedTab" class="mt-5">
        <p class="text-xs text-center">Sometimes you need to wait for your Accounterparts to finish another Activation</p>
      </div>
    </div>
    <div class="flex justify-center items-end shrink gap-2 mt-5">
      <Btn @click="navigateTo('/accounterparts')" type="dark" padding="1">
        <Icon type="accounterparts" size="m" />
      </Btn>
      <Btn @click="navigateTo('/emoxy')" type="dark" padding="1">
        <Icon type="heart" size="m" />
      </Btn>
      <Btn @click="navigateTo('/activations')" padding="1">
        <Icon type="activation" size="m" invert />
      </Btn>
    </div>
  </div>
  <div class="absolute top-0 left-0 h-full w-full z-[-10]">
    <div
      class="h-full w-full flex justify-center items-center bg-[url('/imgs/bg-1.png')] bg-cover"
    ></div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

const user = useSupabaseUser()
const db = useDb()

const completedTab = ref(true)

const all = computed(() =>
  db.value.activations.filter((a: any) => a.status !== 'created')
)
const invites = computed(() =>
  db.value.activations.filter((a: any) => a.status === 'created' && a.friend_id === user.value?.id)
)

function handleInviteClick(a: any) {
  if (isFriendUnavailable(a.user_id)) return
  navigateTo(`/activation/${a.id}`)
}

function getAccounterpartFromActivation(a: any) {
  return db.value.friends.find(
    (f: any) => f.user_id === a.friend_id || f.user_id === a.user_id
  )
}

function isFriendUnavailable(userId: string) {
  return db.value.friendsActivations.find(
    (a: any) =>
      (a.user_id === userId || a.friend_id === userId) &&
      a.status === 'accepted'
  )
    ? true
    : false
}
</script>

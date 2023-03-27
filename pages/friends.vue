<template>
  <div class="h-full p-5 flex flex-col">
    <div class="flex justify-between items-center shrink">
      <p v-if="step === 0" class="text-xl font-bold">Accounterparts</p>
      <Icon v-if="step === 0" type="menu" />
      <Icon v-if="step === 1" @click="handleBackClick" type="arrow-l" />
      <Icon v-if="step === 1" type="files" />
    </div>
    <div
      v-if="step === 0"
      class="flex flex-col grow items-center justify-between mt-5"
    >
      <p v-if="emoxy.friends.length === 0">No connections yet</p>
      <div v-if="friends.length > 0" class="w-full flex flex-col gap-2">
        <LiFriend
          v-for="friend in friends"
          @click="handleFriendClick(friend)"
          :name="friend.name"
          :activations="getActivationsWithFriend(friend.user_id)"
          :selected="selectedFriend?.id === friend.id"
          :unavailable="isFriendUnavailable(friend.user_id)"
          :invitation="hasInvitation(friend.user_id)"
        />
      </div>
    </div>
    <div
      v-if="step === 1"
      class="flex flex-col grow items-center justify-between mt-5"
    >
      <p class="text-xl font-bold">{{ selectedFriend.name }}</p>
      <div class="w-full flex flex-col gap-2 grow mt-5">
        <LiActivation
          v-for="a in getActivationsWithFriend(selectedFriend?.user_id)"
          @click="
            a.status === 'created' && a.user_id === selectedFriend?.user_id
              ? navigateTo(`http://localhost:3000/api/activation/${a.id}`, {
                  external: true
                })
              : navigateTo(`/activation/${a.id}`)
          "
          :activation="a"
          :invitation="
            a.status === 'created' && a.user_id === selectedFriend?.user_id
          "
        />
      </div>
    </div>
    <div class="flex justify-center items-end shrink gap-2 mt-5">
      <Btn @click="navigateTo('/friends')">
        <Icon type="friends" size="m" invert />
      </Btn>
      <Btn @click="navigateTo('/emoxy')" type="dark">
        <Icon type="heart" size="m" />
      </Btn>
      <Btn @click="navigateTo('/activations')" type="dark">
        <Icon type="emotions" size="m" />
      </Btn>
    </div>
  </div>
  <div class="absolute top-0 left-0 h-full w-full z-[-10]">
    <div
      class="h-full w-full flex justify-center items-center bg-[url('/imgs/bg-1.png')] bg-cover"
      :class="step === 1 ? 'blur-md' : ''"
    ></div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

const emoxy: any = await useEmoxy()
const friends: any = await useFriends()
const activations: any = await useActivations()
const friendsActivations: any = await useFriendsActivations(
  friends.map((f: any) => f.user_id)
)

const selectedFriend = ref({
  id: null,
  name: null,
  user_id: null || ''
})

const step = ref(0)

function handleFriendClick(friend: any) {
  selectedFriend.value = friend
  step.value = 1
}

function handleBackClick() {
  selectedFriend.value = {
    id: null,
    name: null,
    user_id: null || ''
  }
  step.value = 0
}

function getActivationsWithFriend(userId: string) {
  return activations.filter(
    (a: any) => a.user_id === userId || a.friend_id === userId
  )
}

function isFriendUnavailable(userId: string) {
  return friendsActivations.find(
    (a: any) =>
      (a.user_id === userId || a.friend_id === userId) &&
      a.status === 'accepted'
  )
    ? true
    : false
}

function hasInvitation(userId: string) {
  const a = getActivationsWithFriend(userId)
  return a.find((a: any) => a.status === 'created' && a.user_id === userId)
    ? true
    : false
}
</script>

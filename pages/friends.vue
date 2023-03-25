<template>
  <div class="h-full p-5 flex flex-col">
    <div class="flex justify-between items-center shrink">
      <p class="text-xl font-bold">Accounterparts</p>
      <Icon type="menu" />
    </div>
    <div class="flex flex-col grow items-center justify-between mt-5">
      <p v-if="emoxy.friends.length === 0">No connections yet</p>
      <div v-if="friends.length > 0" class="w-full flex flex-col gap-2">
        <Friend
            v-for="friend in friends"
            @click="selectedFriend = friend"
            :name="friend.name"
            :activations="getActivationsWithFriend(friend.user_id)"
            :selected="selectedFriend?.id === friend.id"
            :unavailable="isFriendUnavailable(friend.user_id)"
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
    <div class="absolute top-0 left-0 h-full w-full z-[-10]">
      <div
        class="h-full w-full flex justify-center items-center bg-[url('/imgs/bg-1.png')] bg-cover"
      >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

const emoxy: any = await useEmoxy()
const friends: any = await useFriends()
const friendsActivations: any = await useFriendsActivations(
  friends.map((f: any) => f.user_id)
)
const activations: any = await useActivations()

const selectedFriend = ref({
  id: null,
  name: null,
  user_id: null
})

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
</script>

<style scoped></style>

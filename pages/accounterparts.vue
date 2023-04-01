<template>
  <div
    class="absolute h-full w-full p-5 flex flex-col bg-dark-50 backdrop-blur-md z-[10]"
    v-if="step === 1 || step === 2"
  >
    <div class="flex justify-between items-center shrink">
      <Icon v-if="step === 1" @click="handleBackClick" type="arrow-l" />
      <Icon v-if="step === 1" type="files" />
      <div v-if="step === 2"></div>
      <Icon v-if="step === 2" @click="step = 0" type="close" />
    </div>
    <div
      v-if="step === 1"
      class="flex flex-col grow items-center mt-5 overflow-hidden"
    >
      <p class="text-xl font-bold">{{ selectedFriend.name }}</p>
      <div class="w-full mt-5 overflow-scroll">
        <div class="flex flex-col gap-2">
          <LiActivation
            v-for="a in getActivationsWithFriend(selectedFriend?.user_id)"
            @click="
              a.status === 'created' && a.user_id === selectedFriend?.user_id
                ? navigateTo(
                    `${useRuntimeConfig().baseURL}/api/activation/${a.id}`,
                    {
                      external: true
                    }
                  )
                : navigateTo(`/activation/${a.id}`)
            "
            :activation="a"
            :invitation="
              a.status === 'created' && a.user_id === selectedFriend?.user_id
            "
          />
        </div>
      </div>
    </div>
    <div v-if="step === 2" class="grow flex flex-col items-center mt-5">
      <p class="text-lg font-bold text-center">Connect Accounterpart</p>
      <p class="text-sm text-center mt-5">
        If you and your Accounterpart are in the same location, scan the
        qr-code, and you will be instantly connected. You can also share an
        invite link below.
      </p>
      <Qr
        :value="`${useRuntimeConfig().baseURL}/api/connect/${emoxy.id}`"
        class="w-3/5 mt-5"
      />
      <p class="text-sm text-center mt-5 underline" @click="handleShareClick">
        Share invite link
      </p>
    </div>
    <div v-if="step === 2">
      <Btn @click="step = 0"> I shared the invitation </Btn>
    </div>
  </div>
  <div class="h-full p-5 flex flex-col">
    <div class="flex justify-between items-center shrink">
      <p class="text-xl font-bold">Accounterparts</p>
      <Icon type="menu" />
    </div>
    <div class="flex flex-col grow items-center mt-5 overflow-hidden">
      <Btn
        @click="step = 2"
        type="dark"
        padding="0.5"
        class="rounded-sm text-sm"
        >New Connection Invite</Btn
      >
      <div class="grow w-full flex flex-col overflow-hidden">
        <p v-if="emoxy.friends.length === 0">No connections yet</p>
        <div v-if="friends.length > 0" class="w-full mt-5 overflow-scroll">
          <div class="flex flex-col gap-2">
            <LiAccounterpart
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
      </div>
      <p class="text-xs text-center mt-5">
        Accounterparts appear here only when they have accepted your invitation
        to connect
      </p>
    </div>
    <div class="flex justify-center items-end gap-2 mt-5">
      <Btn @click="navigateTo('/accounterparts')" padding="1">
        <Icon type="accounterparts" size="m" invert />
      </Btn>
      <Btn @click="navigateTo('/emoxy')" type="dark" padding="1">
        <Icon type="heart" size="m" />
      </Btn>
      <Btn @click="navigateTo('/emotions')" type="dark" padding="1">
        <Icon type="emotions" size="m" />
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

function handleShareClick() {
  if (navigator.share) {
    navigator.share({
      title: 'Emotional Futures Invitation',
      text: "Hey, I'm playing the Emotional Futures game and would like to invite you to join me in growing my Emoxy. Follow the link to learn more and accept this invitation.",
      url: `${useRuntimeConfig().baseURL}/api/connect/${emoxy.id}`
    })
  } else {
    alert(`Hey, I'm playing the Emotional Futures game and would like to invite you to join me in growing my Emoxy. Follow the link to learn more and accept this invitation. ${useRuntimeConfig().baseURL}/api/connect/${emoxy.id}`)
  }
}
</script>

<template>
  <div
    v-if="connected"
    class="absolute h-full w-full p-safe flex flex-col justify-center items-center bg-dark-50 backdrop-blur-md z-[15]"
  >
    <Icon type="check" size="l" />
    <p class="font-bold mt-5">You and {{ connectInput }} are now connected</p>
  </div>
  <div
    class="absolute h-full w-full p-safe flex flex-col bg-dark-50 backdrop-blur-md z-[10]"
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
            @click="navigateTo(`/activation/${a.id}`)"
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
        To connect with an Accounterpart, type their Emoxy name below
      </p>
      <div class="w-full flex flex-col gap-2 mt-5">
        <div
          class="p-2 bg-dark-90"
          :class="error ? 'opacity-100' : 'opacity-0'"
        >
          <p class="text-xs">Emoxy not found or already connected.</p>
        </div>
        <InputText
          v-model="connectInput"
          placeholder="Type Emoxy Name"
          @keyup.enter.native="handleConnectClick"
          @keydown.space="(event: any) => event.preventDefault()"
          focus
        />
        <Btn
          @click="handleConnectClick"
          :disabled="validEmoxyName ? false : true"
          >{{ loading ? 'Connecting...' : 'Connect' }}</Btn
        >
      </div>
    </div>
  </div>
  <div class="h-full p-safe flex flex-col">
    <div class="flex justify-between items-center shrink">
      <p class="text-xl font-bold">Accounterparts</p>
      <Icon type="plus" @click="step = 2" />
    </div>
    <div class="flex flex-col grow items-center mt-5 overflow-hidden">
      <div class="grow w-full flex flex-col overflow-hidden">
        <p v-if="emoxy.friends.length === 0">No connections yet</p>
        <div v-if="friends.length > 0" class="w-full overflow-scroll">
          <div class="flex flex-col gap-2">
            <LiAccounterpart
              v-for="friend in friends"
              @click="handleFriendClick(friend)"
              :name="friend.name"
              :activations="getActivationsWithFriend(friend.user_id)"
              :selected="selectedFriend?.id === friend.id"
              :unavailable="isFriendUnavailable(friend.user_id)"
              :busy="isFriendBusy(friend.user_id)"
              :invitation="hasInvitation(friend.user_id)"
            />
          </div>
        </div>
      </div>
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

const user = useSupabaseUser()
const emoxy: any = await useEmoxy()
let friends: any = await useFriends()
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

const connectInput = ref('')
const error = ref(false)
const loading = ref(false)
const connected = ref(false)

const validEmoxyName = computed(() => connectInput.value.trim().length >= 4)

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

function isFriendBusy(userId: string) {
  return friendsActivations.find(
    (a: any) =>
      (a.user_id === userId || a.friend_id === userId) &&
      a.status === 'accepted' &&
      (a.user_id === user.value?.id || a.friend_id === user.value?.id)
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
    alert(
      `Hey, I'm playing the Emotional Futures game and would like to invite you to join me in growing my Emoxy. Follow the link to learn more and accept this invitation. ${
        useRuntimeConfig().baseURL
      }/api/connect/${emoxy.id}`
    )
  }
}

async function handleConnectClick() {
  error.value = false
  loading.value = true
  const r = await connectAccounterpart(connectInput.value.trim())
  loading.value = false

  if (r instanceof Error) {
    error.value = true
    connectInput.value = ''
  } else {
    friends = await useFriends()
    connected.value = true
    setTimeout(() => {
      step.value = 0
      connected.value = false
    }, 2500)
  }
}
</script>

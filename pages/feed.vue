<template>
  <div
    class="absolute h-full w-full p-5 flex flex-col bg-dark-50 backdrop-blur-md z-[10]"
  >
    <div class="flex justify-between items-center">
      <div>
        <Icon type="files" />
      </div>
      <div>
        <p class="text-lg text-white-50">Feed Emoxy</p>
      </div>
      <div @click="navigateTo('/emoxy')">
        <Icon type="close" />
      </div>
    </div>
    <div v-if="step === 0" class="grow flex flex-col mt-5">
      <p class="text-lg font-bold text-center">Who will help you?</p>
      <div
        class="flex flex-col items-center justify-start mt-5 overflow-x-scroll"
      >
        <p v-if="emoxy.friends.length === 0">No connections yet</p>
        <div v-if="friends.length > 0" class="w-full flex flex-col gap-2">
          <LiAccounterpart
            v-for="friend in friends"
            @click="
              isFriendUnavailable(friend.user_id)
                ? null
                : (selectedFriend = friend)
            "
            :name="friend.name"
            :activations="getActivationsWithFriend(friend.user_id)"
            :selected="selectedFriend?.id === friend.id"
            :unavailable="isFriendUnavailable(friend.user_id)"
          />
        </div>
      </div>
    </div>
    <div v-if="step === 0" class="flex flex-col justify-center items-center">
      <p class="text-xs text-center">
        Accounterparts appear here only when they have accepted your invitation
        to connect
      </p>
      <Btn
        class="mt-2"
        @click="step = 1"
        :disabled="selectedFriend.id ? false : true"
        >Confirm Accounterpart</Btn
      >
    </div>
    <div v-if="step === 1" class="h-[70%] flex flex-col mt-5">
      <p v-if="!selectedEmotion.name" class="text-lg font-bold text-center">
        Choose emotion to activate
      </p>
      <p
        v-if="selectedEmotion.name"
        class="text-lg font-bold text-center capitalize"
      >
        {{ selectedEmotion.name }}
      </p>
      <div class="grow px-5 mt-5">
        <Activation
          @click="selectedEmotion?.id ? (step = 2) : ''"
          :accounterpart="selectedFriend"
          :emotion="selectedEmotion"
          locked
        />
      </div>
    </div>
    <div v-if="step === 1" class="flex flex-wrap justify-center gap-2 mt-5">
      <div
        v-for="emotion in emotions"
        @click="selectedEmotion = emotion"
        class="flex w-6 h-6 rounded-full"
        :class="`${
          selectedEmotion.name === emotion.name ? 'border-2 border-white' : ''
        }`"
        :style="`background: ${emotion.color}`"
      ></div>
    </div>
    <div v-if="step === 2" class="grow flex flex-col mt-5">
      <p
        v-if="!selectedRelationshape.name"
        class="text-lg font-bold text-center"
      >
        Choose Relationshape
      </p>
      <p
        v-if="selectedRelationshape.name"
        class="text-lg font-bold text-center capitalize"
      >
        {{ selectedRelationshape.name }}
      </p>
      <div class="w-full h-full grid grid-cols-2 gap-2 mt-5">
        <LiRelationshape
          v-for="relationshape in relationshapes"
          @click="selectedRelationshape = relationshape"
          :relationshape="relationshape"
          :selected="selectedRelationshape?.id === relationshape.id"
        />
      </div>
    </div>
    <div
      v-if="step === 2"
      class="flex flex-col justify-center items-center mt-5"
    >
      <Btn
        @click="selectedRelationshape.id ? (step = 3) : ''"
        :disabled="selectedRelationshape.id ? false : true"
        >Confirm Relationshape</Btn
      >
    </div>
    <div v-if="step === 3" class="grow flex flex-col mt-5">
      <p class="text-lg font-bold text-center">Review Activation Card</p>
      <div class="grow mt-5">
        <Activation
          :accounterpart="selectedFriend"
          :emotion="selectedEmotion"
          :relationshape="selectedRelationshape"
          locked
        />
      </div>
    </div>
    <div
      v-if="step === 3"
      class="flex flex-col justify-center items-center mt-5"
    >
      <Btn v-if="selectedRelationshape.name" @click="handleConfirmClick"
        >Confirm</Btn
      >
    </div>
  </div>
  <div
    class="h-full w-full flex justify-center items-center bg-[url('/imgs/bg-1.png')] bg-cover p-10"
  >
    <div class="h-1/2">
      <Emoxy />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

const user = useSupabaseUser()
const emoxy: any = await useEmoxy()
const friends: any = await useFriends()
const emotions: any = await useEmotions()
const relationshapes: any = await useRelationshapes()
const activations: any = await useActivations()
const activation: any = ref(null)
const friendsActivations: any = await useFriendsActivations(
  friends.map((f: any) => f.user_id)
)

const step = ref(0)

const selectedFriend = ref({
  id: null,
  name: null,
  user_id: null
})
const selectedEmotion = ref({
  id: null,
  name: null,
  color: null,
  prompts: []
})
const selectedRelationshape = ref({
  id: null,
  name: null,
  shape: null,
  accounting: <any>[]
})

onMounted(async () => {
  if (activations.length === 0) return

  const latest = activations[0]
  if (
    (latest.status === 'created' && latest.user_id === user.value?.id) ||
    latest.status === 'accepted'
  ) {
    navigateTo(`/activation/${latest.id}`)
  }
})

function isFriendUnavailable(userId: string) {
  return friendsActivations.find(
    (a: any) =>
      (a.user_id === userId || a.friend_id === userId) &&
      a.status === 'accepted'
  )
    ? true
    : false
}

function getActivationsWithFriend(userId: string) {
  return activations.filter(
    (a: any) => a.user_id === userId || a.friend_id === userId
  )
}

async function handleConfirmClick() {
  if (
    selectedFriend.value.user_id &&
    selectedEmotion.value.id &&
    selectedRelationshape.value.id
  ) {
    activation.value = await createActivation(
      [selectedEmotion.value.id, selectedRelationshape.value.id],
      selectedFriend.value.user_id
    )
    navigateTo(`/activation/${activation.value.id}`)
  } else {
    console.log('no selected emotion or relationshape')
  }
}
</script>

<style scoped></style>

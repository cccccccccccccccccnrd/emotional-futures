<template>
  <div
    class="absolute h-full w-full p-safe flex flex-col bg-dark-50 backdrop-blur-md z-[10]"
  >
    <div class="flex justify-between items-center">
      <div>
        <Icon
          type="arrow-l"
          @click="step === 0 ? router.back() : step--"
        />
      </div>
      <div>
        <p class="text-sm text-white-50">Feed Emoxy</p>
      </div>
      <div>
        <Icon
          v-if="step === 0"
          type="files"
          @click="handleOverlayClick('manual', ['accounterparts', 0])"
        />
        <Icon
          v-if="step === 1"
          type="files"
          @click="
            handleOverlayClick('manual', [
              'emotions',
              selectedEmotion.id ? selectedEmotion.id : 0
            ])
          "
        />
        <Icon
          v-if="step === 2"
          type="files"
          @click="
            handleOverlayClick('manual', [
              'relationshapes',
              selectedRelationshape.id ? selectedRelationshape.id : 0
            ])
          "
        />
        <Icon
          v-if="step === 3"
          type="files"
          @click="handleOverlayClick('manual', ['accounting', 0])"
        />
      </div>
    </div>
    <div v-if="step === 0" class="grow flex flex-col mt-5 overflow-hidden">
      <p class="text-lg font-bold text-center">Who will help you?</p>
      <div
        class="flex flex-col items-center justify-start mt-5 overflow-y-scroll"
      >
        <div v-if="db.friends.length === 0">
          <p class="text-center">
            You have no Accounterparts in your Emotional Futures Network yet.
            Please Connect with an Accounterpart to proceed.
          </p>
          <Btn @click="navigateTo('/accounterparts?connect=true')" class="mt-5"
            >Connect Accounterpart</Btn
          >
        </div>
        <div v-if="db.friends.length > 0" class="w-full flex flex-col gap-2">
          <LiAccounterpart
            v-for="friend in db.friends"
            @click="handleFriendClick(friend)"
            :name="friend.name"
            :activations="getActivationsWithFriend(friend.user_id)"
            :selected="selectedFriend?.id === friend.id"
            :unavailable="isFriendUnavailable(friend.user_id)"
            :invited="isFriendInvited(friend.user_id)"
            :disabled="isFriendUnavailable(friend.user_id) || isFriendInvited(friend.user_id)"
          />
        </div>
      </div>
    </div>
    <div
      v-if="step === 0"
      class="flex flex-col justify-center items-center mt-5"
    >
      <Btn
        @click="selectedFriend ? (step = 1) : null"
        :disabled="selectedFriend ? false : true"
        >Confirm Accounterpart</Btn
      >
    </div>
    <div v-if="step === 1" class="grow flex flex-col mt-5">
      <p v-if="!selectedEmotion.name" class="text-lg font-bold text-center">
        Choose emotion to activate
      </p>
      <p
        v-if="selectedEmotion.name"
        class="text-lg font-bold text-center capitalize"
      >
        {{ selectedEmotion.name }}
      </p>
      <div class="grow px-8 mt-5">
        <Activation
          @click="selectedEmotion?.id ? (step = 2) : ''"
          :accounterpart="selectedFriend"
          :emotion="selectedEmotion"
          locked
          bg
        />
      </div>
    </div>
    <div v-if="step === 1" class="flex flex-wrap justify-center gap-2 mt-5">
      <Emotions v-model="selectedEmotion" :availableEmotions="emotions" />
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
          bg
        />
      </div>
    </div>
    <div
      v-if="step === 3"
      class="flex flex-col justify-center items-center mt-5"
    >
      <Btn @click="handleConfirmClick">{{
        loading ? 'Confirming...' : 'Confirm'
      }}</Btn>
    </div>
  </div>
  <div
    class="h-full w-full flex justify-center items-center bg-[url('/imgs/bg-1.png')] bg-cover p-10"
  >
    <div class="h-1/2">
      <!-- <Emoxy /> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { Emoxy } from '~/types/futures'

definePageMeta({
  middleware: 'auth'
})

const db = useDb()

const router = useRouter()
const overlay = useOverlay()
const emotions: any = await useEmotions()
const relationshapes: any = await useRelationshapes()
const activation: any = ref(null)

const step = ref(0)
const confirmed = ref(false)

const selectedFriend = ref<Emoxy>()
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
const loading = ref(false)

onMounted(async () => {
  const route = useRoute()
  if (route.query.accounterpart) {
    const f = db.value.friends.find(
      (f: any) => f.id === route.query.accounterpart
    )

    if (f) {
      selectedFriend.value = f
      step.value = 1
    }
  }
})

function isFriendInvited(userId: string) {
  return db.value.activations.find(
    (a: any) =>
      (a.friend_id === userId) &&
      a.status === 'created'
  )
    ? true
    : false
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

function getActivationsWithFriend(userId: string) {
  return db.value.activations.filter(
    (a: any) => a.user_id === userId || a.friend_id === userId
  )
}

function handleFriendClick(friend: Emoxy) {
  if (isFriendUnavailable(friend.user_id) || isFriendInvited(friend.user_id)) return
  selectedFriend.value = friend
}

async function handleConfirmClick() {
  if (
    selectedFriend.value?.user_id &&
    selectedEmotion.value.id &&
    selectedRelationshape.value.id &&
    !confirmed.value
  ) {
    confirmed.value = true
    loading.value = true
    activation.value = await createActivation(
      [selectedEmotion.value.id, selectedRelationshape.value.id],
      selectedFriend.value.user_id
    )
    setTimeout(() => {
      loading.value = false
      confirmed.value = false
      navigateTo(`/activation/${activation.value.id}`)
    }, 300)
  }
}

function handleOverlayClick(type: string, page: [string, number]) {
  overlay.value.isOpen = true
  overlay.value.type = type
  overlay.value.page = page
}
</script>

<style scoped></style>

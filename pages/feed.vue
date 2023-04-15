<template>
  <div
    v-if="created"
    class="absolute h-full w-full p-safe flex flex-col justify-center items-center bg-dark-50 backdrop-blur-md z-[15]"
  >
    <Icon type="check" size="l" />
    <p class="text-center font-bold mt-5">Activation Created</p>
    <p class="text-center mt-5">
      The invite has been <br />
      sent to <span class="font-bold">{{ selectedFriend?.name }}</span>
    </p>
  </div>
  <div
    class="absolute h-full w-full p-safe flex flex-col bg-dark-50 backdrop-blur-md z-[10]"
  >
    <div class="flex justify-between items-center">
      <div>
        <Icon
          v-if="step === -1"
          @click="handleOverlayClick('manual', ['', 0])"
          type="files"
        />
        <Icon v-if="step !== -1 && step !== -2" @click="step--" type="arrow-l" />
        <Icon
          v-if="step === -2"
          type="files"
          @click="handleOverlayClick('manual', ['', 0])"
          flash
        />
      </div>
      <div :class="step === -2 ? 'opacity-0' : ''">
        <p v-if="step === -1" class="text-sm text-white-50">Feed Emoxy</p>
        <p v-if="step !== -1" class="text-sm text-white-50">
          Initiate Activation
        </p>
      </div>
      <div>
        <Icon v-if="step === -1" @click="router.back()" type="close" />
        <Icon
          v-if="step === -2"
          type="files"
          @click="handleOverlayClick('manual', ['', 0])"
          flash
        />
        <Icon
          v-if="step !== -1 && step !== -2"
          type="files"
          @click="handleOverlayClick('manual', ['', 0])"
        />
      </div>
    </div>
    <div v-if="step === -2" class="grow flex flex-col mt-5 overflow-hidden">
      <div class="grow flex flex-col">
        <p class="text-2xl font-bold">Emotional Futures Manual</p>
        <p class="mt-5">
          If you are feeling lost, or simply want to know more, you will find all of the information you need once you click on the Manual icon, always available at the top corner of the screen.
        </p>
        <p class="mt-5">
          From extra information about Emotions, Relationshapes, and
          Accounterpart connections, to a complete guide to creating activation
          cards, invites, and Accounting.
        </p>
      </div>
      <Btn @click="step = -1" class="mt-5">I get it!</Btn>
    </div>
    <div v-if="step === -1" class="grow flex flex-col mt-5 overflow-hidden">
      <EmoxyProgress />
      <p class="font-bold mt-5">Activations Invites [{{ invites.length }}]</p>
      <div class="grow flex flex-col w-full mt-2 overflow-y-scroll">
        <div class="flex flex-col w-full gap-2">
          <LiActivation
            v-for="a in invites"
            @click="handleInviteClick(a)"
            :activation="a"
            :friendUnavailable="
              isFriendUnavailable(
                user?.id !== a.user_id ? a.user_id : String(a.friend_id)
              )
            "
          />
        </div>
      </div>
      <div class="mt-5">
        <p class="text-xs text-center">
          Sometimes you need to wait for your Accounterparts to finish another
          Activation
        </p>
      </div>
      <Btn @click="step = 0" class="mt-5">Initiate New Activation</Btn>
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
            :activations="activationsWithFriend(friend.user_id)"
            :selected="selectedFriend?.id === friend.id"
            :unavailable="isFriendUnavailable(friend.user_id)"
            :invited="isFriendInvited(friend.user_id)"
            :disabled="isFriendUnavailable(friend.user_id)"
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
        Choose Emotion to Activate
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
      <p class="text-lg font-bold text-center">Choose Relationshape</p>
      <div class="w-full h-full grid grid-cols-2 gap-2 mt-5">
        <LiRelationshape
          v-for="relationshape in relationshapes"
          @click="handleRelationshapeClick(relationshape)"
          :relationshape="relationshape"
        />
      </div>
    </div>
    <div
      v-if="step === 2"
      class="flex flex-col justify-center items-center mt-5"
    >
      <Btn disabled>Confirm Relationshape</Btn>
    </div>
    <div
      v-if="step === 3"
      class="grow flex flex-col items-center overflow-hidden mt-5"
    >
      <p class="text-lg font-bold text-center capitalize">
        {{ selectedRelationshape.name }} Relationshape
      </p>
      <LiRelationshape
        class="max-w-[50%] max-h-[20%] mt-5"
        :relationshape="selectedRelationshape"
      />
      <div class="mt-5 overflow-y-scroll">
        <div v-html="selectedRelationshape.description"></div>
      </div>
    </div>
    <div
      v-if="step === 3"
      class="flex flex-col justify-center items-center mt-5"
    >
      <Btn
        @click="selectedRelationshape.id ? (step = 4) : null"
        :disabled="selectedRelationshape.id ? false : true"
        >Confirm Relationshape</Btn
      >
    </div>
    <div v-if="step === 4" class="grow flex flex-col mt-5">
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
      v-if="step === 4"
      class="flex flex-col justify-center items-center mt-5"
    >
      <Btn @click="handleConfirmClick">{{
        loading ? 'Confirming...' : 'Confirm'
      }}</Btn>
    </div>
  </div>
  <div
    class="h-full w-full flex justify-center items-center bg-cover p-10"
    :style="
      created
        ? `background-image: url('/imgs/emotions/bg-${selectedEmotion.id}.png')`
        : `background-image: url('/imgs/bg-1.png')`
    "
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

const user = useSupabaseUser()
const db = useDb()

const router = useRouter()
const overlay = useOverlay()
const emotions: any = await useEmotions()
const relationshapes: any = await useRelationshapes()
const activation: any = ref(null)

const step = ref(-1)
const confirmed = ref(false)
const created = ref(false)

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
  description: '',
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
  } else if (route.query.init) {
    step.value = 0
  } else if (db.value.emoxy.bst.reduce((acc, a) => acc + a, 0) < 50) {
    step.value = -2
  }
})

const invites = computed(() =>
  db.value.activations.filter(
    (a: any) => a.status === 'created' && a.friend_id === user.value?.id
  )
)

function isFriendInvited(userId: string) {
  return db.value.activations.find(
    (a: any) => a.friend_id === userId && a.status === 'created'
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

function activationsWithFriend(userId: string) {
  return db.value.activations.filter(
    (a: any) => a.user_id === userId || a.friend_id === userId
  )
}

function handleRelationshapeClick(relationshape: any) {
  selectedRelationshape.value = relationshape
  step.value = 3
}

function handleFriendClick(friend: Emoxy) {
  if (isFriendUnavailable(friend.user_id)) return
  selectedFriend.value = friend
}

function handleInviteClick(a: any) {
  if (
    isFriendUnavailable(user.value?.id !== a.user_id ? a.user_id : a.friend_id)
  )
    return
  navigateTo(`/activation/${a.id}`)
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

    created.value = true
    loading.value = false
    confirmed.value = false

    setTimeout(() => {
      navigateTo(`/activation/${activation.value.id}`)
    }, 3000)
  }
}

function handleOverlayClick(type: string, page: [string, number]) {
  overlay.value.isOpen = true
  overlay.value.type = type
  overlay.value.page = page
}
</script>

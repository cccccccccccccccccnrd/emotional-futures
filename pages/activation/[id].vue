<template>
  <div
    v-if="accepted || terminated || fed"
    class="absolute h-full w-full p-safe flex flex-col justify-center items-center bg-dark-50 backdrop-blur-md z-[15]"
    :class="fed ? 'bg-white-100 !p-0' : ''"
  >
    <div v-if="accepted" class="flex flex-col justify-center items-center">
      <Icon type="check" size="l" />
      <p class="font-bold mt-5">Activation Accepted</p>
    </div>
    <div v-if="terminated" class="flex flex-col justify-center items-center">
      <Icon type="close" size="l" />
      <p class="font-bold mt-5">Activation Terminated</p>
    </div>
    <div
      v-if="fed"
      class="relative h-full w-full flex flex-col items-center"
      :style="`--from-top: ${isMobile ? '45vh' : '290px'}`"
    >
      <div class="drop">
        <img src="/imgs/drop-blood.png" class="opacity-0" />
      </div>
      <div class="wave"></div>
      <div
        class="absolute h-full w-full p-safe flex flex-col justify-center items-center"
      >
        <div class="face">
          <img src="/imgs/emoxy/eats-1.png" class="opacity-0" />
        </div>
      </div>
      <p
        class="absolute bottom-0 w-full p-safe text-center underline text-dark-100 font-bold text-sm"
        @click="handleSkipClick"
      >
        Skip
      </p>
      <div
        class="absolute w-full h-full z-[-10] opacity-30"
        :style="fed ? `background-image: url('/imgs/bg-1.png');` : ''"
      ></div>
    </div>
  </div>
  <div
    class="absolute h-full w-full p-safe flex flex-col bg-dark-50 backdrop-blur-md z-[10]"
    v-if="
      step === 1 ||
      step === 3 ||
      step === 4 ||
      step === 5 ||
      step === 6 ||
      step === 7 ||
      step === 10
    "
  >
    <div class="flex justify-between items-center">
      <div>
        <Icon
          v-if="step === 3 || step === 4"
          type="files"
          @click="handleOverlayClick('manual', ['', 0])"
        />
        <Icon
          v-if="step === 5 || step === 6 || step === 7"
          type="arrow-l"
          @click="step = step - 1"
        />
      </div>
      <div v-if="step === 3 || step === 4 || step === 5">
        <p class="text-sm text-white-50">Accounting</p>
      </div>
      <div v-if="step === 6 || step === 7">
        <p class="text-sm text-white-50 capitalize">
          {{ selectedAccount.name }}
        </p>
      </div>
      <div>
        <Icon v-if="step === 1" type="close" @click="step = 0" />
        <Icon
          v-if="
            step === 3 || step === 4
          "
          type="close"
          @click="step = 2"
        />
        <Icon v-if="step === 10" type="close" @click="step = 9" />
        <Icon
          v-if="step === 5 || step === 6 || step === 7"
          type="files"
          @click="handleOverlayClick('manual', ['', 0])"
        />
      </div>
    </div>
    <div v-if="step === 3" class="grow flex flex-col items-center">
      <p class="text-lg font-bold mt-5">Get ready to invest in your future.</p>
      <p class="mt-5">
        Measuring the value of an emotional interaction is not easy for humans.
      </p>
      <p class="mt-5">
        Humans may find the accounting process uncomfortable, and at times even
        upsetting.
      </p>
      <p class="mt-5">
        This is an essential step on your path to your Emotional Future.
      </p>
    </div>
    <div v-if="step === 3" class="flex flex-col justify-center items-center">
      <Btn @click="step = 4">Start Accounting</Btn>
    </div>
    <div v-if="step === 4" class="grow flex flex-col overflow-hidden">
      <p class="mt-5">
        The
        <span class="capitalize">{{ selectedRelationshape.name }}</span>
        Relationshape requires
        {{ selectedRelationshape.accounting.length }} Accounting step{{
          selectedRelationshape.accounting.length > 1 ? 's' : ''
        }}:
      </p>
      <div class="mt-5 overflow-y-scroll">
        <div class="flex flex-col gap-2">
          <LiAccounting
            v-for="(account, index) in selectedRelationshape.accounting"
            :title="account.name"
            :icon="completedAccounts.find((a: any) => a.name === account.name) ? 'check' : 'arrow-r'"
            :disabled="index > completedAccounts.length"
            @click="
              index === completedAccounts.length
                ? handleAccountClick(account)
                : null
            "
          />
        </div>
      </div>
    </div>
    <div v-if="step === 4" class="flex flex-col justify-center items-center">
      <div class="w-full flex gap-4 mt-4">
        <Btn
          @click="
            selectedRelationshape.accounting.length !== completedAccounts.length
              ? null
              : handleInvestmentClick()
          "
          :disabled="
            selectedRelationshape.accounting.length !== completedAccounts.length
          "
          >{{ loading ? 'Confirming...' : 'Confirm Investment' }}</Btn
        >
      </div>
    </div>
    <div v-if="step === 5" class="grow flex flex-col items-center">
      <p class="mt-5 font-bold w-full">{{ selectedAccount.name }}</p>
      <div class="mt-5" v-html="selectedAccount.text"></div>
    </div>
    <div v-if="step === 5" class="flex flex-col justify-center items-center">
      <div class="w-full flex gap-4 mt-4">
        <Btn @click="step = 6">Measure</Btn>
      </div>
    </div>
    <div v-if="step === 6" class="grow flex flex-col">
      <p class="text-lg text-center font-bold mt-5">Sweat</p>
      <p class="text-center mt-2">Evaluate yourself</p>
      <div class="grow flex justify-center items-center mt-5 px-10">
        <InputDrop v-model="sweat" type="sweat" />
      </div>
    </div>
    <div v-if="step === 6" class="flex flex-col justify-center items-center">
      <div class="w-full flex gap-4 mt-5">
        <Btn @click="step = 7">Confirm Sweat Measure</Btn>
      </div>
    </div>
    <div v-if="step === 7" class="grow flex flex-col">
      <p class="text-lg text-center font-bold mt-5">Tears</p>
      <p class="text-center mt-2">Evaluate your Accounterpart</p>
      <div class="grow flex justify-center items-center mt-5 px-10">
        <InputDrop v-model="tears" type="tears" />
      </div>
    </div>
    <div v-if="step === 7" class="flex flex-col justify-center items-center">
      <div class="w-full flex gap-4 mt-5">
        <Btn @click="handleMeasureClick">Confirm Tear Measure</Btn>
      </div>
    </div>
    <div v-if="step === 10" class="grow flex flex-col">
      <p class="text-lg text-center font-bold mt-5">New Account Balance</p>
      <EmoxyProgress :results="results" class="mt-5" />
      <div class="grow flex flex-col gap-2 justify-center items-center">
        <p class="font-bold capitalize">
          {{ selectedEmotion.name }} {{ selectedRelationshape.name }} Activation
        </p>
        <div
          v-for="(r, i) in [results[1], results[2], results[0]]"
          class="w-full flex justify-between items-center font-bold p-5 bg-dark-50 backdrop-blur-md border-2 border-white-50"
        >
          <p v-if="i === 0" class="text-sm">Sweat collected</p>
          <p v-if="i === 1" class="text-sm">Tears collected</p>
          <p v-if="i === 2" class="text-sm">Blood collected</p>
          <div class="flex gap-2 items-center">
            {{ r }}
            <img
              :src="`/imgs/drop-${
                i === 0 ? 'sweat' : i === 1 ? 'tears' : 'blood'
              }.png`"
              class="w-4"
            />
          </div>
        </div>
      </div>
    </div>
    <div v-if="step === 10" class="flex flex-col justify-center items-center">
      <div class="w-full flex gap-4 mt-5">
        <Btn @click="handleFeedClick">{{
          loading ? 'Feeding...' : 'Feed Emoxy'
        }}</Btn>
      </div>
    </div>
  </div>
  <div class="h-full w-full p-safe flex flex-col">
    <div class="flex justify-between items-center">
      <div>
        <Icon @click="router.back()" type="arrow-l" />
      </div>
      <div>
        <Icon @click="navigateTo('/emoxy')" type="heart" />
      </div>
      <div>
        <Icon
          v-if="
            step === 0 ||
            step === 1 ||
            step === 2 ||
            step === 8 ||
            step === 9 ||
            step === 10 ||
            step === 11 ||
            step === 12
          "
          type="files"
          @click="handleOverlayClick('manual', ['', 0])"
        />
      </div>
    </div>
    <div v-if="step === 0 || step === 1" class="grow flex flex-col mt-5">
      <Activation
        :emotion="selectedEmotion"
        :relationshape="selectedRelationshape"
        :accounterpart="selectedFriend"
        :invite="activation?.friend_id === user?.id"
        locked
      />
    </div>
    <div v-if="step === 0 || step === 1" class="flex gap-2 items-center mt-5">
      <Btn @click="handleTerminateClick" type="dark">{{
        activation?.friend_id === user?.id ? 'Decline' : 'Cancel Invite'
      }}</Btn>
      <Btn
        v-if="activation?.friend_id === user?.id"
        @click="handleAcceptClick"
        style="filter: drop-shadow(black 0 0 0)"
        :disabled="isFriendUnavailable || busy"
        >{{ loading ? 'Accepting...' : 'Accept' }}</Btn
      >
    </div>
    <div
      v-if="
        step === 2 ||
        step === 3 ||
        step === 4 ||
        step === 5 ||
        step === 6 ||
        step === 7
      "
      class="grow flex flex-col"
    >
      <Activation
        class="mt-5"
        :emotion="selectedEmotion"
        :relationshape="selectedRelationshape"
        :accounterpart="selectedFriend"
        isRevealed
      />
    </div>
    <div
      v-if="
        step === 2 ||
        step === 3 ||
        step === 4 ||
        step === 5 ||
        step === 6 ||
        step === 7
      "
      class="flex gap-2 justify-center items-center mt-5"
    >
      <Btn @click="handleTerminateClick" type="dark">Delete</Btn>
      <Btn @click="step = 3">Accounting</Btn>
    </div>
    <div
      v-if="step === 8"
      class="grow relative flex flex-col justify-center items-center"
    >
      <Activation
        class="mt-5"
        :emotion="selectedEmotion"
        :relationshape="selectedRelationshape"
        :accounterpart="selectedFriend"
        waiting="accounting"
        locked
      />
    </div>
    <div v-if="step === 8" class="flex flex-col justify-center items-center">
      <div class="w-full flex gap-4 mt-5">
        <Btn @click="handleTerminateClick" type="dark">Delete</Btn>
      </div>
    </div>
    <div
      v-if="step === 9 || step === 10"
      class="grow relative flex flex-col justify-center items-center"
    >
      <Activation
        class="mt-5"
        :emotion="selectedEmotion"
        :relationshape="selectedRelationshape"
        :accounterpart="selectedFriend"
        ending
        locked
      />
    </div>
    <div
      v-if="step === 9 || step === 10"
      class="flex flex-col justify-center items-center"
    >
      <div class="w-full flex gap-4 mt-5">
        <Btn @click="step = 10">Show Accounting Results</Btn>
      </div>
    </div>
    <div
      v-if="step === 11"
      class="grow relative flex flex-col justify-center items-center"
    >
      <Activation
        class="mt-5"
        :emotion="selectedEmotion"
        :relationshape="selectedRelationshape"
        :accounterpart="selectedFriend"
        waiting="feeding"
        locked
      />
    </div>
    <div v-if="step === 11" class="flex flex-col justify-center items-center">
      <div class="w-full flex gap-4 mt-5">
        <Btn @click="handleTerminateClick" type="dark">Delete</Btn>
      </div>
    </div>
    <div
      v-if="step === 12"
      class="grow relative flex flex-col justify-center items-center"
    >
      <Activation
        class="mt-5"
        :emotion="selectedEmotion"
        :relationshape="selectedRelationshape"
        :accounterpart="selectedFriend"
        :results="results"
      />
    </div>
  </div>
  <div class="absolute top-0 left-0 h-full w-full z-[-10]">
    <div
      class="h-full w-full flex flex-col justify-center items-center bg-cover"
      :style="`background-image: url('/imgs/emotions/bg-${selectedEmotion.id}.png')`"
    ></div>
  </div>
</template>

<script setup lang="ts">
import type { Emoxy, Activation } from '~/types/futures'

definePageMeta({
  middleware: 'auth'
})

const route = useRoute()
const router = useRouter()

const user = useSupabaseUser()
const db = useDb()

const overlay = useOverlay()
const emotions: any = useEmotions()
const relationshapes: any = useRelationshapes()
const { isMobile } = useDevice()

const step = ref(0)
const accepted = ref(false)
const terminated = ref(false)
const fed = ref(false)
const loading = ref(false)

const activation = ref<Activation>()

const selectedFriend = ref<Emoxy>()
const selectedEmotion = ref({
  id: null,
  name: null,
  color: null,
  prompts: <any>[]
})
const selectedRelationshape = ref({
  id: null,
  name: null,
  shape: null,
  accounting: <any>[]
})
const selectedAccount = ref({
  id: null,
  name: null,
  text: null
})
const completedAccounts = ref(<any>[])
const sweat = ref('5')
const tears = ref('5')

const results = computed(() => {
  const f = activation.value?.results.find(
    (a: any) => a.userId === user.value?.id
  )
  if (f) {
    // @ts-ignore
    return f.results
  } else {
    return null
  }
})

const busy = computed(() => {
  return db.value.activations.find((a: any) => a.status === 'accepted')
    ? true
    : false
})

onMounted(() => {
  check(true)
})

watch(db.value.activations, () => {
  check()
})

function check(first?: Boolean) {
  const id = String(route.params.id)
  activation.value = db.value.activations.find((a: any) => a.id === id)

  if (first && !activation.value) {
    return navigateTo('/emoxy')
  } else if (!activation.value) {
    terminated.value = true
    setTimeout(() => {
      terminated.value = false
      navigateTo('/emoxy')
    }, 3000)
    return
  }

  selectedFriend.value = db.value.friends.find(
    (f: any) =>
      f.user_id === activation.value?.friend_id ||
      f.user_id === activation.value?.user_id
  )
  selectedEmotion.value = emotions.find(
    (e: any) => e.id === activation.value?.type[0]
  )
  selectedRelationshape.value = relationshapes.find(
    (r: any) => r.id === activation.value?.type[1]
  )

  if (activation.value?.status === 'created') {
    step.value = 0
    console.log('open activation', activation.value)
  } else if (
    activation.value?.status === 'accepted' &&
    activation.value?.accounts.length === 0
  ) {
    step.value = 2
    console.log('accepted activation', activation.value)
  } else if (
    activation.value?.status === 'accepted' &&
    activation.value?.accounts.length === 1
  ) {
    const f = activation.value?.accounts.find(
      (a: any) => a.userId === user.value?.id
    )
    if (f) {
      step.value = 8
      console.log('friends accounting move activation', activation.value)
    } else {
      step.value = 2
      console.log('accepted activation', activation.value)
    }
  } else if (
    activation.value?.status === 'accepted' &&
    activation.value?.accounts.length === 2 &&
    activation.value?.fed.length === 0
  ) {
    step.value = 9
    console.log('ending activation', activation.value)
  } else if (
    activation.value?.status === 'accepted' &&
    activation.value?.accounts.length === 2 &&
    activation.value?.fed.length === 1
  ) {
    const f = activation.value?.fed.find((f: any) => f === user.value?.id)
    if (f) {
      step.value = 11
      console.log('friends fed move activation', activation.value)
    } else {
      step.value = 9
      console.log('ending activation', activation.value)
    }
  } else if (activation.value?.status === 'completed') {
    step.value = 12
    console.log('completed activation', activation.value)
  }
}

const isFriendUnavailable = computed(() => {
  return db.value.friendsActivations.find(
    (a: any) =>
      (a.user_id === selectedFriend.value?.user_id ||
        a.friend_id === selectedFriend.value?.user_id) &&
      a.status === 'accepted'
  )
    ? true
    : false
})

async function handleAccountClick(a: any) {
  selectedAccount.value = a
  step.value = 5
}

async function handleMeasureClick() {
  completedAccounts.value.push({
    name: selectedAccount.value.name,
    st: [sweat.value, tears.value]
  })

  sweat.value = '5'
  tears.value = '5'
  step.value = 4
}

async function handleInvestmentClick() {
  if (!user.value || !activation.value) return

  loading.value = true
  const a: any = await updateActivation(
    activation.value.id,
    user.value.id,
    completedAccounts.value
  )
  loading.value = false

  if (!a) return

  if (a.status === 'accepted' && a.accounts.length === 2) {
    step.value = 9
  } else {
    step.value = 8
  }
}

let animationTimeout: any

async function handleFeedClick() {
  if (!user.value || !activation.value) return

  loading.value = true
  const a: any = await updateActivation(activation.value.id, user.value.id)
  loading.value = false

  if (!a) return

  fed.value = true

  animationTimeout = setTimeout(() => {
    navigateTo('/emoxy')
  }, 1000 * 10)
}

async function handleAcceptClick() {
  if (!user.value || !activation.value) return
  if (isFriendUnavailable.value || busy.value) return

  loading.value = true
  const r = await acceptActivation(activation.value.id)
  loading.value = false

  if (r instanceof Error) {
    return
  } else {
    accepted.value = true
    setTimeout(() => {
      step.value = 2
      accepted.value = false
    }, 2500)
  }
}

async function handleTerminateClick() {
  if (!user.value || !activation.value) return

  const y = confirm(
    'Are you sure you want to terminate and exit the Activation?'
  )

  if (y) {
    loading.value = true
    await deleteActivation(activation.value.id)
    loading.value = false
    navigateTo('/emoxy/')
  }
}

function handleOverlayClick(type: string, page: [string, number]) {
  overlay.value.isOpen = true
  overlay.value.type = type
  overlay.value.page = page
}

function handleSkipClick() {
  clearTimeout(animationTimeout)
  navigateTo('/emoxy')
}
</script>

<style lang="scss" scoped>
.wave {
  margin-top: var(--from-top);
}

.drop {
  position: relative;
  width: 27px;
  height: 46px;
  top: -45px;
  margin: 0 auto;
  border-radius: 20px;
  animation-name: drip, drops;
  animation-timing-function: cubic-bezier(1, 0, 0.91, 0.19);
  animation-duration: 3s, 9s;
  animation-iteration-count: infinite;
  background-image: url('/imgs/drop-blood.png');
  background-size: cover;
}

.wave {
  position: relative;
  opacity: 0;
  top: 0;
  width: 2px;
  height: 1px;
  border: 7px solid;
  border-radius: 300px / 150px;
  animation-name: ripple, ripple-colors;
  animation-delay: 3s, 3s;
  animation-duration: 3s, 9s;
  animation-iteration-count: infinite;
}

.wave:after {
  content: '';
  position: absolute;
  opacity: 0;
  top: -5px;
  left: -5px;
  width: 2px;
  height: 1px;
  border: 5px solid;
  border-radius: 300px / 150px;
  animation-name: ripple-2, ripple-colors;
  animation-delay: 0s, 3s;
  animation-duration: 3s, 9s;
  animation-iteration-count: infinite;
}

.face {
  animation-name: faces;
  animation-iteration-count: infinite;
  animation-duration: 3s;
  animation-delay: 3s;
  background-image: url('/imgs/emoxy//eats-1.png');
  background-size: contain;
}

@keyframes ripple {
  from {
    opacity: 1;
  }
  to {
    width: 600px;
    height: 300px;
    border-width: 1px;
    top: -100px;
    opacity: 0;
  }
}

@keyframes ripple-2 {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    width: 200px;
    height: 100px;
    border-width: 1px;
    top: 100px;
    left: 200px;
  }
}

@keyframes drip {
  to {
    top: calc(var(--from-top) + 20px);
  }
}

@keyframes faces {
  0% {
    background-image: url('/imgs/emoxy//eats-2.png');
  }
  10% {
    background-image: url('/imgs/emoxy//eats-2.png');
  }
  11% {
    background-image: url('/imgs/emoxy/eats-3.png');
  }
  29% {
    background-image: url('/imgs/emoxy/eats-3.png');
  }
  30% {
    background-image: url('/imgs/emoxy/eats-1.png');
  }
  100% {
    background-image: url('/imgs/emoxy/eats-1.png');
  }
}

@keyframes drops {
  0% {
    background-image: url('/imgs/drop-blood.png');
  }
  36% {
    background-image: url('/imgs/drop-blood.png');
  }
  36% {
    background-image: url('/imgs/drop-sweat.png');
  }
  69% {
    background-image: url('/imgs/drop-sweat.png');
  }
  69% {
    background-image: url('/imgs/drop-tears.png');
  }
  100% {
    background-image: url('/imgs/drop-tears.png');
  }
}

@keyframes ripple-colors {
  0% {
    background: #d5000f;
    border-color: #d5000f;
  }
  40% {
    background: #d5000f;
    border-color: #d5000f;
  }
  40% {
    background: #ebd350;
    border-color: #ebd350;
  }
  72% {
    background: #ebd350;
    border-color: #ebd350;
  }
  72% {
    background: #5b8df0;
    border-color: #5b8df0;
  }
  100% {
    background: #5b8df0;
    border-color: #5b8df0;
  }
}
</style>

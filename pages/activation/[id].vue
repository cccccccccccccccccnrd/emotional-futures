<template>
  <div
    v-if="accepted || terminated"
    class="absolute h-full w-full p-safe flex flex-col justify-center items-center bg-dark-50 backdrop-blur-md z-[15]"
  >
    <div v-if="accepted" class="flex flex-col justify-center items-center">
      <Icon type="check" size="l" />
      <p class="font-bold mt-5">Activation Accepted</p>
    </div>
    <div v-if="terminated" class="flex flex-col justify-center items-center">
      <Icon type="close" size="l" />
      <p class="font-bold mt-5">Activation Terminated</p>
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
        <Icon v-if="step === 3 || step === 4" type="files" />

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
            step === 3 || step === 4 || step === 5 || step === 6 || step === 7
          "
          type="close"
          @click="step = 2"
        />
        <Icon v-if="step === 10" type="close" @click="step = 9" />
      </div>
    </div>
    <div v-if="step === 1" class="grow flex flex-col items-center">
      <p class="text-lg font-bold text-center">Activation invite</p>
      <p class="text-sm text-center mt-5">
        If you are on the same place, scan the qr-code, and you will instantly
        share the activation invite. You can also share it with the link below.
      </p>
      <Qr
        :value="`${useRuntimeConfig().baseURL}/api/activation/${activation.id}`"
        class="w-3/5 mt-5"
      />
      <p class="text-sm text-center mt-5" @click="handleShareClick(false)">
        Share invite link
      </p>
    </div>
    <div v-if="step === 1" class="flex flex-col justify-center items-center">
      <Btn @click="step = 0">I shared the invitation</Btn>
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
          >Confirm Investment</Btn
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
      <p class="text-lg text-center font-bold mt-5">The Sweat You Gave</p>
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
      <p class="text-lg text-center font-bold mt-5">The Tears You Received</p>
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
      <p class="text-lg text-center font-bold mt-5">Accounting Results</p>
      <div class="grow flex flex-col gap-2 justify-center items-center mt-5">
        <div
          v-for="(r, i) in [results[1], results[2], results[0]]"
          class="w-full flex justify-between items-center font-bold p-safe bg-dark-50 backdrop-blur-md border-2 border-white-50"
        >
          <p v-if="i === 0">You gave Sweat</p>
          <p v-if="i === 1">You received Tears</p>
          <p v-if="i === 2">You gained Blood</p>
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
        <Btn @click="handleFeedClick">Feed Emoxy</Btn>
      </div>
    </div>
  </div>
  <div class="h-full w-full p-safe flex flex-col">
    <div class="flex justify-between items-center">
      <div>
        <Icon @click="navigateTo('/emoxy')" type="arrow-l" />
      </div>
      <div>
        <Icon
          v-if="
            step === 0 || step === 1 || step === 2 || step === 8 || step === 12
          "
          type="files"
        />
      </div>
    </div>
    <div v-if="step === 0 || step === 1" class="grow flex flex-col mt-5">
      <p class="text-lg font-bold text-center">Awaiting Confirmation</p>
      <Activation
        class="mt-5"
        :emotion="selectedEmotion"
        :relationshape="selectedRelationshape"
        :accounterpart="selectedFriend"
        locked
      />
    </div>
    <div v-if="step === 0 || step === 1" class="flex gap-2 items-center mt-5">
      <Btn @click="handleTerminateClick" type="dark">{{
        activation?.friend_id === user?.id ? 'Decline' : 'Terminate'
      }}</Btn>
      <Btn
        v-if="activation?.friend_id === user?.id"
        @click="handleAcceptClick"
        style="filter: drop-shadow(black 0 0 0)"
        >{{ loading ? 'Accepting...' : 'Accept' }}</Btn
      >
    </div>
    <div v-if="step === 2 || step === 3" class="grow flex flex-col">
      <p class="text-lg font-bold text-center mt-5">Ongoing Activation</p>
      <Activation
        class="mt-5"
        :emotion="selectedEmotion"
        :relationshape="selectedRelationshape"
        :accounterpart="selectedFriend"
        isRevealed
      />
    </div>
    <div
      v-if="step === 2 || step === 3"
      class="flex gap-2 justify-center items-center mt-5"
    >
      <Btn @click="handleTerminateClick" type="dark">Terminate</Btn>
      <Btn @click="step = 3">Accounting</Btn>
    </div>
    <div
      v-if="step === 8"
      class="grow relative flex flex-col justify-center items-center"
    >
      <p class="text-lg font-bold text-center mt-5">Accounting</p>
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
        <Btn type="dark" @click="handleTerminateClick">Terminate</Btn>
      </div>
    </div>
    <div
      v-if="step === 9 || step === 10"
      class="grow relative flex flex-col justify-center items-center"
    >
      <p class="text-lg font-bold text-center mt-5">Accounting</p>
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
      <p class="text-lg font-bold text-center mt-5">Accounting</p>
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
      <div class="w-full flex gap-4 mt-5 opacity-0">
        <Btn type="dark" @click="handleShareClick(true)">Send Reminder</Btn>
      </div>
    </div>
    <div
      v-if="step === 12"
      class="grow relative flex flex-col justify-center items-center"
    >
      <p class="text-lg font-bold text-center mt-5">Activation Complete</p>
      <Activation
        class="mt-5"
        :emotion="selectedEmotion"
        :relationshape="selectedRelationshape"
        :accounterpart="selectedFriend"
        :results="results"
      />
    </div>
    <div v-if="step === 12" class="flex flex-col justify-center items-center">
      <div class="w-full flex gap-2 mt-5 opacity-0">
        <Btn @click="" type="dark">Terminate</Btn>
        <Btn @click="" type="dark">Accounting</Btn>
      </div>
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
definePageMeta({
  middleware: 'auth'
})

const route = useRoute()

const user = useSupabaseUser()
const friends: any = await useFriends()
const emotions: any = await useEmotions()
const relationshapes: any = await useRelationshapes()
const activation: any = ref(null)

const step = ref(0)
const accepted = ref(false)
const terminated = ref(false)
const loading = ref(false)

const selectedFriend = ref({
  id: null,
  name: null,
  user_id: null
})
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
  const f = activation.value.results.find(
    (a: any) => a.userId === user.value?.id
  )
  if (f) {
    return f.results
  } else {
    return null
  }
})

let interval: any = null
let terminateInterval: any = null

onMounted(async () => {
  const id = String(route.params.id)
  const a = await useActivation(id)

  if (!a) {
    navigateTo('/emoxy')
    return
  }

  loadActivation(a)

  terminateInterval = setInterval(async () => {
    const id = String(route.params.id)
    const a = await useActivation(id)

    if (!a) {
      terminated.value = true
      setTimeout(() => {
        terminated.value = false
        navigateTo('/emoxy')
      }, 2500)
    }
  }, 3000)
})

onUnmounted(async () => {
  if (interval) clearInterval(interval)
  if (terminateInterval) clearInterval(terminateInterval)
})

function loadActivation(a: any) {
  setActivation(a)

  if (a.status === 'created') {
    step.value = 0
    check('accepted')
    console.log('open activation', activation.value)
  } else if (a.status === 'accepted' && a.accounts.length === 0) {
    step.value = 2
    console.log('accepted activation', activation.value)
  } else if (a.status === 'accepted' && a.accounts.length === 1) {
    const f = a.accounts.find((a: any) => a.userId === user.value?.id)
    if (f) {
      step.value = 8
      check('accounting')
      console.log('friends accounting move activation', activation.value)
    } else {
      step.value = 2
      console.log('accepted activation', activation.value)
    }
  } else if (
    a.status === 'accepted' &&
    a.accounts.length === 2 &&
    a.fed.length === 0
  ) {
    step.value = 9
    console.log('ending activation', activation.value)
  } else if (
    a.status === 'accepted' &&
    a.accounts.length === 2 &&
    a.fed.length === 1
  ) {
    const f = a.fed.find((f: any) => f === user.value?.id)
    if (f) {
      step.value = 11
      check('feeding')
      console.log('friends fed move activation', activation.value)
    } else {
      step.value = 9
      console.log('ending activation', activation.value)
    }
  } else if (a.status === 'completed') {
    step.value = 12
    console.log('completed activation', activation.value)
  }
}

function check(status: any) {
  interval = setInterval(async () => {
    const id = String(route.params.id)
    const a = await useActivation(id)

    if (status === 'accepted') {
      if (a.status === 'accepted') {
        loadActivation(a)
        clearInterval(interval)
      }
    } else if (status === 'accounting') {
      const f = a.accounts.find((a: any) => a.userId !== user.value?.id)
      if (f) {
        loadActivation(a)
        clearInterval(interval)
      }
    } else if (status === 'feeding') {
      const f = a.fed.find((f: any) => f !== user.value?.id)
      if (f) {
        loadActivation(a)
        clearInterval(interval)
      }
    }
  }, 3000)
}

function setActivation(a: any) {
  activation.value = a
  selectedFriend.value = friends.find(
    (f: any) => f.user_id === a.friend_id || f.user_id === a.user_id
  )
  selectedEmotion.value = emotions.find((e: any) => e.id === a.type[0])
  selectedRelationshape.value = relationshapes.find(
    (r: any) => r.id === a.type[1]
  )
}

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
  if (!user.value) return

  const a: any = await updateActivation(
    activation.value.id,
    user.value.id,
    completedAccounts.value
  )

  if (!a) return

  setActivation(a)
  if (a.status === 'accepted' && a.accounts.length === 2) {
    step.value = 9
  } else {
    step.value = 8
    check('accounting')
  }
}

async function handleFeedClick() {
  if (!user.value) return

  const a: any = await updateActivation(activation.value.id, user.value.id)

  if (!a) return

  setActivation(a)
  navigateTo('/emoxy?animation=true')
}

async function handleAcceptClick() {
  loading.value = true
  const r = await acceptActivation(activation.value.id)
  loading.value = false

  if (r instanceof Error) {
    console.log(r)
  } else {
    accepted.value = true
    setTimeout(() => {
      step.value = 2
      accepted.value = false
    }, 2500)
  }
}

async function handleTerminateClick() {
  const y = confirm('Are you sure?')

  if (y) {
    await deleteActivation(activation.value.id)
    navigateTo('/emoxy')
  }
}

function handleShareClick(isReminder: Boolean) {
  if (navigator.share) {
    if (isReminder) {
      navigator.share({
        title: 'Emotional Futures Invitation',
        text: `Hey, our Emotional Future is waiting for your investment. Follow the link to complete the Accounting of our Activation.`,
        url: `${useRuntimeConfig().baseURL}/activation/${activation.value.id}`
      })
    } else {
      navigator.share({
        title: 'Emotional Futures Invitation',
        text: `Hey, let\'s feed our Emoxys! Join me in a ${selectedEmotion.value.name} ${selectedRelationshape.value.name} Activation. Follow the link to initiate the activation.`,
        url: `${useRuntimeConfig().baseURL}/api/activation/${
          activation.value.id
        }`
      })
    }
  } else {
    if (isReminder) {
      alert(
        `Hey, our Emotional Future is waiting for your investment. Follow the link to complete the Accounting of our Activation. ${
          useRuntimeConfig().baseURL
        }/activation/${activation.value.id}`
      )
    } else {
      alert(
        `Hey, let\'s feed our Emoxys! Join me in a ${
          selectedEmotion.value.name
        } ${
          selectedRelationshape.value.name
        } Activation. Follow the link to initiate the activation. ${
          useRuntimeConfig().baseURL
        }/api/activation/${activation.value.id}`
      )
    }
  }
}
</script>

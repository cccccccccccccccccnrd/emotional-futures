<template>
  <div
    class="absolute h-full w-full p-5 flex flex-col bg-dark-50 backdrop-blur-md z-[10]"
    v-if="step === 1 || step === 3 || step === 4 || step === 5 || step === 6 || step === 7"
  >
    <div class="flex justify-between items-center">
      <div>
        <Icon v-if="step === 3 || step === 4 || step === 5 || step === 6 || step === 7" type="files" />
      </div>
      <div v-if="step === 3 || step === 4">
        <p class="text-lg text-white-50">Accounting</p>
      </div>
      <div v-if="step === 5 || step === 6 || step === 7">
        <p class="text-lg text-white-50 capitalize">{{ selectedAccount.name }}</p>
      </div>
      <div>
        <Icon v-if="step === 1" type="close" @click="step = 0" />
        <Icon v-if="step === 3 || step === 4 || step === 5 || step === 6 || step === 7" type="close" @click="step = 2" />
      </div>
    </div>
    <div v-if="step === 1" class="grow flex flex-col items-center">
      <p class="text-lg font-bold text-center">Activation invite</p>
      <p class="text-sm text-center mt-5">
        If you are on the same place, scan the qr-code, and you will instantly
        share the activation invite. You can also share it with the link below.
      </p>
      <Qr
        :value="`http://localhost:3000/api/activation/${activation.id}`"
        class="w-3/5 mt-5"
      />
      <p class="text-sm text-center mt-5">Share invite link</p>
    </div>
    <div v-if="step === 1" class="flex flex-col justify-center items-center">
      <Btn @click="step = 0">I shared the invitation</Btn>
    </div>
    <div v-if="step === 3" class="grow flex flex-col items-center">
      <p class="text-lg font-bold mt-5">Get ready to invest in your future.</p>
      <p class="mt-5">
        Measuring the value of an emotional interaction is not easy for
        humans.<br /><br />
        Humans may find the accounting process uncomfortable, and at times even
        upsetting.<br /><br />
        This is an essential step on your path to your Emotional Future.<br />
      </p>
    </div>
    <div v-if="step === 3" class="flex flex-col justify-center items-center">
      <Btn @click="step = 4">Start Accounting</Btn>
    </div>
    <div v-if="step === 4" class="grow flex flex-col">
      <p class="mt-5">
        The <span class="capitalize">{{ selectedRelationshape.name }}</span> Relationshape requires
        {{ selectedRelationshape.accounting.length }} Accounting step{{
          selectedRelationshape.accounting.length > 1 ? 's' : ''
        }}:
      </p>
      <div class="flex flex-col gap-2 mt-5">
        <LiAccounting
          v-for="(account, index) in selectedRelationshape.accounting"
          :title="account.name"
          :icon="completedAccounts.find((a: any) => a.name === account.name) ? 'check' : 'arrow-r'"
          :disabled="index > completedAccounts.length"
          @click="index === completedAccounts.length ? handleAccountClick(account) : null"
        />
        {{ completedAccounts }}
      </div>
    </div>
    <div v-if="step === 4" class="flex flex-col justify-center items-center">
      <div class="w-full flex gap-4 mt-4">
        <Btn @click="handleInvestmentClick">Confirm Investment</Btn>
      </div>
    </div>
    <div v-if="step === 5" class="grow flex justify-center items-center">
      <p class="mt-5 text-center">{{ selectedAccount.text }}</p>
    </div>
    <div v-if="step === 5" class="flex flex-col justify-center items-center">
      <div class="w-full flex gap-4 mt-4">
        <Btn @click="step = 6">Measure</Btn>
      </div>
    </div>
    <div v-if="step === 6" class="grow flex flex-col">
      <p class="text-lg text-center font-bold mt-5">The Sweat you gave</p>
      <InputEmo v-model="sweat" class="mt-5"/>
    </div>
    <div v-if="step === 6" class="flex flex-col justify-center items-center">
      <div class="w-full flex gap-4 mt-4">
        <Btn @click="step = 7">Confirm Sweat Measure</Btn>
      </div>
    </div>
    <div v-if="step === 7" class="grow flex flex-col">
      <p class="text-lg text-center font-bold mt-5">The Tears you received</p>
      <InputEmo v-model="tears" class="mt-5"/>
    </div>
    <div v-if="step === 7" class="flex flex-col justify-center items-center">
      <div class="w-full flex gap-4 mt-4">
        <Btn @click="handleMeasureClick">Confirm Tear Measure</Btn>
      </div>
    </div>
  </div>
  <div class="h-full w-full p-5 flex flex-col">
    <div class="flex justify-between items-center">
      <div>
        <Icon @click="navigateTo('/emoxy')" type="arrow-l" />
      </div>
      <div>
        <Icon v-if="step === 0 || step === 1 || step === 2" type="files" />
      </div>
    </div>
    <div v-if="step === 0 || step === 1" class="grow flex flex-col mt-5">
      <p class="text-lg font-bold text-center">Awaiting confirmation</p>
      <Activation
        class="mt-5"
        :emotion="selectedEmotion"
        :relationshape="selectedRelationshape"
        :accounterpart="selectedFriend"
        locked
      />
    </div>
    <div v-if="step === 0 || step === 1" class="flex gap-2 items-center mt-5">
      <Btn @click="handleTerminateClick" type="dark">Terminate</Btn>
      <Btn @click="step = 1">Invitation</Btn>
    </div>
    <div v-if="step === 2 || step === 3" class="grow flex flex-col">
      <p class="text-lg font-bold text-center mt-5">Ongoing confirmation</p>
      <Activation
        class="mt-5"
        :emotion="selectedEmotion"
        :relationshape="selectedRelationshape"
        :accounterpart="selectedFriend"
      />
    </div>
    <div
      v-if="step === 2 || step === 3"
      class="flex gap-2 justify-center items-center mt-5"
    >
      <Btn @click="handleTerminateClick" type="dark">Terminate</Btn>
      <Btn @click="step = 3">Accounting</Btn>
    </div>
    <div v-if="step === 7" class="grow flex flex-col">
      <p>
        Final Balance will become available as soon as your Accounterpart
        confirms their investment.
      </p>
    </div>
    <div v-if="step === 7" class="flex flex-col justify-center items-center">
      <div class="w-full flex gap-4 mt-4">
        <Btn>Send Reminder</Btn>
      </div>
    </div>
  </div>
  <div class="absolute top-0 left-0 h-full w-full z-[-10]">
    <div
      v-if="step === 1"
      class="h-full w-full flex flex-col justify-center items-center p-5"
    >
      <div class="w-full flex justify-between items-center">
        <div>
          <Icon @click="navigateTo('/emoxy')" type="arrow-l" />
        </div>
        <div @click="navigateTo('/emoxy')">
          <Icon type="files" />
        </div>
      </div>
      <div class="grow w-full flex flex-col mt-5">
        <p class="text-lg font-bold text-center">Awaiting confirmation</p>
        <Activation
          class="mt-5"
          :emotion="selectedEmotion"
          :relationshape="selectedRelationshape"
          :accounterpart="selectedFriend"
        />
      </div>
      <div class="flex gap-2 justify-center items-center mt-5">
        <Btn @click="handleTerminateClick" type="dark">Terminate</Btn>
        <Btn @click="step = 1">Invitation</Btn>
      </div>
    </div>
  </div>
  <div class="absolute top-0 left-0 h-full w-full z-[-10]">
    <div
      class="h-full w-full flex flex-col justify-center items-center bg-[url('/imgs/bg-1.png')] bg-cover p-5"
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
const activations: any = await useActivations()
const activation: any = ref(null)

const step = ref(0)
const isRevealed = ref(false)

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
const selectedAccount = ref({
  id: null,
  name: null,
  text: null
})
const completedAccounts = ref(<any>[])
const sweat = ref('5')
const tears = ref('5')

onMounted(async () => {
  if (activations.length === 0) return

  const latest = activations[0]
  if (latest.status === 'created') {
    setActivation(latest)
    step.value = 0
    console.log('open activation', activation.value)
  } else if (latest.status === 'accepted' && latest.accounts.length === 0) {
    setActivation(latest)
    step.value = 2
    console.log('accepted activation', activation.value)
  } else if (latest.status === 'accepted' && latest.accounts.length === 1) {
    setActivation(latest)
    const a = latest.accounts.find((a: any) => a.userId === user.value?.id)
    if (a) {
      step.value = 7
      console.log('friends move activation', activation.value)
    } else {
      step.value = 2
      console.log('active activation', activation.value)
    }
  }
})

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

  step.value = 4
}

async function handleInvestmentClick() {
  if (!user.value) return

  await updateActivation(
    activation.value.id,
    user.value.id,
    completedAccounts.value
  )
  step.value = 11
}

async function handleTerminateClick() {
  const y = confirm('Are you sure?')

  if (y) {
    await deleteActivation(activation.value.id)
    navigateTo('/emoxy')
  }
}
</script>

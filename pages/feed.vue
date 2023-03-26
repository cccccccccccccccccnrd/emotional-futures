<template>
  <div class="h-full w-full p-5 flex flex-col bg-popup backdrop-blur-md">
    <div class="flex justify-between items-center">
      <div>
        <Icon type="files"/>
      </div>
      <div>
        <p class="text-lg text-white-50">Feed Emoxy</p>
      </div>
      <div @click="navigateTo('/emoxy')">
        <Icon type="close"/>
      </div>
    </div>
    <div v-if="step === 0" class="grow flex flex-col mt-5">
      <p class="text-lg font-bold text-center">Who will help you?</p>
      <div class="flex flex-col items-center justify-start mt-5 overflow-x-scroll">
        <p v-if="emoxy.friends.length === 0">No connections yet</p>
        <div v-if="friends.length > 0" class="w-full flex flex-col gap-2">
          <LiFriend
            v-for="friend in friends"
            @click="isFriendUnavailable(friend.user_id) ? null : selectedFriend = friend"
            :name="friend.name"
            :activations="getActivationsWithFriend(friend.user_id)"
            :selected="selectedFriend?.id === friend.id"
            :unavailable="isFriendUnavailable(friend.user_id)"
          />
        </div>
      </div>
    </div>
    <div
      v-if="step === 0"
      class="flex flex-col justify-center items-center"
    >
      <p class="text-xs text-center">Accounterparts appear here only when they have accepted your invitation to connect</p>
      <Btn class="mt-2" @click="step = 1" :disabled="selectedFriend.id ? false : true">Confirm Accounterpart</Btn>
    </div>
    <div v-if="step === 1" class="h-[70%] flex flex-col mt-5">
      <p v-if="!selectedEmotion.name" class="text-lg font-bold text-center">Choose emotion to activate</p>
      <p v-if="selectedEmotion.name" class="text-lg font-bold text-center capitalize">{{ selectedEmotion.name }}</p>
      <div class="grow px-5 mt-5">
        <Activation @click="selectedEmotion?.id ? step = 2 : ''" :accounterpart="selectedFriend" :emotion="selectedEmotion"/>
      </div>
    </div>
    <div
      v-if="step === 1"
      class="flex flex-wrap justify-center gap-2 mt-5"
    >
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
      <p v-if="!selectedRelationshape.name" class="text-lg font-bold text-center">Choose Relationshape</p>
      <p v-if="selectedRelationshape.name" class="text-lg font-bold text-center">{{ selectedRelationshape.name }}</p>
      <div class="w-full h-full grid grid-cols-2 gap-2 mt-5">
        <div
          v-for="relationshape in relationshapes"
          @click="selectedRelationshape = relationshape"
          class="w-full flex justify-center items-center border rounded-2xl"
          :class="`${
            selectedRelationshape?.name === relationshape.name
              ? 'border-solid border-4 border-white'
              : ''
          }`"
          :style="`background: ${relationshape.shape}`"
        ></div>
      </div>
    </div>
    <div
      v-if="step === 2"
      class="flex flex-col justify-center items-center mt-5"
    >
      <Btn @click="selectedRelationshape.id ? step = 3 : ''" :disabled="selectedRelationshape.id ? false : true"
        >Confirm Relationshape</Btn
      >
    </div>
    <div v-if="step === 3" class="grow flex flex-col">
      <p>Your Activation Card</p>
      <div
        class="h-full flex flex-col justify-between mt-4 p-4 text-black border border-white rounded-2xl"
        :style="`background: ${selectedEmotion.color}`"
      >
        <div>
          <p>{{ selectedEmotion.name }}</p>
          <p class="mt-4">
            Activation partner <strong>{{ selectedFriend.name }}</strong>
          </p>
        </div>
        <div>
          <p>{{ selectedRelationshape.shape }}</p>
        </div>
        <div>
          <p>{{ selectedRelationshape.name }}</p>
        </div>
      </div>
    </div>
    <div
      v-if="step === 3"
      class="flex flex-col justify-center items-center"
    >
      <Btn v-if="selectedRelationshape.name" @click="handleConfirmClick"
        >Confirm</Btn
      >
    </div>
    <div v-if="step === 4" class="grow flex flex-col">
      <div
        class="h-full flex flex-col justify-between mt-4 p-4 text-black border border-white rounded-2xl"
        :style="`background: ${selectedEmotion.color}`"
      >
        <div>
          <p>{{ selectedEmotion.name }}</p>
          <p class="mt-4">
            Activation partner <strong>{{ selectedFriend.name }}</strong>
          </p>
        </div>
        <div>
          <p>{{ selectedRelationshape.shape }}</p>
        </div>
        <div>
          <p>{{ selectedRelationshape.name }}</p>
        </div>
      </div>
    </div>
    <div
      v-if="step === 4"
      class="flex flex-col justify-center items-center"
    >
      <p>Waiting for friend to join activation</p>
      <div class="w-full flex gap-4 mt-4">
        <Btn @click="handleTerminateClick">Terminate</Btn>
        <Btn @click="step = 5">Invitation</Btn>
      </div>
    </div>
    <div v-if="step === 5" class="grow flex flex-col items-center">
      <p>
        If you are in the same place, scan the Qr-Code and you will be instantly
        connected. You can also share an invite link below.
      </p>
      <Qr :value="`http://localhost:3000/api/activation/${activation.id}`" class="w-3/5"/>
    </div>
    <div
      v-if="step === 5"
      class="flex flex-col justify-center items-center"
    >
      <Btn @click="step = 4">I shared the invitation</Btn>
    </div>
    <div v-if="step === 6" class="grow flex flex-col">
      <div
        class="h-full flex flex-col justify-between mt-4 p-4 text-black border border-white rounded-2xl"
        :style="`background: ${selectedEmotion.color}`"
        @click="isRevealed = !isRevealed"
      >
        <div>
          <p>
            {{ selectedEmotion.name }}
            {{ isRevealed ? selectedRelationshape.name : '' }}
          </p>
          <p class="mt-4">
            Activation partner <strong>{{ selectedFriend.name }}</strong>
          </p>
        </div>
        <div>
          <div v-if="!isRevealed">
            <p>{{ selectedRelationshape.shape }}</p>
          </div>
          <div v-else>
            <p>
              {{
                selectedRelationshape.id
                  ? selectedEmotion.prompts[selectedRelationshape.id - 1]
                  : ''
              }}
            </p>
          </div>
        </div>
        <div>
          <div v-if="!isRevealed">
            <p>{{ selectedRelationshape.name }}</p>
          </div>
          <div v-else>
            <p>Play to earn</p>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="step === 6"
      class="flex flex-col justify-center items-center"
    >
      <p>Touch the card to reveal</p>
      <div class="w-full flex gap-4 mt-4">
        <Btn @click="handleTerminateClick">Terminate</Btn>
        <Btn @click="step = 7">Accounting</Btn>
      </div>
    </div>
    <div v-if="step === 7" class="grow flex flex-col">
      <p>
        The {{ selectedRelationshape.name }} Relationshape requires
        {{ selectedRelationshape.accounting.length }} Accounting step{{
          selectedRelationshape.accounting.length > 1 ? 's' : ''
        }}:
      </p>
      <div>
        <div v-for="account in selectedRelationshape.accounting" class="mt-4">
          <div @click="handleAccountClick(account)" class="p-3 border">
            {{ account.name }}
            {{
              completedAccounts.find((a: any) => a.name === account.name)
                ? 'X'
                : ''
            }}
          </div>
        </div>
        {{ completedAccounts }}
      </div>
    </div>
    <div
      v-if="step === 7"
      class="flex flex-col justify-center items-center"
    >
      <div class="w-full flex gap-4 mt-4">
        <Btn @click="handleInvestmentClick">Confirm Investment</Btn>
      </div>
    </div>
    <div v-if="step === 8" class="grow flex flex-col">
      <p>{{ selectedAccount.text }}</p>
    </div>
    <div
      v-if="step === 8"
      class="flex flex-col justify-center items-center"
    >
      <div class="w-full flex gap-4 mt-4">
        <Btn @click="step = 9">Measure</Btn>
      </div>
    </div>
    <div v-if="step === 9" class="grow flex flex-col">
      <InputEmo v-model="sweat" />
    </div>
    <div
      v-if="step === 9"
      class="flex flex-col justify-center items-center"
    >
      <div class="w-full flex gap-4 mt-4">
        <Btn @click="step = 10">Confirm Sweat Measure</Btn>
      </div>
    </div>
    <div v-if="step === 10" class="grow flex flex-col">
      <InputEmo v-model="tears" />
    </div>
    <div
      v-if="step === 10"
      class="flex flex-col justify-center items-center"
    >
      <div class="w-full flex gap-4 mt-4">
        <Btn @click="handleMeasureClick">Confirm Tear Measure</Btn>
      </div>
    </div>
    <div v-if="step === 11" class="grow flex flex-col">
      <p>
        Final Balance will become available as soon as your Accounterpart
        confirms their investment.
      </p>
    </div>
    <div
      v-if="step === 11"
      class="flex flex-col justify-center items-center"
    >
      <div class="w-full flex gap-4 mt-4">
        <Btn>Send Reminder</Btn>
      </div>
    </div>
  </div>
  <div class="absolute top-0 left-0 h-full w-full z-[-10]">
    <div class="h-full w-full flex justify-center items-center bg-[url('/imgs/bg-1.png')] bg-cover p-10">
      <div class="h-1/2">
        <Emoxy />
      </div>
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
    step.value = 4
    console.log('open activation', activation.value)
  } else if (latest.status === 'accepted' && latest.accounts.length === 0) {
    setActivation(latest)
    step.value = 6
    console.log('accepted activation', activation.value)
  } else if (latest.status === 'accepted' && latest.accounts.length === 1) {
    setActivation(latest)
    const a = latest.accounts.find((a: any) => a.userId === user.value?.id)
    if (a) {
      step.value = 11
      console.log('friends move activation', activation.value)
    } else {
      step.value = 6
      console.log('active activation', activation.value)
    }
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
  } else {
    console.log('no selected emotion or relationshape')
  }
  step.value = 4
}

async function handleAccountClick(a: any) {
  selectedAccount.value = a
  step.value = 8
}

async function handleMeasureClick() {
  completedAccounts.value.push({
    name: selectedAccount.value.name,
    st: [sweat.value, tears.value]
  })

  step.value = 7
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

<style scoped></style>

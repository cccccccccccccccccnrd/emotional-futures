<template>
  <div
    class="overlay absolute left-0 top-0 w-full h-full p-safe flex flex-col bg-dark-50 backdrop-blur-md z-[50]"
  >
    <div v-if="overlay.type === 'menu'" class="flex flex-col w-full h-full">
      <div class="flex justify-between items-center">
        <div>
          <p class="text-lg font-bold">Menu</p>
        </div>
        <div>
          <Icon type="close" @click="overlay.isOpen = false" />
        </div>
      </div>
      <div class="grow flex flex-col justify-center gap-2 mt-5">
        <Btn type="dark">How to Play?</Btn>
        <Btn type="dark">Add Emoxy to Homescreen</Btn>
        <Btn type="dark">Export Emoxy</Btn>
        <Btn type="dark">Emotional Help Resources</Btn>
        <Btn type="dark">About</Btn>
        <Btn @click="handleLogoutClick" type="dark">Logout</Btn>
      </div>
    </div>
    <div v-else class="flex flex-col w-full h-full">
      <div class="flex justify-between items-center">
        <div>
          <Icon v-if="step === 0" type="files" @click="" />
          <div
            v-if="
              (step >= 1 && step <= 9 && step != 8) ||
              step === 11 ||
              step === 12
            "
            class="flex justify-center items-center gap-3"
            @click="step = 0"
          >
            <Icon type="arrow-l" />
            <p class="text-xs opacity-50">Back to Manual</p>
          </div>
          <div
            v-if="step === 8"
            class="flex justify-center items-center gap-3"
            @click="step = 7"
          >
            <Icon type="arrow-l" />
            <p class="text-xs opacity-50">Back to Emotions</p>
          </div>
          <div
            v-if="step === 10"
            class="flex justify-center items-center gap-3"
            @click="step = 9"
          >
            <Icon type="arrow-l" />
            <p class="text-xs opacity-50">See All Relationshapes</p>
          </div>
          <div
            v-if="step === 13"
            class="flex justify-center items-center gap-3"
            @click="step = 11"
          >
            <Icon type="arrow-l" />
            <p class="text-xs opacity-50">Back to Accounting</p>
          </div>
        </div>
        <div v-if="step === 0">
          <p class="text-sm text-white-50">Manual</p>
        </div>
        <div>
          <Icon type="close" @click="overlay.isOpen = false" />
        </div>
      </div>
      <div v-if="step === 0" class="grow flex flex-col justify-between mt-5">
        <div>
          <p class="text-lg font-bold">Emotional Futures Manual</p>
          <div class="flex flex-col gap-2 mt-5">
            <Btn
              v-for="p in [
                ['How to Feed your Emoxy?', 1],
                ['Accounterparts', 2],
                ['Activations', 4],
                ['Emotions', 7],
                ['Relationshapes', 9],
                ['Accounting', 11]
              ]"
              @click="step = Number(p[1])"
              type="dark"
              >{{ p[0] }}</Btn
            >
          </div>
        </div>
        <p class="font-bold text-center underline">Download Complete Manual</p>
      </div>
      <div v-if="step === 1" class="grow flex flex-col mt-5">
        <p class="text-lg font-bold">How To Feed Your Emoxy?</p>
        <p class="mt-5">
          To grow your Emoxy, you have to capture value from your personal
          relationships. You can do this by playing Activations.
        </p>
        <p class="mt-5">
          After completing each Activation, you are invited to account for the
          mutual emotional investment made by you and your Accounterpart in
          three virtual currencies: Blood, Sweat and Tears.
        </p>
        <p class="mt-5">
          The numerical Drops that you extract from your body in the Accounting
          process form the liquid value that flow into your Emoxy, fueling its
          growth.
        </p>
      </div>
      <div
        v-if="step === 2 || step === 3"
        class="grow flex flex-col justify-between overflow-hidden mt-5"
      >
        <div v-if="step === 2" class="overflow-y-scroll">
          <p class="text-lg font-bold">Accounterparts</p>
          <Icon type="accounterparts" class="mt-5" />
          <p class="mt-5">
            Emotional Futures cannot be played alone. The game interface
            connects humans in a network of Accounterparts, or players.
          </p>
          <p class="mt-5">
            These Accounterparts are based in existing real-life relationships:
            romances, acquaintances, friendships.
          </p>
          <p class="mt-5">
            You can play each Activation either online or offline with the same
            Accounterpart. In doing so, you can invest deeper in the
            relationship, or realize new liquidity with different play partners
            each round.
          </p>
          <p class="mt-5">
            By activating and accounting for their mutual emotional investment
            through game play, Accounterparts grow their Emoxys.
          </p>
        </div>
        <div v-if="step === 3" class="overflow-y-scroll">
          <p class="text-lg font-bold">Connecting Accounterpart</p>
          <p class="mt-5">
            To connect with a new Accounterpart, go to your Accounterparts tab
            and select ”New Connection Invite”. Two options will appear on the
            screen:
          </p>
          <p class="font-bold mt-5">1 Scan QR code</p>
          <p class="mt-5">
            If you are both in the same location, just have your Accounterpart
            scan the code on your device's screen and you will be instantly
            connected.
          </p>
          <p class="font-bold mt-5">2 Invitation Link</p>
          <p class="mt-5">
            Once you select this option the share function of your device will
            appear and direct you to your most-used messaging apps.
          </p>
          <p class="font-bold mt-5">
            If not accepted, the invitation link expires after 24 hours.
          </p>
        </div>
        <div
          class="w-full px-5 flex justify-between items-center justify-self-end"
        >
          <Icon
            type="arrow-l"
            @click="step <= 2 ? null : step--"
            :class="step <= 2 ? 'opacity-20' : ''"
          />
          <div class="flex justify-center items-center gap-1">
            <div
              v-for="n in 2"
              :class="step - 1 === n ? 'w-2 h-2' : 'w-1 h-1'"
              class="bg-white-100"
            ></div>
          </div>
          <Icon
            type="arrow-r"
            @click="step >= 3 ? null : step++"
            :class="step >= 3 ? 'opacity-20' : ''"
          />
        </div>
      </div>
      <div
        v-if="step === 4 || step === 5 || step === 6"
        class="grow flex flex-col justify-between overflow-hidden mt-5"
      >
        <div v-if="step === 4" class="overflow-y-scroll">
          <p class="text-lg font-bold">Activations</p>
          <Icon type="flip" class="mt-5" />
          <p class="mt-5">
            Activations are unique tasks asking players to recall memories,
            discuss feelings, and produce new emotional experiences.
          </p>
          <p class="mt-5">
            Complete Activations from the eight core emotions to feed your
            Emoxy's growth. You can only perform one Activation at a time, so
            both you and your Accounterpart need to commit to the task in play.
          </p>
        </div>
        <div v-if="step === 5" class="overflow-y-scroll">
          <p class="text-lg font-bold">How To Play an Activation?</p>
          <p class="mt-5">
            To play an Activation and feed your Emoxy you need to create an
            Activation Card which you:
          </p>
          <p class="mt-5">
            1. Choose an Accounterpart<br />
            2. Choose an Emotion<br />
            3. Choose a Relationshape<br />
            4. Send Activation Invite<br />
          </p>
          <p class="mt-5">
            Once your Accounterpart has accepted the invitation, you will be
            shown your task.
          </p>
          <p class="mt-5">
            After completing the Activation, you shall proceed to Accounting.
            Here you will take account of your experience and the value of your
            emotional exchange. Afterwards, your account will be updated with
            the Blood, Sweat and Tears gained through the Activation.
          </p>
        </div>
        <div v-if="step === 6" class="overflow-y-scroll">
          <p class="text-lg font-bold">Activation Invite</p>
          <p class="mt-5">
            To complete an Activation a player must invite an Accounterpart.
          </p>
          <p class="mt-5">
            After you confirmed an Activation, an invitation link will be
            provided in two forms:
          </p>
          <p class="font-bold mt-5">1 Scan QR Code</p>
          <p class="mt-5">
            If you and your Accounterpart are in the same location, scan the QR
            code, and you will be instantly connected. You can also share an
            invite link below.
          </p>
          <p class="font-bold mt-5">2 Invitation Link</p>
          <p class="font-bold mt-5">
            Once you select this option the share function of your device will
            appear and direct you to your most-used messaging apps.
          </p>
          <p class="font-bold mt-5">
            If not accepted, the invitation link expires after 24 hours.
          </p>
        </div>
        <div
          class="w-full px-5 flex justify-between items-center justify-self-end"
        >
          <Icon
            type="arrow-l"
            @click="step <= 4 ? null : step--"
            :class="step <= 4 ? 'opacity-20' : ''"
          />
          <div class="flex justify-center items-center gap-1">
            <div
              v-for="n in 3"
              :class="step - 3 === n ? 'w-2 h-2' : 'w-1 h-1'"
              class="bg-white-100"
            ></div>
          </div>
          <Icon
            type="arrow-r"
            @click="step >= 6 ? null : step++"
            :class="step >= 6 ? 'opacity-20' : ''"
          />
        </div>
      </div>
      <div
        v-if="step === 7 || step === 8"
        class="grow flex flex-col justify-between overflow-hidden mt-5"
      >
        <div
          v-if="step === 7"
          class="flex flex-col items-center overflow-y-scroll"
        >
          <p class="text-lg font-bold w-full">Emotions</p>
          <p class="mt-5">
            Emotional Futures allow players and their Accounterparts to activate
            their eight core emotions. These emotions form the foundation of the
            game.
          </p>
          <p class="mt-5">
            Like colors, primary emotions can be expressed at varying
            intensities and can mix with one another to form new compound
            emotions.
          </p>
          <div
            @click="step = 8"
            class="flex gap-2 py-2 px-3 bg-dark-50 rounded-sm mt-5"
          >
            <Icon type="eye" />
            <p class="font-bold">Emotions Wheel</p>
          </div>
        </div>
        <div
          v-if="step === 8"
          class="grow flex flex-col items-center overflow-hidden mt-5"
        >
          <p class="text-lg font-bold text-center">Emotions Wheel</p>
          <p class="text-lg text-center capitalize mt-5">
            {{ selectedEmotion.id ? selectedEmotion.name : 'Choose Emotion' }}
          </p>
          <Emotions
            v-model="selectedEmotion"
            :availableEmotions="emotions"
            class="mt-5"
          />
          <div class="mt-5">
            <p>
              {{ selectedEmotion.description }}
            </p>
          </div>
        </div>
      </div>
      <div
        v-if="step === 9"
        class="grow flex flex-col items-center overflow-hidden mt-5"
      >
        <p class="text-lg font-bold text-center">Relationshapes</p>
        <div class="w-full h-full grid grid-cols-2 gap-2 mt-5">
          <LiRelationshape
            v-for="(relationshape, index) in relationshapes"
            @click="handleRelationshapeClick(relationshape)"
            :relationshape="relationshape"
          />
        </div>
      </div>
      <div
        v-if="step === 10"
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
        v-if="step === 11 || step === 12 || step === 13"
        class="grow flex flex-col justify-between overflow-hidden mt-5"
      >
        <div v-if="step === 11" class="overflow-y-scroll">
          <p class="text-lg font-bold">Accounting</p>
          <Icon type="drop-half" class="mt-5" />
          <p class="mt-5">
            After completing each Activation, you must proceed to the Accounting
            phase. There you extract Drops of Blood, Sweat and Tears. These
            fluids reflect the emotional energy you give to and receive from
            your Accounterpart.
          </p>
          <p class="mt-5">
            Accounting will synthesise your experiences and guide you through a
            series of extracting questions to pour yourself into your Emoxy.
          </p>
          <p class="mt-5">
            Each Relationshape has a specific set of Accounting steps that must
            be completed before you can collect your Drops and feed your Emoxy.
          </p>
        </div>
        <div
          v-if="step === 12"
          class="flex flex-col items-center overflow-y-scroll"
        >
          <p class="text-lg font-bold">Accounting in Drops</p>
          <p class="mt-5">
            For each Activation you earn Blood, Sweat and Tears.
          </p>
          <p class="mt-5">
            The Accounting will prompt you with elements of your Activation that
            will be measured by you:
          </p>
          <p class="mt-5">
            1. Account for your emotional outpour to earn Sweat Drops. <br />
            2. Account for your Accounterpart's emotional outpour to give them
            Tear Drops.
          </p>
          <p class="mt-5">
            After both Accounterparts have completed their Accounting they will
            be awarded Blood based on the balance of their emotional exchange.
          </p>
          <div
            @click="step = 13"
            class="flex gap-2 py-2 px-3 bg-dark-50 rounded-sm mt-5"
          >
            <Icon type="eye" />
            <p class="font-bold">Emotional Currencies</p>
          </div>
        </div>
        <div v-if="step === 13" class="flex flex-col items-center">
          <p class="text-lg font-bold text-center">Emotional Currencies</p>
          <div class="grow flex flex-col justify-center items-center">
            <div
              v-for="d in ['blood', 'sweat', 'tears']"
              class="relative flex flex-col items-center mt-10"
            >
              <img
                :src="`/imgs/drop-${d}.png`"
                class="w-12"
                :style="`transform: scale(${Number(currencyAmount) / 10});`"
              />
              <img
                :src="`/imgs/drop-${d}.png`"
                class="absolute z-[-10] w-12 grayscale"
              />
              <p class="mt-1 capitalize">{{ d }}</p>
            </div>
            <input
              v-model="currencyAmount"
              class="mt-10"
              type="range"
              min="1"
              max="10"
            />
          </div>
        </div>
        <div
          class="w-full px-5 flex justify-between items-center justify-self-end"
          v-if="step === 11 || step === 12"
        >
          <Icon
            type="arrow-l"
            @click="step <= 11 ? null : step--"
            :class="step <= 11 ? 'opacity-20' : ''"
          />
          <div class="flex justify-center items-center gap-1">
            <div
              v-for="n in 2"
              :class="step - 10 === n ? 'w-2 h-2' : 'w-1 h-1'"
              class="bg-white-100"
            ></div>
          </div>
          <Icon
            type="arrow-r"
            @click="step >= 12 ? null : step++"
            :class="step >= 12 ? 'opacity-20' : ''"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  type: {
    type: String,
    required: true
  },
  page: {
    type: Array,
    required: false
  }
})

const overlay = useOverlay()
const step = ref(0)
const currencyAmount = ref('10')

const emotions = await useEmotions()
const relationshapes: any = await useRelationshapes()

const selectedEmotion = ref({
  id: null,
  name: null,
  description: null,
  prompts: <any>[],
  say: <any>[],
  hear: 0
})
const selectedRelationshape = ref({
  id: null,
  name: null,
  description: null,
  accounting: <any>[]
})

onMounted(() => {
  if (overlay.value.type === 'menu') return
  if (overlay.value.page[0] === 'accounterparts') step.value = 2
  if (overlay.value.page[0] === 'activations') step.value = 4
  if (overlay.value.page[0] === 'emotions') {
    if (overlay.value.page[1] === 0) {
      step.value = 7
    } else {
      step.value = 8
      const f: any = emotions.find((e: any) => e.id === overlay.value.page[1])
      if (f) selectedEmotion.value = f
    }
  }
  if (overlay.value.page[0] === 'relationshapes') {
    if (overlay.value.page[1] === 0) {
      step.value = 9
    } else {
      step.value = 10
      const f: any = relationshapes.find((r: any) => r.id === overlay.value.page[1])
      if (f) selectedRelationshape.value = f
    }
  }
  if (overlay.value.page[0] === 'accounting') step.value = 11
})

function handleRelationshapeClick(r: any) {
  selectedRelationshape.value = r
  step.value = 10
}

function handleLogoutClick() {
  logout()
  overlay.value.isOpen = false
}
</script>

<style scoped>
* {
  pointer-events: auto;
}
</style>

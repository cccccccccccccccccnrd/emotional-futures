<template>
  <div
    class="absolute left-0 top-0 w-full h-full p-safe flex flex-col bg-dark-50 backdrop-blur-md z-[50]"
  >
    <div class="flex justify-between items-center">
      <div>
        <Icon v-if="step === 0" type="files" @click="" />
        <div
          v-if="step !== 0"
          class="flex justify-center items-center gap-3"
          @click="step = 0"
        >
          <Icon type="arrow-l" />
          <p class="text-xs opacity-50">Back to Manual</p>
        </div>
      </div>
      <div v-if="step === 0">
        <p class="text-lg text-white-50">Manual</p>
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
      {{ type }} {{ page }}
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
        mutual emotional investment made by you and your Accounterpart in three
        virtual currencies: Blood, Sweat and Tears.
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
          Emotional Futures cannot be played alone. The game interface connects
          humans in a network of Accounterparts, or players.
        </p>
        <p class="mt-5">
          These Accounterparts are based in existing real-life relationships:
          romances, acquaintances, friendships.
        </p>
        <p class="mt-5">
          You can play each Activation either online or offline with the same
          Accounterpart. In doing so, you can invest deeper in the relationship,
          or realize new liquidity with different play partners each round.
        </p>
        <p class="mt-5">
          By activating and accounting for their mutual emotional investment
          through game play, Accounterparts grow their Emoxys.
        </p>
      </div>
      <div v-if="step === 3" class="overflow-y-scroll">
        <p class="text-lg font-bold">Connecting Accounterpart</p>
        <p class="mt-5">
          To connect with a new Accounterpart, go to your Accounterparts tab and
          select ”New Connection Invite”. Two options will appear on the screen:
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
          Complete Activations from the eight core emotions to feed your Emoxy's
          growth. You can only perform one Activation at a time, so both you and
          your Accounterpart need to commit to the task in play.
        </p>
      </div>
      <div v-if="step === 5" class="overflow-y-scroll">
        <p class="text-lg font-bold">How To Play an Activation?</p>
        <p class="mt-5">
          To play an Activation and feed your Emoxy you need to create an
          Activation Card which you:
        </p>
        <p class="mt-5">
          1 Choose an Accounterpart<br />
          2 Choose an Emotion<br />
          3 Choose a Relationshape<br />
          4 Send Activation Invite<br />
        </p>
        <p class="mt-5">
          Once your Accounterpart has accepted the invitation, you will be shown
          your task.
        </p>
        <p class="mt-5">
          After completing the Activation, you shall proceed to Accounting. Here
          you will take account of your experience and the value of your
          emotional exchange. Afterwards, your account will be updated with the
          Blood, Sweat and Tears gained through the Activation.
        </p>
      </div>
      <div v-if="step === 6" class="overflow-y-scroll">
        <p class="text-lg font-bold">Activation Invite</p>
        <p class="mt-5">
          To complete an Activation a player must invite an Accounterpart.
        </p>
        <p class="mt-5">
          After you confirmed an Activation, an invitation link will be provided
          in two forms:
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
      <div v-if="step === 7" class="flex flex-col items-center overflow-y-scroll">
        <p class="text-lg font-bold w-full">Emotions</p>
        <p class="mt-5">
          Emotional Futures allow players and their Accounterparts to activate
          their eight core emotions. These emotions form the foundation of the
          game.
        </p>
        <p class="mt-5">
          Like colors, primary emotions can be expressed at varying intensities
          and can mix with one another to form new compound emotions.
        </p>
        <div
          @click="step = 8"
          class="flex gap-2 py-2 px-3 bg-dark-50 rounded-sm mt-5"
        >
          <Icon type="eye" />
          <p class="font-bold">Emotions Wheel</p>
        </div>
      </div>
      <div v-if="step === 8" class="overflow-y-scroll">
        <p class="text-lg font-bold text-center">Emotions Wheel</p>
        <p class="text-lg text-center capitalize mt-5">
          {{ selectedEmotion.id ? selectedEmotion.name : 'Choose Emotion' }}
        </p>
        <Emotions
          v-model="selectedEmotion"
          :availableEmotions="emotions"
          class="mt-5"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  page: {
    type: String,
    required: false
  },
  type: {
    type: String,
    required: false
  }
})

const overlay = useOverlay()
const step = ref(0)

const emotions = await useEmotions()
const relationshapes: any = await useRelationshapes()

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
</script>

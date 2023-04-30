<template>
  <div
    class="overlay absolute left-0 top-0 w-full h-full p-safe flex flex-col bg-dark-50 backdrop-blur-md z-[50]"
  >
    <div v-if="overlay.type === 'menu'" class="flex flex-col w-full h-full">
      <div class="flex justify-between items-center">
        <div>
          <p v-if="step === 0" class="text-lg font-bold">Menu</p>
          <div
            v-else-if="step === 4"
            class="flex justify-center items-center gap-3"
            @click="step = 3"
          >
            <Icon type="arrow-l" />
            <p class="text-xs opacity-50">Back to Safe Play</p>
          </div>
          <div
            v-else
            class="flex justify-center items-center gap-3"
            @click="step = 0"
          >
            <Icon type="arrow-l" />
            <p class="text-xs opacity-50">Back to Menu</p>
          </div>
        </div>
        <div>
          <Icon type="close" @click="overlay.isOpen = false" />
        </div>
      </div>
      <div v-if="step === 0" class="grow flex flex-col mt-5">
        <div class="grow flex flex-col gap-2">
          <Btn type="dark" @click="handleOverlayClick('manual')"
            >Emotional Futures Manual</Btn
          >
          <Btn type="dark" @click="step = 2">Add Emoxy to Homescreen</Btn>
          <Btn type="dark" @click="step = 3">Safe Play</Btn>
          <Btn
            @click="
              navigateTo('https://discord.gg/sW2PZQpytS', { external: true })
            "
            type="dark"
            >Discord Channel</Btn
          >
          <Btn @click="step = 5" type="dark">Credits</Btn>
          <Btn v-if="user" @click="handleLogoutClick" type="dark">Logout</Btn>
        </div>
        <div class="flex flex-col items-center gap-2 mt-5">
          <div class="flex gap-5">
            <p @click="step = 1" class="text-sm text-center underline">
              Data Privacy
            </p>
            <p @click="step = 6" class="text-sm text-center underline">
              Imprint
            </p>
          </div>
          <Btn v-if="user" @click="handleDeleteClick" type="dark" class="mt-3"
            >Delete All My Data</Btn
          >
        </div>
      </div>
      <div v-if="step === 1" class="grow flex flex-col mt-5">
        <p class="text-lg font-bold">Data Privacy</p>
      </div>
      <div v-if="step === 2" class="grow flex flex-col mt-5">
        <p class="text-lg font-bold">Add Emoxy to Homescreen</p>
        <div v-if="isIos">
          <p class="mt-5">To add your Emoxy to an iPhone home screen,</p>
          <p class="mt-5">
            1. Open the Emotional Futures web app with Safari on your smartphone
          </p>
          <p class="mt-5">
            2. Tap on the share icon at the center on the bottom of the screen
          </p>
          <p class="mt-5">3. Select Add to Home screen</p>
          <p class="mt-5">4. Confirm EF Bookmark</p>
        </div>
        <div v-else-if="isAndroid">
          <p class="mt-5">To add your Emoxy to an Android home screen,</p>
          <p class="mt-5">
            1. Open the Emotional Futures web app with Google Chrome on your
            smartphone
          </p>
          <p class="mt-5">
            2. Tap on the screen’s three-dot icon at the top right-hand corner
          </p>
          <p class="mt-5">3. Select Add to Home screen</p>
          <p class="mt-5">4. Confirm EF Bookmark</p>
        </div>
        <div v-else>
          <p class="mt-5">To add your Emoxy to your home screen or Desktop,</p>
          <p class="mt-5">
            1. Open the Emotional Futures web app with Google Chrome
          </p>
          <p class="mt-5">
            2. Find the Install/Download icon on the right side of the adress
            bar
          </p>
          <p class="mt-5">3. Click on it and confirm the install prompt</p>
        </div>
      </div>
      <div v-if="step === 3" class="grow flex flex-col mt-5 overflow-hidden">
        <p class="text-lg font-bold">Safe Play</p>
        <div class="mt-5 overflow-y-scroll">
          <p>
            Emotional Future is a game that asks you to play with your emotions.
            While unique personal backgrounds and relationship dynamics will
            inform gameplay,  here are a few guidelines  on safe play:
          </p>
          <p class="mt-3">
            1. Be aware of your boundaries. If there are any topics you don’t
            want to touch upon, you don’t need to.
          </p>
          <p class="mt-2">
            2. It is completely fine to skip, cheat, make up stories, take a
            break, or to stop the game completely. No explanation is needed if
            you don't wish.
          </p>
          <p class="mt-2">
            3. It can be nice to talk about limits with your partner before
            playing, and to check in with each other during play.
          </p>
          <p class="mt-2">
            4. At the end of play, it can be healthy to debrief with your
            Accounterpart(s):  How was the game? How did you feel? Did you learn
            things about each other? What concerns arose during play?
          </p>
          <p class="mt-5">
            If you need help or support you can always reach out to us via
            e-mail. We also manage a discord channel for players to raise
            questions and connect with the community.
          </p>
          <p class="mt-5">
            If you need professional psychological support, please see our
            Emotional Support Resources.
          </p>
        </div>
        <Btn type="dark" @click="step = 4" class="mt-5"
          >Emotional Support Resources</Btn
        >
      </div>
      <div v-if="step === 4" class="grow flex flex-col mt-5 overflow-hidden">
        <p class="text-lg font-bold">Emotional Support Resources</p>
        <p class="mt-5">
          In case of a need for professional support, please contact in Germany:
        </p>
        <p class="font-bold mt-5">Telefonseelsorge</p>
        <p class="mt-1">
          Free and confidential crisis helpline for emotional support, available
          24/7. <br />
          0800-111-0-111 or 0800-111-0-222 <br />
          <NuxtLink to="https://www.telefonseelsorge.de/" target="_blank">
            www.telefonseelsorge.de
          </NuxtLink>
        </p>
        <p class="mt-5">
          Alternatively you can find information for long-term psychological
          care such as therapy sessions here:
        </p>
        <p class="font-bold mt-5">Therapie.de</p>
        <NuxtLink to="https://www.therapie.de/" target="_blank" class="mt-1">
          www.therapie.de
        </NuxtLink>
      </div>
      <div v-if="step === 5" class="grow flex flex-col mt-5 overflow-y-scroll">
        <p class="text-lg font-bold">Credits</p>
        <div class="overflow-y-scroll mt-5">
          <div class="flex gap-2 items-center">
            <Icon type="mail" size="s/m" />
            <p @click="">irl@emotionalfutures.com</p>
          </div>
          <p class="mt-5">
            Emotional Futures is collaboratively produced by Marcel Darienzo,
            Carina Erdmann, Steph Holl-Trieu, Andrew Pasquier, Xiaoji Song,
            Moritz Tontsch, and Ingeborg Wie Henriksen.
          </p>
          <p class="mt-5">
            IRL Collective, Emotional Futures, 2023.<br />
            Developer: Conrad Weise<br />
            Graphic Designers (Relationshapes, Painted Backdrops): Robuche<br />
            Copy Editor: Mitch Speed<br />
          </p>
          <p class="mt-5">
            Curator (LAS): Liz Stumpf<br />
            Project Manager (LAS): Alexis Convento<br />
            Communications Manager (LAS): Selin Şahin.<br />
          </p>
          <p class="mt-5">
            Special Thanks to: Black Swan, Callie’s, KW, Léon Kruijswijk, Ed
            Fornieles, Penny Rafferty, Calum Bowden, Laura Lotti, Leith
            Benkhedda, Agnesa Schmudke, Carly Whitefield, Patricia Reed.
          </p>
          <p class="mt-5">
            Fonts: Ubuntu Mono by Dalton Maag, Digital Disco by jeti, and
            Arizona by ABCDinamo.<br />
            Icons: Pixelarticons.<br />
          </p>
          <p class="mt-5">
            © 2023 IRL<br />
            Commissioned by LAS Art Foundation<br />
          </p>
        </div>
        <div class="flex gap-5 justify-center items-center mt-5">
          <img
            @click="
              navigateTo('https://discord.gg/sW2PZQpytS', { external: true })
            "
            src="/imgs/logos/irl.png"
            class="h-5 w-auto"
          />
          <img
            @click="
              navigateTo(
                'https://www.las-art.foundation/programme/emotional-futures',
                { external: true }
              )
            "
            src="/imgs/logos/las.png"
            class="h-5 w-auto"
          />
        </div>
      </div>
      <div v-if="step === 6" class="grow flex flex-col mt-5 overflow-y-scroll">
        <p class="text-lg font-bold">Imprint</p>
        <p class="mt-5">
          Moritz Tontsch <br />
          c/o Städelschule<br />
          Dürerstr. 10<br />
          60596 Frankfurt am Main
        </p>
        <p class="mt-5">mail@moritztontsch.com</p>
      </div>
    </div>
    <div v-else class="flex flex-col w-full h-full">
      <div class="flex justify-between items-center">
        <div>
          <Icon v-if="step === 0" type="files" />
          <div
            v-if="
              (step >= 1 && step <= 9 && step != 8) ||
              step === 11 ||
              step === 12 ||
              step === 14
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
                ['Emoxy', 1],
                ['EOS', 14],
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
        <p
          @click="
            navigateTo(`${useRuntimeConfig().baseURL}/ef-playbook.pdf`, {
              external: true
            })
          "
          class="font-bold text-center underline"
        >
          Download Complete Manual
        </p>
      </div>
      <div v-if="step === 1" class="grow flex flex-col mt-5">
        <p class="text-lg font-bold">Emoxy</p>
        <Icon type="heart" class="mt-5" />
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
          <Icon type="activation" class="mt-5" />
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
      </div>
      <div v-if="step === 14" class="mt-5 flex flex-col">
        <p class="text-lg font-bold">EOS</p>
        <p class="mt-5">
          Every human comes installed with an Emotional Operating System,
          referred to as EOS.
        </p>
        <p class="mt-5">
          The EOS constitutes all mechanisms in a human body that help form and
          process emotions - from facial expressions and organ-level responses
          to cognitive memory processes. These automated messaging systems are
          needed for humans to respond to their environments.
        </p>
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

const user = useSupabaseUser()
const overlay = useOverlay()

const step = ref(0)
const currencyAmount = ref('10')
const { isAndroid, isIos } = useDevice()

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
  if (overlay.value.type === 'menu') {
    if (overlay.value.page[0] === 'data-privacy') step.value = 1
  }

  if (overlay.value.type === 'manual') {
    if (overlay.value.page[0] === 'emoxy') step.value = 1
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
        const f: any = relationshapes.find(
          (r: any) => r.id === overlay.value.page[1]
        )
        if (f) selectedRelationshape.value = f
      }
    }
    if (overlay.value.page[0] === 'accounting') step.value = 11
  }
})

function handleRelationshapeClick(r: any) {
  selectedRelationshape.value = r
  step.value = 10
}

function handleOverlayClick(type: string, page?: [string, number]) {
  overlay.value.isOpen = true
  overlay.value.type = type
  overlay.value.page = page || []
}

function handleLogoutClick() {
  logout()
  overlay.value.isOpen = false
}

async function handleDeleteClick() {
  if (!user.value) return

  const y = confirm(
    'Are you sure you want to delete all your data including your Emoxy?'
  )

  if (y) {
    await deleteUser(user.value?.id)
    logout()
  }
}
</script>

<style scoped>
* {
  pointer-events: auto;
}
</style>

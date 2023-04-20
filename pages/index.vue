<template>
  <div
    class="absolute h-full w-full p-safe flex flex-col items-center bg-dark-50 backdrop-blur-md z-[10]"
    v-if="step === 5 || step === 6"
  >
    <div class="flex w-full justify-between items-center">
      <div>
        <Icon @click="step === 5 ? (step = 0) : step--" type="arrow-l" />
      </div>
      <div></div>
    </div>
    <div
      v-if="step === 5"
      class="grow w-full flex flex-col justify-between mt-5"
    >
      <p class="text-lg font-bold text-center">Keep Feeding My Emoxy</p>
      <div class="flex flex-col gap-2">
        <div
          class="p-2 bg-dark-90"
          :class="error ? 'opacity-100' : 'opacity-0'"
        >
          <p class="text-xs">
            {{ error || 'Error' }}
          </p>
        </div>
        <InputText
          v-model="email"
          placeholder="Type your E-mail"
          type="email"
          focus
        />
        <InputText
          @keyup.enter.native="handleSignInClick"
          v-model="password"
          placeholder="Type your Password"
          type="password"
        />
        <Btn
          @click="handleSignInClick"
          :disabled="!validEmail || !validPassword"
          >{{ loading ? 'Fetching...' : 'Login' }}</Btn
        >
        <p
          @click="step = 6"
          class="text-sm text-center underline font-bold mt-3"
        >
          Forgot Password?
        </p>
      </div>
      <div>
        <div class="flex gap-5 justify-center items-center mt-5">
          <img src="/imgs/logos/irl.png" class="h-5 w-auto" />
          <img src="/imgs/logos/las.png" class="h-5 w-auto" />
        </div>
        <p @click="handleOverlayClick('menu', ['data-privacy', 0])" class="text-xs text-center underline mt-5">
          Data Privacy
        </p>
      </div>
    </div>
    <div
      v-if="step === 6"
      class="grow w-full flex flex-col justify-between mt-5"
    >
      <p class="text-lg font-bold text-center">Reset Password</p>
      <div class="flex flex-col gap-2">
        <div
          class="p-2 bg-dark-90"
          :class="error ? 'opacity-100' : 'opacity-0'"
        >
          <p class="text-xs">
            {{ error || 'Error' }}
          </p>
        </div>
        <div v-if="sent">
          <p class="text-center">
            If the e-mail you typed is registered with Emotional Futures you
            will receive a link to reset your password shortly.
          </p>
        </div>
        <div v-else class="flex flex-col gap-2">
          <InputText
            v-model="email"
            @keyup.enter.native="handleResetClick"
            placeholder="Type your E-mail"
            type="email"
            focus
          />
          <Btn @click="handleResetClick" :disabled="!validEmail"
            >{{ loading ? 'Getting Link...' : 'Get Link to Reset Password' }}</Btn
          >
        </div>
      </div>
      <div>
        <div class="flex gap-5 justify-center items-center mt-5">
          <img src="/imgs/logos/irl.png" class="h-5 w-auto" />
          <img src="/imgs/logos/las.png" class="h-5 w-auto" />
        </div>
        <p @click="handleOverlayClick('menu', ['data-privacy', 0])" class="text-xs text-center underline mt-5">
          Data Privacy
        </p>
      </div>
    </div>
  </div>
  <div class="h-full flex flex-col">
    <div
      v-if="step === 0 || step === 5 || step === 6"
      class="flex flex-col justify-center items-center px-5"
    >
      <img src="/imgs/logos/ef.png" />
    </div>
    <div
      class="grow flex flex-col items-center text-center p-safe"
      :class="
        step === 1 || step === 2 || step === 3 || step === 4
          ? 'justify-between bg-dark-70 backdrop-blur-md'
          : 'justify-center'
      "
    >
      <div v-if="step === 0 || step === 5 || step === 6" class="w-full">
        <div class="p-2 bg-dark-90 opacity-0">
          <p class="text-xs">
            {{ error || 'Error' }}
          </p>
        </div>
        <Btn @click="navigateTo('/generate')" class="mt-2"
          >Start New Game</Btn
        >
        <Btn @click="step = 5" type="dark" class="mt-2">
          Keep Feeding My Emoxy</Btn
        >
        <p @click="step = 0" class="text-md underline mt-5 font-bold opacity-0">
          Back
        </p>
      </div>
      <div
        v-if="step === 1 || step === 2 || step === 3 || step === 4"
        class="w-full text-lg"
      >
        <p class="text-2xl font-bold">Emotional Futures</p>
        <p class="">the game</p>
      </div>
      <div v-if="step === 1">
        <p>
          Emotional Futures is not just a game, it is the beginning of a new
          economy.
        </p>
        <p class="mt-5">
          An invitation to greater accountability and collective growth.
        </p>
        <p class="mt-5">
          When the world has become a game, any human can be a player.
        </p>
        <p class="mt-5">
          Reprogram your Emotional Operating System (EOS). Extract the value of
          your relationships. Grow your Emoxy, your emotional proxy.
        </p>
      </div>
      <div v-if="step === 2" class="flex flex-col items-center">
        <Icon type="accounterparts" />
        <p class="mt-2 font-bold">Accounterparts</p>
        <p class="mt-5">
          The Emotional Futures game interface connects humans in a network of
          players called Accounterparts.
        </p>
        <p class="mt-5">
          Accounterparts are humans that are linked through existing, real-life
          relationships: friends, lovers, and acquaintances.
        </p>
        <p class="mt-5">
          Accounterparts grow their personal Emoxys by playing activations and
          accounting for their emotional investments.
        </p>
      </div>
      <div v-if="step === 3" class="flex flex-col items-center">
        <Icon type="flip" />
        <p class="mt-2 font-bold">Activations</p>
        <p class="mt-5">
          Activations are unique tasks asking players to recall memories,
          discuss feelings, and produce new emotional experiences.
        </p>
        <p class="mt-5">
          Grow your Emoxy by feeding it with the virtual currencies Blood, Sweat
          and Tears. Extract them from your body through playing Activations
          with your chosen Accounterpart.
        </p>
        <p class="mt-5">
          Complete Activations from eight core emotions to realize your Emoxy's
          full potential.
        </p>
      </div>
      <div v-if="step === 4" class="flex flex-col items-center">
        <Icon type="drop-half" />
        <p class="mt-2 font-bold">Accounting</p>
        <p class="mt-5">
          Once you complete an Activation, you will be directed to the
          Accounting phase where you collect Drops of Blood, Sweat and Tears.
          These fluids account for the emotional energy you give and receive
          from your Accounterpart.
        </p>
        <p class="mt-5">
          Accounting allows you to extract your mutual emotional investment as
          Drops that feed your Emoxy’s growth.
        </p>
        <p class="mt-5 font-bold underline">Learn More</p>
      </div>
      <div
        v-if="step === 1 || step === 2 || step === 3 || step === 4"
        class="w-full px-5 flex justify-between items-center justify-self-end"
      >
        <Icon
          type="arrow-l"
          @click="step <= 1 ? null : step--"
          :class="step <= 1 ? 'opacity-20' : ''"
        />
        <div class="flex justify-center items-center gap-1">
          <div
            v-for="n in 4"
            :class="step === n ? 'w-2 h-2' : 'w-1 h-1'"
            class="bg-white-100"
          ></div>
        </div>
        <Icon
          type="arrow-r"
          @click="step >= 4 ? null : step++"
          :class="step >= 4 ? 'opacity-20' : ''"
        />
      </div>
    </div>
    <div class="flex flex-col justify-center text-center font-bold p-safe">
      <div v-if="step === 0 || step === 5 || step === 6">
        <p @click="step = 1" class="underline">What is this game about?</p>
        <div class="flex gap-5 justify-center items-center mt-5">
          <img src="/imgs/logos/irl.png" class="h-5 w-auto" />
          <img src="/imgs/logos/las.png" class="h-5 w-auto" />
        </div>
        <p @click="handleOverlayClick('menu', ['data-privacy', 0])" class="text-xs underline mt-5">Data Privacy</p>
      </div>
      <div v-if="step === 1 || step === 2 || step === 3 || step === 4">
        <Btn @click="navigateTo('/generate')">Start New Game</Btn>
        <Btn @click="step = 5" type="dark" class="mt-2"
          >Keep Feeding My Emoxy</Btn
        >
        <p @click="handleOverlayClick('menu', ['data-privacy', 0])" class="text-xs underline mt-5">Data Privacy</p>
      </div>
    </div>
  </div>
  <div class="absolute top-0 left-0 h-full w-full z-[-10]">
    <div
      class="h-full w-full flex justify-center items-center bg-[url('/imgs/bg-4.png')] bg-cover"
    ></div>
  </div>
</template>

<script setup lang="ts">
const user = useSupabaseUser()

watch(user, () => {
  if (user.value) {
    navigateTo('/emoxy')
  }
})

const overlay = useOverlay()
const step = ref(0)
const email = ref('')
const password = ref('')
const loading = ref(false)
const sent = ref(false)
const error = ref('')

const validPassword = computed(() => {
  return password.value.length >= 8
})

const validEmail = computed(() => {
  return /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(email.value)
})

async function handleSignInClick () {
  if (!validEmail.value || !validPassword.value) return

  error.value = ''
  loading.value = true

  const r = await signInWithPassword(email.value, password.value)

  if (r instanceof Error) {
    loading.value = false
    error.value = 'Invalid login credentials.'
  } else {
    loading.value = false
  }
}

async function handleResetClick () {
  error.value = ''
  loading.value = true
  const r = await resetPassword(email.value)
  loading.value = false

  if (r instanceof Error) {
    error.value = 'Please try again in a minute.'
  } else {
    sent.value = true
    email.value = ''
  }
}

function handleOverlayClick(type: string, page: [string, number]) {
  overlay.value.isOpen = true
  overlay.value.type = type
  overlay.value.page = page
}
</script>

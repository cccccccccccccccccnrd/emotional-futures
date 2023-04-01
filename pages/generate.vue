<template>
  <div
    class="absolute h-full w-full flex flex-col items-center bg-dark-50 backdrop-blur-md z-[10]"
    style="padding: max(env(safe-area-inset-top), 1.25rem) max(env(safe-area-inset-right), 1.25rem) max(env(safe-area-inset-bottom), 1.25rem) max(env(safe-area-inset-left), 1.25rem);"
    v-if="step === 2 || step === 4 || step === 6"
  >
    <div class="flex w-full justify-between items-center">
      <div></div>
      <div>
        <Icon @click="step = step - 1" type="close" />
      </div>
    </div>
    <div v-if="step === 2" class="grow flex flex-col mt-5">
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
    <div v-if="step === 4" class="grow flex flex-col mt-5">
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
    <div v-if="step === 6" class="grow flex flex-col w-full mt-5">
      <p class="text-lg font-bold text-center">Relationshapes</p>
      <p class="text-lg text-center capitalize mt-5">
        {{
          selectedRelationshape.id
            ? selectedRelationshape.name
            : 'Select to reveal name'
        }}
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
  </div>
  <div class="h-full w-full flex flex-col" style="padding: max(env(safe-area-inset-top), 1.25rem) max(env(safe-area-inset-right), 1.25rem) max(env(safe-area-inset-bottom), 1.25rem) max(env(safe-area-inset-left), 1.25rem);">
    <div class="flex flex-col justify-center items-center">
      <p
        v-if="
          step === -1 ||
          step === 1 ||
          step === 2 ||
          step === 3 ||
          step === 4 ||
          step === 5 ||
          step === 7 ||
          step === 8
        "
        class="text-2xl font-bold"
      >
        Emotional Futures
      </p>
      <p
        v-if="step === 9 || (step >= 10 && step <= 14)"
        class="text-2xl font-bold"
      >
        Temperament
      </p>
      <p v-if="step === 15" class="text-2xl font-bold">Analyzing</p>
      <p v-if="step === 16" class="text-2xl font-bold">You are a {{ isGiver ? 'Giver' : 'Taker' }}</p>
      <p v-if="step === 17" class="text-2xl font-bold">Meet your Emoxy</p>
      <p v-if="step === 18 || step === 19" class="text-2xl font-bold">Secure Emoxy</p>
      <p v-if="step === -1">the game</p>
      <p v-if="step >= 1 && step <= 7">the game</p>
      <p v-if="step === 8">the pledge</p>
      <p v-if="step === 9 || (step >= 10 && step <= 14)">the quiz</p>
      <p v-if="step === 15 || step === 16" :class="step === 16 ? 'opacity-0' : ''">your answers</p>
      <p v-if="step === 17 || step === 18 || step === 19" :class="step === 17 ? 'opacity-0' : ''">and your future</p>
    </div>
    <div v-if="step === -1" class="w-full">
      <p>Thank you for confirming your email address and securing your Emoxy</p>
      <p class="mt-5">
        It is time to grow your Emoxy and fully realize your Emotional Future
      </p>
      <p class="mt-5">
        Start by inviting those in your life you want to bond deeper and
        activate levels of consciousness of your relationship not felt before
      </p>
      <p class="mt-5">
        Create your activation cards to grow your Emoxy and link them to a
        friend you think would benefit the most
      </p>
      <p class="mt-5">
        Go through our unique evaluation system and grow together with Emoxys
        and friends
      </p>
    </div>
    <div v-if="step === -1" class="w-full">
      <Btn @click="navigateTo('/accounterparts')">Connect with Friends</Btn>
    </div>
    <div v-if="step === 0" class="grow flex flex-col">
      <p class="font-bold">The year is 2023.</p>
      <p class="mt-5">Humans can feel the future drawing closer.</p>
      <p class="mt-5">
        They are under pressure to convert every ounce of their existence into
        economic profit and personal gain.
      </p>
      <p class="mt-5">
        The value of friendship and intimacy is unrealized as humans continue to
        give away their emotions for free.
      </p>
      <p class="mt-5">In the face of this, a solution appears.</p>
    </div>
    <div v-if="step === 0" class="w-full mt-5">
      <Btn @click="step = 1">Take me to the Solution</Btn>
    </div>
    <div
      v-if="step === 1 || step === 2"
      class="grow flex flex-col items-center mt-10"
    >
      <div @click="step = 2" class="flex gap-2 py-2 px-3 bg-dark-50 rounded-sm">
        <Icon type="eye" />
        <p class="font-bold">Emotions Wheel</p>
      </div>
      <p class="font-bold mt-5">
        It is time for humans to realize their full potential.
      </p>
      <p class="mt-5">
        To do this each human must find ways to activate their eight core
        emotions.
      </p>
      <p class="mt-5">
        Emotional Futures helps humans to create these Activations. In them,
        humans are asked to perform tasks that will trigger the production of
        emotional outflows.
      </p>
    </div>
    <div v-if="step === 1 || step === 2" class="w-full mt-5">
      <Btn @click="step = 3">I Want to Realize my Potential</Btn>
    </div>
    <div
      v-if="step === 3 || step === 4"
      class="grow flex flex-col items-center mt-10"
    >
      <div @click="step = 4" class="flex gap-2 py-2 px-3 bg-dark-50 rounded-sm">
        <Icon type="eye" />
        <p class="font-bold">Emotional Currencies</p>
      </div>
      <p class="mt-5">
        In these complex times, measuring emotional labor can lead to greater
        care.
      </p>
      <p class="mt-5">
        Emotional Futures offers a way to convert your emotional outflows into
        profit.
      </p>
      <p class="mt-5">
        While playing Emotional Futures, the degree to which you give and take
        from interactions will be measured in three emotional currencies:
      </p>
      <p class="w-full font-bold mt-5">Blood, Sweat and Tears.</p>
    </div>
    <div v-if="step === 3 || step === 4" class="w-full mt-5">
      <Btn @click="step = 5">I Want to Be Accountable</Btn>
    </div>
    <div
      v-if="step === 5 || step === 6"
      class="grow flex flex-col items-center mt-10"
    >
      <div @click="step = 6" class="flex gap-2 py-2 px-3 bg-dark-50 rounded-sm">
        <Icon type="eye" />
        <p class="font-bold">Relationshapes</p>
      </div>
      <p class="mt-5">
        Relationshapes are emotional programs that operate in different parts of
        the human EOS (Emotional Operating System).
      </p>
      <p class="mt-5">
        Based on eight models of the human EOS, they are tools which activate
        the production of emotional currencies.
      </p>
    </div>
    <div v-if="step === 5 || step === 6" class="w-full mt-5">
      <Btn @click="step = 7">I Am Open to Test New Tools</Btn>
    </div>
    <div v-if="step === 7" class="grow flex flex-col items-center mt-10">
      <Icon type="heart" />
      <p class="mt-5 font-bold">
        Emoxies embody each human's Emotional Future, their liquid emotional
        proxy.
      </p>
      <p class="mt-5">
        The Drops of Emotional Currencies in your account transform and feed
        your unique Emoxy.
      </p>
      <p class="mt-5">
        Remember: an Emotional Future is not just something to be believed in,
        but something that must be practiced.
      </p>
    </div>
    <div v-if="step === 7" class="w-full mt-5">
      <Btn @click="step = 8">I Am Ready to Practice</Btn>
    </div>
    <div v-if="step === 8" class="grow flex flex-col items-center mt-10">
      <div class="p-5 rounded-sm bg-dark-90 backdrop-blur-md border-2 border-white-20">
        <p>
          Humans must find their temperament to fully realize their Emotional
          Future.
        </p>
        <p class="mt-5">
          Humans must trust their first instincts making choices.
        </p>
        <p class="mt-5">Humas must be undisturbed to be fully instinctive.</p>
      </div>
    </div>
    <div v-if="step === 8" class="w-full mt-5">
      <Btn @click="step = 9">I Am Human</Btn>
    </div>
    <div
      v-if="step === 9"
      class="grow flex flex-col items-center mt-10 text-center"
    >
      <div class="flex gap-2">
        <Icon v-for="d in ['drop-empty', 'drop-half', 'drop-full']" :type="d" />
      </div>
      <p class="mt-5">
        You are about to charge this device with your current emotions.
      </p>
      <p class="mt-5 font-bold">Take a deep breath in</p>
      <p class="mt-5 font-bold">Take a deep breath out</p>
      <p class="mt-5">
        Do it as many times as you need to feel present and relaxed.
      </p>
    </div>
    <div v-if="step === 9" class="w-full">
      <Btn @click="step = 10">I am ready</Btn>
    </div>
    <div
      v-if="step >= 10 && step <= 14"
      class="w-full grow flex flex-col gap-2 justify-center items-center"
    >
      <div
        v-for="(question, index) in questions[step - 10]"
        class="w-full p-5 flex justify-center items-center bg-dark-80 backdrop-blur-md border-2 border-white-20 text-center rounded-sm"
        v-html="question.text"
        @click="handleQuestionClick(index)"
      ></div>
    </div>
    <div v-if="step >= 10 && step <= 14" class="w-full">
      <div class="flex gap-2 justify-center items-center">
        <div v-for="(q, i) in questions">
          <div
            v-if="i >= step - 10"
            class="w-[18px] h-[18px] flex justify-center items-center"
          >
            <div class="w-1.5 h-1.5 bg-white-100"></div>
          </div>
          <Icon v-else type="check" />
        </div>
      </div>
      <p class="text-xs text-center px-5 mt-5">
        Choose one of the options above to proceed to the next question
      </p>
    </div>
    <div
      v-if="step === 15"
      class="grow flex flex-col items-center mt-10 text-center"
    >
      <div class="flex flex-col items-center">
        <div class="flex gap-2">
          <Icon v-for="q in questions" type="check" />
        </div>
        <p class="text-xs mt-2">You have submitted all your answers</p>
      </div>
      <p class="mt-5">
        Shake your device to allow those answers to sink in and generate your
        unique Emoxy.
      </p>
    </div>
    <div v-if="step === 15" class="w-full">
      <Btn @click="step = 16" type="dark">I Shook My Device</Btn>
    </div>
    <div
      v-if="step === 16"
      class="grow flex flex-col items-center mt-10"
    >
      <div v-if="isGiver">
        <p>You are high in Sweat, an emotional liquid that reflects for how much time and attention you give to others.</p>
        <p class="mt-5">To balance your Sweat supply with more Tears, you will need to give less, and receive more attention from others.</p>
        <p class="mt-5">To gain more Blood, you will need to balance your Sweat and Tears. This means becoming more aware of what you give and what other people think of you.</p>
        <p class="mt-5">By doing so, you will find your own path to fully realize your Emotional Future alongside your Emoxy.</p>
      </div>
      <div v-else>
        <p>You are high in Tears, an emotional liquid that reflects for how much time and attention you take from others.</p>
        <p class="mt-5">To increase your Sweat, you will need to give more to others. You will also need to limit what they give to you.</p>
        <p class="mt-5">To gain more Blood, you will need to balance your Sweat and Tears. This means becoming more aware of what you give and what other people think of you.</p>
        <p class="mt-5">By doing so, you will find your own path to fully realize your Emotional Future alongside your Emoxy.</p>
      </div>
    </div>
    <div v-if="step === 16" class="w-full">
      <Btn @click="step = 17">Meet My Emoxy</Btn>
    </div>
    <div
      v-if="step === 17 || step === 18 || step === 19"
      class="grow flex flex-col items-center mt-10"
    >
      <Emoxy />
    </div>
    <div v-if="step === 17 || step === 18 || step === 19" class="w-full flex flex-col gap-2">
      <div class="p-2 bg-dark-90" :class="error ? 'opacity-100' : 'opacity-0'">
        <p class="text-xs">Another human has already given their Emoxy this name</p>
      </div>
      <InputText v-if="step === 18" v-model="name" placeholder="name your emoxy" />
      <InputText v-if="step === 17 || step === 18" v-model="email" placeholder="type your e-mail" :class="step === 17 ? 'opacity-0' : ''"/>
      <InputText v-if="step === 19" v-model="token" placeholder="type your token"/>
      <Btn v-if="step === 17" @click="" type="dark">Hear</Btn>
      <Btn @click="step === 17 ? step = 18 : step === 18 ? handleSignInWithMagic() : handleVerifyOtp()" :disabled="step === 17 ? false : !validEmail || name.length < 4" type="dark">{{ loading ? 'Fetching...' : 'Secure Emoxy' }}</Btn>
      <p class="text-xs text-center px-5">
        By securing your Emoxy you agree with <span class="underline">Emotional Futures Terms and Conditions</span>
      </p>
    </div>
  </div>
  <div class="absolute top-0 left-0 h-full w-full z-[-10]">
    <div
      v-if="step === 0 || step === 7"
      class="h-full w-full flex justify-center items-center bg-[url('/imgs/bg-6.png')] bg-cover"
    ></div>
    <div
      v-if="
        step === 1 || step === 2 || step === 9 || (step >= 10 && step <= 16)
      "
      class="h-full w-full flex justify-center items-center bg-[url('/imgs/bg-5.png')] bg-cover"
    ></div>
    <div
      v-if="step === 3 || step === 4 || step === 8"
      class="h-full w-full flex justify-center items-center bg-[url('/imgs/bg-4.png')] bg-cover"
    ></div>
    <div
      v-if="step === 5 || step === 6"
      class="h-full w-full flex justify-center items-center bg-[url('/imgs/bg-6.png')] bg-cover"
    ></div>
    <div
      v-if="step === 17 || step === 18 || step === 19"
      class="h-full w-full flex justify-center items-center bg-[url('/imgs/bg-1.png')] bg-cover"
    ></div>
  </div>
</template>

<script setup lang="ts">
const user = useSupabaseUser()

const step = ref(user.value ? -1 : 0)
const email = ref('')
const name = ref('')
const token = ref('')
const bst = ref([0, 0, 0])
const currencyAmount = ref('10')

const error = ref('')
const loading = ref(false)

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

const validEmail = computed(() => {
  return /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(email.value)
})
const isGiver = computed(() => bst.value[1] > bst.value[2])
const questions = [
  [
    {
      text: 'Most of my relationships are toxic',
      values: [3, 0]
    },
    {
      text: 'Most of my relationships are not toxic',
      values: [0, 3]
    }
  ],
  [
    {
      text: 'I care about what others think of me',
      values: [1, 2]
    },
    {
      text: "I care about other peoples' feelings",
      values: [2, 1]
    }
  ],
  [
    {
      text: 'I spend more time doing things for my friends',
      values: [0, 3]
    },
    {
      text: 'I spend more time doing things for myself',
      values: [3, 0]
    }
  ],
  [
    {
      text: "I generally talk more about my friend's problems",
      values: [1, 2]
    },
    {
      text: 'I try to focus on my own problems',
      values: [2, 1]
    }
  ],
  [
    {
      text: 'I feel supported in my relationships',
      values: [0, 4]
    },
    {
      text: 'I feel depleted by my relationships',
      values: [4, 0]
    }
  ]
]

async function handleSignInWithMagic() {
  error.value = ''
  loading.value = true
  const r = await signUpWithMagic(email.value, name.value, bst.value)
  console.log(r)
  loading.value = false

  if (r instanceof Error) {
    if (r.message.includes('emoxies_name_key')) {
      error.value = 'Another human has already given their Emoxy this name'
    }
  } else {
    console.log('top')
    step.value = 19
  }
}

async function handleVerifyOtp () {
  error.value = ''
  loading.value = true
  const r = await verifyOtp(email.value, token.value, 'signup')

  if (r instanceof Error) {
    loading.value = false
    error.value = 'Invalid token, please try again.'
  } else {
    setTimeout(() => {
      loading.value = false
      navigateTo('/accounterparts')
    }, 1000)
  }
}

function handleQuestionClick(index: number) {
  bst.value[1] += questions[step.value - 10][index].values[0]
  bst.value[2] += questions[step.value - 10][index].values[1]
  console.log(bst.value)

  step.value++
}
</script>

<style scoped></style>

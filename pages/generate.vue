<template>
  <div
    class="absolute h-full w-full p-safe flex flex-col items-center bg-dark-50 backdrop-blur-md z-[10]"
    v-if="step === 2 || step === 4 || step === 6 || step === 18"
  >
    <div class="flex w-full justify-between items-center">
      <div></div>
      <div>
        <Icon @click="step = step - 1" type="close" />
      </div>
    </div>
    <div v-if="step === 2" class="grow flex flex-col mt-5">
      <p class="text-lg font-bold text-center">Emotions Wheel</p>
      <p class="text text-center capitalize mt-5">
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
        <div class="flex w-full justify-between mt-1">
          <p class="font-bold">-</p>
          <p class="font-bold">+</p>
        </div>
      </div>
    </div>
    <div v-if="step === 6" class="grow flex flex-col w-full mt-5">
      <p class="text-lg font-bold text-center">Relationshapes</p>
      <p class="text-center capitalize mt-5">
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
    <div v-if="step === 18" class="grow flex flex-col justify-between mt-5">
      <p class="text-lg font-bold text-center">Secure Emoxy</p>
      <div class="flex flex-col gap-2 mt-[-3rem]">
        <div
          class="p-2 bg-dark-90"
          :class="error ? 'opacity-100' : 'opacity-0'"
        >
          <p class="text-xs">
            {{
              error || 'Another human has already given their Emoxy this name.'
            }}
          </p>
        </div>
        <InputText
          v-model="name"
          @keydown.space="(event: any) => event.preventDefault()"
          placeholder="Name your Emoxy"
          focus
        />
        <InputText
          v-model="email"
          placeholder="Type your E-mail"
          type="email"
        />
        <InputText
          @keyup.enter.native="handleSignUpClick"
          v-model="password"
          placeholder="Type your Password"
          type="password"
        />
        <p class="text-xs">
          Your password should be at least 8 characters long.
        </p>
        <Btn
          @click="handleSignUpClick"
          :disabled="!validEmail || !validName || !validPassword"
          >{{ loading ? 'Securing...' : 'Secure My Emoxy' }}</Btn
        >
        <p class="text-xs text-center px-5">
          By securing your Emoxy you agree withS
          <span class="underline">Emotional Futures Terms and Conditions</span>
        </p>
      </div>
      <div></div>
    </div>
  </div>
  <div class="h-full w-full flex flex-col p-safe">
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
      <p v-if="step === 16" class="text-2xl font-bold">
        You are a {{ isGiver ? 'Giver' : 'Taker' }}
      </p>
      <p v-if="step === 17" class="text-2xl font-bold">Meet your Emoxy</p>
      <p v-if="step === 18 || step === 19" class="text-2xl font-bold">
        Secure Emoxy
      </p>
      <p v-if="step === -1">the game</p>
      <p v-if="step >= 1 && step <= 7">the game</p>
      <p v-if="step === 8">the pledge</p>
      <p v-if="step === 9 || (step >= 10 && step <= 14)">the quiz</p>
      <p
        v-if="step === 15 || step === 16"
        :class="step === 16 ? 'opacity-0' : ''"
      >
        your answers
      </p>
      <p
        v-if="step === 17 || step === 18 || step === 19"
        :class="step === 17 ? 'opacity-0' : ''"
      >
        and your future
      </p>
    </div>
    <div v-if="step === 0" class="grow flex flex-col">
      <p class="font-bold">The year is 2023.</p>
      <p class="mt-5">Humans are in a state of existential crisis.</p>
      <p class="mt-5">
        They feel the pressure to convert every ounce of their existence into
        economic profit and personal gain.
      </p>
      <p class="mt-5">
        The value of their relationships remains unrealized as humans continue
        to give away their emotional labor for free.
      </p>
      <p class="mt-5">
        In Emotional Futures they can turn draining encounters into a source of
        wealth.
      </p>
      <p class="mt-5">
        By mastering the rules of this game, humans can win real emotional
        rewards.
      </p>
    </div>
    <div v-if="step === 0" class="w-full mt-5">
      <Btn @click="step = 1">Teach Me the Ways</Btn>
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
        accountability.
      </p>
      <p class="mt-5">
        Emotional Futures offers a way to convert your emotional outpour into
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
        Relationshapes are mental programs that operate in different parts of
        the human Emotional Operating System (EOS).
      </p>
      <p class="mt-5">
        Based on eight models of the human EOS, they are tools that activate the
        production of Emotional Currencies.
      </p>
    </div>
    <div v-if="step === 5 || step === 6" class="w-full mt-5">
      <Btn @click="step = 7">I Am Open to Testing New Tools</Btn>
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
      <div
        class="p-5 rounded-sm bg-dark-90 backdrop-blur-md border-2 border-white-20"
      >
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
    <div v-if="step === 16" class="grow flex flex-col items-center mt-10">
      <div v-if="isGiver">
        <p>
          You are high in Sweat, an emotional liquid that reflects for how much
          time and attention you give to others.
        </p>
        <p class="mt-5">
          To balance your Sweat supply with more Tears, you will need to give
          less, and receive more attention from others.
        </p>
        <p class="mt-5">
          To gain more Blood, you will need to balance your Sweat and Tears.
          This means becoming more aware of what you give and what other people
          think of you.
        </p>
        <p class="mt-5">
          By doing so, you will find your own path to fully realize your
          Emotional Future alongside your Emoxy.
        </p>
      </div>
      <div v-else>
        <p>
          You are high in Tears, an emotional liquid that reflects for how much
          time and attention you take from others.
        </p>
        <p class="mt-5">
          To increase your Sweat, you will need to give more to others. You will
          also need to limit what they give to you.
        </p>
        <p class="mt-5">
          To gain more Blood, you will need to balance your Sweat and Tears.
          This means becoming more aware of what you give and what other people
          think of you.
        </p>
        <p class="mt-5">
          By doing so, you will find your own path to fully realize your
          Emotional Future alongside your Emoxy.
        </p>
      </div>
    </div>
    <div v-if="step === 16" class="w-full">
      <Btn @click="step = 17">Meet My Emoxy</Btn>
    </div>
    <div
      v-if="step === 17 || step === 18 || step === 19 || step === 20"
      class="grow flex flex-col items-center mt-10"
    >
      <Emoxy
        :emoxy="{
          id: '',
          created_at: '',
          updated_at: '',
          name: '',
          user_id: '',
          friends: [],
          bst,
          r: rando
        }"
        :activations="[]"
      />
    </div>
    <div v-if="step === 17 || step === 18" class="w-full flex flex-col gap-2">
      <div
        class="flex justify-center items-center"
        :class="paused ? 'opacity-0' : 'opacity-1'"
      >
        <Icon type="audio" size="s" />
        <p class="text-xs ml-1.5">Sound playing</p>
      </div>
      <Btn @click="audio.paused ? play() : pause()" type="dark">
        <span v-if="paused">Hear</span>
        <Icon v-else type="pause" size="s/m" />
      </Btn>
      <Btn @click="step = 18">Secure Emoxy</Btn>
    </div>
  </div>
  <div class="absolute top-0 left-0 h-full w-full z-[-10]">
    <div
      v-if="step < 8"
      class="absolute top-0 left-0 h-full w-full bg-dark-40"
    ></div>
    <div
      v-if="step === 7"
      class="h-full w-full bg-[url('/imgs/bg-10.png')] bg-cover"
    ></div>
    <div
      v-if="step === 5 || step === 6"
      class="h-full w-full bg-[url('/imgs/bg-9.png')] bg-cover"
    ></div>
    <div
      v-if="step === 3 || step === 4"
      class="h-full w-full bg-[url('/imgs/bg-8.png')] bg-cover"
    ></div>
    <div
      v-if="step === 1 || step === 2"
      class="h-full w-full bg-[url('/imgs/bg-7.png')] bg-cover"
    ></div>
    <div
      v-if="step === 0 || step === 7"
      class="h-full w-full bg-[url('/imgs/bg-6.png')] bg-cover"
    ></div>
    <div
      v-if="step === 9 || (step >= 10 && step <= 16)"
      class="h-full w-full bg-[url('/imgs/bg-5.png')] bg-cover"
    ></div>
    <div
      v-if="step === 8"
      class="h-full w-full bg-[url('/imgs/bg-4.png')] bg-cover"
    ></div>
    <div
      v-if="step === 17 || step === 18 || step === 19 || step === 20"
      class="h-full w-full bg-[url('/imgs/bg-1.png')] bg-cover"
    ></div>
  </div>
</template>

<script setup lang="ts">
const user = useSupabaseUser()

watchEffect(() => {
  if (user.value) {
    navigateTo('/emoxy?init=true')
  }
})

const step = ref(0)
const email = ref('')
const name = ref('')
const password = ref('')
const bst = ref([0, 0, 0])
const currencyAmount = ref('10')
const rando = Math.floor(Math.random() * (8 - 0 + 1) + 0)

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

const validPassword = computed(() => {
  return password.value.length >= 8
})
const validName = computed(() => {
  return name.value.length >= 1
})
const validEmail = computed(() => {
  return /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(email.value)
})
const isGiver = computed(() => bst.value[1] > bst.value[2])

const questions = [
  [
    {
      text: 'Most of my relationships are toxic',
      values: [0, 3]
    },
    {
      text: 'Most of my relationships are not toxic',
      values: [3, 0]
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
      values: [3, 0]
    },
    {
      text: 'I spend more time doing things for myself',
      values: [0, 3]
    }
  ],
  [
    {
      text: "I generally talk more about my friend's problems",
      values: [2, 1]
    },
    {
      text: 'I try to focus on my own problems',
      values: [1, 2]
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

async function handleSignUpClick() {
  if (!validEmail.value || !validName.value || !validPassword.value) return
  error.value = ''
  loading.value = true

  const r = await signUpWithPassword(
    email.value,
    password.value,
    name.value.trim(),
    bst.value,
    rando
  )

  if (r instanceof Error) {
    loading.value = false
    if (r.message.includes('emoxies_name_key')) {
      error.value = 'Another human has already given their Emoxy this name.'
    } else if (r.message.includes('User already registered')) {
      error.value = 'Another human has already given their Emoxy this email.'
    }
  } else {
    loading.value = false
  }
}

function handleQuestionClick(index: number) {
  bst.value[1] += questions[step.value - 10][index].values[0]
  bst.value[2] += questions[step.value - 10][index].values[1]

  step.value++
}

const paused = ref(true)
const emoxyLevel = ref(0)

const say = computed(() => {
  const s = emotions[emoxyLevel.value].say
  return s[Math.floor(Math.random() * s.length)]
})

const audio = ref(
  new Audio(
    `/audios/emoxy/${emoxyLevel.value}/${
      Math.floor(Math.random() * emotions[emoxyLevel.value].hear) + 1
    }.mp3`
  )
)

function play() {
  paused.value = false
  audio.value.play()
  audio.value.loop = true

  if ('mediaSession' in navigator) {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: say.value,
      artist: 'Future Emoxy',
      album: 'Emotional Futures',
      artwork: [
        { src: '/imgs/app/app-192.png', sizes: '128x128', type: 'image/png' },
        { src: '/imgs/app/app-192.png', sizes: '192x192', type: 'image/png' },
        { src: '/imgs/app/app-512.png', sizes: '256x256', type: 'image/png' },
        { src: '/imgs/app/app-512.png', sizes: '384x384', type: 'image/png' },
        { src: '/imgs/app/app-512.png', sizes: '512x512', type: 'image/png' }
      ]
    })
  }
}

function pause() {
  paused.value = true
  audio.value.pause()
}
</script>

<style scoped></style>

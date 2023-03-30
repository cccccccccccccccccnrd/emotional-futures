<template>
  <div
    class="absolute h-full w-full p-5 flex flex-col items-center bg-dark-50 backdrop-blur-md z-[10]"
    v-if="step === 2"
  >
    <div class="flex w-full justify-between items-center">
      <div></div>
      <div>
        <Icon @click="step = 1" type="close" />
      </div>
    </div>
    <div v-if="step === 2" class="grow flex flex-col mt-5">
      <p class="text-lg font-bold text-center">Emotions Wheel</p>
      <p class="text-lg text-center capitalize mt-5">{{ selectedEmotion.id ? selectedEmotion.name : 'Choose Emotion' }}</p>
      <Emotions v-model="selectedEmotion" :availableEmotions="emotions" class="mt-5" />
    </div>
  </div>
  <div class="h-full w-full flex flex-col p-5">
    <div class="flex flex-col justify-center items-center">
      <p
        v-if="step === 1 || step === 2 || step === -1"
        class="text-2xl font-bold"
      >
        Emotional Futures
      </p>
      <p v-if="step === 7">Analising</p>
      <p v-if="step === 8">You are a {{ isGiver ? 'Giver' : 'Taker' }}</p>
      <p v-if="step === 9">Meet your Emoxy</p>
      <p v-if="step === 10 || step === 11">Secure Emoxy</p>
      <p v-if="step === -1">the game</p>
      <p v-if="step >= 1 && step <= 7">the game</p>
      <p v-if="step === 7 || step === 8">your temperament</p>
      <p v-if="step === 9">your future in drops</p>
      <p v-if="step === 10 || step === 11">and your future</p>
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
      class="grow flex flex-col items-center mt-5"
    >
      <div @click="step = 2" class="flex gap-2 py-1 px-3 bg-dark-50 rounded-sm">
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
      <Btn @click="step = 1">I Want to Realize my Potential</Btn>
    </div>
    <div v-if="step === 10" class="grow flex flex-col mt-5">
      <p>You are about to charge this app with your current self</p>
      <p class="mt-5">Take a deep breath in</p>
      <p class="mt-5">Take a deep breath out</p>
      <p class="mt-5">
        Do it as many times as you need to feel present and relaxed
      </p>
      <p class="mt-5">Whenever you are ready click to answer the questions</p>
    </div>
    <div v-if="step === 10" class="w-full">
      <Btn @click="step = 2">I am ready</Btn>
    </div>
    <div
      v-if="step >= 12 && step <= questions.length + 2"
      class="w-full text-lg flex flex-col gap-8"
    >
      <div
        v-for="(question, index) in questions[step - 2]"
        class="w-full p-5 flex justify-center items-center bg-slate-400 text-center rounded-2xl"
        v-html="question.text"
        @click="handleQuestionClick(index)"
      ></div>
    </div>
    <div v-if="step === 17" class="w-full text-lg">
      <p>
        Shake your device to allow for those answers to set in and generate your
        unique Emoxy.
      </p>
    </div>
    <div v-if="step === 18" class="w-full text-lg">
      {{ isGiver ? 'Giver' : 'Taker' }}
    </div>
    <div v-if="step === 19" class="w-full h-full text-lg">
      <Emoxy></Emoxy>
    </div>
    <div v-if="step === 20" class="w-full text-lg">
      <InputTxt v-model="name" placeholder="name your emoxy"></InputTxt>
      <InputTxt v-model="email" placeholder="type your email"></InputTxt>
    </div>
    <div v-if="step === 21" class="w-full text-lg">
      <p>confirm e-mail address</p>
    </div>
    <div v-if="step >= 22 && step <= 26">
      <div class="w-full flex flex-col justify-between items-center">
        <div class="flex items-center gap-1">
          <div
            v-for="n in questions.length"
            :class="step - 1 >= n ? 'w-2 h-2' : 'w-1.5 h-1.5 opacity-20'"
            class="bg-white rounded-full"
          ></div>
        </div>
        <p class="mt-5">
          Choose one of the options above <br />
          to proceed to the next question
        </p>
      </div>
    </div>
    <div v-if="step === 17" class="w-full">
      <Btn @click="step = 8">I shook my device</Btn>
    </div>
    <div v-if="step === 18" class="w-full">
      <Btn @click="step = 9">Meet my Emoxy</Btn>
    </div>
    <div v-if="step === 19" class="w-full">
      <Btn @click="step = 10">Secure Emoxy</Btn>
    </div>
    <div v-if="step === 20" class="w-full">
      <p @click="popUp = true" class="underline">
        Why do I need to share my email?
      </p>
      <Btn class="mt-5" @click="handleSignUp">Sign up Emoxy</Btn>
    </div>
  </div>
  <div class="absolute top-0 left-0 h-full w-full z-[-10]">
    <div
      v-if="step === 0"
      class="h-full w-full flex justify-center items-center bg-[url('/imgs/bg-6.png')] bg-cover"
    ></div>
    <div
      v-if="step === 1"
      class="h-full w-full flex justify-center items-center bg-[url('/imgs/bg-5.png')] bg-cover"
    ></div>
  </div>
</template>

<script setup lang="ts">
const user = useSupabaseUser()

const step = ref(user.value ? -1 : 0)
const email = ref('')
const name = ref('')
const bst = ref([0, 0, 0])

const emotions = await useEmotions()

const selectedEmotion = ref({
  id: null,
  name: null,
  color: null,
  prompts: []
})

const isGiver = computed(() => bst.value[1] > bst.value[2])
const questions = [
  [
    {
      text: 'Most of my relationships <br> are toxic',
      values: [3, 0]
    },
    {
      text: 'Most of my relationships <br> are not toxic',
      values: [0, 3]
    }
  ],
  [
    {
      text: 'I care for what <br> others think of me',
      values: [1, 2]
    },
    {
      text: 'I am sensitive to other <br> peoples’ feelings',
      values: [2, 1]
    }
  ],
  [
    {
      text: 'I spend more time doing <br> things for my friends',
      values: [0, 3]
    },
    {
      text: 'I spend more time doing <br> things for myself',
      values: [3, 0]
    }
  ],
  [
    {
      text: 'I generally talk more about <br> my friends’ problems',
      values: [1, 2]
    },
    {
      text: 'I try to focus on <br> my own problems',
      values: [2, 1]
    }
  ],
  [
    {
      text: 'I feel supported <br> in my relationships',
      values: [0, 4]
    },
    {
      text: 'I feel depleted when it comes <br> to my relationships',
      values: [4, 0]
    }
  ]
]

const popUp = ref(false)

function handleSignUp() {
  signUpWithMagic(email.value, name.value, bst.value)
  step.value = 11
}

function handleQuestionClick(index: number) {
  bst.value[1] += questions[step.value - 2][index].values[0]
  bst.value[2] += questions[step.value - 2][index].values[1]
  console.log(bst.value)

  step.value++
}
</script>

<style scoped></style>

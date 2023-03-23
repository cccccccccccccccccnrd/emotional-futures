<template>
  <div class="h-full p-4">
    <div
      v-if="popUp"
      class="w-full h-full fixed top-0 left-0 flex flex-col p-4 bg-white text-black"
    >
      <div class="h-1/4 flex justify-end" @click="popUp = false">Close</div>
      <div class="h-3/4 flex text-lg">
        <p>
          Create your activation cards to grow your Emoxy and link them to a
          friend you think would benefit the most
        </p>
      </div>
    </div>
    <div class="h-1/4 flex flex-col justify-center items-center">
      <h2 v-if="step === 0 || step === -1">Emotional Futures</h2>
      <h2 v-if="step >= 1 && step <= 6">Temperament</h2>
      <h2 v-if="step === 7">Analising</h2>
      <h2 v-if="step === 8">You are a {{ isGiver ? 'Giver' : 'Taker' }}</h2>
      <h2 v-if="step === 9">Meet your Emoxy</h2>
      <h2 v-if="step === 10 || step === 11">Secure Emoxy</h2>
      <p v-if="step === -1">the game</p>
      <p v-if="step === 0">starts here</p>
      <p v-if="step >= 1 && step <= 6">the quiz</p>
      <p v-if="step === 7 || step === 8">your temperament</p>
      <p v-if="step === 9">your future in drops</p>
      <p v-if="step === 10 || step === 11">and your future</p>
    </div>
    <div class="h-2/4 flex flex-col items-center justify-center">
      <div v-if="step === -1" class="w-full text-lg">
        <p>
          Thank you for confirming your email address and securing your Emoxy
        </p>
        <p class="mt-4">
          It is time to grow your Emoxy and fully realize your Emotional Future
        </p>
        <p class="mt-4">
          Start by inviting those in your life you want to bond deeper and
          activate levels of consciousness of your relationship not felt before
        </p>
        <p class="mt-4">
          Create your activation cards to grow your Emoxy and link them to a
          friend you think would benefit the most
        </p>
        <p class="mt-4">
          Go through our unique evaluation system and grow together with Emoxys
          and friends
        </p>
      </div>
      <div v-if="step === 0" class="w-full text-lg">
        <p>A pledge to yourself to fully realize your Emotional Future</p>
        <p class="mt-4">
          Find out now your emotional <strong>Temperament</strong> with a 5
          steps quiz that analizes your current self
        </p>
        <p class="mt-4">
          To start, go to a place where you will be undisturbed
        </p>
        <p class="mt-4">
          Beware that you have only one chance to answer each question, be
          attentive and careful.
        </p>
      </div>
      <div v-if="step === 1" class="w-full text-lg">
        <p>You are about to charge this app with your current self</p>
        <p class="mt-4">Take a deep breath in</p>
        <p class="mt-4">Take a deep breath out</p>
        <p class="mt-4">
          Do it as many times as you need to feel present and relaxed
        </p>
        <p class="mt-4">Whenever you are ready click to answer the questions</p>
      </div>
      <div
        v-if="step >= 2 && step <= questions.length + 2"
        class="w-full text-lg flex flex-col gap-8"
      >
        <div
          v-for="(question, index) in questions[step - 2]"
          class="w-full p-5 flex justify-center items-center bg-slate-400 text-center rounded-2xl"
          v-html="question.text"
          @click="handleQuestionClick(index)"
        ></div>
      </div>
      <div v-if="step === 7" class="w-full text-lg">
        <p>
          Shake your device to allow for those answers to set in and generate
          your unique Emoxy.
        </p>
      </div>
      <div v-if="step === 8" class="w-full text-lg">
        {{ isGiver ? 'Giver' : 'Taker' }}
      </div>
      <div v-if="step === 9" class="w-full h-full text-lg">
        <Emoxy></Emoxy>
      </div>
      <div v-if="step === 10" class="w-full text-lg">
        <InputTxt v-model="name" placeholder="name your emoxy"></InputTxt>
        <InputTxt v-model="email" placeholder="type your email"></InputTxt>
      </div>
      <div v-if="step === 11" class="w-full text-lg">
        <p>confirm e-mail address</p>
      </div>
    </div>
    <div class="h-1/4 flex flex-col justify-center items-center">
      <div v-if="step === -1" class="w-full">
        <Btn @click="navigateTo('/friends')">Connect with Friends</Btn>
      </div>
      <div v-if="step === 0" class="w-full">
        <Btn @click="step = 1">Take me to the Quiz</Btn>
      </div>
      <div v-if="step === 1" class="w-full">
        <Btn @click="step = 2">I am ready</Btn>
      </div>
      <div v-if="step >= 2 && step <= 6">
        <div class="w-full flex flex-col justify-between items-center">
          <div class="flex items-center gap-1">
            <div
              v-for="n in questions.length"
              :class="step - 1 >= n ? 'w-2 h-2' : 'w-1.5 h-1.5 opacity-20'"
              class="bg-white rounded-full"
            ></div>
          </div>
          <p class="mt-4">
            Choose one of the options above <br />
            to proceed to the next question
          </p>
        </div>
      </div>
      <div v-if="step === 7" class="w-full">
        <Btn @click="step = 8">I shook my device</Btn>
      </div>
      <div v-if="step === 8" class="w-full">
        <Btn @click="step = 9">Meet my Emoxy</Btn>
      </div>
      <div v-if="step === 9" class="w-full">
        <Btn @click="step = 10">Secure Emoxy</Btn>
      </div>
      <div v-if="step === 10" class="w-full">
        <p @click="popUp = true" class="underline">
          Why do I need to share my email?
        </p>
        <Btn class="mt-4" @click="handleSignUp">Sign up Emoxy</Btn>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const user = useSupabaseUser()
console.log(user.value)

const step = ref(user.value ? -1 : 0)
const email = ref('')
const name = ref('')
const bst = ref([0, 0, 0])

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

<template>
  <div class="h-1/4 flex flex-col justify-center items-center">
    <h2>Emotional Futures</h2>
    <p>the game</p>
  </div>
  <div
    class="h-2/4 flex flex-col items-center"
    :class="step !== 0 ? 'justify-between' : 'justify-center'"
  >
    <div v-if="step === 0" class="w-full">
      <Btn @click="navigateTo('/generate')">Generate New Emoxy</Btn>
      <Btn @click="navigateTo('/login')" class="mt-4">
        Keep Growing My Emoxy</Btn
      >
      <Btn class="mt-4" v-if="user" @click="logout">Logout</Btn>
    </div>
    <div v-if="step === 1" class="w-full text-lg">
      <p>
        In a world that crushes every possibility of deepening intimate
        connections, what is at stake when you become truly accountable for your
        relationships?
      </p>
      <p class="mt-4">
        In this extended reality card game you grow your own Emoxy, an alchemic
        creature that embodies your Emotional Future.
      </p>
    </div>
    <div v-if="step === 2" class="w-full text-lg">
      <p>
        You will account for your Emotional Future in three difference virtual
        currencies
      </p>
      <p class="mt-4"><strong>Blood, Sweat, and Tears</strong></p>
      <p class="mt-4">
        they measure your own efforts, how you are perceived, and the balance
        between the two
      </p>
    </div>
    <div v-if="step === 3" class="w-full text-lg">
      <p>
        Invite friends to grow your Emoxy and create your game cards exploring
        the 8 basic emotions with the help of relationshapes. These structures
        follow a long tradition of alchemy and spiritual practices
      </p>
    </div>
    <div v-if="step === 4" class="w-full text-lg">
      <p>
        Prepare yourself to mint your intuitions, efforts, and relationships.
      </p>
      <p class="mt-4">Secure your Emotional Future</p>
    </div>
    <div
      v-if="step !== 0"
      class="w-full max-w-[75%] flex justify-between items-center justify-self-end"
    >
      <div
        class="text-xl"
        :class="step <= 1 ? 'opacity-20' : ''"
        @click="step <= 1 ? null : step--"
      >
        &#8592;
      </div>
      <div class="flex items-center gap-1">
        <div
          v-for="n in 4"
          :class="step === n ? 'w-2 h-2' : 'w-1.5 h-1.5 opacity-20'"
          class="bg-white rounded-full"
        ></div>
      </div>
      <div
        class="text-xl"
        :class="step >= 4 ? 'opacity-20' : ''"
        @click="step >= 4 ? null : step++"
      >
        &#8594;
      </div>
    </div>
  </div>
  <div class="h-1/4 flex flex-col justify-center">
    <div v-if="step === 0">
      <p @click="step = 1">What is this game about?</p>
      <p>Youtube Telegram</p>
    </div>
    <div v-if="step !== 0">
      <Btn>Generate New Emoxy</Btn>
      <Btn class="mt-4">Keep Growing My Emoxy</Btn>
    </div>
  </div>
</template>

<script setup lang="ts">
const user = useSupabaseUser()

/* if (user.value) {
  navigateTo('/emoxy')
} */

const step = ref(0)
</script>

<style scoped></style>

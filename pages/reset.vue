<template>
  <div
    class="absolute h-full w-full p-safe flex flex-col items-center bg-dark-50 backdrop-blur-md z-[10]"
  >
    <div class="flex w-full justify-between items-center">
      <div class="opacity-0">
        <Icon @click="step = 0" type="arrow-l" />
      </div>
      <div></div>
    </div>
    <div
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
        <InputText
          v-model="password"
          placeholder="Type new Password"
          type="password"
          focus
        />
        <InputText
          @keyup.enter.native="handleUpdatePasswordClick"
          v-model="passwordConfirm"
          placeholder="Confirm new Password"
          type="password"
        />
        <Btn
          @click="handleUpdatePasswordClick"
          :disabled="!validPassword || (password !== passwordConfirm)"
          >{{ loading ? 'Updating...' : 'Update Password' }}</Btn
        >
        <p class="text-xs">Your password should be at least 8 characters long.</p>
      </div>
      <div>
        <div class="flex gap-5 justify-center items-center mt-5">
          <img @click="navigateTo('https://discord.gg/sW2PZQpytS', { external: true })" src="/imgs/logos/irl.png" class="h-5 w-auto" />
          <img @click="navigateTo('https://www.las-art.foundation/programme/emotional-futures', { external: true })" src="/imgs/logos/las.png" class="h-5 w-auto" />
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
      class="grow flex flex-col items-center text-center p-safe justify-center"
    >
      <div class="w-full">
        <div class="p-2 bg-dark-90 opacity-0">
          <p class="text-xs">
            {{ error || 'Error' }}
          </p>
        </div>
        <Btn @click="navigateTo('/generate')" class="mt-2"
          >Generate New Emoxy</Btn
        >
        <Btn @click="step = 5" type="dark" class="mt-2">
          Keep Feeding My Emoxy</Btn
        >
        <p @click="step = 0" class="text-md underline mt-5 font-bold opacity-0">
          Back
        </p>
      </div>
    </div>
    <div class="flex flex-col justify-center text-center font-bold p-safe">
      <div>
        <p class="underline">What is this game about?</p>
        <div class="flex gap-5 justify-center items-center mt-5">
          <img @click="navigateTo('https://discord.gg/sW2PZQpytS', { external: true })" src="/imgs/logos/irl.png" class="h-5 w-auto" />
          <img @click="navigateTo('https://www.las-art.foundation/programme/emotional-futures', { external: true })" src="/imgs/logos/las.png" class="h-5 w-auto" />
        </div>
        <p class="text-xs underline mt-5" @click="handleOverlayClick('menu', ['data-privacy', 0])">Data Privacy</p>
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
const overlay = useOverlay()
const step = ref(0)
const password = ref('')
const passwordConfirm = ref('')
const loading = ref(false)
const error = ref('')

const validPassword = computed(() => {
  return password.value.length >= 8
})

async function handleUpdatePasswordClick () {
  loading.value = true
  const r = await updatePassword(password.value)
  loading.value = false
  if (r instanceof Error) {
    error.value = 'There was an error updating your password. Please try again.'
  } else {
    navigateTo('/')
  }
}

function handleOverlayClick(type: string, page: [string, number]) {
  overlay.value.isOpen = true
  overlay.value.type = type
  overlay.value.page = page
}
</script>

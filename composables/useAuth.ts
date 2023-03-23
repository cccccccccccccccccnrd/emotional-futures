export async function signUpWithMagic (email: string, name: string, bst: Array<Number>) {
  const client = useSupabaseClient()

  const { data, error } = await client.auth.signInWithOtp({
    email: email,
    options: {
      data: {
        name,
        bst
      }
    },
  })

  if (error) {
    console.log(error.message)
  }
}

export async function signInWithMagic (email: string) {
  const client = useSupabaseClient()

  const { data, error } = await client.auth.signInWithOtp({
    email: email
  })

  if (error) {
    console.log(error.message)
  }
}

export async function logout () {
  const client = useSupabaseClient()

  const { error } = await client.auth.signOut()

  if (error) {
    console.log(error.message)
  } else {
    navigateTo('/')
  }
}
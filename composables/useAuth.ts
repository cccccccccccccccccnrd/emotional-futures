export async function signUpWithMagic (
  email: string,
  name: string,
  bst: Array<Number>
) {
  const client = useSupabaseClient()

  const { data, error } = await client.auth.signInWithOtp({
    email: email,
    options: {
      data: {
        name,
        bst
      }
    }
  })

  if (error) {
    return error
  } else {
    return data
  }
}

export async function signInWithMagic (email: string) {
  const client = useSupabaseClient()

  const { data, error } = await client.auth.signInWithOtp({
    email: email,
    options: {
      shouldCreateUser: false
    }
  })

  if (error) {
    console.log(error.message)
    return error
  } else {
    console.log(data)
    return data
  }
}

export async function verifyOtp (email: string, token: string, type: 'signup' | 'magiclink') {
  const client = useSupabaseClient()

  const { data, error } = await client.auth.verifyOtp({
    email,
    token,
    type
  })

  if (error) {
    console.log(error.message)
    return error
  } else {
    console.log(data)
    return data
  }
}

export async function logout () {
  const client = useSupabaseClient()
  console.log('logout')

  const { error } = await client.auth.signOut()

  if (error) {
    console.log(error.message)
  } else {
    navigateTo('/')
  }
}

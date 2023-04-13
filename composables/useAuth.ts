export async function signUpWithMagic (
  email: string,
  name: string,
  bst: Array<Number>,
  r: Number
) {
  const client = useSupabaseClient()

  const { data, error } = await client.auth.signInWithOtp({
    email: email,
    options: {
      data: {
        name,
        bst,
        r
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
    return data
  }
}

export async function signUpWithPassword (
  email: string,
  password: string,
  name: string,
  bst: Array<Number>,
  r: Number
) {
  const client = useSupabaseClient()

  const { data, error } = await client.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        bst,
        r
      }
    }
  })

  if (error) {
    console.log(error.message)
    return error
  } else {
    return data
  }
}

export async function signInWithPassword (email: string, password: string) {
  const client = useSupabaseClient()

  const { data, error } = await client.auth.signInWithPassword({
    email,
    password
  })

  if (error) {
    console.log(error.message)
    return error
  } else {
    return data
  }
}

export async function verifyOtp (
  email: string,
  token: string,
  type: 'signup' | 'magiclink'
) {
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
    return data
  }
}

export async function logout () {
  const client = useSupabaseClient()
  client.removeAllChannels()

  const { error } = await client.auth.signOut()

  if (error) {
    console.log(error.message)
    return error
  } else {
    navigateTo('/')
  }
}

export async function resetPassword (email: string) {
  const client = useSupabaseClient()

  const { data, error } = await client.auth.resetPasswordForEmail(email, {
    redirectTo: `${useRuntimeConfig().baseURL}/reset`
  })

  if (error) {
    console.log(error.message)
    return error
  } else {
    return data
  }
}

export async function updatePassword (password: string) {
  const client = useSupabaseClient()

  const { data, error } = await client.auth.updateUser({
    password
  })

  if (error) {
    console.log(error.message)
    return error
  } else {
    return data
  }
}

export async function signUp (email: string, password: string) {
  const client = useSupabaseClient()

  const { data, error } = await client.auth.signUp({
    email: email,
    password: password
  })

  if (error) {
    console.log(error.message)
  } else {
    console.log(data)
  }
}

export async function updateUser (metadata: object) {
  const client = useSupabaseClient()
  const user: any = useSupabaseUser()

  console.log(user.user_metadata)

  const { data, error } = await client.auth.updateUser({
    data: {
      ...metadata,
      ...user.user_metadata
    }
  })

  if (error) {
    console.log(error.message)
  } else {
    console.log(data)
  }
}

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
  } else {
    console.log(data, 'MOIN')
    /* navigateTo('/home') */
  }
}

export async function signInWithMagic (email: string) {
  const client = useSupabaseClient()

  const { data, error } = await client.auth.signInWithOtp({
    email: email
  })

  if (error) {
    console.log(error.message)
  } else {
    console.log(data, 'MOIN')
    /* navigateTo('/home') */
  }
}

export async function login (email: string, password: string) {
  const client = useSupabaseClient()

  const { data, error } = await client.auth.signInWithPassword({
    email: email,
    password: password
  })

  if (error) {
    console.log(error.message)
  } else {
    console.log(data, 'MOIN')
    navigateTo('/home')
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
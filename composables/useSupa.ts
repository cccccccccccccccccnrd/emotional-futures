export async function useEmoxy () {
  const client: any = useSupabaseClient()
  const user = useSupabaseUser()

  const { data, error } = await client
    .from('emoxies')
    .select()
    .eq('user_id', user?.value?.id)
    .single()

  if (error) {
    console.log(error.message)
  } else {
    return data
  }
}

export async function useFriends () {
  const client: any = useSupabaseClient()
  const emoxy = await useEmoxy()

  const { data, error } = await client
    .from('emoxies')
    .select()
    .in('id', emoxy.friends)

  if (error) {
    console.log(error.message)
  } else {
    return data
  }
}

export async function createEmoxy (metadata: object) {
  const client: any = useSupabaseClient()
  const user = useSupabaseUser()

  const { data, error } = await client
    .from('emoxies')
    .insert({
      user_id: user?.value?.id,
      ...metadata
    })
    .select()

  if (error) {
    console.log(error.message)
  } else {
    return data
  }
}

export async function updateEmoxy (metadata: object) {
  const client: any = useSupabaseClient()
  const user = useSupabaseUser()

  const { data, error } = await client
    .from('emoxies')
    .update({
      ...metadata,
      updated_at: new Date()
    })
    .eq('user_id', user?.value?.id)
    .select()

  if (error) {
    console.log(error.message)
  } else {
    return data
  }
}

export async function createActivation (type: [number, number]) {
  try {
    const response = await useFetch('/api/activation', {
      method: 'POST',
      body: {
        type
      }
    })
    return response
  } catch (error) {
    console.log(error)
  }
}

export async function updateActivation (
  activationId: string,
  userId: string,
  accounts: Array<any>
) {
  try {
    const response = await useFetch('/api/activation', {
      method: 'PATCH',
      body: {
        activationId,
        userId,
        accounts
      }
    })
    return response
  } catch (error) {
    console.log(error)
  }
}

export async function deleteActivation (id: string) {
  try {
    const response = await useFetch('/api/activation', {
      method: 'DELETE',
      body: {
        id
      }
    })
    return response
  } catch (error) {
    console.log(error)
  }
}

export async function useActivations () {
  const client: any = useSupabaseClient()
  const user = useSupabaseUser()

  const { data, error } = await client
    .from('activations')
    .select()
    .or(`user_id.eq.${user?.value?.id},friend_id.eq.${user?.value?.id}`)
    .order('created_at', { ascending: false })

  if (error) {
    console.log(error.message)
  } else {
    return data
  }
}

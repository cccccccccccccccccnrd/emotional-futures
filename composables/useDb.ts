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
    console.log(data)
    return data
  }
}

export async function useFriends () {
  const client: any = useSupabaseClient()
  const emoxy = await useEmoxy()

  console.log(emoxy.friends)

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
    console.log(data)
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
    console.log(data)
  }
}

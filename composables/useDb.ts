import { Emoxy, Activation } from '~/types/futures'

export const useDb = () =>
  useState('db', () => {
    return {
      emoxy: {} as Emoxy,
      friends: [] as Array<Emoxy>,
      activations: [] as Array<Activation>,
      friendsActivations: [] as Array<Activation>
    }
  })

const db = useDb()
const user = useSupabaseUser()
const client: any = useSupabaseClient()

export async function initDb () {
  if (!user?.value?.id) return

  db.value.emoxy = await fetchEmoxy()
  db.value.activations = await fetchActivations()
  db.value.friends = await fetchFriends()
  db.value.friendsActivations = await fetchFriendsActivations()

  client
    .channel('any')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'emoxies',
        filter: `user_id=eq.${user?.value?.id}`
      },
      handleEmoxiesChanges
    )
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'activations',
        filter: `user_id=eq.${user?.value?.id}`
      },
      handleActivationsChanges
    )
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'activations',
        filter: `friend_id=eq.${user?.value?.id}`
      },
      handleActivationsChanges
    )
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'activations',
        filter: `user_id=in.(${db.value.friends.map((f: any) => f.user_id)})`
      },
      handlefriendsActivationsChanges
    )
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'activations',
        filter: `friend_id=in.(${db.value.friends.map((f: any) => f.user_id)})`
      },
      handlefriendsActivationsChanges
    )
    .subscribe()
}

async function handlefriendsActivationsChanges (payload: any) {
  if (payload.eventType === 'INSERT') {
    db.value.friendsActivations = [payload.new, ...db.value.activations]
  } else if (payload.eventType === 'UPDATE') {
    const i = db.value.friendsActivations.findIndex((a) => a.id === payload.old.id)
    db.value.friendsActivations[i] = payload.new
  } else if (payload.eventType === 'DELETE') {
    const i = db.value.friendsActivations.findIndex((a) => a.id === payload.old.id)
    i !== -1 && db.value.friendsActivations.splice(i, 1)
  }
}

async function handleActivationsChanges (payload: any) {
  if (payload.eventType === 'INSERT') {
    db.value.activations = [payload.new, ...db.value.activations]
  } else if (payload.eventType === 'UPDATE') {
    const i = db.value.activations.findIndex((a) => a.id === payload.old.id)
    db.value.activations[i] = payload.new
  } else if (payload.eventType === 'DELETE') {
    const i = db.value.activations.findIndex((a) => a.id === payload.old.id)
    i !== -1 && db.value.activations.splice(i, 1)
  }
}

async function handleEmoxiesChanges (payload: any) {
  if (payload.eventType === 'UPDATE') {
    if (db.value.emoxy.friends !== payload.new.friends) {
      db.value.emoxy = payload.new
      console.log(db.value.emoxy)
      db.value.friends = await fetchFriends()
    } else {
      db.value.emoxy = payload.new
    }
  }
}

export async function fetchEmoxy () {
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

export async function fetchFriends () {
  const { data, error } = await client
    .from('emoxies')
    .select()
    .in('id', db.value.emoxy.friends)

  if (error) {
    console.log(error.message)
  } else {
    return data
  }
}

export async function fetchActivations () {
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

export async function fetchFriendsActivations () {
  const friendIds = db.value.friends.map((f: any) => f.user_id)
  const { data, error } = await client
    .from('activations')
    .select()
    .or(
      `user_id.in.(${friendIds.toString()}),friend_id.in.(${friendIds.toString()})`
    )
    .order('created_at', { ascending: false })

  if (error) {
    console.log(error.message)
  } else {
    return data
  }
}

export async function useActivation (id: string) {
  const { data, error } = await client
    .from('activations')
    .select()
    .eq('id', id)
    .single()

  if (error) {
    console.log(error.message)
  } else {
    return data
  }
}

export async function createEmoxy (metadata: object) {
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

export async function createActivation (
  type: [number, number],
  friendId: string
) {
  try {
    const response = await $fetch('/api/activation', {
      method: 'POST',
      body: {
        type,
        friendId
      }
    })
    console.log(response)
    return response
  } catch (error) {
    console.log(error)
  }
}

export async function updateActivation (
  activationId: string,
  userId: string,
  accounts?: Array<any>
) {
  try {
    const response = await $fetch('/api/activation', {
      method: 'PATCH',
      body: {
        activationId,
        userId,
        accounts: accounts
      }
    })
    return response
  } catch (error) {
    console.log(error)
  }
}

export async function deleteActivation (id: string) {
  try {
    const response = await $fetch('/api/activation', {
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

export async function connectAccounterpart (name: string) {
  try {
    const response = await $fetch(`/api/connect/${name}`)
    return response
  } catch (error) {
    return error
  }
}

export async function acceptActivation (id: string) {
  try {
    const response = await $fetch(`/api/activation/${id}`)
    return response
  } catch (error) {
    return error
  }
}

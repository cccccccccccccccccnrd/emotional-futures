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

export async function initDb (force?: Boolean) {
  const client: any = useSupabaseClient()

  if (!user.value?.id) return
  if (client.getChannels().length > 0 && !force) return
  if (force) client.removeAllChannels()

  db.value.emoxy = await fetchEmoxy()
  db.value.activations = await fetchActivations()
  db.value.friends = await fetchFriends()
  db.value.friendsActivations = await fetchFriendsActivations()

  console.log(
    `%cfetching 𝓔𝓶𝓸𝓽𝓲𝓸𝓷𝓪𝓵 𝓕𝓾𝓽𝓾𝓻𝓮𝓼 via ${db.value.emoxy.name}`,
    'color: blue; font-weight: bold;'
  )
  console.table({
    bst: db.value.emoxy.bst.toString(),
    activations: db.value.activations.length,
    accounterparts: db.value.friends.length
  })

  client
    .channel('any')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'emoxies',
        filter: `user_id=eq.${user.value?.id}`
      },
      handleEmoxyChanges
    )
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'activations',
        filter: `user_id=eq.${user.value?.id}`
      },
      handleActivationsChanges
    )
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'activations',
        filter: `friend_id=eq.${user.value?.id}`
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
      handleFriendsActivationsChanges
    )
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'activations',
        filter: `friend_id=in.(${db.value.friends.map((f: any) => f.user_id)})`
      },
      handleFriendsActivationsChanges
    )
    .subscribe()
}

async function toasted (type: string, payload: any) {
  const toasts = useToasts()
  const relationshapes = useRelationshapes()

  if (
    type === 'activations' &&
    payload.old.status === 'created' &&
    payload.new.status === 'accepted' &&
    payload.new.user_id === user.value?.id
  ) {
    toasts.value.push({
      type: 'invite-accepted',
      payload: payload.new
    })
  } else if (
    type === 'emoxy' &&
    payload.old.bst[0] <= relationshapes[relationshapes.length - 1].collect
  ) {
    const available = relationshapes.filter(
      (r: any) => r.collect > payload.old.bst[0]
    )
    const unlocked = available.filter(r => r.collect <= payload.new.bst[0])
    if (unlocked.length >= 1) {
      toasts.value.push({
        type: 'relationshapes-unlocked',
        payload: unlocked
      })
    }
  }
}

async function handleFriendsActivationsChanges (payload: any) {
  if (payload.eventType === 'INSERT') {
    db.value.friendsActivations = [payload.new, ...db.value.friendsActivations]
  } else if (payload.eventType === 'UPDATE') {
    const i = db.value.friendsActivations.findIndex(
      a => a.id === payload.old.id
    )
    db.value.friendsActivations[i] = payload.new
  } else if (payload.eventType === 'DELETE') {
    const i = db.value.friendsActivations.findIndex(
      a => a.id === payload.old.id
    )
    i !== -1 && db.value.friendsActivations.splice(i, 1)
  }
}

async function handleActivationsChanges (payload: any) {
  console.log('activations change', payload)
  if (payload.eventType === 'INSERT') {
    db.value.activations = [payload.new, ...db.value.activations]
  } else if (payload.eventType === 'UPDATE') {
    const i = db.value.activations.findIndex(a => a.id === payload.old.id)
    db.value.activations[i] = payload.new
    toasted('activations', payload)
  } else if (payload.eventType === 'DELETE') {
    const i = db.value.activations.findIndex(a => a.id === payload.old.id)
    i !== -1 && db.value.activations.splice(i, 1)
  }
}

async function handleEmoxyChanges (payload: any) {
  if (payload.eventType === 'UPDATE') {
    if (db.value.emoxy.friends.length !== payload.new.friends.length) {
      db.value.emoxy = payload.new
      db.value.friends = await fetchFriends()
    } else {
      db.value.emoxy = payload.new
      toasted('emoxy', payload)
    }
  }
}

export async function fetchEmoxy () {
  const client: any = useSupabaseClient()

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
  const client: any = useSupabaseClient()

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
  const client: any = useSupabaseClient()

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
  const client: any = useSupabaseClient()

  const friendIds = db.value.friends.map((f: any) => f.user_id)
  const { data, error } = await client
    .from('activations')
    .select()
    .or(
      `user_id.in.(${friendIds.toString()}),friend_id.in.(${friendIds.toString()})`
    )
    .eq('status', 'accepted')
    .order('created_at', { ascending: false })

  if (error) {
    console.log(error.message)
  } else {
    return data
  }
}

export async function useActivation (id: string) {
  const client: any = useSupabaseClient()

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
  const client: any = useSupabaseClient()

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

export async function deleteUser (id: string) {
  try {
    const response = await $fetch(`/api/delete/${id}`)
    return response
  } catch (error) {
    return error
  }
}

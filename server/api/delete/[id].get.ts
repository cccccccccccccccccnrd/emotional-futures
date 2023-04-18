import { serverSupabaseUser, serverSupabaseServiceRole } from '#supabase/server'
import { H3Event } from 'h3'
import type { Activation, Emoxy } from '~/types/futures'

export default defineEventHandler(async event => {
  const user = await serverSupabaseUser(event)

  if (!user) {
    throw createError({
      statusCode: 401,
      name: 'Unauthorized',
      message: 'nah, ur not logged in'
    })
  }

  const id = event.context.params.id

  if (user.id !== id) {
    throw createError({
      statusCode: 401,
      name: 'Unauthorized',
      message: 'nah, ur not u'
    })
  }

  const { data, error } = await deleteUser(event, id)

  if (error) {
    throw createError({
      statusCode: 500,
      name: 'InternalServerError',
      message: error.message
    })
  } else {
    console.log(data)
    return data
  }
})

async function deleteUser (event: H3Event, id: string) {
  const client = serverSupabaseServiceRole(event)
  await drop(event, id)
  return await client.auth.admin.deleteUser(id)
}

async function drop(event: H3Event, id: string) {
  const emoxy = await getEmoxyByUserId(event, id)
  const friends = await getEmoxies(event, emoxy.friends)

  await Promise.all(friends.map(async (friend: Emoxy) => {
    const i = friend.friends.findIndex((id: string) => id === emoxy.id)
    if (i !== -1) {
      friend.friends.splice(i, 1)
      await updateEmoxy(event, friend.id, {
        friends: friend.friends
      })
    } else {
      throw createError({
        statusCode: 404,
        name: 'NotFoundError',
        message: 'not friends'
      })
    }
  }))
  await deleteActivations(event, emoxy.user_id)
}

export async function getEmoxyByUserId (event: H3Event, id: string) {
  const client: any = await serverSupabaseServiceRole(event)

  const { data, error } = await client
    .from('emoxies')
    .select()
    .eq('user_id', id)
    .single()

  if (error) {
    throw createError({
      statusCode: 404,
      name: 'NotFoundError',
      message: error.message
    })
  } else {
    return data
  }
}

export async function getEmoxies (event: H3Event, ids: string) {
  const client: any = await serverSupabaseServiceRole(event)

  const { data, error } = await client
    .from('emoxies')
    .select()
    .in('id', ids)

  if (error) {
    throw createError({
      statusCode: 404,
      name: 'NotFoundError',
      message: error.message
    })
  } else {
    return data
  }
}

export async function updateEmoxy (
  event: H3Event,
  id: string,
  metadata: object
) {
  const client = serverSupabaseServiceRole(event)

  const { data, error } = await client
    .from('emoxies')
    // @ts-ignore
    .update({
      ...metadata,
      updated_at: new Date()
    })
    .eq('id', id)
    .select()

  if (error) {
    throw createError({
      statusCode: 500,
      name: 'InternalServerError',
      message: error.message
    })
  } else {
    return data
  }
}

export async function deleteActivations (event: H3Event, userId: string) {
  const client: any = serverSupabaseServiceRole(event)

  const { data, error } = await client
    .from('activations')
    .delete()
    .or(`user_id.eq.${userId},friend_id.eq.${userId}`)
    .neq('status', 'completed')

  if (error) {
    console.log(error)
    throw createError({
      statusCode: 500,
      name: 'InternalServerError',
      message: error.message
    })
  } else {
    return data
  }
}

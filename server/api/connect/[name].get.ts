import {
  serverSupabaseClient,
  serverSupabaseUser,
  serverSupabaseServiceRole
} from '#supabase/server'
import { H3Event } from 'h3'
import { Emoxy } from '~/types/futures'

export default defineEventHandler(async event => {
  const user = await serverSupabaseUser(event)

  if (!user) {
    throw createError({
      statusCode: 401,
      name: 'Unauthorized',
      message: 'nah, ur not logged in'
    })
  }

  const name = event.context.params.name

  const emoxy = await getEmoxy(event, name)
  return await handleConnection(event, emoxy)
})

export async function handleConnection (event: H3Event, emoxy: Emoxy) {
  const user = await serverSupabaseUser(event)

  if (!user) {
    throw createError({
      statusCode: 406,
      name: 'NotAcceptableError',
      message: 'nah, not logged in'
    })
  }

  const ownEmoxy = await getEmoxyByUserId(event, user.id)

  if (ownEmoxy.id === emoxy.id) {
    throw createError({
      statusCode: 406,
      name: 'NotAcceptableError',
      message: 'nah, dont friend urself pls'
    })
  }

  if (ownEmoxy.friends.includes(emoxy.id)) {
    throw createError({
      statusCode: 406,
      name: 'NotAcceptableError',
      message: 'nah, already friends'
    })
  }

  await updateEmoxy(event, ownEmoxy.id, {
    friends: [...ownEmoxy.friends, emoxy.id]
  })
  await updateEmoxy(event, emoxy.id, {
    friends: [...emoxy.friends, ownEmoxy.id]
  })

  return {
    status: 'top'
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

export async function getEmoxyByUserId (event: H3Event, id: string) {
  const client: any = await serverSupabaseClient(event)

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

export async function getEmoxy (event: H3Event, name: string) {
  const client: any = await serverSupabaseClient(event)

  const { data, error } = await client
    .from('emoxies')
    .select()
    .eq('name', name)
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

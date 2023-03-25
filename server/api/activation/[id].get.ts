import {
  serverSupabaseClient,
  serverSupabaseUser,
  serverSupabaseServiceRole
} from '#supabase/server'
import { H3Event } from 'h3'
import { Activation } from '~/types/futures'

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

  const activation = await getActivation(event, id)
  return await handleActivation(event, activation)
})

export async function handleActivation (event: H3Event, activation: Activation) {
  const user = await serverSupabaseUser(event)

  if (activation.status === 'completed') {
    throw createError({
      statusCode: 406,
      name: 'NotAcceptableError',
      message: 'nah, activation is completed'
    })
  }

  if (activation.status === 'accepted') {
    throw createError({
      statusCode: 406,
      name: 'NotAcceptableError',
      message: 'nah, activation is accepted'
    })
  }

  if (activation.friend_id !== user?.id) {
    throw createError({
      statusCode: 406,
      name: 'NotAcceptableError',
      message: 'nah, activation is not for you'
    })
  }

  if (activation.user_id === user?.id) {
    throw createError({
      statusCode: 406,
      name: 'NotAcceptableError',
      message: 'nah, dont play urself'
    })
  }

  await updateActivation(event, activation.id)
  return sendRedirect(event, '/feed', 302)
}

export async function updateActivation (event: H3Event, id: string) {
  const client: any = serverSupabaseServiceRole(event)
  const user = await serverSupabaseUser(event)

  const { data, error } = await client
    .from('activations')
    .update({ friend_id: user?.id, status: 'accepted', updated_at: new Date() })
    .eq('id', id)
    .select()

  if (error) {
    console.log('update', error.message)
    throw createError({
      statusCode: 500,
      name: 'InternalServerError',
      message: error.message
    })
  } else {
    return data
  }
}

export async function getActivation (event: H3Event, id: string) {
  const client = serverSupabaseServiceRole(event)

  const { data, error } = await client.from('activations').select().eq('id', id)

  if (error) {
    console.log(error.message)
    throw createError({
      statusCode: 404,
      name: 'NotFoundError',
      message: error.message
    })
  } else {
    return data[0]
  }
}

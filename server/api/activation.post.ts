import {
  serverSupabaseClient,
  serverSupabaseUser,
  serverSupabaseServiceRole
} from '#supabase/server'
import { H3Event } from 'h3'

export default defineEventHandler(async event => {
  const user = await serverSupabaseUser(event)

  if (!user) {
    throw createError({
      statusCode: 401,
      name: 'Unauthorized',
      message: 'nah, ur not logged in'
    })
  }

  const body = await readBody(event)

  const { data, error } = await createActivation(
    event,
    body.type,
    body.friendId
  )

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
})

export async function createActivation (
  event: H3Event,
  type: [number, number],
  friendId: string
) {
  const client: any = await serverSupabaseServiceRole(event)
  const user = await serverSupabaseUser(event)

  return await client
    .from('activations')
    .insert({
      user_id: user?.id,
      friend_id: friendId,
      type
    })
    .select()
    .single()
}

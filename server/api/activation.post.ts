import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'
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

  if (await hasAcceptedActivation(event)) {
    throw createError({
      statusCode: 403,
      name: 'Forbidden',
      message: 'nah, ur playin'
    })
  }

  const { data, error } = await createActivation(event, body.type, body.friendId)

  if (error) {
    throw createError({
      statusCode: 500,
      name: 'InternalServerError',
      message: error.message
    })
  } else {
    return data
  }
})

export async function createActivation (event: H3Event, type: [number, number], friendId: string) {
  const client: any = await serverSupabaseClient(event)
  const user = await serverSupabaseUser(event)

  return await client
    .from('activations')
    .insert({
      user_id: user?.id,
      friend_id: friendId,
      type
    })
    .select()
}

export async function hasAcceptedActivation (event: H3Event) {
  const client: any = serverSupabaseClient(event)
  const user = await serverSupabaseUser(event)

  const { data, error } = await client
    .from('activations')
    .select()
    .or(`user_id.eq.${user?.id},friend_id.eq.${user?.id}`)
    .eq('status', 'accepted')
    .order('created_at', { ascending: false })

  if (error) {
    throw createError({
      statusCode: 500,
      name: 'InternalServerError',
      message: error.message
    })
  } else {
    if (data.length > 0) {
      return true
    } else {
      return false
    }
  }
}

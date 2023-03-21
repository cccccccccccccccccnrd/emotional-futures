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

  const {data, error} = await createActivation(event, body.type)

  if (error) {
    console.log(error.message)
    return {
      status: 'nah'
    }
  } else {
    console.log(data)
    return data
  }
})

export async function createActivation (event: H3Event, type: [number, number]) {
  const client: any = await serverSupabaseClient(event)
  const user = await serverSupabaseUser(event)

  return await client.from('activations')
    .insert({
      user_id: user?.id,
      type
    })
    .select()
}

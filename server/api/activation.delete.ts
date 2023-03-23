import { serverSupabaseClient, serverSupabaseUser, serverSupabaseServiceRole } from '#supabase/server'
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

  const {data, error} = await deleteActivation(event, body.id)

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

export async function deleteActivation (event: H3Event, id: string) {
  const client: any = await serverSupabaseServiceRole(event)

  return await client.from('activations')
    .delete()
    .eq('id', id)
}

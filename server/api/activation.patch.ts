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

  const {data, error} = await updateActivation(event, body.activationId, body.userId, body.accounts)

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

export async function updateActivation (event: H3Event, activationId: string, userId: string, accounts: []) {
  const client: any = serverSupabaseServiceRole(event)

  const activation: any = await getActivation(event, activationId)
  console.log('activation', activation)

  let newAccounts = activation.accounts
  const a = newAccounts.find((a: any) => a.userId === userId)

  if (a !== -1) {
    newAccounts.push({
      userId,
      accounts
    })
  } else {
    const i = newAccounts.indexOf(a)
    newAccounts[i] = {
      userId,
      accounts
    }
  }

  if (newAccounts.length === 2) {

  } else {
    
  }

  return await client
    .from('activations')
    .update({
      accounts: newAccounts,
      updated_at: new Date()
    })
    .eq('id', activationId)
    .select()
}

export async function getActivation (event: H3Event, activationId: string) {
  const client: any = serverSupabaseClient(event)

  const { data, error } = await client
    .from('activations')
    .select()
    .eq('id', activationId)
    .single()

  if (error) {
    console.log(error.message)
    throw createError({
      statusCode: 404,
      name: 'NotFoundError',
      message: error.message
    })
  } else {
    return data
  }
}

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

  const { data, error } = await updateActivation(
    event,
    body.activationId,
    body.userId,
    body.accounts ? body.accounts : null
  )

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

export async function updateActivation (
  event: H3Event,
  activationId: string,
  userId: string,
  accounts: [] | null
) {
  const client: any = serverSupabaseServiceRole(event)

  const activation: any = await getActivation(event, activationId)

  if (!accounts) {
    const emoxy = await getEmoxyByUserId(event, userId)
    const results = activation.results.find((r: any) => r.userId === userId)

    if (!results) throw createError({
      statusCode: 500,
      name: 'InternalServerError',
      message: 'no results yet'
    })

    const bst = [
      emoxy.bst[0] + results.results[0],
      emoxy.bst[1] + results.results[1],
      emoxy.bst[2] + results.results[2]
    ]
    
    await updateEmoxy(event, emoxy.id, {
      bst
    })

    const fed = activation.fed.length === 0 ? [emoxy.user_id] : [...activation.fed, emoxy.user_id]

    return await client
      .from('activations')
      .update({
        fed,
        status: fed.length === 2 ? 'completed' : 'accepted',
        updated_at: new Date()
      })
      .eq('id', activationId)
      .select()
      .single()
  } 

  let newAccounts = activation.accounts
  const a = newAccounts.find((a: any) => a.userId === userId)

  if (!a) {
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
    const ownAccounts = newAccounts.find((a: any) => a.userId === userId)
    const otherAccounts = newAccounts.find((a: any) => a.userId !== userId)

    const ownSt = [
      ownAccounts.accounts
        .map((a: any) => Number(a.st[0]))
        .reduce((acc: any, cur: any) => acc + cur, 0),
      ownAccounts.accounts
        .map((a: any) => Number(a.st[1]))
        .reduce((acc: any, cur: any) => acc + cur, 0)
    ]
    const otherSt = [
      otherAccounts.accounts
        .map((a: any) => Number(a.st[0]))
        .reduce((acc: any, cur: any) => acc + cur, 0),
      otherAccounts.accounts
        .map((a: any) => Number(a.st[1]))
        .reduce((acc: any, cur: any) => acc + cur, 0)
    ]
    const ownB = Math.abs(
      10 * ownAccounts.accounts.length - Math.abs(ownSt[0] - otherSt[1])
    )
    const otherB = Math.abs(
      10 * otherAccounts.accounts.length - Math.abs(otherSt[0] - ownSt[1])
    )

    /* gl hf <3 */

    return await client
      .from('activations')
      .update({
        accounts: newAccounts,
        results: [
          {
            userId: ownAccounts.userId,
            results: [ownB, ownSt[0], otherSt[1]]
          },
          {
            userId: otherAccounts.userId,
            results: [otherB, otherSt[0], ownSt[1]]
          }
        ],
        updated_at: new Date()
      })
      .eq('id', activationId)
      .select()
      .single()
  } else {
    return await client
      .from('activations')
      .update({
        accounts: newAccounts,
        updated_at: new Date()
      })
      .eq('id', activationId)
      .select()
      .single()
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
    .single()

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

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
    body.accounts
  )

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

export async function updateActivation (
  event: H3Event,
  activationId: string,
  userId: string,
  accounts: []
) {
  const client: any = serverSupabaseServiceRole(event)

  const activation: any = await getActivation(event, activationId)

  let newAccounts = activation.accounts
  const a = newAccounts.find((a: any) => a.userId === userId)

  if (!a) {
    newAccounts.push({
      userId,
      accounts
    })
  } else {
    const i = newAccounts.indexOf(a)
    console.log('wat', i)
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

    const ownEmoxy = await getEmoxyByUserId(event, ownAccounts.userId)
    const otherEmoxy = await getEmoxyByUserId(event, otherAccounts.userId)

    const ownBst = [
      ownEmoxy.bst[0] + ownB,
      ownEmoxy.bst[1] + ownSt[0],
      ownEmoxy.bst[2] + otherSt[1]
    ]
    const otherBst = [
      otherEmoxy.bst[0] + otherB,
      otherEmoxy.bst[1] + otherSt[0],
      otherEmoxy.bst[2] + ownSt[1]
    ]

    await Promise.all(
      newAccounts.map(async (a: any) => {
        await updateEmoxy(event, ownEmoxy.id, {
          bst: ownBst
        })
        await updateEmoxy(event, otherEmoxy.id, {
          bst: otherBst
        })
      })
    )

    return await client
      .from('activations')
      .update({
        accounts: newAccounts,
        status: 'finished',
        updated_at: new Date()
      })
      .eq('id', activationId)
      .select()
  } else {
    return await client
      .from('activations')
      .update({
        accounts: newAccounts,
        updated_at: new Date()
      })
      .eq('id', activationId)
      .select()
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

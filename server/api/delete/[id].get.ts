import { serverSupabaseUser, serverSupabaseServiceRole } from '#supabase/server'
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
  console.log(user.id, id)

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
  await unfriendAll(event, id)
  return await client.auth.admin.deleteUser(id)
}

async function unfriendAll(event: H3Event, emoxyId: string) {
  const friends = await getFriendIds(event, emoxyId)

  friends.map(async (friendId: any) => {
    await deleteEmoxyFromEmoxyFriends(event, friendId, emoxyId)
  })
}

async function getFriendIds(event: H3Event, emoxyId: string) {
  return []
}

async function deleteEmoxyFromEmoxyFriends(event: H3Event, friendId: string, emoxyId: string) {
  
}

export default defineNuxtRouteMiddleware(async () => {
  const user = useSupabaseUser()
  const client: any = useSupabaseClient()

  if (!user.value) {
    return navigateTo('/')
  }

  if (client.getChannels().length === 0) {
    await initDb()
  }
})
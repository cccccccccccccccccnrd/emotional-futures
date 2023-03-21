export default defineNuxtRouteMiddleware(() => {
  const user = useSupabaseUser()

  console.log(user.value)

  if (!user.value) {
    return navigateTo('/')
  }
})
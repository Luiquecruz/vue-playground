export default defineEventHandler((event) => {
  const { backendUrl } = useRuntimeConfig(event)
  return proxyRequest(event, `${backendUrl}${event.path}`)
})

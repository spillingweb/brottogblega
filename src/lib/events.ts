import { createServerFn } from '@tanstack/react-start'
import { siteContent } from '@/content/site-content'

export const getEvents = createServerFn({ method: 'GET' }).handler(async () => {
  return siteContent.events.items
})

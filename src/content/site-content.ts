import home from '../../content/home.json'
import about from '../../content/about.json'
import services from '../../content/services.json'
import events from '../../content/events.json'

export type EventItem = {
  id: string
  title: string
  date: string
  location: string
  description: string
}

export const siteContent = {
  home,
  about,
  services,
  events: events as { title: string; items: EventItem[] },
}

export const routes = {
  home: '/',
  chat: '/chat',
  meetings: '/meetings',
  spaces: '/spaces',
  profile: '/profile',
  settings: '/settings',
  aiTools: '/ai-tools'
} as const

export type RouteKey = keyof typeof routes
export type RoutePath = typeof routes[RouteKey]

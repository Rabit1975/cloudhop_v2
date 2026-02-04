// Mock API service for development
export const api = {
  // Mock API methods - add as needed
  get: async (url: string) => {
    console.log(`Mock GET: ${url}`)
    return { data: [] }
  },
  post: async (url: string, data: any) => {
    console.log(`Mock POST: ${url}`, data)
    return { data: null }
  }
}

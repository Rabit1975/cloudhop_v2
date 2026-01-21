// HTTP fetcher utility
type FetcherOptions = RequestInit & {
  params?: Record<string, string>
}

export async function fetcher<T>(
  url: string, 
  options?: FetcherOptions
): Promise<T> {
  const { params, ...fetchOptions } = options || {}
  
  // Build URL with params
  let finalUrl = url
  if (params) {
    const searchParams = new URLSearchParams(params)
    finalUrl = `${url}?${searchParams.toString()}`
  }

  const response = await fetch(finalUrl, {
    ...fetchOptions,
    headers: {
      'Content-Type': 'application/json',
      ...fetchOptions?.headers
    }
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  return response.json()
}

export const api = {
  get: <T>(url: string, options?: FetcherOptions) => 
    fetcher<T>(url, { ...options, method: 'GET' }),
  
  post: <T>(url: string, data?: any, options?: FetcherOptions) => 
    fetcher<T>(url, { ...options, method: 'POST', body: JSON.stringify(data) }),
  
  put: <T>(url: string, data?: any, options?: FetcherOptions) => 
    fetcher<T>(url, { ...options, method: 'PUT', body: JSON.stringify(data) }),
  
  delete: <T>(url: string, options?: FetcherOptions) => 
    fetcher<T>(url, { ...options, method: 'DELETE' })
}

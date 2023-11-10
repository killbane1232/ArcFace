import axios from 'axios'
import router from '@/router/router'

export default function createApiInstance (API_URL) {
  const instanceConfig = {
    // withCredentials: true,
    baseURL: API_URL
  }

  const apiInstance = axios.create(instanceConfig)

  apiInstance.interceptors.request.use(
    (config) => {
      const accessToken = localStorage.getItem('access_token')

      if (accessToken !== null) {
        config.headers.Authorization = `Bearer_${accessToken}`
      }

      return config
    }
  )

  apiInstance.interceptors.response.use(
    (response) => {
      return response
    },
    async (error) => {
      const originalRequest = error.config

      if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true

        try {
          return apiInstance.request(originalRequest)
        } catch (error) {
          localStorage.removeItem('access_token')
          localStorage.removeItem('refresh_token')
          await router.push(`/authorization`)
        }
      }

      throw error
    }
  )

  return apiInstance
}

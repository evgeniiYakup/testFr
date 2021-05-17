import axios from 'axios'
import applyCaseMiddleware from 'axios-case-converter'

const client = axios.create()

client.interceptors.request.use(
  (config) => {
    config.baseURL = '/api'

    return config
  },
  reason => Promise.reject(reason)
)

const api = applyCaseMiddleware(client)
export default api

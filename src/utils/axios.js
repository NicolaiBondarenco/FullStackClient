import axios from 'axios'

// http://localhost:3002/api/auth/register
const instance = axios.create({
  baseURL: 'http://localhost:3002/api',
})

instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem('token')
  return config
})

export default instance

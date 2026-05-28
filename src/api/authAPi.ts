import axios from 'axios'

export const authApi = axios.create({
  baseURL: 'http://localhost:3000',
  headers: { Accept: 'application/json' },
  withCredentials: true,
})

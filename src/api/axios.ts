import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: { Accept: 'application/json' },
})

api.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    const status = error.response?.status

    if (status === 404) {
      console.error('Recurso não encontrado.')
    }

    if (status === 500) {
      console.error('Erro interno no servidor.')
    }

    if (!status) {
      console.error('Não foi possível conectar ao servidor.')
    }

    return Promise.reject(error)
  }
)

export default api

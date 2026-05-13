import axios from 'axios'

const api = axios.create({ baseURL: '/api/articles' })

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export const getArticles  = (params)     => api.get('', { params }).then(r => r.data)
export const getArticle   = (id)         => api.get(`/${id}`).then(r => r.data)
export const createArticle = (data)      => api.post('', data).then(r => r.data)
export const updateArticle = (id, data)  => api.put(`/${id}`, data).then(r => r.data)
export const deleteArticle = (id)        => api.delete(`/${id}`)

import api from '@/api/api'

export const load = params => api({
  method: 'get',
  url: 'weather',
  params
})

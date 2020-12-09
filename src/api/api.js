import axios from 'axios'
import qs from 'qs'
import store from '@/store'

const api = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/',
  paramsSerializer: params => qs.stringify(params)
})

api.interceptors.request.use((config) => {
  const apiKey = store.state.settings.apiKey

  if (apiKey.length) {
    config.params.appid = apiKey

    return config
  }
})

export default api
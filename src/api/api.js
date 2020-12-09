import axios from 'axios'
import qs from 'qs'

const api = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/',
  paramsSerializer: params => qs.stringify(params)
})

export default api
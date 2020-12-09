export default () => ({
  loading: false,
  hasError: false,
  form: {
    loading: false,
    hasError: false
  },
  region: {
    id: 0,
    name: null
  },
  weather: {
    type: {
      id: 0,
      main: null,
      description: null,
      icon: null
    },
    temperature: {
      measured: 0,
      feelsLike: 0,
      min: 0,
      max: 0
    },
    pressure: null,
    humidity: null,
    wind: null,
    visibility: null,
    clouds: null,
    rain: null,
    snow: null,
  },
})
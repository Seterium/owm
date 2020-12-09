import objectPath from 'object-path'

import initialState from './initialState'

export default {
  set(state, [ target, value ]) {
    objectPath.set(state, target, value)
  },
  clear(state) {
    state.weather = initialState().weather
  },
  setWeatherInfo(state, payload) {
    const {
      id,
      name,
      weather,
      main: {
        temp,
        feels_like,
        pressure,
        humidity,
        temp_min,
        temp_max
      },
      wind,
      visibility,
      clouds: {
        all
      },
      rain,
      snow
    } = payload

    state.region = {
      id,
      name,
    },

    state.weather = {
      type: weather[0],
      temperature: {
        measured: Math.round(temp),
        feelsLike: Math.round(feels_like),
        min: temp_min,
        max: temp_max
      },
      pressure,
      humidity,
      wind,
      visibility,
      clouds: all,
      rain,
      snow,
    }
  },
  setLastViewedCity(_, { id, name }) {
    localStorage.setItem('vw-last', `${name}@${id}`)
  },
  loadLastViewedCity(state) {
    const local = localStorage.getItem('vw-last')

    if (local && local.length) {
      const [
        name,
        id
      ] = local.split('@')

      state.region = {
        name,
        id: parseInt(id)
      }
    }
  }
}
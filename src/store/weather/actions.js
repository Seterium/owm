import API from '@/api'

export default {
  getWeatherData({ commit }, payload) {
    API.weather.load({
      ...payload,
      appid: '6e99a56249d56d1f11171237027677fd',
      units: 'metric'
    })
    .then(({ data }) => {
      commit('setWeatherInfo', data)

      commit('setLastViewedCity', {
        id: data.id,
        name: data.name
      })

      commit('settings/addCity', data, {
        root: true
      })

      commit('settings/set', ['view', 'weather'], {
        root: true
      })

    })
    .catch(() => {
      commit('set', [
        'hasError',
        true
      ])
    })
    .finally(() => {
      commit('set', [
        'loading',
        false
      ])
    })
  },
  checkCityExist({ commit }, { payload, notFoundCallback }) {    
    API.weather.load({
      q: payload,
      appid: '6e99a56249d56d1f11171237027677fd',
      units: 'metric'
    })
    .then(({ data }) => {
      commit('setWeatherInfo', data)

      commit('setLastViewedCity', {
        id: data.id,
        name: data.name
      })

      commit('settings/set', ['view', 'weather'], {
        root: true
      })

      commit('settings/addCity', data, {
        root: true
      })
    })
    .catch((error) => {
      if (error && error.response && error.response.status === 404) {
        notFoundCallback()
      }
    })
    .finally(() => {
      commit('set', [
        'loading',
        false
      ])
    })
  },
}
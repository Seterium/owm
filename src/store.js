import Vue from 'vue'
import Vuex from 'vuex'

import weather from './store/weather'
import settings from './store/settings'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    weather,
    settings
  }
})
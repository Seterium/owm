import Vue from 'vue'
import vueCustomElement from 'vue-custom-element'

import App from './App.vue'
import store from './store'

import '@/assets/styles/index.scss'

Vue.config.productionTip = false

App.store = store

Vue.use(vueCustomElement)
Vue.customElement('open-weather', App)
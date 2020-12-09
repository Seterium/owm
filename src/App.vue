<script>
import { mapState, mapActions, mapMutations } from 'vuex'

import Settings from '@/components/Settings'
import Weather from '@/components/Weather'
import CityForm from '@/components/CityForm'

import cogIcon from '@/assets/icons/cog.svg'
import closeIcon from '@/assets/icons/close.svg'
import loopIcon from '@/assets/icons/loop.svg'

export default {
  name: 'App',
  components: {
    Settings,
    Weather,
    CityForm,
    cogIcon,
    closeIcon,
    loopIcon
  },
  created() {
    this.loadCities()
    this.loadLastViewedCity()
  },
  computed: {
    ...mapState('weather', [
      'region',
      'loading',
    ]),
    ...mapState('settings', [
      'view',
    ]),

    title() {
      switch (this.view) {
        case 'settings':
          return 'Settings'

        case 'weather':
          return this.region.name

        case 'form':
          return 'Adding a new city'

        default:
          return 'Weather'
      }
    }
  },
  methods: {
    ...mapActions('weather', [
      'getWeatherData'
    ]),
    ...mapMutations('weather', {
      weatherSet: 'set',
      loadLastViewedCity: 'loadLastViewedCity'
    }),
    ...mapMutations('settings', {
      settingsSet: 'set',
      loadCities: 'load'
    }),

    refresh() {
      this.weatherSet(['loading', true])

      this.getWeatherData({
        q: 'Kaliningrad'
      })
    },
    toggleSettings() {
      this.settingsSet([
        'view',
        this.view === 'settings'
          ? 'weather'
          : 'settings'
      ])
    }
  }
}
</script>
<template>
  <div class="app">
    <div class="app__header">
      <button
        v-if="view === 'weather'"
        class="app__header-button"
        :class="{
          'app__header-button--loading': loading
        }"
        title="Refresh data"
        :disabled="loading"
        @click="refresh"
      >
        <loop-icon />
      </button>
      <span>{{ title }}</span>
      <button 
        class="app__header-button"
        title="Settings"
        @click="toggleSettings"
      >
        <close-icon
          v-if="view === 'settings'"
        />
        <cog-icon 
          v-else
        />
      </button>
    </div>
    <settings 
      v-if="view === 'settings'"  
    />
    <city-form 
      v-else-if="view === 'form'"
    />
    <weather
      v-else
    />
  </div>
</template>
<style src="@/assets/styles/app.scss" lang="scss"></style>

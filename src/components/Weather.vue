<script>
import { mapState, mapMutations, mapActions } from 'vuex'

import Loader from '@/components/Loader'

import thousands from '@/utils/filters/thousands'

export default {
  name: 'Weather',
  components: {
    Loader
  },
  filters: {
    thousands
  },
  created() {
    if (!this.weather.type.id) {
      this.weatherSet(['loading', true])

      if (this.region.id) {
        this.getWeatherData({
          id: this.region.id
        })
      } else {
        navigator.geolocation.getCurrentPosition(this.getWeatherInLocation, this.onGeoApiAccessDenied)
      }
    }
  },
  computed: {
    ...mapState('weather', [
      'loading',
      'hasError',
      'weather',
      'region'
    ]),
    ...mapState('settings', [
      'cities'
    ]),
    windDirection() {
      return this.weather.wind.deg
    },
  },
  methods: {
    ...mapActions('weather', [
      'getWeatherData'
    ]),
    ...mapMutations('settings', {
      settingsSet: 'set'
    }),
    ...mapMutations('weather', {
      weatherSet: 'set',
      weatherClear: 'clear'
    }),

    onGeoApiAccessDenied() {
      this.weatherSet(['loading', false])

      if (this.cities.length) {
        this.settingsSet(['view', 'settings'])
      } else {
        this.settingsSet(['view', 'form'])
      }
    },
    getWeatherInLocation({ coords: { latitude, longitude }}) {
      this.getWeatherData({
        lat: latitude,
        lon: longitude
      })
    },
    reload() {
      this.weatherSet(['loading', true])
      this.weatherSet(['hasError', false])

      this.weatherClear()

      this.getWeatherData({
        id: this.region.id
      })
    }
  }
}
</script>
<template>
  <div class="weather">
    <loader 
      v-if="loading"
      centered
    />
    <div 
      v-else-if="hasError"
      class="weather__placeholder"
    >
      <div>
        <div class="weather__placeholder-title">
          Oops, it seems something went wrong
        </div>
        <div class="weather__placeholder-subtitle">
          An error occurred initializing the weather widget
        </div>
        <div class="weather__placeholder-actions">
          <button @click="reload">Refresh</button>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="weather__header">
        <div>
          <div class="weather__header-icon">
            <img 
              v-if="weather.type.icon"
              :src="`http://openweathermap.org/img/wn/${weather.type.icon}@2x.png`"
            >
            <span class="weather__header-icon-caption">
              {{ weather.type.main }}
            </span>
          </div>
        </div>
        <div>
          <div class="weather__header-temperature">
            <span>{{ weather.temperature.measured }}°</span>
            <div>Feels like {{ weather.temperature.feelsLike }}°</div>
          </div>
        </div>
      </div>
      <div class="weather__details">
        <div class="weather__details-group">
          <li class="weather__details-item">
            <span class="weather__details-item-label">
              Cloudiness:
            </span>
            <span class="weather__details-item-value">
              {{ weather.clouds }}%
            </span>
          </li>
        </div>
        <div 
          v-if="weather.wind"
          class="weather__details-group"
        >
          <li class="weather__details-item">
            <span class="weather__details-item-label">
              Wind speed:
            </span>
            <span class="weather__details-item-value">
              {{ weather.wind.speed }}{{ weather.wind.gust ? `-${weather.wind.gust}` : '' }} m/s
            </span>
          </li>
          <li class="weather__details-item">
            <span class="weather__details-item-label">
              Wind direction:
            </span>
            <span class="weather__details-item-value">
              {{ windDirection }}°
            </span>
          </li>
        </div>
        <div class="weather__details-group">
          <div class="weather__details-item">
            <span class="weather__details-item-label">
              Min t°:
            </span>
            <span class="weather__details-item-value">
              {{ weather.temperature.min }}°
            </span>
          </div>
          <div class="weather__details-item">
            <span class="weather__details-item-label">
              Max t°:
            </span>
            <span class="weather__details-item-value">
              {{ weather.temperature.max }}°
            </span>
          </div>
        </div>
        <div 
          v-if="weather.rain"
          class="weather__details-group"
        >
          <div class="weather__details-item">
            <span class="weather__details-item-label">
              Rain 1h:
            </span>
            <span class="weather__details-item-value">
              {{ weather.rain['1h'] }} mm
            </span>
          </div>
          <div 
            v-if="weather.rain['3h']"
            class="weather__details-item"
          >
            <span class="weather__details-item-label">
              Rain 3h:
            </span>
            <span class="weather__details-item-value">
              {{ weather.rain['3h'] }} mm
            </span>
          </div>
        </div>
        <div 
          v-if="weather.snow"
          class="weather__details-group"
        >
          <div class="weather__details-item">
            <span class="weather__details-item-label">
              Snow 1h:
            </span>
            <span class="weather__details-item-value">
              {{ weather.snow['1h'] }} mm
            </span>
          </div>
          <div 
            v-if="weather.snow['3h']"
            class="weather__details-item"
          >
            <span class="weather__details-item-label">
              Snow 3h:
            </span>
            <span class="weather__details-item-value">
              {{ weather.snow['3h'] }} mm
            </span>
          </div>
        </div>
        <div class="weather__details-item">
          <span class="weather__details-item-label">
            Humidity:
          </span>
          <span class="weather__details-item-value">
            {{ weather.humidity }}%
          </span>
        </div>
        <div class="weather__details-item">
          <span class="weather__details-item-label">
            Pressure:
          </span>
          <span class="weather__details-item-value">
            {{ weather.pressure | thousands }} kPa
          </span>
        </div>
        <div class="weather__details-item">
          <span class="weather__details-item-label">
            Visibility:
          </span>
          <span class="weather__details-item-value">
            {{ weather.visibility | thousands }} m
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<style src="@/assets/styles/components/weather.scss" lang="scss"></style>
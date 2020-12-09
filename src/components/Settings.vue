<script>
import { mapState, mapMutations, mapActions } from 'vuex'

import draggable from 'vuedraggable'
import dragIndicatorIcon from '@/assets/icons/dragIndicator.svg'
import deleteIcon from '@/assets/icons/delete.svg'

export default {
  name: 'Settings',
  components: {
    draggable,
    dragIndicatorIcon,
    deleteIcon
  },
  data: () => ({
    drag: false,
    dragOptions: {
      animation: 200,
      disabled: false,
      ghostClass: 'settings__city--ghost'
    }
  }),
  computed: {
    ...mapState('settings', [
      'cities'
    ]),

    savedCities: {
      get() {
        return this.cities
      },
      set(value) {
        this.settingsSet(['cities', value])

        this.save()
      }
    }
  },
  methods: {
    ...mapActions('weather', [
      'getWeatherData'
    ]),
    ...mapMutations('settings', {
      weatherSet: 'set'
    }),
    ...mapMutations('settings', {
      settingsSet: 'set',
      save: 'save',
      removeCity: 'removeCity'
    }),

    showCityForm() {
      this.settingsSet(['view', 'form'])
    },
    loadWeatherInCity(id) {
      this.weatherSet(['loading', true])

      this.getWeatherData({
        id
      })
    }
  }
}
</script>
<template>
  <div class="settings">
    <draggable
      v-if="savedCities.length"
      v-model="savedCities"
      class="settings__cities-list"
      handle=".settings__city-drag-area"
      v-bind="dragOptions"
      @start="drag = true"
      @end="drag = false"
    >
      <transition-group
        type="transition"
        :name="!drag ? 'flip-list' : null"
      >
        <div 
          v-for="city in savedCities"
          :key="city.id"
          class="settings__city"
        >
          <div class="settings__city-drag-area">
            <drag-indicator-icon />
          </div>
          <button 
            class="settings__city-name"
            @click="loadWeatherInCity(city.id)"
          >
            {{ city.name }}
          </button>
          <button 
            class="settings__city-remove"
            @click="removeCity(city.id)"
          >
            <delete-icon />
          </button>
        </div>
      </transition-group>
    </draggable>
    <div 
      v-else
      class="settings__cities-list"
    >
      <div class="settings__cities-list-title">
        You don't have any saved cities yet.
      </div>
      <div class="settings__cities-list-subtitle">
        You can add a city here by clicking the "Add New City" button
      </div>
    </div>
    <button 
      class="settings__button"
      @click="showCityForm"
    >
      Add new city
    </button>
  </div>
</template>
<style src="@/assets/styles/components/settings.scss" lang="scss"></style>
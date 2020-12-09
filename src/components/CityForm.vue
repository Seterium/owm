<script>
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'CityForm',
  data: () => ({
    cityNotFound: false,
    city: null
  }),
  mounted() {
    this.$refs.field.focus()
  },
  computed: {
    ...mapState('weather', [
      'form'
    ])
  },
  methods: {
    ...mapActions('weather', [
      'checkCityExist'
    ]),
    ...mapMutations('weather', {
      setWeather: 'set',
      setWeatherInfo: 'setWeatherInfo'
    }),
    ...mapMutations('settings', {
      setSettings: 'set'
    }),

    cityNotFounded() {
      this.cityNotFound = true

      this.$refs.field.focus()
    },
    submitForm() {
      this.cityNotFound = false

      this.checkCityExist({
        payload: this.city,
        notFoundCallback: this.cityNotFounded
      })
    }
  }
}
</script>
<template>
  <div class="city-form">
    <div class="city-form__caption">
      <p>Enter the name of the new city in the field below and click the "Add" button</p>
      <p>If the weather is found in it, it will be added to the list of your cities.</p>
    </div>
    <div class="city-form__form">
      <form @submit.prevent="submitForm">
        <input
          v-model="city"
          ref="field"
          type="text"
          required
          minlength="2"
          maxlength="30"
        >
        <button>Add</button>
      </form>
    </div>
    <div 
      v-if="cityNotFound"
      class="city-form__notify"
    >
      The city with the specified name was not found
    </div>
  </div>
</template>
<style src="@/assets/styles/components/cityForm.scss" lang="scss"></style>
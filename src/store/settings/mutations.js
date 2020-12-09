import objectPath from 'object-path'

export default {
  set(state, [ target, value ]) {
    objectPath.set(state, target, value)
  },
  load(state) {
    const local = localStorage.getItem('vw-cities')

    if (local && local.length) {
      try {
        state.cities = local.split(';').map((city) => {
          const [
            name,
            id
          ] = city.split('@')

          return {
            name,
            id: parseInt(id)
          }
        })
      } catch (error) {
        localStorage.removeItem('vw-cities')

        state.cities = []
      }
    }
  },
  save(state) {
    localStorage.setItem('vw-cities', state.cities.map(({ name, id }) =>`${name}@${id}`).join(';'))
  },
  addCity(state, { name, id }) {    
    if (state.cities.find(city => city.id === id) === undefined) {
      state.cities.unshift({
        name,
        id
      })
  
      this.commit('settings/save')
    }
  },
  removeCity(state, removeId) {
    state.cities = state.cities.filter(({ id }) => id !== removeId)

    this.commit('settings/save')
  },
}
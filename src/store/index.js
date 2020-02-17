import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const pageSize = 100

export default new Vuex.Store({
  state: {
    sites: [],
  },
  mutations: {
    setSites: (state, sites) => (state.sites = sites),
  },
  actions: {
    async refreshSites({ commit }) {
      let allSites = []
      let isMorePages = true
      let offset = 0
      while (isMorePages) {
        const resp = await fetch(
          `http://swarmapi.ausplots.aekos.org.au/site` +
            `?limit=${pageSize}` +
            `&offset=${offset}` +
            `&select=site_location_name,visit_start_date,latitude,longitude`,
        )
        const thisPage = await resp.json()
        allSites = allSites.concat(thisPage)
        isMorePages = thisPage.length === pageSize
        offset += pageSize
      }
      commit('setSites', allSites)
    },
  },
  modules: {},
})

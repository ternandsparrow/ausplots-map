import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const pageSize = 100
const apiBaseUrl =
  process.env.VUE_APP_API_URL || 'http://swarmapi.ausplots.aekos.org.au'

export default new Vuex.Store({
  state: {
    visits: [],
    stats: [],
  },
  mutations: {
    setVisits: (state, visits) => (state.visits = visits),
    setStats: (state, stats) => (state.stats = stats),
  },
  actions: {
    async refreshVisits({ commit }) {
      let allResults = []
      let isMorePages = true
      let offset = 0
      while (isMorePages) {
        const thisPage = await fetchForJson(
          `${apiBaseUrl}/visit_summary` +
            `?limit=${pageSize}` +
            `&offset=${offset}`,
        )
        allResults = allResults.concat(thisPage)
        isMorePages = thisPage.length === pageSize
        offset += pageSize
      }
      commit('setVisits', allResults)
    },
    async refreshStats({ commit }) {
      const stats = await fetchForJson(`${apiBaseUrl}/ausplots_stats`)
      commit('setStats', stats)
    },
  },
  modules: {},
})

async function fetchForJson(url) {
  const resp = await fetch(url)
  if (!resp.ok) {
    throw new Error(
      `HTTP response for URL=${url} was not OK, status=${resp.status}`,
    )
  }
  try {
    const result = await resp.json()
    return result
  } catch (err) {
    throw new Error(`Failed to convert HTTP response from URL=${url} to JSON`)
  }
}

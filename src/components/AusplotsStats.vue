<template>
  <div>
    <h1>Dataset statistics</h1>
    <table>
      <thead>
        <tr>
          <th>Stat name</th>
          <th>Stat value</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="curr of stats" :key="curr.name">
          <td>{{ curr.name }}</td>
          <td class="stat-value">{{ curr.stat }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'AusplotsStats',
  computed: {
    ...mapState(['stats']),
  },
  mounted() {
    this.refreshSites()
  },
  methods: {
    refreshSites() {
      return this.$store.dispatch('refreshStats')
    },
  },
}
</script>

<style scoped lang="scss">
.stat-value {
  font-family: monospace;
  font-size: 1.4em;
  text-align: right;
}
</style>

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
    <h1>Visits overdue for publishing</h1>
    <p>Total = {{ overdueVisitsCount }}</p>
    <table>
      <thead>
        <tr>
          <th>Site name</th>
          <th>Visit date</th>
          <th>Age (days)</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="curr of overdueVisits" :key="curr.id">
          <td>{{ curr.site_location_name }}</td>
          <td>{{ curr.prettyDate }}</td>
          <td class="age-col">{{ curr.age }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import dayjs from 'dayjs'

export default {
  name: 'AusplotsStats',
  computed: {
    ...mapState(['stats', 'visits']),
    overdueVisits() {
      const result = this.visits
        .filter(e => {
          if (e.ok_to_publish) {
            return false
          }
          const dateVisited = dayjs(e.visit_start_date)
          const oneYearAgo = dayjs().subtract(1, 'year')
          const isMoreThanOneYearOld = dateVisited.isBefore(oneYearAgo)
          return isMoreThanOneYearOld
        })
        .map(e => {
          const dateVisited = dayjs(e.visit_start_date)
          const now = dayjs()
          return {
            ...e,
            id: `${e.site_location_name}_${e.visit_start_date}`,
            prettyDate: dateVisited.format('YYYY-MM-DD'),
            age: now.diff(dateVisited, 'day'),
          }
        })
      result.sort((a, b) => {
        if (a.site_location_name < b.site_location_name) {
          return -1
        }
        if (a.site_location_name > b.site_location_name) {
          return 1
        }
        return 0
      })
      return result
    },
    overdueVisitsCount() {
      return this.overdueVisits.length
    },
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

.age-col {
  text-align: right;
}
</style>

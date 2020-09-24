<template>
  <div id="app">
    <ausplots-stats />
    <ausplots-map />
  </div>
</template>

<script>
import AusplotsMap from '@/components/AusplotsMap'
import AusplotsStats from '@/components/AusplotsStats'

export default {
  name: 'App',
  components: {
    'ausplots-map': AusplotsMap,
    'ausplots-stats': AusplotsStats,
  },
}
</script>

<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>

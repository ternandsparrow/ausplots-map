<template>
  <div id="app">
    <ausplots-map />
  </div>
</template>

<script>
import AusplotsMap from '@/components/AusplotsMap'

export default {
  name: 'App',
  components: {
    'ausplots-map': AusplotsMap,
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

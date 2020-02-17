<template>
  <div>
    <div class="the-header">
      <button @click="getSites">Refresh sites</button>
      <h1>Ausplots sites</h1>
    </div>
    <div class="the-map">
      <l-map style="height: 100%; width: 100%" :zoom="zoom" :center="center">
        <l-tile-layer :url="url"></l-tile-layer>
        <l-marker
          :lat-lng="curr.latlng"
          v-for="curr of sitesComputed"
          :key="curr.id"
        >
          <l-tooltip>
            Site name: {{ curr.tooltip.siteName }}<br />
            Visit start date: {{ curr.tooltip.visitStartDate }}
          </l-tooltip>
        </l-marker>
      </l-map>
    </div>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker, LTooltip } from 'vue2-leaflet'
import 'leaflet/dist/leaflet.css'
import { Icon } from 'leaflet'
import { mapState } from 'vuex'

delete Icon.Default.prototype._getIconUrl
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
})

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LTooltip,
  },
  data() {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoom: 3,
      center: [-34.9826287, 138.5529928],
    }
  },
  computed: {
    ...mapState(['sites']),
    sitesComputed() {
      return this.sites.map(e => ({
        id: `${e.site_location_name}_${e.visit_start_date}`,
        latlng: [e.latitude, e.longitude],
        tooltip: {
          siteName: e.site_location_name,
          visitStartDate: e.visit_start_date,
        },
      }))
    },
  },
  methods: {
    getSites() {
      return this.$store.dispatch('refreshSites')
    },
  },
}
</script>

<style scoped lang="scss">
.the-header {
  height: 10vh;

  h1 {
    margin: 0;
    margin-left: 0.5em;
    padding-top: 0.25em;
  }

  button {
    float: right;
    margin-top: 1em;
    margin-right: 1em;
  }
}

.the-map {
  height: 90vh;
}
</style>

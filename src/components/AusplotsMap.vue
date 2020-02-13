<template>
  <div style="height: 350px;">
    <div class="info" style="height: 15%">
      <span>Center: {{ center }}</span>
      <span>Zoom: {{ zoom }}</span>
      <span>Bounds: {{ bounds }}</span>
    </div>
    <l-map
      style="height: 80%; width: 100%"
      :zoom="zoom"
      :center="center"
      @update:zoom="zoomUpdated"
      @update:center="centerUpdated"
      @update:bounds="boundsUpdated"
    >
      <l-tile-layer :url="url"></l-tile-layer>
      <l-marker
        :lat-lng="curr.latlng"
        v-for="curr of sitesComputed"
        :key="curr.id"
      ></l-marker>
    </l-map>
    <button @click="getSites">Get sites</button>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet'
import 'leaflet/dist/leaflet.css'
import { Icon } from 'leaflet'

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
  },
  data() {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoom: 3,
      center: [-34.9826287, 138.5529928],
      bounds: null,
      sites: [],
    }
  },
  computed: {
    sitesComputed() {
      return this.sites.map(e => ({
        id: `${e.site_location_name}_${e.visit_start_date}`,
        latlng: [e.latitude, e.longitude],
      }))
    },
  },
  methods: {
    zoomUpdated(zoom) {
      this.zoom = zoom
    },
    centerUpdated(center) {
      this.center = center
    },
    boundsUpdated(bounds) {
      this.bounds = bounds
    },
    async getSites() {
      const resp = await fetch(
        'http://swarmapi.ausplots.aekos.org.au/site?limit=50',
      )
      this.sites = await resp.json()
    },
  },
}
</script>

<style scoped lang="scss"></style>

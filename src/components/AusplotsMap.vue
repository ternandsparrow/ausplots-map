<template>
  <div>
    <div class="the-header">
      <h1>
        Site map
      </h1>
      <div>
        <img :src="publishedIconUrl" /> All visits published
        <img :src="unpublishedIconUrl" /> At least one visit unpublished
      </div>
    </div>
    <div class="the-map">
      <l-map style="height: 100%; width: 100%" :zoom="zoom" :center="center">
        <l-tile-layer :url="url"></l-tile-layer>
        <l-marker :lat-lng="curr.latlng" v-for="curr of sites" :key="curr.id">
          <l-tooltip>
            Site name: {{ curr.tooltip.siteName }}<br />
            Visits:
            <ul>
              <li
                v-for="currVisit of curr.tooltip.visits"
                :key="currVisit.visitStartDate"
              >
                Visit start date: {{ currVisit.visitStartDate }}<br />
                Is published: {{ currVisit.isPublished }}
              </li>
            </ul>
          </l-tooltip>
          <l-icon :icon-url="curr.iconUrl" />
        </l-marker>
      </l-map>
    </div>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker, LTooltip, LIcon } from 'vue2-leaflet'
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
  name: 'AusplotsMap',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LTooltip,
    LIcon,
  },
  data() {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoom: 3,
      center: [-34.9826287, 138.5529928],
      publishedIconUrl: 'marker-icon-blue.png',
      unpublishedIconUrl: 'marker-icon-red.png',
    }
  },
  computed: {
    ...mapState(['visits']),
    sites() {
      const reduced = this.visits.reduce((accum, e) => {
        const key = e.site_location_name
        const existing = accum[key] || {
          id: e.site_location_name,
          latlng: [e.latitude, e.longitude],
          tooltip: {
            siteName: e.site_location_name,
            visits: [],
          },
        }
        existing.tooltip.visits.push({
          visitStartDate: e.visit_start_date,
          isPublished: e.ok_to_publish ? 'yes' : 'no',
        })
        existing.iconUrl = existing.tooltip.visits.every(
          v => v.isPublished === 'yes',
        )
          ? this.publishedIconUrl
          : this.unpublishedIconUrl
        accum[key] = existing
        return accum
      }, {})
      return Object.values(reduced)
    },
  },
  mounted() {
    this.refreshVisits()
  },
  methods: {
    refreshVisits() {
      return this.$store.dispatch('refreshVisits')
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
  height: 50vh;
}
</style>

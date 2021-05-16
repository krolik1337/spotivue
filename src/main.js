import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import store from './store'
import router from './router'
import api from './api'
import * as types from "./store/mutations"
import axios from "axios"

Vue.config.productionTip = false

new Vue({
  vuetify,
  store,
  router,
  api,
  created() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === "user/SAVE_TOKEN") {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${state.user.token}`;
      }
    });
    if (this.$store.state.user.token) {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${this.$store.state.user.token}`;
       this.$store.dispatch("player/spotifyPlayer");
       this.$store.dispatch("spotify/getFeaturedPlaylists");
       this.$store.dispatch("spotify/getUserAlbums");
       this.$store.dispatch("spotify/getNewReleases");
    }
  },
  render: h => h(App)
}).$mount('#app')

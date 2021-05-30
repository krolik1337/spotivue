<template
  >
  <v-container
    fluid
    v-if="episodes"
    style="
      overflow-y: scroll;
      width: 100%;
      height: 80vh;
      box-sizing: content-box;
    "
  >
  <v-row>
      <v-card
        width="99%"
        height="80px"
        flat
        color="#191414"
      >
      <div class="d-flex flex-no-wrap">
          <div style="width: 60px;">
            <v-card-title v-text="'#'" class="justify-center"></v-card-title>
          </div>
          <div style="width: 49.5%">
            <v-card-title
              v-text="'TITLE'"
            ></v-card-title>
          </div>
          <div style="width: 45%">
            <v-card-title
              v-text="'SHOW'"
            ></v-card-title>
          </div>
          
          <div style="width: 10%">
            <v-card-title
              v-text="'DURATION'"
            ></v-card-title>
          </div>
        </div>
      </v-card>
  </v-row>
    <v-row v-for="(item, index) in episodes.items" :key="index">
      <v-card
        width="99%"
        height="90px"
        v-if="objTrack ? true : item.episode"
        flat
        color="#191414"
        v-on:click="
          objTrack
            ? playSong({ uris: urisEpisodes, position: index })
            : playSong({ uris: urisEpisodes, position: index })
        "
      >
        <div class="d-flex flex-no-wrap">
          <div style="width: 60px;">
            <v-card-title v-text="index + 1" class="justify-center"></v-card-title>
          </div>
          <v-avatar
            v-if="objTrack ? item.show.images : item.episode.show.images"
            class="ma-3"
            size="50"
          >
            <v-img
              :src="
                objTrack
                  ? item.show.images[1].url
                  : item.episode.show.images[1].url
              "
            ></v-img>
          </v-avatar>
          <div style="width: 45%">
            <v-card-title
              v-text="objTrack ? item.name : item.episode.name"
            ></v-card-title>
          </div>
          <div style="width: 45%">
            <v-card-title
              v-text="objTrack ? item.name : item.episode.show.name"
            ></v-card-title>
          </div>
          <div style="width: 10%">
            <v-card-title
              class="right"
              v-text="
                parseInt(item.episode.duration_ms / 60000).toString() +
                ':' +
                (parseInt(item.episode.duration_ms % 60000 / 1000) < 10
                  ? '0' + parseInt(item.episode.duration_ms % 60000 / 1000).toString()
                  : parseInt(item.episode.duration_ms % 60000 / 1000).toString())
              "
            ></v-card-title>
          </div>
        </div>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import _ from "lodash";
import { mapActions, mapGetters } from "vuex";
export default {
  props: {
    episodes: Object,
    objTrack: Boolean,
    title: String,
    listType: String,
  },
  computed: {
    ...mapGetters("spotify", ["image", "type", "urisEpisodes"]),
  },
  methods: {
    ...mapActions("player", ["playSong"]),
  },
};
</script>
<style lang="scss" scoped>
.v-card__subtitle {
  font-size: 12px;
}
.col-8 {
  padding: 0;
}
</style>
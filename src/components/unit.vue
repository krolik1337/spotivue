<template
  >
  <v-container
    fluid
    v-if="songs"
    style="
      overflow-y: scroll;
      width: 80%;
      height: 80vh;
      box-sizing: content-box;
    "
  >
    <v-row v-for="(item, index) in songs.items" :key="index">
      <v-card
        width="90%"
        height="80px"
        v-if="objTrack ? true : item.track"
        flat
        v-on:click="
          objTrack
            ? playSong({ uris: uris, position: index })
            : playSong({ uris: uris, position: index })
        "
        >
        <div class="d-flex flex-no-wrap" 
          >
          <div style="width: 60px; text-align: right">
          <v-card-title
            v-text="index+1"
          ></v-card-title>
          </div>
          <v-avatar
            v-if="objTrack ? item.album : item.track.album"
            class="ma-3"
            size="50"
          >
            <v-img
              :src="
                objTrack
                  ? item.album.images[1].url
                  : item.track.album.images[1].url
              "
            ></v-img>
          </v-avatar>
          <div style="width: 45%">
          <v-card-title
            v-text="objTrack ? item.name : item.track.name"
          ></v-card-title>
          <v-card-subtitle
            ><span
              v-for="artist in objTrack ? item.artists : item.track.artists"
              :key="artist.id"
              v-html="artist.name + ' '"
            ></span
          ></v-card-subtitle>
          </div>
          <div style="width: 45%">
              <v-card-title v-text="objTrack ? item.album.name : item.track.album.name"
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
    songs: Object,
    objTrack: Boolean,
    title: String,
    listType: String,
  },
  computed: {
    ...mapGetters("spotify", ["image", "type", "uris"]),
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
<template>
  <v-bottom-navigation
    dark
    :background-color="spotifyDark"
    id="sp-nav"
    v-if="player"
  >
    <v-row justify="center" align="center">
      <v-col cols="3" style="padding: 0">
        <v-card v-if="currentTrack.name" color="#191414">
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title
                style="font-size: 12px !important; line-height: 12px"
                class="headline"
                v-text="currentTrack.name"
              ></v-card-title>

              <v-card-subtitle style="font-size: 10px"
                ><span
                  v-for="artist in currentTrack.artists"
                  :key="artist.id"
                  v-html="artist.name + ' '"
                ></span
              ></v-card-subtitle>
            </div>
            <v-avatar v-if="currentTrack.album" class="ma-3" size="50" tile>
              <v-img :src="currentTrack.album.images[1].url"></v-img>
            </v-avatar>
            <v-card-actions>
              <v-btn
                icon
                v-on:click="
                  liked[0] === false
                    ? saveTrack(currentTrack.id)
                    : deleteTrack(currentTrack.id)
                "
              >
                <v-icon color="red">{{
                  liked[0] === false ? "mdi-heart-outline" : "mdi-heart"
                }}</v-icon>
              </v-btn>
            </v-card-actions>
          </div>
        </v-card>
      </v-col>
      <v-col
        md="3"
        lg="3"
        sm="12"
        id="sp-palyer"
        style="display: flex; justify-content: center; align-items: center"
      ><v-btn
          icon
          min-width="30"
          min-height="30"
          v-on:click="shuffle(!shufflePlay)"
        >
          <v-icon
            :color="shufflePlay ? spotifyGreen : 'secondaryLight'"
            style="font-size: 25px"
            >mdi-shuffle</v-icon
          >
        </v-btn>
        <v-btn v-on:click="prev">
          <v-icon>mdi-skip-previous</v-icon>
        </v-btn>
        <v-btn v-if="player.paused" v-on:click="resume()">
          <v-icon style="font-size: 50px">mdi-play-circle</v-icon>
        </v-btn>

        <v-btn v-if="!player.paused" v-on:click="pause()">
          <v-icon style="font-size: 50px">mdi-pause-circle</v-icon>
        </v-btn>
        <v-btn v-on:click="next">
          <v-icon>mdi-skip-next</v-icon>
        </v-btn><v-btn
          v-if="repeatPlay === 'off'"
          icon
          min-width="30"
          min-height="30"
          v-on:click="repeat('context')"
        >
          <v-icon color="secondaryLight" style="font-size: 25px"
            >mdi-repeat</v-icon
          >
        </v-btn>
        <v-btn
          v-else-if="repeatPlay === 'context'"
          icon
          min-width="30"
          min-height="30"
          v-on:click="repeat('track')"
        >
          <v-icon color="secondaryDark" style="font-size: 25px"
            >mdi-repeat</v-icon
          >
        </v-btn>
        <v-btn
          v-else-if="repeatPlay === 'track'"
          icon
          min-width="30"
          min-height="30"
          v-on:click="repeat('off')"
        >
          <v-icon color="secondaryDark" style="font-size: 25px"
            >mdi-repeat-once</v-icon
          >
        </v-btn>
      </v-col>
      <v-col cols="3"></v-col>
      <v-col cols="6" style="padding: 0; margin-top: 0px">
        <v-slider
          min="0"
          step="1000"
          v-on:change="seek"
          :max="songDuration"
          v-model="slider"
        >
          <template v-slot:prepend id="song">
            <v-subheader
              :value="
                parseInt(currentSec / 60).toString() +
                ':' +
                (parseInt(currentSec % 60) < 10
                  ? '0' + parseInt(currentSec % 60).toString()
                  : parseInt(currentSec % 60).toString())
              "
              class="mt-0 pt-0"
              :disabled="true"
              :readonly="true"
              style="width: 35px"
            ></v-subheader>
          </template>
          <template v-slot:append>
            <v-subheader
              :value="
                parseInt(maxSec / 60).toString() +
                ':' +
                (parseInt(maxSec % 60) < 10
                  ? '0' + parseInt(maxSec % 60).toString()
                  : parseInt(maxSec % 60).toString())
              "
              class="mt-0 pt-0"
              :disabled="true"
              style="width: 35px"
              flat
            ></v-subheader>
          </template>
        </v-slider>
      </v-col>
    </v-row>
  </v-bottom-navigation>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      play: false,
      spotifyDark: "#191414",
      spotifyGreen: "#1D8954",
      spotifyLight: "#FFFFFF",
    };
  },
  computed: {
    ...mapGetters("player", [
      "currentSec",
      "maxSec",
      "player",
      "currentTrack",
      "songCurrentMilisec",
      "songDuration",
      "volume",
      "shufflePlay",
      "repeatPlay",
    ]),
    ...mapGetters("spotify", ["liked"]),
    slider: {
      get() {
        return this.songCurrentMilisec;
      },
      set(value) {
        this.updateSongTime(value);
      },
    },
  },
  methods: {
    ...mapActions("player", [
      "pause",
      "resume",
      "next",
      "prev",
      "seek",
      "updateSongTime",
      "setVolume",
      "shuffle",
      "repeat",
    ]),
    ...mapActions("spotify", ["saveTrack", "deleteTrack", "addToQueue"]),
  },
};
</script>
<style lang="scss" scoped>
.v-slider__track-background,
.v-slider__track-fill,
.v-input__slot,
.v-slider__thumb-container,
.v-slider__thumb:before {
  transition: 3.3s cubic-bezier(0.25, 0.8, 0.5, 1) !important;
}
#sp-nav {
  height: 150px !important;
}
@media only screen and (max-width: 900px) {
  #sp-nav {
    height: 45px !important;
  }
  .col-sm-12 {
    padding: 0 !important;
  }
}
</style>
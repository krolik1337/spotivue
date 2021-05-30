import api from "@/api";
import * as types from "../mutations";
import router from "@/router";
import querystring from "query-string";
import axios from "axios";
import store from "..";
import Vue from "vue";

// initial state
const state = {
  DevId: 1,
  songCurrentSec: 0,
  maxSongSec: 0,
  player: {},
  interval: false,
  currentTrack: false,
  songDuration: 100,
  songCurrentMilisec: 0,
  shuffle: false,
  volume: 0.5,
  repeat: "off"
};
// getters
const getters = {
  songDuration: state => state.songDuration,
  songCurrentMilisec: state => state.songCurrentMilisec,
  currentSec: state => state.songCurrentSec,
  maxSec: state => state.maxSongSec,
  player: state => state.player,
  currentTrack: state => state.currentTrack,
  volume: state => state.volume,
  shufflePlay: state => state.shuffle,
  repeatPlay: state => state.repeat
};

// actions
const actions = {
  spotifyPlayer({ commit, rootState, state }) {
    window.onSpotifyWebPlaybackSDKReady = () => {
      const token = rootState.user.token;
      const player = new window.Spotify.Player({
        name: "Spotivue",
        getOAuthToken: cb => {
          cb(token);
        }
      });

      // Error handling
      player.addListener("initialization_error", ({ message }) => {
        console.error(message);
      });
      player.addListener("authentication_error", ({ message }) => {
        console.error(message);
      });
      player.addListener("account_error", ({ message }) => {
        this.dispatch("toastMessage/alert", {
          message: "Sorry, You have no premium account. 😔",
          type: "warning"
        });
      });
      player.addListener("playback_error", ({ message }) => {
        if (state.currentTrack.uri)
          this.dispatch("player/playSong", { uri: state.currentTrack.uri });
        else
          this.dispatch("toastMessage/alert", {
            message: "No song was loaded",
            type: "error"
          });
      });

      // Playback status updates
      player.addListener("player_state_changed", statePlayer => {
        commit("player", statePlayer);
        console.log(statePlayer.track_window.current_track);
        commit("saveCurrentTrack", statePlayer.track_window.current_track);
        this.dispatch("spotify/checkSavedTrack", [
          statePlayer.track_window.current_track.id
        ]);
        if (!statePlayer.paused) {
          commit("playingSong", statePlayer);
          if (!state.interval)
            commit(
              "setInt",
              setInterval(() => {
                commit("updateTime");
              }, 1000)
            );
        } else {
          commit("setInt", false);
        }
      });

      // Ready
      player.addListener("ready", ({ device_id }) => {
        commit("saveId", device_id);
        // console.log('Ready with Device ID', device_id);
        this.dispatch("toastMessage/alert", {
          message: "Player is ready",
          type: "success"
        });
        commit("setInt", false);
      });

      // Not Ready
      player.addListener("not_ready", ({ device_id }) => {
        // console.log('Device ID has gone offline', device_id);
      });

      // Connect to the player!
      player.connect();
      Vue.prototype.$player = player;
    };
  },
  playSong({ state, commit }, data) {
    api.playSong(
      song => {
        if (song.status === 401) this.dispatch("user/login");
        else if (song.status === 403)
          this.dispatch("toastMessage/alert", {
            message: "Sorry, You don't have premium account. 😔",
            type: "warning"
          });
        else if (song.status === 404)
          this.dispatch("toastMessage/alert", {
            message: "Sorry, player is not ready yet.",
            type: "error"
          });
      },
      { track: data, id: state.DevId }
    );
  },
  playPlaylist({ state, commit }, uri) {
    api.playPlaylist(
      song => {
        if (song.status === 401) this.dispatch("user/login");
        else if (song.status === 403)
          this.dispatch("toastMessage/alert", {
            message: "Sorry, You have no premium account. 😔",
            type: "warning"
          });
        else if (song.status === 404)
          this.dispatch("toastMessage/alert", {
            message: "Sorry, player is not ready yet.",
            type: "error"
          });
      },
      { uri: uri, id: state.DevId }
    );
  },
  updateSec({ commit, state }) {
    if (!state.player.paused)
      commit(
        "setInt",
        setInterval(() => {
          commit("updateTime");
        }, 1000)
      );
    else {
      commit("setInt", false);
    }
  },
  updateSongTime({ commit }, data) {
    commit("seekTime", data);
  },
  updateVolume({ commit }, data) {
    commit("volume", data);
  },
  pause() {
    Vue.prototype.$player.pause();
  },
  resume() {
    Vue.prototype.$player.resume();
  },
  prev() {
    Vue.prototype.$player.previousTrack();
  },
  next() {
    Vue.prototype.$player.nextTrack();
  },
  seek({ state }) {
    Vue.prototype.$player.seek(state.songCurrentMilisec);
  },
  setVolume({ state }) {
    console.log(state.volume);
    Vue.prototype.$player.setVolume(state.volume);
  },
  getVolume({ commit }) {
    Vue.prototype.$player.getVolume().then(volume => {
      commit("volume", volume);
    });
  },
  shuffle({ commit }, data) {
    commit("shuffle", data);
    api.playShuffle(() => {}, data);
  },
  repeat({ commit }, data) {
    console.log(data);
    commit("repeat", data);
    api.playRepeat(() => {}, data);
  }
};

// mutations
const mutations = {
  repeat(state, data) {
    state.repeat = data;
  },
  shuffle(state, data) {
    state.shuffle = data;
  },
  volume(state, data) {
    state.volume = data;
  },
  seekTime(state, data) {
    state.songCurrentMilisec = data;
    state.songCurrentSec = data / 1000;
  },
  saveCurrentTrack(state, data) {
    state.currentTrack = data;
  },
  setInt(state, data) {
    if (!state.interval) {
      state.interval = clearInterval(state.interval);
      state.interval = data;
    } else {
      state.interval = clearInterval(state.interval);
      state.interval = false;
    }
  },
  updateTime(state) {
    state.songCurrentMilisec += 1000;
    state.songCurrentSec += 1;
  },
  saveId(state, id) {
    state.DevId = id;
  },
  playingSong(state, data) {
    state.maxSongSec = data.duration / 1000;
    state.songCurrentSec = data.position / 1000;
    state.songDuration = data.duration;
    state.songCurrentMilisec = data.position;
  },
  player(state, data) {
    state.player = data;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
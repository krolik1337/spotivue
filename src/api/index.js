// import _ from "lodash";
import SETTINGS from "../settings";
import axios from "axios";
import router from "@/router";

axios.defaults.baseURL = SETTINGS.API_BASE_PATH;
axios.defaults.headers.post["Content-Type"] = "application/json";

 const api = {
   clientID: "e3d259dcde61422dae2b5e88689e42b0"
 };

export default {
    getUserInfo(cb) {
      axios
        .get("me")
        .then(response => {
          cb(response.data);
        })
        .catch(e => {
          cb(e.response.data.error);
        });
    },
    getAlbums(cb) {
      axios
        .get("me/playlists")
        .then(response => {
          cb(response.data);
        })
        .catch(e => cb(e.response.data.error));
    },
    getPlaylistSongs(cb, type) {
      axios
        .get(type + "s/" + router.apps[0].$route.params.id + "/tracks")
        .then(response => {
          cb(response.data);
        })
        .catch(e => cb(e.response.data.error));
    },
    playSong(cb, data) {
      axios
        .put(
          `me/player/play?device_id=${data.id}`,
          data.track.position != undefined
            ? {
                uris: data.track.uris,
                offset: { position: data.track.position }
              }
            : {
                uris: [data.track.uri]
              }
        )
        .then(response => {
          cb(response.data);
        })
        .catch(e => cb(e.response.data.error));
    },
    playPlaylist(cb, data) {
      axios
        .put(`me/player/play?device_id=${data.id}`, {
          context_uri: data.uri
        })
        .then(response => {
          cb(response.data);
        })
        .catch(e => cb(e.response.data.error));
    },
    getSavedTracks(cb) {
      axios
        .get(`me/tracks`, {
          limit: 50
        })
        .then(response => {
          cb(response.data);
        })
        .catch(e => cb(e.response.data.error));
    },
    getRecomendations(cb) {
      axios
        .get(`me/top/tracks`)
        .then(response => {
          cb(response.data);
        })
        .catch(e => cb(e.response.data.error));
    },
    getFeaturedPlaylists(cb) {
      axios
        .get(`browse/featured-playlists`)
        .then(response => {
          cb(response.data);
        })
        .catch(e => cb(e.response.data.error));
    },
    getNewReleases(cb) {
      axios
        .get(`browse/new-releases`)
        .then(response => {
          cb(response.data);
        })
        .catch(e => cb(e.response.data.error));
    },
    playShuffle(cb, data) {
      axios
        .put(`me/player/shuffle?state=${data}`)
        .then(response => {
          cb(response.data);
        })
        .catch(e => cb(e.response.data.error));
    },
    /**
     * @param {Function} cb - CallBack Function to get server response
     * @param {String} data - Repeat mode
     */
    playRepeat(cb, data) {
      axios
        .put(`me/player/repeat?state=${data}`)
        .then(response => {
          cb(response.data);
        })
        .catch(e => cb(e.response.data.error));
    },
    /**
     * @param {Function} cb - CallBack Function to get server response
     * @param {String} data - ID of song to save to liked songs
     */
    saveTracks(cb, data) {
      axios
        .put(`me/tracks`, {
          ids: [data]
        })
        .then(response => {
          cb(response.data);
        })
        .catch(e => cb(e.response.data.error));
    },
    deleteTracks(cb, data) {
      axios
        .delete(`me/tracks?ids=${data}`)
        .then(response => {
          cb(response.data);
        })
        .catch(e => cb(e.response.data.error));
    },
    addToQueue(cb, data) {
      axios
        .post(`me/player/queue?uri=${data.uri}&device_id=${data.id}`)
        .then(response => {
          cb(response.data);
        })
        .catch(e => cb(e.response.data.error));
    },
    checkSavedTracks(cb, ids) {
      ids = ids.join(",");
      axios
        .get(`me/tracks/contains?ids=${ids}`)
        .then(response => {
          cb(response.data);
        })
        .catch(e => cb(e.response.data.error));
    }
};
<template>
  <v-app>
    <sidebar />
    <v-content>
      <router-view />
    </v-content>
    <player/>
    <v-snackbar
      class="sp-snackbar"
      @input="hideAlert"
      :value="showAlert"
      :multi-line="true"
      :timeout="timeout"
    >
      <div
        style="display: flex;align-items:center;margin:auto;"
        v-bind:class="[alertType + '--text']"
      >
        <v-icon
          style="margin-right:20px;"
          color="white"
          v-bind:class="[alertType + '--text']"
          >{{ alertIcon }}</v-icon
        >
        {{ message }}
      </div>
      <v-btn
        style="margin-top: -25px;, font-size: 12px;"
        icon
        text
        @click="hideAlert"
        ><v-icon color="white">mdi-close</v-icon></v-btn
      >
    </v-snackbar>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import sidebar from "./components/sidebar";
import player from "./components/player";

export default {
  name: "App",
  components: {
    sidebar,
    player
  },
  computed: {
    ...mapGetters("toastMessage", [
      "timeout",
      "alertType",
      "alertIcon",
      "message",
      "showAlert"
    ]),
    ...mapGetters("user", ["userInfo", "loggedIn", "noTokenProvided"])
  },
  methods: {
    ...mapActions("toastMessage", ["hideAlert"])
  },
  beforeCreate() {
    this.$store.dispatch("user/getUserInfo");
  },
  beforeMount() {
    this.$store.dispatch("user/getToken");
  }
};
</script>
<style lang="scss">
#app {
  overflow: hidden;
}
.v-application--wrap {
  overflow: hidden;
}
.v-list-item {
  padding: 0;
}
body {
  overflow: hidden; /* Hide scrollbars */
}
</style>
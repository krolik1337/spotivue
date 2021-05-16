<template>
  <v-app>
    <sidebar />
    <v-content>
      <router-view />
    </v-content>
    <player/>
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
    ...mapGetters("user", ["userInfo", "loggedIn", "noTokenProvided"])
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
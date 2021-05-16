<template>
  <v-navigation-drawer
    :permanent="true"
    :color="color"
    :right="right"
    absolute
    dark
    width="180px"
    v-if="userInfo"
    app
  >
        <v-list nav class="py-0">
          <v-list-item-avatar rounded size="164">
            <v-img :src="userInfo.images[0].url" alt="avatar" />
          </v-list-item-avatar>
          <v-list-item dark>
            <v-list-item-content>
              <v-list-item-title class="title"
                >Hi {{ userInfo.display_name }}!</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

          <v-list-item
            v-for="item in items"
            :key="item.title"
            link
            :to="item.url"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <template v-slot:append>
        <v-img
          justify-end
          v-if="currentTrack.album"
          size="164"
          tile
          :src="currentTrack.album.images[0].url"
        ></v-img>
        </template>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      drawer: true,
      items: [
        { title: "Home", icon: "mdi-home-outline", url: "/" },
        { title: "Liked songs", icon: "mdi-heart-outline", url: "/saved" },
      ],
      color: "#1D8954",
      right: false,
    };
  },
  computed: {
    ...mapGetters("user", ["userInfo", "loggedIn", "userProfile"]),
    ...mapGetters("player", ["currentTrack"]),
  },
  created() {},
};
</script>
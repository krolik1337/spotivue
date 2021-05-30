
<template>
<v-container dark fluid style="overflow: hidden;  width: 100%;
    height: 100%;">
    <episode :episodes="episodes"/>
</v-container>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import episode from "@/components/episode"
export default {
    components:{
        episode
    },
    computed: {
    ...mapGetters("spotify", ["episodes"]),
    },
    created() {
        this.$store.dispatch("spotify/getSavedEpisodes");
    },
}
</script>
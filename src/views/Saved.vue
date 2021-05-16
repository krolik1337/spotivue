
<template>
<v-container dark fluid style="overflow: hidden;  width: 100%;
    height: 100%;">
    <unit :songs="saved"/>
</v-container>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import unit from "@/components/unit"
export default {
    components:{
        unit
    },
    computed: {
    ...mapGetters("spotify", ["saved"]),
}, 
    created() {
        this.$store.dispatch("spotify/getUserTracks");
    },
}
</script>
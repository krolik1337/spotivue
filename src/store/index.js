import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import toastMessage from './modules/toastMessage'
import user from './modules/user'
import player from './modules/player'
import spotify from './modules/spotify'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

// const debug = process.env.NODE_ENV !== 'production'

const vuexLocal = new VuexPersistence({
    storage: window.localStorage,
    key: 'spotivue',
    strictMode: true
})

export default new Vuex.Store({
    actions,
    getters,
    modules: {
        toastMessage,
        user,
        player,
        spotify
    },
    mutations: {
        RESTORE_MUTATION: vuexLocal.RESTORE_MUTATION // this mutation **MUST** be named "RESTORE_MUTATION"
    },
    strict: true,
    plugins: [vuexLocal.plugin]
})

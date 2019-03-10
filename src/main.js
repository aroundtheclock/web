// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import './plugins/vuetify'
import Vuetify from 'vuetify';
import VueLuxon from 'vue-luxon';
import App from './App'
import router from './router'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)
Vue.use(VueLuxon)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})

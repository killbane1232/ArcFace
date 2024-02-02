import {createApp} from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import {loadFonts} from './plugins/webfontloader'
import router from './router'
import VueCookies from 'vue-cookies'

loadFonts();

const app = createApp(App);

app
    .use(router)
    .use(vuetify)
    .use(VueCookies, {expires: '7d'})
    .mount('#app')

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/scss/fonts.scss'
import './assets/scss/main.scss'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faHatWizard, faBook, faMoon, faVolumeUp, faVolumeMute, faLanguage, faSave, faSitemap, faPhoneAlt, faEnvelope, faHome, faBirthdayCake, faUserCircle, faHashtag, faPlay, faPause, faChevronLeft, faChevronRight, faChevronDown,faStream, faRetweet, faReply, faHeart } from '@fortawesome/free-solid-svg-icons'
import { faLinux, faWindows, faGitlab, faFacebook, faDiscord, faHtml5, faCss3Alt, faNodeJs, faJs, faVuejs, faBootstrap, faFontAwesome } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

library.add( faHatWizard, faBook, faMoon, faVolumeUp, faVolumeMute, faLinux, faWindows, faLanguage, faSave, faSitemap, faPhoneAlt, faEnvelope, faHome, faBirthdayCake, faUserCircle, faGitlab, faHashtag, faFacebook, faDiscord, faPlay, faPause, faChevronLeft, faChevronRight, faChevronDown, faStream, faRetweet, faReply, faHeart, faHtml5, faCss3Alt, faNodeJs, faJs, faVuejs, faBootstrap, faFontAwesome )

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

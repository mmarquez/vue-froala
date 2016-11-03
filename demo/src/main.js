import Vue from 'vue'
import App from './App.vue'

// supports both of Vue 1.0 and Vue 2.0
import VueFroala from 'vue-froala/vue-froala.es5'

Vue.use(VueFroala);

new Vue({
  el: '#app',
  render: h => h(App),
})

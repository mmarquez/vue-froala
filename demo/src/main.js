import Vue from 'vue'
import App from './App.vue'

import $ from "jquery";
var froala = require('../node_modules/froala-editor/js/froala_editor.pkgd.min');
import "froala-editor/css/froala_editor.min.css";
import "froala-editor/css/froala_style.min.css";

// supports both of Vue 1.0 and Vue 2.0
import VueFroala from 'vue-froala'

Vue.use(VueFroala)

new Vue({
  el: '#app',
  render: h => h(App),
})

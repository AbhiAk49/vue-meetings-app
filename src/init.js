import Vue from 'vue';
import Router from 'vue-router';
import Vuelidate from 'vuelidate';
import Toast from "vue-toastification";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'popper.js';
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@fortawesome/fontawesome-free/css/all.css';
import "vue-toastification/dist/index.css";
Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use( Router );
Vue.use( Vuelidate );
Vue.use( Toast );

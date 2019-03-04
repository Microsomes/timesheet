import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false


export const bus = new Vue();

export const extraTimeDirectBus= new Vue();


import Nav from './components/siteStuff/nav';
import Footer from './components/siteStuff/footer';


import wysiwyg from "vue-wysiwyg";
Vue.use(wysiwyg, {
  image: {
    uploadURL: "https://socialstation.info/upload",
    dropzoneOptions: {}
  },
}); // config is optional. more below
import "vue-wysiwyg/dist/vueWysiwyg.css";

Vue.component('navigation',Nav);
//registered a component for global 
Vue.component('Footer',Footer);
//register a global footer for the footer
import {auth} from './components/siteStuff/database/db.js';

auth.onAuthStateChanged(data=>{
  new Vue({
    router,
    render: h => h(App)
  }).$mount('#app')
})

 

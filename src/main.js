import Vue from './js/directive'
import VueRouter from 'vue-router'
import ElementUi from 'element-ui'
import router from './js/router'
import App from './App.vue'

import 'element-ui/lib/theme-default/index.css'
import 'normalize.css/normalize.css'
import 'quill/dist/quill.snow.css'

Vue.config.debug = true;
Vue.use(VueRouter);
Vue.use(ElementUi);

const app = new Vue({
    router: router,
    render: h => h(App)
}).$mount('#app');


import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuehead from 'vue-head'
import store from "./store";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;

Vue.use(vuehead, {
  separator: '-',
  complement: "Link's Gallery"
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
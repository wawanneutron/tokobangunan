import { createApp } from "vue";
import App from "./App.vue";
import "@/scss/main.css";
import router from "./router";
import store from "./store";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const app = createApp(App);

app.use(router);
app.use(store);
app.use(VueSweetalert2);

// mixin for global function
app.mixin({
  methods: {
    //money thousands
    moneyFormat(value) {
      let val = (value / 1).toFixed(0).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },

    //calculate discount
    calculateDiscount(product) {
      return product.price - (product.price * product.discount) / 100;
    },

    // konversi dari gram ke kilogram
    calculateKilogram(product) {
      return product.weight / 1000;
    },
    // konversi dari gram ke kilogram
    calculateKilo(weight) {
      return weight / 1000;
    },
  },
});
app.mount("#app");

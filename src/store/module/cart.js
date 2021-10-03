import Api from "@/api/Api.js";

const cart = {
  namespaced: true,
  state: {
    cart: [],
    total: 0,
    beforeDiscount: 0,
    cartWeight: 0,
  },
  mutations: {
    GET_CART(state, cart) {
      state.cart = cart;
    },
    TOTAL_CART(state, total) {
      state.total = total;
    },
    CART_WEIGHT(state, cartWeight) {
      state.cartWeight = cartWeight;
    },
    BEFORE_DISCOUNT(state, beforeDiscount) {
      state.beforeDiscount = beforeDiscount;
    },
  },
  actions: {
    addToCart(
      { commit },
      { price, price_before, product_id, weight, quantity }
    ) {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));

      Api.defaults.headers.common["Authorization"] = "Bearer " + token;

      Api.post("/cart", {
        price: price,
        price_before: price_before,
        product_id: product_id,
        weight: weight,
        quantity: quantity,
        customer_id: user.id,
      })
        .then(() => {
          //   get data cart
          Api.get("/cart").then((response) => {
            commit("GET_CART", response.data.cart);
          });
          //   get total
          Api.get("/cart/total").then((response) => {
            commit("TOTAL_CART", response.data.total);
          });
          Api.get("/cart/before-discount").then((response) => {
            commit("BEFORE_DISCOUNT", response.data.total);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    cartCount({ commit }) {
      const token = localStorage.getItem("token");
      Api.defaults.headers.common["Authorization"] = "Bearer " + token;

      //   get total
      Api.get("/cart/total")
        .then((response) => {
          commit("TOTAL_CART", response.data.total);
        })
        .catch((error) => {
          console.log(error);
        });

      //   before discount
      Api.get("/cart/before-discount")
        .then((response) => {
          commit("BEFORE_DISCOUNT", response.data.total);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    cartTotal({ commit }) {
      const token = localStorage.getItem("token");
      Api.defaults.headers.common["Authorization"] = "Bearer " + token;

      Api.get("/cart")
        .then((response) => {
          commit("GET_CART", response.data.cart);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    removeCart({ commit }, cart_id) {
      const token = localStorage.getItem("token");
      Api.defaults.headers.common["Authorization"] = "Bearer " + token;

      Api.post("/cart/remove", {
        cart_id: cart_id,
      }).then(() => {
        // get cart
        Api.get("/cart").then((response) => {
          commit("GET_CART", response.data.cart);
        });
        //get total cart
        Api.get("/cart/total").then((response) => {
          commit("TOTAL_CART", response.data.total);
        });
        // get total weight
        Api.get("/cart/total-weight").then((response) => {
          commit("CART_WEIGHT", response.data.total);
        });
        // get before disc
        Api.get("/cart/before-discount").then((response) => {
          commit("BEFORE_DISCOUNT", response.data.total);
        });
      });
    },
    /* menghitung berat yang akan dibeli */
    cartWeight({ commit }) {
      const token = localStorage.getItem("token");
      Api.defaults.headers.common["Authorization"] = " Bearer" + token;
      Api.get("/cart/total-weight").then((response) => {
        commit("CART_WEIGHT", response.data.total);
      });
    },
  },
  getters: {
    getCart(state) {
      return state.cart;
    },
    getTotalCart(state) {
      return state.total;
    },
    getCartCount(state) {
      return state.cart.length;
    },
    getCarWeight(state) {
      return state.cartWeight;
    },
    getBeforeDiscount(state) {
      return state.beforeDiscount;
    },
  },
};

export default cart;

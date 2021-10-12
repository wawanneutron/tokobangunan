import Api from "@/api/Api.js";

const cart = {
  namespaced: true,
  state: {
    cart: [],
    total: 0,
    beforeDiscount: 0,
  },
  mutations: {
    GET_CART(state, cart) {
      state.cart = cart;
    },
    TOTAL_CART(state, total) {
      state.total = total;
    },
    BEFORE_DISCOUNT(state, beforeDiscount) {
      state.beforeDiscount = beforeDiscount;
    },
    CLEAR_CART(state) {
      (state.cart = []), (state.total = 0);
    },
  },
  actions: {
    addToCart({ commit }, { price, price_before, product_id, quantity }) {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));

      Api.defaults.headers.common["Authorization"] = "Bearer " + token;

      Api.post("/cart", {
        price: price,
        price_before: price_before,
        product_id: product_id,
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
          alert(error);
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
        // get before disc
        Api.get("/cart/before-discount").then((response) => {
          commit("BEFORE_DISCOUNT", response.data.total);
        });
      });
    },

    /* action checkout */
    checkout({ commit }, data) {
      // check auth
      const token = localStorage.getItem("token");
      Api.defaults.headers.common["Authorization"] = "Bearer " + token;

      return new Promise((resolve, reject) => {
        Api.post("/checkout", {
          name: data.name,
          phone: data.phone,
          province: data.province_id,
          city: data.city_id,
          address: data.address,
          note: data.note_pembelian,
          unit: data.unit,
          grand_total: data.grandTotal,
        })
          .then((response) => {
            resolve(response.data);

            // hapus semua data cart di databse
            Api.post("/cart/remove-all")
              .then(() => {
                //  kirim ke mutation
                commit("CLEAR_CART");
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((error) => {
            reject(error);
            alert(error + " server error ulangi lagi atau hubungi pihak toko");
          });
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
    getBeforeDiscount(state) {
      return state.beforeDiscount;
    },
  },
};

export default cart;

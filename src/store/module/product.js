import Api from "@/api/Api.js";

const product = {
  namespaced: true,

  state: {
    terlaris: [],
    homeProducts: [],
    allProducts: [],
    detailProduct: {},
    galleries: [],
    reviews: [],
  },
  mutations: {
    GET_TERLARIS(state, product) {
      state.terlaris = product;
    },
    GET_HOME_PRODUCTS(state, product) {
      state.homeProducts = product;
    },
    GET_PRODUCTS_ALL(state, data) {
      state.allProducts = data;
    },
    GET_DETAIL(state, product) {
      state.detailProduct = product;
    },
    GET_GALLERIES(state, data) {
      state.galleries = data;
    },
    GET_REVIEWS(state, review) {
      state.reviews = review;
    },
  },
  actions: {
    terlaris({ commit }) {
      Api.get("/products-terlaris")
        .then((response) => {
          commit("GET_TERLARIS", response.data.terlaris);
        })
        .catch((error) => {
          alert(error + " mohon untuk refresh website");
        });
    },
    homeProducts({ commit }) {
      Api.get("/products-home")
        .then((response) => {
          commit("GET_HOME_PRODUCTS", response.data.product);
        })
        .catch((error) => {
          alert(error + " mohon untuk refresh website");
        });
    },
    getProductsAll({ commit }) {
      Api.get("/products")
        .then((response) => {
          commit("GET_PRODUCTS_ALL", response.data.product);
        })
        .catch((error) => {
          alert(error + " mohon untuk refresh website");
        });
    },
    detailProduct({ commit }, slug) {
      Api.get(`/product/${slug}`)
        .then((response) => {
          commit("GET_DETAIL", response.data.product);
          commit("GET_GALLERIES", response.data.product.gallery);
          commit("GET_REVIEWS", response.data);
        })
        .catch((error) => {
          alert(error + " mohon untuk refresh website");
        });
    },
  },
  getters: {
    getTerlaris(state) {
      return state.terlaris;
    },
    getHomeProducts(state) {
      return state.homeProducts;
    },
    getAllProducts(state) {
      return state.allProducts;
    },
    getDetailProduct(state) {
      return state.detailProduct;
    },
    getGalleries(state) {
      return state.galleries;
    },
    getReviews(state) {
      return state.reviews;
    },
  },
};

export default product;

<template>
  <header class="section-header fixed-top">
    <section class="header-main" :class="{ 'navbar-hidden': !showNavbar }">
      <div class="container-fluid">
        <div class="row align-items-center">
          <div class="col-md-3 col-3">
            <router-link to="/" data-abc="true">
              <img
                src="https://www.mitraruma.com/_nuxt/img/Logo-Mitraruma.531cabd.svg"
                alt=""
                class="img-company"
              />
            </router-link>
          </div>
          <div class="col-md-5 d-none d-md-block">
            <div class="search-wrap">
              <div class="input-group">
                <input
                  type="text"
                  class="form-control form-search"
                  style="cursor: pointer"
                  readonly
                  placeholder="search"
                  aria-label="search"
                  @click="search"
                />
                <span class="input-group-text search-button" id="addon-wrapping"
                  ><i class="fa fa-search"></i
                ></span>
              </div>
            </div>
          </div>
          <div class="col-md-4 col-9">
            <div class="d-flex justify-content-end">
              <div class="cart-header">
                <router-link
                  :to="{ name: 'cart' }"
                  class="btn me-2 btn-cart position-relative"
                >
                  Rp. {{ moneyFormat(cartTotal) }}
                  <span
                    class="
                      position-absolute
                      top-0
                      start-100
                      translate-middle
                      badge
                      rounded-pill
                      bg-danger
                    "
                  >
                    <img src="@/assets/shopping_cart_white_18dp.svg" alt="" />
                    {{ cartCount }}
                  </span>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- sub navbar -->
    <nav class="navbar shadow navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid mt-1">
        <div class="row">
          <div class="col-2">
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon" style="font-size: 20px"></span>
            </button>
          </div>
          <div class="col-10 d-md-none">
            <div class="search-wrap">
              <div class="input-group">
                <input
                  type="text"
                  class="form-control form-search"
                  style="cursor: pointer"
                  readonly
                  placeholder="search"
                  aria-label="search"
                  @click="search"
                />
                <span class="input-group-text search-button" id="addon-wrapping"
                  ><i class="fa fa-search"></i
                ></span>
              </div>
            </div>
          </div>
        </div>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link
                :to="{ name: 'categories' }"
                class="nav-link"
                aria-current="page"
              >
                <i class="fa fa-shopping-bag"></i>
                semua kategori</router-link
              >
            </li>
            <li class="nav-item">
              <router-link
                :to="{ name: 'products' }"
                class="nav-link"
                aria-current="page"
              >
                <i class="fa fa-shopping-bag"></i>
                Semua Produk</router-link
              >
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#tentang">
                <i class="fa fa-info-circle"></i>Tentang</a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#kontak"
                ><i class="fa fa-comments"></i>Kontak</a
              >
            </li>
          </ul>
          <div class="account">
            <router-link
              v-if="!isLoggedIn"
              :to="{ name: 'login' }"
              class="btn btn-auth-two"
              ><i class="fas fa-sign-in-alt me-2"></i>Masuk</router-link
            >
            <router-link
              v-if="!isLoggedIn"
              :to="{ name: 'register' }"
              class="btn btn-auth ms-3"
              ><i class="fa fa-user-circle"></i> Registrasi</router-link
            >
            <router-link
              v-if="isLoggedIn"
              :to="{ name: 'dashboard' }"
              class="btn btn-auth-two"
              ><i class="fa fa-tachometer-alt"></i>Dashboard</router-link
            >
          </div>
        </div>
      </div>
    </nav>
  </header>
  <modal />
</template>

<script>
import { computed, onMounted } from "@vue/runtime-core";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const search = () => {
      router.push("/products");
      document.getElementById("app").scrollIntoView();
    };
    onMounted(() => {
      // check state token
      const token = store.state.auth.token;
      if (!token) {
        return;
      }
      // action
      store.dispatch("cart/cartCount");
      store.dispatch("cart/cartTotal");
    });

    const cartCount = computed(() => {
      return store.getters["cart/getCartCount"];
    });
    const cartTotal = computed(() => {
      return store.getters["cart/getTotalCart"];
    });
    const isLoggedIn = computed(() => {
      return store.getters["auth/isLoggedIn"];
    });

    return {
      cartCount,
      cartTotal,
      isLoggedIn,
      search,
    };
  },
  // navbar collapse
  data: () => ({
    showNavbar: true,
    lastScrollPosition: 0,
  }),
  mounted() {
    window.addEventListener("scroll", this.onScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.onScroll);
  },
  methods: {
    onScroll() {
      const currentScrollPosition =
        window.pageYOffset || document.documentElement.scrollTop;
      if (currentScrollPosition < 0) {
        return;
      }
      // Stop executing this function if the difference between
      // current scroll position and last scroll position is less than some offset
      if (Math.abs(currentScrollPosition - this.lastScrollPosition) < 80) {
        return;
      }
      this.showNavbar = currentScrollPosition < this.lastScrollPosition;
      this.lastScrollPosition = currentScrollPosition;
    },
  },
};
</script>


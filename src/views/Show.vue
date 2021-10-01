<template>
  <div class="container mt-5 mb-5">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item parent">
          <router-link to="/">Home</router-link>
        </li>
        <li class="breadcrumb-item parent">
          <router-link to="/products">Products</router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">
          Detail product
        </li>
      </ol>
    </nav>
    <div class="row show-product show-product mt-5">
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <!-- card header -->
            <transition
              v-if="gallery[photoActive]"
              name="slide-fade"
              mode="out-in"
            >
              <img
                :src="gallery[photoActive].image"
                class="img-store img-fluid w-100"
              />
            </transition>
            <!-- thumbnail -->
            <div class="row justify-content-center mt-3">
              <template v-for="(item, index) of gallery" :key="item.id">
                <div class="col-md-3 col-4 col-thumbnail">
                  <main @click="changeActive(index)">
                    <img
                      class="w-100 img-thumbnail float-left"
                      :src="item.image"
                      :class="{ active: index == this.photoActive }"
                    />
                  </main>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card border-0">
          <div class="card-body">
            <h1>{{ product.title }}</h1>
            <div class="rating-detail mt-2">
              <star-rating
                :show-rating="true"
                :star-size="23"
                :read-only="true"
                :increment="0.01"
                :rating="4.5"
              ></star-rating>
            </div>
            <div class="price-product mt-4" id="price-product">
              <strong class="font-weight-bold me-4"
                >Rp. {{ moneyFormat(calculateDiscount(product)) }}</strong
              >
              <span>/ Pc / Pcs</span>
              <div>
                <s class="font-weight-bold" style="font-size: 15px"
                  >Rp. {{ moneyFormat(product.price) }}</s
                >
              </div>
            </div>
            <hr />
            <table class="table table-hover mt-3">
              <tbody>
                <tr>
                  <td class="font-weight-bold">Diskon</td>
                  <td class="w-25">:</td>
                  <td>
                    <span>{{ product.discount }} % </span>
                  </td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Berat</td>
                  <td>:</td>
                  <td>
                    <span> {{ calculateKilogram(product) }} Kilogram</span>
                  </td>
                </tr>
                <tr>
                  <td class="font-weight-bold">stock tersedia</td>
                  <td>:</td>
                  <td>
                    <span> {{ product.stock }} stock</span>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="add-quantity mt-5">
              <div class="row justify-content-around">
                <div class="col-lg-5 col-md-6">
                  <label for="add-quantity"
                    ><strong>Qty (PC / Pcs)</strong></label
                  >
                  <div class="input-group mb-3 mt-3">
                    <button
                      @click="decrement"
                      class="input-group-text plus disabled"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      class="form-control"
                      placeholder="0"
                      aria-label="Amount (to the nearest dollar)"
                      v-model="state.qty"
                      @input="checkQty(state.qty)"
                    />
                    <button
                      @click="increment"
                      class="input-group-text disabled"
                    >
                      +
                    </button>
                  </div>
                  <div
                    v-if="state.qty > product.stock"
                    style="margin-top: -18px"
                  >
                    <span style="font-size: 12px; color: red; font-weight: bold"
                      >*kuantitas yang kamu masukan melebihi stock</span
                    >
                  </div>
                </div>
                <div class="col-lg-2 mt-5 text-center d-lg-block d-none">
                  <i style="font-size: 20px" class="fas fa-arrow-right"></i>
                </div>
                <div class="col-lg-2 mb-2 text-center d-lg-none d-sm-block">
                  <i style="font-size: 18px" class="fas fa-arrow-down"></i>
                </div>
                <div class="col-lg-5 col-md-6">
                  <label>
                    <strong>Subtotal (Rp)</strong>
                  </label>
                  <input
                    class="form-control mt-3"
                    type="text"
                    :value="
                      'Rp. ' +
                      moneyFormat(state.qty * calculateDiscount(product))
                    "
                    aria-label="Disabled input example"
                    disabled
                    readonly
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <!-- button add to cart  -->
              <div class="col-12" v-if="state.qty > product.stock">
                <button
                  class="
                    btn btn-auth
                    float-md-end
                    btn-lg btn-block
                    mt-4
                    disabled
                  "
                >
                  <img src="@/assets/shopping_cart_white_18dp.svg" alt="" />
                  Stock tidak cukup
                </button>
              </div>
              <div v-if="state.btnAddCart">
                <div class="col-12" v-if="state.qty > 0">
                  <button
                    @click="
                      addToCart(
                        state.qty * calculateDiscount(product),
                        product.id,
                        product.weight * state.qty
                      )
                    "
                    class="btn btn-auth float-md-end btn-lg btn-block mt-4"
                  >
                    <img src="@/assets/shopping_cart_white_18dp.svg" alt="" />
                    Masukan Ke Keranjang
                  </button>
                </div>
              </div>
              <div class="col-12" v-if="state.qty <= 0">
                <button
                  class="
                    btn btn-auth
                    float-md-end
                    btn-lg btn-block
                    mt-4
                    disabled
                  "
                >
                  <img src="@/assets/shopping_cart_white_18dp.svg" alt="" />
                  Masukan Ke Keranjang
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row show-product mt-5">
      <div class="col-md-12">
        <div class="card border-0 rounded shadow">
          <div class="card-body">
            <h3>Detail product</h3>
            <p v-html="product.content"></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { computed, onMounted, reactive } from "@vue/runtime-core";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import StarRating from "vue-star-rating";

export default {
  components: {
    StarRating,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    onMounted(() => {
      store.dispatch("product/detailProduct", route.params.slug);
    });

    const product = computed(() => {
      return store.getters["product/getDetailProduct"];
    });
    const gallery = computed(() => {
      return store.getters["product/getGalleries"];
    });

    const state = reactive({
      qty: "",
      subTotal: "",
      btnAddCart: true,
      btnMinus: true,
    });

    const addToCart = (price, id, weight) => {
      const token = store.state.auth.token;
      if (!token) {
        return router.push({ name: "login" });
      }
      console.log(price, id, weight, state.qty);
      store.dispatch("cart/addToCart", {
        price: price,
        product_id: id,
        weight: weight,
        quantity: state.qty,
      });
    };

    return {
      product,
      gallery,
      addToCart,
      state,
    };
  },
  data: () => ({
    photoActive: 0,
  }),
  methods: {
    changeActive(id) {
      this.photoActive = id;
    },
    checkQty(qty) {
      if (qty > this.product.stock) {
        console.log("stock hanya tersedia " + this.product.stock);
        this.state.btnAddCart = false;
      } else if (qty < this.product.stock) {
        this.state.btnAddCart = true;
      } else {
        console.log("stock ready ");
      }
    },
    /* incremnt decrement */
    increment() {
      this.state.qty++;
      this.state.btnAddCart = true;
      if (this.state.qty > this.product.stock) {
        this.state.btnAddCart = false;
      }
    },
    decrement() {
      if (this.state.qty === 0) {
        console.log("Negative quantity not allowed");
      } else {
        this.state.qty--;
        this.state.btnAddCart = true;
        if (this.state.qty > this.product.stock) {
          this.state.btnAddCart = false;
        }
      }
    },
  },
};
</script>
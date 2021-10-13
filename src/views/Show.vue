<template>
  <div class="container mb-5">
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
                :title="product.title"
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
                :star-size="25"
                :read-only="true"
                :increment="0.01"
                :rating="reviewsAvg"
              ></star-rating>
            </div>
            <div class="price-product mt-4" id="price-product">
              <strong class="font-weight-bold me-4"
                >Rp. {{ moneyFormat(calculateDiscount(product)) }}</strong
              >
              <span>/ {{ product.unit }} </span>
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
                  <td class="font-weight-bold">Unit</td>
                  <td>:</td>
                  <td>
                    <span> {{ product.unit }} </span>
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
                <div v-if="product.stock == 0">
                  <span style="font-size: 12px; color: red; font-weight: bold"
                    >*mohon maaf barang sedang kosong</span
                  >
                </div>
            <div class="add-quantity mt-5">
              <div class="row justify-content-around">
                <div class="col-lg-5 col-md-6">
                  <label for="add-quantity"
                    ><strong>Qty ( {{ product.unit }} )</strong></label
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
                        state.qty * product.price, //masukan harga sebelum dikon
                        product.id
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
  </div>
  <div class="container-fluid">
    <div class="show-product justify-content-around row mt-5">
      <div class="col-md-6">
        <div class="card border-0">
          <div class="card-body">
            <ul class="nav nav-tabs" id="myTab" role="tablist">
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link active"
                  id="detail-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#detail"
                  type="button"
                  role="tab"
                  aria-controls="detail"
                  aria-selected="true"
                >
                  Detail Produk
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link"
                  id="ulasan-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#ulasan"
                  type="button"
                  role="tab"
                  aria-controls="ulasan"
                  aria-selected="false"
                >
                  <star-rating
                    :show-rating="true"
                    :star-size="20"
                    :read-only="true"
                    :increment="0.01"
                    :rating="reviewsAvg"
                  ></star-rating>
                  <span
                    >( <b>{{ countReviews }}</b> ulasan)</span
                  >
                </button>
              </li>
            </ul>
            <div class="tab-content" id="myTabContent">
              <div
                class="tab-pane fade show active"
                id="detail"
                role="tabpanel"
                aria-labelledby="detail-tab"
              >
                <div
                  class="mt-4 content-description"
                  v-html="product.content"
                ></div>
              </div>
              <div
                class="tab-pane fade"
                id="ulasan"
                role="tabpanel"
                aria-labelledby="ulasan-tab"
                v-if="reviews !== null"
              >
                <div class="ulasan mt-5">
                  <ul class="list-unstyled">
                    <div
                      class="card card-body mt-5"
                      v-for="data in reviews"
                      :key="data.id"
                    >
                      <li class="media">
                        <img
                          :src="`https://ui-avatars.com/api/?name=${data.customer.name}&background=f7e5e5&color=eb0000`"
                          class="mr-3 rounded-circle"
                          width="50"
                          alt="profile"
                        />
                        <div class="media-body">
                          <star-rating
                            :show-rating="false"
                            :star-size="19"
                            :read-only="true"
                            :increment="0.01"
                            :rating="data.rating"
                          ></star-rating>
                          <h5 class="mt-0 mb-1">{{ data.customer.name }}</h5>
                          <p>{{ data.review }}</p>
                        </div>
                      </li>
                    </div>
                    <!-- jika tidak ada ulasan -->
                    <div class="mt-5" v-if="reviews == 0">
                      <li class="media">
                        <div class="media-body">
                          <div class="alert alert-info">Belum ada ulasan</div>
                        </div>
                      </li>
                    </div>
                  </ul>
                </div>
              </div>
              <div
                class="tab-pane fade"
                id="ulasan"
                role="tabpanel"
                aria-labelledby="ulasan-tab"
                v-if="reviews == null"
              >
                <div class="ulasan mt-5">
                  <ul class="list-unstyled">
                    <div class="card card-body mt-5">
                      <li class="media">
                        <div class="media-body">
                          <div class="alert alert-info">Belum ada ulasan</div>
                        </div>
                      </li>
                    </div>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-5 mt-4">
        <div class="text-info">Term of Service</div>
        <div class="accordion mt-3" id="accordionExample">
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne">
              <button
                class="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                Jam Operasional
              </button>
            </h2>
            <div
              id="collapseOne"
              class="accordion-collapse collapse show"
              aria-labelledby="headingOne"
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body">
                Bertransaksi bisa kapan saja di toko online kami, akan tetapi
                kami memproses pesanan yang masuk sesuai jam kerja kami yaitu
                senin s/d sabtu jam 07.00 s/d 17.00, pesanan yang lewat jam
                kerja akan di proses keesokan harinya
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingTwo">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                Ketersediaan Barang
              </button>
            </h2>
            <div
              id="collapseTwo"
              class="accordion-collapse collapse"
              aria-labelledby="headingTwo"
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body">
                dalam melakukan transaksi harap menghubungi admin melalui fitur
                chat, agar memastikan barang benar benar ready stock
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingThree">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseThree"
                aria-expanded="false"
                aria-controls="collapseThree"
              >
                Pereturan Barang
              </button>
            </h2>
            <div
              id="collapseThree"
              class="accordion-collapse collapse"
              aria-labelledby="headingThree"
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body">
                Aturan pereturan barang. Jika barang yang diterima tidak sesuai,
                kamu bisa mengajukan penggantian barang baru yang sesuai dengan
                pesanan caranya: Kamu lampiran bukti pembelian atau invoice
                melalui chat whatsapp yang tertera di website
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingFour">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#colapseFour"
                aria-expanded="false"
                aria-controls="colapseFour"
              >
                Kebijakan Pembayaran
              </button>
            </h2>
            <div
              id="colapseFour"
              class="accordion-collapse collapse"
              aria-labelledby="headingFour"
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body">
                Untuk memberikan kemudahan dan kepastian bagi pelanggan dalam
                melakukan transaksi, pembayaran di wajibkan melalui bank
                transfer virtual account, saat ini kami mengimplementasikan
                sistem pembayaran online melalui Midtrans.com. Metode pembayaran
                yang disediakan adalah card payment, bank transfer, direct
                debit, e-wallet, over the counter, dan lain-lain. Semua
                transaksi akan diproses dalam mata uang Rupiah Indonesia.
                Midtrans memastikan proses pembayaran order Anda aman dengan
                protokol Secure Sockets Layer (SSL). SSL menyediakan keamanan
                penuh bagi setiap pelanggan dan kebebasan untuk berbelanja
                online tanpa rasa khawatir mengenai kemungkinan pencurian
                informasi kartu kredit. Pembayaran hanya dapat dilakukan
                menggunakan jasa layanan kami, yaitu menggunakan virtual account
                yang sudah disediakan oleh sistem, melalui Midtrans pihak toko
                tidak bertransaksi selain menggunanakan diluar penyedia layanan
                yang sudah disediakan oleh sistem
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { computed, inject, onMounted, reactive } from "@vue/runtime-core";
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
    const swal = inject("$swal");

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

    const addToCart = (price, price_before, id) => {
      const token = store.state.auth.token;
      if (!token) {
        return router.push({ name: "login" });
      }
      store.dispatch("cart/addToCart", {
        price: price,
        price_before: price_before,
        product_id: id,
        quantity: state.qty,
      });
      swal({
        icon: "success",
        title: "Yeay...",
        text: "Barang berhasil ditambahkan ke keranjang",
        showConfirmButton: false,
        timer: 2000,
      });
    };

    /* reviews customer */
    const reviews = computed(() => {
      return store.getters["product/getReviews"].reviews;
    });
    const countReviews = computed(() => {
      return store.getters["product/getReviews"].reviews_count;
    });
    const reviewsAvg = computed(() => {
      return store.getters["product/getReviews"].reviews_avg_rating;
    });

    return {
      product,
      gallery,
      addToCart,
      state,
      reviews,
      countReviews,
      reviewsAvg,
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
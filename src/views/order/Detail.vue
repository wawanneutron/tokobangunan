<template>
  <div class="container-fluid">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item parent">
          <router-link to="/">Home</router-link>
        </li>
        <li class="breadcrumb-item parent">
          <router-link :to="{ name: 'order' }">History</router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">Detail Order</li>
      </ol>
    </nav>
    <div class="row">
      <div class="col-md-3">
        <customer-menu />
      </div>
      <div class="col-md-9 detail-order">
        <div class="card card-dashboard border-top-orange border-0 shadow">
          <div class="card-body">
            <div class="title">
              <i class="fa fa-shopping-cart"></i>
              Detail Order
            </div>
            <hr />
            <div class="table-responsive">
              <table class="table table-hover">
                <tr>
                  <td class="w-25">No Invoice</td>
                  <td width="50">:</td>
                  <td>{{ detailOrder.invoice }}</td>
                </tr>
                <tr>
                  <td>Nama Lengkap</td>
                  <td>:</td>
                  <td>{{ detailOrder.name }}</td>
                </tr>
                <tr>
                  <td>No. Telp / WA</td>
                  <td>:</td>
                  <td>
                    {{ detailOrder.phone }}
                  </td>
                </tr>
                <tr>
                  <td>Alamat Lengkap</td>
                  <td>:</td>
                  <td>{{ detailOrder.address }}</td>
                </tr>
                <tr>
                  <td>Total pembelian</td>
                  <td>:</td>
                  <td>Rp. {{ moneyFormat(detailOrder.grand_total) }}</td>
                </tr>
                <tr>
                  <td>Catatan pembeli</td>
                  <td>:</td>
                  <td>{{ detailOrder.note }}</td>
                </tr>
                <tr>
                  <td>Status</td>
                  <td>:</td>
                  <td>
                    <div v-if="detailOrder.status == 'pending'">
                      <button
                        @click="payment(detailOrder.snap_token)"
                        class="btn btn-auth"
                      >
                        BAYAR SEKARANG
                      </button>
                      <div class="alert alert-warning mt-4">
                        Verifikasi dilakukan secara otomatis
                      </div>
                      <div class="alert alert-info mt-3">
                        Status pembayan anda <b>{{ detailOrder.status }}</b>
                        <br />
                        Silahkan melakukan pembayaran dengan
                        <strong>meng-klik tombol berwarna merah</strong> "Bayar
                        Sekarang"
                      </div>
                    </div>
                    <!-- pembayaran terverifikasi -->
                    <div v-else-if="detailOrder.status == 'payment-success'">
                      <button
                        @click="payment(detailOrder.snap_token)"
                        class="btn btn-success"
                      >
                        {{ detailOrder.status }}
                      </button>
                      <div class="alert alert-success mt-3">
                        Pembayaran Terverifikasi <br />
                        Barang akan di proses secepat mungkin
                      </div>
                    </div>

                    <!-- order success -->
                    <div v-else-if="detailOrder.status == 'success'">
                      <button class="btn btn-success">
                        {{ detailOrder.status }}
                      </button>
                      <div class="alert alert-success mt-3">
                        Pembelian telah selesai <br />
                        Terimakasih sudah berbelanja di Toko Online kami <br />
                        Silahkan berikan ulasan anda
                      </div>
                    </div>

                    <div v-else-if="detailOrder.status == 'process'">
                      <button
                        @click="payment(detailOrder.snap_token)"
                        class="btn btn-warning"
                      >
                        {{ detailOrder.status }}
                      </button>
                      <div class="alert alert-warning mt-3">
                        Barang sedang diproses. <br />
                      </div>
                    </div>

                    <div v-else-if="detailOrder.status == 'shipping'">
                      <button
                        @click="payment(detailOrder.snap_token)"
                        class="btn btn-secondary"
                      >
                        {{ detailOrder.status }}
                      </button>
                      <div class="alert alert-warning mt-3">
                        Kami telah mengirim kealamat tujuan anda
                      </div>
                    </div>

                    <button
                      @click="payment(detailOrder.snap_token)"
                      v-else-if="detailOrder.status == 'expired'"
                      class="btn btn-warning"
                    >
                      {{ detailOrder.status }}
                    </button>
                    <button
                      @click="payment(detailOrder.snap_token)"
                      v-else-if="detailOrder.status == 'failed'"
                      class="btn btn-danger"
                    >
                      {{ detailOrder.status }}
                    </button>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <div class="card border-0 rounded shadow mt-4">
          <div class="card-body">
            <h5 class="title">
              <i class="fas fa-shopping-cart me-2"></i>Detail Order
            </h5>
            <hr />
            <div class="table-responsive">
              <table class="table">
                <tbody>
                  <tr v-for="product in productInOrder" :key="product.id">
                    <td class="b-none" width="25%">
                      <div class="wrapper-image-cart">
                        <img :src="product.product.gallery[0].image" />
                      </div>
                    </td>
                    <td class="b-none" width="50%">
                      <div class="title">{{ product.product_name }}</div>
                      <table class="table-borderless" style="font-size: 14px">
                        <tr>
                          <td style="padding: 0.2rem">QTY</td>
                          <td style="padding: 0.2rem">:</td>
                          <td style="padding: 0.2rem">
                            <b>{{ product.qty }}</b>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 0.2rem">Unit / Satuan</td>
                          <td style="padding: 0.2rem">:</td>
                          <td style="padding: 0.2rem">
                            <b>{{ product.unit }}</b>
                          </td>
                        </tr>
                      </table>
                      <div
                        @click="
                          (stateReview.order_id = product.id) &&
                            (stateReview.product_id = product.product_id)
                        "
                        @click.prevent="cekOrderId"
                        class="btn btn-auth-two mt-4"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        data-bs-whatever="@getbootstrap"
                        v-if="detailOrder.status == 'success'"
                      >
                        Berikan Ulasan
                      </div>
                    </td>
                    <td class="b-none text-right">
                      <p class="m-0 font-weight-bold">
                        Rp. {{ moneyFormat(product.price) }}
                      </p>
                    </td>
                    <!-- modal review -->
                    <div
                      class="modal fade"
                      id="exampleModal"
                      tabindex="-1"
                      data-bs-backdrop="static"
                      data-bs-keyboard="false"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">
                              Ulasan Produk
                            </h5>
                            <button
                              type="button"
                              class="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <!-- handle inputan -->
                          <div class="modal-body">
                            <div class="row justify-content-center">
                              <div class="col-12 col-md-6">
                                <star-rating
                                  :star-size="50"
                                  :show-rating="false"
                                  :increment="0.5"
                                  v-model:rating="stateReview.rating"
                                >
                                </star-rating>
                              </div>
                            </div>
                            <div class="form-group mt-5">
                              <label class="font-weight-bold" for="ulasan"
                                >Tulis Ulasan</label
                              >
                              <textarea
                                id="ulasan"
                                rows="3"
                                placeholder="Masukkan Ulasan Produk"
                                class="form-control"
                                spellcheck="false"
                                v-model="stateReview.reviewCustomer"
                              ></textarea>
                              <!-- <div class="alert alert-danger" v-if="validation">
                              {{ validation.value }}
                            </div> -->
                            </div>
                          </div>
                          <div class="modal-footer">
                            <button
                              type="button"
                              class="btn btn-secondary"
                              data-bs-dismiss="modal"
                            >
                              Close
                            </button>
                            <div
                              v-if="
                                stateReview.buttonKirim ||
                                submitReview.length > 0
                              "
                            >
                              <button
                                @click.prevent="submitReview"
                                class="btn btn-primary"
                              >
                                Kirim
                              </button>
                            </div>
                            <div v-else>
                              <div v-if="stateReview.buttonLoading">
                                <button class="btn btn-primary">
                                  <i class="fa fa-spinner fa-spin"></i>Loading
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CustomerMenu from "@/components/dashboard/Menu.vue";
import { useStore } from "vuex";
import { computed, onMounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";

import StarRating from "vue-star-rating";
import Api from "../../api/Api";

export default {
  components: {
    CustomerMenu,
    StarRating,
  },
  setup() {
    // store vuex
    const store = useStore();
    // route & router vue router
    const route = useRoute();
    const router = useRouter();

    // mounted
    onMounted(() => {
      // panggil action detailOrder didalam module order di vuex
      store.dispatch("order/detailOrder", route.params.snap_token);
    });

    // computed
    const detailOrder = computed(() => {
      // panggil getter dengan nama detailOrder didalam module order di vuex
      return store.getters["order/detailOrder"];
    });

    const productInOrder = computed(() => {
      // panggil getter dengan nama productInOrder didalam module order di vuex
      return store.getters["order/productInOrder"];
    });

    // function payment Midtrans
    function payment(snap_token) {
      window.snap.pay(snap_token, {
        onSuccess: function () {
          router.push({
            name: "detail_order",
            params: { snap_token: snap_token },
          });
        },
        onPending: function () {
          router.push({
            name: "detail_order",
            params: { snap_token: snap_token },
          });
        },
        onError: function () {
          router.push({
            name: "detail_order",
            params: { snap_token: snap_token },
          });
        },
      });
    }

    let stateReview = reactive({
      order_id: "",
      product_id: "",
      rating: "",
      reviewCustomer: "",
      status: [],
      buttonKirim: false,
      buttonLoading: false,
    });

    return {
      store,
      route,
      router,
      detailOrder,
      productInOrder,
      payment,
      stateReview,
    };
  },
  methods: {
    // fungsi untuk mengecek length review
    cekOrderId() {
      this.stateReview.buttonKirim = true;
      /* rating atau reaview product oleh customer */
      // get data token dan user
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));

      Api.defaults.headers.common["Authorization"] = "Bearer " + token;
      let orderId = this.stateReview.order_id;
      // kirim ke server untuk di cek
      Api.post("/reviewcek", {
        order_id: orderId,
        user_id: user.id,
      })
        .then((response) => {
          this.stateReview.status = response.data.review;
          console.log(this.stateReview.status);
          // cek jika array belum ada isi nya
          if (this.stateReview.status.length == 0) {
            this.$swal("silahkan isi ulasan anda");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    // fungsi untuk menambahkan review / ulasan dan rating
    submitReview() {
      this.stateReview.buttonKirim = false;
      this.stateReview.buttonLoading = true;
      /* rating atau reaview product oleh customer */
      // get data token dan user
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));

      Api.defaults.headers.common["Authorization"] = "Bearer " + token;
      let orderId = this.stateReview.order_id;
      let productId = this.stateReview.product_id;
      let rating = this.stateReview.rating;
      let review = this.stateReview.reviewCustomer;
      // cek apakah data ada ?
      if (this.stateReview.status.length <= 0) {
        Api.post("/review", {
          customer_id: user.id,
          order_id: orderId,
          product_id: productId,
          rating: rating,
          review: review,
        })
          .then(() => {
            this.$swal({
              icon: "success",
              title: "Yeay...",
              text: "Terimakasih sudah memebrikan ulasan",
            });
            // hapus data di form
            this.stateReview.rating = "";
            this.stateReview.reviewCustomer = "";
            this.stateReview.buttonKirim = true;
            this.stateReview.buttonLoading = false;
            // cek lagi isi reviewnya
            Api.post("/reviewcek", {
              order_id: orderId,
              user_id: user.id,
            })
              .then((response) => {
                this.stateReview.status = response.data.review;
                console.log(this.stateReview.status);
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch(() => {
            // hapus data di form
            this.stateReview.rating = "";
            this.stateReview.reviewCustomer = "";
            this.stateReview.buttonLoading = false;
            this.stateReview.buttonKirim = true;

            this.$swal({
              icon: "error",
              title: "Oops...",
              text: "Harap diisi dengan lengkap",
            });
          });
      } else {
        // Use sweetalert2
        this.$swal({
          icon: "error",
          title: "Oops...",
          text: "Anda sudah memberikan ulasan",
        });
        this.stateReview.buttonLoading = false;
        // hapus data di form
        this.stateReview.rating = "";
        this.stateReview.reviewCustomer = "";
      }

      console.log(this.stateReview.reviewCustomer);
      console.log(this.stateReview.rating);
      console.log(this.stateReview.order_id);
      console.log(this.stateReview.product_id);
    },
  },
};
</script>
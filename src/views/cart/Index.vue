<template>
  <div class="container chart-product mb-5">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item parent">
          <router-link to="/">Home</router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">
          Keranjang belanja
        </li>
      </ol>
    </nav>
    <div class="row d-flex justify-content-around" v-if="carts.length > 0">
      <div class="col-md-8">
        <h2>
          <img src="@/assets/shopping_cart_black_18dp.svg" width="30" alt="" />
          Keranjang Belanja Saya
        </h2>
        <div class="card-chart card border-0">
          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Produk</th>
                    <th scope="col"></th>
                    <th scope="col">Subtotal</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  <template v-for="cart of carts" :key="cart.id">
                    <tr>
                      <td>
                        <img
                          :src="cart.product.gallery[0].image"
                          style="width: 100px; border-radius: 0.5rem"
                          :title="cart.product.title"
                        />
                      </td>
                      <td>
                        <div class="title">{{ cart.product.title }}</div>
                        <div class="qty mt-2">Qty: {{ cart.quantity }}</div>
                        <div class="qty mt-2">
                          Unit: {{ cart.product.unit }}
                        </div>
                        <div class="price mt-3">
                          Rp. {{ moneyFormat(calculateDiscount(cart.product)) }}
                        </div>
                        <div
                          class="m-0 diskon"
                          v-if="cart.product.discount != null"
                        >
                          <s>
                            Rp.
                            {{ moneyFormat(cart.product.price) }}</s
                          >
                        </div>
                      </td>
                      <td>
                        <div class="price">
                          Rp. {{ moneyFormat(cart.price) }}
                        </div>
                      </td>
                      <td>
                        <div>
                          <button
                            @click.prevent="removeCart(cart.id)"
                            class="btn btn-sm btn-trash"
                          >
                            <i class="fa fa-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  </template>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card card-detail mb-3">
          <div class="card-header">Jumlah Pesanan</div>
          <div class="card-body">
            <h5 class="card-title">{{ getCartCount }} Produk (s)</h5>
            <div class="card-informations">
              <tr class="row">
                <th class="harga-asli col-6">Harga asli</th>
                <td class="col-6 text-end harga">
                  Rp. {{ moneyFormat(beforeDisc) }}
                </td>
              </tr>
              <tr class="row" v-if="beforeDisc === total">
                <th class="harga-stelah-diskon col-6">Harga setelah diskon</th>
                <td class="col-6 text-end harga">Rp. 0</td>
              </tr>
              <tr class="row" v-else>
                <th class="harga-stelah-diskon col-6">Harga setelah diskon</th>
                <td class="col-6 text-end harga">
                  Rp. {{ moneyFormat(total) }}
                </td>
              </tr>
              <tr class="row">
                <th class="harga-stelah-diskon col-6">Hemat</th>
                <td class="col-6 text-end harga">
                  Rp. {{ moneyFormat(beforeDisc - total) }}
                </td>
              </tr>
            </div>
            <hr />
            <tr class="total row">
              <th class="total col-4">Total:</th>
              <td class="col-8 text-end">Rp. {{ moneyFormat(total) }}</td>
            </tr>
            <i>*sudah termasuk pajak</i>
          </div>
          <div v-if="state.buttonCheckout || checkout.length > 0">
            <a
              @click.prevent="checkout"
              class="btn btn-auth btn-pembayaran text-uppercase btn-lg d-grid"
              >lanjutkan ke pembayaran</a
            >
          </div>
          <div v-else>
            <a
              v-if="state.buttonLoading"
              class="btn btn-auth btn-pembayaran text-uppercase btn-lg d-grid"
              type="button"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="sedang diproses"
            >
              <span>Loading <i class="fa fa-spinner fa-spin ms-2"></i></span>
            </a>
          </div>

          <a
            v-if="state.btnChackoutDisabled"
            class="btn btn-auth btn-pembayaran text-uppercase btn-lg d-grid"
            type="button"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="harap isi form pengiriman"
            disabled="true"
          >
            lanjutkan ke pembayaran
          </a>
        </div>
      </div>
    </div>
    <div class="row" v-else>
      <div class="cart-empety">
        <img src="@/assets/remove_shopping_cart_black_48dp.svg" alt="" />
        <div class="title">Keranjang Anda Kosong!</div>
        <router-link :to="{ name: 'products' }" class="btn btn-auth"
          >Lanjutkan Belanja</router-link
        >
      </div>
    </div>
    <div class="row" v-if="carts.length > 0">
      <div class="col-md-12 rincian-pengiriman">
        <div class="accordion" id="accordionExample">
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
                <h2>
                  <i class="fa fa-user circle me-2"></i>Rincian Pengiriman
                </h2>
              </button>
            </h2>
            <div
              id="collapseOne"
              class="accordion-collapse collapse show"
              aria-labelledby="headingOne"
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body">
                <svg xmlns="http://www.w3.org/2000/svg" style="display: none">
                  <symbol
                    id="check-circle-fill"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"
                    />
                  </symbol>
                  <symbol
                    id="info-fill"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"
                    />
                  </symbol>
                  <symbol
                    id="exclamation-triangle-fill"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
                    />
                  </symbol>
                </svg>
                <div
                  class="
                    alert alert-warning
                    d-flex
                    align-items-center
                    alert-dismissible
                    fade
                    show
                  "
                  role="alert"
                >
                  <svg
                    class="bi flex-shrink-0 me-2"
                    width="24"
                    height="24"
                    role="img"
                    aria-label="Warning:"
                  >
                    <use xlink:href="#exclamation-triangle-fill" />
                  </svg>
                  <div>Harap mengisi form pengiriman dengan lengkap</div>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="name" class="font-weight-bold"
                        >Nama Lengkap</label
                      >
                      <input
                        type="text"
                        id="nama_lengkap"
                        class="form-control"
                        placeholder="Nama lengkap"
                        v-model="state.name"
                      />
                      <div v-if="validation.name">
                        <div class="alert alert-danger mt-1">
                          Harap mengisi nama lengkap pengirim
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="phone_number" class="font-weight-bold"
                        >No. Hp / Whatsapp</label
                      >
                      <input
                        type="number"
                        id="phone_number"
                        class="form-control"
                        placeholder="No. Hp / Whatsapp"
                        v-model="state.phone"
                      />
                      <div v-if="validation.phone">
                        <div class="alert alert-danger mt-1">
                          Harap mengisi no hp/whatsapp
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="province" class="font-weight-bold"
                        >Provinsi</label
                      >
                      <select
                        class="form-control"
                        id="province"
                        v-model="state.provinsi_id"
                        @change="getCities"
                      >
                        <option value="">-- pilih provinsi --</option>
                        <template
                          v-for="provinsi of state.provinces"
                          :key="provinsi.id"
                        >
                          <option :value="provinsi.province_id">
                            {{ provinsi.name }}
                          </option>
                        </template>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="city" class="font-weight-bold"
                        >Kota / kabupaten</label
                      >
                      <select
                        class="form-control"
                        id="city"
                        v-model="state.city_id"
                      >
                        <option value="">-- pilih kota --</option>
                        <template v-for="city of state.cities" :key="city.id">
                          <option :value="city.city_id">
                            {{ city.name }}
                          </option>
                        </template>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label class="font-weight-bold" id="alamat"
                        >Alamat Lengkap</label
                      >
                      <textarea
                        class="form-control"
                        id="alamat"
                        rows="3"
                        placeholder="Alamat Lengkap&#10;&#10;Contoh: Perum Badak Triraksa - Tigaraksa Kab. Tangerang"
                        v-model="state.address"
                      ></textarea>
                      <div v-if="validation.address">
                        <div class="alert alert-danger mt-1">
                          Harap mengisi alamat dengan lengkap
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label class="font-weight-bold" id="note"
                        >Catatan pembelian</label
                      >
                      <textarea
                        class="form-control"
                        id="note"
                        rows="3"
                        placeholder="contoh: paku ukuran 7cm, besi holo 3 meter"
                        v-model="state.note"
                      ></textarea>
                      <div v-if="validation.note">
                        <div class="alert alert-danger mt-1">
                          Harap mengisi catatan pembelian
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
                <h2><i class="fas fa-truck me-2"></i>Geratis Pengiriman</h2>
              </button>
            </h2>
            <div
              id="collapseTwo"
              class="accordion-collapse collapse"
              aria-labelledby="headingTwo"
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body">
                <p>
                  Kami memberikan pelayanan <strong>gratis pengiriman</strong> ,
                  ini sebagai service kami kepada custommer, barang akan dikirim
                  menggunakan jasa truk exspedisi kami.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from "@vue/reactivity";
import { useStore } from "vuex";
import Api from "@/api/Api.js";
import { inject, onMounted } from "@vue/runtime-core";
import { useRouter } from "vue-router";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const swal = inject("$swal");

    // getBeforeDiscount
    const beforeDisc = computed(() => {
      return store.getters["cart/getBeforeDiscount"];
    });

    const getCartCount = computed(() => {
      return store.getters["cart/getCartCount"];
    });
    // data cart
    const carts = computed(() => {
      return store.getters["cart/getCart"];
    });

    const total = computed(() => {
      return store.getters["cart/getTotalCart"];
    });
    const removeCart = (cart_id) => {
      state.ongkir = 0;
      state.grandTotal = "";
      swal({
        title: "yakin ingin menghapus?",
        text: "setelah menghapus anda tetap bisa memasukan barang ke keranjang",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#eb0000",
        cancelButtonColor: "#7686ab",
        confirmButtonText: "Ya, hapus!",
        cancelButtonText: "Batal",
      }).then((result) => {
        if (result.isConfirmed) {
          store.dispatch("cart/removeCart", cart_id);
          swal({
            title: "Deleted!",
            text: "barang di keranjang anda berhasil dihapus",
            icon: "success",
          });
        }
      });
    };
    /* state manajemen*/
    const state = reactive({
      name: "",
      phone: "",
      address: "",
      note: "",
      provinces: [],
      provinsi_id: "",
      cities: [],
      btnChackoutDisabled: false,
      buttonCheckout: true,
      buttonLoading: false,
    });
    /* provinsi */
    const getProvinces = onMounted(() => {
      Api.get("/origin/provinces")
        .then((response) => {
          state.provinces = response.data.data;
        })
        .catch((error) => {
          alert(error + " silahkan ulangi lagi");
        });
    });
    /* kota kabupaten */
    const getCities = () => {
      Api.get("/origin/cities", {
        params: {
          province_id: state.provinsi_id,
        },
      })
        .then((response) => {
          state.cities = response.data.data;
        })
        .catch((error) => {
          alert(error + " silahkan ulangi lagi");
        });
    };
    /* state validations */
    const validation = reactive({
      name: false,
      phone: false,
      address: false,
      note: false,
    });
    /* checkout */
    const checkout = () => {
      // check apakah ada nama, phone, address, dan berat product
      if (
        state.name &&
        state.phone &&
        state.address &&
        state.note &&
        state.provinsi_id &&
        state.city_id
      ) {
        state.buttonLoading = true;
        state.buttonCheckout = false;

        // define variable
        let data = {
          name: state.name,
          phone: state.phone,
          province_id: state.provinsi_id,
          city_id: state.city_id,
          address: state.address,
          note_pembelian: state.note,
          grandTotal: total.value,
        };
        console.log(data);
        store
          .dispatch("cart/checkout", data)
          .then((response) => {
            // jika berhasil, arahkan kedetail order dengan parameter snap_token midtrans
            router.push({
              name: "detail_order",
              params: {
                snap_token: response[0].snap_token,
              },
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }

      /* 
      check validasi 
      jika state tidak ada isinya validasi bernilai true*/
      if (!state.name) {
        validation.name = true;
        swal({
          icon: "error",
          title: "Oops...",
          text: "form pengiriman harus terisi dengan lengkap",
        });
      }
      if (!state.phone) {
        validation.phone = true;
        swal({
          icon: "error",
          title: "Oops...",
          text: "form pengiriman harus terisi dengan lengkap",
        });
      }
      if (!state.address) {
        validation.address = true;
        swal({
          icon: "error",
          title: "Oops...",
          text: "form pengiriman harus terisi dengan lengkap",
        });
      }
      if (!state.note) {
        validation.note = true;
        swal({
          icon: "error",
          title: "Oops...",
          text: "form pengiriman harus terisi dengan lengkap",
        });
      }
      if (!state.provinsi_id) {
        swal({
          icon: "error",
          title: "Oops...",
          text: "anda belum memilih provinsi tujuan",
        });
      }
      if (!state.city_id) {
        swal({
          icon: "error",
          title: "Oops...",
          text: "anda belum memilih kota tujuan",
        });
      }
    };

    return {
      carts,
      total,
      removeCart,
      state,
      getProvinces,
      getCities,
      checkout,
      getCartCount,
      beforeDisc,
      validation,
    };
  },
};
</script>
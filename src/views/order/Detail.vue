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
      <div class="col-md-9">
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
                  <td>No Invoice</td>
                  <td>:</td>
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
                  <td>KURIR / SERVICE / COST</td>
                  <td>:</td>
                  <td>
                    {{ detailOrder.courier }} / {{ detailOrder.service }} / Rp.
                    {{ detailOrder.cost_courier }}
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
                  <td>Rp. {{ detailOrder.grand_total }}</td>
                </tr>
                <tr>
                  <td>Status</td>
                  <td>:</td>
                  <td>
                    <div v-if="detailOrder.status == 'pending'">
                      <button
                        @click="payment(detailOrder.snap_token)"
                        class="btn btn-primary"
                      >
                        BAYAR SEKARANG
                      </button>
                      <div class="alert alert-warning mt-2">
                        Verifikasi dilakukan secara otomatis
                      </div>
                      <div class="alert alert-info mt-3">
                        Status pembayan anda <b>{{ detailOrder.status }}</b>
                        <br />
                        Silahkan melakukan pembayaran sekarang
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
                      <button
                        @click="payment(detailOrder.snap_token)"
                        class="btn btn-success"
                      >
                        {{ detailOrder.status }}
                      </button>
                      <div class="alert alert-success mt-3">
                        Pembelian telah selesai <br />
                        Terimakasih sudah berbelanja di Toko Online kami
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
                        Kami akan segera mengirim no resi
                      </div>
                    </div>

                    <div v-else-if="detailOrder.status == 'shipping'">
                      <button
                        @click="payment(detailOrder.snap_token)"
                        class="btn btn-info"
                      >
                        {{ detailOrder.status }}
                      </button>
                      <div class="alert alert-warning mt-3">
                        Silahkan check nomor resi. <br />
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
        <div
          class="
            card card-dashboard
            border-top-orange border-0
            rounded
            shadow
            mt-4
          "
        >
          <div class="card-body">
            <div class="title">
              <i class="fa fa-shopping-cart"></i>
              Item Order
            </div>
            <hr />
            <table
              class="table"
              style="
                border-style: solid !important;
                border-color: rgb(198, 206, 214) !important;
              "
            >
              <tbody>
                <tr
                  v-for="product in productInOrder"
                  :key="product.id"
                  style="background: #edf2f7"
                >
                  <td class="b-none" width="25%">
                    <div class="wrapper-image-cart">
                      <img
                        :src="product.product.gallery[0].image"
                        style="width: 100%; border-radius: 0.5rem"
                      />
                    </div>
                  </td>
                  <td class="b-none" width="50%">
                    <h5>
                      <b>{{ product.product_name }}</b>
                    </h5>
                    <table class="table-borderless" style="font-size: 14px">
                      <tr>
                        <td style="padding: 0.2rem">QTY</td>
                        <td style="padding: 0.2rem">:</td>
                        <td style="padding: 0.2rem">
                          <b>{{ product.qty }}</b>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td class="b-none text-right">
                    <p class="m-0 font-weight-bold">
                      Rp. {{ moneyFormat(product.price) }}
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CustomerMenu from "@/components/dashboard/Menu.vue";
import { useStore } from "vuex";
import { computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

export default {
  components: {
    CustomerMenu,
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

    return {
      store,
      route,
      router,
      detailOrder,
      productInOrder,
      payment,
    };
  },
};
</script>
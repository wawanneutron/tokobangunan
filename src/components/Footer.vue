<template>
  <footer id="kontak">
    <hr />
    <div class="container">
      <div class="row justify-content-between">
        <div class="col-md-3 mb-4">
          <h4 class="font-weight-bold">Kategori Produk</h4>
          <div class="content">
            <div class="title" v-for="item of categories" :key="item.id">
              <router-link
                :to="{ name: 'category', params: { slug: item.slug } }"
              >
                <p>{{ item.name }}</p>
              </router-link>
            </div>
          </div>
        </div>
        <div class="col-md-4 mb-4">
          <h4 class="font-weight-bold">Terhubung dengan kami</h4>
          <div class="content">
            <div class="alamat">
              <div class="surel">Surel: pt.chakra@gmail.com</div>
              <p>
                <i class="fa fa-clock"></i> Jam Operasional :
                <br />
                Senin - jumat, jam ( 08.00 - 17.00 ) <br />
                Sabtu, jam ( 08.00 - 15.00 )
              </p>
              <p>
                <i class="fa fa-map-marker"></i>
                Jl Raya cibunar KP Blok masjid kurame RT 002 RW 003 kec Tenjo
                kab Bogor Jawa barat
              </p>
            </div>
          </div>
        </div>
        <div class="col-md-3 mb-4">
          <h4 class="font-weight-bold">Pembayaran</h4>
          <div class="content">
            <div class="row">
              <div class="col-md-4 col-4 mb-3">
                <div class="card h-100 border-0 rounded shadow">
                  <div class="card-body p-2 text-center">
                    <img src="@/assets/payment/BCA.png" style="width: 50px" />
                  </div>
                </div>
              </div>
              <div class="col-md-4 col-4 mb-3">
                <div class="card h-100 border-0 rounded shadow">
                  <div class="card-body p-2 text-center">
                    <img src="@/assets/payment/BNI.png" style="width: 45px" />
                  </div>
                </div>
              </div>
              <div class="col-md-4 col-4 mb-3">
                <div class="card h-100 border-0 rounded shadow">
                  <div class="card-body p-2 text-center">
                    <img src="@/assets/payment/BRI.png" style="width: 60px" />
                  </div>
                </div>
              </div>
              <div class="col-md-4 col-4 mb-3">
                <div class="card h-100 border-0 rounded shadow">
                  <div class="card-body p-2 text-center">
                    <img src="@/assets/payment/GOPAY.png" style="width: 60px" />
                  </div>
                </div>
              </div>
              <div class="col-md-4 col-4 mb-3">
                <div class="card h-100 border-0 rounded shadow">
                  <div class="card-body p-2 text-center">
                    <img
                      src="@/assets/payment/indomaret-logo.png"
                      style="width: 60px"
                    />
                  </div>
                </div>
              </div>
              <div class="col-md-4 col-4 mb-3">
                <div class="card h-100 border-0 rounded shadow">
                  <div class="card-body p-2 text-center">
                    <img
                      src="@/assets/payment/atm-bersama.jpg"
                      style="width: 40px"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid">
      <div class="row sub-footer text-center mt-3 pb-3">
        <div class="col-md-12">
          <hr />
          © 2021 &dash; {{ currentYear }} Chakra Gahana Gemilang • Hak cipta
          dilindungi
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { computed, onMounted } from "@vue/runtime-core";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();

    onMounted(() => {
      store.dispatch("category/getHomeCategories");
    });
    const categories = computed(() => {
      return store.getters["category/getHomeCategories"];
    });
    let currentYear = new Date().getFullYear();
    return {
      categories,
      currentYear,
    };
  },
};
</script>

<template>
  <carousel  id="tentang" />
  <section class="container section-service">
    <div class="text-header text-center" >
      <h1>Wujudkan desain impian Anda sesuai anggaran</h1>
    </div>
    <main>
      <div class="row row-service text-center" >
        <div class="col-md-4">
          <img
            src="https://www.mitraruma.com/_nuxt/img/icon-Value-1-36.1f0b4b1.svg"
            alt=""
          />
          <div class="title">Nilai luar biasa setiap hari</div>
          <div class="subtitle">
            Barang yang Anda suka cocok dengan anggaran
          </div>
        </div>
        <div class="col-md-4">
          <img
            src="https://www.mitraruma.com/_nuxt/img/icon-Value-2-36.fbbe743.svg"
            alt=""
          />
          <div class="title">Pengiriman cepat & gratis</div>
          <div class="subtitle">
            Demi kepuasan custommer kami menyediakan pengiriman gratis
          </div>
        </div>
        <div class="col-md-4">
          <img
            src="https://www.mitraruma.com/_nuxt/img/icon-Value-3-36.8736075.svg"
            alt=""
          />
          <div class="title">Pihan tidak terbatas</div>
          <div class="subtitle">Semua kebutuhan rumah, ada di satu tempat</div>
        </div>
      </div>
    </main>
  </section>
  <section class="container-fluid sd">
    <div class="bg-titik"></div>
    <div class="bg-titik-right"></div>
  </section>
  <section class="container section-kategori">
    <div class="text-header text-center">
      <h1>Kategori produk</h1>
    </div>
    <main>
      <div class="row row-kategori mt-5">
        <template v-for="item of categories" :key="item.id">
          <div class="col-md-3 mb-3">
            <router-link
              :to="{ name: 'category', params: { slug: item.slug } }"
            >
              <div class="card mb-3">
                <div class="row g-0">
                  <div class="col-md-7">
                    <div class="card-thumb">
                      <img :src="item.image" class="rounded-start" />
                    </div>
                  </div>
                  <div class="col-md-5">
                    <div class="card-body">
                      <h5 class="card-title">
                        {{ item.name }}
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </router-link>
          </div>
        </template>
      </div>
    </main>
  </section>
  <section class="mini-banner shadow">
    <div class="row container-fluid">
      <div class="col-md-6 col-text-baner">
        <div class="text-baner">
          <div class="text">Ide rumah tidak terbatas</div>
          <div class="subtitle">
            Klik disini dan temukan berbagai inspirasi untuk mempercantik rumah
            kesayangan anda.
          </div>
          <a href="#" class="btn btn-auth mt-5 shadow-lg">Temukan Inspirasi</a>
        </div>
      </div>
      <div class="col-md-6 col-carousel">
        <div id="minicarousel" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img
                src="https://www.mitraruma.com/_nuxt/img/dining-room.d5a2eef.jpg"
                class="d-block w-100"
              />
            </div>
            <div class="carousel-item">
              <img
                src="https://www.mitraruma.com/_nuxt/img/living-room.887a152.jpg"
                class="d-block w-100"
              />
            </div>
            <div class="carousel-item">
              <img
                src="https://www.mitraruma.com/_nuxt/img/living-room.887a152.jpg"
                class="d-block w-100"
              />
            </div>
          </div>
          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#minicarousel"
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true">
              <span style="margin: 8px auto" class="fa fa-angle-left"></span>
            </span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#minicarousel"
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true">
              <span style="margin: 8px auto" class="fa fa-angle-right"></span>
            </span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>
  </section>
  <section class="product-terbaru product-terlaris pt-3">
    <div class="pt-5 pb-5">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <h1>Product Terbaru Kami</h1>
          </div>
          <div class="product-terbaru">
            <div class="row">
              <template v-for="data of products" :key="data.id">
                <div class="col-md-3">
                  <router-link
                    :to="{ name: 'detail', params: { slug: data.slug } }"
                  >
                    <div class="card card-product">
                      <div class="product-thumbnail">
                        <img :src="data.gallery[0].image" alt="card image" />
                      </div>
                      <div class="card-body" style="padding-bottom: 8px">
                        <div class="title">{{ data.title }}</div>
                        <div class="discount">
                          <s>Rp. {{ moneyFormat(data.price) }} </s> /
                          <span class="badge bg-info"
                            >Discount {{ data.discount }} %</span
                          >
                        </div>
                        <div class="price">
                          Rp. {{ moneyFormat(calculateDiscount(data)) }}
                        </div>
                        <hr style="margin: 10px 0 0px 0" />
                        <div
                          style="display: inline-block; margin: 0 auto"
                          class="card-body"
                        >
                          <star-rating
                            :show-rating="false"
                            :star-size="23"
                            :read-only="true"
                            :increment="0.01"
                            :rating="data.avg_rating"
                          ></star-rating>
                          <span>{{ data.total_reviews }} ulasan </span>
                        </div>
                      </div>
                    </div>
                  </router-link>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="video-yt container-fluid">
    <div class="text-header mb-4">
      <h1>Testimoni Video</h1>
    </div>
    <div class="row">
      <div class="col-md-4">
        <div class="content-video">
          <!-- Tempatkan Video Disini -->
          <iframe
            class="w-100"
            height="240"
            src="https://www.youtube.com/embed/40mLoCGBoZc"
            frameborder="0"
            allow="autoplay; encrypted-media"
            allowfullscreen
          ></iframe>
        </div>
      </div>
      <div class="col-md-4">
        <div class="content-video">
          <!-- Tempatkan Video Disini -->
          <iframe
            class="w-100"
            height="240"
            src="https://www.youtube.com/embed/gCn8w2LsN00"
            frameborder="0"
            allow="autoplay; encrypted-media"
            allowfullscreen
          ></iframe>
        </div>
      </div>
      <div class="col-md-4">
        <div class="content-video">
          <!-- Tempatkan Video Disini -->
          <iframe
            class="w-100"
            height="240"
            src="https://www.youtube.com/embed/NP6GXf-2GSU"
            frameborder="0"
            allow="autoplay; encrypted-media"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Carousel from "@/components/Carousel.vue";
import { useStore } from "vuex";
import { computed, onMounted } from "@vue/runtime-core";
import StarRating from "vue-star-rating";

export default {
  components: {
    Carousel,
    StarRating,
  },
  setup() {
    const store = useStore();
    // jalankan action vuex ketika borwser di load
    onMounted(() => {
      store.dispatch("product/homeProducts");
      store.dispatch("category/getHomeCategories");
    });

    const products = computed(() => {
      return store.getters["product/getHomeProducts"];
    });
    const categories = computed(() => {
      return store.getters["category/getHomeCategories"];
    });

    return {
      products,
      categories,
    };
  },
};
</script>
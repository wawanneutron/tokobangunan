<template>
  <div class="categories container">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item parent">
          <router-link to="/">Home</router-link>
        </li>
        <li class="breadcrumb-item parent">
          <router-link :to="{ name: 'categories' }">Kategori</router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">Product</li>
      </ol>
    </nav>
    <div class="text-header mb-4 mt-5">
      <h1>Produk berdasarkan kategori</h1>
    </div>
    <div class="row justify-content-center">
      <div class="col-lg-2">
        <div class="card border-0 shadow card-category">
          <div class="card-body">
            <img :src="category.image" alt="card image" width="100" />
            <hr />
            <div class="title">{{ category.name }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="product-terlaris">
      <div class="row" v-if="products.length > 0">
        <template v-for="data of products" :key="data.id">
          <div class="col-md-3">
            <router-link :to="{ name: 'detail', params: { slug: data.slug } }">
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
      <div v-else class="text-center">
        <div class="alert alert-danger">Produk belum tersedia</div>
      </div>
    </div>
  </div>
</template>
<script>
import { computed, onMounted } from "@vue/runtime-core";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import StarRating from "vue-star-rating";

export default {
  components: {
    StarRating,
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    onMounted(() => {
      store.dispatch("category/productsCategory", route.params.slug);
    });
    const products = computed(() => {
      return store.getters["category/getProductsCategory"];
    });

    const category = computed(() => {
      return store.getters["category/getCategoryShow"];
    });

    return {
      products,
      category,
    };
  },
};
</script>
<template>
  <div class="container section-header">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item parent">
          <router-link to="/">Home</router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">Products</li>
      </ol>
    </nav>
    <div class="text-header mb-4 mt-5">
      <h1>Semua Products</h1>
    </div>
    <div class="search-wrap header-main mb-4">
      <div class="input-group">
        <input
          type="text"
          class="form-control form-search-product"
          placeholder="cari disini"
          aria-label="cari disini"
          aria-describedby="addon-wrapping"
          v-model="keyword"
          @input="search"
        />
        <span class="input-group-text search-button-product" id="addon-wrapping"
          ><i class="fa fa-search"></i
        ></span>
      </div>
    </div>
    <section class="store-new-products">
      <div class="row" v-if="keyword.length > 0">
        <div class="col-12 mb-3">
          <span
            class="text-product-header all-category-product"
            style="font-size: 16px"
            >Hasil pencarian "<strong>{{ keyword }}</strong
            >"</span
          >
        </div>
        <div class="col-12 mb-3" v-if="dataProducts.length == 0">
          <div class="alert alert-danger text-center">
            product <strong>{{ keyword }}</strong> tidak ada
          </div>
        </div>
        <div
          class="col-md-3 product-terlaris"
          v-for="(product, index) in dataProducts"
          :key="index"
          data-aos="fade-up"
        >
          <router-link
            :to="{ name: 'detail', params: { slug: product.slug } }"
            class="component-product"
            v-if="product.discount <= 0"
          >
            <div class="card card-product">
              <div class="product-thumbnail">
                <img :src="product.gallery[0].image" alt="card image" />
              </div>
              <div class="card-body" style="padding-bottom: 8px">
                <div class="title">{{ product.title }}</div>
                <div class="discount">
                  <s>Rp. {{ moneyFormat(product.price) }} </s> /
                  <span class="badge bg-info"
                    >Discount {{ product.discount }} %</span
                  >
                </div>
                <div class="price">
                  Rp. {{ moneyFormat(calculateDiscount(product)) }}
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
                    :rating="product.avg_rating"
                  ></star-rating>
                  <span>{{ product.total_reviews }} ulasan </span>
                </div>
              </div>
            </div>
          </router-link>
          <router-link
            v-else
            :to="{ name: 'detail', params: { slug: product.slug } }"
            class="component-product"
          >
            <div class="card card-product">
              <div class="product-thumbnail">
                <img :src="product.gallery[0].image" alt="card image" />
              </div>
              <div class="card-body" style="padding-bottom: 8px">
                <div class="title">{{ product.title }}</div>
                <div class="discount">
                  <s>Rp. {{ moneyFormat(product.price) }} </s> /
                  <span class="badge bg-info"
                    >Discount {{ product.discount }} %</span
                  >
                </div>
                <div class="price">
                  Rp. {{ moneyFormat(calculateDiscount(product)) }}
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
                    :rating="product.avg_rating"
                  ></star-rating>
                  <span>{{ product.total_reviews }} ulasan </span>
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
      <div class="row" v-if="!keyword.length > 0">
        <!-- tampilkan semua -->
        <div class="col-12 mb-3">
          <span
            class="text-product-header all-category-product"
            style="font-size: 16px"
            >🎉 Cari barang yang kamu cari disini🎉</span
          >
        </div>
        <products />
      </div>
    </section>
  </div>
</template>

<script>
import Products from "@/components/Product.vue";
import Api from "@/api/Api.js";
import StarRating from "vue-star-rating";

export default {
  components: {
    Products,
    StarRating
  },
  /* search */
  data() {
    return {
      keyword: "",
      dataProducts: [],
    };
  },
  /* search method */
  methods: {
    search() {
      let keyword = this.keyword;
      if (keyword.length > 0) {
        Api.get("/product/search/" + keyword)
          .then((response) => {
            this.dataProducts = response.data.product;
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        this.dataProducts = [];
      }
    },
  },
};
</script>
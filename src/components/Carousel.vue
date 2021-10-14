<template>
  <section class="section-carousel">
    <div id="headerCarousel" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        <template v-for="(item, id) of carousel" :key="id">
          <div
            class="carousel-item"
            :class="{ active: id == 0 }"
            data-bs-interval="3000"
          >
            <a :href="item.link" target="_blank">
              <img :src="item.image" class="d-block w-100" alt="carousel" />
            </a>
          </div>
        </template>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#headerCarousel"
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
        data-bs-target="#headerCarousel"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true">
          <span style="margin: 8px auto" class="fa fa-angle-right"></span>
        </span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </section>
</template>

<script>
import { computed, onMounted } from "@vue/runtime-core";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();

    onMounted(() => {
      store.dispatch("carousel/carousel");
    });
    const carousel = computed(() => {
      return store.getters["carousel/getCarousel"];
    });
    return {
      carousel,
    };
  },
};
</script>
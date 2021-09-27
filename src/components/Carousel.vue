<template>
  <div
    id="carouselExampleControls"
    class="carousel slide"
    data-bs-ride="carousel"
  >
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img
          src="https://strapi-cms-prod-bucket.s3.ap-southeast-1.amazonaws.com/304ff221_eb79_4ef5_b163_29b0aa211063_2016834035.jpg"
          class="d-block w-100"
          alt="carousel"
        />
      </div>
      <div class="carousel-item">
        <img
          src="https://strapi-cms-prod-bucket.s3.ap-southeast-1.amazonaws.com/626dbf8f_9a76_4539_8bd4_9c9e1ef22b7c_1af3ee2fbb.jpg"
          class="d-block w-100"
          alt="carousel"
        />
      </div>
      <div class="carousel-item">
        <img
          src="https://strapi-cms-prod-bucket.s3.ap-southeast-1.amazonaws.com/ca751f10_2cd8_43ff_a929_54766d22217a_15c58e3bd4.jpg"
          class="d-block w-100"
          alt="carousel"
        />
      </div>
    </div>
    <button
      class="carousel-control-prev"
      type="button"
      data-bs-target="#carouselExampleControls"
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
      data-bs-target="#carouselExampleControls"
      data-bs-slide="next"
    >
      <span class="carousel-control-next-icon" aria-hidden="true">
        <span style="margin: 8px auto" class="fa fa-angle-right"></span>
      </span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
</template>

<script>
// import { computed, onMounted } from "@vue/runtime-core";
// import { useStore } from "vuex";
// export default {
//   setup() {
//     const store = useStore();

//     onMounted(() => {
//       store.dispatch("carousel/carousel");
//     });
//     const carousel = computed(() => {
//       return store.getters["carousel/getCarousel"];
//     });

//     return {
//       carousel,
//     };
//   },
// };
</script>
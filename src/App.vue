<template>
  <Header />
  <a
    href="https://api.whatsapp.com/send/?phone=+6285892967275&amp;text=Assalamualaikum+Saya+ingin+bertanya+mengenai+produk+yang+ingin+saya+beli+Terima+kasih+..."
    target="_blank"
  >
    <div class="chat-box">
      <img src="@/assets/comment_white_36dp.svg" alt="chat admin" />
    </div>
  </a>
  <!-- <scroll-top- /> -->
  <a
    @click="scrollTop"
    :class="{ 'hidden-button': visible }"
    class="btn btn-arrow btn-light"
  >
    <i class="fas fa-arrow-up"></i>
  </a>
  <router-view />
  <Footer />
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
// import ScrollTopArrow from "@/components/ScrollTopArrow.vue";
export default {
  components: {
    Header,
    Footer,
    // ScrollTopArrow,
  },
  data: () => ({
    visible: false,
  }),
  mounted: function () {
    window.addEventListener("scroll", this.onScroll);
  },
  beforeUnmount: function () {
    window.removeEventListener("scroll", this.onScroll);
  },
  methods: {
    onScroll() {
      const currentScrollPosition =
        window.pageYOffset || document.documentElement.scrollTop;
      if (currentScrollPosition < 0) {
        return;
      }
      // Stop executing this function if the difference between
      // current scroll position and last scroll position is less than some offset
      if (Math.abs(currentScrollPosition - this.lastScrollPosition) < 80) {
        return;
      }
      this.visible = currentScrollPosition < this.lastScrollPosition;
      this.lastScrollPosition = currentScrollPosition;
    },
    scrollTop() {
      document.getElementById("app").scrollIntoView();
    },
  },
};
</script>


<style>
.btn-arrow {
  border-radius: 50%;
  border: 1.5px solid black;
  background: transparent;
  width: 60px;
  height: 60px;
  position: fixed;
  bottom: 100px;
  right: 20px;
  cursor: pointer;
  z-index: 999999;
}
.btn-arrow:hover {
  border: 1px solid black;
  background: transparent;
}
.btn-arrow i {
  padding-top: 12px;
  font-size: 20px;
}
.hidden-button {
  display: none;
}
</style>
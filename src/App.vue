<template>
  <Header />
  <a
    href="https://api.whatsapp.com/send/?phone=025151&amp;text=Assalamualaikum+Saya+ingin+bertanya+mengenai+produk+yang+ingin+saya+beli+Terima+kasih+..."
    target="_blank"
  >
    <div class="chat-box">
      <img src="@/assets/comment_white_36dp.svg" alt="chat admin" />
    </div>
  </a>
  <router-view />
  <Footer />
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  components: {
    Header,
    Footer,
  },
};
</script>
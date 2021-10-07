<template>
  <div class="card card-dashboard border-top-orange border-0 shadow mb-5">
    <div class="card-body">
      <div class="title">Main Menu</div>
      <hr />
      <ul class="list-group">
        <router-link
          :to="{ name: 'dashboard' }"
          class="list-group-item menuItem-active-link"
        >
          <i class="fa fa-tachometer-alt"></i>
          Dashboard
        </router-link>
        <router-link
          :to="{ name: 'order' }"
          class="list-group-item menuItem-active-link"
        >
          <i class="fa fa-shopping-cart"></i>
          My Orders
        </router-link>
        <a @click="logout" class="list-group-item">
          <i class="fa fa-sign-out-alt"></i>
          Logout
        </a>
      </ul>
    </div>
  </div>
</template>

<script>
import { inject } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const swal = inject("$swal");

    const logout = () => {
      swal({
        title: "yakin ingin logout?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#eb0000",
        cancelButtonColor: "#7686ab",
        confirmButtonText: "Ya, Logout!",
        cancelButtonText: "Batal",
      }).then((result) => {
        if (result.isConfirmed) {
          store.dispatch("auth/logout").then(() => {
            router.push({ name: "login" });
          });
          swal({
            title: "Logout Berhasil!",
            text: "sesi logout berhasil dihapus",
            icon: "success",
          });
        }
      });
    };

    return {
      logout,
    };
  },
};
</script>
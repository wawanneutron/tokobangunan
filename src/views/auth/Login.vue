<template>
  <div class="auth container">
    <div class="row justify-content-center">
      <div class="col-md-6 col-lg-4">
        <div class="card-group">
          <div class="card border-top-orange border-0 shadow">
            <div class="card-body">
              <div class="title">Login</div>
              <hr />
              <form @submit.prevent="login">
                <div v-if="valid.message" class="alert alert-danger mt-1">
                  {{ valid.message }}
                </div>
                <div class="input-group mb-3">
                  <span class="input-group-text" id="basic-addon1">
                    <i class="fa fa-envelope"></i>
                  </span>
                  <input
                    type="email"
                    class="form-control"
                    placeholder="Email"
                    aria-label="Email"
                    aria-describedby="basic-addon1"
                    v-model="user.email"
                  />
                </div>
                <div v-if="valid.email" class="alert alert-danger mt-1">
                  {{ valid.email[0] }}
                </div>
                <div class="input-group mb-3">
                  <span class="input-group-text" id="basic-addon1">
                    <i class="fa fa-lock"></i>
                  </span>
                  <input
                    type="password"
                    class="form-control"
                    placeholder="Password"
                    aria-label="Password"
                    aria-describedby="basic-addon1"
                    v-model="user.pass"
                  />
                </div>
                <div v-if="valid.password" class="alert alert-danger mt-1">
                  {{ valid.password[0] }}
                </div>
                <div class="d-grid" style="margin-top: 30px">
                  <button class="btn btn-auth">Login</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div class="title-register text-center mt-3">
        Belum punya akun ?
        <router-link class="fw-bold" :to="{ name: 'register' }"
          >Daftar Sekarang</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { inject } from "@vue/runtime-core";
export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const valid = ref([]);
    const swal = inject("$swal");

    const user = reactive({
      email: "",
      pass: "",
    });

    const login = () => {
      let email = user.email;
      let pass = user.pass;

      store
        .dispatch("auth/login", {
          email,
          pass,
        })
        .then(() => {
          swal({
            icon: "success",
            title: "Selamat Datang...",
            text: "Anda berhasil login, silahkan pilih barang kesukaan mu",
            showConfirmButton: true,
            confirmButtonColor: "#eb0000",
          });
          router.push({ name: "dashboard" });
        })
        .catch((error) => {
          swal({
            icon: "error",
            title: "Oops...",
            text: "email atau password yang anda masukan salah",
            confirmButtonColor: "#eb0000",
          });
          valid.value = error;
        });
    };

    return {
      user,
      login,
      valid,
    };
  },
};
</script>

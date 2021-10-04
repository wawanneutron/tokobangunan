<template>
  <div class="container-fluid">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item parent">
          <router-link to="/">Home</router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">My Order</li>
      </ol>
    </nav>
    <div class="row">
      <div class="col-md-3">
        <customer-menu />
      </div>
      <div class="col-md-9">
        <div class="card card-dashboard border-top-orange border-0 shadow">
          <div class="card-body">
            <div class="title">
              <i class="fa fa-shopping-cart"></i>
              My Order
            </div>
            <hr />
            <div class="table-responsive">
              <table class="table table-hover" v-if="orders.length > 0">
                <thead>
                  <tr>
                    <th scope="col">INVOICE</th>
                    <th scope="col">NAME</th>
                    <th scope="col">COURIER</th>
                    <th scope="col">STATUS</th>
                    <th scope="col">GRAND TOTAL</th>
                    <th scope="col">OPTION</th>
                  </tr>
                </thead>
                <tbody>
                  <template v-for="order in orders" :key="order.id">
                    <tr>
                      <th scope="row">{{ order.invoice }}</th>
                      <td>{{ order.name }}</td>
                      <td>
                        {{ order.courier }} | {{ order.service }} | Rp.
                        {{ moneyFormat(order.cost_courier) }}
                      </td>
                      <td>{{ order.status }}</td>
                      <td>Rp. {{ moneyFormat(order.grand_total) }}</td>
                      <td>
                        <router-link
                          :to="{
                            name: 'detail_order',
                            params: { snap_token: order.snap_token },
                          }"
                          class="btn btn-primary"
                          ><i class="fas fa-eye mr-2"></i>detail</router-link
                        >
                      </td>
                    </tr>
                  </template>
                </tbody>
              </table>
              <table class="table table-hover" v-else>
                <thead>
                  <tr>
                    <th scope="col">INVOICE</th>
                    <th scope="col">NAME</th>
                    <th scope="col">COURIER</th>
                    <th scope="col">STATUS</th>
                    <th scope="col">GRAND TOTAL</th>
                    <th scope="col">OPTION</th>
                  </tr>
                </thead>
                <tbody>
                  <div class="alert alert-danger text-center h5">
                    Data Kosong
                  </div>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CustomerMenu from "@/components/dashboard/Menu.vue";
import { useStore } from "vuex";
import { computed, onMounted } from "vue";
export default {
  components: {
    CustomerMenu,
  },
  setup() {
    // store vuex
    const store = useStore();

    onMounted(() => {
      // panggil action getOrder di module order vuex
      return store.dispatch("order/getOrder");
    });

    const orders = computed(() => {
      return store.getters["order/getOrder"];
    });
    return {
      store,
      orders,
    };
  },
};
</script>
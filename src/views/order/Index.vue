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
                        <div v-if="order.status == 'success'">
                          <button class="btn btn-sm btn-success">
                            <i class="fas fa-check-double"></i>
                            {{ order.status }}
                          </button>
                        </div>
                        <div v-if="order.status == 'payment-success'">
                          <button class="btn btn-sm btn-success">
                            <i class="fas fa-check"></i> {{ order.status }}
                          </button>
                        </div>
                        <div v-if="order.status == 'pending'">
                          <button class="btn btn-sm btn-info">
                            <i class="fas fa-spinner fa-spin"></i>
                            {{ order.status }}
                          </button>
                        </div>
                        <div v-if="order.status == 'process'">
                          <button class="btn btn-sm btn-warning">
                            <i class="fas fa-people-carry"></i>
                            {{ order.status }}
                          </button>
                        </div>
                        <div v-if="order.status == 'shipping'">
                          <button class="btn btn-sm btn-secondary">
                            <i class="fas fa-truck"></i>
                            {{ order.status }}
                          </button>
                        </div>
                        <div v-if="order.status == 'expired'">
                          <button class="btn btn-sm btn-danger">
                            <i class="fas fa-times-circle"></i>
                            {{ order.status }}
                          </button>
                        </div>
                        <div v-if="order.status == 'failed'">
                          <button class="btn btn-sm btn-danger">
                            <i class="fas fa-times-circle"></i>
                            {{ order.status }}
                          </button>
                        </div>
                      </td>
                      <td>Rp. {{ moneyFormat(order.grand_total) }}</td>
                      <td>
                        <router-link
                          :to="{
                            name: 'detail_order',
                            params: { snap_token: order.snap_token },
                          }"
                          class="btn btn-sm btn-detail"
                          ><i class="fas fa-eye me-2"></i>detail</router-link
                        >
                      </td>
                    </tr>
                  </template>
                </tbody>
              </table>
              <div v-else>
                <table class="table table-hover">
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
                    <tr>
                      <div class="alert alert-danger text-center h5">
                        Data Kosong
                      </div>
                    </tr>
                  </tbody>
                </table>
              </div>
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
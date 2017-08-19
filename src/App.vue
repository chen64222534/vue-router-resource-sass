<template>
  <div class="l-content">
    <v-header :seller="seller"></v-header>
    <div class="l-tab">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <router-view :seller="seller"></router-view>

  </div>

</template>

<script>
  import header from './components/header.vue';

  const ERR_OK = 0;

  export default {
    data () {
      return {
        seller: {}
      };
    },
    created () {
      this.$http.get('/api/seller').then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.seller = response.data;
//          console.log(this.seller);
        }
      }, (response) => {
      }
    );
    },
    components: {
      'v-header': header
    }
  };

</script>


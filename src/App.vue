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

    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>

  </div>

</template>

<script>
  import header from './components/header.vue';
  import { urlParse } from './commonjs/url';

  const ERR_OK = 0;

  export default {
    data () {
      return {
        seller: {
          id: (() => {
            let queryParam = urlParse();
            return queryParam.id;
          })()
        }
      };
    },
    created () {
//      真实情况下根据不同商家的ID，从后台获取不同的商家数据
      this.$http.get('/api/seller?id' + this.seller.id).then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
//          es6,在对象上添加属性和方法
          this.seller = Object.assign({}, this.seller, response.data);
//          this.seller = response.data;
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


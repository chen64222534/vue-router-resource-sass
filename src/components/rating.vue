<template>
  <div class="l-rating">
    <div class="l-rating__header">
      <div class="l-rating__left">
        <span class="l-rating__left-num"></span>
        <span class="l-rating__left-grade"></span>
        <span class="l-rating__left-exceed"></span>
      </div>
      <div class="l-rating__right">
        <div class="l-rating__item"></div>
      </div>
    </div>
    <v-split></v-split>
    <div class="l-rating__content"></div>
  </div>
</template>

<script>
  import split from '../common/split.vue';

  export default {
//    created () {
//      this.$http.get('/api/rating').then((response) => {
//        response = response.body;
//      if () {
//
//      }
//      });
//    },
    components: {
      'v-split': split
    }
  };
</script>

<style>
</style>

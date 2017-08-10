<template>
  <div class="header">
    <div class="content-wraper">

      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar">
      </div>

      <div class="content">
        <div class="title">
          <span class="brand"></span>
            <span class="name">
              {{seller.name}}
            </span>
        </div>
        <div class="details">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="support">
          <span class="icon" :class="this.classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>

      <div v-if="seller.supports" class="support-count" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>

    <div class="bullentin-wraper" >
      <span class="bullentin-title"></span><span class="bullentin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>

    <div class="background">
      <img width="100%" height="170%" :src="seller.avatar">
    </div>

    <div v-show="detailShow" class="detail">

    </div>
  </div>
</template>

<script>
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        detailShow: false
      };
    },
    methods: {
      showDetail () {
        this.detailShow = true;
      }
    },
    created () {
      this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
    }
  };
</script>


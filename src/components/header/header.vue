<template>
  <div class="l-header">
    <div class="l-header__wrap">

      <div class="l-header__avatar">
        <img width="64" height="64" :src="seller.avatar">
      </div>

      <div class="l-header__content">
        <div class="c-content__title">
          <span class="c-content__brand"></span>
            <span class="c-content__name">
              {{seller.name}}
            </span>
        </div>
        <div class="c-content__details">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="c-content__support">
          <span class="c-content__icon" :class="this.classMap[seller.supports[0].type]"></span>
          <span class="c-content__text">{{seller.supports[0].description}}</span>
        </div>
      </div>

      <div v-if="seller.supports" class="c-support-count" @click="showDetail">
        <span class="c-support-count__count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>

    <div class="l-header__bullentin c-bullentin" @click="showDetail">
      <span class="c-bullentin__title"></span><span class="c-bullentin__text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>

    <div class="l-header__background">
      <img width="100%" height="170%" :src="seller.avatar">
    </div>

    <div v-show="detailShow" class="l-header__detail l-detail">
      <div class="l-detail__wrap">
        <div class="l-detail__main">
          <div class="l-detail__name">{{seller.name}}</div>
          <div class="l-detail__star c-star ">

          </div>
          <div class="l-detail__notice c-notice">
            <div class="c-notice__title"></div>
          </div>
          {{seller.bulletin}}
        </div>
      </div>
      <div class="l-detail__close">
        <i class="icon__close"></i>
      </div>
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


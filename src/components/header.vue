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
          <!--非组件写法-->
          <!--<span class="c-content__icon" :class="this.classMap[seller.supports[0].type]"></span>-->
          <!--textIcon组件化后-->
          <v-icon :iconType="seller.supports[0].type" :iconSize="1"></v-icon>
          <span class="c-content__text">{{seller.supports[0].description}}</span>
        </div>

      </div>

      <div v-if="seller.supports" class="c-support-count" @click="showDetail">
        <span class="c-support-count__count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>

    <div class="l-header__bullentin c-bullentin" @click="showDetail" >
      <span class="c-bullentin__title"></span><span class="c-bullentin__text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>

    <div class="l-header__background">
      <img width="100%" height="170%" :src="seller.avatar">
    </div>

    <transition name="fade-transition">
      <div v-show="detailShow" class="l-header__detail l-detail">

        <div class="l-detail__wrap">

          <div class="l-detail__main">

            <div class="l-detail__name">{{seller.name}}</div>

            <div class="l-detail__star c-star ">
              <v-star :size="48" :score="seller.score"></v-star>
            </div>

            <div class="l-detail__notice c-notice">

              <div class="c-notice__title">
                <span class="c-notice__title-line"></span>
                <span class="c-notice__title-name">优惠信息</span>
                <span class="c-notice__title-line"></span>
              </div>
              <div class="c-notice__content" >
                <div class="c-notice__content-item" v-for=" item in seller.supports ">
                  <!--<span class="c-notice__content-icon" :class="classMap[item.type]"></span>-->
                  <!--textIcon组件化后-->
                  <v-icon :iconType="item.type" :iconSize="2"></v-icon>
                  <span class="c-notice__content-introduce">{{item.description}}</span>
                </div>
              </div>

              <div class="c-notice__title">
                <span class="c-notice__title-line"></span>
                <span class="c-notice__title-name">商家公告</span>
                <span class="c-notice__title-line"></span>
              </div>
              <div class="c-notice__content">
                <div class="c-notice__content-text">
                  {{seller.bulletin}}
                </div>
              </div>
            </div>

          </div>

        </div>

        <div class="l-detail__close">
          <!--字体图片，固定类名，不能更改-->
          <i class="icon-close" @click="hideDetail"></i>
        </div>

      </div>

    </transition>

  </div>
</template>

<script>
  import star from '../common/star.vue';
  import textIcon from '../common/textIcon.vue';

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
      },
      hideDetail () {
        this.detailShow = false;
      }
    },
    components: {
      'v-star': star,
      'v-icon': textIcon
    }
  };
</script>


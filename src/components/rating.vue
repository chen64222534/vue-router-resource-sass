<template>
  <div class="l-rating" ref="lRating">
    <div>
      <div class="l-rating__header">
        <div class="l-rating__left">
          <span class="l-rating__num">{{seller.score}}</span>
          <span class="l-rating__comprehensive">综合评分</span>
          <span class="l-rating__exceed">高于周边商家{{seller.rankRate}}%</span>
        </div>
        <div class="l-rating__right">
          <div class="l-rating__evaluate">
            <span class="l-rating__serve">服务态度</span>
            <div class="l-rating__star">
              <v-star :size="36" :score="seller.serviceScore" ></v-star>
            </div>
            <span class="l-rating__grade">{{seller.serviceScore}}</span>
          </div>
          <div class="l-rating__evaluate">
            <span class="l-rating__serve">商品评价</span>
            <div class="l-rating__star">
              <v-star :size="36" :score="seller.foodScore" ></v-star>
            </div>
            <span class="l-rating__grade">{{seller.foodScore}}</span>
          </div>
          <div class="l-rating__time">
            <span class="l-rating__serve">送达时间</span>
            <span class="l-rating__time-minute">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <v-split></v-split>
      <div class="l-rating__ratingselect" >
        <div>
          <v-ratingselect :ratings="ratings" :selectType="selectType" :onlyContent="onlyContent"></v-ratingselect>
        </div>
      </div>
      <div class="l-rating__content" >
        <ul>
          <li class="l-rating__item" v-for="rating in ratings" v-if="ratingshow(rating.text,rating.rateType)">
            <div class="l-rating__item-user">
              <img :src="rating.avatar" width="28" height="28" class="l-rating__item-img">
            </div>
            <div class="l-rating__item-content">
              <div class="l-rating__item-name">{{rating.username}}</div>
              <div class="l-rating__item-evaluate">
                <div class="l-rating__item-star">
                  <v-star :size="36" :score="rating.score"></v-star>
                </div>
                <span class="l-rating__item-minute">{{rating.deliveryTime}}分钟送达</span>
              </div>
              <div class="l-rating__item-text">
                {{rating.text}}</div>
              <div class="l-rating__item-record" v-show="rating.recommend.length">
                <i :class="ratingicon(rating)" class="l-rating__item-icon"></i>
                <div class=" l-rating__item-recommend" v-for="shop in rating.recommend">
                  {{shop}}
                </div>
              </div>
            </div>
            <div class="l-rating__item-date">{{rating.rateTime | ratingtime}}</div>
          </li>
        </ul>
      </div>
    </div>
    <!--购物车组件，跨组件传递数据-->
    <!--<div class="l-rating__shopcart">-->
      <!--<v-shopcart :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice" :select-foods="seller.selectFoods"></v-shopcart>-->
    <!--</div>-->
  </div>
</template>

<script>
  import BScroll from 'better-scroll';
  import { formatDate } from '../commonjs/date';
  import { eventHub } from '../commonjs/bus';

  import split from '../common/split.vue';
  import ratingselect from './ratingselect.vue';
  import star from '../common/star.vue';
//  import shopcart from './shopcart.vue';

  const ERR_OK = 0;
  const ALL = 2;

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    created () {
      this.$http.get('/api/ratings').then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.ratings = response.data;
          this.$nextTick(() => {
            this.ratingScroll = new BScroll(this.$refs.lRating, {
              click: true
            });
          });
        }
      }, (response) => {
      }
    );
//      监听ratingselect按键状态变化
      eventHub.$on('ratingtype', (type) => {
        this.selectType = type;
      });
      eventHub.$on('onlycontent', (boolean) => {
        this.onlyContent = boolean;
      });
      this.$nextTick(() => {
        eventHub.$on('cart-add', (foods) => {
          this.selectFoods = foods;
        });
      });
    },
    data () {
      return {
        ratings: [],
        num: 0,
        minute: 0,
        selectType: ALL,
        onlyContent: false,
        selectFoods: []
      };
    },
    components: {
      'v-split': split,
      'v-ratingselect': ratingselect,
      'v-star': star
//      'v-shopcart': shopcart
    },
    methods: {
      ratingicon (rating) {
        if (rating.rateType === 1) {
          return 'icon-thumb_down';
        } else {
          return 'icon-thumb_up';
        }
      },
      ratingshow (thistext, thistype) {
        if ((this.selectType === 2) || thistype === this.selectType) {
          if (!this.onlyContent || thistext.length) {
            return true;
          }
        }
      }
    },
    filters: {
      ratingtime (time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    }
  };
</script>

<style>
</style>

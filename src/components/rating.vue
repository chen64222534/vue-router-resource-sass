<template>
  <div class="l-rating">
    <div class="l-rating__header">
      <div class="l-rating__left">
        <span class="l-rating__num">{{seller.score}}</span>
        <span class="l-rating__comprehensive">综合评分</span>
        <span class="l-rating__exceed">高于周边商家{{seller.rankRate}}%</span>
      </div>
      <div class="l-rating__right">
        <div class="l-rating__item">
          <span class="l-rating__serve">服务态度</span>
          <div class="l-rating__star">
            <v-star :size="36" :score="seller.serviceScore" ></v-star>
          </div>
          <span class="l-rating__grade">{{seller.serviceScore}}</span>
        </div>
        <div class="l-rating__item">
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
    <div class="l-rating__ratingselect" ref="lRatingContent">
      <div>
        <v-ratingselect :ratings="ratings" :selectType="selectType" :onlyContent="onlyContent"></v-ratingselect>
      </div>
    </div>

    <div class="l-rating__shopcart">
      <v-shopcart></v-shopcart>
    </div>
  </div>
</template>

<script>
  import split from '../common/split.vue';
  import ratingselect from './ratingselect.vue';
  import star from '../common/star.vue';
  import shopcart from './shopcart.vue';
  import BScroll from 'better-scroll';

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
            this.ratingScroll = new BScroll(this.$refs.lRatingContent, {
              click: true
            });
          });
        }
      }, (response) => {
      }
    );
    },
    data () {
      return {
        ratings: [],
        num: 0,
        minute: 0,
        selectType: ALL,
        onlyContent: false
      };
    },
    components: {
      'v-split': split,
      'v-ratingselect': ratingselect,
      'v-star': star,
      'v-shopcart': shopcart
    },
    methods: {

    },
    computed: {
//      计算综合评价
//      ratingsNum () {
//        for (let i = 0; i < this.ratings.length; i++) {
//          this.num += this.ratings[i].score;
//        }
//        return parseInt((this.num / this.ratings.length).toFixed(1));
//        数据并非纯数组，forEach会出现undefined对象，不利于计算
//        return this.ratings.forEach((rat) => {
//          if (rat) {
//            this.num += rat.score;
//            console.log(rat.score);
//          }
//        }
//      );
//      }
//      ratingsMinute () {
//        for (let i = 0; i < this.ratings.length; i++) {
//          this.minute += this.ratings[i].deliveryTime;
//        }
//        return parseInt(this.num / this.ratings.length);
//      }
    }
  };
</script>

<style>
</style>

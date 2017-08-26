<template>
  <transition name="food-transition">
    <!--此处页面不显示时，需去除，隐藏时，会增加cartcontrol触发次数-->
    <div class="l-food" v-if="showFlag" ref="lFood">
        <div class="l-food__content">
          <div class="l-food__bg">
            <img :src="food.image" class="l-food__img">
            <div class="l-food__back" @click="hide">
              <i class="icon-arrow_lift"></i>
            </div>
          </div>
          <div class="l-food__details">
            <h2 class="l-food__name">
              {{food.name}}
            </h2>
            <div class="l-food__extra">
              <span class="l-food__sell">月售{{food.sellCount}}</span><span>好评率{{food.rating}}%</span>
            </div>
            <div class="l-food__price">
              <span>￥{{food.price}}</span><span v-if="food.oldPrice" class="l-food__oldPrice">￥{{food.oldPrice}}</span>
            </div>
            <div class="l-food__joincart" v-show="!food.count" @click="addFirst($event)">
              加入购物车
            </div>
            <div class="l-food__cartcontrol" v-show="food.count">
              <v-cartcontrol :food="food"></v-cartcontrol>
            </div>
          </div>
          <div class="l-food__split" v-if="food.info">
            <v-split></v-split>
          </div>
          <div class="l-food__introduce" v-if="food.info">
            <h2 class="l-food__title">商品介绍</h2>
            <div class="l-food__introduce-text">{{food.info}}</div>
          </div>
          <div class="l-food__split">
            <v-split></v-split>
          </div>
          <div class="l-food__rating">
            <h2 class="l-food__rating-title">商品评价</h2>
            <div class="l-food__ratings">
              <v-ratingselect :ratings="food.ratings" :select-type="selectType" :only-content="onlyContent" :desc="desc"></v-ratingselect>
            </div>
          </div>
        </div>
    </div>
  </transition>

</template>

<script>
  import Vue from 'vue';
  import { eventHub } from '../bus';
  import BScroll from 'better-scroll';
  import cartcontrol from '../common/cartcontrol.vue';
  import split from '../common/split.vue';
  import ratingselect from './ratingselect.vue';

  //  const POSITIVE = 0;
  //  const NEGATIVE = 1;
  const ALL = 0;

  export default{
    created () {
      eventHub.$on('ratingtype.select', this._refresh);
    },
    props: {
      food: {
        type: Object
      }
    },
    data () {
      return {
        showFlag: false,
        selectType: ALL,
        onlyContent: true,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      };
    },
    methods: {
      _refresh (type) {
        this.selectType = type;
      },
      show () {
        this.showFlag = true;
//        每次详情页开启，刷新数据
        this.selectType = ALL;
        this.onlyContent = true;

        this.$nextTick(() => {
          if (!this.foodScorll) {
            this.foodScroll = new BScroll(this.$refs.lFood, {
              click: true
            });
          } else {
            this.foodScroll.refresh();
          }
        });
      },
      hide () {
        this.showFlag = false;
        this.foodScroll = null;
      },
      addFirst (event) {
        if (!event._constructed) {
          return;
        }
//        target返回事件自身节点
//        console.log(event.target);
//        console.log(event);
//       触发事件发布，增加小球动画
        eventHub.$emit('cart-add', event.target);
//        初始化count数据，防止数据未生成
        Vue.set(this.food, 'count', 1);
      }
    },
    components: {
      'v-cartcontrol': cartcontrol,
      'v-split': split,
      'v-ratingselect': ratingselect
    }
  };
</script>

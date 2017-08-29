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
            <ul class="l-food__list" v-show="food.ratings.length">
              <li class="l-food__item" v-for="rating in food.ratings"
                  v-if="ratingshow(rating.text,rating.rateType,selectType)">
                <div class="l-food__item-time">
                  <span class="l-food__item-date">{{rating.rateTime | ratingtime}}</span>
                </div>
                <div class="l-food__item-content">
                  <i :class="ratingicon(rating)"></i>
                  <span class="l-food__item-text">{{rating.text}}</span>
                </div>
                <div class="l-food__item-user">
                  <span class="l-food__item-name">{{rating.username}}</span>
                  <img :src="rating.avatar" height="12" width="12" class="l-food__item-img">
                </div>
              </li>
            </ul>
            <div class="l-food__norating" v-show="!food.ratings.length">
              还没有评价,快来评价吧！
            </div>
          </div>
        </div>
    </div>
  </transition>
</template>

<script>
  import Vue from 'vue';
  import BScroll from 'better-scroll';

  import { eventHub } from '../commonjs/bus';
  import { formatDate } from '../commonjs/date';
//  ref="cRatingsList"
  import cartcontrol from '../common/cartcontrol.vue';
  import split from '../common/split.vue';
  import ratingselect from './ratingselect.vue';

  //  const POSITIVE = 0;
  //  const NEGATIVE = 1;
  const ALL = 2;

  export default{
    created () {
//      监听ratingselect按键状态变化
      eventHub.$on('ratingtype', (type) => {
        this.selectType = type;
      });
      eventHub.$on('onlycontent', (boolean) => {
        this.onlyContent = boolean;
      });
    },
    props: {
      food: {
        type: Object
      }
    },
    data () {
      return {
//        ratings: this.food.ratings,
        showFlag: false,
        selectType: ALL,
        onlyContent: false,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      };
    },
    filters: {
//      过滤器
//      使用正则表达式实现日期显示
      ratingtime (time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
//      简单版
//      ratingtime (time) {
//        let dt = new Date(time);
//        return (dt.getFullYear() + '-' + dt.getMonth() + '-' + dt.getDate() + ' ' + dt.getHours() + ':' + dt.getMinutes());
//      }
    },
    components: {
      'v-cartcontrol': cartcontrol,
      'v-split': split,
      'v-ratingselect': ratingselect
    },
    methods: {
      _refresh (type) {
        this.selectType = type;
      },
//      显示页面
      show () {
        this.showFlag = true;
//        每次详情页开启，刷新数据
        this.selectType = ALL;
        this.onlyContent = false;

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
//      隐藏
      hide () {
        this.showFlag = false;
        this.foodScroll = null;
      },
//      加入购物车
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
      },
//      返回评论图标类型类名
      ratingicon (rating) {
        if (rating.rateType === 1) {
          return 'icon-thumb_down';
        } else {
          return 'icon-thumb_up';
        }
      },
//      根据按键,切换评价类型
      ratingshow (thistext, thistype, select) {
        if ((select === 2) || thistype === select) {
          if (!this.onlyContent || thistext.length) {
            return true;
          }
        }
      }
    }
  };
</script>

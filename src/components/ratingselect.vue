<template>
  <div class="c-ratings">
    <div class="c-ratings__header">
      <div class="c-ratings__type">
        <span class="c-ratings__type-positive" :class="{'c-ratings__posiactive':myselectType===2}"
              @click="select(2, $event)">
          {{desc.all}}
          <span class="c-ratings__type-count">{{ratings.length}}</span>
        </span>

        <span class="c-ratings__type-positive" :class="{'c-ratings__posiactive':myselectType===0}"
              @click="select(0, $event)">
        {{desc.positive}}
          <span class="c-ratings__type-count">{{positives.length}}</span>
        </span>

        <span class="c-ratings__type-negative" :class="{'c-ratings__negaactive':myselectType===1}"
              @click="select(1, $event)">
        {{desc.negative}}
          <span class="c-ratings__type-count">{{negatives.length}}</span>
        </span>
      </div>
      <div class="c-ratings__swtich">
        <i class="icon-check_circle " :class="{'c-ratings__on':myonlyContent}"
        @click="toggle($event)"></i>
        <span class="c-ratings__swtich-text">只看有内容评价</span>
      </div>
    </div>
    <ul class="c-ratings__list" v-show="ratings.length">
      <li class="c-ratings__item" v-for="rating in ratings"
          v-if="ratingshow(rating.text,rating.rateType,myselectType)">
        <div class="c-ratings__item-time">
          <span class="c-ratings__item-date">{{ratingtime(rating.rateTime)}}</span>
        </div>
        <div class="c-ratings__item-content">
          <i :class="ratingicon(rating)"></i>
          <span class="c-ratings__item-text">{{rating.text}}</span>
        </div>
        <div class="c-ratings__item-user">
          <span class="c-ratings__item-name">{{rating.username}}</span>
          <img :src="rating.avatar" height="12" width="12" class="c-ratings__item-img">
        </div>
      </li>
    </ul>
    <div class="c-ratings__norating" v-show="!ratings.length">
      还没有评价,快来评价吧！
    </div>
  </div>
</template>

<script>
  import { eventHub } from '../bus';
  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;

  export default{
    props: {
      ratings: {
        type: Array,
        default () {
          return [];
        }
      },
      selectType: {
        type: Number,
        default: ALL
      },
      onlyContent: {
        type: Boolean,
        default: true
      },
      desc: {
        type: Object,
        default () {
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          };
        }
      }
    },
    data () {
      return {
//        父组件传递数据无法写入，如需写入，需将值复制给本地变量
        myselectType: this.selectType,
        myonlyContent: this.onlyContent
      };
    },
    computed: {
//      不同评分的评论数量
      positives () {
        return this.ratings.filter((rating) => {
          return rating.rateType === POSITIVE;
        });
      },
      negatives () {
        return this.ratings.filter((rating) => {
          return rating.rateType === NEGATIVE;
        });
      }
    },
    methods: {
//      返回评论图标类型类名
      ratingicon (rating) {
        if (rating.rateType === 1) {
          return 'icon-thumb_down';
        } else {
          return 'icon-thumb_up';
        }
      },
//      根据按键类型切换
      select (type, event) {
        if (!event._constructed) {
          return;
        }
        this.myselectType = type;
        eventHub.$emit('ratingtype', type);
      },
//      根据按键内容切换
      toggle (event) {
        if (!event._constructed) {
          return;
        }
        this.myonlyContent = !this.myonlyContent;
        eventHub.$emit('onlycontent', this.myonlyContent);
      },
//      根据按键,切换评价类型
      ratingshow (thistext, thistype, select) {
        if ((select === 2) || thistype === select) {
          if (!this.myonlyContent || thistext.length) {
            return true;
          }
        }
      },
//      转化时间戳
      ratingtime (time) {
        let dt = new Date(time);
        return (dt.getFullYear() + '-' + dt.getMonth() + '-' + dt.getDate() + ' ' + dt.getHours() + ':' + dt.getMinutes());
      }
    }
  };
</script>

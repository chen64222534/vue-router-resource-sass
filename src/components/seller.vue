<template>
  <div class="l-seller" ref="lSeller">
    <div>
      <div class="l-seller__shop">
        <div class="l-seller__shop-title">
          <h2 class="l-seller__name">{{seller.name}}</h2>
          <div class="l-seller__shop-rating">
            <div class="l-seller__shop-star">
              <v-star :size="36" :score="seller.score"></v-star>
            </div>
            <span class="l-seller__shop-ratingCount">({{seller.ratingCount}})</span>
            <span class="l-seller__shop-sellCount">月售{{seller.sellCount}}单</span>
          </div>
        </div>
        <div class="l-seller__shop-desc">
          <div class="l-seller__shop-item">
            <h3 class="l-seller__shop-caption">起送价</h3>
            <span class="l-seller__shop-number">{{seller.minPrice}}</span>
            <span class="l-seller__shop-unit">元</span>
          </div>
          <div class="l-seller__shop-item">
            <h2 class="l-seller__shop-caption">商家配送</h2>
            <span class="l-seller__shop-number">{{seller.deliveryPrice}}</span>
            <span class="l-seller__shop-unit">元</span>
          </div>
          <div class="l-seller__shop-item">
            <h2 class="l-seller__shop-caption">平均配送时间</h2>
            <span class="l-seller__shop-number">{{seller.deliveryTime}}</span>
            <span class="l-seller__shop-unit">元</span>
          </div>
        </div>
        <div class="l-seller__collect" @click="collectToggle">
          <span class="icon-favorite" :class="{'active':collectState}"></span>
          <span class="l-seller__collect-text">{{collecttext}}</span>
        </div>
      </div>
      <v-split></v-split>
      <div class="l-seller__notice">
        <div class="l-seller__notice-title">
          <div class="l-seller__name">公告与活动</div>
          <div class="l-seller__notice-text">{{seller.bulletin}}</div>
        </div>
        <ul class="l-seller__notice-list">
          <li class="l-seller__notice-item" v-for="item in seller.supports">
            <v-texticon :iconType="item.type" :iconSize="2" class="l-seller__notice-icon"></v-texticon>
            <span class="l-seller__notice-introduce">{{item.description}}</span>
          </li>
        </ul>


      </div>
      <v-split></v-split>
      <div class="l-seller__overview">
        <div class="l-seller__name">商家实景</div>
        <div class="l-seller__overview-pic" ref="picScroll">
          <ul class="l-seller__pics" ref="picsList">
            <li class="l-seller__pic" v-for="img in seller.pics">
              <img :src="img" width="120" height="90">
            </li>
          </ul>
        </div>
      </div>
      <v-split></v-split>
      <div class="l-seller__details">
        <div class="l-seller__details-name">商家信息</div>
        <div class="l-seller__details-item" v-for="item in seller.infos">
          {{item}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';

  import split from '../common/split.vue';
  import star from '../common/star.vue';
  import texticon from '../common/textIcon.vue';

  export default{
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        collectState: false
      };
    },
//    生命周期页面全部加载完成后，调用方法
    mounted () {
      this._initScroll();
      this._initpicsScroll();
    },
    watch: {
//      监听数据变化，然后调用函数，绑定better-scroll
      seller: function () {
        this._initScroll();
        this._initpicsScroll();
      }
    },
    computed: {
      collecttext () {
        return this.collectState ? '已收藏' : '收藏';
      }
    },
    components: {
      'v-split': split,
      'v-star': star,
      'v-texticon': texticon
    },
    methods: {
      _initScroll () {
        this.$nextTick(() => {
          if (!this.sellerScroll) {
            this.sellerScroll = new BScroll(this.$refs.lSeller, {
              click: true
            });
          } else {
            this.sellerScroll.refresh();
          }
        });
      },
      _initpicsScroll () {
        if (this.seller.pics) {
          let picWidth = 120;
          let margin = 6;
          let listWidth = (picWidth + margin) * this.seller.pics.length - margin;
          this.$refs.picsList.style.width = listWidth + 'px';
        }
        if (!this.picsScroll) {
          this.picsScroll = new BScroll(this.$refs.picScroll, {
            scrollX: true,
//            piclist横向滚动的同时，还保留上下滚动
            eventPassthrough: 'vertical'
          });
        } else {
          this.picsScroll.refresh();
        }
      },
      collectToggle (event) {
        if (!event._constructed) {
          return;
        }
        this.collectState = !this.collectState;
      }
    }
  };
</script>

<template>

  <div class="c-shopcart" >
    <transition name="cart-transition">
      <div class="c-shopcart__details" v-if="detailState">
        <div class="c-shopcart__title">
          购物车
          <span class="c-shopcart__title-empty" @click="clearCart">清空</span>
        </div>
        <div class="c-shopcart__list" ref="cShopCart">
          <ul  >
            <li class="c-shopcart__item" v-for="item in selectFoods">
              <span class="c-shopcart__name">{{item.name}}</span>
              <span class="c-shopcart__item-price">￥{{item.price*item.count}}</span>
              <div class="c-shopcart__item-control">
                <v-cartcontrol :food="item"></v-cartcontrol>
              </div>
            </li>
          </ul>
        </div>

      </div>
    </transition>
    <div class="c-shopcart__leftContent" @click="toggleCart">
      <div class="c-shopcart__logo">
        <div class="c-shopcart__logo-icon" :class="{'highlight':countState}">
          <span class="icon-shopping_cart" :class="{'highlight':countState}"></span>
        </div>
        <div class="c-shopcart__count" v-show="countState">{{totalCount}}</div>
      </div>
      <div class="c-shopcart__total">
        <span class="c-shopcart__price" :class="{'highlight':countState}">￥{{totalPrice}}</span>
        <span class="c-shopcart__extra">另需配送费￥{{deliveryPrice}}元</span>
      </div>
    </div>
    <div class="c-shopcart__rightContent">
      <div class="c-shopcart__explain" :class="payClass">
        {{payState}}
      </div>
    </div>
  </div>
</template>

<script>
  import cartcontrol from '../common/cartcontrol.vue';
  import BScroll from 'better-scroll';

  export default{
    props: {
      selectFoods: {
        type: Array,
        default () {
          return [];
        }
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        toggle: false
      };
    },
    created () {

    },
    computed: {
      detailState () {
        if (this.totalCount) {
          if (this.toggle) {
            if (!this.shopcartScroll) {
              this.$nextTick(() => {
                this.shopcartScroll = new BScroll(this.$refs.cShopCart, {
                  click: true,
                  scrollY: true
                });
              });
            } else {
              this.shopcartScroll.refresh();
            }
            return true;
          }
        } else {
          this.toggle = false;
        }
      },
      totalPrice () {
        let price = 0;
        this.selectFoods.forEach((food) => {
          price += (food.price * food.count);
        });
        return price;
      },
      totalCount () {
        let count = 0;
        this.selectFoods.forEach((food) => {
          count += food.count;
        });
        return count;
      },
      countState () {
        if (this.totalCount > 0) {
          return true;
        }
        return false;
      },
      payState () {
        if (this.totalCount === 0) {
          return `￥${this.minPrice}起送`;
        } else if ((this.totalCount > 0) && (this.totalPrice < this.minPrice)) {
          let dif = this.minPrice - this.totalPrice;
          return `还差￥${dif}起送`;
        } else {
          return '去结算';
        }
      },
      payClass () {
        if (this.totalPrice >= this.minPrice) {
          return 'c-shopcart__enough';
        } else {
          return 'c-shopcart__noenough';
        }
      }
    },
    components: {
      'v-cartcontrol': cartcontrol
    },
    methods: {
//      清空购物车
      clearCart () {
        this.selectFoods.forEach((food) => {
          food.count = 0;
        });
      },
      toggleCart () {
        if (!this.totalCount) {
          return;
        }
        this.toggle = !this.toggle;
      }
    }
  };
</script>

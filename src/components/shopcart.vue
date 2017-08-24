<template>

  <div class="c-shopcart" @click="toggleCart">
    <transition name="mark-transition" >
      <div class="c-shopcart__mark" v-if="detailState"></div>
    </transition>
    <transition name="cart-transition">
      <div class="c-shopcart__details" v-if="detailState">
        <div class="c-shopcart__title">
          购物车
          <span class="c-shopcart__title-empty" @click.stop="clearCart">清空</span>
        </div>
        <div class="c-shopcart__list" ref="cShopCart">
          <ul>
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
    <div class="c-shopcart__leftContent" >
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
    <div class="c-shopcart__rightContent" @click.stop.prevent="pay">
      <div class="c-shopcart__explain" :class="payClass">
        {{payState}}
      </div>
    </div>

    <div class="c-shopcart__balls">
      <transition v-for="ball in balls" :key="ball.show" name="ball-transition" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
        <div class="c-shopcart__ball" v-show="ball.show">
          <div class="c-shopcart__ball-inner"></div>
        </div>
      </transition>
    </div>

  </div>
</template>

<script>
  import cartcontrol from '../common/cartcontrol.vue';
  import BScroll from 'better-scroll';
  import { eventHub } from '../bus';

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
        toggle: false,
        balls: [
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          }
        ],
        dropBalls: []
      };
    },
    created () {
      eventHub.$on('cart-add', this._cartAdd);
    },
    beforeDestroy () {
//      不清除事件监听会有什么问题???
      eventHub.$off('cart-add', this.cartAdd);
    },
    computed: {
//      购物车详情页状态判断
      detailState () {
        if (this.totalCount) {
          if (this.toggle) {
            if (!this.shopcartScroll) {
//              为购物车详情派发事件，商品数量的点击及滚动
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
//      选中商品价格总和
      totalPrice () {
        let price = 0;
        this.selectFoods.forEach((food) => {
          price += (food.price * food.count);
        });
        return price;
      },
//      合计选中商品数量总和
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
//      支付按键状态
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
//      不同支付状态样式
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
//      获取被点击的的加号
      _cartAdd (target) {
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i];
          if (!ball.show) {
            ball.show = true;
            ball.el = target;
            this.dropBalls.push(ball);
            return;
          }
        }
      },
//      飞入购物车，运动状态
      beforeEnter (el) {
        let count = this.dropBalls.length;
        while (count--) {
          let ball = this.dropBalls[count];
          if (ball.show) {
            let Rect = ball.el.getBoundingClientRect();
            let y = -(window.innerHeight - Rect.top - 22);
            let x = Rect.left - 32;
            el.style.display = '';
            el.style.transform = `translatey(${y}px)`;
            let inner = el.getElementsByClassName('c-shopcart__ball-inner')[0];
            inner.style.transform = `translatex(${x}px)`;
          }
        }
      },
      enter (el) {
        /* eslint-disable no-unused-vars */
        let rf = el.offsetHeight;
//      访问元素几何属性，将使浏览器重绘页面
        this.$nextTick(() => {
          el.style.transform = 'translatey(0)';
          let inner = el.getElementsByClassName('c-shopcart__ball-inner')[0];
          inner.style.transform = 'translatex(0)';
        });
      },
      afterEnter (el) {
        let ball = this.dropBalls.shift();
        if (ball) {
          ball.show = false;
          el.style.display = 'none';
        }
      },
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
        this.shopcartScroll = null;
      },
//      结算
      pay () {
        if (this.totalPrice < this.minPrice) {
          return;
        }
        alert('未开发');
      }
    }
  };
</script>

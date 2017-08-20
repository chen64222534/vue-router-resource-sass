<template>
  <div class="c-shopcart">
    <div class="c-shopcart__leftContent">
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
    computed: {
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
    methods: {
    }
  };
</script>

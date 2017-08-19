<template>
  <div class="c-shopcart">
    <div class="c-shopcart__leftContent">
      <div class="c-shopcart__logo">
        <div class="c-shopcart__logo-icon">
          <span class="icon-shopping_cart"></span>
        </div>
        <div class="c-shopcart__count">{{totalCount}}</div>
      </div>
      <div class="c-shopcart__total">
        <span class="c-shopcart__price">￥{{totalPrice}}</span>
        <span class="c-shopcart__extra">另需配送费￥{{deliveryPrice}}元</span>
      </div>

    </div>
    <div class="c-shopcart__rightContent">
      <div class="c-shopcart__explain">
        ￥{{minPrice}}起送
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
          return [{price: 10,
            count: 4}, {price: 20,
              count: 1}];
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
      }
    }
  };
</script>

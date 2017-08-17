<template>
  <div class="l-goods">

    <ul class="l-goods__sidebar ">
      <li class="l-goods__sidebar-item" v-for="item in goods">
        <div class="c-sidebar__text">
          <v-icon v-show="item.type>0" :iconType="item.type" :iconSize="3" ></v-icon>{{item.name}}
        </div>
      </li>
    </ul>

    <div class="l-goods__food ">
      <ul>
        <li class="l-goods__food-item c-food" v-for="item in goods" >
          <h1 class="c-food__title">{{item.name}}</h1>
          <ul>
            <li class="c-food__list-item" v-for="food in item.foods">
              <div class="c-food__icon">
                <img :src="food.icon" class="c-food__icon-img">
              </div>
              <div class="c-food__content">
                <h2 class="c-food__content-name">{{food.name}}</h2>
                <div class="c-food__content-kind" v-if="food.description">{{food.description}}</div>
                <div class="c-food__content-extra">
                  <span class="c-food__content-sell">月售{{food.sellCount}}</span><span>好评率{{food.rating}}%</span>
                </div>
                <div class="c-food__content-price">
                  <span >￥{{food.price}}</span><span v-if="food.oldPrice" class="c-food__content-oldPrice">￥{{food.oldPrice}}</span>
                </div>
              </div>
              <div class="c-food__count">
                <span class="c-food__count-subtarct"></span>
                <span class="c-food__count-number"></span>
                <span class="c-food__count-add"></span>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import textIcon from '../common/textIcon.vue';

  const ERR_OK = 0;

  export default{
    props: {
      seller: {
        type: Object
      },
      classMap: {
        type: Array
      }
    },
    data () {
      return {
        goods: []
      };
    },
    created () {
      this.$http.get('/api/goods').then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.goods = response.data;
//          console.log(response);
        }
      }, (response) => {
      }
     );
    },
    components: {
      'v-icon': textIcon
    }
  };
</script>


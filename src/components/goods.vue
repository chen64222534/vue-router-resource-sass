<template>
  <div class="l-goods">

    <div class="l-goods__sidebar" ref="lGoodsSidebar">
      <ul>
        <li class="l-goods__sidebar-item" v-for="(item, index) in goods" :class="{'active':currentIndex===index}" @click="clickSidebar(index, $event)">
          <div class="c-sidebar__text">
            <v-icon v-show="item.type>0" :iconType="item.type" :iconSize="3"></v-icon>
            {{item.name}}
          </div>
        </li>
      </ul>
    </div>
    <div class="l-goods__food" ref="lGoodsFood">
      <ul>
        <li class="l-goods__food-item c-food c-food-hook" v-for="item in goods" >
          <h1 class="c-food__title">{{item.name}}</h1>
          <ul>
            <li class="c-food__item" v-for="food in item.foods">
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
              <div class="c-food__control">
                <v-cartcontrol :food="food"></v-cartcontrol>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="l-goods__shopcart">
      <v-shopcart :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice" :select-foods="selectFoods"></v-shopcart>
    </div>
  </div>
</template>

<script>
  import shopcart from './shopcart.vue';
  import cartcontrol from '../common/cartcontrol.vue';
  import textIcon from '../common/textIcon.vue';
  import BScroll from 'better-scroll';

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
        goods: [],
        listHeight: [],
        scrollY: 0
      };
    },
    computed: {
//      获取当前高度对应区间
      currentIndex () {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i;
          }
        }
        return 0;
      },
//      获取选中商品数量
      selectFoods () {
        let foods = [];
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food);
            }
          });
        });
        return foods;
      }
    },
    created () {
      this.$http.get('/api/goods').then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.goods = response.data;
          this.$nextTick(() => {
            this._initScroll();
            this._calculateHeight();
          });
        }
      }, (response) => {
      }
     );
    },
    components: {
      'v-icon': textIcon,
      'v-shopcart': shopcart,
      'v-cartcontrol': cartcontrol
    },
    methods: {
//      better-scroll绑定模块，及监听scroll事件
      _initScroll () {
        this.foodScroll = new BScroll(this.$refs.lGoodsFood, {
          click: true,
          probeType: 3
        });
        this.sidebarScroll = new BScroll(this.$refs.lGoodsSidebar, {
          click: true
        });

        this.foodScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
        });
      },
//      创建food每个组对应高度的数组
      _calculateHeight () {
        let foodList = this.$refs.lGoodsFood.getElementsByClassName('c-food-hook');
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
      },
//      点击sidebar,滚动food
      clickSidebar (index, event) {
        if (!event._constructed) {
          return;
        }
        let foodList = this.$refs.lGoodsFood.getElementsByClassName('c-food-hook');
        let el = foodList[index];
        this.foodScroll.scrollToElement(el, 1000);
      }
    }
  };
</script>


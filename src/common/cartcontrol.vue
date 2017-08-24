<template>
  <div class="c-cartcontrol">
    <transition name="move-transition">
      <div class="c-cartcontrol__subtract" v-show="food.count>0" @click.stop="subtractCart">
        <span class="icon-remove_circle_outline"></span>
      </div>
    </transition><div class="c-cartcontrol__number" v-show="food.count>0">{{food.count}}</div><div class="c-cartcontrol__add icon-add_circle" @click.stop="addCart"></div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import { eventHub } from '../bus';

  export default{
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      addCart (event) {
        if (!event._constructed) {
          return;
        }
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1);
        } else {
          this.food.count++;
        }
//        异步执行动画，体验优化
        this.$nextTick(() => {
          eventHub.$emit('cart-add', event.target);
        });
      },
      subtractCart (event) {
        if (!event._constructed) {
          return;
        }
        if (this.food.count > 0) {
          this.food.count--;
        }
      }
    }
  };
</script>

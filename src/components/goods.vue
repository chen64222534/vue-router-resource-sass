<template>
  <div class="l-goods">

    <ul class="l-goods__sidebar ">
      <li class="l-goods__sidebar-item" v-for="item in goods">
        <span class="c-sidebar__text">
          <v-icon v-show="item.type>0" :iconType="item.type" :iconSize="3" ></v-icon>{{item.name}}
        </span>
      </li>
    </ul>

    <div class="l-goods__food">

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


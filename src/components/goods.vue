<template>
  <div class="l-goods">
    <div class="l-goods__sidebar ">
      <div class="l-goods__sidebar-item" v-for="i in goods">
        <span class="c-sidebar__icon"></span>
        <span class="c-sidebar__text">{{goods.name}}</span>
      </div>
    </div>
    <div class="l-goods__food">

    </div>
  </div>
</template>

<script>
  export default{
    props: {
      goods: {
        type: Object
      }
    },
    created () {
      this.$http.get('/api/goods').then((response) => {
        this.goods = response;
        console.log(response);
      }, (response) => {
      }
     );
    }
  };
</script>


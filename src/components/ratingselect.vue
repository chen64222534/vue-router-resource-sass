<template>
  <div class="c-ratings">
    <div class="c-ratings__header">
      <ul class="c-ratings__label">
        <li class="c-ratings__label-item">{{ratings.text}}</li>
      </ul>
      <div class="c-ratings__select">
        <i class=""></i>只看有内容评价
      </div>
    </div>
    <div class="c-ratings__content"></div>
  </div>
</template>

<script>
  export default{
    props: {
      ratings: {
        type: Array
      }
    }
  };
</script>

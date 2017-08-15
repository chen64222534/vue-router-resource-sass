<template>
  <span class="c-icon" :class="[showIconSize,showIconType]"></span>
</template>

<script>
  export default {
    props: {
      iconSize: {
        type: Number
      },
      iconType: {
        type: Number
      }
    },
    created () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    computed: {
      showIconSize () {
        return 'c-icon__' + this.iconSize;
      },
      showIconType () {
        return this.classMap[this.iconType];
      }
    }
  };
</script>

<template>
<div class="main">
  <navigation-bar :navTitle='navTitle'></navigation-bar>
  <div class="content">
    <img src="https://act.bomaleye.com/teacher-rule.png" alt="">
  </div>
</div>
</template>

<script>
import navigationBar from '../../components/common/navigation-bar'
export default {
  components: {
    navigationBar
  },
  data () {
    return {
      navTitle: '比赛规则'
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@function pxTorem($px, $base-font-size: 75px) {
  @if (unitless($px)) {
    @warn "Assuming #{$px} to be in pixels, attempting to convert it into pixels for you";
    @return px2em($px + 0px); // That may fail.
  } @else if (unit($px) == em) {
    @return $px;
  }
  @return ($px / $base-font-size) * 1rem;
}

.main {
  min-height: 100%;
  width: 100%;
  background: linear-gradient(0deg, #0D061B 0%, #170637 100%);
  .content {
    padding: pxTorem(200px) pxTorem(30px) pxTorem(30px) pxTorem(30px);
    box-sizing: border-box;

    img {
      width: 100%;
    }
  }
}
</style>
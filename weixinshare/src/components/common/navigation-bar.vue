<template>
  <div class="wallet-nav">
    <img src="https://img.bomaleye.com/image/activity_backing_icon.png"
         alt=""
         @click="routerBack" />
    <span>{{navTitle}}</span>
    <span v-if="rightTitle"
          class="right_title"
          @click="rightTitleClick">{{rightTitle}}</span>
  </div>
</template>
<script>
export default {
  props: ['navTitle', 'rightTitle'],
  data () {
    return {

    }
  },
  created () {
  },
  methods: {

    routerBack(){
      this.$router.go(-1);
      this.$emit('backTo')
    },
    rightTitleClick(){
      this.$emit('rightTitleClick')
    }
  }

}
</script>
<style  lang="scss" rel="stylesheet/scss" scoped>
@function pxTorem($px, $base-font-size: 75px) {
  @if (unitless($px)) {
    @warn "Assuming #{$px} to be in pixels, attempting to convert it into pixels for you";
    @return px2em($px + 0px); // That may fail.
  } @else if (unit($px) == em) {
    @return $px;
  }
  @return ($px / $base-font-size) * 1rem;
}
.wallet-nav {
  width: 100%;
  position: fixed;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  height: pxTorem(120px);
  border-bottom: 1px solid #3c3951;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(6, 1, 42, 0.6);
  z-index: 3000;
  img {
    left: pxTorem(32px);
    position: absolute;
  }
  img:nth-child(1) {
    width: pxTorem(18px);
    height: pxTorem(32px);
  }
  span {
    font-size: pxTorem(32px);
    font-family: PingFang SC;
    font-weight: 550;
    color: #ffffff;
    line-height: pxTorem(38px);
  }
  .right_title {
    position: absolute;
    top: 0;
    right: pxTorem(0px);
    height: 100%;
    line-height: pxTorem(120px);
    padding: 0 pxTorem(30px);
    font-size: pxTorem(28px);
  }
}
</style>


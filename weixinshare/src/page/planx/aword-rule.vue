
<template>
    <div class="main" title="奖项设置">
    <navigation-bar navTitle="奖项设置"></navigation-bar>
    <div  class="content">
      <img class="margin-top" v-lazy="'https://act.bomaleye.com/award_setting2.png'" />
      <!-- <img class="margin-top" src="http://act.bomaleye.com/planx_rules_type.png" alt="">
      <img class="margin_top" src="http://act.bomaleye.com/planx_rules_standard.png" alt="">
      <img class="margin_top" src="http://act.bomaleye.com/planx_rules_content.png" alt="">
      <img class="margin_top" src="http://act.bomaleye.com/planx_rules_flow.png" alt=""> -->
      <div class="join" @click="join">
        <img src="https://act.bomaleye.com/planx_btn_bg.png"
             alt="">
        <span>我要参赛</span>
      </div>
    </div>
    </div>
</template>

<script>
import navigationBar from '../../components/common/navigation-bar'
export default {
  components: {
    navigationBar
  },
  methods:{
    join(){
      this.$router.push({
        path: '/planxSelectJoinType'
      });
    },
    // back(){
    //  // console.log("返回");
    //   this.$router.go(-1);//返回上一层
    // }
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
  height: auto;
  width: 100%;
  min-height: 100%;
  background: url(https://act.bomaleye.com/planx_home_bg.png)  no-repeat;
  background-size: 100% 100%;
  .title {
    height: pxTorem(107px);
    padding: 0 pxTorem(30px);
    display: flex;
    justify-content: space-between;
    align-items: center;
    .back {
      width: pxTorem(50px);
    }
    .title_text {
      font-weight: bold;
      font-size: pxTorem(33px);
      color: #ffffff;
    }
  }
  .title_bottom_line {
    background-color: #3C3951;
    width: 100%;
    height: pxTorem(1px);
  }
  .content {
    height: inherit;
    overflow-y: auto;
    padding: pxTorem(0px) pxTorem(30px) pxTorem(0px) pxTorem(30px);

    .margin-top {
      margin-top: pxTorem(120px);
    }
    img {
      width: 100%;
    }
    .margin_top {
      margin-top: pxTorem(50px);
    }
    .join {
      margin-bottom: pxTorem(100px);
      margin-top: pxTorem(70px);
      display: flex;
      justify-content: space-around;
      position: relative;
      img {
        width: pxTorem(432px);
        height: pxTorem(100px);
      }
      span {
        position: absolute;
        height: 100%;
        line-height: pxTorem(90px);
      }
    }
  }
}
</style>
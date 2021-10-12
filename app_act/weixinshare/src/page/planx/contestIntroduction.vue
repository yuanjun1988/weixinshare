<template>
  <div class="main" title="大赛简介">
    <!-- <div class="title">
      <div class="back" @click="back">
        <img src="https://act.bomaleye.com/planx_back_white.png"
             alt="">
      </div>
      <span class="title_text">大赛规则</span>
      <span class="back" />
    </div> -->
    <navigation-bar navTitle="大赛简介"></navigation-bar>
    <div class="title_bottom_line"></div>
    <div class="content">
      <img class="margin-top" src="http://act.bomaleye.com/Introduction_text1.png"
           alt="">
      <div class="join" @click="join">
        <img src="http://act.bomaleye.com/planx_btn_bg.png"
             alt="">
        <span>我要参赛</span>
      </div>
    </div>

  </div>
</template>

<script>
import navigationBar from '../../components/common/navigation-bar'
import tools from "../../common/tools"
import { Toast } from 'vant'
export default {
  components: {
    navigationBar
  },
  methods:{
    join(){
       if(tools.sessiongetItem("userType") == 0){
        Toast('请切换成千里马身份参加活动');
        return;
      }
      this.$router.push({
        path: '/planxSelectJoinType'
      });
    },
    back(){
    //  console.log("返回");
      this.$router.go(-1);
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
  height: auto;
  width: 100%;
  background: url(http://act.bomaleye.com/planx_home_bg.png) no-repeat;
  background-size: 100% 100%;
  padding-top: pxTorem(60px);
  // height: inherit;
  // background-color: #06012a;
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
      margin-top: pxTorem(140px);
    }
    img {
      width: 100%;
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
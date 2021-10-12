<template>
  <div class="main"
       title="评审团">
    <navigation-bar navTitle="评审团"></navigation-bar>
    <div class="content">
      <div class="content_">
        <img style="width: 100%;" src="https://act.bomaleye.com/planx_jury.png" alt="">
        <!-- <div v-for="(item,index) in jury"
             :key="index"
             class="jury_item">
          <span class="name">{{item.name}}</span>
          <div style="display: inline-block;width: 100%;">
            <div v-for="(itemPerson,indexPerson) in item.person"
                 :key="indexPerson"
                 class="jury_item_img">
              <img src=""
                   alt=""
                   class="img_person">
              <span class="user_name">{{itemPerson.userName}}</span>
            </div>
          </div>
          <div class="desc">
            <span class="company">{{item.company}}</span>
            <span class="companyDesc">{{item.companyDesc}}</span>
          </div>
        </div> -->
        <div class="join"
             @click="join">
          <img src="https://act.bomaleye.com/planx_btn_bg.png"
               alt="">
          <span>我要参赛</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navigationBar from '../../components/common/navigation-bar'
import juryData from "../../assets/juryData.json"
export default {
  components: {
    navigationBar
  },
  name: "jury",
  data () {
    return {
      jury: []
    }
  },
  created () {
    this.jury = juryData.datas
  },
  methods: {
    join () {
      this.$router.push({
        path: '/planxSelectJoinType'
      });
    },
    // back(){
    // //  console.log("返回");
    //   this.$router.go(-1);
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
  background: url(https://act.bomaleye.com/planx_home_bg.png) no-repeat;
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
    background-color: #3c3951;
    width: 100%;
    height: pxTorem(1px);
  }
  .content {
    height: inherit;
    overflow-y: auto;
    padding: pxTorem(0px) pxTorem(30px) pxTorem(0px) pxTorem(30px);
    .content_ {
      padding-top: pxTorem(120px);
    }
    .jury_item {
      background: url(https://act.bomaleye.com/planx_promotional_bg.png);
      background-size: 100% 100%;
      padding: pxTorem(40px);
      margin-bottom: pxTorem(40px);
      .name {
        color: #ffffff;
        font-size: pxTorem(28px);
        display: block;
        width: 100%;
        text-align: center;
        margin: pxTorem(40px) 0;
        font-weight: 600;
      }
      .desc {
        padding: pxTorem(10px) 0 pxTorem(20px) 0;
        font-size: pxTorem(24px);
        .company {
          color: #fcf24f;
        }
        .companyDesc {
          color: white;
        }
      }
      .user_name {
        color: #ffffff;
        font-size: pxTorem(28px);
        display: block;
        width: 100%;
        text-align: center;
      }
      .jury_item_img {
        width: 33.3%;
        float: left;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: pxTorem(10px);
        flex-direction: column;
        .img_person {
          width: pxTorem(188px);
          height: pxTorem(255px);
          background: #232323;
          border: pxTorem(1px) solid;
          border-image: linear-gradient(0deg, #fc4ff4, #2effff) 10 10;
        }
      }
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
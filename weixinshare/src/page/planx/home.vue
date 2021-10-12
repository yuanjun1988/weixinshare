<template>
  <div class="main"
       @scroll="scrollEvent">
    <img class="share"
         @click="showShareBox = true"
         src="https://act.bomaleye.com/planx_share.png"
         alt="">
     <div style="width: 100%;">
      <img src="https://act.bomaleye.com/planx_home_top_bg2.png"
           style="width: 100%;"
           alt="">
      
      <div :class="bottom_type"
           ref="bottom_type"
           id="bottom_type">
        <div style="position: relative;">
          <img src="https://act.bomaleye.com/planx_type_select1.png"
               alt=""
               style="width: 100%;">
          <div class="select_type_btn_">
            <div class="working_people"
                 @click="workingPeople"></div>
            <div class="students"
                 @click="students"></div>
          </div>
        </div>
      </div>
    </div> 
    <!-- 活动流程 -->
    <img src="https://act.bomaleye.com/planx_match_time2.png"
         alt=""
         style="width:100%;">

    <!-- 活动视频 -->
    <div class="promotional_video">
     
      <div class="div_play">
        <img class="play"
             src="https://act.bomaleye.com/planx_play.png"
             alt="" @click="playVideo" v-if="isShow">
      </div>
      <van-swipe class="my-swipe"
                 :autoplay="3000"
                 :show-indicators="false">
        <van-swipe-item v-for="(image, index) in images"
                        :key="index">
          <video class="video_box" id="video_box" loop webkit-playsinline="true"  x5-video-player-type="h5-page"
                        x5-video-player-fullscreen="true" playsinline preload="auto" poster="https://v.bomaleye.com/bmlyactive0317.mp4?vframe/png/offset/2"
                         :src="image">
                </video>
        </van-swipe-item>
      </van-swipe>
    </div>

    <!-- 活动其他入口 -->
    <div class="other_activities_entry">
      <div style="position: relative;">
        <img class="img_bg"
             src="https://act.bomaleye.com/planx_home_item_title10.png"
             alt="">
        <span class="title">活动其他入口</span>
      </div>
      <div class="planx_home_item_bg">
         <div class="clear">

          <div class="float_left"
               style="position: relative;">
            <span class="bg1 float_left"
                  @click="entry(1)">比赛规则</span>
            <img class="clickme"
                 src="https://act.bomaleye.com/clickme1.png"
                 alt="">
          </div>

          <div class="float_right"
               style="position: relative;">
            <span class="bg2 float_right"
                  @click="entry(2)">参赛作品</span>
            <img class="clickme"
                 src="https://act.bomaleye.com/clickme1.png"
                 alt="">
          </div>
        </div>

        <div class="clear">

          <div class="float_left"
               style="position: relative;">
            <span class="bg2 float_left"
                  @click="entry(3)">评审团</span>
            <img class="clickme"
                 src="https://act.bomaleye.com/clickme1.png"
                 alt="">
          </div>

          <!-- <span class="bg1 float_right"
                @click="entry(4)">奖项设置</span> -->

          <div class="float_right"
               style="position: relative;">
            <span class="bg1 float_right"
                  @click="entry(4)">奖项设置</span>
            <img class="clickme"
                 src="https://act.bomaleye.com/clickme1.png"
                 alt="">
          </div>
        </div>

        <div class="clear">
          <div class="float_left"
               style="position: relative;">
            <span class="bg1"
                  @click="entry(5)">排行榜单</span>
            <img class="planx_mark"
                 src="https://act.bomaleye.com/planx_mark.png"
                 alt="">
          </div>
          <div class="float_right"
               style="position: relative;">
            <span class="bg2 float_right"
                  @click="entry(6)">大赛简介</span>
            <img class="clickme"
                 src="https://act.bomaleye.com/clickme1.png"
                 alt="">
          </div>

        </div>
        
      </div>
    </div>

    <!-- 大赛协办单位 -->
    <div class="other_activities_entry">
      <div style="position: relative;">
        <img class="img_bg"
             src="https://act.bomaleye.com/planx_home_item_title10.png"
             alt="">
        <span class="title">大赛合作单位</span>
      </div>

      <div class="planx_home_item_bg planx_home_item_bg1">
        <div class="planx_company"
             v-for="(item,index) in company"
             :key="index">
          <img class="company_img"
               :src="item.url"
               alt="">
          <span class="company_name">{{item.name}}</span>
        </div>
      </div>
    </div>

    <!-- 参赛须知 -->
    <img class="entry_information"
         src="https://act.bomaleye.com/planx_entry_Information10.png"
         alt="">
    <van-popup v-model="showShareBox"   style="opacity:0.6;background:#000000;height:100%;z-index:9999" close-icon-position :close-on-click-overlay="true"  position="top">
      <div style="width:100%;height:100%;text-align:center" @click="showShareBox = false">
          <img class="share_icon" src="http://img.bomaleye.com/20210318112550266_5427" alt="" style="width:70%;height:30%">
      </div>
  </van-popup>
  </div>
  
</template>

<script>
import tools from "../../common/tools"
import {getWxSignature } from "../../api/index"
import wx from 'weixin-js-sdk'
import {Toast} from 'vant'
export default {
  name: "jury",
  data () {
    return {
      company: [
        { url: "https://act.bomaleye.com/planx_company1.png", name: "健力宝",fullName:"广东健力宝股份有限公司" },
        { url: "https://act.bomaleye.com/planx_company2.png", name: "联慧科技" ,fullName:"联慧科技" },
        { url: "https://act.bomaleye.com/planx_company3.png", name: "美世教育" ,fullName:"美世教育"},
        { url: "https://act.bomaleye.com/planx_company4.jpg", name: "百容捷" ,fullName:"陕西百容捷信息科技有限公司" },
        { url: "https://act.bomaleye.com/planx_company5.jpg", name: "赋腾科技",fullName:"西安赋腾信息科技有限公司"},
        { url: "https://act.bomaleye.com/planx_company6.png", name: "鲸准网络",fullName:"西安鲸准网络科技有限公司" }, 
        { url: "https://act.bomaleye.com/planx_company7.jpg", name: "企管家",fullName:"西安企业管家科技有限公司"  },
        { url: "https://act.bomaleye.com/planx_company8.jpg", name: "兴中猎头",fullName:"西安兴中猎头人力资源有限责任公司"  }
      ],
      bottom_type: "scoll",
      images: [
        'https://v.bomaleye.com/bmlyactive0317.mp4'
      ],
      typeTopHeight: 0,
      isShow: true,
      showShareBox: false
    }
  },
  mounted () {
    this.getTypeTopHeight();
    this.getWxSignature ();
  },
  methods: {
    getTypeTopHeight () {
     // this.typeTopHeight = document.getElementById("bottom_type").getBoundingClientRect().top;
    },
    scrollEvent (e) {
      // if (e.target.scrollTop <= this.typeTopHeight && this.bottom_type == 'bottom') {
      //   this.bottom_type = 'scoll';
      // }
      // if (e.target.scrollTop > this.typeTopHeight && this.bottom_type == 'scoll') {
      //   this.bottom_type = 'bottom';
      // }
    },
    playVideo() {
        let video = document.querySelectorAll('video')[0];
        this.isShow = false;
        video.play();
    },
    getWxSignature () {
      let params = {
        url: window.location.href.split('#')[0]
      }
      getWxSignature(params).then(res => {
        let data = res.datas;
        let that = this;
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: data.appId, // 必填，公众号的唯一标识
          timestamp: data.timeStamp, // 必填，生成签名的时间戳
          nonceStr: data.nonceStr, // 必填，生成签名的随机串
          signature: data.signature,// 必填，签名
          jsApiList: [
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'onMenuShareQQ',
                'onMenuShareQZone'
            ]
        })
        wx.ready(function () {      
              wx.onMenuShareAppMessage({
                      title: '2021“PLAN-X人才计划”短视频春季挑战赛', // 分享标题
                      desc: '自信表达，万元大奖，够牛你就拍起来', // 分享描述
                      link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                      imgUrl: 'http://img.bomaleye.com/2021031618145989_680', // 分享图标
                      success: function () {
                          // this.setActShareStatus()
                          // Toast('分享成功');
                      }
                  });
                  wx.onMenuShareTimeline({ 
                      title: '2021“PLAN-X人才计划”短视频春季挑战赛', // 分享标题
                      link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                      imgUrl: 'http://img.bomaleye.com/2021031618145989_680', // 分享图标
                      success: function () {
                          // this.setActShareStatus()
                          // Toast('分享成功');
                      }
                  })
          })
      })

    },
    // 职场人
    workingPeople () {
      tools.localsetItem('personType', 1)
      if (!tools.localgetItem('token')) {
        this.$router.push({
          path: '/actLogin'
        })
        return;
      }
      this.$router.push({
        path: '/planxSelectJoinType'
      })
    },
    // 学生
    students () {
      tools.localsetItem('personType', 2)
      if (!tools.localgetItem('token')) {
        this.$router.push({
          path: '/actLogin'
        })
        return;
      }

      this.$router.push({
        path: '/planxSelectJoinType'
      })
    },
    entry (type) {
      if (!tools.localgetItem('token')) {
        this.$router.push({
          path: '/actLogin'
        })
        return;
      }
      switch (type) {
        case 1:
          // console.log("比赛规则");
          this.$router.push({
            path: '/planxContestRules'
          })
          break;
        case 2:
          // console.log("参赛作品");
          this.$router.push({
            path: '/activityCenter'
          })
          break;
        case 3:
          // console.log("评审团");
          this.$router.push({
            path: '/planxJury'
          })
          break;
        case 4:
          // console.log("奖项设置");
          this.$router.push({
            path: '/awordRule'
          })
          break;
        case 5:
          // console.log("排行榜单");
          break;
        case 6:
          //  console.log("大赛简介");
          this.$router.push({
            path: '/planxContestIntroduction'
          })
          break;
      }
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
  min-height: 100%;
  background: url(https://act.bomaleye.com/planx_home_bg.png) no-repeat;
  background-size: 100% 100%;
  // overflow-y: auto;
  display: flex;
  flex-direction: column;
      align-items: center;
  .my-swipe {
    width: calc(100% - pxTorem(5px) );
    height: pxTorem(490px);
    border-radius: pxTorem(20px);
    margin: pxTorem(10px) pxTorem(10px) pxTorem(10px) pxTorem(10px);
  }
  .video_box {
      width: 100%;
    height: 100%;
    background: black;
  }
  .select_type_btn_ {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    .working_people,
    .students {
      width: pxTorem(314px);
      margin: pxTorem(40px) 0;
    }
  }
  .share {
    position: fixed;
    width: pxTorem(53px);
    height: pxTorem(48px);
    top: pxTorem(50px);
    right: pxTorem(30px);
    z-index: 10;
  }
  .clear {
    clear: both;
  }
  .promotional_video {
    // display: inline-block;
    position: relative;
    height: pxTorem(530px);
    width: calc(100% - 60px);
    padding: 0 pxTorem(10px);
    top: 0;
    margin: pxTorem(55px) pxTorem(30px) 0 pxTorem(30px);
    background: url(https://act.bomaleye.com/planx_promotional_video_bg1.png)
      no-repeat;
    background-size: 100% 100%;
    .video {
      height: pxTorem(415px);
      width: calc(100% - 60px);
      display: inline-block;
      margin: 30px;
      z-index: 9;
    }
    .div_play {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 999;
    }
  }

  // 其他活动入口
  .other_activities_entry {
    background-size: 100% 100%;
    position: relative;
    margin-bottom: pxTorem(57px);
    .planx_company {
      display: flex;
      align-items: center;
      flex-direction: column;
      display: inline-block;
      text-align: center;
      margin: 0 auto;
      width: 25%;
    }
    span {
      font-size: pxTorem(32px);
      font-weight: 400;
      color: #ffffff;
      width: pxTorem(250px);
      height: pxTorem(105px);
      display: inline-block;
      text-align: center;
      line-height: pxTorem(105px);
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .float_right {
      float: right;
    }
    .float_left {
      float: left;
    }

    .planx_mark {
      width: pxTorem(87px);
      position: absolute;
      right: pxTorem(-20px);
      top: 0%;
      z-index: 99;
    }

    .clickme {
      width: pxTorem(73px);
      position: absolute;
      right: pxTorem(-20px);
      top: 0%;
      z-index: 99;
    }
    .bg1 {
      background: url("https://act.bomaleye.com/planx_home_item_bg1.png")
        no-repeat;
      background-size: 100% 100%;
    }
    .bg2 {
      background: url("https://act.bomaleye.com/planx_home_item_bg2.png")
        no-repeat;
      background-size: 100% 100%;
    }
    .title {
      position: absolute;
      top: 0px;
      left: 0px;
      font-weight: 500;
      font-size: pxTorem(30px);
      color: #fcf24f;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .planx_home_item_bg {
      background: url("https://act.bomaleye.com/planx_home_item_bg10.png")
        no-repeat;
      background-size: 100% 100%;
      margin: 0 pxTorem(30px);
      padding: pxTorem(60px) pxTorem(75px) pxTorem(180px) pxTorem(75px);
      .company_name {
        font-size: pxTorem(24px);
        font-weight: 500;
        color: #ffffff;
        width: auto;
        height: auto;
        line-height: normal;
        display: block;
      }
      .company_img {
        width: pxTorem(120px);
        height: pxTorem(120px);
        border-radius: 50%;
        display: inline-block;
        border-image: linear-gradient(-90deg, #fc4ff4, #2effff) 10px 10;
        border: pxTorem(3px) solid;
      }
    }

    .planx_home_item_bg1 {
      padding: pxTorem(60px) pxTorem(75px) pxTorem(90px) pxTorem(75px);
    }
    .img_bg {
      // padding: pxTorem(90px) pxTorem(30px) pxTorem(60px) pxTorem(30px);
      width: 100%;
      box-sizing: border-box;
      display: block;
      padding: 0 pxTorem(30px);
    }
  }
  .entry_information {
    padding: pxTorem(0px) pxTorem(30px) pxTorem(112px) pxTorem(30px);
    width: 100%;
    box-sizing: border-box;
    margin-bottom: pxTorem(100px);
  }

  .bottom {
    position: fixed;
    // position: absolute;
    bottom: 0px;
    width: 100%;
    z-index: 9999;
  }

  .scoll {
    position: fixed;
   // position: absolute;
    bottom: 0px;
    width: 100%;
    z-index: 100;
  }
}
</style>
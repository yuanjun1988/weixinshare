<template>
  <div class="main">
    <div class="content">
        <img class="con-header" src="http://img.bomaleye.com/20210707143731955_2867" alt="">
        <img class="act-step" src="https://act.bomaleye.com/teacher-flow-time1.png" alt="">
        <div class="act-rule">
            <div class="rule-item" @click="routerToPage(1)">
                比赛规则
            </div>
            <div class="rule-item" @click="routerToPage(2)">
                评审团
            </div>
            <div class="rule-item" @click="routerToPage(3)">
                大赛简介
            </div>
            <div class="rule-item" @click="downloadApp">
                报名作品
            </div>
            <div class="rule-item" @click="routerToPage(5)">
                奖项设置
            </div>
            <div class="rule-item" @click="downloadApp">
                实时榜单
            </div>
        </div>
        <img class="act-intro" src="https://act.bomaleye.com/teacher-cooperation1.png" alt="">
        <div class="bottom">
            <span class="button"
                    style="background: url('https://act.bomaleye.com/teacher-btn-bg1.png') no-repeat center;" @click="downloadApp">立即报名</span>
            <span class="button"
                    style="background: url('https://act.bomaleye.com/teacher-btn-bg2.png') no-repeat center;" @click="downloadApp">同享赚钱</span>
        </div>
    </div>
     <van-popup v-model="showShareBox"
               style="opacity:0.6;background:#000000;height:100%;z-index:9999"
               close-icon-position
               :close-on-click-overlay="true"
               position="top">
      <div style="width:100%;height:100%;text-align:center"
           @click="showShareBox = false">
        <img class="share_icon"
             src="http://img.bomaleye.com/20210318112550266_5427"
             alt=""
             style="width:70%;height:30%">
      </div>
    </van-popup>
  </div>

</template>
<script>
import { getWxSignature } from "../../api/index"
import tools from "../../common/tools"
import wx from 'weixin-js-sdk'
import { Toast } from 'vant'
export default {
  data () {
    return {
      navTitle: '2021“我是好讲师”报名入口',
    }
  },
  created () { 
     this.getWxSignature()
  },
 methods: {
     routerToPage(type) {
        let path = ''
        switch (type) {
        case 1:
            path = '/actRule'
            break;
        case 2:
            path = '/actJury'
            break;
        case 3:
            path = '/actContest'
            break;
        case 4:
            path = this.setClickStatus() ? '/actOpus' : '/downloadTip';
            break;
        case 5:
            path = '/actAlarmSetting'
            break;
        case 6:
            path = this.setClickStatus() ? '/rankingList' : '/downloadTip';
            break;
        case 7:
            path = this.setClickStatus() ? '/signUp' : '/downloadTip';
            break;
        case 8:
            path = this.setClickStatus() ? '/selfPage' : '/downloadTip';
            break;
        case 9:
            path = this.setClickStatus() ? '/actShare' : '/downloadTip';
            break;
        }
    this.$router.push({
        path: path
        })
    },
    share () {
      this.showShareBox = true;
    },
    downloadApp () {
      this.$router.push({
        path: '/downloadTip'
      })
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
            title: '@你，我已经领到红包了哦，分享给你一起赚钱', // 分享标题
            desc: '我正在给2021“我是好讲师”参赛选手投票，给TA投票就能赚钱，分享越多赚钱越多', // 分享描述
            link: window.location.href.split('#')[0] + '#/sharePreview?shareVideoId=' + this.$route.params.shareVideoId + '&userId=' + tools.localgetItem('userId') , // 分享链接
            imgUrl: 'https://act.bomaleye.com/teacher-share-logo1.png', // 分享图标
            success: function () {
              // this.setActShareStatus()
              // Toast('分享成功');
            }
          });
          wx.onMenuShareTimeline({
            title: '2021“PLAN-X人才计划”短视频春季挑战赛', // 分享标题
            link: window.location.href.split('#')[0] + '#/sharePreview?shareVideoId=' + this.$route.params.shareVideoId + '&userId=' + tools.localgetItem('userId') , // 分享链接
            imgUrl: 'https://act.bomaleye.com/teacher-share-logo1.png', // 分享图标
            success: function () {
              // this.setActShareStatus()
              // Toast('分享成功');
            }
          })
        })
      })
    },
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
  background: linear-gradient(0deg, #0D061B 0%, #170637 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom:pxTorem(150px);
  .application-btn {
    width: pxTorem(80px);
    height: pxTorem(270px);
    position: fixed;
    top: pxTorem(540px);
    right: 0;
  }
  .act-step {
    width: 100%;
    height: pxTorem(490px);
    margin-top: pxTorem(24px);
  }
  .act-intro {
    width: 100%;
    height: pxTorem(1470px);
    margin-top: pxTorem(86px);
  }
  .share-btn {
    width: pxTorem(36px);
    position: fixed;
    height: pxTorem(36px);
    top: pxTorem(102px);
    right: pxTorem(36px);
    z-index: 9999;
  }
  .content {
      padding-top: pxTorem(30px);
  }
  .con-header {
      width: 100%;
      height: pxTorem(968px);
  }
  .act-rule {
      display: flex;
      flex-wrap: wrap;
      padding: 0 pxTorem(40px);
      justify-content: space-between;
      .rule-item {
        width: pxTorem(204px);
        height: pxTorem(96px);
        padding-left: pxTorem(90px);
        padding-top: pxTorem(30px);
        box-sizing: border-box;
        background: url(http://img.bomaleye.com/20210618154359681_7986) no-repeat
        center center;
        background-size: 100% 100%;
        font-size: pxTorem(24px);
        font-family: Alibaba PuHuiTi;
        font-weight: 400;
        color: #FFFFFF;
        margin-top: pxTorem(16px);
      }
      .item-1 {
            background: url(http://img.bomaleye.com/20210618154359681_7986) no-repeat
            center center;
            background-size: 100% 100%;
      }
      .item-1 {
            background: url(http://img.bomaleye.com/20210618155950850_8072) no-repeat
            center center;
            background-size: 100% 100%;
      }
  }
  .act-btn {
      width: 100%;
      text-align: center;
      padding: pxTorem(110px) 0;
      span {
        margin: pxTorem(16px) 0;
      }
  }
  .confirm-btn {
    display: inline-block;
    width: pxTorem(474px);
    height: pxTorem(100px);
    line-height: pxTorem(100px);
    margin-top: pxTorem(110px);
    text-align: center;
    border-radius: pxTorem(60px);;
    font-size: pxTorem(32px);
    font-family: PingFang SC;
    font-weight: 400;
    margin: 0 pxTorem(28px);
     color: #FFFFFF;
    background: url(http://img.bomaleye.com/2021061717411959_8837) no-repeat
      center center;
    background-size: 100% 100%;
  }
  .active {
    background: url(http://img.bomaleye.com/20210615104955613_2085) no-repeat
      center center;
    background-size: 100% 100%;
  }
  .bottom {
    position: fixed;
    bottom: pxTorem(30px);
    text-align: center;
    display: flex;
    justify-content: center;
    width: 100%;
    .button {
      width: pxTorem(300px);
      height: pxTorem(90px);
      line-height: pxTorem(90px);
      display: inline-block;
      text-align: center;
      color: #ffffff;
      box-sizing: border-box;
      background-size: 100% 100% !important;
      margin: 0 pxTorem(10px);
    }
  }
}
</style>

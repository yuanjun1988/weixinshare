<template>
<div style="min-height: 100%;width: 100%;background-color: #0d061b;">
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

  <div class="main">
    <img class="img"
         src="https://act.bomaleye.com/teacher-share-rule.png"
         alt="">
    <div class="bottom">
      <span class="button"
            style="background: url('https://act.bomaleye.com/teacher-btn-bg1.png') no-repeat center;" @click="downloadApp">立即报名</span>
      <span class="button"
            style="background: url('https://act.bomaleye.com/teacher-btn-bg2.png') no-repeat center;" @click="downloadApp">分享拉票</span>
    </div>
    
  </div>
  </div>
</template>

<script>
import { getWxSignature } from "../../api/index"
import wx from 'weixin-js-sdk'
import tools from "../../common/tools"
export default {
  data () {
    return {
      showShareBox: false
    }
  },
  mounted () {
    this.getWxSignature();
  },
  methods: {
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
            link: window.location.href.split('#')[0] + '#/sharePreview?shareVideoId=' + this.$route.params.shareVideoId + '&userId=' + tools.localgetItem('userId'), // 分享链接
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

<style lang="scss" rel="stylesheet/scss"  scoped>
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
  background-color: #0d061b;
  padding: pxTorem(40px) pxTorem(30px);
  box-sizing: border-box;
  .img {
    width: 100%;
  }
  .bottom {
    position: absolute;
    bottom: pxTorem(90px);
    text-align: center;
    .button {
      background-size: 100%;
      height: pxTorem(131px);
      display: inline-block;
      padding: 0 pxTorem(130px);
      text-align: center;
      line-height: pxTorem(131px);
      color: #ffffff;
      box-sizing: border-box;
      background-size: 100% !important;
    }
  }
}
</style>
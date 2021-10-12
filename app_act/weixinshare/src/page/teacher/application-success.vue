<template>
  <div class="main">
        <div class="header">
      <img src="http://img.bomaleye.com/20210625175427880_4609"
           alt="">
      <span>投票成功！</span>
      <p>您的投票奖励<span class="text-blue">已发放APP</span>个人账户<br>
        您可以<span class="text-blue">下载APP</span>查看或<span class="text-blue">分享赚更多</span></p>
    </div>
    <div class="act-btn">
      <span class="confirm-btn active"
            @click="share">下载查看</span>
      <span class="confirm-btn"
            @click="showShareBox = true">再次分享</span>
    </div>
    <div class="tip">
      <span @click="routerToSharePage">查看同享马蹄银攻略></span>
    </div>
    <van-popup v-model="showShareBox"
               style="opacity:0.6;background:#000000;height:100%"
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
      this.$router.push({
        path: '/downloadTip'
      })
    },
    routerToSharePage() {
        this.$router.push({
          path: '/teacherShare/'  + this.$route.params.playerVideoId
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
         var shareData = {
						title: '我正在参加《我是好讲师》大赛，请为我投票，感谢你的助力!',
						desc: '赶快帮我投票吧，呼朋唤友帮忙投票啦，多邀多得！ ',
						link: window.location.href.split('#')[0] + '#/sharePreview?shareVideoId=' + that.$route.params.playerVideoId  + '&userId=' + tools.localgetItem('userId') , // 分享链接
						imgUrl: 'https://act.bomaleye.com/teacher-share-logo1.png', // 分享图片，使用逗号,隔开
						success: function() {
						}
					};
					wx.ready(function() {
						wx.onMenuShareTimeline(shareData);
						wx.onMenuShareAppMessage(shareData);
						wx.onMenuShareQQ(shareData);
						wx.onMenuShareQZone(shareData);
					});
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
  padding: pxTorem(156px) pxTorem(30px);
  box-sizing: border-box;
  .header {
    display: flex;
    align-items: center;
    flex-direction: column;
    span {
      font-size: pxTorem(32px);
      font-family: PingFang SC;
      font-weight: 500;
      color: #333333;
      margin: pxTorem(44px) 0 pxTorem(40px);
    }
    p {
      font-size: pxTorem(24px);
      font-family: PingFang SC;
      font-weight: 500;
      color: #999999;
      margin: 0;
      .text-blue {
        font-size: pxTorem(24px);
        color: #ae00ff;
      }
    }
    img {
      width: pxTorem(150px);
      height: pxTorem(134px);
    }
  }
  .act-btn {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: pxTorem(252px);
  }
  .confirm-btn {
    width: pxTorem(306px);
    height: pxTorem(86px);
    line-height: pxTorem(86px);
    text-align: center;
    border-radius: pxTorem(40px);
    font-size: pxTorem(28px);
    font-family: PingFang SC;
    font-weight: 400;
    color: #333333;
    background: url(http://img.bomaleye.com/2021061717411959_8837) no-repeat
      center center;
    background-size: 100% 100%;
    margin: pxTorem(20px) 0;
  }
  .active {
    background: url(http://img.bomaleye.com/20210615104955613_2085) no-repeat
      center center;
    color: #ffffff;
  }
  .tip {
    width: 100%;
    display: flex;
    justify-content: center;
    font-size: pxTorem(24px);
    font-family: PingFang SC;
    font-weight: 500;
    color: #999999;
    margin-top: pxTorem(18px);
  }
}
</style>
<template>
  <div class="main">
    <img class="img"
         src="https://act.bomaleye.com/teacher-share-description1.png"
         alt="">
    <img class="img"
         src="https://act.bomaleye.com/teacher-share-skill1.png"
         alt="">
    <img class="img"
         src="https://act.bomaleye.com/teacher-share-flow1.png"
         alt="">

    <div style="text-align: center;">
      <span class="share"
            @click="showShareBox = true">同享赚更多</span>
      <!-- https://act.bomaleye.com/teacher-btn-bg.png -->
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
						link: window.location.href.split('#')[0] + '#/sharePreview?shareVideoId=' + that.$route.params.shareVideoId  + '&userId=' + tools.localgetItem('userId') , // 分享链接
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
  background-color: #0d061b;
  padding: pxTorem(40px) pxTorem(30px);
  box-sizing: border-box;
  .img {
    width: 100%;
  }

  .share {
    background: url("https://act.bomaleye.com/teacher-btn-bg.png") no-repeat
      center;
    background-size: 100%;
    height: pxTorem(101px);
    display: inline-block;
    padding: 0 pxTorem(130px);
    text-align: center;
    line-height: pxTorem(101px);
    color: #ffffff;
    box-sizing: border-box;
  }
}
</style>
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
      <!-- <span class="button"
            style="background: url('https://act.bomaleye.com/teacher-btn-bg1.png') no-repeat center;" @click="downloadApp">立即报名</span> -->
      <span class="button"
            style="background: url('https://act.bomaleye.com/teacher-btn-bg2.png') no-repeat center;" @click="shareActivityVideo">分享拉票</span>
    </div>
    
  </div>
  </div>
</template>

<script>
import { getWxSignature } from "../../api/index"
import tools from "../../common/tools"

export default {
  data () {
    return {
      showShareBox: false
    }
  },
  methods: {
    shareActivityVideo () {
      let params = {
        title: '我正在参加《我是好讲师》大赛，请为我投票，感谢你的助力!', // 分享标题
        desc: '赶快帮我投票吧，呼朋唤友帮忙投票啦，多邀多得！', // 分享描述
        link: window.location.href.split('#')[0] + '#/sharePreview?shareVideoId=' + this.$route.params.shareVideoId + '&userId=' + tools.sessiongetItem('userId'),
        imgUrl: 'https://act.bomaleye.com/teacher-share-logo1.png', // 分享图标
      }
      tools.mobileDetect() == 1 ? window.webkit.messageHandlers.shareActivityVideo.postMessage(params) : this.$bridge.callHandler('shareActivityVideo', params, (res) => { responseCallback(params) })
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
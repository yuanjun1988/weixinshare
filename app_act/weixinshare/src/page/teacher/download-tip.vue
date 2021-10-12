//下载APP提示页
<template>
    <div class="main-item">
        <div id="weixin-tip" @click="closeDia" v-if="diaStatus" >
            <img class="img_step1" src="http://img.bomaleye.com/20200814114642931_6149" alt="">
            <img class="img_step2" src="http://img.bomaleye.com/2020081411474519_1170" alt="">
            <img class="img_confirm" src="http://img.bomaleye.com/20200814114819561_3075" alt="">
       </div>
       <wx-open-launch-app id="launch-btn" :appid="appId"  class="launch-btn" @error="handleError" @launch="handleLaunch"> 
             <script type="text/wxtag-template">
            <style>
              
            </style>
            <div style="height:100%;width:100%;border:none;color: #ffffff;font-size:36px">打开app</div>
          </script>
		</wx-open-launch-app>
    </div>
</template>
<script>
import tools from '../../common/tools'
import { getWxSignature } from "../../api/index"
import wx from 'weixin-js-sdk'
export default {
    data() {
        return {
            diaStatus: false,
            couponCount: [],
            appId: 'wxbbd1278a0c6776bc'
        }
    },
    created() {
        this.getWxSignature();
    },
    methods:{
        //跳转下载APP
        goDownloadPage(){
            window.location.href = 'https://apps.apple.com/cn/app/%E4%BC%AF%E9%A9%AC%E4%B9%90%E4%B8%9A-%E8%A7%86%E9%A2%91%E6%8B%9B%E8%81%98%E6%9B%B4%E9%AB%98%E6%95%88/id1526776629'
        },
        closeDia() {
            this.diaStatus = false;
        },
        openAndroidTip() {
            var is_weixin = (function() {
                return navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1
            })();
            if(tools.mobileDetect() == 1) {
                this.goDownloadPage();
            } else {
                if(is_weixin) {
                    this.diaStatus = true;
                } else {
                    window.location.href = 'https://upgrades.bomaleye.com/app-bmly.apk'
                } 
            }
        },
    handleError(e) {
       console.log("error", e, e.detail);
        this.openAndroidTip();
    },
 
    handleLaunch(e) {
      console.log("success", e, e.detail);
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
          ],
          openTagList: ['wx-open-launch-app']
        })
        wx.ready(function () {
        })
        wx.error(function (res) {
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名
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
	        @return px2em($px + 0px);
	    } @else if (unit($px) == em) {
	        @return $px;
	    }
	    @return ($px / $base-font-size) * 1rem;
	}
.main-item{
    width: 100%;
    height: 100%;
    background: url(http://img.bomaleye.com/203105153317194_8401) center center no-repeat;
    background-size: 100% 100%;
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    .video-tvc {
        width: pxTorem(604px);
        height: pxTorem(346px);
        bottom: 20%;
        position: absolute;
        border-radius: pxTorem(20px);
        z-index:2000;
    }
    .download_btn>div {
        display: flex;
        justify-content: space-between;
        height: pxTorem(80px);
        width:pxTorem(280px);
        border:1px solid rgba(255,255,255,1);
        border-radius:pxTorem(40px);
        display: flex;
        justify-content: center;
        align-items: center;
        font-size:pxTorem(24px);
        font-family:PingFang SC;
        font-weight:500;
        color:rgba(254,254,254,1);
        margin: 0 pxTorem(24px);
    }
    .activity_introduce {
        height: pxTorem(322px);
        width:pxTorem(540px);
    }
    .download_count {
        display: flex;
        align-items: center;
        margin-left: pxTorem(20px);
        margin:pxTorem(40px) 0 pxTorem(80px) 0;
        font-size: pxTorem(32px);
        font-family: PingFang SC;
        font-weight: 800;
        color: #FFFFFF;
        line-height: 40px;
        span {
            width: pxTorem(36px);
            height: pxTorem(46px);
            background: rgba(255, 255, 255, 0.2);
            border: 1px solid #FFFFFF;
            box-shadow: pxTorem(0px) pxTorem(3px) pxTorem(9px) 0px #0E52B1;
            border-radius: pxTorem(4px);
            margin: 0  pxTorem(8px);
            text-align: center;
            line-height: pxTorem(46px);
            font-size: pxTorem(36px);
            font-family: PingFang SC;
            font-weight: 550;
            color: #FFFFFF;
        }
    }
    .download_btn {
        width: 100%;
        display: flex;
        justify-content: center;
        margin-bottom: pxTorem(86px);
    }
    .download_btn>div:nth-child(1) {
        background: rgba(255, 255, 255, 0.65);
    }
     #weixin-tip {
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
            z-index: 2;
            background:rgba(0,0,0,0.7);
            align-items: center;
            flex-direction: column;
            justify-content: center;
        }
        .img_step1 {
            position: absolute;
            left:pxTorem(180px);
            top: pxTorem(100px);
            width: pxTorem(400px);
            height: pxTorem(80px);
        }
        .img_step2 {
            position: absolute;
            left:pxTorem(180px);
            top: pxTorem(300px);
            width: pxTorem(400px);
            height: pxTorem(80px);
        }
        .img_confirm{
            position: absolute;
            left:pxTorem(180px);
            bottom: pxTorem(200px);
            width: pxTorem(400px);
            height: pxTorem(80px);
        }
        .launch-btn {
             display: flex;
            justify-content: space-between;
            height: pxTorem(80px);
            width:pxTorem(280px);
            border:1px solid rgba(255,255,255,1);
            border-radius:pxTorem(40px);
            display: flex;
            justify-content: center;
            align-items: center;
            font-size:pxTorem(30px);
            font-family:PingFang SC;
            font-weight:500;
            color:rgba(254,254,254,1);
            margin: 0 pxTorem(24px);
             margin-bottom: pxTorem(86px);
        }
        .wexin-launch-btn {
            background: rgba(255, 255, 255, 0.65);
        }
}

</style>
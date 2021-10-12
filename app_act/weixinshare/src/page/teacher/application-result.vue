<template>
  <div class="main">
    <navigation-bar :navTitle='navTitle' :rightTitle='rightTitle' @rightTitleClick="rightTitleClick" @backTo='backTo()'></navigation-bar>
    <div class="content">
        <div class="act-info">
            <div class="info-header">
                <img src="http://img.bomaleye.com/20210618090416115_1009" alt="">
                <span>恭喜报名成功！</span>
                <span class="tip">大赛报名投票时间：2021/07/06 ~ 2021/7/15<br> 请您及时关注大赛进度<br>
在此期间请尽快分享精彩视频让好友投票吧</span>
            </div>
            <!-- <div class="info-detail">
                <p>距大赛开始倒计时：</p>
                <span>{{timeStamp}}</span>
            </div> -->
            <div class="act-btn">
                <span class="confirm-btn active" @click="shareActivityVideo">分享好友投票</span>
                <span class="confirm-btn" @click="shareActivityPoster">分享参赛海报</span>
            </div>
        </div>
        <div class="act-rule">
            <img class="rule_1" src="http://img.bomaleye.com/20210618090252126_8981" alt="">
            <img class="rule_2" src="http://img.bomaleye.com/20210618090220195_5004" alt="">
        </div>
    </div>
  </div>

</template>
<script>
import { getActDetail } from "../../api/index"
import navigationBar from '../../components/common/navigation-bar'
import tools from "../../common/tools"
import { Toast } from 'vant'
export default {
  components: {
    navigationBar
  },
  data () {
    return {
      navTitle: '报名成功',
      rightTitle: '查看报名主页 >',
      incomeInfo: {},
      gameStartTime:'',
      timeStamp: ''
    }
  },
  created () {
    this.gameStartTime = this.$route.params.gameStartTime;
    this.getActDetail();
    // setInterval(()=>{
    //    this.getGameTime();
    //  })
  },
  mounted () {
    this.$bridge.registerHandler('sendFileIfo', (params, responseCallback) => {
      this.sendFileIfo(params);
      responseCallback(params)
    })
  },
  methods: {
    getGameTime() {
      var nowtime = new Date(),  //获取当前时间
         endtime = tools.sessiongetItem("timeStamp");  //定义结束时间
      var lefttime = endtime - nowtime.getTime(),  //距离结束时间的毫秒数
          leftd = Math.floor(lefttime/(1000*60*60*24)),  //计算天数
          lefth = Math.floor(lefttime/(1000*60*60)%24),  //计算小时数
          leftm = Math.floor(lefttime/(1000*60)%60),  //计算分钟数
          lefts = Math.floor(lefttime/1000%60);  //计算秒数
          this.timeStamp = leftd + "天: " + lefth + "时: " + leftm + "分: " + lefts + "秒"; 
    }, 
    rightTitleClick() {
        this.$router.push({
          path:"/selfPage"
      })
    },
    backTo() {
      this.$router.push({
          path:"/actHomepage"
      })
    },
    getActDetail() {
        let params = {};
      getActDetail(params).then(res => {
          if (res.resp_code == 0) {
            this.incomeInfo = res.datas
            }
      })

    },
    shareActivityVideo () {
      let params = {
        title: '我正在参加《我是好讲师》大赛，请为我投票，感谢你的助力!', // 分享标题
        desc: '赶快帮我投票吧，呼朋唤友帮忙投票啦，多邀多得！', // 分享描述
        link: window.location.href.split('#')[0] + '#/sharePreview?shareVideoId=' + this.$route.params.videoId + '&userId=' + tools.sessiongetItem('userId'),
        imgUrl: 'https://act.bomaleye.com/teacher-share-logo1.png', // 分享图标
      }
      tools.mobileDetect() == 1 ? window.webkit.messageHandlers.shareActivityVideo.postMessage(params) : this.$bridge.callHandler('shareActivityVideo', params, (res) => { responseCallback(params) })
    },
    shareActivityPoster () {
        let params = {
        title: '我正在参加《我是好讲师》大赛，请为我投票，感谢你的助力!', // 分享标题
        desc: '赶快帮我投票吧，呼朋唤友帮忙投票啦，多邀多得！', // 分享描述
        link: window.location.href.split('#')[0] + '#/sharePreview?shareVideoId=' + this.$route.params.videoId + '&userId=' + tools.sessiongetItem('userId'),
        imgUrl: 'https://act.bomaleye.com/teacher-share-logo1.png', // 分享图标
        posterUrl: '',
        userName: this.$route.params.userName
      }
      tools.mobileDetect() == 1 ? window.webkit.messageHandlers.shareActivityPoster.postMessage(params) : this.$bridge.callHandler('shareActivityPoster', params, (res) => { responseCallback(params) })
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
  background: linear-gradient(0deg, #0D061B 0%, #170637 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 pxTorem(32px) pxTorem(96px);
  .content {
      padding-top: pxTorem(260px);
  }
  .act-info {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
  }
  .info-header {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      display: flex;
      align-items: center;
      img {
        width: pxTorem(186px);
        height: pxTorem(178px); 
      }
      span {
        margin-top: pxTorem(44px);
        font-size: pxTorem(28px);
        font-family: PingFang SC;
        font-weight: 550;
        color: #FFFFFF;
      }
      .tip {
        font-size: pxTorem(24px);
        font-family: PingFang SC;
        font-weight: 500;
        color: #CCCCCC;
        line-height: pxTorem(40px);
        text-align: center;
      }
  }
  .info-detail {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: pxTorem(82px);
      p {
        font-size: pxTorem(24px);
        font-family: PingFang SC;
        color: #FFFFFF;
        margin: 0;
        line-height: pxTorem(40px);
      }
      span {
        font-size: pxTorem(24px);
        font-family: PingFang SC;
        font-weight: 500;
        color: rgba(1, 253, 246, 1);
      }
  }
  .act-btn {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: pxTorem(74px) 0 pxTorem(110px);
  }
  .confirm-btn {
    width: pxTorem(300px);
    height: pxTorem(80px);
    line-height: pxTorem(80px);
    margin-top: pxTorem(80px);
    text-align: center;
    border-radius: pxTorem(48px);
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
  }
  .act-rule {
      width: 100%;
      img {
          width: 100%;
      }
      .rule_1 {
          height: pxTorem(378px);
      }
      .rule_2 {
          height: pxTorem(464px);
          margin-top: pxTorem(30px);
      }
  }
}
</style>

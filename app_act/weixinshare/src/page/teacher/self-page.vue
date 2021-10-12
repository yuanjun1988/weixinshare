<template>
  <div class="main">
    <navigation-bar :navTitle='navTitle'></navigation-bar>
    <div class="content">
      <div class="act-info">
        <!-- <div class="act-time">
          <span>距大赛开始倒计时：</span>
          <span>{{timeStamp}}</span>
        </div> -->
        <div class="info-header">
          <div>
            <img v-if="selfInfo.headPortrait"
                 :src="photoFilter(selfInfo.headPortrait, 100, 100)">
            <img v-else
                 src="https://img.bomaleye.com/image/coomon_header.png"
                 alt="">
          </div>
          <span>{{selfInfo.userName}}</span>
        </div>
        <div class="info-detail">
          <div @click="toVoteList">
            <p>{{selfInfo.voteCount}}</p>
            <span>当前票数</span>
          </div>
          <div class="soild-item"></div>
          <div @click="toLankingList">
            <p>{{selfInfo.rank}}</p>
            <span>当前排名</span>
          </div>
          <div class="soild-item"></div>
          <div @click="routerActShare">
            <img src="http://img.bomaleye.com/20210619090815638_4506"
                 alt="">
            <span>分享拉票</span>
          </div>
        </div>

      </div>
      <div class="mid-soild">
      </div>
      <div class="upload-videos">
        <div class="my-video">我的视频</div>
        <div class="upload-video">
          <div class="upload"
               @click="reloadPreliminaryVideo(0)">
            <img class="upload-img"
                 :src="playVideoList[0].videoCoverUrl ? photoFilter(playVideoList[0].videoCoverUrl) : videoposterFilter(playVideoList[0].videoUrl)"
                 alt="">
            <img src="http://img.bomaleye.com/20210226172546332_4043"
                 class="upload-hint1"
                 alt="">
          </div>
          <div class="video-limit">
            <div class="intro-title">
              <div class="video-title">精彩片段</div>
              <div class="view-example"
                   @click="viewExample(0)">查看示例></div>
            </div>

            <div class="limit-size">{{playVideoList[0].videoDesc}}</div>
            <div class="act-btn">
              <span class="confirm-btn active"
                    @click="shareActivityVideo">分享好友投票</span>
              <span class="confirm-btn"
                    @click="shareActivityPoster">分享参赛海报</span>
            </div>
          </div>
        </div>
        <div class="upload-video">
          <div class="upload"
               @click="reloadPreliminaryVideo(1)">
            <img class="upload-img"
                 :src="playVideoList[1].videoCoverUrl ? photoFilter(playVideoList[1].videoCoverUrl) : videoposterFilter(playVideoList[1].videoUrl)"
                 alt="">
            <img src="http://img.bomaleye.com/20210226172546332_4043"
                 class="upload-hint1"
                 alt="">
          </div>
          <div class="video-limit">
            <div class="intro-title">
              <div class="video-title">初赛视频</div>
              <div class="view-example"
                   @click="viewExample(1)">查看示例></div>
            </div>
            <div class="limit-size">{{playVideoList[1].videoDesc}}</div>
            <!-- <div class="act-btn">
                <span class="confirm-btn active" @click="shareActivityVideo">分享好友投票</span>
                <span class="confirm-btn" @click="shareActivityPoster">分享参赛海报</span>
           </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
import { getActHomePage, getLecTempVideo } from "../../api/index"
import navigationBar from '../../components/common/navigation-bar'
import tools from "../../common/tools"
import { Toast } from 'vant'
export default {
  components: {
    navigationBar
  },
  data () {
    return {
      navTitle: '个人主页',
      selfInfo: {},
      playVideoList: [],
      timeStamp: '',
      tempVideo: []
    }
  },
  created () {
    this.getActHomePage();
    // setInterval(() => {
    //   this.getGameTime();
    // })
    this.initLecTempVideo();
  },
  mounted () {
    this.$bridge.registerHandler('sendFileIfo', (params, responseCallback) => {
      this.sendFileIfo(params);
      responseCallback(params)
    })
  },
  methods: {
    //查看示例
    viewExample (type) {
      if (this.tempVideo.length < 2) {
        Toast('暂无示例视频', false);
        return
      }
      for (let index = 0; index < this.tempVideo.length; index++) {
        var tempVideoItem = this.tempVideo[index];
        if (tempVideoItem.videoType == type) {
          var item = {
            createTime: "",
            hasLiked: false,
            headportrait: "",
            id: "",
            joinIdentify: 1,
            qnJobResult: "",
            screenMode: 0,
            source: 1,
            tagFollow: false,
            updateTime: "",
            userId: "",
            userName: "",
            videoDesc: "",
            videoSort: 0,
            videoTopic: "",
            videoType: 51,
            videoUrl: tempVideoItem.videoUrl,
            voteCount: 0,
            tempVideo:1
          }
          tools.localsetItem('videoList', [item], 1)
          this.$router.push({
            path: "/actVideoPreview/0"
          })
          break
        }
      }
    },
    // 获取示例视频
    initLecTempVideo () {
      getLecTempVideo({}).then((res) => {
        this.tempVideo = res.datas
      })
    },
    toLankingList(){
      this.$router.push({
        path: "/rankingList"
      })
    },
    toVoteList(){
      this.$router.push({
        path: "/voteDetail"
      })
    },
    
    getGameTime () {
      var nowtime = new Date(),  //获取当前时间
        endtime = tools.sessiongetItem("timeStamp");  //定义结束时间
      var lefttime = endtime - nowtime.getTime(),  //距离结束时间的毫秒数
        leftd = Math.floor(lefttime / (1000 * 60 * 60 * 24)),  //计算天数
        lefth = Math.floor(lefttime / (1000 * 60 * 60) % 24),  //计算小时数
        leftm = Math.floor(lefttime / (1000 * 60) % 60),  //计算分钟数
        lefts = Math.floor(lefttime / 1000 % 60);  //计算秒数
      this.timeStamp = leftd + "天: " + lefth + "时: " + leftm + "分: " + lefts + "秒";
    },
    routerActShare () {
      this.$router.push({
        path: "/actShare"
      })
    },
    getActHomePage () {
      let params = {};
      getActHomePage(params).then(res => {
        if (res.resp_code == 0) {
          this.selfInfo = res.datas
          let arr = res.datas.playVideoList;
          if(arr[0].videoSort !=0) {
            [arr[0],arr[1]] = [arr[1],arr[0]]
          }
          this.playVideoList = arr
        }
      })

    },
    reloadPreliminaryVideo (index) {
      tools.localsetItem('videoList', this.playVideoList, 1);
      this.$router.push({
        path: "/actVideoPreview/" + index
      })
    },
    shareActivityVideo () {
      let params = {
        title: '我正在参加《我是好讲师》大赛，请为我投票，感谢你的助力!', // 分享标题
        desc: '赶快帮我投票吧，呼朋唤友帮忙投票啦，多邀多得！', // 分享描述
        link: window.location.href.split('#')[0] + '#/sharePreview?shareVideoId=' + this.playVideoList[0].id + '&userId=' + tools.sessiongetItem("userId"), // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: 'https://act.bomaleye.com/teacher-share-logo1.png', // 分享图标
      }
      tools.mobileDetect() == 1 ? window.webkit.messageHandlers.shareActivityVideo.postMessage(params) : this.$bridge.callHandler('shareActivityVideo', params, (res) => { responseCallback(params) })
    },
    shareActivityPoster () {
      let params = {
        title: '我正在参加《我是好讲师》大赛，请为我投票，感谢你的助力!', // 分享标题
        desc: '赶快帮我投票吧，呼朋唤友帮忙投票啦，多邀多得！', // 分享描述
        link: window.location.href.split('#')[0] + '#/sharePreview?shareVideoId=' + this.playVideoList[0].id + '&userId=' + tools.sessiongetItem("userId"), // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: 'https://act.bomaleye.com/teacher-share-logo1.png', // 分享图标
        posterUrl: '',
        userName: this.playVideoList[0].userName
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
  min-height: 100%;
  background: linear-gradient(0deg, #0d061b 0%, #170637 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 pxTorem(32px) pxTorem(96px);
  box-sizing: border-box;
  .content {
    padding-top: pxTorem(200px);
    width: 100%;
  }
  .act-time {
    margin-top: pxTorem(40px);
  }
  .act-time span {
    font-size: pxTorem(24px);
    font-family: PingFang SC;
    font-weight: 500;
  }
  .act-time span:nth-child(1) {
    color: rgba(1, 253, 246, 1);
  }
  .act-time span:nth-child(2) {
    color: #ffffff;
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
    background: url(http://img.bomaleye.com/20210617163453533_5713) no-repeat
      center center;
    background-size: 110% 110%;
    width: pxTorem(400px);
    height: pxTorem(380px);
    display: flex;
    align-items: center;
    div {
      width: pxTorem(168px);
      height: ppxTorem(168px);
      border-radius: 50%;
    }
    img {
      width: pxTorem(168px);
      height: pxTorem(168px);
      border: 3px solid #9000ff;
      border-radius: 50%;
    }
    span {
      margin-top: pxTorem(36px);
      font-size: pxTorem(28px);
      font-family: PingFang SC;
      font-weight: 550;
      color: #ffffff;
    }
  }
  .info-detail {
    width: 100%;
    padding: 0 pxTorem(40px);
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    div {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .soild-item {
      width: pxTorem(1px);
      height: pxTorem(38px);
      background: #ffffff;
    }
    p {
      font-size: pxTorem(32px);
      font-family: PingFang SC;
      font-weight: 550;
      color: #ffffff;
      margin: 0;
    }
    span {
      font-size: pxTorem(24px);
      font-family: PingFang SC;
      font-weight: 500;
      color: #cccccc;
      margin-top: pxTorem(22px);
    }
    img {
      width: pxTorem(26px);
      height: pxTorem(26px);
    }
  }
  .act-btn {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    bottom: pxTorem(12px);
  }
  .confirm-btn {
    width: pxTorem(192px);
    height: pxTorem(72px);
    line-height: pxTorem(72px);
    text-align: center;
    border-radius: pxTorem(40px);
    font-size: pxTorem(24px);
    font-family: PingFang SC;
    font-weight: 400;
    color: #ffffff;
    background: url(http://img.bomaleye.com/2021061717411959_8837) no-repeat
      center center;
    background-size: 100% 100%;
  }
  .active {
    background: url(http://img.bomaleye.com/20210615104955613_2085) no-repeat
      center center;
  }
  .mid-soild {
    width: 100%;
    height: pxTorem(8px);
    background: #21133c;
    margin: pxTorem(74px) 0 pxTorem(36px);
  }
  .upload-videos {
    margin-top: pxTorem(60px);
    .my-video {
      font-size: pxTorem(32px);
      font-family: PingFang SC;
      font-weight: 550;
      color: #ffffff;
      margin-bottom: pxTorem(40px);
    }
    .upload-video {
      margin-bottom: pxTorem(40px);
      display: flex;
      .upload {
        height: pxTorem(320px);
        width: pxTorem(240px);
        border-radius: pxTorem(21px);
        background: #21133c;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        .upload-img {
          height: pxTorem(320px);
          width: pxTorem(240px);
          background: #0d061b;
          opacity: 0.4;
          border-radius: pxTorem(21px);
          object-fit: cover;
        }
        .upload-hint1 {
          height: pxTorem(36px);
          width: pxTorem(36px);
          position: absolute;
        }
        span {
          margin-top: pxTorem(35px);
          display: block;
          color: #14062e;
          font-size: pxTorem(24px);
        }
      }
      .video-limit {
        margin-left: pxTorem(30px);
        flex: 1;
        position: relative;
        .intro-title {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .video-title {
          font-size: pxTorem(28px);
          color: #ffffff;
        }
        .limit-size {
          font-size: pxTorem(24px);
          color: #999999;
          line-height: pxTorem(40px);
          font-family: PingFang SC;
          margin-top: pxTorem(32px);
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
        }
        .view-example {
          font-size: pxTorem(24px);
          color: #00fff6;
          display: flex;
          .reload {
            margin-left: pxTorem(50px);
            display: flex;
            align-items: center;
            img {
              height: pxTorem(23px);
              width: pxTorem(22px);
              margin-left: pxTorem(10px);
            }
          }
        }
      }
    }
  }
}
</style>

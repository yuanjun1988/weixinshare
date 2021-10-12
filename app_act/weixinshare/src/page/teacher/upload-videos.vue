<template>

  <div class="main">
    <navigation-bar :navTitle='navTitle'></navigation-bar>
    <div class='upload-hint'>{{hint}}</div>
    <div class="upload-videos">
      <div class="upload-video">
        <div class="upload"
             @click="reloadHighlight(0)">
          <img class="upload-img"
               v-if="highlightVideo.id"
               style="object-fit:cover;"
               :src="highlightVideo.videoCoverUrl == ''|| !highlightVideo.videoCoverUrl?getVideoImg(highlightVideo.videoUrl) :'http://img.bomaleye.com/'+highlightVideo.videoCoverUrl"
               alt="">
          <img class="upload-hint1"
               v-if="!highlightVideo.id"
               src="https://act.bomaleye.com/teacher-video.png"
               alt="">
          <span v-if="!highlightVideo.id">点击上传</span>
        </div>
        <div class="video-limit">
          <div class="video-title">精彩片段</div>
          <div class="limit-size">视频要求：时长：15-60s</div>
          <div class="limit-type">格式：MP4</div>
          <div class="view-example"
               v-if="!highlightVideo.id"
               @click="viewExample(0)">查看示例></div>
          <div class="view-example"
               v-if="highlightVideo.id"><span @click="delVideo(0)">删除视频</span><span class="reload"
                  @click="reloadHighlight(1)">重新上传<img src="https://act.bomaleye.com/teacher-reload.png"
                   alt=""></span></div>
        </div>
      </div>
      <div class="upload-video">
        <div class="upload"
             @click="reloadPreliminaryVideo(0)">
          <img class="upload-img"
               v-if="preliminaryVideo.id"
               style="object-fit:cover;"
               :src="preliminaryVideo.videoCoverUrl == ''|| !preliminaryVideo.videoCoverUrl?getVideoImg(preliminaryVideo.videoUrl) :'http://img.bomaleye.com/'+preliminaryVideo.videoCoverUrl"
               alt="">
          <img class="upload-hint1"
               v-if="!preliminaryVideo.id"
               src="https://act.bomaleye.com/teacher-video.png"
               alt="">
          <span v-if="!preliminaryVideo.id">点击上传</span>
        </div>
        <div class="video-limit">
          <div class="video-title">初赛视频</div>
          <div class="limit-size">视频要求：时长：5-20min</div>
          <div class="limit-type">格式：MP4</div>
          <div class="view-example"
               v-if="!preliminaryVideo.id"
               @click="viewExample(1)">查看示例></div>
          <div class="view-example"
               v-if="preliminaryVideo.id"><span @click="delVideo(1)">删除视频</span><span class="reload"
                  @click="reloadPreliminaryVideo(1)">重新上传<img src="https://act.bomaleye.com/teacher-reload.png"
                   alt=""></span></div>
        </div>
      </div>
    </div>

    <div class="submit-view">
      <span class="submit"
            @click="submit">提 交</span>
    </div>

  </div>
</template>

<script>
import navigationBar from '../../components/common/navigation-bar'
import { Toast, Dialog } from 'vant'
import tools from "../../common/tools"
import { completeJoin, delTeacherVideo, getLecTempVideo } from "../../api/index"


export default {
  components: {
    navigationBar
  },
  data () {
    return {
      navTitle: '大赛报名',
      hint: '请上传过往精彩演讲视频和初赛视频',
      highlightVideo: {
        id: '',
        videoUrl: '',
        videoCoverUrl: ''
        //bmly_video_1622856950300_8755
      },
      preliminaryVideo: {
        id: '',
        videoUrl: '',
        videoCoverUrl: ''
        //bmly_video_1623051279117
      },
      uploadType: 0,  // 0:默认 1:上传精彩视频 2:上传初赛视频
      tempVideo: []
    }
  },
  created () {
    tools.sessionremoveItem('highlightVideo');
    tools.sessionremoveItem('preliminaryVideo');
    this.initLecTempVideo();
  },
  mounted () {
    window.ocCallAddTeacherVideoAfter = this.ocCallAddTeacherVideoAfter;
    this.$bridge.registerHandler('ocCallAddTeacherVideoAfter', (params, responseCallback) => {
      this.ocCallAddTeacherVideoAfter(params);
      responseCallback(params)
    })
  },
  activated () {
    if (tools.sessiongetItem('highlightVideo', 1)) {
      this.highlightVideo = tools.sessiongetItem('highlightVideo', 1);
    }
    if (tools.sessiongetItem('preliminaryVideo', 1)) {
      this.preliminaryVideo = tools.sessiongetItem('preliminaryVideo', 1);
    }
  },
  methods: {
    // 获取示例视频
    initLecTempVideo () {
      getLecTempVideo({}).then((res) => {
        this.tempVideo = res.datas
      })
    },
    // 获取视频封面
    getVideoImg (videoUrl) {
      return this.videoposterFilter(videoUrl)
    },
    ocCallAddTeacherVideoAfter (params) {
      let videoInfo = JSON.parse(params);
      var params = {
        type: this.uploadType
      }
      var sort = this.uploadType == 1 ? 0 : 1
      this.$router.push({
        path: '/teacherPublish/' + videoInfo.url + '/' + sort
      })
    },

    // 查看示例 0:精彩片段  1:初赛视频
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

    // 删除视频 0:精彩片段  1:初赛视频
    delVideo (type) {
      let that = this;
      Dialog.confirm({
        title: '删除提示',
        message: '确定要删除该视频吗？',
      }).then(() => {
        var params = {
        }
        if (type == 0) {
          params.videoId = that.highlightVideo.id
        }
        if (type == 1) {
          params.videoId = that.preliminaryVideo.id
        }
        that.$loading();
        delTeacherVideo(params).then((res) => {
          that.$toast.clear();
          // 删除成功
          if (res.resp_code == 0) {
            if (type == 0) {
              that.highlightVideo = {}
              tools.sessionremoveItem('highlightVideo');
            }
            if (type == 1) {
              that.preliminaryVideo = {}
              tools.sessionremoveItem('preliminaryVideo');
            }
            Toast('删除成功', false);
          }
        });
      })
    },
    // 上传精彩片段   视频存在：播放 ， 不存在：上传
    reloadHighlight (type) {
      if (!this.highlightVideo.id || type == 1) {
        this.uploadType = 1;
        var params = {
          type: this.uploadType
        }
        tools.mobileDetect() == 1 ? window.webkit.messageHandlers.addTeacherVideo.postMessage(params) : this.$bridge.callHandler('addTeacherVideo', params, (res) => { responseCallback(params) })
        return;
      }
      if (this.highlightVideo.id) {
        let videoList = [];
        videoList.push(this.highlightVideo)
        tools.localsetItem('videoList', videoList, 1);
        this.$router.push({
          path: "/actVideoPreview/0"
        })
        return;
      }
    },
    //  上传初赛视频  视频存在：播放 ， 不存在：上传
    reloadPreliminaryVideo (type) {
      if (!this.preliminaryVideo.id || type == 1) {
        this.uploadType = 2;
        var params = {
          type: this.uploadType
        }
        tools.mobileDetect() == 1 ? window.webkit.messageHandlers.addTeacherVideo.postMessage(params) : this.$bridge.callHandler('addTeacherVideo', params, (res) => { responseCallback(params) })
        return;
      }
      if (this.preliminaryVideo.id) {
        let videoList = [];
        videoList.push(this.preliminaryVideo)
        tools.localsetItem('videoList', videoList, 1);
        this.$router.push({
          path: "/actVideoPreview/0"
        })
        return;
      }
    },
    // 提交
    submit () {
      if (!this.highlightVideo.id || !this.preliminaryVideo.id) {
        Toast('请上传视频', false);
        return;
      }
      this.$loading();
      completeJoin().then((res) => {
        this.$toast.clear();
        // 报名成功
        if (res.resp_code == 0) {
          Toast('报名成功', false);
          this.$router.push({
            path: '/applicationResult/' + res.datas.gameStartTime + '/' + this.highlightVideo.id + '/' + res.datas.userName
          })
        }
      });
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
  min-height: 100%;
  background: linear-gradient(0deg, #0d061b 0%, #170637 100%);
  .upload-hint {
    width: 100%;
    padding: pxTorem(205px) 0 pxTorem(25px) 0;
    text-align: center;
    background: #21133c;
    color: #01fdf6;
    font-size: pxTorem(24px);
  }

  .upload-videos {
    margin-top: pxTorem(60px);
    .upload-video {
      margin: pxTorem(20px) pxTorem(40px);
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
          width: 100%;
          height: 100%;
          background: #0d061b;
          opacity: 0.4;
          border-radius: pxTorem(21px);
        }
        .upload-hint1 {
          height: pxTorem(55px);
          width: pxTorem(79px);
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
        position: relative;
        .video-title {
          margin: pxTorem(28px) 0 pxTorem(40px) 0;
          font-size: pxTorem(28px);
          color: #ffffff;
        }
        .limit-size .limit-type {
          font-size: pxTorem(28px);
          color: #999999;
        }
        .view-example {
          position: absolute;
          bottom: pxTorem(23px);
          font-size: pxTorem(24px);
          color: #00fff6;
          display: -webkit-inline-box;
          // span {
          //   display: inline-block;
          // }
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

  .submit-view {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: pxTorem(150px);
    .submit {
      display: block;
      text-align: center;
      line-height: pxTorem(93px);
      width: pxTorem(467px);
      height: pxTorem(93px);
      background: linear-gradient(90deg, #b400ff, #8115ff, #00fff6);
      border: pxTorem(3px) solid rgba(255, 255, 255, 0.2);
      border-radius: pxTorem(47px);
      color: #ffffff;
      font-size: pxTorem(32px);
      box-shadow: pxTorem(0px) pxTorem(2px) pxTorem(0px) pxTorem(0px)
          rgba(30, 9, 83, 0.53),
        0px pxTorem(3px) pxTorem(7px) 0px rgba(6, 0, 1, 0.22);
    }
  }
}
</style>
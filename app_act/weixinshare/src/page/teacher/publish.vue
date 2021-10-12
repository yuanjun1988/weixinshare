<template>
  <div class="main">
    <navigation-bar :navTitle='navTitle'></navigation-bar>
    <div class="content">
      <textarea v-model="videoDesc"
                cols="1"
                rows="5"
                maxlength="25"
                v-resetInput
                placeholder="添加详细的视频描述，再设置一个抢眼的封面，你的视频会更容易被推荐哦~"></textarea>

      <div class="cover_img_view">
        <img :src="videoCoverUrl == ''?getVideoImg(videoUrl) :'http://img.bomaleye.com/'+videoCoverUrl"
             @click="uploadVideoCover"
             class="video-pre"
              style="object-fit:cover;"
             alt="">
      </div>

      <div class="line"></div>

      <div>
        <img class="img_topic"
             src="https://act.bomaleye.com/planx_topic.png"
             alt="">
        <span class="type">话题</span>
        <span class="topic">#全国讲师培训大赛 </span>
      </div>

      <div class="submit-view">
        <span class="submit"
              @click="submit">提 交</span>
      </div>
    </div>
  </div>
</template>

<script>
import navigationBar from '../../components/common/navigation-bar'
import { Toast } from 'vant'
import { saveTeacherVideo } from "../../api/index"
import tools from "../../common/tools"

export default {
  name: "publish",
  components: {
    navigationBar
  },
  data () {
    return {
      navTitle: "发布",
      videoDesc: '',
      videoUrl: '',
      videoCoverUrl: '',
      videoSort:''
    }
  },
  mounted () {
    this.videoUrl = this.$route.params.videoUrl;
    this.videoSort = this.$route.params.videoSort;
    window.teacherVideoImgAfter = this.teacherVideoImgAfter;
    this.$bridge.registerHandler('teacherVideoImgAfter', (params, responseCallback) => {
      this.teacherVideoImgAfter(params);
      responseCallback(params)
    })
  },
  methods: {
    // 获取视频封面
    getVideoImg (videoUrl) {
      return this.videoposterFilter(videoUrl)
    },
    // 上传视频封面
    uploadVideoCover () {
      var params = {
      }
      tools.mobileDetect() == 1 ? window.webkit.messageHandlers.uploadVideoCover.postMessage(params) : this.$bridge.callHandler('uploadVideoCover', params, (res) => {
        responseCallback(params)
      })
    },
    // 获取上传的视频封面
    teacherVideoImgAfter (params) {
      let imgInfo = JSON.parse(params)
      this.videoCoverUrl = imgInfo.url
    },
    //  提交
    submit () {
      var params = {
        videoCoverUrl:this.videoCoverUrl,
        videoDesc:'#全国讲师培训大赛 '+this.videoDesc,
        videoSort:this.videoSort,
        videoUrl:this.videoUrl
      }
      this.$loading();
      saveTeacherVideo(params).then((res) => {
        this.$toast.clear();
        if(res.resp_code == 0){
           Toast('发布成功', false);
           // 0: 精彩片段 1:初赛视频
           if(this.videoSort == 0){
             tools.sessionsetItem('highlightVideo',res.datas,1);
           }
           if(this.videoSort == 1){
            tools.sessionsetItem('preliminaryVideo',res.datas,1)
           }
           this.$router.go(-1);
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
  width: 100%;
  height: inherit;
  background-color: #1a1924;
  textarea {
    color: #666666;
    font-size: pxTorem(30px);
  }
  .content {
    padding: pxTorem(200px) pxTorem(30px) pxTorem(30px) pxTorem(30px);
    /deep/ .el-textarea__inner {
      height: pxTorem(300px);
      background-color: transparent;
      border: 0px;
      text-align: left;
      color: #808080;
      font-size: pxTorem(32px);
    }

    .cover_img_view {
      width: pxTorem(173px);
      height: pxTorem(173px);
      border-radius: pxTorem(11px);
      position: relative;

      /deep/ .van-popup {
        background-color: transparent;
        z-index: 9999 !important;
      }
      /deep/ .el-input__inner {
        border: 0px;
        text-align: end;
        background-color: transparent;
      }

      /deep/ .el-textarea__inner {
        border: 0px;
        background-color: transparent;
      }

      /deep/ .van-uploader__preview {
        display: none;
      }

      /deep/ .van-uploader__upload-icon {
        width: pxTorem(173px);
        height: pxTorem(173px);
        border-radius: pxTorem(11px);
        overflow: hidden;
      }

      /deep/ .van-uploader__upload-icon::before {
        // display: none;
        content: url(http://act.bomaleye.com/planx_add_video.png);
      }

      span {
        width: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
        padding: 0;
        text-align: center;
        background: rgba(0, 0, 0, 0.3);
        color: #ffffff;
        font-size: pxTorem(24px);
        border-radius: 0 0 pxTorem(11px) pxTorem(11px);
      }
      img {
        width: 100%;
        height: 100%;
        background-color: transparent;
        border-radius: pxTorem(11px);
        position: absolute;
      }

      .del {
        position: absolute;
        width: pxTorem(25px);
        height: pxTorem(25px);
        right: pxTorem(0px);
        top: pxTorem(0px);
        padding: pxTorem(10px);
      }

      .video-pre {
        width: pxTorem(173px);
        height: pxTorem(173px);
        border-radius: pxTorem(11px);
      }
    }

    .line {
      width: 100%;
      height: pxTorem(1px);
      background-color: rgba(51, 51, 51, 1);
      margin: pxTorem(30px) 0;
    }

    .type {
      font-size: pxTorem(32px);
      color: #ffffff;
      font-weight: bold;
    }

    .img_topic {
      width: pxTorem(27px);
      height: pxTorem(27px);
      margin-right: pxTorem(5px);
    }

    .topic {
      color: #2effff;
      font-weight: 500;
      font-size: pxTorem(28px);
    }

    .normal_type {
      height: pxTorem(53px);
      background: #292929;
      display: inline-block;
      text-align: center;
      line-height: pxTorem(53px);
      border-radius: pxTorem(27px);
      margin-left: pxTorem(15px);
      margin-right: pxTorem(15px);
      font-weight: 500;
      font-size: pxTorem(26px);
      color: #ffffff;
      padding: 0 pxTorem(20px);
    }

    .select_type {
      padding: 0 pxTorem(20px);
      height: pxTorem(53px);
      background: rgba(46, 255, 255, 1);
      display: inline-block;
      text-align: center;
      line-height: pxTorem(53px);
      border-radius: pxTorem(27px);
      margin-left: pxTorem(15px);
      margin-right: pxTorem(15px);
      font-weight: 500;
      font-size: pxTorem(26px);
      color: #2e3741;
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

    textarea {
      width: 100%;
      background-color: transparent;
      border: 0px;
    }
  }
}
</style>

<template>
  <div class="main">
    <navigation-bar :navTitle='navTitle'></navigation-bar>

    <div class="content">
      <textarea  v-model="videoDesc"  style="color: #666666;font-size: 20px;" cols="1" rows="5"  maxlength="50" v-resetInput placeholder="添加详细的视频描述，再设置一个抢眼的封面，你的视频会更容易被推荐哦~" ></textarea>

      <div class="cover_img_view">
        <!-- <div class="video-img"> -->
        <img v-if="videoCoverUrl"
             :src="videoCoverUrl"
             class="video-pre"
             alt="">

        <img class="del"
             v-if="videoCoverUrl"
             @click="delSidelights()"
             src="https://act.bomaleye.com/planx_video_del.png"
             alt="">

        <span v-if="videoCoverUrl">视频封面</span>

        <van-uploader :after-read="afterRead"
                      :max-count="1"
                      v-if="videoCoverUrl.length == 0">
        </van-uploader>

      </div>

      <div class="line"></div>
      <div>
        <img src="https://act.bomaleye.com/planx_link.png"
             alt="">
        <span class="type">视频类型</span>
        <span :class="type == 1 ?'select_type':'normal_type'"
              @click="changeType(1)">{{typeName}}</span>
        <span :class="type == 2 ?'select_type':'normal_type'"
              @click="changeType(2)">娱乐类</span>
      </div>

      <div class="line"></div>

      <div>
        <img src="https://act.bomaleye.com/planx_topic.png"
             alt="">
        <span class="type">话题</span>
        <span class="topic"># “Plan X人才计划”短视频春季挑战赛"</span>
      </div>

      <span class="publish"
            @click="publish">发布</span>

      <van-action-sheet v-model="show"
                        :actions="types"
                        cancel-text="取消"
                        description="选择专业"
                        @select="onSelect"
                        close-on-click-action />
    </div>

  </div>
</template>

<script>
import navigationBar from '../../components/common/navigation-bar'
import { Uploader } from 'vant';
import { getVideoType, saveVideo } from "../../api/index"
import { Toast } from 'vant'

export default {
  name: "publish",
  components: {
    navigationBar,
    Uploader
  },
  data () {
    return {
      navTitle: "发布",
      desc: "",
      type: 2,    // 1:专业类  2:娱乐类
      fileList: [{ url: 'https://img01.yzcdn.cn/vant/leaf.jpg' }],
      videoDesc: '',
      show: false,
      types: [],
      typeId: 3,
      typeName: '专业类',
      videoUrl: '',
      videoCoverUrl: '',
      test: [],
      key:""
    }
  },
  mounted () {
    this.getType();
    this.getVideoImg(this.$route.params.videoUrl);

  },
  methods: {
    getType () {
      this.$loading();
      getVideoType('').then(res => {
        this.$toast.clear();
        this.types = res.datas
      });
    },
    getVideoImg (videoUrl) {
      this.videoCoverUrl = this.videoposterFilter(videoUrl)
    },
    changeType (type) {
      if (this.type != type) {
        this.type = type;
      }
      if (type == 1) {
        this.show = true;
      } else {
        this.typeId = 3;
      }
    },
    onSelect (item) {
      this.typeId = item.id;
      this.typeName = item.name;
    },
    afterRead (file) {
      // 此时可以自行将文件上传至服务器
    //  console.log(file);
      this.$loading();
      this.uploadQiniu(file.file, 2).then((res) => {
        this.$toast.clear();
        this.videoCoverUrl ="http://img.bomaleye.com/"+ res.key;
        this.key = res.key
      });
    },
    publish () {
      console.log(this.$route)
      if (this.videoDesc.length == 0) {
        Toast('请填写描述')
        return
      }
      let params = {
        number: this.$route.params.number,
        videoDesc: this.videoDesc,
        videoSort: this.$route.params.videoSort,
        videoTopic: '# “Play X人才计划”短视频春季挑战赛"',
        videoType: this.typeId,
        videoUrl: this.$route.params.videoUrl,
        videoCoverUrl:this.key
      }
      this.$loading();
      saveVideo(params).then(res => {
        this.$toast.clear();
        Toast('发布成功');
        this.$router.go(-1);
      });
    },
    // 删除视频
    delSidelights () {
      this.videoCoverUrl = "";
      this.key =""
    },
    // afterRead (file) {
    //    console.log(file);
    // }
  },



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

  .content {
    padding: pxTorem(160px) pxTorem(30px) pxTorem(30px) pxTorem(30px);
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

    // img {
    //   width: pxTorem(27px);
    //   height: pxTorem(27px);
    //   margin-right: pxTorem(5px);
    // }

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

    .publish {
      display: inline-block;
      width: 90%;
      height: pxTorem(93px);
      background: #fcf24f;
      border-radius: pxTorem(47px);
      text-align: center;
      line-height: pxTorem(93px);
      color: #070133;
      font-weight: 500;
      font-size: pxTorem(32px);
      position: fixed;
      bottom: pxTorem(100px);
    }
  }

  textarea {
    width: 100%;
    background-color: transparent;
    border: 0px;
  }
}
</style>
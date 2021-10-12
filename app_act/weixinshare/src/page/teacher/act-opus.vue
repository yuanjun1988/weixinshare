<template>
  <div class="main">
    <navigation-bar :navTitle='navTitle'
                    @backTo='busy = true'></navigation-bar>
    <!-- <div class="list-content" v-infinite-scroll="loadMore"
       infinite-scroll-disabled="busy"
       infinite-scroll-distanc="40"> -->
    <div class="list-content">
      <div class="search-item">
        <input type="text"
               v-resetInput
               v-model="filter"
               placeholder="请输入用户姓名查找">
        <div @click="getLecVideoList">搜索</div>
      </div>
      <div class="top-tip" v-show="type == 1">
          请选择喜欢的视频去分享 (单选）
      </div>
      <div class="video-content">
          <van-radio-group v-model="checked" @change='changeRadio'>
          <div class="video-list">
            <div class="video-list-item"
                v-for="(item, index) in videoList"
                :key="index">
                <div class="video-img" @click="playVideo(index)">
                <img v-if="item.videoUrl"
                    :src="videoposterFilter(item.videoUrl)"
                    class="video-pre"
                    alt="">
                <i v-else
                    class="van-icon van-icon-photo van-image__loading-icon"></i>
                <img v-if="item.videoUrl"
                    src="http://img.bomaleye.com/20210226172546332_4043"
                    class="play-icon"
                    alt=""
                    >
                </div>
                <div class="video-tip">
                    <div>
                        <img v-if="item.headportrait" :src="photoFilter(item.headportrait, 100, 100)" class="tag_image">
                        <img v-else src="https://img.bomaleye.com/image/coomon_header.png" alt="" class="tag_image">
                        <span class="user_name">{{item.userName}}</span>
                    </div>
                    <div>
                        <img class="count-icon" src="http://img.bomaleye.com/20210616150733775_5344" alt="">
                        <span>{{item.voteCount}}</span>
                    </div>
                </div>
                <van-radio :name="item" class="select-btn" checked-color='#01FDF6' v-show="type == 1"></van-radio>
            </div>
        </div>
        </van-radio-group>
      </div>
    </div>
    <div class="team-bottom">
      <div v-if="type == 1" class="create-btn"
           @click="shareActivityVideo">
        分享视频
      </div>
    </div>
  </div>
</template>
<script>
import { handleVote, getLecVideoList} from "../../api/index"
import navigationBar from '../../components/common/navigation-bar'
import { Toast } from 'vant'
import tools from "../../common/tools"
export default {
  components: {
    navigationBar
  },
  data() {
    return {
      navTitle: '报名作品',
      page: 1,
      limit: 10,
      videoType: 1,
      loadMoreStatus: true,
      videoList: [],
      filter: '',
      busy: false,
      checked: false,
      voteData: {},
      isShow: false,
      isJoin: tools.sessiongetItem("isJoin"),
      type: this.$route.query.type
    }
  },
  watch: { 
    'filter':{
      handler(val,oldVal){
      if(val == '') {
          this.getLecVideoList();
      }
    }
    }
  },
  created() {
    this.getLecVideoList();
  },
   activated(){  // keep-alive 组件激活时使用
       this.busy = false
    },
    deactivated () {  // keep-alive 组件停用时使用
        this.busy = true    
    },
  methods: {
    playVideo(index) {
      this.busy = true;
      tools.localsetItem('videoList', this.videoList, 1)
      this.$router.push({
          path:"/actVideoPreview/" + index 
      })
    },
    changeRadio(voteData) {
      this.voteData = voteData;
    },

    //获取活动视频列表
    getLecVideoList() {
      let params = ''
      if(this.filter) {
        params = {
          userName: this.filter
        }
      }
      
      getLecVideoList(params).then(res => {
        this.$toast.clear();
        if (res.resp_code == 0) {
          this.videoList = res.datas;
          if(res.datas.length == 0) {
              this.type = 0;
          }
        }
      })
    },
    shareActivityVideo () {
      if(tools.sessiongetItem("isJoin") == 1) {
         Toast('您已经报名，不能分享拉票！');
         return;
      }
      if(this.voteData.length == 0) {
        Toast('请先选择一个视频作品！');
         return;
      }
      let params = {
        title: '我正在参加《我是好讲师》大赛，请为我投票，感谢你的助力!', // 分享标题
        desc: '赶快帮我投票吧，呼朋唤友帮忙投票啦，多邀多得！', // 分享描述
        link: window.location.href.split('#')[0] + '#/sharePreview?shareVideoId=' + this.voteData.id + '&userId=' + tools.sessiongetItem('userId'),
        imgUrl: 'https://act.bomaleye.com/teacher-share-logo1.png', // 分享图标
      }
      tools.mobileDetect() == 1 ? window.webkit.messageHandlers.shareActivityVideo.postMessage(params) : this.$bridge.callHandler('shareActivityVideo', params, (res) => { responseCallback(params) })
    },
    //    //获取活动视频列表
    // getLecVideoList() {
    //   let params = {
    //     page: this.page,
    //     limit: this.limit,
    //     videoType: this.videoType,
    //     filter: this.filter,
    //     userType: tools.sessiongetItem("userType")
    //   }
    //   getLecVideoList(params).then(res => {
    //     this.$toast.clear();
    //     if (res.resp_code == 0) {
    //       this.videoList = this.videoList.concat(res.datas) || [];
    //       if (res.datas.count / 10 <= this.page) {
    //         this.loadMoreStatus = true;
    //       } else {
    //         this.loadMoreStatus = false;
    //       }
    //     }
    //   })
    // },

    //无限加载
    loadMore() {
      if (this.loadMoreStatus) {
        Toast('没有更多了');
      } else {
        this.page = this.page + 1;
        if (this.videoType == 4) {
            this.searchVideo();
        } else {
            this.getLecVideoList();
        }
      }
    },

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
  height: auto;
  min-height: 100%;
  background: linear-gradient(0deg, #0D061B 0%, #170637 100%);
  .list-content {
    padding: pxTorem(220px) pxTorem(28px) 0;
    min-height: pxTorem(860px);
    .search-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: pxTorem(42px);
      input {
        width: pxTorem(526px);
        height: pxTorem(74px);
        background: #120d38;
        border: 1px solid #ffffff;
        border-radius: pxTorem(36px);
        padding: 0 pxTorem(34px);
        color: #ffffff;
      }
      div {
        font-size: pxTorem(28px);
        font-family: PingFang SC;
        font-weight: 500;
        color: #ffffff;
      }
    }
  }
  .top-tip {
    font-size: pxTorem(28px);
    font-family: PingFang SC;
    font-weight: 500;
    color: #01FDF6;
  }
  .video-content {
    width: 100%;
    .video-list {
      height: auto;
      padding: pxTorem(54px) 0  pxTorem(64px);
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .video-list-item {
        position: relative;
        margin: pxTorem(14px) 0;
        background: #21133C;
        border-radius: pxTorem(16px);
        .select-btn {
          position: absolute;
          top: pxTorem(20px);
          right: pxTorem(20px);
        }
        .video-img {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          background: url(http://img.bomaleye.com/20210301180601228_3801)
            no-repeat center center;
          background-size: cover;
          border-radius: pxTorem(16px)  pxTorem(16px) 0 0;
          .video-pre {
            width: pxTorem(314px);
            height: pxTorem(420px);
            object-fit: cover;
            object-position:center center;
            border-radius: pxTorem(16px)  pxTorem(16px) 0 0;
          }
          .play-icon {
            width: pxTorem(40px);
            height: pxTorem(44px);
            position: absolute;
          }
        }
        .video-tip {
          width: pxTorem(314px);
          padding: pxTorem(26px) pxTorem(12px) pxTorem(30px);
          box-sizing: border-box;
          font-size: pxTorem(24px);
          font-family: PingFang SC;
          font-weight: 500;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .tag_image {
            width: pxTorem(38px);
            height: pxTorem(38px);
            border-radius: 50%;
          }
          .user_name {
            display: inline-block;
            width: pxTorem(150px);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            margin-left: pxTorem(12px);
          }
          .count-icon {
            width: pxTorem(24px);
            height: pxTorem(20px);
            margin-right: pxTorem(8px);
          }
        }
        .video-tip>div {
          display: flex;
          align-items: center;
        }
      }
    }
  }
  .team-bottom {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: pxTorem(48px) 0 pxTorem(80px);
  }
  .create-btn {
    width: pxTorem(432px);
    height: pxTorem(106px);
    line-height: pxTorem(106px);
    border-radius: pxTorem(60px);
    text-align: center;
    font-size: pxTorem(32px);
    font-family: PingFang SC;
    font-weight: 500;
    color: #FFFFFF;
    background: url(http://img.bomaleye.com/20210615104955613_2085) no-repeat
      center center;
    background-size: contain;
  }
}
</style>

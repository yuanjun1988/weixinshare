<template>
  <div class="main">
    <navigation-bar :navTitle='navTitle'  @backTo='closeActivity'>
    </navigation-bar>
    <div class="content">
        <img class="con-header" src="http://img.bomaleye.com/20210707143731955_2867" alt="">
        <img class="act-step" src="https://act.bomaleye.com/teacher-flow-time1.png" alt="">
        <div class="act-rule">
            <div class="rule-item" @click="routerToPage(1)">
                比赛规则
            </div>
            <div class="rule-item" @click="routerToPage(2)">
                评审团
            </div>
            <div class="rule-item" @click="routerToPage(3)">
                大赛简介
            </div>
            <div class="rule-item" @click="routerToPage(4)">
                报名作品
            </div>
            <div class="rule-item" @click="routerToPage(5)">
                奖项设置
            </div>
            <div class="rule-item" @click="routerToPage(6)">
                实时榜单
            </div>
        </div>
        <img class="act-intro" src="https://act.bomaleye.com/teacher-cooperation1.png" alt="">
        <div class="act-btn">
            <span @click="routerToPage(7)" v-if="isJoin == 0" class="confirm-btn active">立即报名</span>
            <span @click="routerToPage(8)" v-else class="confirm-btn active">已报名</span>
            <span @click="routerToPage(9)" class="confirm-btn">分享拉票</span>
        </div>
    </div>
    <img class="application-btn" v-if="isJoin == 1" @click="routerToPage(8)" src="http://img.bomaleye.com/2021062211235459_3147" alt="">
    <img class="share-btn" @click="shareActivity" src="http://img.bomaleye.com/20210622112922928_7527" alt="">
  </div>

</template>
<script>
import { cheackIsJoinAct } from "../../api/index"
import navigationBar from '../../components/common/navigation-bar'
import tools from "../../common/tools"
import { Toast } from 'vant'
export default {
  components: {
    navigationBar
  },
  data () {
    return {
      navTitle: '2021“我是好讲师”报名入口',
      isJoin: 0
    }
  },
  created () { 
      tools.sessionsetItem("token", tools.GetQueryString('token'));
      tools.sessionsetItem("userId", tools.GetQueryString('userId'));
      if(tools.GetQueryString('userType') == 0) {
        Toast('请切换身份参加活动')
        this.closeActivity ()
        return;
      }
      this.cheackIsJoinAct();
  },
  mounted () {
    this.$bridge.registerHandler('sendFileIfo', (params, responseCallback) => {
      this.sendFileIfo(params);
      responseCallback(params)
    })
  },
  methods: {
    routerToPage(type) {
        let path = ''
        switch (type) {
        case 1:
            path = '/actRule'
            break;
        case 2:
            path = '/actJury'
            break;
        case 3:
            path = '/actContest'
            break;
        case 4:
            path = this.setClickStatus() ? '/actOpus' : '/downloadTip';
            break;
        case 5:
            path = '/actAlarmSetting'
            break;
        case 6:
            path = this.setClickStatus() ? '/rankingList' : '/downloadTip';
            break;
        case 7:
            path = this.setClickStatus() ? '/signUp' : '/downloadTip';
            break;
        case 8:
            path = this.setClickStatus() ? '/selfPage' : '/downloadTip';
            break;
        case 9:
            path = this.setClickStatus() ? '/actShare' : '/downloadTip';
            break;
        }
    this.$router.push({
        path: path
        })
    },
    cheackIsJoinAct() {
        let params = {};
      cheackIsJoinAct(params).then(res => {
          if (res.resp_code == 0) {
            this.isJoin = res.datas.join;
            tools.sessionsetItem("isJoin", res.datas.join);
            tools.sessionsetItem("timeStamp", res.datas.gameStartTime);
            }
      })
    },
    setClickStatus() {
          if(!tools.sessiongetItem("token") || tools.sessiongetItem("token") == null || tools.sessiongetItem("token") == undefined || tools.sessiongetItem("token") == 'null') {
              return false;
          } else {
              return true;
          }
      },
    //关闭活动
    closeActivity () {
      let params = {};
      tools.mobileDetect() == 1 ? window.webkit.messageHandlers.closeActivity.postMessage(params) : this.$bridge.callHandler('closeActivity', params, (res) => { responseCallback(params) })
    },

    //分享活动
    shareActivity() {
      let params = {
        title: '我正在参加《我是好讲师》大赛，请为我投票，感谢你的助力!', // 分享标题
        desc: '赶快帮我投票吧，呼朋唤友帮忙投票啦，多邀多得！', // 分享描述
        link: window.location.href.split('#')[0] + '#/actHomepage',
        imgUrl: 'https://act.bomaleye.com/teacher-share-logo1.png', // 分享图标
      }
      tools.mobileDetect() == 1 ? window.webkit.messageHandlers.shareActivity.postMessage(params) : this.$bridge.callHandler('shareActivity', params, (res) => { responseCallback(params) })
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
  background: linear-gradient(0deg, #0D061B 0%, #170637 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  .application-btn {
    width: pxTorem(80px);
    height: pxTorem(270px);
    position: fixed;
    top: pxTorem(540px);
    right: 0;
  }
  .act-step {
    width: 100%;
    height: pxTorem(490px);
    margin-top: pxTorem(24px);
  }
  .act-intro {
    width: 100%;
    height: pxTorem(1470px);
    margin-top: pxTorem(86px);
  }
  .share-btn {
    width: pxTorem(36px);
    position: fixed;
    height: pxTorem(36px);
    top: pxTorem(102px);
    right: pxTorem(36px);
    z-index: 9999;
  }
  .content {
      padding-top: pxTorem(260px);
  }
  .con-header {
      width: 100%;
      height: pxTorem(968px);
  }
  .act-rule {
      display: flex;
      flex-wrap: wrap;
      padding: 0 pxTorem(40px);
      justify-content: space-between;
      .rule-item {
        width: pxTorem(204px);
        height: pxTorem(96px);
        padding-left: pxTorem(90px);
        padding-top: pxTorem(30px);
        box-sizing: border-box;
        background: url(http://img.bomaleye.com/20210618154359681_7986) no-repeat
        center center;
        background-size: 100% 100%;
        font-size: pxTorem(24px);
        font-family: Alibaba PuHuiTi;
        font-weight: 400;
        color: #FFFFFF;
        margin-top: pxTorem(16px);
      }
      .item-1 {
            background: url(http://img.bomaleye.com/20210618154359681_7986) no-repeat
            center center;
            background-size: 100% 100%;
      }
      .item-1 {
            background: url(http://img.bomaleye.com/20210618155950850_8072) no-repeat
            center center;
            background-size: 100% 100%;
      }
  }
  .act-btn {
      width: 100%;
      text-align: center;
      padding: pxTorem(110px) 0;
      span {
        margin: pxTorem(16px) 0;
      }
  }
  .confirm-btn {
    display: inline-block;
    width: pxTorem(474px);
    height: pxTorem(100px);
    line-height: pxTorem(100px);
    margin-top: pxTorem(110px);
    text-align: center;
    border-radius: pxTorem(60px);;
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
    background-size: 100% 100%;
  }
}
</style>

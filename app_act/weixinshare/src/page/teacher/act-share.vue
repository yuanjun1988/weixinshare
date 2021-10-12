<template>
  <div class="main">
    <navigation-bar :navTitle='navTitle'></navigation-bar>
    <div class="content">
      <div class="act-info">
        <div class="info-header">
          <div>
            <img v-if="incomeInfo.headPortrait"
                 :src="photoFilter(incomeInfo.headPortrait, 100, 100)">
            <img v-else
                 src="https://img.bomaleye.com/image/coomon_header.png"
                 alt="">
          </div>
          <span>{{incomeInfo.userName}}</span>
        </div>
        <div class="info-detail">
          <div>
            <p>{{incomeInfo.mtCount}}</p>
            <span>当前收益</span>
          </div>
          <div class="soild-item"></div>
          <div>
            <p>{{incomeInfo.shareCount}}</p>
            <span>已邀请人数</span>
          </div>
          <div class="soild-item"></div>
          <div @click="incomeDetails">
            <img src="http://img.bomaleye.com/20210617165929761_8541"
                 alt="">
            <span>收益明细</span>
          </div>
        </div>
        <div class="act-btn">
          <span class="confirm-btn active" @click="shareActivityVideo">分享拉票</span>
        </div>
      </div>
      <div class="act-rule">
        <img class="rule_1"
             src="http://img.bomaleye.com/20210617170750613_9719"
             alt="">
        <img class="rule_2"
             src="http://img.bomaleye.com/20210617170910635_6136"
             alt="">
        <img class="rule_3"
             src="http://img.bomaleye.com/20210617163315237_9898"
             alt="">
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
      navTitle: '分享拉票',
      incomeInfo: {}
    }
  },
  created () {
    this.getActDetail();
  },
  mounted () {
    this.$bridge.registerHandler('sendFileIfo', (params, responseCallback) => {
      this.sendFileIfo(params);
      responseCallback(params)
    })
  },
  methods: {
    getActDetail () {
      let params = {};
      getActDetail(params).then(res => {
        if (res.resp_code == 0) {
          this.incomeInfo = res.datas
        }
      })

    },
    incomeDetails () {
      this.$router.push({
        path: "/incomeDetail"
      })
    },
    shareActivityVideo () {
      if(tools.sessiongetItem("isJoin") == '1') {
        Toast('您已参赛，快去分享作品投票吧！')
        return;
      }
      this.$router.push({
        path: "/actOpus",
        query: {
          type: 1
        }
      })
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
  background: linear-gradient(0deg, #0d061b 0%, #170637 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 pxTorem(32px) pxTorem(96px);
  .content {
    padding-top: pxTorem(200px);
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
    height: pxTorem(400px);
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
    justify-content: center;
    align-items: center;
    padding: pxTorem(80px) 0 pxTorem(118px);
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
    color: #ffffff;
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
      margin-top: pxTorem(30px);
    }
    .rule_1 {
      height: pxTorem(630px);
    }
    .rule_2 {
      height: pxTorem(276px);
    }
    .rule_3 {
      height: pxTorem(440px);
    }
  }
}
</style>

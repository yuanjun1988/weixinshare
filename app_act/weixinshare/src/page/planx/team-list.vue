<template>
  <div class="main">
    <navigation-bar :navTitle='navTitle'></navigation-bar>
    <div class="list-content">
      <div class="search-item">
        <input type="text"
               v-resetInput
               v-model="filter"
               placeholder="输入团队名称或序号搜索">
        <div @click="getTeamList">搜索</div>
      </div>
      <div class="content-item">
        <ul>
          <li class="li-title">
            <span class="li-num">序号</span>
            <span class="li-name">团队名称</span>
            <span>人数</span>
          </li>
          <li class="li-item"
              v-for="(item, index) in teamList"
              :key="index">
            <span class="li-num">{{item.number}}</span>
            <span class="li-name">{{item.name}}</span>
            <span class="li-count">{{item.memberNumber}}<span>/5</span></span>
            <span v-if="item.memberNumber == '5'"
                  class="join-btn unactive">已满</span>
            <span v-else
                  class="join-btn active"
                  @click.stop="openJoinCover(item.id)">加入</span>
          </li>

        </ul>
        <div class="content-bottom">
          <div class="page-btn"
               @click="prePage">
            <img src="http://img.bomaleye.com/20210224161947678_4801"
                 alt="">
            <span>上一页</span>
          </div>
          <div class="page-num">
            <span>{{pageNum}}</span>
            <span>/</span>
            <span>{{pageCount}}</span>
          </div>
          <div class="page-btn"
               @click="nextPage">
            <img src="http://img.bomaleye.com/20210224162021624_1986"
                 alt="">
            <span>下一页</span>
          </div>
        </div>
      </div>
    </div>
    <div class="team-bottom">
      <div class="create-btn-1"
           @click="coverIsshow = true">
        创建团队
      </div>
    </div>
    <van-overlay :show="coverIsshow"
                 @click.stop="coverIsshow = false">
      <div class="wrapper"
           @click.stop>
        <div class="wrapper-title">
          创建团队
        </div>
        <div>
          <span class="wrapper-tips">请输入团队名称</span>
          <input type="text"
                 v-resetInput
                 v-model="teamName"
                 placeholder="请输入名称"
                 maxlength="10">
        </div>
        <div>
          <span class="wrapper-tips">请输入团队密码</span>
          <input type="password"
                 v-resetInput
                 v-model="password"
                 placeholder="请输入6-18位密码"
                 minlength="6"
                 maxlength="18">
        </div>
        <div class="team-bottom">
          <div :class="confirmStatus ? 'create-btn-2 active' : 'create-btn-2'"
               @click="confirmStatus && createTeam()">
            确定
          </div>
        </div>
      </div>
    </van-overlay>
    <van-overlay :show="coverIsshow2"
                 @click.stop="coverIsshow2 = false">
      <div class="wrapper"
           @click.stop>
        <div class="wrapper-title">
          请输入团队密码
        </div>
        <div>
          <span class="wrapper-tips"></span>
          <input type="password"
                 v-resetInput
                 v-model="joinTeamPassword"
                 placeholder="请输入密码">
        </div>
        <div class="team-bottom">
          <div :class="passwordStatus ? 'create-btn-2 active' : 'create-btn-2'"
               @click=" passwordStatus && joinTeam()">
            确定
          </div>
        </div>
      </div>
    </van-overlay>

    <!-- 个人身份创建团队确认 -->
    <van-overlay :show="coverIsshow3"
                 @click.stop="coverIsshow3 = false">
      <div class="wrapper"
           @click.stop>
        <div class="wrapper-title">
          确认创建团队
        </div>
        <span class="wrapper-tips1">创建团队之后，您将以团长身份参赛，您已上传的个人作品将被全部清空，且选择后不可切换回个人身份继续参赛。</span>
        <div class="team-bottom">
          <div :class="'confirm-concel'"
               @click.stop="coverIsshow3 = false">
            取消
          </div>

          <div :class="confirmStatus ? 'confirm-ok active1' : 'confirm-ok'"
               @click="confirmStatus && sendCreateTeam()">
            确定
          </div>
        </div>
      </div>
    </van-overlay>
  </div>

</template>
<script>
import { getTeamList, createTeam, joinTeam } from "../../api/index"
import navigationBar from '../../components/common/navigation-bar'
import { Toast } from 'vant'
export default {
  components: {
    navigationBar
  },
  data () {
    return {
      navTitle: '团队列表',
      pageNum: 1,
      pageSize: 8,
      filter: '',
      teamList: [],
      pageCount: 0,
      coverIsshow: false,
      coverIsshow2: false,
      teamName: '',
      password: '',
      joinTeamPassword: '',
      type: 1,  // 0待定身份  1:个人身份  2:团队身份
      coverIsshow3: false,
    }
  },
  created () {
    this.type = this.$route.params.type;
    this.getTeamList();
  },
  computed: {
    confirmStatus: function () {
      return this.password.length >= 6 && this.teamName != '' ? true : false
    },
    passwordStatus: function () {
      return this.joinTeamPassword != '' && this.joinTeamPassword.length >= 6 ? true : false
    },
  },
  watch: {
    filter: function () {
      if (this.filter == '') {
        this.getTeamList();
      }
    }
  },
  methods: {

    //获取团队列表--后一页
    nextPage () {
      this.pageNum++;
      this.getTeamList();
    },

    //获取团队列表--前一页
    prePage () {
      this.pageNum--;
      this.getTeamList();
    },

    //获取团队列表
    getTeamList () {
      this.$loading();
      let params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        filter: this.filter
      }
      getTeamList(params).then(res => {
        this.$toast.clear();
        this.teamList = res.datas.data || [];
        this.pageCount = Math.ceil(res.datas.count / this.pageSize);
      })
    },

    //创建团队
    createTeam () {
      if (this.type == 1) {
        this.coverIsshow3 = true;
        return;
      }
      this.sendCreateTeam();
    },

    sendCreateTeam () {
      let params = {
        password: this.password,
        name: this.teamName
      }
      createTeam(params).then(res => {
        if (res.resp_code == 0) {
          // 团队身份
          this.$router.push({
            path: "/planxSpace/2/0"
          })
        } else {
          Toast(res.resp_msg)
        }
      })
    },

    openJoinCover (id) {
      this.joinId = id;
      this.coverIsshow2 = true;
    },

    //加入团队
    joinTeam () {
      if (this.joinTeamPassword == '' || this.joinTeamPassword == '') {
        Toast('密码不能为空')
      }
      let params = {
        password: this.joinTeamPassword,
        id: this.joinId
      }
      joinTeam(params).then(res => {
        if (res.resp_code == 0) {
          Toast('成功加入团队')
          this.$router.push({
            path: "/planxSpace/2/0"
          })
        } else {
          Toast(res.resp_msg)
        }
      })
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
  height: auto;
  min-height: 100%;
  background: url(http://act.bomaleye.com/planx_home_bg.png) no-repeat center
    center;
  background-size: cover;
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
    .content-item {
      height: auto;
      min-height: pxTorem(880px);
      padding: pxTorem(68px) pxTorem(50px);
      background: url(https://act.bomaleye.com/planx_teams_bg.png) no-repeat
        center center;
      background-size: 100% 100%;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      ul {
        width: 100%;
      }
      li {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .li-title {
        color: #fcf24f;
        font-size: pxTorem(26px);
      }
      .li-title::after {
        content: "";
        width: pxTorem(128px);
        height: pxTorem(54px);
      }
      .li-item {
        margin: pxTorem(36px) 0;
        span {
          color: #ffffff;
          font-size: pxTorem(28px);
        }
      }
      .li-num {
        display: inline-block;
        width: pxTorem(60px);
        text-align: center;
      }
      .li-name {
        display: inline-block;
        min-width: pxTorem(166px);
        text-align: center;
        width: pxTorem(240px);
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        -o-text-overflow: ellipsis;
      }
      .li-count {
        font-size: pxTorem(38px) !important;
      }
      .join-btn {
        width: pxTorem(128px);
        height: pxTorem(54px);
        line-height: pxTorem(54px);
        text-align: center;
        border-radius: pxTorem(26px);
        font-size: pxTorem(28px);
        font-family: PingFang SC;
        font-weight: 500;
      }
      .active {
        background: #fc4ff4;
        color: #ffffff;
      }
      .unactive {
        background: #2effff;
        color: #222222 !important;
      }
    }
    .content-bottom {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: pxTorem(56px);
      position: absolute;
      bottom: pxTorem(80px);
      .page-btn {
        position: relative;
        display: flex;
        width: pxTorem(122px);
        height: pxTorem(54px);
        align-items: center;
        justify-content: center;
        img {
          width: pxTorem(122px);
          height: pxTorem(54px);
          position: absolute;
          top: 0;
          left: 0;
        }
        span {
          font-size: pxTorem(24px);
          font-family: PingFang SC;
          font-weight: 400;
          color: #2effff;
        }
        .font-active {
          color: #2effff;
        }
        .font-unactive {
          color: #808080;
        }
      }
      .page-num {
        margin: 0 pxTorem(30px);
        span {
          font-size: pxTorem(28px);
          font-family: PingFang SC;
          font-weight: 500;
          color: #ffffff;
        }
      }
    }
  }

  /deep/ .van-overlay {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
  .wrapper {
    width: pxTorem(574px);
    background: #ffffff;
    border-radius: pxTorem(6px);
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: pxTorem(56px) 0 0;
    div {
      display: flex;
      flex-direction: column;
    }
    input {
      width: pxTorem(444px);
      height: pxTorem(74px);
      background: #ffffff;
      border: pxTorem(1px) solid #808080;
      padding-left: pxTorem(22px);
    }
    .wrapper-title {
      font-size: pxTorem(32px);
      font-family: PingFang SC;
      font-weight: 550;
      color: #070133;
      margin-bottom: pxTorem(12px);
    }
    .wrapper-tips {
      font-size: pxTorem(28px);
      font-family: PingFang SC;
      font-weight: 550;
      color: #070133;
      text-indent: pxTorem(20px);
      margin: pxTorem(46px) 0 pxTorem(14px);
    }
    .wrapper-tips1 {
      font-size: pxTorem(28px);
      font-family: PingFang SC;
      font-weight: 400;
      color: #070133;
      text-indent: pxTorem(20px);
      margin: pxTorem(46px) pxTorem(20px) pxTorem(14px);
    }
  }
  .team-bottom {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: pxTorem(60px) 0;
    flex-direction: row !important;
  }
   .confirm-ok {
    height: pxTorem(80px);
    line-height: pxTorem(80px);
    border-radius: pxTorem(60px);
    text-align: center;
    font-size: pxTorem(32px);
    font-family: PingFang SC;
    font-weight: 500;
    color: #070133;
    // background: url(http://img.bomaleye.com/20210224160455944_6979) no-repeat
    //   center center;
    background-color: #fcf24f;
    background-size: cover;
    padding: 0 pxTorem(60px);
    margin-left: pxTorem(40px);
  }

  .active1 {
    background-color: #fcf24f;
    background-size: cover;
  }

  .confirm-concel {
    height: pxTorem(80px);
    line-height: pxTorem(80px);
    border-radius: pxTorem(60px);
    text-align: center;
    font-size: pxTorem(32px);
    font-family: PingFang SC;
    font-weight: 500;
    color: #070133;
    background: #ddd;
    padding: 0 pxTorem(60px);
  }

  .create-btn-1 {
    width: pxTorem(432px);
    height: pxTorem(106px);
    line-height: pxTorem(106px);
    border-radius: pxTorem(60px);
    text-align: center;
    font-size: pxTorem(32px);
    font-family: PingFang SC;
    font-weight: 500;
    color: #070133;
    background: url(http://img.bomaleye.com/20210224160455944_6979) no-repeat
      center center;
    background-size: cover;
  }
  .create-btn-2 {
    width: pxTorem(432px);
    height: pxTorem(106px);
    line-height: pxTorem(106px);
    border-radius: pxTorem(60px);
    text-align: center;
    font-size: pxTorem(32px);
    font-family: PingFang SC;
    font-weight: 500;
    color: #070133;
    background: #ddd;
  }
  .active {
    background: url(http://img.bomaleye.com/20210224160455944_6979) no-repeat
      center center;
    background-size: cover;
  }
}
</style>

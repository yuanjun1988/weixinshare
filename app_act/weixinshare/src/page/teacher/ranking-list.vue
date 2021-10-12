<template>
  <div class="main">
    <navigation-bar :navTitle='navTitle'></navigation-bar>
    <div class="ranking-ballotNum">
      <div class="ranking-list">
        <div class="ranking-list-item"
             v-for="(item, index) in rankingList"
             :key="index">

          <div class="ranking-list-left">
            <div class="left">
              <span v-if="index > 2" class="number">{{Number(index)+1}}</span>
              <img class="ranking"  v-if="index == 0" src="https://act.bomaleye.com/teacher-first.png" alt="">
              <img class="ranking" v-if="index == 1" src="https://act.bomaleye.com/teacher-second.png" alt="">
              <img  class="ranking" v-if="index == 2" src="https://act.bomaleye.com/teacher-third.png" alt="">
              <img class="img" v-if="item.headPortrait"
                   :src="getImgPreview(item.headPortrait, 80, 80)"
                   alt="">
              <img class="img" v-else
                   src="https://img.bomaleye.com/image/user_common_icon.png"
                   alt="">
            </div>
            <div class="ranking-list-center">
              <span class="vote-hint">姓名</span>
              <span class="user-name">{{item.userName}}</span>
            </div>
          </div>

          <div class="ranking-list-right">
            <span class="vote-hint">票数</span>
            <span class="vote-count">{{item.voteCount}}</span>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { getRankings } from "../../api/index"
import navigationBar from '../../components/common/navigation-bar'
import { Toast } from 'vant'
export default {
  components: {
    navigationBar
  },
  data () {
    return {
      rankingList: [],
      navTitle: '实时榜单'
    }
  },
  created () {
    this.voteRanking();
  },
  mounted () {
  },
  methods: {
    voteRanking () {
      this.$loading();
      getRankings({}).then(res => {
        this.$toast.clear();
        if (res.resp_code == 0) {
          this.rankingList = res.datas
        } else {
          Toast(res.resp_msg, false);
        }

      })
    },
    getImgPreview (url, w, h) {
      let newurl;
      if (w && h) {
        newurl = 'http://img.bomaleye.com/' + url + '?imageView2/5/w/' + w + '/h/' + h;
      } else {
        newurl = 'http://img.bomaleye.com/' + url;
      }
      if (!url) {
        newurl = 'https://img.bomaleye.com/image/user_common_icon.png'
      }
      return newurl;
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
  background: #0d001e;
  height: 100%;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  .ranking-ballotNum {
    padding: pxTorem(205px) pxTorem(40px) pxTorem(25px) pxTorem(40px);
  }
  .ranking-list {
    height: auto;
    margin-bottom: pxTorem(-40px);
    .ranking-list-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: pxTorem(52px);
      .ranking-list-left,.left {
        display: flex;
        align-items: center;
        .ranking {
          width: pxTorem(45);
          height: pxTorem(36);
        }
        .img {
          width: pxTorem(80px);
          height: pxTorem(80px);
          margin: 0 pxTorem(24px) 0 pxTorem(20px);
          border-radius: 60%;
        }
        .number {
          width: pxTorem(40px);
          height: pxTorem(40px);
          text-align: center;
          padding: pxTorem(3px);
          line-height: pxTorem(40px);
          background: #2b1558;
          font-size: pxTorem(24px);
          font-family: PingFang SC;
          font-weight: 500;
          color: #cccccc;
        }
        // p {
        //   font-size: pxTorem(26px);
        //   font-family: PingFang SC;
        //   font-weight: 500;
        //   color: #ffffff;
        //   width: pxTorem(300px);
        //   overflow: hidden;
        //   white-space: nowrap;
        //   text-overflow: ellipsis;
        // }

        .ranking-list-center {
          display: flex;
          align-items: center;
          flex-direction: row;
          justify-content: start;
          margin-left: pxTorem(70px);
          .vote-hint {
            color: #808080;
            padding-right: pxTorem(20px);
            font-size: pxTorem(24px);
          }
          .user-name {
            font-size: pxTorem(28px);
            color: #fff45c;
            font-weight: bold;
          }
        }
      }

      .ranking-list-right {
        display: flex;
        align-items: center;
        .vote-hint {
          color: #808080;
          padding-right: pxTorem(15px);
          font-size: pxTorem(24px);
        }
        .vote-count {
          font-size: pxTorem(28px);
          color: #ffffff;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
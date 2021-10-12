<template>
  <div class="main">
    <navigation-bar :navTitle='navTitle'></navigation-bar>
    <div class="list-content" v-infinite-scroll="loadMore"
       infinite-scroll-disabled="busy"
       infinite-scroll-distanc="40">
       <div class="list-item" v-for="(item, index) in incomeInfo" :key="index">
          <div class="item-con">
            <div class="item-con-left">
                <span>+1</span>
                <span>{{item.createTime}}</span>
            </div>
            <div class="item-con-right">
                <span>用户{{item.phone}}</span>
            </div>
          </div>
          <div class="soild-item"></div>
       </div>
        
    </div>
  </div>

</template>
<script>
import { getVoteList } from "../../api/index"
import navigationBar from '../../components/common/navigation-bar'
import tools from "../../common/tools"
import { Toast } from 'vant'
export default {
  components: {
    navigationBar
  },
  data () {
    return {
      navTitle: '获票明细',
      incomeInfo: [],
      page: 1,
      limit: 10,
      loadMoreStatus: true,
      busy: false,
    }
  },
  created () {
    this.getVoteList();
  },
  mounted () {
    this.$bridge.registerHandler('sendFileIfo', (params, responseCallback) => {
      this.sendFileIfo(params);
      responseCallback(params)
    })
  },
  methods: {
    getVoteList() {
        let params = {
            limit: this.limit,
            page: this.page
        };
      getVoteList(params).then(res => {
        this.$toast.clear();
        if (res.resp_code == 0) {
          this.incomeInfo = this.incomeInfo.concat(res.datas.data) || [];
          console.log(this.incomeInfo)
          if (res.datas.count / 10 <= this.page) {
            this.loadMoreStatus = true;
          } else {
            this.loadMoreStatus = false;
          }
        }
      })

    },
     //无限加载
    loadMore() {
      if (this.loadMoreStatus) {
        Toast('没有更多了');
      } else {
        this.page = this.page + 1;
        this.getVoteList()
      }
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
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 pxTorem(32px) pxTorem(96px);
  background: #0d001e;
  .list-content {
      width: 100%;
      padding-top: pxTorem(200px);
  }
  .list-item {
     
      .item-con {
          padding: pxTorem(50px) 0 pxTorem(40px);;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .item-con-left {
              display: flex;
              flex-direction: column;
          }
          .item-con-left span:nth-child(1) {
            font-size: pxTorem(32px);;
            font-family: PingFang SC;
            font-weight: bold;
            color: #E203FC;
          }
          .item-con-left span:nth-child(2) {
            font-size: pxTorem(28px);;
            font-family: PingFang SC;
            font-weight: 500;
            color: #FFFFFF;
            margin-top: pxTorem(20px);
          }
          .item-con-right {
              span {
                font-size: pxTorem(28px);
                font-family: PingFang SC;
                font-weight: 500;
                color: #FFFFFF; 
              }
          }
      }
    .soild-item {
        width: 100%;
        height: pxTorem(1px);
        background: #E6E6E6;
    }
  }
}
</style>

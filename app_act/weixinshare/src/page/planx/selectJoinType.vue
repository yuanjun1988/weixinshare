<template>
  <div class="mian"
       title="参赛方式">
    <navigation-bar :navTitle='navTitle'></navigation-bar>
    <div class="content">
      <img class="content_bg"
           src="http://act.bomaleye.com/planx_select_type_bg.png"
           alt="">
      <div class="bottom">
        <div class="join"
             v-if="!showJoinType"
             @click="personType(1)">
          <img src="http://act.bomaleye.com/planx_btn_bg.png"
               alt="">
          <span>我是职场人</span>
        </div>

        <span class="hint"
              v-if="!showJoinType">or</span>

        <div class="join"
             v-if="!showJoinType"
             @click="personType(2)">
          <img src="http://act.bomaleye.com/planx_btn_bg1.png"
               alt="">
          <span>我是在校生</span>
        </div>

        <div class="join"
             v-if="showJoinType"
             @click="personalJoin">
          <img src="http://act.bomaleye.com/planx_btn_bg.png"
               alt="">
          <span>个人参赛</span>
        </div>

        <span class="hint"
              v-if="showJoinType">or</span>

        <div class="join"
             v-if="showJoinType"
             @click="teamJoin">
          <img src="http://act.bomaleye.com/planx_btn_bg1.png"
               alt="">
          <span>团队参赛</span>
        </div>

        <div class="restep_"
             v-if="this.typePort == 0 && showJoinType">
          <span class="restep"
                @click="reStep">上一步</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import tools from "../../common/tools"
import navigationBar from '../../components/common/navigation-bar'
import { getUserStatus,selectPersonalIdentify } from "../../api/index"
import { Toast } from 'vant'

export default {
  components: {
    navigationBar
  },
  data () {
    return {
      navTitle: '参赛方式',
      status: -1,  // 0: 未参加活动  1:团队参赛  2:个人参赛
      type: 0,    // 1:职场人  2:在校生
      showJoinType: true,  // true: 显示参赛方式，
      personalMsg: null,
      typePort: -1, // 从后端接口获取到的活动  	0 - 未参加过活动 1- 社会人 2 - 学生
    }
  },
  mounted () {
    this.type = tools.localgetItem('personType') == null ?0: tools.localgetItem('personType');
    if (this.type == "1") this.type = 1
    if (this.type == "2") this.type = 2
    if(this.type == 0){
      this.showJoinType = false;
      this.typePort = 0;
    }else{
      this.showJoinType = true;
    }
    this.getUserStatus();
    //this.type = this.$route.params.type;
  },
  methods: {
    getUserStatus () {
     this.$loading();
      getUserStatus().then(res => {
        this.$toast.clear();
        this.status = res.datas.status;
        this.typePort = res.datas.type;
        this.personalMsg = res.datas.userInfo;
        tools.localsetItem('userInfo', JSON.stringify(res.datas.userInfo));
        // if ((this.type != 0 && this.type != 1 && this.type != 2) && res.datas.type == 0) {
        //   this.showJoinType = false;
        // }
      })
    },
    // 个人参赛
    personalJoin () {
      if (this.typePort == 0) {
        // 首次
        if (this.type == 1) {
          // 社会参赛：进入个人完善简历页面
          this.$router.push({
            name: 'perfectResume',
            params: {
              type: 1
            }
          })
        }
        if (this.type == 2) {
          // 学生参赛：学生认证页面
          this.$router.push({
            path: '/alumnaIdentification/0'
          })
        }
        return;
      }
      // 社会参赛还是学生参赛，根据传进来的数据判断
      switch (this.status) {
        case 0:
          // 未确定身份
          this.setSelectPersonalIdentify();
          // this.$router.push({
          //   path: "/planxSpace/1/0"
          // })
          break;
        case 1:
          // 个人身份
          // 进入个人参赛页面
          this.$router.push({
            path: "/planxSpace/1/0"
          })
          break;
        case 2:
          // 团队身份
          Toast('您已参加团队赛，无法参加个人赛');
          break;
        case 3:
          // 团员身份
          // 进入个人参赛页面
          this.$router.push({
            path: "/planxSpace/1/0"
          })
          break;
        default:
          break;
      }
    },
    // 团队参赛
    teamJoin () {
      if (this.typePort == 0) {
        // 首次
        if (this.type == 1) {
          // 社会参赛：进入个人完善简历页面
          this.$router.push({
            name: 'perfectResume',
            params: { type: 2 }
          })
        }
        if (this.type == 2) {
          // 学生参赛：学生认证页面
          this.$router.push({
            path: '/alumnaIdentification/1'
          })
        }
        return;
      }
      // 社会参赛还是学生参赛，根据传进来的数据判断
      switch (this.status) {
        case 0:
          // 未确定身份
          this.$router.push({
            path: "/teamList/0"
          })
          break;
        case 1:
          // 个人身份
          // 进入团队列表
          this.$router.push({
             path: "/teamList/1"
          })
          break;
        case 2:
          // 团队身份
          this.$router.push({
            path: "/planxSpace/2/0"
          })
          break;
        case 3:
          // 团员身份
          this.$router.push({
            path: "/planxSpace/2/0"
          })
          break;
        default:
          break;
      }
    },
    reStep () {
      this.showJoinType = false;
    },
    personType (type) {
      this.type = type;
      tools.localsetItem('personType', this.type)
      this.showJoinType = true;
    },
    setSelectPersonalIdentify () {
      selectPersonalIdentify({}).then(res => {
        if (res.resp_code == 0) {
          this.$router.push({
            path: "/planxSpace/1/0"
          })
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

.mian {
  height: 100%;
  width: 100%;
  background-color: #06012a;
  .title {
    height: pxTorem(107px);
    padding: 0 pxTorem(30px);
    display: flex;
    justify-content: space-between;
    align-items: center;
    .back {
      width: pxTorem(50px);
    }
    .title_text {
      font-weight: bold;
      font-size: pxTorem(33px);
      color: #ffffff;
    }
  }
  .hint {
    font-size: pxTorem(40px);
    font-weight: bold;
    color: #ffffff;
    width: 100%;
    display: inline-block;
    text-align: center;
    margin-bottom: pxTorem(5px);
    margin-top: pxTorem(5px);
  }
  .content {
    padding: pxTorem(160px) 0 0 0;
    background-size: 100% 100%;
    width: 100%;
    .content_bg {
      width: 100%;
      height: auto;
    }
    .bottom {
      position: absolute;
      bottom: pxTorem(50px);
      width: 100%;
      .join {
        display: flex;
        justify-content: space-around;
        position: relative;
        img {
          width: pxTorem(432px);
          height: pxTorem(100px);
        }
        span {
          position: absolute;
          height: 100%;
          line-height: pxTorem(90px);
        }
      }
    }
  }
  .restep_ {
    display: flex;
    justify-content: center;
    color: white;
    .restep {
      padding: pxTorem(50px);
    }
  }
}
</style>
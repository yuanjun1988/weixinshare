// 个人团队空间
<template>
  <div class="main">
    <div class="top_bg">
      <div class="msg">
        <div>
          <img class="photo"
               v-if="data.headportrait"
               style="object-fit: cover;"
               :src="'http://img.bomaleye.com/'+data.headportrait"
               alt="">
        </div>
        <div style="height: 100%;">
          <div>
            <span class="name">{{data.userName}}</span>
            <span class="no">/NO.{{data.number}}</span>
          </div>
          <div class="teacher_"
               v-if="data.type == 2">
            <span class="teacher">指导老师：<span>{{data.teacher}}</span></span>
            <img @click.stop="coverIsshow2 = true"
                 src="https://v.bomaleye.com/planx_edit.png"
                 v-if="(data.relationOfUser == 'PERSONAL_OWNER' || data.relationOfUser == 'TEAM_LEADER') && data.type == 2"
                 alt="">
          </div>
        </div>
      </div>
      <div class="contact"
           v-if="data.relationOfUser != 'PERSONAL_OWNER' && data.relationOfUser != 'TEAM_LEADER'">
        <!-- <span class="personal_letter">私信</span> -->
        <span class="focus"
              v-if="!data.hasFocus"
              @click="focus()">+ 关注</span>
        <span class="unfocus"
              v-if="data.hasFocus">已关注</span>
      </div>
    </div>
    <navigation-bar :navTitle="navTitle"
                    rightTitle="贡献榜"
                    @rightTitleClick="contributions"></navigation-bar>

    <div class="group"
         v-if="type == 2">
      <div class="member_number">
        <span class="group_number">团队成员 {{data.memberNum}}/</span>
        <span class="total">{{data.maxMemberNum}}</span>
      </div>
      <div class="member">
        <div class="item"
             v-for="(item,index) in data.members"
             :key="index">
          <img class="group_photo"
                style="object-fit: cover;"
               :src="'http://img.bomaleye.com/'+item.headportrait"
               alt="">
          <img class="logo"
               v-if="item.isLeader"
               src="https://v.bomaleye.com/planx_group.png"
               alt="">
        </div>
      </div>
    </div>

    <div class="number">
      <div class="number_">
        <span class="number_amount">{{data.ranking}}</span>
        <div class="number_hint">排行</div>
      </div>
      <div class="number_">
        <span class="number_amount">{{data.ticketNum}}</span>
        <div class="number_hint">票数</div>
      </div>
      <div class="number_">
        <span class="number_amount">{{data.likeNum}}</span>
        <div class="number_hint">获赞</div>
      </div>
      <div class="number_">
        <span class="number_amount">{{data.forwardNum}}</span>
        <div class="number_hint">转发注册</div>
      </div>
    </div>

    <!-- <span class="download">下载app查看</span> -->

    <div class="red_packet">
      <div class="put_red_packet"
           v-if="data.relationOfUser == 'PERSONAL_OWNER' || data.relationOfUser == 'TEAM_LEADER'"
           @click="settingRedPacket">
        <img src="https://act.bomaleye.com/planx_red_packet.png"
             alt="">
        <span style="color:#FFFFFF;">设置投票红包</span>
      </div>
      <span class="un_get"
            v-if="data.redPacketCount > 0 && data.surplusCount > 0">当前红包还有{{data.surplusCount}}枚未领取</span>
      <span class="get_complete"
            v-if="data.redPacketCount > 0 && data.surplusCount == 0">当前红包全部被领取完</span>
    </div>

    <div class="tab">
      <div class="tab_"
           @click="tabType(1)">
        <div class="rate_video">
          <span :class="tab == 1?'select_tab':'unselect_tab'">参赛视频</span>
          <span :class="tab == 1?'line':'unselect_line'"></span>
        </div>
        <span :class="tab == 1?'video_number':'video_number_unselect'">{{othersLength}}</span>
      </div>
      <div class="tab_"
           @click="tabType(2)">
        <div class="rate_video">
          <span :class="tab == 2?'select_tab':'unselect_tab'">花絮</span>
          <span :class="tab == 2?'line':'unselect_line'"></span>
        </div>
        <span :class="tab == 2?'video_number':'video_number_unselect'">{{tidbits.length > 0 ? tidbits.length-1 : tidbits.length}}</span>
      </div>
    </div>

    <div class="join_video"
         v-if="tab == 1">
      <div class="item">
        <div style="position: relative;"
             v-if="resumes.videoUrl">
          <img :src="getVideoImg(resumes.videoUrl)"
               class="video"
               @click="previewJoinVideo(resumes.id)"
               alt="">
          <div class="del"
               v-if="data.relationOfUser == 'PERSONAL_OWNER' || data.relationOfUser == 'TEAM_LEADER'">
            <img
                 @click="delJoin(1)"
                 src="https://act.bomaleye.com/del_text.png"
                 alt="">
          </div>

          <img class="bg"
               src="https://act.bomaleye.com/planx_video_bg.png"
               alt="">

          <div class="like">
            <img src="https://act.bomaleye.com/planx_like.png"
                 alt="">
            <span>{{resumes.likedCount}}</span>
          </div>
        </div>
        <van-uploader v-model="test"
                      :after-read="resumesAfterRead"
                      accept="video/*"
                      :disabled="!(data.relationOfUser == 'PERSONAL_OWNER' || data.relationOfUser == 'TEAM_LEADER')"
                      v-if="!resumes.videoUrl"
                      class="video">
          <img src="https://act.bomaleye.com/planx_add_video.png"
               class="video"
               alt="">
        </van-uploader>
        <div>
          <span class="desc">快来添加自己的简历视频吧，完整的视频才能获得更高的票数哦 <br /> 请添加详细的视频描述~ <br /> “Plan X人才计划”</span>
          <span class="type">简历视频</span>
        </div>
      </div>
      <div class="item">
        <div style="position: relative;"
             v-if="life.videoUrl">
          <img :src="getVideoImg(life.videoUrl)"
               class="video"
               @click="previewJoinVideo(life.id)"
               alt="">
          <img class="bg"
               src="https://act.bomaleye.com/planx_add_video.png"
               alt="">

          <div class="del"
               v-if="data.relationOfUser == 'PERSONAL_OWNER' || data.relationOfUser == 'TEAM_LEADER'">
            <img
                 @click="delJoin(2)"
                 src="https://act.bomaleye.com/del_text.png"
                 alt="">
          </div>
          <!-- <img class="del"
               @click="delJoin(2)"
               v-if="data.relationOfUser == 'PERSONAL_OWNER' || data.relationOfUser == 'TEAM_LEADER'"
               src="https://act.bomaleye.com/del_text.png"
               alt=""> -->
          <div class="like">
            <img src="https://act.bomaleye.com/planx_like.png"
                 alt="">
            <span>{{life.likedCount}}</span>
          </div>
        </div>
        <van-uploader v-model="test"
                      :after-read="lifeAfterRead"
                      accept="video/*"
                      v-if="!life.videoUrl"
                      :disabled="!(data.relationOfUser == 'PERSONAL_OWNER' || data.relationOfUser == 'TEAM_LEADER')"
                      class="video">
          <img src="https://act.bomaleye.com/planx_add_video.png"
               class="video"
               alt="">
        </van-uploader>
        <div>
          <span class="desc">快来添加自己的生活日常视频吧，完整的视频才能获得更高的票数哦 <br /> 请添加详细的视频描述~ <br /> “Plan X人才计划”</span>
          <span class="type">生活日常</span>
        </div>
      </div>
      <div class="item">
        <div style="position: relative;"
             v-if="showTalent.videoUrl">
          <img :src="getVideoImg(showTalent.videoUrl)"
               class="video"
               @click="previewJoinVideo(showTalent.id)"
               alt="">

          <div class="del"
               v-if="data.relationOfUser == 'PERSONAL_OWNER' || data.relationOfUser == 'TEAM_LEADER'">
            <img
                 @click="delJoin(3)"
                 src="https://act.bomaleye.com/del_text.png"
                 alt="">
          </div>
          <!-- <img class="del"
               @click="delJoin(3)"
               v-if="data.relationOfUser == 'PERSONAL_OWNER' || data.relationOfUser == 'TEAM_LEADER'"
               src="https://act.bomaleye.com/del_text.png"
               alt=""> -->
          <img class="bg"
               src="https://act.bomaleye.com/planx_video_bg.png"
               alt="">
          <div class="like">
            <img src="https://act.bomaleye.com/planx_like.png"
                 alt="">
            <span>{{showTalent.likedCount}}</span>
          </div>
        </div>
        <van-uploader v-model="test"
                      :after-read="showTalentRead"
                      accept="video/*"
                      :disabled="!(data.relationOfUser == 'PERSONAL_OWNER' || data.relationOfUser == 'TEAM_LEADER')"
                      v-if="!showTalent.videoUrl"
                      class="video">
          <img src="https://act.bomaleye.com/planx_add_video.png"
               class="video"
               alt="">
        </van-uploader>
        <div>
          <span class="desc">快来添加自己的才艺展示视频吧，完整的视频才能获得更高的票数哦 <br /> 请添加详细的视频描述~ <br /> “Plan X人才计划”</span>
          <span class="type">才艺展示</span>
        </div>
      </div>
    </div>

    <div class="sidelights"
         v-if="tab == 2">
      <div class="video-list">
        <div class="video-list-item"
             v-for="(item,index) in tidbits"
             :key="index">
          <div class="video-img">
            <img v-if="index != tidbits.length-1"
                 :src="getVideoImg(item.videoUrl)"
                 class="video-pre"
                 @click="previewVideoSidelights(index)"
                 alt="">
            <div class="del"
                 v-if="index != tidbits.length-1 && (data.relationOfUser == 'PERSONAL_OWNER' || data.relationOfUser == 'TEAM_LEADER' || data.relationOfUser == 'TEAM_MEMBER')">
              <img @click="delSidelights(item,index)"
                   src="https://act.bomaleye.com/del_text.png"
                   alt="">
            </div>

            <img v-if="index != tidbits.length-1"
                 src="http://img.bomaleye.com/20210226172546332_4043"
                 class="play-icon"
                 alt="">
            <div class="like"
                 v-if="index != tidbits.length-1">
              <img src="https://act.bomaleye.com/planx_like.png"
                   alt="">
              <span>{{item.likedCount}}</span>
            </div>
            <van-uploader v-model="test"
                          :after-read="afterRead"
                          accept="video/*"
                          :disabled="!(data.relationOfUser == 'PERSONAL_OWNER' || data.relationOfUser == 'TEAM_LEADER' || data.relationOfUser == 'TEAM_MEMBER')"
                          class="video-pre"
                          v-if="index == tidbits.length-1">
              <img src="https://act.bomaleye.com/planx_add_video.png"
                   class="video-pre"
                   alt="">
            </van-uploader>
          </div>
        </div>
      </div>
    </div>

    <van-popup class="van-popup"
               v-model="showModel"
               :overlay="true">
      <!-- https://v.bomaleye.com/planx_pop_close.png -->
      <div class="van-popup_">
        <div class="van-popup_inner">
          <span class="setting_hint">红包设置</span>
          <div class="setting_hint_desc">设置后投票者会获得相应奖励</div>

          <div class="numbers_view">
            <div class="numbers_view_hint">红包个数</div>
            <input v-model="number"
                   maxlength="50"
                   v-resetInput
                   type="number"
                   :min="0"
                   @input='inputChange'
                   placeholder="填写个数" />
            <div>个</div>
          </div>

          <div class="numbers_view">
            <div class="numbers_view_hint">红包单价</div>
            <div style="display: flex;align-items: center;">
              <input v-model="price"
                     maxlength="50"
                     v-resetInput
                     type="number"
                     :min="0"
                     @input='inputChange'
                     placeholder="填写金额" />
              <div class="unit">银马蹄</div>
            </div>
          </div>

          <div class="deposit">
            <textarea v-model="msg"
                      cols="1"
                      rows="3"
                      maxlength="50"
                      v-resetInput
                      placeholder="感谢大家为我投票，银马蹄在“伯马乐业”APP可以提现哦！"></textarea>
            <!-- <input type="textarea"
                      v-model="msg"
                      maxlength="50"
                      v-resetInput
                      placeholder="感谢大家为我投票，银马蹄在“伯马乐业”APP可以提现哦！" /> -->
          </div>

          <div>
            <span class="count">{{count}}</span>
            <span class="count_unit">银马蹄</span>
          </div>

          <span class="diff">银马蹄余额：{{silverMt}}</span>

          <img @click="putPacket"
               class="put_packet"
               src="https://v.bomaleye.com/planx_put_packet.png"
               alt="">
        </div>
        <span class="hint">如果您之前封装过红包，本次封装会将上次红包剩余金额返还到您的钱包内，请放心发送。</span>
        <img src="https://v.bomaleye.com/planx_pop_close.png "
             alt=""
             @click="popClose"
             class="pop_close">
      </div>
    </van-popup>

    <van-overlay :show="coverIsshow2"
                 @click.stop="coverIsshow2 = false">
      <div class="wrapper"
           @click.stop>
        <div class="wrapper-title">
          指导老师
        </div>
        <div>
          <span class="wrapper-tips"></span>
          <input v-resetInput
                 v-model="teacherName"
                 maxlength="10"
                 placeholder="请输入指导老师姓名">
        </div>
        <div class="team-bottom">
          <div class="create-btn"
               @click="teacherNameChange">
            确定
          </div>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import navigationBar from '../../components/common/navigation-bar'
import { getTeamSpace, getPersonalSpace, getWallet, saveRedPacket, getVideoSpaceList, delVideo, actFocus, updateTeacher } from "../../api/index"
import { Toast, Dialog } from 'vant';
import tools from "../../common/tools"


export default {
  components: {
    navigationBar
  },
  data () {
    return {
      navTitle: "",
      type: 2,  // 1:个人  2:团队
      spaceId: '',   // 个人： 如果传进来的数据存在spaceId
      tab: 1,   // 1:参赛视频  2.花絮
      showModel: false,
      number: null,
      price: null,
      msg: "",
      count: "0",
      data: {
        headportrait: '',
        userName: '',
        number: '',
        relationOfUser: '',     //PERSONAL_OWNER  PERSONAL_OWNER
        ranking: '',
        ticketNum: '',
        likeNum: '',
        forwardNum: '',
        teacher: '',
        redPacketCount: '',
        surplusCount: '',
        hasFocus: false,
        type: 0
      },
      silverMt: 0,
      others: [],
      othersLength:0,
      tidbits: [],
      resumes: {},  // 简历视频
      life: {},   // 生活视频
      showTalent: {},    // 才艺展示
      test: [{}],
      videoSort: 0,
      coverIsshow2: false,
      teacherName: '',
      hearderId: '', // 个人:个人id,团队：团长id
      toUserId: ''
    }
  },
  mounted () {
    this.type = this.$route.params.type;
    this.spaceId = this.$route.params.spaceId != 0 ? this.$route.params.spaceId : '';
    this.init();
  },
  methods: {
    // 获取个人或团队信息
    init () {
      let param = {
        spaceId: this.spaceId,
        userType: '1'
      }
      if (this.type == 1) {
        this.$loading();
        getPersonalSpace(param).then(res => {
          this.$toast.clear();
          this.data = res.datas;
          this.hearderId = this.data.number;
          this.teacherName = this.data.teacher;
          this.toUserId = res.datas.userId
          this.getVideo();
        })
        this.navTitle = '个人空间'
      }

      if (this.type == 2) {
        this.$loading();
        getTeamSpace(param).then(res => {
          this.$toast.clear();
          this.data = Object.assign(this.data, res.datas);
          let leader = res.datas.members.filter(function (item) { return item.isLeader });
          if (leader.length > 0) {
            this.data.headportrait = leader[0].headportrait;
            this.data.type = leader[0].type
            this.hearderId = leader[0].number
          }
          this.data.userName = res.datas.teamName;
          this.teacherName = this.data.teacher;
          this.toUserId = res.datas.userIdOfTeamLeader;
          this.getVideo();
        })
        this.navTitle = '团队空间'
      }
    },
    getVideoImg (videoUrl) {
      return this.videoposterFilter(videoUrl)
    },
    getVideo () {
      let params = {
        joinType: this.type,
        spaceId: this.hearderId,
        userType: '1'
      }
      getVideoSpaceList(params).then(res => {
        this.others = res.datas.others;
        this.othersLength = res.datas.others.length;
        tools.localsetItem('tidbitsVideo', res.datas.tidbits, 1);
        tools.localsetItem('othersVideo', res.datas.others, 1);
        this.others.forEach(element => {
          if (element.videoSort == 0) {
            this.resumes = element;
          } else if (element.videoSort == 1) {
            this.life = element;
          } else if (element.videoSort == 2) {
            this.showTalent = element;
          }
        });
        this.tidbits = res.datas.tidbits;
        this.tidbits.push({});
      });
    },

    updateLocalVideo () {
      let params = {
        joinType: this.type,
        spaceId: this.hearderId,
        userType: '1'
      }
      getVideoSpaceList(params).then(res => {
        this.others = res.datas.others;
        tools.localsetItem('tidbitsVideo', res.datas.tidbits, 1);
        tools.localsetItem('othersVideo', res.datas.others, 1);
      });
    },
    /**
     * 删除参赛视频
     */
    delJoin (type) {
      let that = this;
      Dialog.confirm({
        title: '删除提示',
        message: '确定要删除该视频吗？视频一经删除，票数清零',
      })
        .then(() => {
          // on confirm
          let videoId = '';
          if (type == 1) {
            videoId = that.resumes.id;
          } else if (type == 2) {
            videoId = that.life.id
          } else if (type == 3) {
            videoId = that.showTalent.id
          }
          let params = {
            videoId: videoId
          }
          delVideo(params).then(res => {
            if (res.resp_code == 0) {
              this.othersLength = this.othersLength -1;
              if (type == 1) {
                that.resumes = {};
              } else if (type == 2) {
                that.life = {}
              } else if (type == 3) {
                that.showTalent = {}
              }
            }
            updateLocalVideo();
          });
        }).catch(() => {
          // on cancel
        });
    },
    /**
     * 预览参赛视频
     */
    previewJoinVideo (id) {
      this.$router.push({
        path: "/selfvideoPreview/0/" + id
      })
    },
    /**
     * 预览花絮视频
     */
    previewVideoSidelights (index) {
      this.$router.push({
        path: "/selfvideoPreview/1/" + index
      })
    },

    /**
     * 删除花絮
     */
    delSidelights (item, index) {
      let that = this;
      Dialog.confirm({
        title: '删除提示',
        message: '确定要删除该视频吗',
      })
        .then(() => {
          // on confirm
          let params = {
            videoId: item.id
          }
          delVideo(params).then(res => {
            if (res.resp_code == 0) {
              that.tidbits.splice(index, 1);
            }
            updateLocalVideo();
          });
        }).catch(() => {
          // on cancel
        });
    },
    focus () {

      let that = this;
      let toUserId = "";
      if (this.type == 1) {
        toUserId = this.toUserId;
      } else if (this.type == 2) {
        toUserId = this.data.userIdOfTeamLeader;
      }
      let params = {
        toUserId: toUserId,
        status: 1,
        userType: 1
      }
      actFocus(params).then(res => {
        if (res.resp_code == 0) {
          that.data.hasFocus = true
        }
      });
    },
    showTalentRead (file) {
      this.videoSort = 2;
      this.uploadVideo(file)
    },
    lifeAfterRead (file) {
      this.videoSort = 1;
      this.uploadVideo(file)
    },
    resumesAfterRead (file) {
      this.videoSort = 0;
      this.uploadVideo(file)
    },
    /**
     * 花絮视频选择成功
     */
    afterRead (file) {
      this.videoSort = 3;
      this.uploadVideo(file)
    },

    uploadVideo (file) {
      this.$loading();
      this.uploadQiniu(file.file, 1).then((res) => {
        this.$toast.clear();
        this.$router.push({
          name: 'planxPublish',
          params: { videoUrl: res.key, videoSort: this.videoSort, number: this.hearderId }
        })
      });
    },

    // 贡献榜
    contributions () {
      this.$router.push({
        path: "/contributionList"
      })
    },
    tabType (type) {
      if (this.tab != type) {
        this.tab = type;
      }
    },
    popClose () {
      this.showModel = false;
    },
    settingRedPacket () {
      this.showModel = true;
      let params = {
        userType: 1
      }
      getWallet(params).then(res => {
        this.silverMt = res.datas.silverMt;
      });
    },
    inputChange () {
      if (this.number && this.price) {
        this.count = this.number * this.price;
      } else {
        this.count = 0;
      }
    },
    putPacket () {
      if (this.number && this.number > 0 && this.price && this.price > 0) {
        // 请求马蹄数 > 总马蹄数  进入充值页面
        if (parseInt(this.number) * parseInt(this.price) > this.silverMt) {
          this.rechargeWallet();
          return;
        }
        // 请求接口，关闭弹窗
        let params = {
          count: this.number,
          price: this.price,
          msg: this.msg
        }
        saveRedPacket(params).then(res => {
          Toast('红包发送成功');
          this.showModel = false;
          this.init();
        });
      } else {
        // 提示完成信息填写
        Toast('请输入红包数量和单价');
      }
    },
    /**
     * 填写指导老师姓名
     */
    teacherNameChange () {
      let param = {
        teacher: this.teacherName,
        number: this.data.number
      }
      this.$loading();
      updateTeacher(param).then(res => {
        this.$toast.clear();
        if (res.resp_code == 0) {
          this.coverIsshow2 = false;
          this.data.teacher = this.teacherName;
        }
      })
    },
    /**
     * 跳充值页面
     */
    rechargeWallet () {
      let redirect_uri = 'https://mp.bomaleye.com/#/wxPay';
      window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxc0ab660fe634843a&redirect_uri=' + encodeURIComponent(redirect_uri) + '&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect'
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
  position: relative;
  background-color: #06012a;
  height: auto;
  min-height: 100%;
  width: 100%;
  // overflow-y: auto;
  /deep/ .van-overlay {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    z-index: 9999 !important;
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
  }
  .team-bottom {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: pxTorem(60px) 0;
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
    color: #070133;
    background: url(http://img.bomaleye.com/20210224160455944_6979?imageView2/1/w/80/h/80)
      no-repeat center center;
    background-size: 100% 100%;
  }

  .group {
    display: flex;
    align-items: center;
    padding: pxTorem(30px) 0;
    border-bottom: pxTorem(1px) solid #3c3951;
    margin: 0 pxTorem(30px);
    .member_number {
      margin-right: pxTorem(26px);
      .group_number {
        font-size: pxTorem(32px);
        color: #ffffff;
      }
      .total {
        font-size: pxTorem(24px);
        color: #666666;
      }
    }
    .item {
      position: relative;
      display: inline-block;
      margin-right: pxTorem(20px);
      .group_photo {
        width: pxTorem(76px);
        height: pxTorem(76px);
        border-radius: 50%;
      }
      .logo {
        position: absolute;
        top: 0;
        right: 0;
        width: pxTorem(28px);
        height: pxTorem(28px);
      }
    }
  }
  .top_bg {
    position: relative;
    top: 0px;
    background: url(https://v.bomaleye.com/planx_space_top_bg.png) no-repeat;
    background-size: 100% 100%;
    height: pxTorem(400px);
    width: 100%;
    padding-top: pxTorem(120px);
    .msg {
      position: absolute;
      bottom: 0;
      display: flex;
      margin-left: pxTorem(43px);
      margin-bottom: pxTorem(95px);
      align-items: center;
      .photo {
        width: pxTorem(133px);
        height: pxTorem(133px);
        background-color: aliceblue;
        border-radius: 50%;
        margin-right: pxTorem(30px);
      }
      .name {
        color: #ffffff;
        font-weight: bold;
        font-size: pxTorem(33px);
      }
      .no {
        color: #ffffff;
        font-size: pxTorem(24px);
      }
      .teacher_ {
        margin-top: pxTorem(10px);
        display: flex;
        width: 100%;
        align-items: center;
        .teacher {
          color: #ffffff;
          font-weight: bold;
          font-size: pxTorem(28px);
          margin-right: pxTorem(15px);
        }
        img {
          width: pxTorem(23px);
          height: pxTorem(23px);
        }
      }
    }
    .contact {
      position: absolute;
      bottom: 0px;
      bottom: pxTorem(20px);
      left: pxTorem(206px);
      .personal_letter {
        display: inline-block;
        width: pxTorem(147px);
        height: pxTorem(56px);
        border: pxTorem(1px) solid #2effff;
        border-radius: pxTorem(28px);
        font-weight: bold;
        color: #2effff;
        font-size: pxTorem(28px);
        text-align: center;
        line-height: pxTorem(56px);
        margin-right: pxTorem(27px);
      }
      .focus {
        width: pxTorem(147px);
        height: pxTorem(56px);
        display: inline-block;
        background: #2effff;
        border-radius: pxTorem(28px);
        text-align: center;
        line-height: pxTorem(56px);
        color: #333333;
        font-weight: bold;
        font-size: pxTorem(28px);
      }
      .unfocus {
        display: inline-block;
        width: pxTorem(147px);
        height: pxTorem(56px);
        border: pxTorem(1px) solid #b0b0b0;
        border-radius: pxTorem(28px);
        font-weight: bold;
        color: #b0b0b0;
        font-size: pxTorem(28px);
        text-align: center;
        line-height: pxTorem(56px);
        margin-right: pxTorem(27px);
      }
    }
  }

  .diff {
    font-size: pxTorem(24px);
    color: #808080;
    display: block;
  }

  .number {
    width: 100%;
    height: pxTorem(130px);
    display: flex;
    justify-content: space-around;
    align-items: center;
    .number_ {
      text-align: center;
      .number_amount {
        font-size: pxTorem(36px);
        font-weight: bold;
        color: #ffffff;
      }
      .number_hint {
        font-size: pxTorem(24px);
        font-weight: 500;
        color: #666666;
        opacity: 0.8;
      }
    }
  }

  .download {
    margin-left: pxTorem(27px);
    font-size: pxTorem(21px);
    opacity: 0.8;
    color: #2effff;
    font-weight: 500;
  }

  .red_packet {
    display: flex;
    align-items: center;
    flex-direction: column;
    .put_red_packet {
      display: flex;
      align-items: center;
      flex-direction: row;
      border: pxTorem(1px) solid #ffffff;
      border-radius: pxTorem(33px);
      padding: pxTorem(5px) pxTorem(20px);
      margin-bottom: pxTorem(19px);
      img {
        width: pxTorem(51px);
        height: pxTorem(57px);
      }
    }
    .un_get {
      display: block;
    }
    .get_complete {
      color: #fc4ff4;
    }
  }

  .join_video {
    .video {
      width: pxTorem(247px);
      height: pxTorem(356px);
    }
    .like {
      position: absolute;
      bottom: pxTorem(20px);
      left: pxTorem(20px);
      color: white;
      font-size: pxTorem(22px);
      font-weight: bold;
      display: flex;
      align-items: center;
      img {
        margin-right: pxTorem(10px);
      }
    }
    .del {
      position: absolute;
      right: pxTorem(0px);
      top: pxTorem(0px);
      padding-top: pxTorem(17px);
      padding-bottom: pxTorem(17px);
      height: pxTorem(69px);
      width: 100%;
      object-fit: none;
      text-align: end;
      background: linear-gradient(0deg, rgba(3, 0, 0, 0.5) 0%,rgba(0, 0, 0, 0) 100% );
      img {
        width: pxTorem(61px);
        height: pxTorem(35px);
        padding: pxTorem(17px);
      }
    }
    // .del {
    //   position: absolute;
    //   right: pxTorem(0px);
    //   top: pxTorem(0px);
    //   padding: pxTorem(17px);
    //   width: pxTorem(61px);
    //   height: pxTorem(35px);
    // }
    .bg {
      position: absolute;
      bottom: pxTorem(0px);
      left: 0px;
      width: pxTorem(247px);
    }
    .item {
      display: flex;
      align-items: flex-end;
      margin-bottom: pxTorem(5px);
      .desc {
        color: #666666;
        font-size: pxTorem(24px);
        padding: 0 pxTorem(30px);
        display: block;
      }
      .type {
        font-size: pxTorem(28px);
        font-weight: 500;
        color: #ffffff;
        padding: 0 pxTorem(30px);
        display: block;
        margin-top: pxTorem(10px);
      }
    }
  }

  .tab {
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: pxTorem(10px);
    .video_number {
      margin-left: pxTorem(10px);
      color: white;
    }
    .video_number_unselect {
      margin-left: pxTorem(10px);
      color: #999999;
    }
    .tab_ {
      display: flex;
      flex-direction: row;
      align-items: baseline;
      .rate_video {
        display: flex;
        flex-direction: column;
        align-items: center;
        .line {
          width: pxTorem(60px);
          height: pxTorem(5px);
          display: block;
          background-color: #fcf24f;
          margin-top: pxTorem(10px);
        }
        .unselect_line {
          width: pxTorem(60px);
          height: pxTorem(5px);
          display: block;
          background-color: transparent;
          margin-top: pxTorem(10px);
        }
      }
    }
    .select_tab {
      font-size: pxTorem(32px);
      color: #ffffff;
      font-weight: bold;
    }

    .unselect_tab {
      font-size: pxTorem(32px);
      color: #999999;
      font-weight: bold;
    }
  }

  .video-list {
    min-height: pxTorem(600px);
    // padding: pxTorem(54px) pxTorem(36px) pxTorem(64px);
    background-size: 100% 100%;
    margin-top: pxTorem(28px);
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    .video-list-item {
      margin-bottom: pxTorem(5px);
      .video-img {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        .del {
          position: absolute;
          right: pxTorem(0px);
          top: pxTorem(0px);
          padding-top: pxTorem(17px);
          padding-bottom: pxTorem(17px);
          height: pxTorem(69px);
          width: 100%;
          object-fit: none;
          text-align: end;
          background: linear-gradient(
            0deg,
            rgba(3, 0, 0, 0.5) 0%,
            rgba(0, 0, 0, 0) 100%
          );
          img {
            width: pxTorem(61px);
            height: pxTorem(35px);
            padding: pxTorem(17px);
          }
        }
        .like {
          position: absolute;
          bottom: pxTorem(20px);
          left: pxTorem(20px);
          color: white;
          font-size: pxTorem(22px);
          font-weight: bold;
          display: flex;
          align-items: center;
          img {
            margin-right: pxTorem(10px);
          }
        }
        .video-pre {
          width: pxTorem(247px);
          height: pxTorem(365px);
          border-radius: pxTorem(5px);
        }
        .play-icon {
          width: pxTorem(40px);
          height: pxTorem(44px);
          position: absolute;
        }
      }
    }
  }
  .video-list::after {
    content: "";
    width: pxTorem(247px);
    height: pxTorem(365px);
    border-radius: pxTorem(5px);
  }

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

  .van-popup_ {
    display: flex;
    flex-direction: column;
    align-items: center;
    .van-popup_inner {
      background: url("https://v.bomaleye.com/red_bg_packet.png") no-repeat;
      -moz-background-size: 100% 100%;
      background-size: 100% 100%;
      margin-bottom: pxTorem(20px);
      text-align: center;
      width: 100%;
      .setting_hint {
        margin-top: pxTorem(40px);
        display: block;
        text-align: center;
        color: #070133;
        font-size: pxTorem(33px);
        font-weight: bold;
        margin-bottom: pxTorem(20px);
      }
      .setting_hint_desc {
        font-size: pxTorem(24px);
        color: #070133;
        text-align: center;
      }

      .count {
        color: #ad2921;
        font-weight: bold;
        font-size: pxTorem(48px);
      }

      .count_unit {
        color: #ad2921;
        font-weight: bold;
        font-size: pxTorem(24px);
      }

      .deposit {
        margin: pxTorem(20px) pxTorem(52px) pxTorem(20px) pxTorem(52px);
        background: #fff6f0;
        padding: pxTorem(20px) pxTorem(24px);
        font-size: pxTorem(20px);
        color: #999999;
        text-align: left;
        border-radius: pxTorem(11px);
      }
      .numbers_view {
        width: pxTorem(507px);
        margin: pxTorem(40px) pxTorem(52px) 0 pxTorem(52px);
        height: pxTorem(80px);
        background: #fff6f0;
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 0 pxTorem(25px);
        box-sizing: border-box;
        border-radius: pxTorem(11px);

        .numbers_view_hint {
          width: pxTorem(200px);
          text-align: left;
        }
        .unit {
          width: pxTorem(150px);
        }
      }
    }
    .put_packet {
      width: pxTorem(409px);
      height: pxTorem(139px);
      margin: pxTorem(50px) 0 pxTorem(10px) 0;
    }
    .pop_close {
      width: pxTorem(35px);
      height: pxTorem(35px);
      margin-top: pxTorem(27px);
    }
    .hint {
      color: #fdd683;
      font-size: pxTorem(21px);
      font-weight: 500;
      padding: 0 pxTorem(50px);
    }
  }

  input,
  textarea {
    background-color: transparent;
    border: 0px;
    width: 100%;
  }
}
</style>
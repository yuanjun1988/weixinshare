<template>
<van-overlay class="van-overlay_1" :show="coverIsshow3"
                 @click.stop="closeDia">
  <div class="main" @click.stop>
    <div class="content-item">
      <div class="input-item">
        <input id="input1" placeholder="请输入手机号"
                  v-model="acount"
                  type="number"
                  v-resetInput/>
      </div>
      <div class="input-item code">
        <input id="input2" placeholder="请输入验证码"
                  v-model="phoneCode"
                  maxlength='4'
                  v-resetInput/>
        <div class="get-code"
             v-if="isshow"
             @click.stop="getCode">{{codetip}}</div>
        <div class="get-code"
             v-else>重新发送 {{countdown}}s</div>
      </div>
    </div>
    <div :class="!acountStatus ? 'login-btn' : 'login-btn active'"
         @click.stop="acountStatus && CurserRegister()">
      确定
    </div>
  </div>
</van-overlay>
</template>
<script>
import { phoneCodeLogin, getPhoneCode, getUserId } from "../api/index"
import tools from "../common/tools"
import { Toast } from 'vant'
export default {
  data () {
    return {
      acount: '',
      phoneCode: '',
      countdown: 60,
      isshow: true,
      acountStatus: false,
      codetip: '获取验证码',
      smskey: '',
      coverIsshow3: false
    }
  },
  mounted() {
      //ios 12 单独处理键盘不收回状况
      if(tools.mobileDetect() == 1) {
          document.getElementById('input1').addEventListener('blur', function(){window.scrollTo(0,0) },false)
          document.getElementById('input2').addEventListener('blur', function(){window.scrollTo(0,0) },false)
      }
  },
  watch: {
    "phoneCode": function () {
      this.phoneCode && this.acount ? this.acountStatus = true : this.acountStatus = false;
    }
  },
  methods: {
    closeDia(event) {
      console.log(event)
      this.$emit('closeDia');
    },
    //注册
    CurserRegister () {
      if (this.acount == '') {
        Toast('手机号不能为空!', false);
        return;
      }
      if (this.phoneCode == '') {
        Toast('请填写验证码!', false);
        return;
      }
      let params = {
        client_id: 'app',
        client_secret: 'xinde',
        deviceId: this.acount,
        registerType: 'WxApp',
        smsKey: this.smskey,
        userType: '1',
        validCode: this.phoneCode
      }
      this.$loading();
      phoneCodeLogin(params).then(res => {
        tools.sessionsetItem('token', res.access_token);
        this.getVoteUserId();
        this.$emit('handleVote');
      }).catch(err=>{
        console.log(err)
         Toast('验证码错误');
      })
    },

    //获取验证码
    getCode () {
      if (!tools.checkNumber(this.acount, 1)) return;
      if (this.acount) {
        this.isshow = false;
        let timecount = setInterval(() => {
          this.countdown = this.countdown - 1;
          if (this.countdown == 0) {
            this.isshow = true;
            this.codetip = '重新获取'
            this.countdown = 59;
            clearInterval(timecount);
          }
        }, 1000)
        let params = {
          phone: this.acount
        }
        getPhoneCode(params).then(res => {
          this.smskey = res.key
        })
      }
    },
    getVoteUserId () {
      let params = {
          client_id: 'app',
          client_secret: 'xinde'
      }
      getUserId(params).then(res => {
            if(res.resp_code == '200') {
                tools.localsetItem('userId',res.user.id);
            }
        })
    },
  },
  
  beforeDestroy() {
    if(tools.mobileDetect() == 1) {
          document.getElementById('input1').removeEventListener('blur', function(){window.scrollTo(0,0) },false)
          document.getElementById('input2').removeEventListener('blur', function(){window.scrollTo(0,0) },false)
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
  width: pxTorem(614px);
  height: pxTorem(520px);
  background: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: pxTorem(24px);
  padding: pxTorem(60px) pxTorem(42px) pxTorem(30px);
  .wallet-nav {
      width: 100%;
      position: fixed;
      top: 0;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      height: pxTorem(120px);
      border-bottom: 1px solid #ddd;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #ffffff;
      z-index: 3000;
      img {
        left: pxTorem(32px);
        position: absolute;
      }
      img:nth-child(1) {
        width: pxTorem(18px);
        height: pxTorem(32px);
      }
      span {
        font-size: pxTorem(32px);
        font-family: PingFang SC;
        font-weight: 550;
        color: #333333;
        line-height: pxTorem(38px);
      }
      .right_title {
        position: absolute;
        top: pxTorem(60px);
        right: pxTorem(0px);
        height: 100%;
        line-height: pxTorem(120px);
        padding: 0 pxTorem(30px);
        font-size: pxTorem(28px);
      }
    }
  .login-img {
    width: 100%;
    height: pxTorem(476px);
    margin-top: pxTorem(100px);
  }
  .content-item {
    width: 100%;
    padding: 0 pxTorem(42px);
    box-sizing: border-box;
  }
  .input-item {
    display: flex;
    margin: pxTorem(10px) 0;
    border-bottom:pxTorem(1px) solid #CCCCCC;
  }
  .go-login {
    font-size: pxTorem(30px);
    span {
      color: #c94444;
      cursor: pointer;
    }
  }
  .code {
    justify-content: space-between;
    align-items: center;
    font-size: pxTorem(28px);
    margin-top: pxTorem(30px);
    .get-code {
      display: flex;
      justify-content: center;
      align-items: center;
      min-width: pxTorem(166px);
      white-space: nowrap;
      padding: pxTorem(10px);
      height: pxTorem(50px);
      border-radius: pxTorem(6px);
      color: rgba(238, 8, 46, 1);
    }
  }
  .input-item input {
    height: pxTorem(112px);
    border: none;
    padding: pxTorem(0px) !important;
    margin: 0px;
    border-radius: 0;
    font-size: pxTorem(28px);
    line-height: pxTorem(60px);
    background-color: rgba(255, 255, 255, 0);
    z-index: 2!important;
  }
  .input-item input::-webkit-input-placeholder {
    opacity: 1 !important;
    color: #b8b8b8;
  }
  .login-btn {
    width: pxTorem(476px);
    padding: 0 pxTorem(42px);
    box-sizing: border-box;
    line-height: pxTorem(94px);
    margin-top: pxTorem(94px);
    text-align: center;
    font-size: pxTorem(32px);
    font-family: PingFang SC;
    font-weight: 500;
    color: #999999;
    background: #E5E5E5;
    border-radius: pxTorem(46px);
  }
  .active {
     background: url(http://img.bomaleye.com/20210615104955613_2085) no-repeat
      center center;
      background-size: 100% 100%;
      color: #ffffff;
  }
}
 /deep/ .van-overlay_1 {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        z-index: 99999!important;
    }
</style>

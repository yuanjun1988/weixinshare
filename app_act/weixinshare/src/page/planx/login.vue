<template>
  <div class="main">
    <navigation-bar :navTitle='navTitle'></navigation-bar>
    <img class="login-img"
         src="http://img.bomaleye.com/20210225110851798_4935"
         alt="">
    <div class="content-item">
      <div class="login-tip">为防止恶意刷票，验证手机号 为亲友助力</div>
      <div class="input-item">
        <input id="input1" placeholder="请输入您的手机号"
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
    <div class="login-btn"
         @click="CurserRegister">
      进入活动
    </div>
  </div>

</template>
<script>
import { phoneCodeLogin, getPhoneCode,getUserId } from "../../api/index"
import navigationBar from '../../components/common/navigation-bar'
import tools from "../../common/tools"
import { Toast } from 'vant'
export default {
  components: {
    navigationBar,
  },
  data () {
    return {
      navTitle: '',
      acount: '',
      phoneCode: '',
      countdown: 60,
      isshow: true,
      codetip: '获取验证码',
      smskey: ''
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
    }
  },
  methods: {
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
        userType: tools.sessiongetItem("userType"),
        validCode: this.phoneCode
      }
      this.$loading();
      phoneCodeLogin(params).then(res => {
        tools.localsetItem('token', res.access_token);
        this.getUserId();
      }).catch(err=>{
        console.log(err)
         Toast('验证码错误');
      })
    },

    getUserId () {
      let params = {
        client_id: 'app',
        client_secret: 'xinde' 
      }
      getUserId(params).then(res => {
        this.$toast.clear();
        if (res.resp_code == '200') {
          tools.sessionsetItem('userId', res.user.id)
          this.$router.replace({
            path: "/planxSelectJoinType"
          })
        }
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
  height: auto;
  min-height: 100%;
  background: rgba(6, 1, 42, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 pxTorem(48px);
  .login-img {
    width: pxTorem(700px);
    height: pxTorem(506px);
    margin-top: pxTorem(180px);
  }
  .login-tip {
    font-size: pxTorem(28px);
    color: #808080;
    margin: pxTorem(20px) 0 pxTorem(48px);
  }
  .content-item {
    width: 100%;
  }
  .input-item {
    display: flex;
    margin: pxTorem(10px) 0;
    background: #120d38;
    padding: 0 pxTorem(30px);
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
      color: #2effff;
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
    color: #ffffff;
    z-index: 2!important;
  }
  .input-item input::-webkit-input-placeholder {
    opacity: 1 !important;
    color: #b8b8b8;
  }
  .login-btn {
    width: pxTorem(516px);
    height: pxTorem(210px);
    line-height: pxTorem(210px);
    margin-top: pxTorem(80px);
    text-align: center;
    font-size: pxTorem(32px);
    font-family: PingFang SC;
    font-weight: 500;
    color: #ffffff;
    background: url(http://img.bomaleye.com/20210225110941806_3692) no-repeat
      center center;
    background-size: 100% 100%;
  }
}
</style>

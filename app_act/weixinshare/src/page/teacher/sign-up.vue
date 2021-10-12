<template>
  <div class="main">
    <navigation-bar :navTitle='navTitle'></navigation-bar>
    <div class="content">
      <div class="step">第1步：请先填写以下信息</div>
      <div class="form-content">
          <div class="form-content-item" @click.stop="getFileInfo(1)">
            <div class="header-item">
                <span>头</span>
                <span>像</span>
            </div>
            <van-uploader :after-read="headportraitUploadFunc"
                      max-count="1"
                      v-model="fileList"
                      :before-delete="beforeDel"
                      accept="image/*" />
            <span class="header-tip">尽量上传真实头像</span>
        </div>
        <div class="form-content-item">
          <div>
            <span>所在城市</span>
          </div>
          <input v-model="form.cityName"
                 type="text"
                 v-resetInput
                 placeholder="请填写所在城市">
        </div>
        <div class="form-content-item">
          <div>
            <span>从事职业</span>
          </div>
          <input type="text"
                 v-model="form.jobName"
                 v-resetInput
                 placeholder="请填写从事职业">
        </div>
        <div class="form-content-item">
          <div>
            <span>所在单位</span>
          </div>
          <input type="text"
                 v-model="form.companyName"
                 v-resetInput
                 placeholder="请填写所在单位名称">
        </div>
        <div class="form-content-item">
          <div>
            <span>联系方式</span>
          </div>
          <input v-model="form.phone"
                 type="text"
                 v-resetInput
                 placeholder="请填写联系方式">
        </div>
      </div>
    </div>
    <div :class="show ? 'confirm-btn active' : 'confirm-btn'"
         @click="teacherSignUp()">
      下一步
    </div>
  </div>

</template>
<script>
import { teacherSignUp, getTeacherUserInfo} from "../../api/index"
import navigationBar from '../../components/common/navigation-bar'
import tools from "../../common/tools"
import { Toast } from 'vant'
export default {
  components: {
    navigationBar
  },
  data () {
    return {
      navTitle: '大赛报名',
      fileList: [],
      form: {
        headPortrait: '',
        companyName: '',
        jobName: '',
        phone: '',
        cityName: ''
      },
      show: false,
    }
  },

  created () {
    this.getTeacherUserInfo();
  },
  mounted () {
    this.$bridge.registerHandler('sendFileIfo', (params, responseCallback) => {
      this.sendFileIfo(params);
      responseCallback(params)
    })
  },
watch: {
    form:{
      handler(val, oldVal){
        let status = true;
         for (var key in val) {
          if (!val[key]) {
              status = false
          }
        }
        this.show = status;
      }, 
      deep:true
    },
  },
  methods: {
    getTeacherUserInfo() {
        let params = {};
      getTeacherUserInfo(params).then(res => {
          if (res.resp_code == 0) {
            let userInfo = res.datas
            this.form.cityName = userInfo.cityName;
            this.form.jobName = userInfo.jobName;
            this.form.companyName = userInfo.companyName;
            this.form.phone = userInfo.phone;
            if (userInfo.headPortrait) {
            let data = {
            url: 'http://img.bomaleye.com/' + userInfo.headPortrait,
            isImage: true
            }
            this.fileList.push(data);
            this.form.headPortrait = userInfo.headPortrait;
            }
          }
      })

    },

    beforeDel () {
      this.form.headPortrait = "";
      this.fileList = [];
    },
    getFileInfo (type) {
      let params = {
        type: type
      };
      tools.mobileDetect() == 1 ? '' : this.$bridge.callHandler('getFileInfo', params, (res) => {
        responseCallback(params)
      })
    },
    sendFileIfo (params) {
      let imgInfo = JSON.parse(params)
      let data = {
        url: 'http://img.bomaleye.com/' + imgInfo.url

      }

      if (imgInfo.type == 1) {
        this.form.headPortrait = imgInfo.url;
        this.fileList = [];
        this.fileList.push(data);
      }
    },

    //头像上传
    headportraitUploadFunc (e) {
      e.message = '上传中...';
      e.status = 'uploading'
      this.uploadQiniu(e.file, 2).then((res) => {
        this.form.headPortrait = res.key;
        e.status = 'done'
        e.message = '上传成功';
      })
    },

    teacherSignUp () {
      let formData = this.form;
      for (var key in formData) {
        if (!formData[key]) {
          Toast('请填写完整信息')
          return false
        };
      }
      let params = {
        headPortrait: this.form.headPortrait,
        companyName: this.form.companyName,
        jobName: this.form.jobName,
        phone: this.form.phone,
        cityName: this.form.cityName,
      }
      this.$loading();
      teacherSignUp(params).then(res => {
        this.$toast.clear();
        if (res.resp_code == 0) {
          this.$router.replace({
            path: '/attestation'
          })
        } else {
          Toast(res.resp_msg)
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
  height: 100%;
  background: linear-gradient(0deg, #0D061B 0%, #170637 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 pxTorem(32px) pxTorem(96px);
  /deep/ .van-uploader__upload {
    width: pxTorem(148px);
    height: pxTorem(148px);
    border-radius: 50%;
  }
  /deep/ .van-uploader__preview-image {
    width: pxTorem(148px);
    height: pxTorem(148px);
    border-radius: 50%;
  }
  /deep/ .van-uploader__preview-delete {
    width: pxTorem(20px);
    height: pxTorem(20px);
    border-radius: 0 0 0 pxTorem(16px);
  }
  /deep/ .van-uploader__preview-delete-icon {
    font-size: pxTorem(20px);
  }
  /deep/ .van-uploader__upload-icon {
    font-size: pxTorem(48px);
  }

  input {
    background-color: transparent;
  }
  .content {
    padding-top: pxTorem(186px);
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .step {
        width: 100%;
        padding: 0  pxTorem(32px);
        height: pxTorem(74px);
        line-height: pxTorem(74px);
        background: #21133C;
        text-align: center;
        font-size: pxTorem(24px);
        font-family: PingFang SC;
        font-weight: 500;
        color: #01FDF6;
    }
    .content-header {
      text-align: center;
      margin-bottom: pxTorem(84px);
      p {
        font-size: pxTorem(28px);
        font-family: PingFang SC;
        font-weight: 500;
        color: #2e3741;
        margin: pxTorem(24px) 0 0;
      }
    }
    .form-content {
      width: 100%;
      .form-content-item {
          display: flex;
          align-items: center;
          padding: pxTorem(38px) 0;
        img {
          width: pxTorem(14px);
          height: pxTorem(14px);
          margin: 0 0 pxTorem(4px) pxTorem(4px);
        }
        span {
          font-size: pxTorem(28px);
          font-family: PingFang SC;
          font-weight: 500;
          color: #FFFFFF;
        }
        .select-con {
          display: flex;
          align-items: center;
          position: relative;
          img {
            width: pxTorem(12px);
            height: pxTorem(20px);
            position: absolute;
            bottom: pxTorem(80px);
            right: 0;
          }
        }
      }
      input,
      .select-item {
        width: pxTorem(502px);
        padding-left: pxTorem(30px);
        height: pxTorem(76px);
        border: none;
        border-radius: pxTorem(38px);
        font-size: pxTorem(28px);
        color: #999999;
        background: #21133C;
        margin-left: pxTorem(28px);
      }
      input::-webkit-input-placeholder {
        color: #babec2;
      }
      .select-item {
        color: #2e3741;
      }
    }
  }
  .header-item {
      display: flex;
      justify-content: space-between;
      width: pxTorem(114px);
  }
  .header-tip {
      color: #999999!important;
  }
  .confirm-btn {
    width: pxTorem(468px);
    height: pxTorem(94px);
    line-height: pxTorem(94px);
    margin-top: pxTorem(80px);
    text-align: center;
    border-radius: pxTorem(48px);
    font-size: pxTorem(32px);
    font-family: PingFang SC;
    font-weight: 400;
    color: #FFFFFF;
    background: url(http://img.bomaleye.com/20210615105139432_9709) no-repeat
      center center;
    background-size: contain;
  }
  .active {
    background: url(http://img.bomaleye.com/20210615104955613_2085) no-repeat
      center center;
  }
  /deep/ .van-uploader {
      margin-left: pxTorem(38px);
    }
  .upload-btn {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: pxTorem(58px);
    .upload-btn-item {
      width: pxTorem(214px);
      height: pxTorem(68px);
      background: #fcf581;
      border-radius: pxTorem(32px);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: pxTorem(26px);
      font-family: PingFang SC;
      font-weight: 500;
      color: #070133;
      position: absolute;
      img {
        width: pxTorem(38px);
        height: pxTorem(34px);
        margin-right: pxTorem(12px);
      }
    }
    /deep/ .van-uploader {
      position: absolute;
      width: pxTorem(550px);
      height: pxTorem(374px);
      margin-left: pxTorem(38px);
    }
    /deep/ .van-uploader__upload {
      width: pxTorem(550px);
      height: pxTorem(374px);
      opacity: 0;
    }
    /deep/ .van-uploader__preview-image {
      width: pxTorem(550px);
      height: pxTorem(374px);
    }
    /deep/ .van-uploader__preview-delete {
      width: pxTorem(48px);
      height: pxTorem(48px);
      border-radius: 0 0 0 pxTorem(38px);
    }
    /deep/ .van-uploader__preview-delete-icon {
      font-size: pxTorem(50px);
    }
    /deep/ .van-uploader__upload-icon {
      font-size: pxTorem(60px);
    }
  }
  .upload-tip {
    width: pxTorem(550px);
    font-size: pxTorem(28px);
    font-family: PingFang SC;
    font-weight: 500;
    color: #8a9199;
    line-height: pxTorem(40px);
    margin: pxTorem(36px) 0 pxTorem(92px);
  }
}
</style>

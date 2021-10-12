<template>
  <div class="main">
    <navigation-bar :navTitle='navTitle'></navigation-bar>
    <div class="content">
      <div class="content-header"
           @click.stop="getFileInfo(1)">
        <van-uploader :after-read="headportraitUploadFunc"
                      max-count="1"
                      v-model="fileList"
                      :before-delete="beforeDel"
                      accept="image/*" />
        <p>上传头像</p>
      </div>
      <div class="form-content">
        <div class="form-content-item">
          <div>
            <span>姓名</span>
            <img src="http://img.bomaleye.com/2021022515275977_4244"
                 alt="">
          </div>
          <input v-model="form.userName"
                 type="text"
                 placeholder="请填写姓名">
          <div class="soild-item"
               v-resetInput></div>
        </div>
        <div class="form-content-item"
             @click="sexPickshow = true">
          <div>
            <span>性别</span>
            <img src="http://img.bomaleye.com/2021022515275977_4244"
                 alt="">
          </div>
          <div class="select-con">
            <input :value="form.sex !='' && form.sex  == 235 ? '男' : '女'"
                   type="text"
                   class="select-item"
                   disabled="disabled"
                   placeholder="请选择性别" />
            <img src="http://img.bomaleye.com/20210225170352209_8843"
                 alt="">
          </div>
          <div class="soild-item"></div>
        </div>
        <div class="form-content-item"
             @click="datePickshow = true">
          <div>
            <span>出生年月</span>
            <img src="http://img.bomaleye.com/2021022515275977_4244"
                 alt="">
          </div>
          <div class="select-con">
            <input :value="birthdayformDate"
                   type="text"
                   class="select-item"
                   disabled="disabled"
                   placeholder="请选择出生年月" />
            <img src="http://img.bomaleye.com/20210225170352209_8843"
                 alt="">
          </div>
          <div class="soild-item"></div>
        </div>
        <div class="form-content-item">
          <div>
            <span>所在大学</span>
            <img src="http://img.bomaleye.com/2021022515275977_4244"
                 alt="">
          </div>
          <input type="text"
                 v-model="form.school"
                 v-resetInput
                 placeholder="请填写所在大学">
          <div class="soild-item"></div>
        </div>
        <div class="form-content-item">
          <div>
            <span>专业</span>
            <img src="http://img.bomaleye.com/2021022515275977_4244"
                 alt="">
          </div>
          <input type="text"
                 v-model="form.profession"
                 v-resetInput
                 placeholder="请填写所学专业">
          <div class="soild-item"></div>
        </div>
        <div class="form-content-item">
          <div>
            <span>指导老师</span>
            <!-- <img src="http://img.bomaleye.com/2021022515275977_4244"
                 alt=""> -->
          </div>
          <input v-model="form.teacher"
                 type="text"
                 v-resetInput
                 placeholder="请填写指导老师">
          <div class="soild-item"></div>
        </div>
      </div>
      <div class="upload-btn"
           @click.stop="getFileInfo(2)">
        <div class="upload-btn-item">
          <img src="http://img.bomaleye.com/20210225175511978_7501"
               alt="">
          <span>立即上传</span>
        </div>
        <van-uploader :after-read="studentUploadFunc"
                      max-count="1"
                      v-model="studentFileList"
                      accept="image/*" />
      </div>
      <p class="upload-tip">为了保证比赛的公平公正，请您完成学生认证(上传学生证或者录取通知书）</p>
    </div>
    <div class="confirm-btn"
         @click="setIdentification">
      确定
    </div>
    <van-popup v-model="datePickshow"
               position="bottom"
               :lock-scroll="fasle"
               @touchmove.prevent>
      <div class="date-picker">
        <van-datetime-picker v-model="currentDate"
                             type="date"
                             title="选择年月日"
                             :min-date="minDate"
                             :max-date="maxDate"
                             @cancel="datePickshow = false"
                             @confirm="onConfirmDate"
                             item-height='80px' />
      </div>
    </van-popup>
    <van-popup v-model="sexPickshow"
               position="bottom"
               :lock-scroll="fasle"
               @touchmove.prevent>
      <div class="sex-picker">
        <p>请选择性别</p>
        <van-radio-group v-model="radio"
                         checked-color="rgba(252, 242, 79, 1)"
                         direction="horizontal"
                         @change="closeSexPop">
          <van-radio name="235">男</van-radio>
          <van-radio name="236">女</van-radio>
        </van-radio-group>
      </div>
    </van-popup>
    <!-- <van-calendar v-model="datePickshow" @confirm="onConfirm" @touchmove.prevent/> -->

  </div>

</template>
<script>
import { phoneCodeLogin, setIdentification } from "../../api/index"
import navigationBar from '../../components/common/navigation-bar'
import tools from "../../common/tools"
import { Toast } from 'vant'
export default {
  components: {
    navigationBar
  },
  data () {
    return {
      navTitle: '校友认证',
      fileList: [],
      studentFileList: [],
      form: {
        birthday: '',
        certifyUrl: '',
        headportrait: '',
        profession: '',
        school: '',
        sex: '235',
        teacher: '',
        userName: ''
      },
      minDate: new Date(1960, 0, 1),
      maxDate: new Date(2021, 1, 1),
      currentDate: new Date(),
      datePickshow: false,
      sexPickshow: false,
      radio: '235',
      show: false,
      birthdayformDate: ''
    }
  },

  created () {
    if (tools.localgetItem('userInfo', 1) != null) {
      let formData = tools.localgetItem('userInfo', 1)
      if (formData.headportrait) {
        let data = {
          url: 'http://img.bomaleye.com/' + formData.headportrait,
          isImage: true
        }
        this.fileList.push(data);
        this.form.headportrait = formData.headportrait;
      }
      if (formData.userName) this.form.userName = formData.userName;
      if (formData.sex) this.form.sex = formData.sex;
      if (formData.birthday) this.form.birthday = formData.birthday;
      if (formData.birthday) this.birthdayformDate = tools.formatData(formData.birthday * 1000, 'day');
    }
  },
  mounted () {
    this.$bridge.registerHandler('sendFileIfo', (params, responseCallback) => {
      this.sendFileIfo(params);
      responseCallback(params)
    })
  },

  methods: {

    onConfirmDate (value) {
      this.birthdayformDate = tools.formatData(value, 'day');
      this.form.birthday = Date.parse(new Date(value)) / 1000;
      this.datePickshow = false
    },
    beforeDel () {
      this.form.headportrait = "";
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
        this.form.headportrait = imgInfo.url;
        this.fileList = [];
        this.fileList.push(data);
      } else if (imgInfo.type == 2) {
        this.form.certifyUrl = imgInfo.url;
        this.studentFileList = [];
        this.studentFileList.push(data);
      }
    },
    closeSexPop () {
      this.sexPickshow = false;
      this.form.sex = this.radio;
    },

    //头像上传
    headportraitUploadFunc (e) {
      e.message = '上传中...';
      e.status = 'uploading'
      this.uploadQiniu(e.file, 2).then((res) => {
        this.form.headportrait = res.key;
        e.status = 'done'
        e.message = '上传成功';
      })
    },

    //学生证明上传
    studentUploadFunc (e) {
      e.message = '上传中...';
      e.status = 'uploading'
      this.uploadQiniu(e.file, 2).then((res) => {
        this.form.certifyUrl = res.key;
        e.status = 'done'
        e.message = '上传成功';
      })
    },

    setIdentification () {
      let formData = this.form;
      for (var key in formData) {
        if (key != 'teacher' && !formData[key]) {
          Toast('请填写完整信息')
          return false
        };
      }
      let params = {
        birthday: this.form.birthday,
        certifyUrl: this.form.certifyUrl,
        headportrait: this.form.headportrait,
        profession: this.form.profession,
        school: this.form.school,
        sex: this.form.sex,
        teacher: this.form.teacher,
        userName: this.form.userName,
        joinIdentify: this.$route.params.type == 1 ? 0 : 1
      }
      this.$loading();
      setIdentification(params).then(res => {
        this.$toast.clear();
        if (res.resp_code == 0) {
          Toast('认证成功')
          let path = ''
          this.$route.params.type == 1 ? path = '/teamList/0' : path = '/planxSpace/1/0'
          this.$router.replace({
            path: path
          })
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
  height: auto;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 pxTorem(32px) pxTorem(94px);
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
    padding-top: pxTorem(220px);
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
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
        img {
          width: pxTorem(14px);
          height: pxTorem(14px);
          margin: 0 0 pxTorem(4px) pxTorem(4px);
        }
        span {
          font-size: pxTorem(28px);
          font-family: PingFang SC;
          font-weight: 500;
          color: #2e3741;
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
        width: 100%;
        height: pxTorem(90px);
        border: none;
        font-size: pxTorem(32px);
      }
      input::-webkit-input-placeholder {
        color: #babec2;
      }
      .select-item {
        color: #2e3741;
      }
      .soild-item {
        height: pxTorem(1px);
        background: #e6e6e6;
        margin: pxTorem(0px) 0 pxTorem(44px);
      }
    }
  }
  .confirm-btn {
    width: pxTorem(686px);
    height: pxTorem(94px);
    line-height: pxTorem(94px);
    text-align: center;
    background: #fcf24f;
    border-radius: pxTorem(48px);
    font-size: pxTorem(32px);
    font-family: PingFang SC;
    font-weight: 400;
    color: #070133;
  }
  .upload-btn {
    width: pxTorem(550px);
    height: pxTorem(374px);
    background: url(http://img.bomaleye.com/20210225175534356_5386) no-repeat
      center center;
    background-size: 100% 100%;
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
  .date-picker {
    // width: pxTorem(600px);
    height: pxTorem(300px);
    padding: 0 pxTorem(40px) pxTorem(80px);
  }
  .sex-picker {
    // width: 100%;
    height: pxTorem(300px);
    padding: pxTorem(40px) pxTorem(80px);
  }
  //    /deep/ .van-picker-column {
  //        font-size: pxTorem(40px);
  //    }
  //    /deep/ .van-hairline-unset--top-bottom {
  //        height: pxTorem(60px)!important;
  //    }
  //    /deep/ .van-picker-column__item {
  //        height: pxTorem(60px)!important;
  //        line-height: pxTorem(60px);
  //    }
  //    /deep/ .van-ellipsis {
  //        height: pxTorem(60px)!important;
  //        line-height: pxTorem(60px);
  //    }
  //    van-picker-column__wrapper
}
</style>

<template>
  <div class="main">
    <navigation-bar :navTitle='navTitle'></navigation-bar>
    <div class="content">
      <div class="content-header">
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
            <input :value=" form.sex  == '235' ? '男' :form.sex  == '236'? '女':''"
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

        <div class="form-content-item"
             @click="workYearshow = true">
          <div>
            <span>工作年限</span>
            <img src="http://img.bomaleye.com/2021022515275977_4244"
                 alt="">
          </div>
          <div class="select-con">
            <input :value="selectWorkYear.name"
                   type="text"
                   class="select-item"
                   disabled="disabled"
                   placeholder="请选择工作年限" />
            <img src="http://img.bomaleye.com/20210225170352209_8843"
                 alt="">
          </div>
          <div class="soild-item"></div>
        </div>

        <div class="form-content-item"
             @click="dependenedIndustryshow = true">
          <div>
            <span>所属行业</span>
            <img src="http://img.bomaleye.com/2021022515275977_4244"
                 alt="">
          </div>

          <div class="select-con">
            <input :value="selectDependenedIndustry.name"
                   type="text"
                   class="select-item"
                   disabled="disabled"
                   placeholder="请选择所属行业" />
            <img src="http://img.bomaleye.com/20210225170352209_8843"
                 alt="">
          </div>
          <div class="soild-item"></div>
        </div>

        <div class="form-content-item"
             @click="diplomashow = true">
          <div>
            <span>最高学历</span>
            <img src="http://img.bomaleye.com/2021022515275977_4244"
                 alt="">
          </div>
          <div class="select-con">
            <input :value="selectDiploma.name"
                   type="text"
                   class="select-item"
                   disabled="disabled"
                   placeholder="请选择最高学历" />
            <img src="http://img.bomaleye.com/20210225170352209_8843"
                 alt="">
          </div>
          <div class="soild-item"></div>
        </div>

        <div class="form-content-item"
             @click="domicileAddressshow = true">
          <div>
            <span>家乡</span>
            <!-- <img src="http://img.bomaleye.com/2021022515275977_4244"
                 alt=""> -->
          </div>
          <div class="select-con">
            <input :value="domicileAddress"
                   type="text"
                   class="select-item"
                   disabled="disabled"
                   placeholder="请选择家乡" />
            <img src="http://img.bomaleye.com/20210225170352209_8843"
                 alt="">
          </div>
          <div class="soild-item"
               v-resetInput></div>
        </div>

        <div class="form-content-item">
          <div>
            <span>现居地址</span>
            <!-- <img src="http://img.bomaleye.com/2021022515275977_4244"
                 alt=""> -->
          </div>
          <input v-model="livingAddress"
                 type="text"
                 placeholder="请填写现居地址">
          <div class="soild-item"
               v-resetInput></div>
        </div>
      </div>
    </div>
    <div class="confirm-btn"
         @click="putMsg">
      确定
    </div>
    <!-- 年月日 -->
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
    <!-- 性别 -->
    <van-popup v-model="sexPickshow"
               position="bottom"
               :lock-scroll="fasle"
               @touchmove.prevent>
      <div class="sex-picker">
        <p>请选择性别</p>
        <van-radio-group v-model="form.sex"
                         checked-color="rgba(252, 242, 79, 1)"
                         direction="horizontal"
                         @change="closeSexPop">
          <van-radio name="235">男</van-radio>
          <van-radio name="236">女</van-radio>
        </van-radio-group>
      </div>
    </van-popup>
    <!-- 选择工作年限 -->
    <van-popup v-model="workYearshow"
               round
               position="bottom"
               :lock-scroll="fasle"
               @touchmove.prevent>
      <van-picker title="选择工作年限"
                  show-toolbar
                  :columns="workYear"
                  item-height="100px"
                  @confirm="workYearConfirm"
                  @cancel="workYearshow = false"
                  value-key="name" />
    </van-popup>
    <!-- 最高学历 -->
    <van-popup v-model="diplomashow"
               round
               position="bottom"
               :lock-scroll="fasle"
               @touchmove.prevent>
      <van-picker title="选择最高学历"
                  show-toolbar
                  :columns="diploma"
                  item-height="100px"
                  @confirm="diplomaConfirm"
                  @cancel="diplomashow = false"
                  value-key="name" />
    </van-popup>
    <!-- 所属行业 -->
    <van-popup v-model="dependenedIndustryshow"
               round
               position="bottom"
               :lock-scroll="fasle"
               @touchmove.prevent>
      <van-picker title="选择所属行业"
                  show-toolbar
                  :columns="dependenedIndustry"
                  item-height="100px"
                  @confirm="dependenedIndustryConfirm"
                  @cancel="dependenedIndustryshow = false"
                  value-key="name" />
    </van-popup>

    <!-- 家乡 -->
    <van-popup v-model="domicileAddressshow"
               round
               position="bottom"
               :lock-scroll="fasle"
               @touchmove.prevent>
      <van-area title="选择家乡"
                item-height="100px"
                @cancel="domicileCancel"
                :area-list="areaList"
                @confirm="domicileAddressComfirm" />
    </van-popup>
  </div>

</template>
<script>
import { phoneCodeLogin, bigdatadic, saveUserInfo } from "../../api/index"
import navigationBar from '../../components/common/navigation-bar'
import tools from "../../common/tools"
import area from "../../assets/area1"
import { Toast } from 'vant'

export default {
  components: {
    navigationBar
  },
  data () {
    return {
      navTitle: '完善简历',
      fileList: [],
      form: {
        birthday: '',
        certifyUrl: '',
        headportrait: '',
        sex: '',  // 235男   236女
        userName: ''
      },
      minDate: new Date(1960, 0, 1),
      maxDate: new Date(2022, 0, 1),
      currentDate: new Date(),
      datePickshow: false,
      sexPickshow: false,
      workYearshow: false,
      diplomashow: false,
      dependenedIndustryshow: false,
      domicileAddressshow: false,
      radio: '1',
      show: false,
      birthdayformDate: '',
      livingAddress: '',
      workYear: [],
      selectWorkYear: {},
      selectDiploma: {},
      diploma: [],
      dependenedIndustry: [],
      selectDependenedIndustry: {},
      domicileAddress: '',
      areaList: [],
      type: ''

    }
  },
  mounted () {
    this.type = this.$route.params.type
    this.getBigdatadic();
    this.initData();
  },
  computed: {
  },
  methods: {
    initData () {
      if (tools.localgetItem('userInfo') != "null" && tools.localgetItem('userInfo') != undefined) {
        let userInfo = JSON.parse(tools.localgetItem('userInfo'));
        if (userInfo.headportrait) {
          this.fileList.push({ url: "http://img.bomaleye.com/" + userInfo.headportrait,isImage: true })
          this.form.headportrait = userInfo.headportrait ? userInfo.headportrait : '';//个人头像
        }

        this.form.userName = userInfo.userName ? userInfo.userName : ''//用户姓名	
        this.form.sex = userInfo.sex ? userInfo.sex + "" : '';
        this.form.birthday = userInfo.birthday ? userInfo.birthday : '';
        this.birthdayformDate = userInfo.birthday ? this.getLocalTime(userInfo.birthday) : '';

        this.selectWorkYear.id = userInfo.workYear ? userInfo.workYear : '';
        
        // this.selectWorkYear.name = userInfo.workYearName ? userInfo.workYearName : '';
        this.selectDiploma.id = userInfo.diploma ? userInfo.diploma : '';
        // this.selectDiploma.name = userInfo.diplomaName ? userInfo.diplomaName : '';
        this.selectDependenedIndustry.id = userInfo.industryId ? userInfo.industryId : '';
        // this.selectDependenedIndustry.name = userInfo.industryName ? userInfo.industryName : '';
  
        this.livingAddress = userInfo.livingAddress ? userInfo.livingAddress : '';
        this.domicileAddress = userInfo.domicileAddress ? userInfo.domicileAddress : '';
        this.setData();
        
      }
    },

    setData(){
      if( this.workYear.length > 0 && this.selectWorkYear.id ){
          this.workYear.forEach((value,index)=> {
            if(value.id == this.selectWorkYear.id){
              this.selectWorkYear.name = value.name
            }
          })
      }

      if( this.diploma.length > 0 && this.selectDiploma.id ){
          this.diploma.forEach((value,index)=> {
            if(value.id == this.selectDiploma.id){
              this.selectDiploma.name = value.name
            }
          })
      }

      if( this.dependenedIndustry.length > 0 && this.selectDependenedIndustry.id ){
          this.dependenedIndustry.forEach((value,index)=> {
            if(value.id == this.selectDependenedIndustry.id){
              this.selectDependenedIndustry.name = value.name
            }
          })
      }
    },
    getBigdatadic () {
      this.areaList = area;
      this.$loading();
      bigdatadic({}).then(res => {
        this.$toast.clear();
        this.workYear = res.datas.workYears;
        this.diploma = res.datas.diploma;
        this.dependenedIndustry = res.datas.dependenedIndustry;
        this.setData();
      })
    },

    onConfirmDate (value) {
      this.birthdayformDate = tools.formatData(value, 'day');
      this.form.birthday = value;
      this.datePickshow = false
    },

    closeSexPop () {
      this.sexPickshow = false;
    },

    workYearConfirm (value, index) {
      this.workYearshow = false;
      this.selectWorkYear = value;
    },

    diplomaConfirm (value, index) {
      this.diplomashow = false;
      this.selectDiploma = value;

    },

    dependenedIndustryConfirm (value, index) {
      this.dependenedIndustryshow = false;
      this.selectDependenedIndustry = value;

    },

    domicileAddressComfirm (value) {
      this.domicileAddress = '';
      for (let index = 0; index < value.length; index++) {
        if (value[index]) {
          let element = value[index];
          if (index == 0) {
            this.domicileAddress = element.name
          }
          if (index != 0) {
            this.domicileAddress = this.domicileAddress + " " + element.name
          }
        }

      }
      this.domicileAddressshow = false;
    },

    domicileCancel () {
      this.domicileAddressshow = false;
    },

    getLocalTime (nS) {
      let year = new Date(parseInt(nS) * 1000).getFullYear();
      let month = (new Date(parseInt(nS) * 1000).getMonth() + 1) >= 10 ? (new Date(parseInt(nS) * 1000).getMonth() + 1) : "0" + (new Date(parseInt(nS) * 1000).getMonth() + 1);
      let day = new Date(parseInt(nS) * 1000).getDay() >= 10 ? new Date(parseInt(nS) * 1000).getDay() : "0" + new Date(parseInt(nS) * 1000).getDay();
      return year + "-" + month + "-" + day;
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

    beforeDel () {
      this.form.headportrait = "";
      this.fileList = [];
    },

    sendFileIfo (params) {
      let data = {
        url: 'http://img.bomaleye.com/' + params

      }
      this.fileList = [];
      this.fileList.push(data);
      this.incomeCodeUrl = params;
      this.editIncomeCode()
    },

    putMsg () {
      if (this.form.headportrait == '') {
        Toast('个人头像不能为空!', false);
        return;
      }
      if (this.form.userName == '') {
        Toast('请输入姓名', false);
        return;
      }
      if (this.form.sex == '') {
        Toast('请选择性别', false);
        return;
      }
      if (this.birthdayformDate == '') {
        Toast('请选择出生年月', false);
        return;
      }

      if (this.selectWorkYear.id == '') {
        Toast('请选择工作年限', false);
        return;
      }

      if (this.selectDependenedIndustry.id == '') {
        Toast('请选择所属行业', false);
        return;
      }

      if (this.selectDiploma.id == '') {
        Toast('请选择最高学历', false);
        return;
      }

      // if (this.domicileAddress == '') {
      //   Toast('请输入家乡', false);
      //   return;
      // }

      // if (this.livingAddress == '') {
      //   Toast('请输入现居地址', false);
      //   return;
      // }
     
      let params = {
        headportrait: this.form.headportrait, //个人头像
        userName: this.form.userName,  //用户姓名	
        sex: this.form.sex,       // 性别
        birthday: new Date(this.birthdayformDate).getTime() / 1000,  // 出生年月
        workYear: this.selectWorkYear.id,  // 工作时间
        industryId: this.selectDependenedIndustry.id, //所属行业
        diploma: this.selectDiploma.id,   //最高学历
        detailedAddress: this.livingAddress,  // 现居地址
        domicileAddress: this.domicileAddress,  // 家乡
        joinIdentify: this.type == 1 ? 1 : 0
      };

      this.$loading();
      saveUserInfo(params).then(res => {
        this.$toast.clear();
        if (res.resp_code == 0) {
          Toast('保存成功', false);
          if (this.type == 1) {
            this.$router.replace({
              path: "/planxSpace/1/0"
            })
          } else if (this.type == 2) {
            this.$router.replace({
              path: "/teamList/0"
            })
          }
        }
      });
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
      phoneCodeLogin(params).then(res => {
        if (tools.mobileDetect() == 1 || tools.mobileDetect() == 2) {
          this.$router.push({
            path: "/DownloadTip"
          })
        } else if (tools.mobileDetect() == 3) {
          Toast('请使用移动端打开!', false);
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
  min-height: 100%;
  overflow-y: auto;
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
  //  /deep/ .van-picker__columns {
  //     height: auto !important;
  //  }
  //  /deep/ .van-picker-column__item {
  //     height: 30px !important;
  //  }

  //  /deep/ .van-picker-column__item--selected {
  //    height: 30px !important;
  //  }

  .content {
    padding-top: pxTorem(148px);
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
        background-color: transparent;
      }
      input::-webkit-input-placeholder {
        color: #babec2;
      }
      .select-item {
        color: #2e3741;
      }
      .soild-item {
        height: pxTorem(1px);
        background: red;
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

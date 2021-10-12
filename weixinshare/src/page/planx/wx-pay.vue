<template>
    <div class="main">
        <div class="wallet-nav">
            <img src="http://img.bomaleye.com/2042095331853_7719" alt="" @click="routerToWalletDetail">
            <span>充值</span>
            <img src="http://img.bomaleye.com/2042095331853_7719" alt="">
        </div>
        <div class="wallet-recharge">
            <div class="wallet-recharge-title">
                请选择充值金额
            </div>

            <!-- B端套餐 -->
            <div class="wallet-recharge-con" v-if="userType == 0">
                <div :class="item.flag ? 'wallet-recharge-item active':'wallet-recharge-item'" v-for="(item, index) in orderList" :key="index" @click="selectRechargeInfo(item,index)">
                    <div class="wallet-recharge-gold">
                         <img src="http://img.bomaleye.com/203209173140324_6952" alt="">
                         <span>{{item.goldMtAmt}}</span>
                    </div>
                    <div class="wallet-recharge-silver">
                        <img src="http://img.bomaleye.com/203209173159895_2780" alt="">
                         <span>{{item.silverMtAmt}}</span>
                         <span>赠</span>
                    </div>
                    <p>
                        ￥{{item.payFee}}
                    </p>
                </div>
            </div>

            <!-- C端套餐 -->
             <div class="wallet-recharge-con" v-if="userType == 1">
                <div :class="item.flag ? 'wallet-recharge-item active':'wallet-recharge-item'" v-for="(item, index) in orderList" :key="index" @click="selectRechargeInfo(item,index)">
                    <div class="wallet-recharge-gold">
                         <img src="http://img.bomaleye.com/203209173159895_2780" alt="">
                         <span>{{item.silverMtAmt}}</span>
                    </div>
                    <div class="wallet-recharge-silver">
                    </div>
                    <p>
                        ￥{{item.payFee}}
                    </p>
                </div>
            </div>
            
            <!-- <div class="recharge-solid-item"></div> -->
            <div class="wallet-recharge-number">
                <span>购买数量</span>
                <van-stepper v-model="orderNum" button-size='80px' input-width='100px' integer='true' min='1' />
            </div>
        </div>
        <div class="wallet-recharge recharge-select">
            <div class="wallet-recharge-title recharge-way-title">
                请选择充值方式
            </div>
            <van-radio-group v-model="tradeType">
                <!-- <div class="wallet-recharge-way">
                    <div class="recharge-way-icon">
                        <img src="http://img.bomaleye.com/2678_3516" alt="">
                        <span>支付宝</span>
                    </div>
                    <van-radio name="0" icon-size="64px" checked-color='#EA4242'></van-radio>
                </div>
                <div class="recharge-solid-item recharge-way-solid"></div> -->
                <div class="wallet-recharge-way">
                    <div class="recharge-way-icon">
                        <img src="http://img.bomaleye.com/208602103_6109" alt="">
                        <span>微信支付</span>
                    </div>
                    <van-radio name="1" icon-size="64px" checked-color='#EA4242'></van-radio>
                </div>
            </van-radio-group>
        </div>
        <div class="wallet-recharge-tip">
            <span>已阅读并同意</span>
            <span @click="openRechargeArgement">《充值服务协议》</span>
            <span>，充值成功后，到账可能有一定延迟，请耐心等待。</span>
        </div>
        <div class="wallet-confirm" @click="confirmStatus && rechargeWallet()">
            <div class="wallet-confirm-btn">确认订单  ￥{{orderCurrency}}</div>
        </div>
    </div>
</template>
<script>
let rechargeResultInterval;
import {getPackageList, getUserOpenId, rechargeWallet, getRechargeResult} from "../../api/index"
import tools from '../../common/tools'
import {Toast} from 'vant'
export default {
    data() {
        return {
            isShow: false,
            walletInfo: {},
            userType: 1,
            tradeType: '1',
            goldMt: '',
            silverMt: '',
            orderList:[],
            orderNum: 0,
            orderUnivalent: 0,
            packageId: '',
            openid: '',
            code:''
        }
    },
    created() {
         if(!tools.localgetItem("token") || tools.localgetItem("token") == null) {
            tools.localsetItem("token",tools.GetQueryString('token'));
        }
        if(!tools.localgetItem("userId") || tools.localgetItem("userId") == null) {
            tools.localsetItem("userId",tools.GetQueryString('userId'));
        }
        this.getPackageList();
        this.getUserOpenId();
    },
    mounted() {
        if (typeof WeixinJSBridge == "undefined"){
                if( document.addEventListener ){
                    setTimeout(()=> {
                       document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                    },1000)
                }else if (document.attachEvent){
                    document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
                    document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                }
            }
    },
    computed: {
        orderCurrency: function() {
            return parseFloat(this.orderNum*this.orderUnivalent).toFixed(2)
        },
        confirmStatus: function() {
            return this.orderCurrency !=0 && this.tradeType !='' ? true : false
        }
    },

    methods: {

        //获取openId
        getUserOpenId() {
            let params = {
               code: tools.GetQueryString('code'),
             };
            getUserOpenId(params).then(res => {
                this.openid = res.datas.openid;
            })
        },

        //查询订单信息
        getRechargeResult(id) {
             let params = {
               orderNo: id ,
             };
            getRechargeResult(params).then(res => {
                if(res.resp_code == 0) {
                    this.$router.replace({
                    path: '/walletResult',
                    query:{
                        type: res.datas.tradeState
                    }
                  })
                }
            })
               
        },
        
        //发送订单信息
        rechargeWallet() {
            let params = {
                count:this.orderNum,
                openid: this.openid,
                packageId: this.packageId,
                tradeType: 1,
                userId: tools.localgetItem('userId'),
                userType: 1
             };
            rechargeWallet(params).then(res => {
                if(res.resp_code == 0) {
                    this.onBridgeReady(res.datas);
                }
            })
        },

        //获取套餐列表
        getPackageList() {
           let params = {
               packageType: 1,
           };
            getPackageList(params).then(res => {
                if(res.resp_code == 0) {
                    let packageList = res.datas;
                    packageList.forEach((val, index) => {
                        if(index == 0 ) {
                            this.orderUnivalent = val.payFee;
                            this.packageId = val.id;
                            val['flag'] = true
                        } else {
                            val['flag'] = false;
                        }
                        val['payFee'] = val.payFee;
                    });
                    this.orderList = packageList;
                } else {
                    Toast(res.resp_msg);
                }
            })
        }, 

        //调起微信充值
        onBridgeReady(data){ 
            let that = this;
            WeixinJSBridge.invoke(
                'getBrandWCPayRequest', {
                    "appId":data.appId,     //公众号ID，由商户传入     
                    "timeStamp":data.timeStamp,         //时间戳，自1970年以来的秒数     
                    "nonceStr":data.nonceStr, //随机串     
                    "package":data.package,     
                    "signType":data.signType,         //微信签名方式：     
                    "paySign":data.sign //微信签名 
                },
                function(res){
                if(res.err_msg == "get_brand_wcpay_request:ok" ){
                   rechargeResultInterval =  setInterval(()=> {
                         this.getRechargeResult(res.datas.orderNo);                         
                    },200)
                } 
            }); 
            
        },

        selectRechargeInfo(item,index) {
            this.orderUnivalent = item.payFee;
            this.silverMt = item.silverMt;
            this.goldMt = item.goldMt;
            this.packageId = item.id;
            this.orderList.forEach((val, valIndex) => {
                if(valIndex == index) {
                    this.$set(val,'flag',true);
                } else {
                    this.$set(val,'flag',false);
                }
            });
        },

        routerToWalletDetail() {
            this.$router.back(-1);
        },

        openRechargeArgement() {
            this.$router.push({
            path: '/rechargeAgreement'
            })
        }
      },
      destroyed() {
          clearInterval(rechargeResultInterval)
      }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@function pxTorem($px, $base-font-size: 75px) {
    @if (unitless($px)) {
        @warn "Assuming #{$px} to be in pixels, attempting to convert it into pixels for you";
        @return px2em($px + 0px);
    } @else if (unit($px) == em) {
        @return $px;
    }
    @return ($px / $base-font-size) * 1rem;
}
.main {
    height: 100%;
    background: #F5F5FA;
    position: relative;
    top: 0;
    overflow-y: auto;
    .wallet-nav {
        width: 100%;
        position: fixed;
        background: #ffffff;
        top: 0;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        min-height: pxTorem(80px);
        padding-bottom: pxTorem(48px);
        border-bottom: 1px solid #E6E6E6;
        img {
            margin: 0 pxTorem(32px);
        }
        img:nth-child(1) {
            width: pxTorem(18px);
            height: pxTorem(32px);
        }
         img:nth-child(3) {
            width: pxTorem(18px);
            height: pxTorem(36px);
            opacity: 0;
        }
        span {
            font-size: pxTorem(38px);
            font-family: PingFang SC;
            font-weight: 550;
            color: #2D3740;
            line-height: pxTorem(38px);
        }
    }
    .recharge-solid-item {
        width: 100%;
        height: pxTorem(1px);
        margin-top: pxTorem(16px);
    }
    .recharge-way-solid {
        margin: pxTorem(34px) 0;
    }
    .wallet-recharge {
        background: #ffffff;
        padding: pxTorem(48px) pxTorem(32px) pxTorem(52px) pxTorem(32px);
        margin-top: pxTorem(120px);
        .wallet-recharge-title {
            font-size: pxTorem(28px);
            font-family: PingFang SC;
            font-weight: 550;
            color: #2D3740;
        }
        .recharge-way-title {
            margin-bottom: pxTorem(74px);
        }
        .wallet-recharge-con {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            padding-top: pxTorem(46px);
            .active {
                border: pxTorem(1px) solid #EA4242;
                background: #FDF0F0;
            }
            .wallet-recharge-item {
                width: pxTorem(190px);
                padding: pxTorem(28px) pxTorem(0px) pxTorem(22px) pxTorem(24px);
                border: 1px solid #CCCCCC;
                border-radius: pxTorem(16px);
                margin-bottom: pxTorem(20px);
                .wallet-recharge-gold {
                    img {
                        width: pxTorem(28px);
                        height: pxTorem(28px)
                    };
                    span {
                        font-size: pxTorem(32px);
                        font-family: PingFang SC;
                        font-weight: 550;
                        color: #2D3740;
                        margin: 0 pxTorem(8px);
                    }
                    
                }
                .wallet-recharge-silver {
                    margin: pxTorem(8px) 0 pxTorem(16px) 0;
                    img {
                        width: pxTorem(20px);
                        height: pxTorem(20px);
                    };
                    span {
                        font-size: pxTorem(24px);
                        font-family: PingFang SC;
                        font-weight: 550;
                        color: #2D3740;
                    }
                    span:nth-child(1) {
                        margin: 0 pxTorem(10px);
                    }
                    span:nth-child(3) {
                        font-size: pxTorem(20px);
                        color: #EA4242;
                    }
                }
                p {
                    font-size: pxTorem(40px);
                    font-family: PingFang SC;
                    font-weight: bold;
                    color: #EA4242;
                    margin: 0!important;
                }
            }
        }
        .wallet-recharge-con::after {
            content: '';
            width: pxTorem(214px);
        }
        .wallet-recharge-number {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: pxTorem(48px);
            span {
                font-size: pxTorem(28px);;
                font-family: PingFang SC;
                font-weight: 550;
                color: #2D3740;
            }
        }
        .wallet-recharge-way {
            display: flex;
            justify-content: space-between;
            align-items: center;
            // padding: pxTorem(74px) 0  pxTorem(60px) 0;
            .recharge-way-icon {
                display: flex;
                align-items: center;
                span {
                    font-size: pxTorem(28px);
                    font-family: PingFang SC;
                    font-weight: 500;
                    color: #2D3740;
                    margin-left: pxTorem(30px);
                }
               img {
                    width: pxTorem(74px);
                    height: pxTorem(74px);
                } 
            }
        }
    }
    .recharge-select {
        margin-top: pxTorem(20px);
        padding-top: pxTorem(40px);
    }
    .wallet-recharge-tip {
        padding: pxTorem(32px);
        font-size: pxTorem(24px);
        font-family: PingFang SC;
        font-weight: 500;
        color: #2D3740;
        line-height: pxTorem(48px);
        span:nth-child(2){
            color:rgba(234, 66, 66, 1)
        }
    }
    .wallet-confirm {
        width: 100%;
        display: flex;
        justify-content: center;
        margin: pxTorem(50px) 0 pxTorem(104px) 0;
        .wallet-confirm-btn {
            width: pxTorem(686px);
            height: pxTorem(94px);
            background: #EA4242;
            border-radius: pxTorem(46px);
            line-height: pxTorem(94px);
            text-align: center;
            font-size: pxTorem(32px);
            font-family: PingFang SC;
            font-weight: 550;
            color: #FFFFFF;
        }
    }
    
    /deep/ .van-stepper__input {
        font-size: pxTorem(26px);
        font-weight: 550;
    }
}
</style>
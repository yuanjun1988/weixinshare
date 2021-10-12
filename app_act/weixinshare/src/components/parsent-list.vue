<template>
    <div class="main">
        <div class="main-con">
            <van-swipe class="my-swipe"  indicator-color="white">
                <van-swipe-item>
                    <div class="parsent-con">
                        <div :class="item.flag ? 'parsent-item active' : 'parsent-item'" v-for="(item, index) in parentsList1" :key="index" @click="selectParent(1, index)">
                            <img :src="photoFilter(item.coverUrl, 140, 114)" alt="">
                            <span>{{item.name}}</span>
                            <span class="price">{{item.price}}马蹄</span>
                        </div>
                    </div>
                </van-swipe-item>
                <van-swipe-item>
                    <div class="parsent-con">
                        <div :class="item.flag ? 'parsent-item active' : 'parsent-item'" v-for="(item, index) in parentsList2" :key="index" @click="selectParent(2, index)">
                            <img :src="photoFilter(item.coverUrl, 140, 114)" alt="">
                            <span>{{item.name}}</span>
                            <span class="price">{{item.price}}马蹄</span>
                        </div>
                    </div>
                </van-swipe-item>
            </van-swipe>
        </div>
        <div class="soild-item"></div>
        <div class="main-bottom">
            <div class="bottom-left">
                <img src="http://img.bomaleye.com/203209173159895_2780" alt="" class="mt-icon">
                <span v-if="walletInfo.silverMt">{{walletInfo.silverMt}}</span>
                <span class="price" @click="rechargeWallet">充值</span>
            </div>
            <div class="bottom-right">
                <van-stepper v-model="orderNum" button-size='80px' input-width='100px' integer='true' min='1' />
                <span @click="sendParsent">赠送</span>
            </div>
        </div>
    </div>
</template>
<script>
import { Toast } from 'vant'
import {getParentsList, getWallet, sendParsent} from "../api/index"
import tools from '../common/tools'
export default {
    props: ['receivedUserId', 'videoId'],
    data() {
        return {
            parentsList1: [], //礼物列表
            parentsList2: [],
            orderNum: 1,
            walletInfo: {},
            sendGiftInfo: {}
        }
    },
    created() {
        this.getParentsList();
        this.getWallet();
    },
    methods: {

        rechargeWallet() {
            this.$router.push({
                    path: '/wxPay'
                });
        },

        //获取礼物列表
        getParentsList() {
            let params = {
               type: '0'
            }
            getParentsList(params).then(res => {
                let data = res.datas
                data.forEach(val => {
                    val['flag'] = false
                });
                this.parentsList1 = data.splice(0,8) || [];
                this.parentsList2 = data || [];
            })
        },

        //获取钱包信息
        getWallet() {
            let params = {
                userType: tools.sessiongetItem("userType")
            };
            getWallet(params).then(res => {
                this.walletInfo = res.datas
            })
        },

        //赠送礼物
        sendParsent() {
            let params = {
                giftId: this.sendGiftInfo.id,
                message: '',
                receivedUserId: this.receivedUserId,
                receivedUserType: 1,
                sendUserType: tools.sessiongetItem("userType"),
                sourceType: 2,
                giftNum: this.orderNum,
                sourceId: this.videoId
            };
            sendParsent(params).then(res => {
                if(res.resp_code == 0) {
                    this.$emit('playParsentGift', this.sendGiftInfo.url);
                    this.getWallet()
                } else {
                    Toast(res.resp_msg)
                }
            })
        },

        

        //选择礼物
        selectParent(type, index) {
            this.parentsList1.forEach(val => {
                val['flag'] = false
            });
            this.parentsList2.forEach(val => {
                val['flag'] = false
            });
            if(type == 1) {
                this.parentsList1[index].flag = true;
                this.sendGiftInfo = this.parentsList1[index];
            } else {
                this.parentsList2[index].flag = true;
                this.sendGiftInfo = this.parentsList2[index];
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
        width: 100%;
        min-height: pxTorem(680px);
        background: #121619;
        opacity: 0.96;
        border-radius: pxTorem(24px) pxTorem(24px) 0px 0px;
        overflow: hidden;
        .main-con {
            padding: pxTorem(28px) pxTorem(32px) pxTorem(48px);
            .parsent-con {
                display: flex;
                align-items: center;
                flex-wrap: wrap;
                box-sizing: border-box;
            }
            .parsent-item {
                width: 25%;
                display: flex;
                align-items: center;
                flex-direction: column;
                margin-bottom: pxTorem(40px);
                padding: pxTorem(16px) pxTorem(12px) pxTorem(26px);
                box-sizing: border-box;
                img {
                    width: pxTorem(140px);
                    height: pxTorem(114px);
                    margin-bottom: pxTorem(10px);
                }
                span {
                   font-size: pxTorem(20px);
                   font-family: PingFang SC;
                   font-weight: 500;   
                   color: #FFFFFF;
                }
                .price {
                    margin-top: pxTorem(14px);
                    color: #999999;
                }
            }
            .active {
                background: #26292C;
                border: pxTorem(1px) solid #999999;
                border-radius: pxTorem(24px);
            }
        }

        .soild-item {
            width: 750px;
            height: 1px;
            background: #333333;
        }

        .main-bottom {
            padding:0 pxTorem(32px);
            height: pxTorem(158px);
            display: flex;
            justify-content: space-between;
            align-items: center;
            div {
                display: flex;
                align-items: center;
            }
            .bottom-left {
                img {
                    width: pxTorem(28px);
                    height: pxTorem(28px);
                    margin-right: pxTorem(6px);
                }
                span:nth-child(2) {
                    font-size: pxTorem(24px);
                    font-family: PingFang SC;
                    font-weight: 500;
                    color: #FFFFFF;
                    font-weight: bold;
                }
                span:nth-child(3) {
                    font-size: pxTorem(24px);
                    font-family: PingFang SC;
                    font-weight: 500;
                    color: #FF940D;
                    margin-left: pxTorem(40px);
                }
            }
            .bottom-right {
                span {
                    width: pxTorem(108px);
                    height: pxTorem(48px);
                    line-height:pxTorem(48px);
                    text-align: center;
                    background: #EA4242;
                    border-radius: pxTorem(24px);
                    font-size: pxTorem(24px);
                    font-family: PingFang SC;
                    font-weight: 500;
                    color: #FFFFFF;
                    margin-left: pxTorem(20px);;
                }
            }
        }
        /deep/ .van-swipe__indicators {
            bottom: pxTorem(0px);
        }
    }
</style>
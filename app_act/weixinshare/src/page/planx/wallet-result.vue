<template>
    <div class="main">
        <div class="wallet-nav" @click="goBack">
            <img src="http://img.bomaleye.com/2042095331853_7719" alt="">
        </div>
        <div class="main-content">
            <img v-if="rechargeStatus == '0000'" src="http://img.bomaleye.com/2058011017_4255" alt="">
            <img v-else src="http://img.bomaleye.com/206904292_846" alt="">
            <span v-if="rechargeStatus == '0000'">充值成功</span>
            <span v-else>充值失败</span>
            <div v-if="rechargeStatus == '0000'" class="confirm-btn" @click="routerToWalletDetail">完 成</div>
            <div v-else  class="confirm-btn" @click="routerToRecharge">返 回</div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            rechargeStatus: this.$route.query.type
        }
    },
    methods: {
        routerToRecharge() {
            this.$router.push({
                path: '/walletRecharge'
            })
        },
        routerToWalletDetail() {
            this.$router.go(-1);
        },
        goBack() {
            this.$route.query.type == '0000' ? this.routerToWalletDetail() : this.routerToRecharge();
        }
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
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .wallet-nav {
        position: fixed;
        top: pxTorem(62px);
        left: pxTorem(32px);
        background: #ffffff;
        border-bottom: 1px solid #E6E6E6;
        min-height: pxTorem(154px);
        img {
            width: pxTorem(18px);
            height: pxTorem(32px);
        }
    }
    .main-content{
        display: flex;
        flex-direction: column;
        align-items: center;
        img {
            width: pxTorem(94px);
            height: pxTorem(94px);
        }
        span {
            font-size: pxTorem(40px);
            font-family: PingFang SC;
            font-weight: 550;
            color: #2D3740;
            line-height: pxTorem(48px);
            margin: pxTorem(80px) 0 pxTorem(150px) 0;
        }
        .confirm-btn {
            width: pxTorem(544px);
            height: pxTorem(94px);
            background: #EA4242;
            border-radius: pxTorem(48px);
            line-height: pxTorem(94px);
            text-align: center;
            font-size: pxTorem(32px);
            font-family: PingFang SC;
            font-weight: 550;
            color: #FFFFFF;
        }

    }

}
</style>
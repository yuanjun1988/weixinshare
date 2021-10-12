<template>
      <div class="img-cover">
            <img src="../../static/image/sk_main_default.png" alt="">  
            <div class="reload-btn" @click="reloadPage">重新加载</div>
       </div>
</template>
<script>
export default {
    inject:['reload'],
    data(){
        return {
        }
    },
    methods: {
        //重新加载页面
        reloadPage() {
            this.reload();
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
    .img-cover {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }
     .img-cover img {
        width: 50%;
        height: auto;
    }
     .reload-btn {
        width:pxTorem(180px);
        height:pxTorem(62px);
        text-align: center;
        line-height: pxTorem(62px);
        border-radius:pxTorem(30px);
        font-size:pxTorem(28px);
        font-family:PingFang SC;
        font-weight:400;
        color:rgba(255,255,255,1);
        text-align: center;
        background:#C94444;
        margin-top: pxTorem(40px);
    }
</style>
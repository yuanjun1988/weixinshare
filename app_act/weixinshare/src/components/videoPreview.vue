<template>
      <div class="live-video" @click="hideVideoPreviewDia" v-if="videoready">
             <video class="video-tvc" :src="videourl" v-if="videoready" autoplay="autoplay" muted controls="controls" preload="auto"></video>
        </div>
</template>
<script>
export default {
    props: {
        videoready:false,
        videourl: ''
    },
    data () {
        return {
            // videoready:true,
        }
    },
    methods: {
        
        hideVideoPreviewDia() {
            this.videoready = false;
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
   .live-video {
        width: 100%;
        height: 100%;
        position: fixed;
        top: pxTorem(-0px);
        z-index: 99999999;
        background: rgba(0,0,0,.8);
        // top: ;

    }
    .video-tvc {
        width: 100%;
        max-height: pxTorem(500px);
        position: fixed;
        top: pxTorem(300px);
        // height: pxTorem(200px);
        // position: fixed;
    }
</style>
<template>
    <div class="main">
        <navigation-bar :navTitle='navTitle' @backTo='busy = true'></navigation-bar>
        <div class="list-content" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distanc="40">
            <div class="search-item">
                <input type="text" v-resetInput v-model="filter" placeholder="输入视频编号/指导老师/用户昵称">
                <div @click="searchVideo(1)">搜索</div>
            </div>
            <div class="video-content">
                <div class="content-tab">
                    <div @click="changeTab(1)" :class="videoType == 1 ?'active': ''">
                        <span>职场人</span>
                        <span class="solid-item"></span>
                    </div>
                    <div @click="changeTab(2)" :class="videoType == 2 ?'m active': ''">
                        <span>在校生</span>
                        <span class="solid-item"></span>
                    </div>
                    <div @click="changeTab(3)" :class="videoType == 3 ?' active': ''">
                        <span>花絮</span>
                        <span class="solid-item"></span>
                    </div>
                </div>
                <div class="video-list">
                    <div class="video-list-item" v-for="(item, index) in videoList" :key="index">
                        <div class="video-img" @click="playVideo(index)">
                            <img v-if="item.videoUrl" :src="videoposterFilter(item.videoUrl)" class="video-pre" alt="">
                            <i v-else class="van-icon van-icon-photo van-image__loading-icon"></i>
                            <img v-if="item.videoUrl" src="http://img.bomaleye.com/20210226172546332_4043" class="play-icon" alt="" >
                        </div>
                        <div class="video-tip">
                            <span>{{item.number}}</span>
                            &nbsp;
                            <span class="user_name">{{item.userName}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="team-bottom">
            <div class="create-btn" @click="joinActivity">
                我要参赛
            </div>
        </div>
    </div>
</template>
<script>
import {getAllActVideoList, searchVideo } from "../../api/index"
import  navigationBar from '../../components/common/navigation-bar'
import {Toast} from 'vant'
import tools from "../../common/tools"
export default {
    components: {
        navigationBar
    },
    data() {
        return {
            navTitle: '活动中心',
            page: 1,
            limit: 10,
            videoType: 1,
            loadMoreStatus: true,
            videoList: [],
            filter: '',
            busy: false,
        }
    },
    computed:{
        
    },
    created() {
        this.getAllActVideoList();
    },
    activated(){  // keep-alive 组件激活时使用
       this.busy = false
    },
    deactivated () {  // keep-alive 组件停用时使用
        this.busy = true    
    },
    methods: {
        playVideo(index) {
            this.busy = true;
            tools.localsetItem('videoList', this.videoList, 1)
            this.$router.push({
                path:"/videoVreview/" + this.videoType + '/' + index + '/' + this.page,
            })
        },

        //参加活动
        joinActivity() {
            this.busy = true;
            this.$router.push({
                path:"/planxSelectJoinType"
            })
        },
        
        //切换tab
        changeTab(type) {
            this.$loading();
            this.videoType = type;
            this.page = 1;
            this.videoList = [];
            this.getAllActVideoList();
        },

        searchVideo() {
             if(this.filter == '') {
                Toast('搜索内容不能为空')
                return false;
            }
            this.videoType = 4;
            this.page = 1;
            this.videoList = [];
            let params = {
                page: this.page,
                limit: this.limit,
                keyWord: this.filter,
                userType: '1'
            }
            searchVideo(params).then(res => {
                this.$toast.clear();
                if(res.resp_code == 0) {
                    this.videoList = this.videoList.concat(res.datas.data) || [];
                    if(res.datas.count / 10 <= this.page) {
                        this.loadMoreStatus = true;
                    } else {
                        this.loadMoreStatus = false;
                    }
                }
            })
        },

        //获取活动视频列表
        getAllActVideoList() {
              let params = {
                page: this.page,
                limit: this.limit,
                videoType: this.videoType,
                userType: '1'
            }
            getAllActVideoList(params).then(res => {
                this.$toast.clear();
                if(res.resp_code == 0) {
                    this.videoList = this.videoList.concat(res.datas.data) || [];
                    if(res.datas.count / 10 <= this.page) {
                        this.loadMoreStatus = true;
                    } else {
                        this.loadMoreStatus = false;
                    }
                }
            })
        },

        //无限加载
        loadMore() {
            if (this.loadMoreStatus) {
                Toast('没有更多了');
            } else {
                this.page = this.page + 1;
                if (this.videoType == 4) {
                    this.searchVideo();
                } else {
                    this.getAllActVideoList();
                }
            }
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
        width: 100%;
        height: auto;
        min-height: 100%;
        background: url(https://act.bomaleye.com/planx_home_bg.png) no-repeat center center;
        background-size: cover;
        .list-content {
            padding: pxTorem(160px) pxTorem(28px) 0;
            min-height: pxTorem(860px);
            .search-item {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: pxTorem(42px);
                input {
                    width: pxTorem(526px);
                    height: pxTorem(74px);
                    background: #120D38;
                    border: 1px solid #FFFFFF;
                    border-radius: pxTorem(36px);
                    padding: 0 pxTorem(34px);
                    color: #FFFFFF;
                }
                div {
                    font-size: pxTorem(28px);
                    font-family: PingFang SC;
                    font-weight: 500;
                    color: #FFFFFF;
                }
            }
        }
        .video-content {
            width: 100%;
            .content-tab {
                display: flex;
                align-items: center;
                justify-content: space-around;
                font-family: PingFang SC;
                color: #FFFFFF;
                div {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    font-size: pxTorem(28px);
                }
                .solid-item {
                    width: pxTorem(54px);
                    height: pxTorem(6px);
                    border-radius: pxTorem(3px);
                    margin-top: pxTorem(10px);;
                }
                
            }
            .active {
                span:nth-child(1) {
                    font-size:pxTorem(32px)!important;
                    font-weight: 550!important;
                }
                span:nth-child(2) {
                    background: #FCF24F;
                    transition:background-color .4s;
                }   
                }
            .video-list {
                min-height: pxTorem(700px);
                height: auto;
                padding: pxTorem(54px) pxTorem(36px) pxTorem(64px);
                background: url(http://img.bomaleye.com/20210329160152525_663) no-repeat center center;
                background-size: 100% 100%;
                margin-top: pxTorem(28px);
                display: flex;
                justify-content: space-between;
                flex-wrap: wrap;
                
                .video-list-item {
                    margin: pxTorem(14px) 0;
                    .video-img {
                        position: relative;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: pxTorem(188px);
                        height: pxTorem(276px);
                        background: url(http://img.bomaleye.com/20210301180601228_3801) no-repeat center center;
                        background-size: cover;
                        padding: pxTorem(2px);
                        .video-pre {
                            width: pxTorem(188px);
                            height: pxTorem(276px);
                            border-radius: pxTorem(7px);
                            object-fit: cover;
                            object-position:center center;
                        }
                        .play-icon {
                            width: pxTorem(40px);
                            height: pxTorem(44px);
                            position: absolute;
                        }
                    }
                    .video-tip {
                        font-size: pxTorem(24px);
                        font-family: PingFang SC;
                        font-weight: 500;
                        color: #ffffff;
                        margin-top: pxTorem(20px);
                        display: flex;
                        align-items: center;
                        .user_name {
                            display: inline-block;
                            width: pxTorem(150px);
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                        }
                }
            }
            .video-list::after {
                content: '';
                width: pxTorem(188px);
                height: pxTorem(276px);
            }
    }
        .team-bottom {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: pxTorem(48px) 0 pxTorem(80px);
        }
        .create-btn {
            width: pxTorem(432px);
            height: pxTorem(106px);
            line-height: pxTorem(106px);
            border-radius: pxTorem(60px);
            text-align: center;
            font-size: pxTorem(32px);
            font-family: PingFang SC;
            font-weight: 500;
            color: #070133;
            background: url(http://img.bomaleye.com/20210224160455944_6979) no-repeat center center;
            background-size: contain;
            //background: rgba(252, 242, 79, 1);
        }
    }
</style>

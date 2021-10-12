<template>
    <div class="main"  v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distanc="40">
        <navigation-bar :navTitle='navTitle'></navigation-bar>
        <div class="header">
        </div>
        <div class="list-content">
            <div class="video-content">
                <div class="content-tab">
                    <div @click="changeTab(1)" :class="videoType == 1 ?'active': ''">
                        <span>千里良驹榜</span>
                        <span class="solid-item"></span>
                    </div>
                    <div @click="changeTab(2)" :class="videoType == 2 ?'m active': ''">
                        <span>慧眼伯乐榜</span>
                        <span class="solid-item"></span>
                    </div>
                </div>
                <div class="video-list" v-if="videoType == 1">
                    <div class="video-list-1">
                        <span class="title">最佳人气奖</span>
                        <span class="tip">#投票排名#</span>
                        <div class="contribution">
                            <div class="contribution-1">
                                <img  class="header-img" v-if="theMostPopular[1].headportrait" :src="photoFilter(theMostPopular[1].headportrait,130,130)" alt="">
                                <img  class="header-img" v-else src="https://img.bomaleye.com/image/user_common_icon.png" alt="">
                                <img class="bg-img" src="http://img.bomaleye.com/2021052417254783_7659" alt="">
                                <span class="name">{{theMostPopular[1].name}}</span>
                                <span class="school">{{theMostPopular[1].schoolName}}</span>
                                <span class="vote">{{theMostPopular[1].number}}</span>
                            </div>
                            <div class="contribution-2">
                                <img  class="header-img" v-if="theMostPopular[0].headportrait" :src="photoFilter(theMostPopular[0].headportrait,130,130)" alt="">
                                <img  class="header-img" v-else src="https://img.bomaleye.com/image/user_common_icon.png" alt="">
                                <img class="bg-img" src="http://img.bomaleye.com/20210524171740606_8240" alt="">
                                <span class="name">{{theMostPopular[0].name}}</span>
                                <span class="school">{{theMostPopular[0].schoolName}}</span>
                                <span class="vote">{{theMostPopular[0].number}}</span>
                            </div>
                            <div class="contribution-3">
                                <img  class="header-img" v-if="theMostPopular[2].headportrait" :src="photoFilter(theMostPopular[2].headportrait,130,130)" alt="">
                                <img  class="header-img" v-else src="https://img.bomaleye.com/image/user_common_icon.png" alt="">
                                <img class="bg-img" src="http://img.bomaleye.com/20210524171740606_8240" alt="">
                                <span class="name">{{theMostPopular[2].name}}</span>
                                <span class="school">{{theMostPopular[2].schoolName}}</span>
                                <span class="vote">{{theMostPopular[2].number}}</span>
                            </div>
                        </div>
                    </div>
                     <div class="video-list-2">
                        <span class="title">最具商业价值奖</span>
                        <span class="tip">#打赏金额排名#</span>
                        <div class="contribution">
                            <div class="contribution-1">
                                <img  class="header-img" v-if="theMostCommerceValue[1].headportrait" :src="photoFilter(theMostCommerceValue[1].headportrait,130,130)" alt="">
                                <img  class="header-img" v-else src="https://img.bomaleye.com/image/user_common_icon.png" alt="">
                                <img class="bg-img" src="http://img.bomaleye.com/2021052417254783_7659" alt="">
                                <span class="name">{{theMostCommerceValue[1].name}}</span>
                                <span class="school">{{theMostCommerceValue[1].schoolName}}</span>
                                <span class="vote">{{theMostCommerceValue[1].number}}</span>
                            </div>
                            <div class="contribution-2">
                                <img  class="header-img" v-if="theMostCommerceValue[0].headportrait" :src="photoFilter(theMostCommerceValue[0].headportrait,130,130)" alt="">
                                <img  class="header-img" v-else src="https://img.bomaleye.com/image/user_common_icon.png" alt="">
                                <img class="bg-img" src="http://img.bomaleye.com/20210524171740606_8240" alt="">
                                <span class="name">{{theMostCommerceValue[0].name}}</span>
                                <span class="school">{{theMostCommerceValue[0].schoolName}}</span>
                                <span class="vote">{{theMostCommerceValue[0].number}}</span>
                            </div>
                            <div class="contribution-3">
                                <img  class="header-img" v-if="theMostCommerceValue[2].headportrait" :src="photoFilter(theMostCommerceValue[2].headportrait,130,130)" alt="">
                                <img  class="header-img" v-else src="https://img.bomaleye.com/image/user_common_icon.png" alt="">
                                <img class="bg-img" src="http://img.bomaleye.com/20210524171740606_8240" alt="">
                                <span class="name">{{theMostCommerceValue[2].name}}</span>
                                <span class="school">{{theMostCommerceValue[2].schoolName}}</span>
                                <span class="vote">{{theMostCommerceValue[2].number}}</span>
                            </div>
                        </div>
                    </div>
                     <div class="video-list-1">
                        <span class="title">最受观众喜爱奖</span>
                        <span class="tip">#点赞数量排名#</span>
                        <div class="contribution">
                            <div class="contribution-1">
                                <img  class="header-img" v-if="theMostLiked[1].headportrait" :src="photoFilter(theMostLiked[1].headportrait,130,130)" alt="">
                                <img  class="header-img" v-else src="https://img.bomaleye.com/image/user_common_icon.png" alt="">
                                <img class="bg-img" src="http://img.bomaleye.com/2021052417254783_7659" alt="">
                                <span class="name">{{theMostLiked[1].name}}</span>
                                <span class="school">{{theMostLiked[1].schoolName}}</span>
                                <span class="vote">{{theMostLiked[1].number}}</span>
                            </div>
                            <div class="contribution-2">
                                <img  class="header-img" v-if="theMostLiked[0].headportrait" :src="photoFilter(theMostLiked[0].headportrait,130,130)" alt="">
                                <img  class="header-img" v-else src="https://img.bomaleye.com/image/user_common_icon.png" alt="">
                                <img class="bg-img" src="http://img.bomaleye.com/20210524171740606_8240" alt="">
                                <span class="name">{{theMostLiked[0].name}}</span>
                                <span class="school">{{theMostLiked[0].schoolName}}</span>
                                <span class="vote">{{theMostLiked[0].number}}</span>
                            </div>
                            <div class="contribution-3">
                                <img  class="header-img" v-if="theMostLiked[2].headportrait" :src="photoFilter(theMostLiked[2].headportrait,130,130)" alt="">
                                <img  class="header-img" v-else src="https://img.bomaleye.com/image/user_common_icon.png" alt="">
                                <img class="bg-img" src="http://img.bomaleye.com/20210524171740606_8240" alt="">
                                <span class="name">{{theMostLiked[2].name}}</span>
                                <span class="school">{{theMostLiked[2].schoolName}}</span>
                                <span class="vote">{{theMostLiked[2].number}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="video-list-2">
                        <span class="title">最具商业潜力奖</span>
                        <span class="tip">#转发注册量排名#</span>
                        <div class="contribution">
                            <div class="contribution-1">
                                <img  class="header-img" v-if="theMostCommercePotential[1].headportrait" :src="photoFilter(theMostCommercePotential[1].headportrait,130,130)" alt="">
                                <img  class="header-img" v-else src="https://img.bomaleye.com/image/user_common_icon.png" alt="">
                                <img class="bg-img" src="http://img.bomaleye.com/2021052417254783_7659" alt="">
                                <span class="name">{{theMostCommercePotential[1].name}}</span>
                                <span class="school">{{theMostCommercePotential[1].schoolName}}</span>
                                <span class="vote">{{theMostCommercePotential[1].number}}</span>
                            </div>
                            <div class="contribution-2">
                                <img  class="header-img" v-if="theMostCommercePotential[0].headportrait" :src="photoFilter(theMostCommercePotential[0].headportrait,130,130)" alt="">
                                <img  class="header-img" v-else src="https://img.bomaleye.com/image/user_common_icon.png" alt="">
                                <img class="bg-img" src="http://img.bomaleye.com/20210524171740606_8240" alt="">
                                <span class="name">{{theMostCommercePotential[0].name}}</span>
                                <span class="school">{{theMostCommercePotential[0].schoolName}}</span>
                                <span class="vote">{{theMostCommercePotential[0].number}}</span>
                            </div>
                            <div class="contribution-3">
                                <img  class="header-img" v-if="theMostCommercePotential[2].headportrait" :src="photoFilter(theMostCommercePotential[2].headportrait,130,130)" alt="">
                                <img  class="header-img" v-else src="https://img.bomaleye.com/image/user_common_icon.png" alt="">
                                <img class="bg-img" src="http://img.bomaleye.com/20210524171740606_8240" alt="">
                                <span class="name">{{theMostCommercePotential[2].name}}</span>
                                <span class="school">{{theMostCommercePotential[2].schoolName}}</span>
                                <span class="vote">{{theMostCommercePotential[2].number}}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="video-list" v-if="videoType == 2">
                    <div class="bole-list-1 other">
                        <span class="bole-title">最佳人气奖</span>
                        <div v-for="(item, index) in theMostPopularOfSchool" :key="index">
                            <div class="list-left">
                                <img src="http://img.bomaleye.com/20210524180913396_5852" alt="">
                                <span >{{index}}</span>
                            </div>
                            <div class="list-mid">
                                <span>学校</span>
                                <span>{{item.schoolName}}</span>
                            </div>
                            <div class="list-right">
                                <span>人数</span>
                                <span>{{item.number}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="bole-list-1">
                        <span class="bole-title">最强组织奖</span>
                        <div v-for="(item, index) in theMostStrongOrganizationOfSchool" :key="index">
                            <div class="list-left">
                                <img src="http://img.bomaleye.com/20210524180913396_5852" alt="">
                                <span >{{index}}</span>
                            </div>
                            <div class="list-mid">
                                <span>学校</span>
                                <span>{{item.schoolName}}</span>
                            </div>
                            <div class="list-right">
                                <span>人数</span>
                                <span>{{item.number}}</span>
                            </div>
                        </div>
                    </div> 
                     <div class="bole-list-1 other">
                        <span class="bole-title">最具影响力奖</span>
                        <div v-for="(item, index) in theMostInfluenceOfSchool" :key="index">
                            <div class="list-left">
                                <img src="http://img.bomaleye.com/20210524180913396_5852" alt="">
                                <span >{{index}}</span>
                            </div>
                            <div class="list-mid">
                                <span>学校</span>
                                <span>{{item.schoolName}}</span>
                            </div>
                            <div class="list-right">
                                <span>人数</span>
                                <span>{{item.number}}</span>
                            </div>
                        </div>
                    </div>      
                </div>
            </div>
        </div>
           
    </div>
</template>
<script>
import {getLeaderboard } from "../../api/index"
import  navigationBar from '../../components/common/navigation-bar'
import {Toast} from 'vant'
import tools from '../../common/tools'
export default {
    components: {
        navigationBar
    },
    data() {
        return {
            navTitle: '贡献榜',
            page: 1,
            limit: 10,
            videoType: '',
            videoType: 2,
            loadMoreStatus: false,
            theMostCommercePotential: [],  //	最具商业潜力奖
            theMostCommerceValue: [],   //	最具商业价值奖
            theMostInfluenceOfSchool: [],  //	学校最具影响力
            theMostLiked: [],   //	最受观众喜爱奖
            theMostPopular: [],   //	最佳人气奖
            theMostPopularOfSchool: [],   //	学校最佳人气
            theMostStrongOrganizationOfSchool: [],   //	最强组织

        } 
    },
    computed:{
        
    },
    created() {
        this.getLeaderboard();
    },
    methods: {
      
        //切换tab
        changeTab(type) {
            this.videoType = type;
            this.page = 1;
            this.videoList = [];
            this.getLeaderboard();
        },
        
        //获取排行榜
        getLeaderboard() {
              let params = {}
            getLeaderboard(params).then(res => {
                if(res.resp_code == 0) {
                    this.theMostCommercePotential = res.datas.theMostCommercePotential || [];
                    this.theMostCommerceValue = res.datas.theMostCommerceValue || [];
                    this.theMostInfluenceOfSchool = res.datas.theMostInfluenceOfSchool.slice(0,2) || [];
                    this.theMostLiked = res.datas.theMostLiked || [];
                    this.theMostPopular = res.datas.theMostPopular || [];
                    this.theMostPopularOfSchool = res.datas.theMostPopularOfSchool.slice(0,2) || [];
                    this.theMostStrongOrganizationOfSchool = res.datas.theMostStrongOrganizationOfSchool.slice(0,2) || [];

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
        width: 100%;
        height: auto;
        padding-bottom:  pxTorem(80px);
        min-height: 100%;
        background: rgba(6, 1, 42, 1);
        position: relative;
        .list-content {
            min-height: pxTorem(860px);
            // padding-top: pxTorem(160px);
        }
        .header {
            width: 100%;
            height: pxTorem(1169px);
            background: url(http://img.bomaleye.com/2021030317495429_1695) no-repeat center center;
            background-size: 100% 100%;
            position: absolute;
            top: 0;
            left: 0;
        }
        .video-content {
            width: 100%;
            padding-top: pxTorem(724px);
            position: relative;
            .content-tab {
                width: 100%;
                position: absolute;
                display: flex;
                align-items: center;
                justify-content: center;
                font-family: PingFang SC;
                color: #FFFFFF;
                div {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    font-size: pxTorem(28px);
                    margin: 0 pxTorem(68px);
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
                padding: 0 pxTorem(32px);
                background-size: 100% 100%;
                margin-top: pxTorem(128px);
                display: flex;
                flex-wrap: wrap;
                .video-img {
                    font-size: pxTorem(32px);
                    font-family: PingFang SC;
                    font-weight: 550;
                    color: #FFFFFF;
                    display: flex;
                    align-items: center;
                    span {
                        width: pxTorem(106px);
                        height: pxTorem(70px);;
                        background: url(http://img.bomaleye.com/202103031857313_9980) no-repeat center center;
                        background-size: 100% 100%;
                        text-align: center;
                        line-height: pxTorem(70px);
                        margin-right: pxTorem(-16px);
                    }
                }
                .video-list-1 {
                    width: 100%;
                    height: pxTorem(688px);
                    background: url('http://img.bomaleye.com/20210524151346272_7967') no-repeat center center;
                    background-size: 100% 100%;
                    position: relative;
                    display: flex;
                    justify-content: center;
                    margin-top: pxTorem(36px);
                }
                 
                .title {
                    font-size: pxTorem(32px);
                    font-family: PingFang SC;
                    font-weight: 550;
                    color: #FFFFFF;
                    position: absolute;
                    top: pxTorem(60px);
                }
                .tip {
                    font-size: pxTorem(20px);
                    font-family: PingFang SC;
                    color: #CCCCCC;;
                    position: absolute;
                    top: pxTorem(144px);
                }
                .contribution {
                    width: 100%;
                    position: absolute;
                    padding: 0 pxTorem(38px);
                    box-sizing: border-box;
                    bottom: pxTorem(38px);
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;
                }
                .contribution>div {
                    display: flex;
                    align-items: center;
                    flex-direction: column;
                }
                .contribution-1 {
                    width: pxTorem(174px);
                    height: pxTorem(352px);
                    background: url('http://img.bomaleye.com/20210524172602627_4029') no-repeat center center;
                    background-size: cover;
                    .bg-img {
                        width: pxTorem(94px);
                        height: pxTorem(84px);
                        margin-top: pxTorem(-24px);
                        margin-left: pxTorem(8px);
                    }
                    .header-img {
                        width: pxTorem(124px);
                        height: pxTorem(124px);
                        border-radius: 50%;
                        margin-top: pxTorem(22px);
                    }
                    .name {
                        font-size: pxTorem(28px);
                        font-family: PingFang SC;
                        font-weight: 550;
                        color: #2EFFFF;
                        width: pxTorem(170px);
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        word-break: break-all;
                        text-align: center;
                    }
                    .school {
                        font-size: pxTorem(22px);
                        font-family: PingFang SC;
                        font-weight: 500;
                        color: #FFFFFF;
                        margin: pxTorem(10px) 0 pxTorem(12px);
                        width: pxTorem(170px);
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        word-break: break-all;
                        text-align: center;
                    }
                    .vote {
                        font-size: pxTorem(28px);
                        font-family: PingFang SC;
                        font-weight: 550;
                        color: #FFFFFF;
                        width: pxTorem(170px);
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        word-break: break-all;
                        text-align: center;
                    }
                }
                .contribution-2 {
                    width: pxTorem(224px);
                    height: pxTorem(398px);
                    background: url('http://img.bomaleye.com/20210524172800284_8059') no-repeat center center;
                    background-size: cover;
                    .bg-img {
                        width: pxTorem(108px);
                        height: pxTorem(98px);
                        margin-top: pxTorem(-40px);
                        margin-left: pxTorem(8px);
                    }
                    .header-img {
                        width: pxTorem(164px);
                        height: pxTorem(164px);
                        border-radius: 50%;
                        margin-top: pxTorem(26px);
                        margin-left: pxTorem(6px)
                    }
                    .name {
                        font-size: pxTorem(28px);
                        font-family: PingFang SC;
                        font-weight: 550;
                        color: #2EFFFF;
                        width: pxTorem(210px);
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        word-break: break-all;
                        text-align: center;
                    }
                    .school {
                        font-size: pxTorem(24px);
                        font-family: PingFang SC;
                        font-weight: 500;
                        color: #FFFFFF;
                         margin: pxTorem(10px) 0 pxTorem(12px);
                         width: pxTorem(210px);
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        word-break: break-all;
                        text-align: center;
                    }
                    .vote {
                        font-size: pxTorem(28px);
                        font-family: PingFang SC;
                        font-weight: 550;
                        color: #FFFFFF;
                        width: pxTorem(210px);
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        word-break: break-all;
                        text-align: center;
                    }
                   
                }
                .contribution-3 {
                    width: pxTorem(174px);
                    height: pxTorem(352px);
                    background: url('http://img.bomaleye.com/20210524172602627_4029') no-repeat center center;
                    background-size: cover;
                    .bg-img {
                        width: pxTorem(94px);
                        height: pxTorem(84px);
                        margin-top: pxTorem(-28px);
                        margin-left: pxTorem(8px);
                    }
                    .header-img {
                        width: pxTorem(124px);
                        height: pxTorem(124px);
                        border-radius: 50%;
                        margin-top: pxTorem(22px);
                    }
                     .name {
                        font-size: pxTorem(28px);
                        font-family: PingFang SC;
                        font-weight: 550;
                        color: #2EFFFF;
                        width: pxTorem(170px);
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        word-break: break-all;
                        text-align: center;
                    }
                    .school {
                        font-size: pxTorem(22px);
                        font-family: PingFang SC;
                        font-weight: 500;
                        color: #FFFFFF;
                        margin: pxTorem(10px) 0 pxTorem(12px);
                        width: pxTorem(170px);
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        word-break: break-all;
                        text-align: center;
                    }
                    .vote {
                        font-size: pxTorem(28px);
                        font-family: PingFang SC;
                        font-weight: 550;
                        color: #FFFFFF;
                        width: pxTorem(170px);
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        word-break: break-all;
                        text-align: center;
                    }
                }
                .video-list-2 {
                    width: 100%;
                    height: pxTorem(688px);
                    background: url('http://img.bomaleye.com/20210524173948479_3497') no-repeat center center;
                    background-size: cover;
                    background-size: 100% 100%;
                    position: relative;
                    display: flex;
                    justify-content: center;
                    margin-top: pxTorem(36px);
                    .contribution-1 {
                        background: url('http://img.bomaleye.com/20210524174151357_300') no-repeat center center;
                        background-size: cover;
                    }
                    .contribution-2 {
                        background: url('http://img.bomaleye.com/20210524174020728_2956') no-repeat center center;
                        background-size: cover;
                    }
                     .contribution-3 {
                        background: url('http://img.bomaleye.com/20210524174151357_300') no-repeat center center;
                        background-size: cover;
                    }
                }
            }
        }
        .bole-list-1 {
            width: 100%;
            height: pxTorem(300px);
            padding-top: pxTorem(94px);
            padding-bottom: pxTorem(64px);
            background: url('http://img.bomaleye.com/20210524180730630_3806') no-repeat center center;
            background-size: 100% 100%;
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: pxTorem(36px);
            .bole-title {
                font-size: pxTorem(32px);
                font-family: PingFang SC;
                font-weight: 550;
                color: #FFFFFF;
                position: absolute;
                top: pxTorem(53px);
                }
            .list-left {
                width: pxTorem(100px);
                height: pxTorem(70px);
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;
                img {
                    width: pxTorem(100px);
                    height: pxTorem(70px);
                    position: absolute;
                    top: 0;
                    left: 0;
                }
                span {
                    position: absolute;
                    font-size: pxTorem(32px);
                    font-family: PingFang SC;
                    font-weight: 550;
                    color: #FFFFFF;
                    line-height: pxTorem(48px);
                }
            }
            .list-mid {
                margin: 0 0 0 pxTorem(64px);
            }
            .list-mid,.list-right{
               display: flex;
               flex-direction: column;
            }
            .list-mid span:nth-child(1) {
                font-size: pxTorem(24px);;
                font-family: PingFang SC;
                font-weight: 500;
                color: #808080;
            }
            .list-mid span:nth-child(2) {
                font-size: pxTorem(28px);
                font-family: PingFang SC;
                font-weight: 550;
                color: #2EFFFF;
                width: pxTorem(270px);
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                word-break: break-all;
                margin-top: pxTorem(14px);
            }
            .list-right span:nth-child(1) {
                font-size: pxTorem(24px);;
                font-family: PingFang SC;
                font-weight: 500;
                color: #808080;
            }
            .list-right span:nth-child(2) {
                font-size: pxTorem(28px);
                font-family: PingFang SC;
                font-weight: 550;
                color: #FFFFFF;
                margin-top: pxTorem(14px);
            }
        }
        .bole-list-1>div {
            display: flex;
            align-items: center;
            width: 100%;
            padding-left: pxTorem(56px);
            margin-top: pxTorem(66px);
        }
        .other {
            background: url('http://img.bomaleye.com/20210525090822558_6128') no-repeat center center;
            background-size: 100% 100%;
        }
    }
</style>

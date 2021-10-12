<template>
    <div class="container_box" id="video_box">
         <div class="content-tab" v-if="!shareType">
             <img src="https://img.bomaleye.com/image/activity_backing_icon.png"
                alt=""
                @click="routerBack" class="video_back_icon" />
             <div>
                 <div @click="changeTab(0)" :class="videoType == 0 ?'content-tab-item active': 'content-tab-item'">
                    <span>参赛视频</span>
                    <span class="solid-item"></span>
                </div>
                <div @click="changeTab(1)" :class="videoType == 1 ?'content-tab-item active': 'content-tab-item'">
                    <span>花絮</span>
                    <span class="solid-item"></span>
                </div>
             </div>
        </div>
        <!-- <div v-show="videoList.length == 0" class="van_swipe">
            <van-empty
                class="custom-image"
                image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
                description="描述文字"
                />
        </div> -->
        <div class="van_swipe">
            <!--vant van-swipe 滑动组件 -->
            <van-swipe :show-indicators="false" @change="onChange" vertical :loop="false" ref="swiperBox" :initial-swipe="initial">
                <van-swipe-item v-for="(item, index) in videoList" :key="index" class="product_swiper">
                    <div class="video_container">
                        <!--video属性
                    webkit-playsinline ios 小窗播放，使视频不脱离文本流，安卓则无效
                    微信内置x5内核，
                    x5-video-player-type="h5-page" 启用H5播放器,是wechat安卓版特性，添加此属性，微信浏览器会自动将视频置为全屏
                    x5-video-player-fullscreen="true" 全屏设置，设置为 true 是防止横屏
                    x5-video-orientation 控制横竖屏 landscape 横屏，portrain竖屏； 默认portrain
                    poster：封面
                    src：播放地址
                    -->
                        <video class="video_box" loop webkit-playsinline="true"  x5-video-player-type="h5-page"
                               x5-video-player-fullscreen="true" playsinline preload="auto"
                               :poster="videoposterFilter(item.videoUrl)" :src="'http://video.bomaleye.com/' + item.videoUrl" :playOrPause="playOrPause"
                               @click="pauseVideo" @ended="onPlayerEnded($event)"
                        >
                        </video>
                        <!-- 封面 -->
                        <img v-show="isVideoShow" class="play" @click="playvideo" :src="videoposterFilter(item.videoUrl)"/>
                        <!-- 播放暂停按钮 -->
                        <img v-show="iconPlayShow" class="icon_play" @click="playvideo"
                             src="http://img.bomaleye.com/20210226172546332_4043"/>
                    </div>
                    <!-- 右侧头像、点赞、评论、分享功能 -->
                    <div class="tools_right">
                        <div class="tools_r_li">
                            <img v-if="item.headportrait" :src="photoFilter(item.headportrait, 100, 100)" class="tag_image" @click="routerToSpace(item)">
                            <img v-else src="https://img.bomaleye.com/image/coomon_header.png" alt="" class="tag_image" @click="routerToSpace(item)">
                            <i class="iconfont icon-jiahao tag_add" v-show="!item.tagFollow"
                               @click="checkSubscribe(item,index)"></i>
                            <i class="iconfont icon-duihao tag_dui" v-show="item.tagFollow"
                               :class="item.tagFollow?'tag_dui_active':''"></i>
                        </div>
                        <div class="tools_r_li" @click="changeFabulous(item,index)">
                            <i class="iconfont icon-shoucang icon_right"
                               :class="item.hasLiked?'fabulous_active':''"></i>
                            <div class="tools_r_num">{{item.likedCount}}</div>
                        </div>
                        <div class="tools_r_li" @click="changeComment">
                            <i class="iconfont icon-liuyan icon_right icon_right_change"></i>
                            <div class="tools_r_num">{{item.commentCount}}</div>
                        </div>
                        <div class="tools_r_li" @click="changeShare">
                            <i class="iconfont icon-iconfontforward icon_right"></i>
                            <div class="tools_r_num">{{item.shareCount}}</div>
                        </div>
                        <div class="tools_r_li" @click="isParentShow = true">
                            <img src="http://img.bomaleye.com/20210302161228402_7451" class="img-icon"/>
                        </div>
                    </div>
                    <!-- 底部作品描述 -->
                    <div class="production_box">
                        <div class="production_name">
                            NO.{{item.number}}&nbsp;{{item.userName}}
                        </div>
                        <div class="production_des">
                            {{item.videoDesc}}
                        </div>
                        <div class="vote_box">
                            <!-- <span :class="!item.savePacket4RedisDto?'':'active'" @click="joinActivity">我要参赛</span> -->
                            <span @click="joinActivity">我要参赛</span>
                            <!-- <p>每日首次转发可获得三票</p> -->
                        </div>
                    </div>
                </van-swipe-item>
            </van-swipe>
            <!--底部操作栏-->
            <div class="container_bottom">
                <div class="border_progress" :style="'width:'+videoProcess+'%'"></div>
            </div>
            <!--留言弹窗-->
            <van-popup v-model="commentPop" closeable :overlay="true" class="comment_container" position="bottom">
                <div class="comment_box">
                    <div class="comment_top">
                        视频详情
                        <i class="iconfont icon-guanbi1 guanbi3" @click="closeComment"></i>
                    </div>
                   
                    <ul class="comment_ul">
                         <div class="comment_title">
                        <div>
                             <img v-if="videoList[current].headportrait" :src="photoFilter(videoList[current].headportrait, 100, 100)"/>
                             <img v-else src="https://img.bomaleye.com/image/coomon_header.png" alt=""/>
                            <span>{{videoList[current].userName}}</span>
                        </div>
                        <div class="comment_videoDesc">
                            {{videoList[current].videoDesc}}
                        </div>
                    </div>
                    <div class="solid-item"></div>
                    <div class="comment_ul_title">
                        <div class="ul_title_left">
                            <span>全部评论</span>
                            <span>{{commentsCount}}</span>
                        </div>
                        <div class="ul_title_right">
                            <span @click="changeSortStrategy(2)" :class="sortStrategy == 2 ?'active' : ''">热度</span>
                            <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
                            <span @click="changeSortStrategy(4)" :class="sortStrategy == 4 ?'active' : ''">最新</span>
                        </div>
                    </div>
                        <div v-if="videoComment.length!=0">
                            <!-- <transition-group appear> -->
                                <li class="comment_li" v-for="(item,index) in videoComment" :key="index"
                                    >
                                    <div class="comment_author_left" @click.stop="replayUser(item,index,-1)">
                                        <img v-if="item.headPortrait" :src="photoFilter(item.headPortrait, 74, 74)">
                                        <img v-else src="https://img.bomaleye.com/image/coomon_header.png" alt=""/>
                                    </div>
                                    <div class="comment_author_right" @click.stop="replayUser(item,index,-1)">
                                        <div class="comment_author_top">
                                            <div class="comment_author_name">
                                                <span>{{item.userName}}</span>
                                                 <span>{{item.createTime}}</span>
                                            </div>
                                            <div class="icon-shoucang1_box" @click.stop="commentLove(item,index,-1)">
                                                <div class="shoucang1_num">{{item.likeCount}}</div>
                                                <div class="icon_right_change"
                                                     :class="item.liked?'love_active':''">
                                                    <img class="icondianzan-copy" v-if="item.liked" src="http://img.bomaleye.com/20210305113627530_2781" alt="">
                                                    <img class="icondianzan-copy" v-else src="http://img.bomaleye.com/20210305113714618_1144" alt="">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="comment_author_text">
                                            <span>{{item.commentText}}</span>
                                            <span v-if="userId == item.userId" @click.stop="deleteComments(item.id,index)">删除</span>
                                        </div>
                                    </div>
                                    
                                    <div class="clear"></div>
                                    <div class="comment_replay_box" v-if="item.child_comment">
                                        <!-- <transition-group appear> -->
                                            <div class="comment_replay_li" v-for="(item2,index2) in item.child_comment"
                                                 :key="index2" > 
                                                 <!-- //@click.stop="replayUser(item2,index,index2)" -->
                                                <div class="comment_replay_left">
                                                    <img v-if="item2.headPortrait" :src="photoFilter(item2.headPortrait, 74, 74)">
                                                    <img v-else src="https://img.bomaleye.com/image/coomon_header.png" alt=""/>
                                                </div>
                                                <div class="comment_replay_right">
                                                    <div class="comment_replay_top">
                                                        <div class="comment_replay_name">{{item2.userName}}</div>
                                                        <div class="icon-shoucang1_box"
                                                             @click.stop="commentLove(item2,index,index2)">
                                                            <div class="shoucang1_num">{{item2.likeCount}}</div>
                                                            <div class="icon_right_change"
                                                                 :class="item2.liked?'love_active':''">
                                                                 <img class="icondianzan-copy" v-if="item2.liked" src="http://img.bomaleye.com/20210305113627530_2781" alt="">
                                                                 <img class="icondianzan-copy" v-else src="http://img.bomaleye.com/20210305113714618_1144" alt="">
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="comment_replay_text">
                                                        {{item2.commentText}}
                                                    </div>
                                                </div>
                                                <div class="clear">
                                                    <span>{{item2.createTime}}</span>
                                                    <span v-if="userId == item2.userId" @click.stop="deleteComments(item2.id,index,index2)">删除</span>
                                                </div>
                                            </div>
                                        <!-- </transition-group> -->
                                    </div>
                                    <div class="open_child_comment" @click.stop="getPageCommentList(item.id, index)" v-if="item.subCount != 0 && item.child_comment && item.child_comment.length < item.subCount">
                                        <span>展开更多回复</span>
                                        <img src="http://img.bomaleye.com/20210305155117329_3171" alt="">
                                    </div>
                                </li>
                            <!-- </transition-group> -->
                        </div>
                        <div class="no_message" v-if="videoComment.length==0">
                            <i class="iconfont iconfont_style icon-zanwupinglun"></i>
                            <div class="no_message_tips">暂无评论</div>
                        </div>
                    </ul>
                </div>
            </van-popup>
            <!--留言输入-->
            <div class="comment_input_box_hover"></div>
            <div class="comment_input_box" v-show="commentPop">
                <!--<form action="#" class="comment_form">-->
                <input :placeholder="commentPlaceholder" class="comment_input" v-model="comment_text" ref="content"
                       @keyup.enter="checkComment"/>
                <!--</form>-->
                <div class="comment_input_right" @click="checkComment">
                    <i class="iconfont icon-fasong comment_i" :class="canSend?'comment_i_active':''"></i>
                </div>
            </div>
        </div>
         <van-popup v-model="envelopesshow"  @touchmove.prevent>
            <div class="envelopes-box">
                <div class="envelopes-title">
                    领取红包
                </div>
                <div class="envelopes-num">
                    <span>{{redPacketNum}}</span>
                    <span>银马蹄</span>
                </div>
                <div class="envelopes-tip">
                    感谢大家为我投票
                    银马蹄在“伯马乐业”APP可以提现哦！
                </div>
                <div class="envelopes-download-btn" @click="envelopesshow = false">
                </div>
                <div class="envelopes-app-btn">
                    下载APP去提现
                </div>
            </div>
        </van-popup>
        <van-popup v-model="isParentShow" class="parsent-dia" @closePop='isParentShow = false' :round="true"  @touchmove.prevent :overlay="true" position="bottom" close-icon-position style="background:rgba(255, 255, 255, 0);">
               <parsent-list :receivedUserId="videoList[current].userId" :videoId='videoList[current].id' @playParsentGift="playParsentGift"></parsent-list>
        </van-popup>
        <van-popup v-model="isPlay" @touchmove.prevent :overlay='false'  style="background:rgba(255, 255, 255, 0);z-index:2100" close-icon-position>
            <div id="demoCanvas">
            </div>
        </van-popup>
        <van-popup v-model="showShareBox"   style="opacity:0.6;background:#000000;height:100%" close-icon-position :close-on-click-overlay="true"  position="top">
            <div style="width:100%;height:100%;text-align:center" @click="showShareBox = false">
                <img class="share_icon" src="http://img.bomaleye.com/20210318112550266_5427" alt="" style="width:70%;height:30%">
            </div>
        </van-popup>
    </div>
</template>
<script>
    let videoProcessInterval;
    import SVGA from "svgaplayerweb"
    import wx from 'weixin-js-sdk'
    import tools from "../../common/tools"
    import parsentList from '../../components/parsent-list'
    import {Toast} from 'vant'
    import {setActFocus, setActShareStatus, setLikedHandle, getWxSignature, setVoteHandle, getPageCommentList, createComments, deleteComments, setCommentsLike,} from "../../api/index"
    export default {
        props:['videoList1','videoList2'],
        name: 'home',
        data() {
            let u = navigator.userAgent;
            return {
                current: this.$route.params.index,
                videoList: [],
                isVideoShow: true,
                playOrPause: true,
                video: null,
                iconPlayShow: true,
                isAndroid: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, // android终端
                isiOS: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
                tabIndex: 0,
                showShareBox: false,//展示分享框
                commentPop: false,//是否展示评论弹框
                // 评论相关
                comment_text: '',//评论输入内容
                canSend: false,//是否可以发送
                videoComment: [],
                commentPlaceholder: '留下你精彩的评论吧',//评论Placeholder
                replayUserData: '',
                to_comment_id: '',
                videoProcess: 0,//视频播放进度
                videoType: this.$route.params.type,
                page: 1,
                limit: 10,
                envelopesshow: false,
                commentPage: 1,
                commentPageSize: 200,
                sortStrategy: 2,   //排序策略 非必填 1--按点赞数小到大 2 --按点赞数 时间 大到小 3--按时间早到晚 4 按时间晚到早
                commentsCount: '',
                isShowCildComments: true,
                userId: tools.sessiongetItem("userId"),
                isParentShow: false,
                isPlay: false,
                redPacketNum:'',
                initial: '0',
                shareType: tools.GetQueryString('shareType')
            }
        },
        watch: {
            //监听输入变化
            comment_text(newV, oldV) {
                newV == '' ? this.canSend = false : this.canSend = true
            }
        },
        components: {
            parsentList,
        },
        created() {
            if (this.videoType == 1) {
                this.videoList = tools.localgetItem('tidbitsVideo',1)
                this.initial = this.$route.params.index;
            } else {
                let data = tools.localgetItem('othersVideo',1)
                data.forEach((val, index) => {
                    if (val.id == this.$route.params.index) {
                        this.initial = index;
                        this.current = index;
                    }
                });
                this.videoList = data;
            }
        },
        mounted() {
             window.getShareResult = this.getShareResult;
            this.$bridge.registerHandler('getShareResult', (params, responseCallback) => {
                this.getShareResult();
                responseCallback(params)
            })
            document.body.addEventListener('focusout', this.chartResize);
            document.addEventListener("WeixinJSBridgeReady", this.iosVideoPlay);
        },
        methods: {
            routerBack() {
               this.$router.go(-1);
            },
            downloadApp() {
                this.$router.push({
                    path: '/downloadTip'
                })
            },

            getShareResult() {
                this.setActShareStatus();
            },

            setClickStatus() {
                if(!tools.sessiongetItem("token") || tools.sessiongetItem("token") == null || tools.sessiongetItem("token") == undefined) {
                    return false
                } else {
                    return true;
                }
            },

             //点击头像进入空间
            routerToSpace(item) {
                if(!this.setClickStatus()) {
                    this.$router.push({
                            path: '/planxHome'
                        })
                    return;
                }
                this.$router.push({
                    path: "/planxSpace/" + item.joinIdentify  + '/' + item.number,
                    params: {spaceId:item.number, spaceId: item.joinIdentify }
                })
            },

            //参赛
            joinActivity(){
                if(!this.setClickStatus()) {
                    this.$router.push({
                            path: '/planxHome'
                        })
                    return;
                }
                if (tools.sessiongetItem("userType") !=1 ) {
                    Toast('请切换到千里马身份参加活动')
                    return;
                }
                this.$router.push({
                    path: '/planxSelectJoinType'
                });
            },

            //播放礼物特效
            playParsentGift(url) {
                this.isPlay = true;
                this.$nextTick(()=> {
                    let parsentPlayUrl = 'https://img.bomaleye.com/' + url
                    let player = new SVGA.Player("#demoCanvas");
                    let parser = new SVGA.Parser("#demoCanvas");
                    player.clearsAfterStop=false;
                    parser.load(parsentPlayUrl,(videoItem)=> {                          //this.bgImg，图片路径需要线上地址，本地引用会报错
                        player.setVideoItem(videoItem);
                        player.startAnimation();
                        setTimeout(() => {
                            player.stopAnimation();
                            this.isPlay = false
                        }, 4000);
                        }
                    );
                })
            },

             //分享后增加票数
            setActShareStatus() {
                let params = {
                    videoId: this.videoList[this.current].id,
                    voteType: 1  //投票方式 0-投票 1-分享
                }
               
                setActShareStatus(params).then(res => {
                    if (res.resp_code == 0) {
                        this.videoList[this.current].shareCount ++;
                    }
                })
            },

            //切换评论排序
            changeSortStrategy(type) {
                this.sortStrategy = type;
                this.videoComment = [];
                this.commentPage = 1;
                this.getPageCommentList(0)
            },

            //点赞/取消点赞评论
            commentLove(item, index, index2) {
                // this.setClickStatus()
                this.comment_text = '';
                this.isSending = true;
                let params = {
                    commentId: item.id,
                    userType: tools.sessiongetItem("userType")
                }
                let liked = item.liked,
                    love_flag = 0;//0:取消点赞；1：点赞
                if (liked) {
                    //取消点赞
                    love_flag = 0
                } else {
                    //添加点赞
                    love_flag = 1
                }
                setCommentsLike(params).then(res => {
                    if(res.resp_code == 0) {
                        if (index2 == -1) {
                            //点赞一级评论
                            this.videoComment[index].liked = !this.videoComment[index].liked;
                            if (love_flag == 1) {
                                this.videoComment[index].likeCount++
                            } else {
                                this.videoComment[index].likeCount--
                            }
                        } else {
                            //点赞二级评论
                            this.videoComment[index].child_comment[index2].liked = !this.videoComment[index].child_comment[index2].liked
                            if (love_flag == 1) {
                                this.videoComment[index].child_comment[index2].likeCount++
                            } else {
                                this.videoComment[index].child_comment[index2].likeCount--
                            }
                        }
                    }
                    
                })
            },

            //评论
            sendComment(comment_id, p_user_id, content) {
                this.comment_text = '';
                this.isSending = true;
                let params = {
                    	// ateUserId: 0,    //	@的用户ID
                        // ateUserName: '',  //@的用户名
                        // ateUserType: 0,  //@的用户类型0 -企业 1-个人
                        commentText: content,  //评论内容
                        itemId: p_user_id,   //	被评论对象ID
                        itemType: 5, //被评论对象类型 0-个人视频 1-公司视频 2-游客视频中无来源的 3-悬赏视频 4-活动视频 发现入口请优先判断游客视频是否是悬赏视频,是悬赏视频传3不是直接传入游客视频的type若type为空默认传2
                        parentId: comment_id,  //父级ID 第一层父级id为0
                        userType: tools.sessiongetItem("userType")  //评论用户类型 0 - 企业 1 -个人
                }
                createComments(params).then(res => {
                    if(res.resp_code == 0) {
                        let newData = res.datas;
                         if (this.replayUserData == '') {
                            //回复作品
                            this.videoComment.splice(0, 0, newData)
                        } else {
                            let index = this.replayUserData.index;
                            let index2 = this.replayUserData.index2;
                            if (this.replayUserData.index2 == -1) {
                                //回复一级人
                                // this.videoComment[index].child_comment.splice(0, 0, newData)
                                if(!this.videoComment[index].child_comment) {
                                    this.videoComment[index]['child_comment'] = []
                                }
                                this.videoComment[index]['child_comment'].splice(0, 0, newData)
                            } else {
                                //回复二级人
                                this.videoComment[index].child_comment.splice(index2, 0, newData)
                            }
                        }
                        this.replayUserData = '';
                        this.isSending = false;
                        this.videoList[this.current].commentCount ++ ;
                        this.commentsCount ++;
                    } else {

                    }
                    
                })
            },

           //删除评论
            deleteComments(id,index,index2) {
                 let params = {
                    id: id
                }
                deleteComments(params).then(res => {
                    if(res.resp_code == 0) {
                        if(index2 == undefined) {
                            this.videoComment.splice(index, 1);
                        } else {
                            this.videoComment[index]['child_comment'].splice(index2, 1)
                        }
                        this.videoList[this.current].commentCount --;
                        this.commentsCount --;
                    }
                })
            },

            //获取评论列表
            getPageCommentList(id, index) {
                let params = {
                    itemType: 5,   //被评论对象类型 0-个人视频 1-公司视频 2-游客视频中无来源的 3-悬赏视频 4-活动视频 发现入口请优先判断游客视频是否是悬赏视频,是悬赏视频传3不是直接传入游客视频的type若type为空默认传2
                    loginUserType: 1,  //当前用户类型 0 --企业 1--个人
                    page: this.commentPage,
                    pageSize: this.commentPageSize,
                    parentId: id,   //  父级ID 顶层为0
                    itemId: this.videoList[this.current].id,//this.videoList[this.current].id,    // 被评论对象ID, 如果是游客视频内的悬赏视频，请传rewardId
                    sortStrategy: this.sortStrategy,   //排序策略 非必填 1--按点赞数小到大 2 --按点赞数 时间 大到小 3--按时间早到晚 4 按时间晚到早
                }
                getPageCommentList(params).then(res => {
                    let data = res.datas.data;
                    if(id == 0) {
                        data.forEach(val => {
                            val['child_comment'] = []
                        });
                        this.videoComment = data || [];
                        this.commentsCount = res.datas.count;
                    } else {
                        this.videoComment[index]['child_comment'] = data || [];
                        this.isShowCildComments = false
                    }
                    
                })
            },

            //投票
            setVoteHandle() {
                if(!this.setClickStatus()) {
                    this.$router.push({
                            path: '/planxHome'
                        })
                    return;
                }
                let params = {
                    videoId: this.videoList[this.current].id
                }
               
                setVoteHandle(params).then(res => {
                    if(res.resp_code == 0) {
                        Toast('投票成功')
                        setTimeout(() => {
                            if(res.datas.redPacketRecord) {
                                this.envelopesshow = true;
                                this.redPacketNum = res.datas.redPacketRecord.packagePrice;
                            }   
                        }, 200);
                        
                    } else {
                        Toast(res.resp_msg)
                    }
                })
            },

            //展示分享弹窗
            changeShare() {
                let params = {
                    title: '我正在参加“PLAN-X人才计划”春季赛',
					desc: '参与/投票/分享/点赞 拆红包 赢大礼 ',
					link: 'https://mp.bomaleye.com/#/sharePreivew?shareType=2' + '&videoType=' + this.videoType + '&shareVideoId=' + this.videoList[this.current].id, // 分享链接
                    // link: 'http://192.168.0.12935:10000/mp/#/sharePreivew?shareType=2' + '&videoType=' + this.videoType + '&shareVideoId=' + this.videoList[this.current].id,
					imgUrl: 'http://img.bomaleye.com/2021031618145989_680', // 分享图片，使用逗号,隔开
                }
                tools.mobileDetect()==1 ? window.webkit.messageHandlers.shareActivityVideo.postMessage(params) : this.$bridge.callHandler('shareActivityVideo',params,(res)=>{ responseCallback(params) })
            },

             //切换tab
            changeTab(type) {
                this.videoType = type;
                this.page = 1;
                 if(type == 1) {
                    this.videoList = tools.localgetItem('tidbitsVideo',1);
                } else {
                    this.videoList = tools.localgetItem('othersVideo',1);
                }
                this.playvideo();
            },

            //新增/取消关注
            checkSubscribe(item, index) {
                if(!this.setClickStatus()) {
                    this.$router.push({
                            path: '/planxHome'
                        })
                    return;
                }
                let params = {
                    status: 1,  	// 0-取消关注 1-关注
	                toUserId: item.userId,    //被关注人userId
                    userType: tools.sessiongetItem("userType") 
                }
               
                setActFocus(params).then(res => {
                    if(res.resp_code == 0) {
                         this.videoList.map(v => {
                            v.userId == item.userId ? v.tagFollow = true : '';
                    })
                    }
                })
            },

            //改变点赞状态
            changeFabulous(item, index) {
                if(!this.setClickStatus()) {
                    this.$router.push({
                            path: '/planxHome'
                        })
                    return;
                }
                let params = {
                    likedState: item.hasLiked ? 0 : 1,  		// 0-取消点赞,1-点赞
	                videoId: item.id,
                    userType: tools.sessiongetItem("userType")     
                }
               
                setLikedHandle(params).then(res => {
                    if(res.resp_code == 0) {
                         this.videoList[index].hasLiked = !this.videoList[index].hasLiked
                         this.videoList[index].likedCount = res.datas;
                    }
                })
            },

            //ios 手机第一个视频播放
            iosVideoPlay() {
                 let video = document.querySelectorAll('video')[this.current];
                 video.play();
            },

            //监听ios手机键盘
            chartResize() {
                console.log("键盘收起");
                //document.title = "键盘收起" + $(".weui-dialog").css("position") + CBJS.getScrollTop() + $(".weui-dialog").css("top");

                var ua = window.navigator.userAgent;
                if (ua.indexOf('iPhone') > 0 || ua.indexOf('iPad') > 0) { //键盘收起页面空白问题
                    document.body.scrollTop = 0;
                    document.documentElement.scrollTop = 0;
                }
                },

                autoPlay(player) {
                    wx.config({
                        // 配置信息, 即使不正确也能使用 wx.ready
                        debug: false,
                        appId: '',
                        timestamp: 1,
                        nonceStr: '',
                        signature: '',
                        jsApiList: []
                    });
                    wx.ready(() => {
                        if(player)//创建的Aliplayer对象
                        {
                        player.play();
                        }
                    });
            },

            //检测评论内容
            checkComment() {
                if (this.comment_text == '') {
                    Toast('评论内容不能为空')
                } else {
                    let comment_id = 0,p_user_id = this.videoList[this.current].id, content = this.comment_text;
                    if (this.replayUserData.constructor === Object) {
                        comment_id = this.replayUserData.id;
                        p_user_id = this.videoList[this.current].id;
                    }
                    this.sendComment(comment_id, p_user_id, content)
                }
            },
           
            
            //点击回复
            replayUser(item, index, index2) {
                item.index = index;
                item.index2 = index2;
                this.replayUserData = item;
                console.log(item)
                this.commentPlaceholder = `回复 @${item.userName}：`;
                this.$refs.content.focus();
            },

            //弹出评论窗口
            changeComment() {
                if(!this.setClickStatus()) {
                    this.$router.push({
                            path: '/planxHome'
                        })
                    return;
                }
                this.commentPop = true;
                this.videoComment = [];
                this.getPageCommentList(0);
            },

            //关闭评论弹窗
            closeComment() {
                this.commentPop = false;
                this.commentPlaceholder = '留下你精彩的评论吧';
                this.replayUserData = '';
            },

            //取消分享
            cancelShare() {
                this.showShareBox = false
            },

            //滑动改变播放的视频
            onChange(index) {
                //改变的时候 暂停当前播放的视频
                clearInterval(videoProcessInterval)
                this.videoProcess = 0;
                let video = document.querySelectorAll('video')[this.current];
                video.pause();
                this.playOrPause = false;
                this.showShareBox = false;
                this.current = index;
                //非ios切换直接自动播放下一个
                if (!this.isiOS) {
                    this.isVideoShow = false;
                    setTimeout(() => {
                        this.pauseVideo()
                    }, 100)
                } else {
                    //ios官方禁止video自动播放，未找到合适的方法，如果您发现了，麻烦告诉我一下谢谢啦
                    this.playOrPause = true;
                    this.iconPlayShow = true;
                }
            },

            // 开始播放
            playvideo(event) {
                let video = document.querySelectorAll('video')[this.current];
                console.log("playvideo：" + this.current);
                this.isVideoShow = false;
                this.iconPlayShow = false;
                this.showShareBox = false;
                video.play();
                if (this.isiOS) {
                    setTimeout(() => {
                        //处理ios宽视频
                        let documentW = (document.documentElement.clientWidth || document.body.clientWidth);
                        let docB = parseFloat(video.videoWidth / documentW);
                        console.log("获取视频宽和屏幕比：" + docB)
                        // 计算视频最适高度
                        let realH = parseInt(video.videoHeight / docB);
                        this.realH = realH + 'px'
                        console.log("视频最适高度：" + this.realH)
                        this.$forceUpdate();
                    }, 200);
                }
                videoProcessInterval = setInterval(() => {
                    this.changeProcess(video)
                }, 100)
            },

            pauseVideo() { //暂停\播放
                try {
                    let video = document.querySelectorAll('video')[this.current];
                    console.log("pauseVideo" + this.current);
                    if (this.playOrPause) {
                        video.pause();
                        this.iconPlayShow = true;
                        clearInterval(videoProcessInterval)
                    } else {
                        // wx.ready(() => {
                        //     // 在微信的ready中进行播放 不管成功配置与否 都会执行ready
                        //     video.play();
                        // })
                        video.play();
                        video.pause();
                        setTimeout(() => {
                            video.play();
                            this.iconPlayShow = false;
                            videoProcessInterval = setInterval(() => {
                                this.changeProcess(video)
                            }, 100)
                        }, 100)
                    }
                    this.playOrPause = !this.playOrPause;
                    this.showShareBox = false;
                } catch (e) {
                    alert(e)
                }


            },
            //记录播放进度
            changeProcess() {
                let video = document.querySelectorAll('video')[this.current];
                let currentTime = video.currentTime.toFixed(1);
                let duration = video.duration.toFixed(1);
                this.videoProcess = parseInt((currentTime / duration).toFixed(2) * 100)
            },

            onPlayerEnded(player) { //视频结束
                this.isVideoShow = true
                this.current += this.current
            },

            //复制当前链接
            copyUrl() {
                let httpUrl = window.location.href;
                var oInput = document.createElement('input');
                oInput.value = httpUrl;
                document.body.appendChild(oInput);
                oInput.select(); // 选择对象
                document.execCommand("Copy"); // 执行浏览器复制命令
                oInput.className = 'oInput';
                oInput.style.display = 'none';
                alert("链接复制成功")
            }
        },
        
        beforeDestroy() {
            window.removeEventListener('resize', this.chartResize);
            window.removeEventListener('WeixinJSBridgeReady', this.iosVideoPlay);
            window.clearInterval(videoProcessInterval);
            
        },
    }
</script>
<style scoped lang="scss" rel="stylesheet/scss">
   @function pxTorem($px, $base-font-size: 75px) {
	    @if (unitless($px)) {
	        @warn "Assuming #{$px} to be in pixels, attempting to convert it into pixels for you";
	        @return px2em($px + 0px); // That may fail.
	    } @else if (unit($px) == em) {
	        @return $px;
	    }
	    @return ($px / $base-font-size) * 1rem;
	}
    .content-tab {
        position: fixed;
        top: pxTorem(66px);
        z-index: 2000;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: PingFang SC;
        color: #FFFFFF;
        .video_back_icon {
            position: absolute;
            left: pxTorem(40px);
            width: pxTorem(18px);
            height: pxTorem(32px);
        }
        div {
            display: flex;
        }
        .content-tab-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-size: pxTorem(32px);
            margin: 0 pxTorem(30px);
        }
        .solid-item {
            width: pxTorem(54px);
            height: pxTorem(6px);
            border-radius: pxTorem(3px);
            margin-top: pxTorem(12px);
            display: none;
        }
        
    }
    .active {
        span:nth-child(1) {
            font-size:pxTorem(40px)!important;
            font-weight: 550!important;
            transition:background-color .4s;
            transition: font-size .1s;
        }
        span:nth-child(2) {
            display: block;
            background: #FCF24F;
            transition:background-color .4s;
         }   
        }
    .clear {
        clear: both;
    }

    .back_i {
        position: fixed;
        top: 20px;
        left: 10px;
        width: 28px;
        z-index: 10;
    }


    .video-player {
        height: 100vh;
        width: 100vw;
    }

    .product_swiper {
        width: 100%;
        transform: translateY(0px);
        background: #000000;
       
    }

    .van_swipe {
        width: 100%;
        height: 100%;
        // max-width: 550px;
        margin: 0 auto;
        position: relative;
    }

    .van-swipe {
        width: 100%;
        height: 100%;
    }
    .container_box {
        width: 100%;
        height: 100%;
        background: #000;
    }

    .video_box {
        height: 100%;
        width: 100%;
        -o-object-fit: contain;
        object-fit: contain;
        -o-object-position: center;
        object-position: center;
        // min-height: 100%;
    }

    video {
        object-position: 0 0;
    }

    .video_container {
        position: relative;
        width: 100%;
        height: 100%;
    }

    .icon_play {
        position: absolute;
        top: 44%;
        right: 0;
        left: 0;
        bottom: auto;
        margin: auto;
        z-index: 999;
        height: pxTorem(74px);
        width: pxTorem(76px);
    }

    .play,
    .platStart {
        position: absolute;
        margin: auto;
        top: 0;
        left: 0;
        z-index: 999;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    /*头像， 点赞，转发 */
    .tag_image {
        width: pxTorem(100px);
        height: pxTorem(100px);
        box-sizing: border-box;
        border-radius: 50%;
        margin-bottom: pxTorem(20px);
        position: relative;
        background: #FFFFFF;
        border: pxTorem(3px) solid #A0A0A0;
        box-shadow: 0px 0px pxTorem(3px) 0px rgba(136, 139, 149, 0.43);
    }

    .tag_add {
        position: absolute;
        bottom: 6px;
        left: 0;
        right: 0;
        border-radius: 67px;
        display: inline-block;
        width: 18px;
        height: 18px;
        line-height: 18px;
        margin: 0 auto;
        z-index: 1;
        font-size: 20px;
        color: #f44;
        background: #fff;
    }

    .tag_dui {
        position: absolute;
        bottom: 6px;
        left: 0;
        right: 0;
        border-radius: 67px;
        display: inline-block;
        width: 20px;
        height: 20px;
        line-height: 20px;
        margin: 0 auto;
        z-index: 1;
        font-size: 11px;
        color: #f44;
        background: #fff;
    }

    .tag_dui_active {
        opacity: 0;
        animation: showFollow 1.4s ease-in-out 0s;
    }

    .tag_add_num {
        position: absolute;
        bottom: 0px;
        left: 0;
        right: 0;
    }

    @keyframes showFollow {
        0% {
            opacity: 1;
            color: #fff;
            background: #F44;
            transform: rotate(-180deg) scale(1);
        }
        35% {
            opacity: 1;
            color: #f44;
            background: #fff;
            transform: rotate(0deg) scale(1.2);
        }
        80% {
            opacity: 1;
            color: #f44;
            transform: scale(1.2);
        }
        100% {
            opacity: 0;
            display: none;
            color: #f44;
            transform: scale(0);
        }
    }

    .tools_right {
        z-index: 1001;
        position: absolute;
        right: pxTorem(20px);
        bottom: pxTorem(118px);
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .tools_r_li {
        margin-bottom: pxTorem(36px);
        color: #fff;
        font-size: pxTorem(24px);
        position: relative;
    }

    .tools_r_li:last-child {
        margin-bottom: 0px;
    }

    .icon_right {
        margin-bottom: 5px;
        font-size: pxTorem(68px);
        display: block;
        text-shadow: 0px 0px 10px #9d9d9d;
    }
    .img-icon {
        width: pxTorem(64px);
        height: pxTorem(68px);
    }

    .production_box {
        z-index: 1001;
        position: absolute;
        bottom: 0px;
        text-align: left;
        padding: 0 pxTorem(40px) 15px pxTorem(40px);
        color: #fff;
        max-width:  pxTorem(484px);
        left: 0;
        box-sizing: border-box;
    }
    
       .vote_box {
        margin:  pxTorem(20px) 0 pxTorem(80px);
        p {
            font-size: pxTorem(24px);
            font-family: PingFang SC;
            font-weight: 500;
            color: #E6E6E6;
            line-height: pxTorem(48px);
            margin: 0;
        }
        span {
            display: inline-block;
            width: pxTorem(270px);
            height: pxTorem(80px);
            line-height: pxTorem(80px);
            text-indent: pxTorem(60px);;
            font-size: pxTorem(28px);
            font-family: PingFang SC;
            font-weight: 550;
            color: #FFFFFF;
            text-shadow: 0px 0px pxTorem(3px) rgba(140, 19, 19, 0.66);
            background: url(http://img.bomaleye.com/20210309151110270_7280) no-repeat center center;
            background-size: cover;
        }
        .active {
            background: url(http://img.bomaleye.com/20210309151216849_1043) no-repeat center center;
            background-size: cover;
        }
    }

    .production_name {
        font-weight: 550;
        font-size:  pxTorem(32px);
        font-family: PingFang SC;
        margin-bottom: 10px;
    }

    .production_des {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        max-width: pxTorem(484px);
        font-size: pxTorem(30px);
    }

    .container_bottom {
        position: fixed;
        bottom: 0;
        width: 100%;
        height: pxTorem(68px);
        max-width: 550px;
    }

    .production_top {
        display: inline-block;
        padding: 6px;
        margin-bottom: 5px;
        background: rgba(0, 0, 0, .3);
        border-radius: 6px;
        margin-top: 5px;
    }

    .product_go {
        color: #fbdd21;
    }

    .production_title {
        margin-left: 4px;
    }

    .border_progress {
        width: 0;
        height: 1px;
        background: #ffffff;
        position: absolute;
        top: 0;
        transition: .1s all;
    }


    .icon-shoucang {
        transition: .5s all;
    }

    .icondianzan-copy {
        width: pxTorem(28px);
        height: pxTorem(28px);
    }   

    .fabulous_active {
        color: #f44;
        animation: showHeart .5s ease-in-out 0s;
    }
    .tools_r_num {
        text-align: center;
    }

    /*animation-name：用来调用@keyframes定义好的动画，与@keyframes定义的动画名称一致*/
    /*animation-duration ：指定元素播放动画所持续的时间*/
    /*animatino-timing-function ： 和transition中的transition-timing-function 中的值一样。根据上面@keframes中分析的animation中可能存在多个小动画，因此这里的值设置是针对每一个小动画所在时间范围内的属性变换速率。*/
    /*animation-delay：定义在浏览器开始执行动画之前等待的时间，这里是指整个animation执行之前的等待时间，而不是上面说的多个小动画*/
    /*animation-iteration-count：定义动画的播放次数，其通常为整数，默认是1,；取值为infinite，动画将无限次的播放。*/
    /*animation-direction：主要用来设置动画播放方向*/
    @keyframes showHeart {
        0% {
            color: #f44;
            transform: scale(1);
        }

        25% {
            color: #fff;
            transform: scale(0);
        }

        80% {
            color: #f44;
            transform: scale(1.2);
        }

        100% {
            color: #f44;
            transform: scale(1);
        }
    }

    /*分享样式*/
    .share_hover {
        position: fixed;
        display: none;

    }

    .share_box {
        position: fixed;
        bottom: -300px;
        width: 100%;
        z-index: 1002;
        background: #fff;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        transition: .5s;
    }

    .share_tips {
        text-align: center;
        line-height: 38px;
        color: #333;
    }

    .share_ul {
        box-sizing: border-box;
        padding: 0 25px 25px;
        border-bottom: 1px solid #e8e8e8;
    }

    .share_li {
        float: left;
        width: 33%;
        text-align: center;
    }

    .share_li i {
        font-size: 44px;
    }

    .share_cancel {
        text-align: center;
        line-height: 48px;
        color: #777;
        text-align: center;
    }

    .pengyouquan {
        color: #47D000;

    }

    .pengyouquan_li {
        animation: rotating 8s linear infinite
    }

    @keyframes rotating {
        from {
            transform: rotate(0)
        }

        to {
            transform: rotate(360deg)
        }
    }

    .weixin {
        color: #20CA2E;
    }

    .lianjie {
        color: #cdcdcd;
    }

    .share_active {
        bottom: 0px;
    }

    /*评论样式*/
    ::-webkit-input-placeholder {
        color: rgba(0, 0, 0, 0.20);
    }

    :-moz-placeholder {
        color: rgba(0, 0, 0, 0.20);;
    }

    ::-moz-placeholder {
        color: rgba(0, 0, 0, 0.20);
    }

    :-ms-input-placeholder {
        color: rgba(0, 0, 0, 0.20);
    }

    .comment_container {
        width: 100%;
        position: absolute;
        bottom: 0;
        background: #ffffff;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
    }

    .comment_box {
        padding: 0 15px 52px 15px;
        .solid-item {
            width: 100%;
            border:pxTorem(1px) dotted #999999;
            margin: pxTorem(60px) 0;
        }
    }

    .comment_top {
        text-align: center;
        font-size: pxTorem(28px);
        font-family: PingFang SC;
        font-weight: 550;
        color: #000011;
        margin: pxTorem(24px) 0;
    }
    .open_child_comment {
        width: 100%;
        justify-content: center;
        text-align: center;
        font-size: pxTorem(24px);
        font-family: PingFang SC;
        font-weight: 500;
        color: #999999;
        line-height: pxTorem(40px);
        img {
            width: pxTorem(18px);
            height: pxTorem(12px);
            margin-left:pxTorem(12px);
        }
    }
    
    
    .guanbi3 {
        float: right;
        font-size: 12px;
        padding: 0 10px;
        position: absolute;
        right: 6px;
    }

    .comment_title {
        img {
            width: pxTorem(74px);
            height: pxTorem(74px);
            border-radius: 60%;
            margin-right: pxTorem(20px);
        }
        span {
            font-size: pxTorem(28px);
            font-family: PingFang SC;
            font-weight: 550;
            color: #111111;
        }
        div {
            display: flex;
            align-items: center;
        }
        .comment_videoDesc {
            font-size: pxTorem(28px);
            font-family: PingFang SC;
            font-weight: 500;
            color: #111111;
            line-height: pxTorem(40px);
            margin: pxTorem(36px) 0 pxTorem(30px);
        }
    }

    .comment_ul_title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin:0 0 pxTorem(48px);
        .ul_title_left {
            display: flex;
            align-items: center;
            span:nth-child(1) {
                font-size: pxTorem(28px);
                font-family: PingFang SC;
                font-weight: 550;
                color: #111111;
                margin-right: pxTorem(14px);
            }
            span:nth-child(2) {
                font-size: pxTorem(28px);
                font-family: PingFang SC;
                font-weight: 500;
                color: #999999;
            }
        }
        .ul_title_right {
            display: flex;
            align-items: center;
            span {
                 font-size: pxTorem(26px);
                font-family: PingFang SC;
                color: #808080;
            }
           .active {
              color: #EA4242;
           }
        }
    }

    .comment_li {
        margin-bottom: pxTorem(48px);
        font-size: 14px;
        text-align: left;
    }

    .comment_author_left {
        float: left;
        
    }

    .comment_author_left img {
        width: 35px;
        height: 35px;
        border-radius: 50%;
    }

    .comment_author_right {
        margin-left: 46px;
    }

    .comment_author_top {
        position: relative;
    }

    .comment_author_name {
        height: pxTorem(74px);
        font-size: pxTorem(28px);
        margin-bottom: 6px;
        font-family: PingFang SC;
        font-weight: 550;
        color: #111111;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        span:nth-child(2) {
            font-size: pxTorem(24px);
            font-family: PingFang SC;
            font-weight: 500;
            color: #999999;
        }
    }

    .clear {
        font-size: pxTorem(24px);
        font-family: PingFang SC;
        font-weight: 500;
        color: #999999;
        margin-left: pxTorem(76px);
         span:nth-child(2) {
            color: #EA4242!important;
            margin-left: pxTorem(20px);
        }
    }

    .icon-shoucang1_box {
        position: absolute;
        right: 0px;
        top: 0;
        text-align: center;
        color: #777;
        display: flex;
        align-items: center;
    }

    .comment_author_text {
        color: #111111;
        margin-bottom: 10px;
        padding-right: 35px;
        font-size: pxTorem(28px);
        span:nth-child(2) {
            color: #EA4242!important;;
            margin-left: pxTorem(20px);
        }
    }

    .comment_replay_box {
        padding-left: 46px;
        box-sizing: border-box;
        padding-top: pxTorem(42px);
    }

    .comment_replay_li {
        margin-bottom: 10px;
    }

    .comment_replay_left {
        float: left;
    }

    .comment_replay_left img {
        width: 25px;
        height: 25px;
        border-radius: 50%;
    }

    .comment_replay_right {
        margin-left: 35px;
        padding-top: 2px;
    }

    .comment_replay_top {
        position: relative;
        margin-bottom: 6px;
    }

    .comment_replay_text {
        padding-right: 35px;
        margin-bottom: 10px;
        color: #666666;
    }

    .comment_author_text span {
        color: #111111;
        font-size: pxTorem(28px);
    }

     .comment_replay_text span {
        color: #666666;
        font-size: pxTorem(26px);
        margin-left: 6px;
    }

    .shoucang1_num {
        text-align: center;
        position: relative;
        font-size: pxTorem(24px);
        font-family: PingFang SC;
        font-weight: 500;
        color: #999999;
        margin-right: pxTorem(14px);;
    }

    .no_message {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
    }
    .comment_ul {
        height: 400px;
        overflow-y: auto;
        overflow-x: hidden;
        padding-top: pxTorem(44px);
    }

    .comment_input_box {
        position: fixed;
        bottom: 0;
        z-index: 2999;
        width: 100%;
        border-top: 1px solid #e8e8e8;
        background: #fff;
        padding: 10px 15px;
        box-sizing: border-box;
    }

    /*.comment_form {*/
    /**/
    /*}*/

    .comment_input {
        border: none;
        resize: none;
        width: 80%;
        float: left;
        color: #555;
        caret-color: #f44;
        line-height: .44rem;
    }

    .comment_input_right {
        float: right;
    }

    .comment_i {
        font-size: 22px;
        color: #999;
        transition: .3s;
    }

    .comment_i_active {
        color: #f44;
    }

    .icon-zanwupinglun {
        font-size: 100px;
        color: #777;
    }

    .v-enter,
    .v-leave-to {
        opacity: 0;
        transform: translateY(80px);
    }

    .v-enter-active,
    .v-leave-active {
        transition: all .5s ease;
    }

    /*添加进场效果*/
    .v-move {
        transition: all 1s ease;
    }

    .v-leave-active {
        position: absolute;
    }

    .list-complete-item {
        transition: all 1s;
        display: inline-block;
        margin-right: 10px;
    }

    .list-complete-enter, .list-complete-leave-to {
        opacity: 0;
        transform: translateY(30px);
    }

    .list-complete-leave-active {
        position: absolute;
    }

    .love_active {
        color: #f44;
    }
    .envelopes-box {
        width: pxTorem(610px);
        height: pxTorem(656px);
        background: url(http://img.bomaleye.com/20210303104720921_3273) no-repeat center center;
        background-size: 101% 101%;
        position: relative;
        display: flex;
        align-items: center;
        flex-direction: column;
        .envelopes-title {
            font-size: pxTorem(32px);
            font-family: PingFang SC;
            font-weight: 550;
            color: #FFFFFF;
            position: absolute;
            top: pxTorem(70px);

        }
        .envelopes-num {
            margin-top:pxTorem(218px);
            span {
                font-size: pxTorem(24px);
                color: rgba(173, 41, 33, 1);
            }
            span:nth-child(1) {
                font-size: pxTorem(48px);
                color: rgba(173, 41, 33, 1);
            }
        }
        .envelopes-tip {
            max-width: pxTorem(400px);
            font-size: pxTorem(24px);
            font-family: PingFang SC;
            font-weight: 500;
            color: #333333;
            line-height: pxTorem(32px);
            margin: pxTorem(50px) 0 pxTorem(70px);
        }
        .envelopes-download-btn {
            width: pxTorem(406px);
            height: pxTorem(126px);
            background: url(http://img.bomaleye.com/20210303104753465_6461) no-repeat center center;
            background-size: 100% 100%;
        }
        .envelopes-app-btn {
            font-size: pxTorem(24px);
            font-family: PingFang SC;
            font-weight: 500;
            color: #AD2921;
            line-height: pxTorem(32px);
        }

        // 礼物
       
    }
</style>

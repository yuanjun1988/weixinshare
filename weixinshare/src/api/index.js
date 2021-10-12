import request from './public';
import tools from '../common/tools';
//获取基础设置 
//用户注册
export const userRegsiter = (params) => {
    return request.sendAxios(params,'/api-user/users/register','post')
}
//短信验证码登录
export const phoneCodeLogin = (params) => {
    return request.sendAxios('','/api-auth/authentication/sms?' + tools.objToString(params),'Post',1)
}
// export const getPhoneCode = (params) => {
//     return request.sendAxios(params,'/usercontroller/sendCode','Post')
// }
//获取验证码
export const getPhoneCode = (params) => {
    return request.sendAxios('','/api-sms/sms-internal/codes?' + tools.objToString(params),'Get')
}
//用户登录
export const userLogin = (params) => {
    return request.sendAxios('','/api-auth/oauth/user/token?' + tools.objToString(params),'Post')
}
//获取简历详情
export const userInfo = (params) => {
    return request.sendAxios('','/jbh/resumes/resume-userinfo?' + tools.objToString(params),'Get')
}

//获取企业主页信息
export const getCompanyInfo = (params) => {
    return request.sendAxios('','/ent/companies/index?' + tools.objToString(params),'Get')
}

//获取零工职位详情
export const getCompanypartjob = (params) => {
    return request.sendAxios('','/fjr/companypartjob/findById?' + tools.objToString(params),'Get')
}

// 获取全职职位详情
export const getPositionFullInfo = (params) => {
    return request.sendAxios('','/rec/companyjobs/findById?' + tools.objToString(params),'Get')
}
//获取微信分享参数
export const getWxSignature = (params) => {
    return request.sendAxios(params,'/wecs/info/generateSignature','Post')
}
// 获取优惠券使用次数
export const getCouponCount = (params) => {
    return request.sendAxios(params,'/sys/member/memberCoupon/getCount','Get')
}

//planx活动接口
//planx-获取团队列表
export const getTeamList = (params) => {
    return request.sendAxios(params,'/act/team/listTeam?' + tools.objToString(params),'Get')
}
//planx-获取团队列表
export const createTeam = (params) => {
    return request.sendAxios(params,'/act/team/createTeam?' + tools.objToString(params),'Post')
}
//planx-加入团队
export const joinTeam = (params) => {
    return request.sendAxios(params,'/act/team/joinTeam/' + params.id + '/'+ params.password, 'Put')
}
//planx-校友认证
export const setIdentification = (params) => {
    return request.sendAxios(params,'/act/actUser/schoolIdentify?' + tools.objToString(params),'Post')
}

//planx-查询用户参加活动状态
export const getUserStatus = () => {
  return request.sendAxios({},'/act/actUser/getUserStatus','Get')
}
//团队空间
export const getTeamSpace = (params) => {
  return request.sendAxios(params,'/act/space/getTeamSpace?' + tools.objToString(params),'Get')
}

//个人空间
export const getPersonalSpace = (params) => {
  return request.sendAxios(params,'/act/space/getPersonalSpace?' + tools.objToString(params),'Get')
}

//获取钱包信息
export const getWallet = (params) => {
  return request.sendAxios(params,'/act/redPacket/getWallet?' + tools.objToString(params),'Get')
}

//设置红包
export const saveRedPacket = (params) => {
  return request.sendAxios(params,'/act/redPacket/saveRedPacket?' + tools.objToString(params),'Post')
}

//获取空间视频列表
export const getVideoSpaceList = (params) => {
  return request.sendAxios(params,'/act/actVideo/videoSpaceList?' + tools.objToString(params),'Get')
}

//获取活动分类
export const getVideoType = (params) => {
  return request.sendAxios(params,'/dct/industry/listTouristVideoType?type=1' + tools.objToString(params),'Get')
}

//保存视频
export const saveVideo = (params) => {
  return request.sendAxios(params,'/act/actVideo/saveVideo?' + tools.objToString(params),'Post')
}

//删除视频
export const delVideo = (params) => {
  return request.sendAxios(params,'/act/actVideo/delVideo?' + tools.objToString(params),'Delete')
}

//简历保存个人信息
export const saveUserInfo = (params) => {
  return request.sendAxios(params,'/act/actUser/saveUserInfo?' + tools.objToString(params),'Post')
}

//关注
export const actFocus = (params) => {
  return request.sendAxios(params,'/act/actFocus/actFocus?' + tools.objToString(params),'Post')
}

//获取字典数据
export const bigdatadic = (params) => {
  return request.sendAxios(params,'/dct/bigdatadic?' + tools.objToString(params),'Get')
}

//planx-查询用户参加活动视频列表
export const getAllActVideoList = (params) => {
    return request.sendAxios(params,'/act/actVideo/pageList?' + tools.objToString(params),'Get')
}
//planx-搜索视频
export const searchVideo = (params) => {
    return request.sendAxios(params,'/act/actVideo/search?' + tools.objToString(params),'Get')
}
//planx-新增/取消关注
export const setActFocus = (params) => {
    return request.sendAxios(params,'/act/actFocus/actFocus?' + tools.objToString(params),'Post')
}
//planx-分享回调
export const setActShareStatus = (params) => {
    return request.sendAxios(params,'/act/actShare/share?' + tools.objToString(params),'Get')
}

//planx-点赞操作
export const setLikedHandle = (params) => {
    return request.sendAxios(params,'/act/actLiked/likedHandle?' + tools.objToString(params),'Post')
}

//planx-投票
export const setVoteHandle = (params) => {
    return request.sendAxios(params,'/act/voteRecord/vote?' + tools.objToString(params),'Post')
}

//planx-领取红包
export const getRedPacket = (params) => {
    return request.sendAxios(params,'/act/redPacket/getRedPacket?' + tools.objToString(params),'Get')
}
//planx-获取视频评论列表
export const getPageCommentList = (params) => {
    return request.sendAxios(params,'/video/comment/pageComment?' + tools.objToString(params),'Get')
}
//planx-获取视频详情
export const getVideoDetail = (params) => {
    return request.sendAxios(params,'/act/actVideo/getById/'+ params.id + '/' + params.userType,'Get')
}

//planx-视频评论
export const createComments = (params) => {
    return request.sendAxios(params,'/video/comment/create?' + tools.objToString(params),'Post')
}

//planx-删除视频评论
export const deleteComments = (params) => {
    return request.sendAxios(params,'/video/comment/delete?' + tools.objToString(params),'Delete')
}
//planx-使用token获取userId
export const getUserId = (params) => {
    return request.sendAxios(params,'/api-auth/oauth/userinfo','Get')
}
//planx-点赞取消视频评论
export const setCommentsLike = (params) => {
    return request.sendAxios(params,'/video/comment/like?' + tools.objToString(params),'Post')
}
//planx-查询礼物列表
export const getParentsList = (params) => {
    return request.sendAxios(params,'/marketing/listAll?' + tools.objToString(params),'Get')
}
//planx-赠送礼物
export const sendParsent = (params) => {
    return request.sendAxios(params,'/marketing/send?' + tools.objToString(params),'Post')
}
//planx-获取openid
export const getUserOpenId = (params) => {
    return request.sendAxios(params,'/pay/wxInfo/accessToken?' + tools.objToString(params),'Post')
}
//planx-充值
export const rechargeWallet = (params) => {
    return request.sendAxios(params,'/pay/wallet/payOrder/recharge?' + tools.objToString(params),'Post')
}
//planx--获取套餐列表
export const getPackageList = (params) => {
    return request.sendAxios(params, '/pay/wallet/package/list?packageType=' + params.packageType, 'Get')
  }
//planx-修改指导老师
export const updateTeacher = (params) => {
  return request.sendAxios(params,'/act/actUser/updateTeacher?' + tools.objToString(params),'Post')
}
//planx-查询订单
export const getRechargeResult = (params) => {
    return request.sendAxios(params, '/pay/wallet/payOrder/queryByOrderNo?' + tools.objToString(params), 'Get')
  }
//planx-由未选择身份变为选择个人身份
export const selectPersonalIdentify = (params) => {
  return request.sendAxios(params, '/act/actUser/selectPersonalIdentify?' + tools.objToString(params), 'Get')
}
//获取排行榜
export const getLeaderboard = (params) => {
  return request.sendAxios(params, '/act/leaderboard/getLeaderboard?' + tools.objToString(params), 'Get')
}














































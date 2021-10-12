// 定义配置路由
export default [
  {
    path: "/planxHome",
    name: "planxHome",
    component: resolve => require(["@/page/planx/home"], resolve),
    meta: {
      title: "伯马乐业",
      requireAuth: false,
      keepAlive:false
    }
  },
  {
    path: "/planxContestIntroduction",
    name: "planxContestIntroduction",
    component: resolve =>
      require(["@/page/planx/contestIntroduction"], resolve),
    meta: {
      title: "大赛简介",
      requireAuth: true,
      keepAlive:false
    }
  },
  {
    path: "/planxContestRules",
    name: "planxContestRules",
    component: resolve => require(["@/page/planx/contestRules"], resolve),
    meta: {
      title: "大赛规则",
      keepAlive:false,
      requireAuth: false
    }
  },
  {
    path: "/planxJury",
    name: "planxJury",
    component: resolve => require(["@/page/planx/jury"], resolve),
    meta: {
      title: "评审团",
      keepAlive:false,
      requireAuth: false
    }
  },
  {
    path: "/planxSelectJoinType",
    name: "planxSelectJoinType",
    component: resolve => require(["@/page/planx/selectJoinType"], resolve),
    meta: {
      title: "选择参赛方式",
      requireAuth: true,
      keepAlive:false,
    }
  },
  {
    path: "/planxPublish",
    name: "planxPublish",
    component: resolve => require(["@/page/planx/publish"], resolve),
    meta: {
      title: "发布",
      requireAuth: true,
      keepAlive:false,
    }
  },
  {
    path: "/planxSpace/:type/:spaceId",
    name: "planxSpace",
    component: resolve => require(["@/page/planx/space"], resolve),
    meta: {
      title: "空间",
      requireAuth: true,
      keepAlive:false,
    }
  },
  {
    path: "/perfectResume",
    name: "perfectResume",
    component: resolve => require(["@/page/planx/perfectResume"], resolve),
    meta: {
      title: "完善简历",
      requireAuth: true,
      keepAlive:false,
    }
  },
  {
    path: '/teamList/:type',    // 0待定身份  1:个人身份  2:团队身份
    name: 'teamList',
    component: resolve => require(['@/page/planx/team-list'], resolve),
    meta: {
      title: '伯马乐业',
      requireAuth: true,
      keepAlive:false,
    }
  },
  {
    path: '/actLogin',
    name: 'actLogin',
    component: resolve => require(['@/page/planx/login'], resolve),
    meta: {
      title: "伯马乐业",
      requireAuth: false,
      keepAlive:false
    }
  },
  {
    path: '/alumnaIdentification/:type',
    name: 'alumnaIdentification',
    component: resolve => require(['@/page/planx/alumna-identification'], resolve),
    meta: {
      title: "伯马乐业",
      requireAuth: true,
      keepAlive:false
    }
  },
  {
    path: '/activityCenter',
    name: 'activityCenter',
    component: resolve => require(['@/page/planx/activity-center'], resolve),
    meta: {
      title: "伯马乐业",
      requireAuth: true,
      keepAlive:true
    }
  },
  {
    path: '/videoVreview/:videoType/:index/:currentPage',
    name: 'videoVreview',
    component: resolve => require(['@/page/planx/video-preview'], resolve),
    meta: {
      title: "伯马乐业",
      requireAuth: false,
      keepAlive: true
    }
  },
  {
    path: '/contributionList',
    name: 'contributionList',
    component: resolve => require(['@/page/planx/contribution-list'], resolve),
    meta: {
      title: "伯马乐业",
      requireAuth: true,
      keepAlive:false
    }
  },
  {
    path: '/selfvideoPreview/:type/:index',
    name: 'selfvideoPreview',
    component: resolve => require(['@/page/planx/selfvideo-preview'], resolve),
    meta: {
      title: "伯马乐业",
      requireAuth: false,
      keepAlive:false
    }
  },
  {
    path: '/wxPay',
    name: 'wxPay',
    component: resolve => require(['@/page/planx/wx-pay'], resolve),
    meta: {
      title: "伯马乐业",
      requireAuth: true,
      keepAlive:false
    }
  },
  {
    path: '/rechargeAgreement',
    name: 'rechargeAgreement',
    component: resolve => require(['@/page/planx/recharge-agreement'], resolve),
    meta: {
      title: "伯马乐业",
      requireAuth: false,
      keepAlive:false
    }
  },
  {
    path: '/walletResult',
    name: 'walletResult',
    component: resolve => require(['@/page/planx/wallet-result'], resolve),
    meta: {
      title: "伯马乐业",
      requireAuth: false,
      keepAlive:false
    }
  },
  {
    path: '/awordRule',
    name: 'aword-rule',
    component: resolve => require(['@/page/planx/aword-rule'], resolve),
    meta: {
      title: "伯马乐业",
      requireAuth: false,
      keepAlive:false
    }
  },
{
    path: '/uploadVideos',
    name: 'upload-videos',
    component: resolve => require(['@/page/teacher/upload-videos'], resolve),
    meta: {
      title: "伯马乐业",
      requireAuth: false,
      keepAlive:true
    }
  },
  {
    path: '/teacherPublish/:videoUrl/:videoSort',
    name: 'teacher-publish',
    component: resolve => require(['@/page/teacher/publish'], resolve),
    meta: {
      title: "伯马乐业",
      requireAuth: false,
      keepAlive:false
    }
	},
 {
    path: '/signUp',
    name: 'signUp',
    component: resolve => require(['@/page/teacher/sign-up'], resolve),
    meta: {
      title: "伯马乐业",
      requireAuth: false,
      keepAlive:false
    }
  },
  {
    path: '/attestation',
    name: 'attestation',
    component: resolve => require(['@/page/teacher/attestation'], resolve),
    meta: {
      title: "伯马乐业",
      requireAuth: false,
      keepAlive:false
    }
  },
  {
    path: '/actOpus',
    name: 'actOpus',
    component: resolve => require(['@/page/teacher/act-opus'], resolve),
    meta: {
      title: "伯马乐业",
      requireAuth: false,
      keepAlive:false
    }
  },
  {
    path: '/actShare',
    name: 'actShare',
    component: resolve => require(['@/page/teacher/act-share'], resolve),
    meta: {
      title: "伯马乐业",
      requireAuth: false,
      keepAlive:false
    }
  },
  {
    path: '/incomeDetail',
    name: 'incomeDetail',
    component: resolve => require(['@/page/teacher/income-detail'], resolve),
    meta: {
      title: "伯马乐业",
      requireAuth: false,
      keepAlive:false
    }
  },
  {
    path: '/applicationResult/:gameStartTime/:videoId/:userName',
    name: 'applicationResult',
    component: resolve => require(['@/page/teacher/application-result'], resolve),
    meta: {
      title: "伯马乐业",
      requireAuth: false,
      keepAlive:false
    }
  },
  {
    path: '/actHomepage',
    name: 'actHomepage',
    component: resolve => require(['@/page/teacher/act-homepage'], resolve),
    meta: {
      title: "伯马乐业",
      requireAuth: false,
      keepAlive:false
    }
  },
  {
    path: '/teacherShare/:shareVideoId',
    name: 'teacher-share',
    component: resolve => require(['@/page/teacher/share'], resolve),
    meta: {
      title: "伯马乐业",
      requireAuth: false,
      keepAlive:false
    }
  },
  {
    path: '/teacherShareRule/:shareVideoId',
    name: 'share-rule',
    component: resolve => require(['@/page/teacher/share-rule'], resolve),
    meta: {
      title: "伯马乐业",
      requireAuth: false,
      keepAlive:false
    }
  },
  {
    path: '/downloadTip',
    name: 'downloadTip',
    component: resolve => require(['@/page/teacher/download-tip'], resolve),
    meta: {
      title: "伯马乐业",
      requireAuth: false,
      keepAlive:false
    }
  },
  {
    path: '/selfPage',
    name: 'selfPage',
    component: resolve => require(['@/page/teacher/self-page'], resolve),
    meta: {
      title: "伯马乐业",
      requireAuth: false,
      keepAlive:false
    }
  },
  {
    path: '/actVideoPreview/:index',
    name: 'actVideoPreview',
    component: resolve => require(['@/page/teacher/video-preview'], resolve),
    meta: {
      title: "伯马乐业",
      requireAuth: false,
      keepAlive:false
    }
  },
  {
    path: '/sharePreview',
    name: 'sharePreview',
    component: resolve => require(['@/page/teacher/share-preview'], resolve),
    meta: {
      title: "伯马乐业",
      requireAuth: false,
      keepAlive:false
    }
  },
  {
    path: '/actContest',
    name: 'actContest',
    component: resolve => require(['@/page/teacher/act-contest'], resolve),
    meta: {
      title: "伯马乐业",
      requireAuth: false,
      keepAlive:false
    }
  },
  {
    path: '/actRule',
    name: 'actRule',
    component: resolve => require(['@/page/teacher/act-rule'], resolve),
    meta: {
      title: "伯马乐业",
      requireAuth: false,
      keepAlive:false
    }
  },
  {
    path: '/actAlarmSetting',
    name: 'actAlarmSetting',
    component: resolve => require(['@/page/teacher/act-alarm-setting'], resolve),
    meta: {
      title: "伯马乐业",
      requireAuth: false,
      keepAlive:false
    }
  },
  {
    path: '/shareH5Rule/:shareVideoId',
    name: 'shareH5Rule',
    component: resolve => require(['@/page/teacher/share-h5-rule'], resolve),
    meta: {
      title: "伯马乐业",
      requireAuth: false,
      keepAlive:false
    }
  },
  {
    path: '/rankingList',
    name: 'rankingList',
    component: resolve => require(['@/page/teacher/ranking-list'], resolve),
    meta: {
      title: "伯马乐业",
      requireAuth: false,
      keepAlive:false
    }
  },
	{
	    path: '/actJury',
	    name: 'actJury',
	    component: resolve => require(['@/page/teacher/act-jury'], resolve),
	    meta: {
	      title: "伯马乐业",
	      requireAuth: false,
	      keepAlive:false
	    }
	  },
	 {
	    path: '/applicationSuccess/:sharerUserId/:playerUserId/:playerVideoId',
	    name: 'applicationSuccess',
	    component: resolve => require(['@/page/teacher/application-success'], resolve),
	    meta: {
	      title: "伯马乐业",
	      requireAuth: false,
	      keepAlive:false
	    }
	  },
    {
	    path: '/shareHomepage',
	    name: 'shareHomepage',
	    component: resolve => require(['@/page/teacher/share-homepage'], resolve),
	    meta: {
	      title: "伯马乐业",
	      requireAuth: false,
	      keepAlive:false
	    }
	  },
    {
	    path: '/voteDetail',
	    name: 'voteDetail',
	    component: resolve => require(['@/page/teacher/vote-detail'], resolve),
	    meta: {
	      title: "伯马乐业",
	      requireAuth: false,
	      keepAlive:false
	    }
	  },
];

// 定义配置路由
export default [
  {
    path: "*",
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
      requireAuth: false,
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
    path: '/sharePreivew',
    name: 'sharePreivew',
    component: resolve => require(['@/page/planx/share-preivew'], resolve),
    meta: {
      title: "伯马乐业",
      requireAuth: false,
      keepAlive: false
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
    path: '/downloadTip',
    name: 'downloadTip',
    component: resolve => require(['@/page/planx/download-tip'], resolve),
    meta: {
      title: "伯马乐业",
      requireAuth: false,
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
    path: '/awordRule',
    name: 'aword-rule',
    component: resolve => require(['@/page/planx/aword-rule'], resolve),
    meta: {
      title: "伯马乐业",
      requireAuth: false,
      keepAlive:false
    }
  },
];

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import routes from './router/index'
import {Area, Picker, Swipe, SwipeItem ,Toast, Popup, Overlay, Uploader, DatetimePicker, Radio, RadioGroup, Calendar, ActionSheet, Dialog, Image as VanImage, Stepper, Empty, Lazyload} from 'vant';
import VueClipboard from 'vue-clipboard2'
import Bridge from '../config/JSbridge.js'
import '../static/css/iconfont.css'
import 'vant/lib/index.css';
import tools from './common/tools'
import 'lib-flexible/flexible'
import * as qiniu from 'qiniu-js'
import infiniteScroll from 'vue-infinite-scroll'
Vue.use(infiniteScroll)
Vue.use(VueClipboard)
Vue.use(VueRouter)
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Popup);
Vue.use(Overlay);
Vue.use(Uploader);
Vue.use(DatetimePicker)
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Calendar);
Vue.use(VanImage);
Vue.use(ActionSheet);
Vue.use(Dialog);
Vue.use(Stepper);
Vue.use(Picker);
Vue.use(Area);
Vue.use(Empty);
Vue.use(Lazyload);
Vue.prototype.$bridge = Bridge
Vue.config.productionTip = false
Vue.config.ignoredElements = ["wx-open-launch-app"];
Vue.prototype.$loading = function () {
    Toast.loading({
            mask: true, //蒙层
            duration: 0,       // 持续展示 toast
            forbidClick: true, // 禁用背景点击
            loadingType: 'spinner',
            message: '加载中...',
        });
  }
//ios系统键盘回滚自定义指令
var isAndroid = navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1; //android终端
Vue.directive('resetInput', {
    // 当被绑定的元素插入到 DOM 中时……
    inserted: function (el) {
        if(isAndroid){
            return;
        }
        el.children[0].addEventListener('blur',function(){
            var input = document.getElementById('reset-input');
            if (!input) {
                input = document.createElement('INPUT');
                input.type = 'text';
                input.style.height = '0px'
                input.style.width = '0px'
                input.style.position = 'absolute'
                input.id = 'reset-input';
                document.body.prepend(input);
            }
            input.focus();
            input.blur();
        })
    }
})
Vue.prototype.videoposterFilter = function(orgurl) {
    let comurl = "http://video.bomaleye.com/" + orgurl + "?vframe/png/offset/0"
	  return comurl;
}

Vue.prototype.photoFilter = function(orgurl, width, height) {//图片裁剪
  let comurl = "http://img.bomaleye.com/"
	var url = '';
	if(orgurl) {
		if(height != 0 && width != 0) {
			url = orgurl + "?imageView2/1/w/" + width + "/h/" + height;
		} else if(width != 0 && height == 0) {
			url = orgurl + "?imageView2/2/w/" + width;
		} else if(width == 0 && height != 0) {
			url = orgurl + "?imageView2/2/h/" + height;
		}
	}

	return comurl + url;
}
//七牛云上传
Vue.prototype.uploadQiniu = function(e,type) {
  return new Promise((resolve, reject) => {
      let file = e;
      let token = 'Se-bQd1W2dYe7we2kqVr9LzIdefiN4A3hrrPsIB7:Qub1YqBSerhcHwUrR5z-qbHJ-xo=:eyJzY29wZSI6InhkdHgtcmVjcnVpdG1lbnQiLCJtaW1lTGltaXQiOiJpbWFnZS8qO3ZpZGVvLyoiLCJkZWFkbGluZSI6MTYyODM4NzgxN30='
      let token_1 = 'Se-bQd1W2dYe7we2kqVr9LzIdefiN4A3hrrPsIB7:Qub1YqBSerhcHwUrR5z-qbHJ-xo=:eyJzY29wZSI6InhkdHgtcmVjcnVpdG1lbnQiLCJtaW1lTGltaXQiOiJpbWFnZS8qO3ZpZGVvLyoiLCJkZWFkbGluZSI6MTYyODM4NzgxN30=';
      let token_2 = 'Se-bQd1W2dYe7we2kqVr9LzIdefiN4A3hrrPsIB7:H7_lnl7hd0r4F81PgXN4QrKZahs=:eyJzY29wZSI6InhkdHgtcmVjcnVpdG1lbnQtaW1hZ2UiLCJtaW1lTGltaXQiOiJpbWFnZS8qO3ZpZGVvLyoiLCJkZWFkbGluZSI6MTYyODM4Nzg0MH0='
      //1  视频 2 图片
      let putExtra = 'xdtx-recruitment';
      type == 1 ? putExtra = 'xdtx-recruitment' : putExtra = 'xdtx-recruitment-image'
      type == 1 ? token = token_1 : token = token_2
      let config = {
          useCdnDomain: true,
          region: qiniu.region.z0,
          insertOnly:1,
          mimeLimit:"image/*;video/*"
      }
      let key = tools.getNowFormatDate() + "_" + parseInt(Math.random()*10000) + file['name'];
      const observable = qiniu.upload(file, key, token, putExtra, config)
      observable.subscribe((res)=>{
      },(error)=>{
          this.$toast.clear();
          reject(error)
      },(data)=>{
          resolve(data);
      })
  })
}
Vue.prototype.formatData = function(value,formatType) { //时间格式化
	if(value == undefined || value == '') {
    var date = new Date();
  } else {
    var date = new Date(value*1000);
  }

  var Y = date.getFullYear(),
    m = date.getMonth() + 1,
    d = date.getDate(),
    H = date.getHours(),
    i = date.getMinutes(),
    s = date.getSeconds();
  if(m < 10) {
    m = '0' + m;
  }
  if(d < 10) {
    d = '0' + d;
  }
  if(H < 10) {
    H = '0' + H;
  }
  if(i < 10) {
    i = '0' + i;
  }
  if(s < 10) {
    s = '0' + s;
  }
  var time;
  switch(formatType) {
    case "second":
      time = Y + '-' + m + '-' + d + ' ' + H + ':' + i + ':' + s;
      break;
    case "minute":
      time = Y + '-' + m + '-' + d + ' ' + H + ':' + i;
      break;
    case "hour":
      time = Y + '-' + m + '-' + d + ' ' + H;
      break;
    case "day":
      time = Y + '/' + m + '/' + d;
      break;
    case "month":
      time = Y + '/' + m
      break;
    default:
      break;
  }
  return time;
}
Vue.prototype.replaceP = function(phone){
    var rep = /(\d{3})\d{4}(\d{3})/;
    return phone.replace(rep,'$1****$2');
    }
// 忽略自定义元素标签抛出的报错
Vue.config.ignoredElements = [
    'wx-open-launch-app',
]
const originalPush = VueRouter.prototype.push;
const originalReplace = VueRouter.prototype.replace;
//push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch(err => err);
};
//replace
VueRouter.prototype.replace = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalReplace.call(this, location, onResolve, onReject);
  return originalReplace.call(this, location).catch(err => err);
};
//创建路由实例
const router = new VueRouter({
    mode:"hash",
    routes
})

router.beforeEach((to, from, next) => {
  next();
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
export default router;

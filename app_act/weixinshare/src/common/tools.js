import { Toast, Indicator,MessageBox} from 'vant';
export default {
    checkNumber: function(value, type) {
		if(!value) {
			return false;
		}
		// type 1 手机 2 电话号码 3 身份证 4 邮箱
		var regBox = {
			regPhone: /^0?1[3|4|5|6|7|8|9][0-9]\d{8}$/, //手机
			pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,18}$/, //只包含数字和字母
			regTel: /^0[\d]{2,3}-[\d]{7,8}$/, //电话号码(限制开头一定为0)匹配格式：3/4位区号-7/8位电话号码
			regIdCard: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, //身份证号码
			regEmail: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/, //邮箱
		};
		if(type == 1) {
			if(!regBox.regPhone.test(value)) {
				Toast('请输入正确手机号', false);
				return false;
			} else {
				return true;
			}
		}
		if(type == 2) {
			if(!regBox.regTel.test(value)) {
				Toast('请输入正确电话号码', false);
				return false;
			} else {
				return true;
			}
		}
		if(type == 3) {
			if(!regBox.regIdCard.test(value)) {
				Toast('请输入正确身份证号', false);
				return false;
			} else {
				return true;
			}
		}
		if(type == 4) {
			if(!regBox.regEmail.test(value)) {
				Toast('请输入正确邮箱', false);
				return false;
			} else {
				return true;
			}
		}
		if(type == 5) {
			if(!regBox.pattern.test(value)) {
				Toast('请输入6-18位字母数字组合！', false);
				return false;
			} else {
				return true;
			}
		}
	},
	objToString: function(obj) {
		var params = '';
		for(var key in obj) {
			if(params == '') {
				params += key + '=' + obj[key];
			} else {
				params += '&' + key + '=' + obj[key];
			}
		}
		return params;
	},
	GetQueryString(param) { //param为要获取的参数名 注:获取不到是为null
		var currentUrl = window.location.href; //获取当前链接
		var arr = currentUrl.split("?");//分割域名和参数界限
		if (arr.length > 1) {
			arr = arr[1].split("&");//分割参数
			for (var i = 0; i < arr.length; i++) {
				var tem = arr[i].split("="); //分割参数名和参数内容
				if (tem[0] == param) {
					return tem[1];
				}
			}
			return null;
		}
		else {
			return null;
		}
	},
	sessionsetItem: function(key, value, type) {
		//		type 0 字符串  1 对象
		if(type == 1) {
			value = JSON.stringify(value);
		}
		window.sessionStorage.setItem(key, value);
	},
	localsetItem: function(key, value, type) {
		//		type 0 字符串  1 对象
		if(type == 1) {
			value = JSON.stringify(value);
		}
		window.localStorage.setItem(key, value);
	},
	sessiongetItem: function(key, type) {
		if(type == 1) {
			return(JSON.parse(window.sessionStorage.getItem(key)));
		} else {
			return(window.sessionStorage.getItem(key));
		}
	},
	sessionremoveItem: function(key) {
		window.sessionStorage.removeItem(key);
	},
	localgetItem: function(key, type) {
		if(type == 1) {
			return(JSON.parse(window.localStorage.getItem(key)));
		} else {
			return(window.localStorage.getItem(key));
		}
	},
	mobileDetect() {
		let isAndroid = navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1;
		let isiOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
		// return '666666'
		if(isiOS) { //ios系统的处理
			return 1
		} else if(isAndroid) { //Android系统的处理
			return 2
		} else { //PC端处理
			return 3
		}
	},
	getNowFormatDate: function() {
		var date = new Date();
		var seperator1 = "-";
		var seperator2 = ":";
		var month = date.getMonth() + 1;
		var strDate = date.getDate();
		var hours = date.getHours(); //时
		var minutes = date.getMinutes(); //分
		var seconds = date.getSeconds(); //秒
		var maomiao = date.getMilliseconds(); //毫秒
		if(month >= 1 && month <= 9) {
			month = "0" + month;
		}
		if(strDate >= 0 && strDate <= 9) {
			strDate = "0" + strDate;
		}
		if(hours >= 0 && hours <= 9) {
			hours = "0" + hours;
		}
		if(minutes >= 0 && minutes <= 9) {
			minutes = "0" + minutes;
		}
		if(seconds >= 0 && seconds <= 9) {
			seconds = "0" + seconds;
		}
		var currentdate = date.getFullYear() + month + strDate + hours + minutes + seconds + maomiao;
		return currentdate;
	},
	formatData: function(value, formatType) { //时间戳格式化
		if(value == undefined || value == '') {
			var date = new Date();
		} else {
			var date = new Date(value);
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
				time = Y + '-' + m + '-' + d;
				break;
			case "month":
				time = Y + '-' + m
				break;
			default:
				break;
		}
		return time;
	},
}
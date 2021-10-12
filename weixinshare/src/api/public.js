import axios from 'axios'
import { Toast } from 'vant'
import tools from '../common/tools'

axios.defaults.timeout = 60000;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
axios.interceptors.response.use(function(response){
	if(response.status == 401) {
         setTimeout(function(){
            let redirect_uri = window.location.hash.split('#');
            let url = redirect_uri[0] + '/#/actLogin';
			window.location.replace(url);
         },2000)
    }
    return response
},function axiosRetryInterceptor (err){
    if(err && err.response) {
        switch(err.response.status) {
            case 400:
            err.message = '请求参数错误'
            Toast('请求参数错误');
            break

            case 404:
            Toast('请求地址出错');
            break

            case 406:
            Toast('非法请求');
            break

            case 409:
            Toast('非法请求');
            break

            case 410:
            Toast('应用权限不足');
            break

            case 411:
            Toast('非法请求');
            break
        }
    }
	return Promise.reject(err);

})

export default {
    sendAxios(param, _service, method, strtype) {

        //135环境 or 正式

        let service_url = "/xindeapi" + _service

        // // 本地
        //  let service_url = _service       
        let headers = {};
        if(tools.localgetItem('token') && tools.localgetItem('token')!='null' && tools.localgetItem('token')!='undefined' && tools.localgetItem('token')!=null) {
             headers = {
                Authorization: "Bearer " +  tools.localgetItem('token')
             }
        }

        return new Promise((resolve,reject)=>{
            axios({
                url: service_url,
                method: method,
                data: JSON.stringify(param),
                withCredentials: false,
                headers:headers 
            }).then(function(res){
                if (res.status == '200') {
                    resolve(res.data);
                    if (res.data.resp_code == '401') {
                        setTimeout(function(){
                            let redirect_uri = window.location.hash.split('#');
                            let url = redirect_uri[0] + '/#/actLogin';
                            tools.localsetItem('token', null)
                            window.location.replace(url);
                         },2000)
                    }
                } else {
                    reject(error)
                }
            }).catch(function(error){
                   reject(error)                            
            })
        })
    }
}
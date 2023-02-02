
import axios from 'axios';
import Config from '@/setting';
import store from '@/store';
import { getToken } from '@/utils/auth';
import Cookies from 'js-cookie';

// 创建axios实例
const service = axios.create({
	baseURL:process.env.NODE_ENV === 'production' ? process.env.VUE_APP_BASE_API : '/',
	timeout: Config.timeout // 请求超时时间
});

// 添加请求拦截器
service.interceptors.request.use(
	config => {
		if (getToken()) {
			console.log(process.env.NODE_ENV);
			config.headers['x-token'] = getToken();
		}
		config.headers['Content-Type'] = 'application/json';
		config.headers['app'] = true;
		return config;
	},
	error => {
		console.log(error);
		Promise.reject(error);
	}
);

// 添加响应拦截器
service.interceptors.response.use(
	response => {
		const code = response.status;
		if (code < 200 || code > 300) {
			uni.showToast({
				title: response.message,
				icon: 'error'
			});
			return Promise.reject('error');
		} else {
			// 如果为undefined 说明为下载接口，无code
			if (response.data.code === undefined) {
				return response.data;
			} else if (response.data.code !== 0) {
				uni.showToast({
					title: response.data.message,
					icon: 'error'
				});
				return Promise.reject(response.data);
			}
			return response.data;
		}
	},
	error => {
		let code = 0;
		try {
			code = error.response.data.status;
		} catch (e) {
			if (error.toString().indexOf('Error: timeout') !== -1) {
				uni.showToast({
					title: '网络请求超时',
					icon: 'error',
					duration: 5000
				});
				return Promise.reject(error);
			}
		}
		if (code) {
			if (code === 401) {
				store.dispatch('LogOut').then(() => {
					// 用户登录界面提示
					Cookies.set('point', 401),
						location.reload();
				});
			} else if (code === 403) {
				uni.navigateTo({ url: '/403' });
			} else {
				const errorMsg = error.response.data.message;
				if (errorMsg !== undefined) {
					uni.showToast({
						title: errorMsg,
						icon: 'error',
						duration: 5000
					});
				}
			}
		} else {
			uni.showToast({
				title: '服务器异常,请重试!',
				icon: 'error',
				duration: 5000
			});
		}
		return Promise.reject(error.response);
	}
);
export default service;

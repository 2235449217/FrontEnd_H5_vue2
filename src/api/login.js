import request from '@/utils/request';
//登陆用的接口  方式页面
export function login(username, password) {
	return request({
		url: 'api/auth/login',
		method: 'post',
		data: {
			username,
			password
		}
	});
}
export function getInfo() {
	return request({
		url: 'api/auth/info',
		method: 'get'
	});
}
// export function getCodeImg() {
// 	return request({
// 		url: 'api/auth/code',
// 		method: 'get'
// 	});
// }

export function logout() {
	return request({
		url: 'api/auth/logout',
		method: 'delete'
	});
}

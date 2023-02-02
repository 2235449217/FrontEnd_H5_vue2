import request from '@/utils/request';
export function message(data) {
	return request({
		url: '/api/user/getUserInfo',
		method: 'get',
		data
	});
}

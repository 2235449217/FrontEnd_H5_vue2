import request from '@/utils/request.js';

export function characterList(page,pageSize){
	return request({
		url: 'api/authority/getAuthorityList',
		method: 'POST',
		data: {
			page,
			pageSize
		}
	});
}


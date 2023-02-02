import request from '@/utils/request.js';

export function departmentList(page,pageSize){
	return request({
		url: 'api/department/lists',
		method: 'POST',
		data: {
			page,
			pageSize
		}
	});
}
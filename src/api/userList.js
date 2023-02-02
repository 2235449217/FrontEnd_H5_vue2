import request from '@/utils/request';

//获取全部成员  接口
export function userList(page,pageSize) {
  return request({
    url:'/api/user/getUserList',
    method: 'POST',
    data:{ 
		page,
		pageSize 
	}
  });
}
import request from '@/utils/request';

// import baseUrl from '@/setting';

// 我的待办   接口
export function schedule(data) {
  return request({
    url:'/api/task/schedule',
    method: 'GET',
    data
  });
}

//我发起的    
export function initiated(data) {
  return request({
    url: '/api/record/initiated',
    method: 'GET',
    data
  });
}

//我处理的
export function handle(data) {
  return request({
    url: '/api/task/handle',
    method: 'GET',
    data
  });
}

//抄送我的
export function receive(data) {
  return request({
    url: '/api/task/receive',
    method: 'GET',
    data
  });

}
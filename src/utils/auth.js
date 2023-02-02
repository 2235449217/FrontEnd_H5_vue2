// 引用cookie的插件
import Cookies from 'js-cookie';
import Config from '@/setting.js';

const TokenKey = Config.TokenKey;


export function getToken () { 
  return Cookies.get(TokenKey);
}

export function setToken(token, rememberMe) {
  console.log(TokenKey, token);
  if (rememberMe) {
	  //判断cookie是否过期
    return Cookies.set(TokenKey, token, { expires: Config.tokenCookieExpires });
  } else return Cookies.set(TokenKey, token);
}

export function removeToken() {
  return Cookies.remove(TokenKey);

}

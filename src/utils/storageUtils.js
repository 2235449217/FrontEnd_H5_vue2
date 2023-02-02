/*
 * 向localStorage中存储数据工具类
 * （export表示向外暴露方法）
 */
export default {
  /*
   * 读取数据
   * key：数据对象的key
   */
  readData (key) {
    return JSON.parse(window.localStorage.getItem(key) || '[]');
	// 如果localStorage.getItem(key)有值的话，就返回这个值，如果没有的话，就返回一个空数组
  },
  /*
   * 保存数据
   * key：数据对象的key
   * data：要保存的数据（对象数组）
   */
  saveData (key,data) {
    window.localStorage.setItem(key, JSON.stringify(data));
	console.log('aaaaaa');
  }
};
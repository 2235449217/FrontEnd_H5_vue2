<!-- 我们的根组件，所有页面都是在app.vue下进行切换的，是页面的入口文件，可以调用应用的生命周期函数 -->
<script>
	export default {
		onLaunch: function() {
			console.log('App Launch');
		},
		onShow: function() {
			console.log('App Show');
		},
		onHide: function() {
			console.log('App Hide');
		},
		onPageNotFound(){
			uni.navigateTo({ url:'pages/404/404' });
		}
	};
</script>

<style>
	@import url(@/static/style/icon.wxss);
	/*每个页面公共css */
	page{
		background-color: #f8f8f8;
	}
	
</style>

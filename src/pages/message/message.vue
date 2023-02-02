<template>
  <view>
    <view class="input head-img">
      <text>头像</text>
      <image :src="person.headerImg" />
    </view>
    <view class="input">
      <text>姓名</text>
      <text>{{ person.userName }}</text>
    </view>
    <view class="input">
      <text>邮箱</text>
      <text>{{ person.email }}</text>
    </view>
    <view class="input">
      <text>手机号</text>
      <text>{{ person.phone }}</text>
    </view>
  </view>
</template>

<script>
	import { message } from '../../api/message.js';
	export default {
		data() {
			return { person: [] };
		},
		onLoad() {

		},
		mounted() {
			this.messageRequest();
		},
		methods: {
			messageRequest() {
				message().then(res => {
					console.log(res.data);
					this.person = res.data.userInfo;
					console.log(this.person);
				});
			}
		}
	};
</script>

<style scoped lang="scss">
	.input {
		display: flex;
		justify-content: space-between;
		padding: 20rpx;
		border-bottom: 1px solid #ccc;
		height: 80rpx;
		line-height: 80rpx;
	}

	//叠加
	.head-img {
		image {
			width: 60rpx;
			height: 60rpx;
			border-radius: 50%;
		}
	}
</style>

<template>
  <!-- 流转图 用户信息 邢军成 -->
  <view class="content">
    <image
      class="userImg"
      :src="data.url"
    />
    <!-- 用户名 -->
    <view class="userName">
      {{ data.title }}
    </view>
    <!-- 头像 -->
    <image
      class="icon"
      :src="data.status?icon[0]:icon[1]"
    />
  </view>
</template>

<script>
	export default {
		name: 'UserImage',
		// 组件
		props: {
			data: {
				type: Object,
				required: true,
			}
		},
		data() {
			return { icon: ['/static/indexImage/complete.png', '/static/indexImage/await.png'], };

		}
	};
</script>

<style scoped>
	.content {
		display: inline-block;
		position: relative;
	}

	.userImg {
		margin: 10rpx 20rpx;
		width: 70rpx;
		height: 70rpx;
		border-radius: 10rpx;
	}

	.userName {
		margin: -20rpx 20rpx;
		color: #6f6f71;
	}

	.icon {
		width: 30rpx;
		height: 30rpx;
		position: absolute;
		z-index: 3;
		right: 12rpx;
		top: 52rpx;
	}
</style>

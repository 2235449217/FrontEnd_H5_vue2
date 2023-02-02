<template>
  <!-- 工作流  首页  邢军成 -->
  <view class="content">
    <!-- 头部 -->
    <view
      v-for="(item,index) in info"
      :key="index"
      class="head"
    >
      <view class="head-content">
        <!-- 头像 -->
        <image
          class="userImg"
          :src="item.userImg"
        />
        <!-- 用户名 -->
        <text class="userName">
          {{ item.userName }}
        </text>
        <!-- 状态 -->
        <text class="userLabel">
          {{ item.status }}
        </text>
      </view>
      <!-- 图标  我的信息 -->
      <view
        class="userDetails iconfont rightIcon"
        @click="messageClick()"
      />
    </view>
    <!-- //我的代办 等 四个事件  -->
    <view class="middle">
      <!-- :column="4"四个一行 -->
      <uni-grid :column="4">
        <!-- for循环数组list -->
        <uni-grid-item
          v-for="(item, index) in list"
          :key="index"
          class="uni-grid--border"
          :index="index"
        >
          <view
            class="grid-item-box"
            style="background-color: #fff;"
            @click="navItemClick(item)"
          >
            <!-- 图标 -->
            <text :class="item.icon" />
            <view class="badge-content">
              <!-- 消息提示小图标 -->
              <uni-badge
                v-if="count[index]"
                class="badge"
                :text="count[index]"
                type="error"
              />
            </view>
            <!-- 文字 -->
            <text class="text">
              {{ item.text }}
            </text>
          </view>
        </uni-grid-item>
      </uni-grid>
      <!-- </view> -->
    </view>
    <!-- 下方--我的应用 -->
    <view class="bottom">
      <!-- 标题 -->
      <view class="bottomTitle">
        我的应用
      </view>
      <view class="applist">
        <view
          v-for="(item,index) in applist"
          :key="index"
          class="bottomContent"
        >
          <!-- 图标 -->
          <image
            class="appImage"
            :src="item.url"
          />
          <!-- 文字 -->
          <text class="appName">
            {{ item.text }}
          </text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
	export default {

		data() {
			return {
				//首页个人信息数据 字段
				info: [{
					userImg: '/static/indexImage/useImg.jpg',
					userName: 'taffy',
					status: '创建者',
				}],
				// 首页事件  字段
				list: [{
						id: 0,
						text: '我的待办',
						icon: 'iconfont iconTodo',
						//新页面
					},
					{
						id: 1,
						text: '我发起的',
						icon: 'iconfont iconAction'
					},
					{
						id: 2,
						text: '我处理的',
						icon: 'iconfont iconHandle'
					},
					{
						id: 3,
						text: '抄送我的',
						path: '/pages/action/action',
						icon: 'iconfont iconCopy'
					}
				],
				// 我的应用  字段
				applist: [{
						url: '/static/indexImage/leave.png',
						text: '请假',
					},
					{
						url: '/static/indexImage/leave.png',
						text: '请假',
					},
					{
						url: '/static/indexImage/leave.png',
						text: '请假',
					}, {
						url: '/static/indexImage/leave.png',
						text: '请假',
					}, {
						url: '/static/indexImage/leave.png',
						text: '请假',
					},
					{
						url: '/static/indexImage/leave.png',
						text: '请假',
					},
					{
						url: '/static/indexImage/leave.png',
						text: '请假',
					}
				],
				// 消息提示字段
				count: [990, 5, 0, undefined]
			};
		},
		methods: {
			// 导航跳转点击的处理函数
			navItemClick(item) {
				//?key=' + item.id,  拼接跳转
				uni.navigateTo({ url: '/pages/todo/todo' + '?key=' + item.id, });

			},
			// 导航跳转我的信息
			messageClick() {

				uni.navigateTo({ url: '/pages/message/message' });
			},


		}
	};
</script>

<!--  scss Sass就是css的预处理器，Scss是Sass3版本中引入的新语法特性  支持样式嵌套    -->
<!--  scoped表示当前style 里的样式只属于当前模块。（作用域、私有化的思想）  防止样式污染-->
<style lang="scss" scoped>
	//  各种类型属性的书写顺序及作用
	// 优先级第一定位属性：position display float left top right bottom overflow clear z-index
	// 优先级第二自身属性：width height padding border margin background
	// 优先级第三文字样式：font-family font-size font-style font-weight font-varient color
	// 优先级第四文本属性：text-align vertical-align text-wrap text-transform text-indent text-decoration
	// 优先级第四文本属性：letter-spacing word-spacing white-space text-overflow line-height
	// 优先级第五css3中新增属性：content box-shadow border-radius transform……

	.content {
		background-color: rgb(248, 248, 248);

		.head {
			display: flex;
			justify-content: space-between;
			margin: 0 30rpx;

			.head-content {
				position: relative;
				width: 350rpx;

				.userName {
					position: absolute;
					line-height: 80rpx;
					left: 30%;
					font-weight: 700;
				}

				.userLabel {
					position: absolute;
					margin: 15rpx;
					padding: 0rpx 20rpx 0rpx 20rpx;
					height: 52rpx;
					left: 55%;
					line-height: 52rpx;
					font-size: 15rpx;
					color: #5f6e81;
					border: 1px solid #c3ceda;
					border-radius: 30rpx;
					background-color: #f0f1f1;
				}


				.userImg {
					width: 80rpx;
					height: 80rpx;
					border-radius: 50%;
				}
			}

			.userDetails {
				width: 50rpx;
				height: 50rpx;
				margin-top: 15rpx
			}

			.rightIcon {
				color: #5e6d82;
			}

		}

		.middle {
			margin: 20rpx 25rpx;
			border: 1px solid #FFFFFF;
			border-radius: 20px;
			box-shadow: 0 0 3px 4px #efefef;



			.text {
				font-size: 20rpx;
				margin-top: 25rpx;
			}

			.grid-item-box {
				position: relative;
				flex: 1;
				/* #ifndef APP-NVUE */
				display: flex;
				/* #endif */
				flex-direction: column;
				align-items: center;
				justify-content: center;
				padding: 15px -10rpx;

				border-radius: 20rpx;

				.badge-content {
					position: absolute;
					right: 24rpx;
					top: 20rpx;


				}

				.icons {
					width: 50rpx;
					height: 50rpx;
				}
			}

			.grid-item-box-row {
				flex: 1;
				/* #ifndef APP-NVUE */
				display: flex;
				/* #endif */
				flex-direction: row;
				align-items: center;
				justify-content: center;
			}
		}

		.bottom {
			background-color: #FFFFFF;

			.bottomTitle {
				font-size: 40rpx;
				font-weight: 700;
				padding: 20rpx;
			}

			.applist {
				display: flex;
				flex-wrap: wrap;
				padding: 0 40rpx;

				.bottomContent {
					width: 25%;

					margin: 20rpx 0rpx;

					.appImage {
						display: inline-block;
						width: 90rpx;
						height: 90rpx;
						margin: 0rpx 36rpx;
					}

					.appName {
						font-size: 31rpx;
						margin: 0rpx 48rpx;
						text-align: center;
					}

				}
			}
		}

	}
</style>

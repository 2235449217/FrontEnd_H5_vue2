<template>
  <!-- //流程动态 组件  - 邢军成 -->
  <view class="card_list">
    <!-- 循环遍历  cards 数据 -->
    <view
      v-for="(item,index) in cards"
      :key="index"
      class="card"
      :index="index"
    >
      <!-- 卡片标题   时间-->
      <view class="title-content">
        <text class="apply">
          {{ item.title }}
        </text>
        <text class="time">
          {{ item.time }}
        </text>
      </view>
      <!-- 卡片内容    -->
      <view class="content">
        <!-- 卡片标题 -->
        <view class="title">
          <!-- 卡片标题  内容 -->
          <view class="title-context">
            <!-- 左侧用户信息 -->
            <view>
              <!-- 用户头像 -->
              <image
                class="userImg"
                :src="item.userImg"
              />
             
              <!-- 用户姓名 -->
              <text class="userName">
                {{ item.user }}
              </text>
            </view>
            <!--  右侧 用户||状态-->
            <view class="userStatus">
              <!-- 方法里面也可以传参 -->
              {{ getTextByStatus(item.isSuccess) }}
            </view>
          </view>
        </view>
        <!-- 根据申请状态--是否显示信息  v-if判断 -->
        <view
          v-if="isSuccess"
          class="Status"
        >
          找不到下个节点负责人，可联系管理员
        </view>
        <view class="submitStatus">
          开始处理: {{ item.startTime }}
        </view>
        <view class="submitStatus">
          处理耗时: {{ item.handleTime }}
        </view>
      </view>
    </view>
  </view>
</template>

<script>
	export default {
		// name 作用 1.允许组件自身的递归调用，就是在当前组件中，调用组件自己
		//			2.当我们使用vue.js官方提供的调试工具调试时，可以看到组件的名称，更好地定位
		name: 'CardDetails',
		//props		传递数据 组件间的通信  通常父组件的模板中包含子组件
		// props	申明需要从父组件接收的数据
		props: {
			// props数据验证
			// 在我们需要对自己的组件进行数据验证时，此时使用props就需要使用对象写法了。
			cards: {
				type: Array,
				default: function() {
					return ['cards'];
				}
			},

		},
		// 方法
		methods: {
			//根据用户状态---判断状态
			getTextByStatus(status) {
				if (status === 0) {
					this.isSuccess = false;
					return '提交成功';
				} else if (status === 1) {
					this.isSuccess = true;
					return '提交失败';
				}
			},
		}
	};
</script>
<!--  scss Sass就是css的预处理器，Scss是Sass3版本中引入的新语法特性  支持样式嵌套    -->
<!--  scoped表示当前style 里的样式只属于当前模块。（作用域、私有化的思想）  防止样式污染-->
<style lang="scss" scoped>
	
	//	各种类型属性的书写顺序及作用
	// 优先级第一定位属性：position display float left top right bottom overflow clear z-index
	// 优先级第二自身属性：width height padding border margin background
	// 优先级第三文字样式：font-family font-size font-style font-weight font-varient color
	// 优先级第四文本属性：text-align vertical-align text-wrap text-transform text-indent text-decoration
	// 优先级第四文本属性：letter-spacing word-spacing white-space text-overflow line-height
	// 优先级第五css3中新增属性：content box-shadow border-radius transform……

	.card {
		.title-content {
			display: flex;
			justify-content: space-between;
			padding-top: 10rpx;
			margin: 30rpx;
		}

		.apply {
			font-weight: 700;
			font-size: 30px;
		}

		.time {
			color: #91a2b6;
			font-size: 25rpx;
			height: 40rpx;
			line-height: 40rpx;
		}

		.content {
			margin: 30rpx auto;
			width: 96%;
			border-radius: 14rpx;
			background-color: #FFFFFF;
			box-shadow: 4rpx 4rpx 10rpx #DCDCDC;

			.title {
				margin-bottom: 10rpx;
				width: 100%;
				height: 80rpx;
				line-height: 80rpx;

				.title-context {
					display: flex;
					justify-content: space-between;
					// align-items的作用是设置flex子项在每个flex行的交叉轴上的默认对齐方式。
					align-items: center;
					margin: 0 15rpx;
					padding: 15rpx 10rpx;
					height: 50rpx;
					line-height: 50rpx;

					.userImg {
						display: inline-block;
						// 图片、span元素的基线和div的基线对齐。
						vertical-align: middle;
						width: 50rpx;
						height: 50rpx;
						border-radius: 50%;

					}

					.userName {
						margin: 10rpx 10rpx;
						padding: 0rpx 20rpx;
						vertical-align: middle;
						font-size: 30rpx;
						height: 40rpx;
						line-height: 40rpx;

					}

					.userStatus {
						justify-content: space-between;
						font-size: 30rpx;
						color: #ed1c24;

					}

					.time {
						font-family: ui-monospace;
						font-size: 20rpx;
						color: #8F939C;
					}
				}

			}

			.Status {
				padding: 0 100rpx;
				padding-bottom: 26rpx;
				color: #5f6e81;
				font-size: 30rpx;

			}

			.content-step {
				padding: 0 100rpx;
				padding-bottom: 26rpx;
				height: 200rpx;

			}

			.submitStatus {
				padding: 0 100rpx;
				padding-bottom: 26rpx;
				font-size: 25rpx;
				color: #91a2b6;
			}

			.currentNode {
				margin-left: 30rpx;
				font-size: 30rpx;
				color: #8F939C;

				text {
					color: #000;
				}
			}

		}


	}
</style>

<template>
  <!-- 流转图   组件  邢军成-->
  <view class="process">
    <!-- 外层for循环 flow -->
    <view
      v-for="(items,indexs) in flow"
      :key="indexs"
      class="flow"
    >
      <!-- 整张流程卡片-->
      <view class="content">
        <!-- 卡片标题-->
        <view class="title">
          {{ items.title }}
        </view>
        <!-- 内存for循环 items.process 整个请假流程 内容 -->
        <view
          v-for="(item,index) in items.process"
          :key="index"
          class="border"
        >
          <!-- 内容 -->
          <view class="border-context">
            <!-- 信息 -->
            <view class="info">
              <view class="user">
                <!-- 头像 -->
                <image
                  class="userImg"
                  :src="item.url"
                />
                <!-- 状态 -->
                <image
                  class="icon"
                  :src="item.status?item.icon[0]:item.icon[1]"
                />
              </view>

              <!-- 事件 -->
              <view class="contentapply">
                <!-- 个人信息 -->
                <view>
                  <!-- 标题 -->
                  <text class="apply">
                    {{ item.capacity }}
                  </text>
                  <!-- 用户  -->
                  <text class="userName">
                    {{ item.user }}
                  </text>
                </view>
              </view>
            </view>
          </view>
          <!-- 下层盒子 -->
          <view class="content-xian">
            <!-- 边线 -->
            <view :class="['xian1',items.process.length-1==index?'xian2':'']">
              <!-- 用户信息 -->
              <user-image
                v-for="(item,index2) in item.userinfo"
                :key="index2"
                :data="item"
              />
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
  </view>
</template>

<script>
	import userImage from '../user-Image/user-Image.vue';
	export default {
		name: 'CardList',
		components: { userImage },
		props: {
			flow: {
				type: Array,
				default: function() {
					return ['flow'];
				}
			},

		},
		data() {
			return {};
		},

		methods: {}
	};
</script>

<style lang="scss" scoped>
	.process {
		.content {
			background-color: #FFFFFF;
			border-radius: 10rpx;

			.user {
				position: relative;

				.userImg {
					position: relative;
					width: 80rpx;
					height: 80rpx;
					border-radius: 10rpx;
					margin: 6rpx 0rpx;
					position: relative;

				}

				.icon {
					width: 40rpx;
					height: 40rpx;
					position: absolute;
					z-index: 3;
					left: 48rpx;
					bottom: 10rpx;

				}
			}

			.title {
				font-weight: 800;
				height: 80rpx;
				line-height: 80rpx;
				margin: 30rpx 5rpx 0px 30rpx;
				padding: 20rpx 0rpx;
			}

			.border {
				padding: 0 30rpx;

				.border-context {
					display: flex;

					.info {
						display: flex;
					}

					.contentapply {
						padding: 0 20rpx;
						display: inline-block;
						flex-direction: column;

						.apply {
							display: block;
							font-weight: 600;
						}

						.userName {
							color: #b0b0b3;

						}
					}
				}

				.content-xian {
					padding-left: 40rpx;

					.xian1 {
						border-left: 7px solid #d0d0d0;
						padding: 20rpx 30rpx;
						min-height: 80rpx;
					}

					.xian1.xian2 {
						padding-bottom: 30rpx;
						border: none;
					}

				}
			}

		}
	}
</style>

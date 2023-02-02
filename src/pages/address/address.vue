<template>
  <!-- 位晓茹   内部组织-->
  <view>
    <view class="page-search">
      <uni-search-bar
        placeholder="搜索成员"
        bg-color="#f8f8f8"
        @focus="focus"
      />
    </view>
    <view class="managePart">
      <!-- 部门 -->
      <view class="head">
        <view class="head-content department">
          <view class="userImg schemaIcon iconfont" />
          <view class="rightBox departmentBox ">
            <text class="userName departmentTitle">
              部门
            </text>
            <text
              class="iconfont rightIcon"
              @click="departmentClick()"
            />
          </view>
        </view>
        <view class="head-content character">
          <view class="userImg iconfont characterIcon" />
          <view class="rightBox characterBox">
            <text class="userName characterTitle">
              角色
            </text>
            <text
              class="iconfont rightIcon"
              @click="characterClick()"
            />
          </view>
        </view>
      </view>
      <view class="totalMember">
        <view class="member-title">
          全部成员
        </view>
        <view class="member-list">
          <people-list :peoples="readData('list')" />
        </view>
      </view>
    </view>
  </view>
</template>

<script>
	import peopleList from '@/components/people-list/people-list.vue';

	import { userList } from '../../api/userList.js';
	export default {
		components: { 'people-list': peopleList },
		data() {
			return {
				//list是输出到页面的数据
				list: [],
				WarningText: '当前搜索内容不存在',
				//peoples表示接口获取的数据，现在为假数据
				peoples: [],

			};
		},
		/**
		 *  这里需要注意，必要要在DOM树加载完成后才能进行
		 * 例如vue生命周期函数beforCreate这个阶段就不可以调用
		 * 从beforeMount挂载之前周期函数中进行保存到data中。这样就可以渲染到页面中了。
		 * 注意created中还没有vue实例，所以如果在此时进行给data中的数据赋值，会报错。
		 *  */
		onLoad() {
			this.userListRequest();
			this.isExist = true;
		},
		methods: {
			/* 调用全部成员接口 */
			userListRequest() {
				userList(1, 1000).then(res => {
						console.log('全部成员', res.data);
						this.peoples = res.data.list;
						console.log(this.peoples);
						this.saveData('list', this.peoples);
					})
					.catch(err => {
						console.log(err);
					});
			},
			departmentClick() {
				uni.navigateTo({ url: '../department/department' });
			},
			characterClick() {
				uni.navigateTo({ url: '../character/character' });
			},
			readData(key) {
				return JSON.parse(window.localStorage.getItem(key) || '[]');
				// 如果localStorage.getItem(key)有值的话，就返回这个值，如果没有的话，就返回一个空数组
			},
			saveData(key, data) {
				window.localStorage.setItem(key, JSON.stringify(data));
			},
			focus() {
				uni.navigateTo({ url:'../Search/Search' }); 
			},
		},
	};
</script>

<style lang="scss" scoped>
	.title {
		text-align: center;
		background-color: #fff;
	}

	.page-search {
		background-color: #fff;
		height: 80rpx;
	}

	.contact_item {
		display: flex;
		text-align: center;
		justify-content: justify-center;
		width: 145rpx;
	}

	.contact_name {
		display: flex;
		flex-direction: column;
		border-bottom: 1rpx solid #e8e8e8;
	}

	.head {
		justify-content: space-between;
		padding-left: 30rpx;
		width: 100%;
		background-color: #fff;
		border-bottom: 1rpx solid #e8e8e8;

		.head-content {
			width: 100%;
			display: flex;
			height: 100rpx;
			align-items: center;

			.userImg {
				width: 80rpx;
				height: 80rpx;
				margin-right: 30rpx;
				border-radius: 50%;
				color: #59a7ff;
				background-color: #e6f1ff;
				line-height: 80rpx;
				font-size: 50rpx;
				text-align: center;
			}

			.rightBox {
				width: 620rpx;
				height: 100rpx;
				padding-right: 50rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.rightIcon {
					width: 30rpx;
					height: 30rpx;
					color: #bfbfbf;
					margin-right: 20rpx;
					padding-bottom: 5rpx;
				}
			}

			.departmentBox {
				border-bottom: 1rpx solid #e8e8e8;
			}
		}
	}

	.totalMember {
		.member-title {
			margin: 30rpx;
		}

		.member-list {
			background-color: #fff;
			border-bottom: 1px solid #e8e8e8;
		}
	}

	// 点击搜索后出现的内容
	.searchShow {
		background-color: #fff;
		border-bottom: 1rpx solid #e8e8e8;

		.WarningText {
			width: 100%;
			margin: 0 auto;
		}
	}
</style>

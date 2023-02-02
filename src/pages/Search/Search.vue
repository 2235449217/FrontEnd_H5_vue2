<template>
  <view>
    <view class="page-search">
      <uni-search-bar
        :focus="true"
        @confirm="search"
        @blur="blur"
        @focus="focus"
        @input="input"
        @cancel="cancel"
        @clear="clear"
      />
    </view>
    <view class="showPart">
      <view class="showPart-content">
        <people-list :peoples="list" />
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
				data: [],
				list: [],
				isExist: false,
			};
		},
		mounted() {
			this.unserListRequest();
		},
		methods: {
			unserListRequest() {
				userList(1, 1000).then(res => {
						console.log(res.data.list);
						this.data = res.data.list;
						this.list = this.data;
					})
					.catch(err => {
						console.log(err);
					});
			},
			search(res) {
				this.list = [];
				this.data.filter(item => {
					if (item.userName.indexOf(res.value) !== -1) {
						this.list.push(item);
						this.isExist = true;
					}
				});
			},
			input(res) {
				console.log('----input:', res);
			},
			clear() {
				this.list = this.data;
			},
			blur() {},
			focus() {},
			// 取消事件
			cancel() {
				uni.navigateBack({ delta: 1 });
			}
		},
		onBackPress(plus) {
			// #ifdef APP-PLUS
			plus.key.hideSoftKeybord();
			// #endif
		}
	};
</script>

<style lang="scss">
	.page-search {
		background-color: #fff;
		height: 80rpx;
	}

	.showPart {
		margin-top: 10rpx;
		background-color: #fff;
		width: 100%;

		.showPart-content {
			margin: 0 auto;
			height: 100%;
		}
	}
</style>

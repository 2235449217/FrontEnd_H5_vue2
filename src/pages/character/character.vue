<template>
  <view class="centent">
    <view class="page-search">
      <uni-search-bar
        placeholder="搜索成员"
        bg-color="#f8f8f8"
        @focus="focus"
      />
    </view>
    <view
      v-for="item in list"
      :key="item.id"
      :value="item.value"
      class="characterBox"
    >
      <view class="box">
        <image
          v-show="item.headerImg"
          class="headerImg"
          :src="'https://www.cppwnn.top/api/'+item.headerImg"
        />

        <view class="item-character">
          {{ item.name }}
        </view>
        <!-- 这里如何item.children为空
			也就是数组中的数据遍历完了这个右箭头就可以消失了-->
        <view
          v-show="!item.userName"
          class="iconfont rightIcon"
          @click="findChildren(item.authorityId)"
        />
      </view>
    </view>
  </view>
</template>
<script>
	import { characterList } from '../../api/characterList.js';
	import { userList } from '../../api/userList.js';
	export default {
		data() {
			return { list: [] };
		},
		mounted() {
			this.characterRequest();
		},
		methods: {
			findChildren(key) {
				/* this.list.find(item => {
					if(item.children !== null && item.id === key){
						this.list = item.children;
					}
					// return item.children !== null && item.id === key;
				}); */
				//获取成员列表--接口
				userList(1, 1000).then(res => {
						console.log(res.data.list);
						this.list = [];
						res.data.list.forEach(aaa => {
							if (key === aaa.authorityId) {
								this.list.push(aaa);
								this.list.forEach(i => {
									i.name = i.userName;
								});
								// this.list.authorityName = aaa.userName;
							} else {
								return;
							}
						});
						console.log('4545454545', this.list);
					})
					.catch(err => {
						console.log(err);
					});
			},
			// 获取角色列表--接口
			characterRequest() {
				characterList(1, 10000).then(res => {
						console.log(res.data.list);
						this.list = res.data.list;
						for (let i = 0; i < this.list.length; i++) {
							this.list[i].name = this.list[i].authorityName;
						}

					})
					.catch(err => {
						console.log(err);
					});
			},
			focus() {
				uni.navigateTo({ url:'../Search/Search' }); 
			},
		},
	};
</script>


<style lang="scss">
	page {
		background-color: #EEEEEE;
	}

	.centent {
		width: 100%;
		background-color: #fff;
		.page-search {
			background-color: #fff;
			height: 80rpx;
		}
		.characterBox {
			padding-left: 30rpx;
			padding-top: 30rpx;
			border-bottom: 1rpx solid #ccc;

			.box {
				width: 100%;
				height: 100rpx;
				display: flex;
				align-items: center;

				.headerImg {
					width: 95rpx;
					height: 80rpx;
					border-radius: 50%;
					margin-right: 30rpx;
				}

				.item-character {
					width: 100%;
					height: 100rpx;
					line-height: 100rpx;
				}

				.rightIcon {
					width: 30rpx;
					height: 30rpx;
					color: #bfbfbf;
					vertical-align: middle;
					margin-right: 20rpx;
					padding-bottom: 5rpx;
				}
			}
		}
	}
</style>

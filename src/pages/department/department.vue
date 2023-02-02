<template>
  <!-- 通讯录--部门页面  位晓茹 -->
  <view class="centent">
    <uni-search-bar
      placeholder="搜索成员"
      bg-color="#f8f8f8"
      @focus="focus"
    />
    <view
      v-for="(item,index) in datas"
      :key="index"
      :value="item.value"
      :index="index"
      class="departmentBox"
    >
      <!-- 左边部分包括名称与人数(照片) -->
      <view class="leftBox">
        <!-- 头像 -->
        <view
          v-show="item.headerImg"
          class="profile-photo"
        >
          <image :src="'https://www.cppwnn.top/api/'+item.headerImg" />
        </view>
        <view class="item-department">
          {{ item.name }}
        </view>

        <view
          v-show="item.children&&item.children.length>0 ? true:false"
          class="peopleCount"
        >
          ({{ item.count }})
        </view>
      </view>

      <!-- 这里如何item.children为空
			也就是数组中的数据遍历完了这个右箭头就可以消失了-->
      <view
        v-show="item.children&&item.children.length>=0 ? true:false"
        class="iconfont rightIcon"
        @click="findChildren(item.ID)"
      />
    </view>
  </view>
  </view>
</template>
<script>
	import { departmentList } from '../../api/department.js';
	import { userList } from '../../api/userList.js';
	export default {
		data() {
			return {
				datas:[],
				list:[],
				/* datas: [{
					id: 1,
					name: '销售部',
					count: 100,
					children: [{
						id: 101,
						name: '销售部一队',
						count: 10,
						children: [{
							id: 111,
							name: '销售部一队一组',
							count: 3,
							children: [{
								id: 1111,
								name: '位晓茹',
							}, {
								id: 1112,
								name: '位晓茹1',
							}, {
								id: 1113,
								name: '位晓茹2',
							}, {
								id: 1114,
								name: '位晓茹3',
							}, ]
						}, {
							id: 112,
							name: '销售部一队二组',
							count: 3,
						}]
					}, {
						id: 102,
						name: '销售部二队',
						count: 3,
						children: [{
							id: 121,
							name: '销售部二队一组',

						}, {
							id: 122,
							name: '销售部二队二组',

						}]
					}, {
						id: 31,
						name: '销售部三队',
						count: 3,
						children: [{
							id: 311,
							name: '销售部三队一组',
							count: 3,
						}, {
							id: 312,
							name: '销售部三队二组',
							count: 3,
						}, {
							id: 313,
							url: ('../../static/indexImage/useImg.jpg'),
							name: 'BBBB'
						}]
					}, {
						id: 32,
						url: ('../../static/indexImage/useImg.jpg'),
						name: 'BBBB'
					}]
				}, {
					id: 2,
					name: '管理部',
					count: 3,
					children: [{
						id: 201,
						name: '管理部一队',
						count: 3,
					}, {
						id: 202,
						name: '管理部二队',
						count: 3,
					}, {
						id: 203,
						name: '管理部三队',
						count: 3,
					}, {
						id: 204,
						url: ('../../static/indexImage/useImg.jpg'),
						name: 'BBBB'
					}]
				}, {
					id: 3,
					name: '股东',
					count: 3,
					children: [{
						id: 301,
						name: 'AAA'
					}]
				}, {
					id: 4,
					name: '职工',
					count: 3,
					children: [{
						id: 401,
						name: '张三',
					}, {
						id: 402,
						name: '李四'
					}, {
						id: 403,
						name: '王五'
					}]
				}],
				 */
			
			};
		},
		mounted() {
			this.departmentRequest();
			this.unserListRequest();
		},
		methods: {
			// 请求部门列表
			departmentRequest(){
				departmentList(1,100).then(res =>{
					console.log(res.data.list);
					this.datas = res.data.list;
					this.datas.forEach(item =>{
						item.name = item.deptName;
						item.count = item.children.length;
					});
				})
				.catch(err =>{
					console.log(err);
				});
			},
			findChildren(key) {
				/* this.find(foo => {
					if (foo.children !== null && foo.id === key) {
						this.datas = foo.children;
					}
				}); */
				this.datas.find(item => {
					/* 首先判断部门还有没有子部门 */
					// 1-----当还有子部门时
					
					// 注意：这里报错length，是因为层级太高 添加item.children，报错解决
					if (item.children&&item.children.length > 0 && item.ID === key) {
						this.datas = item.children;
						console.log(this.datas);
						this.datas.forEach(item =>{
							item.name = item.deptName;
							item.count = item.children.length;
						});
						console.log('this.list',this.list);
						this.list.forEach(aa =>{
							if(aa.deptId === key){
								this.datas.push(aa);
								console.log(aa,'123121212');
							}
						});
					}else if(item.children&&item.children.length === 0 && item.ID === key){
						// 2------当没有子部门时
						this.datas = [];
						this.list.forEach(aa =>{
							if(aa.deptId === key){
								this.datas.push(aa);
							}
						});
					}
				});
			},
			/** 调用成员列表这个接口
			 * 有两种情况：
			 * 1----当成员和部门同时出现的时候，需要将符合条件的成员添加到datas这个数组中
			 * 2----当部门已经没有子部门时，这时让符合条件的成员覆盖datas这个数组
			*/
		    unserListRequest(){
				 userList(1,1000).then(res =>{
					this.list = res.data.list;
					this.list.forEach(item =>{
						item.name = item.userName;
					});
					console.log(this.list);
				})
				.catch(err =>{
					console.log(err);
				});
			},
			// find(foo) {
			// 	for (var i = 0; i < this.datas.length; i++) {
			// 		foo(this.datas[i]);
			// 	}
			// },

			
			focus() {
				uni.navigateTo({ url: '../Search/Search' });
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
		height: 100vh;
		background-color: #fff;

		.departmentBox {
			width: 95%;
			margin: 0 auto;
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-bottom: 1rpx solid #e8e8e8;

			.profile-photo {
				margin-left: 30rpx;

				image {
					width: 80rpx;
					height: 80rpx;
					border-radius: 50%;
				}
			}

			.leftBox {
				display: flex;
				align-items: center;
			}

			.item-department {
				width: 100%;
				padding: 15rpx;
				height: 100rpx;
				margin-left: 30rpx;
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
</style>

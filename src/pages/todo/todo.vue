<template>
  <view>
    <!-- 上方tab栏 -->
    <view class="uni-padding-wrap uni-common-mt">
      <view class="tab-content">
        <uni-segmented-control
          :current="current"
          :values="items"
          :style-type="styleType"
          :active-color="activeColor"
          class="bottom"
          @clickItem="onClickItem"
        />
      </view>
    </view>
    <!-- 卡片整体部分 -->
    <view class="content">
      <!-- 我的待办页面卡片内容一 -->
      <view v-if="current === 0">
        <!-- 引入插件 -->
        <view>
          <card-list
            :cards="data0"
            labels="time"
            node="none"
          />
        </view>
        <!-- 使用加载组件 -->
        <!-- <uni-load-more /> -->
      </view>

      <view v-if="current === 1">
        <view>
          <card-list :cards="data1" />
        </view>
      </view>
      <view v-if="current === 2">
        <view>
          <card-list :cards="data2" />
        </view>
      </view>
      <view v-if="current === 3">
        <view>
          <card-list :cards="data3" />
        </view>
      </view>
    </view>
  </view>
</template>

<script>
	import cardList from '@/components/card-list/card-list.vue';
	import { schedule,initiated,handle,receive } from '@/api/task.js';
	// 
	//定义全局参数，控制数据加载

	export default {
		components: { cardList },
		data() {
			return {
				items: ['我的待办', '我发起的', '我处理的', '抄送我的'],

				data0: [],
				data1:[],
				data2:[],
				data3:[],
				/*{
				 list: [{ title: '发起人', }, { title: '申请人', }], 
				recordId:1, //记录id
				createdAt:'', // 创建时间
				applicant:'', //声请人
				inspector:'', //审批人
				appName:'', //应用名称
				currentNode:'',//当前节点
				checkState:'',//审批状态 
				},*/

				cards0: [{
					label: '2022年4月29日16:26:21',
					applyType: '转正申请-提交申请',
					status: 1,
					applicant: '位晓茹',
					inspector: 'test用户',
					list: [{ title: '发起人', }, { title: '申请人', }]
				}, ],
				cards1: [{
						node: '提交申请',
						label: 0,
						applyType: '转正申请',
						applicant: '位晓茹',
						inspector: 'test用户',
						list: [{ title: '当前负责人', }, { title: '申请人', }]
					},

				],
				cards2: [{
						node: '提交申请',
						label: 0,
						applyType: '转正申请',
						applicant: '位晓茹',
						inspector: 'test用户',
						list: [{ title: '当前负责人', }, { title: '申请人', }]
					},

				],
				cards3: [{
					appName: '提交申请',
					label: 0,
					currentNode: '转正申请',
					applicant: '位晓茹',
					inspector: 'test用户',
					list: [{ title: '当前负责人', }, { title: '申请人', }]
				}, ],
				styles: [{
						value: 'tab',
						text: '按钮',
						checked: true
					},
					{
						value: 'text',
						text: '文字'
					}
				],
				current: 0,
				colorIndex: 0,
				activeColor: '#000000',
				styleType: 'tab',
			};
		},
		mounted() {
			// 显示内部数据
			this.scheduleRequest();
			this.initiatedRequest();
			this.handleRequest();
			this.receiveRequest();
		},
		onLoad: function(option) {
			//页面之间进行的传值
			this.current = parseInt(option.key);
			setTimeout(function() {
				console.log('start pulldown');
			}, 1000);
			uni.startPullDownRefresh();
			this.getCardList();
			
		},
		//下拉刷新
		onPullDownRefresh() {
			console.log('refresh');
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		//上拉触底时间监听
		onReachBottom() {
			this.getCardList();
			console.log('触发了上拉触底时间');
		},
		methods: {
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex;
				}
				//点击切换页面按钮自动回到页面顶部，duration滚动时间
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 1,
				});
			},
			//获取数据
			getCardList() {
				var aa; //定义一个变量
				var current = this.current;
				//向cards这个数组中重复添加这个数组
				if (current === 0) {
					aa = this.cards0;
					this.cards0 = [...aa, ...aa];
					console.log('此时我的待办数据增加');
				} else if (current === 1) {
					aa = this.cards1;
					this.cards1 = [...aa, ...aa];
					console.log('此时我发起的数据增加');
				} else if (current === 2) {
					aa = this.cards2;
					this.cards2 = [...aa, ...aa];
					console.log('此时我处理的数据增加');
				} else {
					aa = this.cards3;
					this.cards3 = [...aa, ...aa];
					console.log('此时抄送我的数据增加');
				}
				uni.stopPullDownRefresh(); //得到数据后停止刷新
			},
			//时间格式转换
			formDate(dateForm) {
				if (dateForm === '') {
					return '';
				} else {
					var dateee = new Date(dateForm).toJSON();
					var date = new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, '').replace(
						/\.[\d]{3}z/, '');
					return date;
				}
			},
			// 我的待办处理接口
			async scheduleRequest() {
				console.dir(schedule);
				schedule().then(res => {
					console.log(res.data,'我的待办');
					this.data0 = res.data;
					for (var i = 0; i < this.data0.length; i++) {
						this.data0[i].label = this.formDate(res.data.createdAt);
						this.data0[i].nodeTitl='转正-提交申请';
					}
					console.log(this.data0, 123112121);
				}).catch(err => {
					console.log(err);
				});
			},
			// 我发起的请求接口
			async initiatedRequest(){
				initiated().then(res =>{
					console.log(res.data,'我发起的');
					this.data1 = res.data;
					for (let i = 0; i < this.data1.length; i++) {
						this.data1[i].label = this.data1[i].currentState;
						this.data1[i].nodeTitl='提交申请';
					}
					
					console.log('data1',this.data1);
				}).catch( err =>{
					console.log(err);
				} );
			},
			// 我处理的接口处理
			async handleRequest(){
				handle().then(res =>{
					console.log(res.data,'我处理的');
					this.data2 = res.data;
					for (var i = 0; i < this.data2.length; i++) {
						this.data2[i].label = this.data2[i].currentState;
						this.data2[i].nodeTitl='提交申请';
					}
					console.log('data2',this.data2);
				}).catch( err =>{
					console.log(err);
				} );
			},
			// 抄送我的接口处理
			async receiveRequest(){
				receive().then(res =>{
					console.log(res.data,'抄送我的');
					this.data3 = res.data;
					for (var i = 0; i < this.data3.length; i++) {
						this.data3[i].label = this.data3[i].currentState;
						this.data3[i].nodeTitl='提交申请';
					}
				}).catch( err =>{
					console.log(err);
				} );
			}
		}
	};
</script>
<style lang="scss">
	page {
		background-color: #f5f7fa;
	}

	.example-body {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		padding: 0;
	}

	.body {
		background-color: #F0FFF0;
	}

	.uni-common-mt {
		background-color: white;
	}

	.uni-padding-wrap {
		height: 80rpx;
		line-height: 80rpx;
		width: 100%;
		position: fixed;
		z-index: 100;
		padding-top: 15rpx;
	}

	.content {
		box-shadow: 0rpx 12rpx 8rpx -12rpx #CCCCCC;
		border-radius: 15rpx;
		padding-top: 80rpx;
	}
</style>

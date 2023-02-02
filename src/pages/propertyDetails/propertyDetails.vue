<template>
  <view>
    <!--  邢军成· 上方tab栏 -->

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
      <view v-if="current === 0" />

      <view v-if="current === 1">
        <view>
          <view>
            <card-list :cards="cards" />
          </view>
        </view>
      </view>
      <view v-if="current === 2">
        <card-Process :flow="flow" />
      </view>
    </view>
  </view>
</template>

<script>
	import cardList from '@/components/card-Details/card-Details.vue';
	import cardProcess from '../../components/card-Process/card-Process.vue';

	//定义全局参数，控制数据加载

	export default {

		components: {
			cardList,
			cardProcess
		},
		onLoad: function(option) {
			//页面之间进行的传值
			this.current = parseInt(option.key);
			setTimeout(function() {
				console.log('start pulldown');
			}, 1000);
			uni.startPullDownRefresh();
			this.getCardList();
			this.current = 0;
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
		data() {

			return {
				//	tab栏
				items: ['数据', '流程动态', '流转图'],
				// 	流程动态 cards数据
				cards: [{
						title:'提交申请',
						time: '2022-04-05 14:23',
						userImg: '/static/indexImage/useImg.jpg',
						user: 'taffy',
						isSuccess: 0,
						startTime: '2022-03-05 14:22',
						handleTime: '1分15秒'
					},
					{
						title:'提交申请',
						time: '2022-04-05 14:23',
						userImg: '/static/indexImage/useImg.jpg',
						user: 'taffy',
						isSuccess: 1,
						startTime: '2022-03-05 14:22',
						handleTime: '1分15秒'
					}, {
						title:'提交申请',
						time: '2022-04-05 14:23',
						userImg: '/static/indexImage/useImg.jpg',
						user: 'taffy',
						isSuccess: 0,
						startTime: '2022-03-05 14:22',
						handleTime: '1分15秒'
					}, {
						title:'提交申请',
						time: '2022-04-05 14:23',
						userImg: '/static/indexImage/useImg.jpg',
						user: 'taffy',
						isSuccess: 0,
						startTime: '2022-03-05 14:22',
						handleTime: '1分15秒'
					}
				],
				list2: [{
					title: '买家下单',
					desc: '2018-11-11'
				}, {
					title: '卖家发货',
					desc: '2018-11-12'
				}, {
					title: '买家签收',
					desc: '2018-11-13'
				}, {
					title: '交易完成',
					desc: '2018-11-14'
				}],
				flow: [{
						title: '流程',
						process: [{
							url: '/static/indexImage/useImg.jpg',
							apply: '发起申请',
							user: '邢军成',
							status: true,
							time: '04.16 07:13',
							process: '/static/indexImage/process.png',
							count: '2',
							icon: ['/static/indexImage/complete.png', '/static/indexImage/await.png'],
							capacity:'发起申请',		
						},{
							url: '/static/indexImage/useImg.jpg',
							capacity: '抄送人',
							apply: '发起申请',
							user: '搜索',
							time: '04.16 07:13',
							process: '/static/indexImage/process.png',
							count: '2',
							userinfo: [{
									url: '/static/indexImage/useImg.jpg',
									title: 'abc',
									status: true,
								},
								{
									url: '/static/indexImage/useImg.jpg',
									title: 'abc'
								},
								{
									url: '/static/indexImage/useImg.jpg',
									title: 'abc'
								},
								{
									url: '/static/indexImage/useImg.jpg',
									title: 'abc'
								},
								{
									url: '/static/indexImage/useImg.jpg',
									title: 'abc'
								},
								{
									url: '/static/indexImage/useImg.jpg',
									title: 'abc'
								},
							],
							icon: ['/static/indexImage/complete.png', '/static/indexImage/await.png'],
						}, {
							url: '/static/indexImage/useImg.jpg',
							capacity: '抄送人',
							apply: '发起申请',
							user: 'taffy',
							time: '04.16 07:13',
							process: '/static/indexImage/process.png',
							count: '2',
							userinfo: [{
									url: '/static/indexImage/useImg.jpg',
									title: 'abc'
								},
								{
									url: '/static/indexImage/useImg.jpg',
									title: 'abc'
								},
								{
									url: '/static/indexImage/useImg.jpg',
									title: 'abc'
								},
								{
									url: '/static/indexImage/useImg.jpg',
									title: 'abc'
								},

							],
							icon: ['/static/indexImage/complete.png', '/static/indexImage/await.png'],





						}, {
							url: '/static/indexImage/useImg.jpg',
							capacity: '审批人',
							apply: '发起申请',
							user: 'taffy',
							time: '04.16 07:13',
							process: '/static/indexImage/process.png',
							count: '2',
							userinfo: [{
									url: '/static/indexImage/useImg.jpg',
									title: 'abc'
								},
								{
									url: '/static/indexImage/useImg.jpg',
									title: 'abc'
								},
								{
									url: '/static/indexImage/useImg.jpg',
									title: 'abc'
								},
								{
									url: '/static/indexImage/useImg.jpg',
									title: 'abc'
								},

							],
							icon: ['/static/indexImage/complete.png', '/static/indexImage/await.png'],	
						} ]
					},
					{
						title: '流程',
						process: [{

							url: '/static/indexImage/useImg.jpg',
							apply: '发起申请',
							user: 'taffy',
							time: '04.16 07:13',
							status: false,
							process: '/static/indexImage/process.png',
							count: '2',
							userinfo: [{
									url: '/static/indexImage/useImg.jpg',
									title: 'abc',
									status: false,
								},
								{
									url: '/static/indexImage/useImg.jpg',
									title: 'abc'
								},
								{
									url: '/static/indexImage/useImg.jpg',
									title: 'abc'
								},
								{
									url: '/static/indexImage/useImg.jpg',
									title: 'abc'
								},
								{
									url: '/static/indexImage/useImg.jpg',
									title: 'abc'
								},
								{
									url: '/static/indexImage/useImg.jpg',
									title: 'abc'
								},
							],
							icon: ['/static/indexImage/complete.png', '/static/indexImage/await.png'],	
					
						}, ]
					},
				],
				
				current: 0,
				colorIndex: 0,
				activeColor: '#000000',
				styleType: 'tab',
			};
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
				// console.log(this.cards);
				//向cards这个数组中重复添加这个数组
				var aa = this.cards;
				this.cards = [...aa, ...aa];
				uni.stopPullDownRefresh(); //得到数据后停止刷新

			},

		}
	};
</script>
<style lang="scss" scoped>
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

		.aa {
			background-color: #ffffff;
			margin: 10rpx;
			padding: 10px;
			box-shadow: 0rpx 12rpx 8rpx -12rpx #CCCCCC;
			border-radius: 15rpx;

			.status-btn {
				/* #ifndef APP-NVUE */
				display: flex;
				/* #endif */
				flex-direction: row;
				align-items: center;
				justify-content: center;
				height: 92rpx;
				margin: 30rpx;
				background-color: #007AFF;
			}

			.example-body {
				/* #ifndef APP-NVUE */
				display: block;
				/* #endif */
				padding: 15px;
				flex-direction: row;
			}
		}
	}
</style>

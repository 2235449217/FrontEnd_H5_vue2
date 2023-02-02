<template>
  <!-- tab 我的待办  卡片 组件  - 位小茹 -->
  <view class="card_list">
    <!-- cards 根据 :cards="cards0-3 选择对应的卡片" -->
    <view
      v-for="(item,index) in cards"
      :key="index"
      class="card"
      :index="index"
      @click="clickCard()"
    >
      <!-- 卡片上方-->
      <view class="title">
        <!-- 卡片上方信息 -->
        <view class="title-context">
          <!-- 标题 -->
          <view class="titleText">
            {{ item.nodeTitl }}
          </view>
          <!-- 时间或者标签 -->
          <view :class="[labels==='time'?'time':[item.label===0?'endStatus':'tabStatus']]">
            {{ getTextLabel(item.label) }}
          </view>
        </view>
      </view>
      <!-- 当前节点  三元表达式 -->
      <view :class="[node==='current'?'currentNode':'none']">
        当前节点：
        <text>{{ item.currentNode }}</text>
      </view>
      <!-- 卡片流程 -->
      <view class="content-step">
        <uni-steps
          :options="list"
          active-color="#007AFF"
          direction="column"
        />
        <!-- 发起人-申请人名称 -->
        <view class="apply-name">
          <text>{{ item.applicant }}</text>
          <text v-if="item.inspector">
            {{ item.inspector[0] }}
          </text>
        </view>
      </view>
      <!-- 提交状态  -->
      <view
        class="submitStatus"
        :style="{'color':item.checkState === 0? '#ff0000' :'rgb(41, 121, 255)' }"
      >
        {{ getTextByStatus(item.checkState) }}
      </view>
    </view>
  </view>
</template>

<script>
	export default {
		name: 'CardList',
		props: {
			// props数据验证
			// 在我们需要对自己的组件进行数据验证时，此时使用props就需要使用对象写法了。----可以在里面写一些默认值
			cards: {
				type: Array,
				default: function() {
					return ['cards'];
				},
			} //全写
				// props:['cadrs'],---缩写
			,
			labels: {
				type: String,
				default: 'tabStatus'
			},
			node: {
				type: String,
				default: 'current'
			},
			
		},
		data(){
			return{ list: [{ title: '当前负责人', }, { title: '申请人', }] };
		},
		methods: {
			clickCard() {
				uni.navigateTo({ url: '../../pages/propertyDetails/propertyDetails' });
			},
			getTextByStatus(status) {
				switch (status) {
					case 1:
						return '提交成功';
					case 0:
						return '提交失败';
				}
			},
			getTextLabel(label) {
				switch (label) {
					case 1:
						return '进行中';
					case 2:
						return '已完成';
					case 3:
						return '已结束';
					default:
						return label;
				}
			}
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
		margin: 30rpx auto;
		width: 98%;
		background-color: #FFFFFF;
		border-radius: 14rpx;
		box-shadow: 4rpx 4rpx 10rpx #DCDCDC;

		.title {
			width: 100%;

			.title-context {
				display: flex;
				justify-content: space-between;
				margin: 0 auto;
				padding: 10rpx;
				// 它的作用是设置flex子项在每个flex行的交叉轴上的默认对齐方式
				align-items: center;

				.titleText {
					margin-left: 20rpx;
					margin-top: 20rpx;
					font-weight: 700;
					font-size: 34rpx;

				}

				.time {
					margin: 6rpx 25rpx 0 0;
					font-family: ui-monospace;
					font-size: 20rpx;
					color: #8F939C;
				}

				.tabStatus {
					width: 130rpx;
					height: 40rpx;
					line-height: 40rpx;
					text-align: center;
					margin: 6rpx 25rpx 0 0;
					border: 1px solid rgb(41, 121, 255);
					border-radius: 30rpx;
					background-color: rgba($color: #aaffff, $alpha: 0.3);
					color: rgb(41, 121, 255);
					font-size: 26rpx;
				}

				.endStatus {
					width: 130rpx;
					height: 40rpx;
					line-height: 40rpx;
					text-align: center;
					margin: 6rpx 25rpx 0 0;
					border: 1px solid #d7d7d7;
					border-radius: 30rpx;
					background-color: #e5e9e9;
					color: #b3b3b3;
					font-size: 26rpx;
				}
			}
		}

		.content-step {
			height: 160rpx;
			margin-left: 30rpx;
			display: flex;
			.apply-name{
				width: 100%;
				height: 140rpx;
				margin-right: 200rpx;
				display: flex;
				flex-direction: column;
				text{
					padding-top:6rpx ;
					height: 70rpx;
					line-height: 70rpx;
					font-size: 30rpx;
				}
			}
		}

		.submitStatus {
			margin-left: 30rpx;
			padding-bottom: 30rpx;
			font-size: 25rpx;
			// color: #ff0000;
		}

		.currentNode {
			margin-left: 30rpx;
			font-size: 30rpx;
			color: #8F939C;

			text {
				color: #000;
			}
		}

		.none {
			display: none;
		}
	}
</style>

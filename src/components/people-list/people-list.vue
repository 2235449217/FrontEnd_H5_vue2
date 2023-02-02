<template>
  <!-- 通讯录  位晓茹 -->
  <view class="people_list">
    <!-- 循环遍历 peoples数组 -->
    <view
      v-for="(item,index) in peoples"
      :key="index"
      class="people"
    >
      <view class="head-content department">
        <image
          class="userImg"
          :src="'https://www.cppwnn.top/api/'+item.headerImg"
        />
        <view
          class="rightBox departmentBox "
          :style="{'borderBottom':index+1 === peoples.length?0:border}"
        >
          <text
            class="userName departmentTitle"
          >
            {{ item.userName }}
          </text>
          <view
            v-show="item.authority"
            class="identityLabel"
          >
            {{ item.authority.authorityName }}
          </view>
        </view>
      </view>
    </view>
    </image>
  </view>
  </view>
</template>

<script>
	export default {
		name: 'PeopleList',
		props:{ 
			peoples:{
				type:Array,
				default:function(){
					return['peoples'];
				}
			},
			border:{
				type:String,
				default:'1px solid #e8e8e8'
			}
		 },
		methods:{
			navigator(id){
				console.log(id);
			}
		}
	};
</script>

<style lang="scss" scoped>
	.people {
		display: flex;
		padding-left: 30rpx;
		padding-top: 30rpx;
		align-items: center;
		// justify-content: space-between;
		// margin: 30rpx;

		.head-content {
			width: 100%;
			display: flex;
			height: 100rpx;
			align-items: center;
			.userImg {
				width: 80rpx;
				height: 80rpx;
				border-radius: 50%;
				margin-right: 30rpx;
			}
			.rightBox{
				width: 620rpx;
				height: 100rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.identityLabel{
					width: 160rpx;
					height: 50rpx;
					margin-right: 30rpx;
					text-align: center;
					line-height: 50rpx;
					color: #06a0ff;
					background-color:#d5f6ff ;
					border-radius: 30rpx;
					font-size: 16rpx;
				}
			}
			
		}
	}
</style>

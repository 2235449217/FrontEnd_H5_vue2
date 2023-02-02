
<template>
  <!-- 登陆  邢军成 -->
  <view class="container">
    <view class="bg bg-color-base margin-b20" />

    <view class="tab vs-row vs-align-center">
      <image
        class="tab-bg"
        src="/static/login/banner-icon.png"
        mode=""
      />

      <view class="vs-row vs-align-center logreg">
        <view
          class="vs-column vs-align-center margin-r40"
          @click="cur = 0"
        >
          <text
            class="font-50 margin-b140"
            :class="[cur ? 'color-black-3': 'color-base']"
          >
            登录
          </text>
          <view
            v-if="!cur"
            class="line bg-color-base"
          />
        </view>
      </view>
    </view>

    <view class="login margin-b80">
      <view
        v-show="isfocus"
        class="prompt "
      >
        <view class="prompt-content  ">
          <text id="warnText">
            手机号或密码错误
          </text>
        </view>
      </view>
      <view class="input vs-row vs-align-center margin-b40">
        <image
          class="input-icon margin-r20"
          src="/static/login/account.png"
          mode=""
        />
        <input
          v-model="phone"
          class="vs-flex-item color-base font-30"
          type="text"
          value=""
          name="phone"
          :maxlength="11"
          placeholder="请输入您的手机号"
          placeholder-class="input-placeholder"
        >
      </view>
      <view class="input vs-row vs-align-center margin-b40">
        <image
          class="input-icon margin-r20"
          src="/static/login/password.png"
          mode=""
        />
        <input
          v-model="password"
          class="vs-flex-item color-base font-30"
          type="text"
          password
          value=""
          name="password"
          placeholder="请输入您的登录密码"
          placeholder-class="input-placeholder"
        >
      </view>
    </view>

    <view class="button bg-color-base vs-row vs-align-center vs-space-center margin-b20">
      <text
        class="color-white font-34"
        @tap="clickLogin()"
      >
        立即登录
      </text>
    </view>

    <view class="forget vs-row vs-align-center vs-space-center margin-b100">
      <text
        class="color-base font-28"
        @tap="toast1Tap"
      >
        忘记密码？
      </text>
    </view>
  </view>
  </view>
</template>

<script>
	// import { login } from '@/api/login';

	export default {
		data() {
			return {
				cur: 0,
				isfocus: false,
				phone: null,
				password: null,
				login: [{
						phone: '13233805695',
						password: 1111111
					},

				]
			};

		},
		methods: {

			// clickChange() {
			// 	uni.switchTab({ url: '../index/index' });
			// },
			toast1Tap: function() {
				uni.showModal({
					title: '提示',
					content: '请联系管理员',
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});

			},
			//手机号正则
			PhoneNum(value) {
				return /^1[3-9]\d{9}$/.test(value);
			},
			//密码正则
			Password(value) {
				return /^.{5,20}$/.test(value);
			},
			clickLogin() {
				this.isfocus = true;
				let verify = document.getElementById('warnText');
				if (!this.PhoneNum(this.phone)) {
					verify.innerHTML = '请输入正确的11位手机号';
					// console.log(verify);

				} else if (!this.Password(this.password)) {
					verify.innerHTML = '密码错误请重新输入';
				} else {
					uni.switchTab({ url: '../index/index' });
				}
			},


		}
	};
</script>

<style lang="scss">
	.container {
		position: relative;
	}

	.forget {
		padding-left: 80rpx;
	}

	.prompt {
		margin: 0 60rpx;
		margin-top: 40rpx;
		height: 90rpx;
		background-color: #ffeeec;
		border-radius: 24rpx;

		.prompt-content {
			color: #e64340;
			line-height: 90rpx;
			margin-left: 50rpx;

		}
	}

	.logreg {
		display: flex;
		margin-top: 50rpx;
	}

	.bg {
		position: relative;
		width: 750rpx;
		height: 400rpx;
	}

	.tab {
		position: absolute;
		top: 250rpx;
		left: 20rpx;
		right: 20rpx;
		height: 150rpx;
		padding: 0 50rpx;
		background-color: #fff;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;

		&-bg {
			position: absolute;
			top: -200rpx;
			right: -50rpx;
			width: 440rpx;
			height: 285rpx;
		}
	}

	.line {
		width: 25rpx;
		height: 7rpx;
	}

	.register {
		padding: 0 60rpx;


	}

	.input {
		width: 580rpx;
		height: 90rpx;
		margin: 50rpx auto;
		background-color: rgba(80, 100, 235, 0.1);
		border-radius: 25rpx;
		display: flex;
		justify-content: space-around;
		padding-left: 50rpx;

		&-icon {
			width: 30rpx;
			height: 38rpx;
		}

		&-placeholder {
			color: #5064eb;
		}
	}

	.button {
		width: 630rpx;
		height: 90rpx;
		margin-left: 60rpx;
		border-radius: 25rpx;
		text-align: center;
		line-height: 90rpx;
	}

	.separator {
		height: 2rpx;
		margin: 0 30rpx;
		background-color: #f5f5f5;
	}

	.other {
		&-items {
			padding: 0 200rpx;
		}

		&-icon {
			width: 50rpx;
			height: 50rpx;
		}
	}
</style>

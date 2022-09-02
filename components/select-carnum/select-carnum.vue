<template>
	<view v-if="showPopup" class="uni-popup">
		<view :class="[ani, animation ? 'ani' : '', !custom ? 'uni-custom' : '']" class="uni-popup__mask" @click="close(true)" />
		<view :class="[type, ani, animation ? 'ani' : '', !custom ? 'uni-custom' : '']" class="uni-popup__wrapper" @click="close(true)">
			<view class="uni-popup__wrapper-box" style="border-radius: unset;" @click.stop="clear">
				<view class="title_outer flex_between">
					<view class="close_title" @click="close(true)">
						取消
					</view>
					<view class="center_title">
						请输入车牌号
					</view>
					<view class="cancle_title" @click="confirm">
						确定
					</view>
				</view>
				<view class="inp_outer flex_between">
					<block v-for="(inpitem,inpindex) in inplist" :key="inpindex">
						<view v-if="inpindex != 2" class="left_inp public_title flex_center_around" :class="{active : inpIndex == inpindex}"
						 @click="changeIndex(inpindex)">{{inpitem.title}}</view>
						<view v-else class="right_inp public_title flex_center_around" :class="{active : inpIndex == inpindex}" @click="changeIndex(inpindex)">{{inpitem.title}}</view>
					</block>
				</view>
				<view class="keyboard">
					<view class="flex_center">
						<view class="flex-row-wrap" style="width: 100%;">
							<block v-for="(item,index) in list" :key='index'>
								<view :class="{zmactive : index > 23 && inpIndex == 1}" class="keyboard_title flex_center_around" @click="cityTitle(item.title,index)">
									{{item.title}}
								</view>
							</block>
						</view>
					</view>
					<view class="close flex_center_around" @click="deleteTo()">
						<text class="lg text-gray cuIcon-close"></text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
 
<script>
	export default {
		name: 'selectCarNum',
		props: {
			// 开启动画
			animation: {
				type: Boolean,
				default: true
			},
			// 弹出层类型，可选值，top: 顶部弹出层；bottom：底部弹出层；center：全屏弹出层
			type: {
				type: String,
				default: 'center'
			},
			// 是否开启自定义
			custom: {
				type: Boolean,
				default: false
			},
			// maskClick
			maskClick: {
				type: Boolean,
				default: true
			},
			show: {
				type: Boolean,
				default: true
			},
			defProv:{
				type:String,
				default:'渝'
			},
			defChar:{
				type:String,
				default:'H'
			},
			gua: {
				type: Boolean,
				default: false
			} // 是否是挂车号
		},
		data() {
			return {
				ani: '',
				showPopup: false,
				list: [], // 显示渲染的列表
				citylist: [{
						title: '京'
					}, {
						title: '津'
					}, {
						title: '沪'
					}, {
						title: '渝'
					},
					{
						title: '冀'
					}, {
						title: '豫'
					}, {
						title: '云'
					}, {
						title: '辽'
					},
					{
						title: '黑'
					}, {
						title: '湘'
					}, {
						title: '皖'
					}, {
						title: '鲁'
					},
					{
						title: '新'
					}, {
						title: '苏'
					}, {
						title: '浙'
					}, {
						title: '赣'
					},
					{
						title: '鄂'
					}, {
						title: '桂'
					}, {
						title: '甘'
					}, {
						title: '晋'
					},
					{
						title: '蒙'
					}, {
						title: '陕'
					}, {
						title: '吉'
					}, {
						title: '闽'
					},
					{
						title: '贵'
					}, {
						title: '粤'
					}, {
						title: '青'
					}, {
						title: '藏'
					},
					{
						title: '川'
					}, {
						title: '宁'
					}, {
						title: '琼'
					}, {
						title: '澳'
					},
					{
						title: '台'
					}
				], // 车牌头部文字的列表
				zimulist: [{
						title: 'A'
					}, {
						title: 'B'
					}, {
						title: 'C'
					}, {
						title: 'D'
					},
					{
						title: 'E'
					}, {
						title: 'F'
					}, {
						title: 'G'
					}, {
						title: 'H'
					},
					{
						title: 'J'
					}, {
						title: 'K'
					}, {
						title: 'L'
					}, {
						title: 'M'
					},
					{
						title: 'N'
					}, {
						title: 'P'
					}, {
						title: 'Q'
					}, {
						title: 'R'
					},
					{
						title: 'S'
					}, {
						title: 'T'
					}, {
						title: 'U'
					}, {
						title: 'V'
					},
					{
						title: 'W'
					}, {
						title: 'X'
					}, {
						title: 'Y'
					}, {
						title: 'Z'
					},
					{
						title: '0'
					}, {
						title: '1'
					}, {
						title: '2'
					}, {
						title: '3'
					},
					{
						title: '4'
					}, {
						title: '5'
					}, {
						title: '6'
					}, {
						title: '7'
					},
					{
						title: '8'
					}, {
						title: '9'
					}, {
						title: '挂'
					}
				], // 车牌开头字母的列表
				// gualist:[], // 挂车号
				inplist: [{
					title: ''
				}, {
					title: ''
				}, {
					title: ''
				}], // 车牌号
				ary: [], // 三级框的数字和字母
				chehao: '', //最后显示的车牌号
				noorder: false, // 判断是否按顺序填写
				inpIndex: 0 // 获取车牌输入框的下表
			}
		},
		watch: {
			show(newValue) {
				if (newValue) {
					this.open()
				} else {
					this.close()
				}
			}
		},
		created() {},
		/**
		 * 模板渲染完成 节点操作
		 */
		mounted() {
			this.list = this.citylist
		},
		methods: {
			clear() {},
			// 控制弹框的显示
			open() {
				this.$emit('change', {
					show: true
				})
				this.list = this.zimulist
				this.inpIndex = 2
				this.inplist = [{
					title: this.defProv
				}, {
					title: this.defChar
				}, {
					title: ''
				}]
				this.ary = []
				this.showPopup = true
				this.$nextTick(() => {
					setTimeout(() => {
						this.ani = 'uni-' + this.type
					}, 30)
				});
				this.$emit('getCarNum', this.inplist);
			},
			// 控制弹框的隐藏
			close(type) {
				if (!this.maskClick && type) return
				this.$emit('change', {
					show: false
				})
				this.ani = ''
				this.$nextTick(() => {
					setTimeout(() => {
						this.showPopup = false
					}, 200)
				})
			},
			// 点击确定
			confirm() {
				for (let i = 0; i < this.inplist.length; i++) {
					if (!this.inplist[i].title && i < 2) {
						uni.showToast({
							title: "请填写正确的车牌号！",
							icon: "none"
						})
						return
					}
					if (i == 2) {
						if (this.inplist[2].title.length == 5) {
							this.chehao = this.inplist[0].title + this.inplist[1].title + this.inplist[2].title
							this.$emit('confirm', this.chehao);
							this.close();
						} else {
							uni.showToast({
								title: "请填写正确的车牌号！",
								icon: "none"
							})
						}
					}
				}
			},
			// 选择车牌号开头的字
			cityTitle(title, index) {
				if (this.inpIndex == 0) {
					this.inplist[0].title = title
					this.inpIndex = 1
					this.list = this.zimulist
					this.pandaun()
				} else if (this.inpIndex == 1 && index < 24) {
					this.inplist[1].title = title
					this.inpIndex = 2
					this.list = this.zimulist
					this.pandaun()
				} else if (this.inpIndex == 2) {
					if (this.inplist[2].title.length < 4 && index == 34) {
						// 阻止“挂”按键点击
						return
					}
					if (this.gua) {
						if (this.inplist[2].title.length < 4) {
							this.ary.push(title)
						}
						if (this.inplist[2].title.length == 4) {
							this.ary.push('挂')
							this.pandaun()
						}
					} else {
						// if (index == 34) {
						// 	// 阻止“挂”按键点击
						// 	return
						// }
						if (this.inplist[2].title.length < 5) {
							this.ary.push(title)
						}
						if (this.inplist[2].title.length == 5) {
							this.pandaun()
						}
					}
 
					this.inplist[2].title = this.ary.join("")
				} else {
					return
				}
				this.$emit('getCarNum', this.inplist);
				
			},
			// 判断是否点击三个输入框，没按顺序填写
			pandaun() {
				if (this.noorder) {
					for (let i = 0; i < this.inplist.length; i++) {
						if (!this.inplist[i].title) {
							this.inpIndex = i
							this.noorder = false
							if (this.inpIndex == 0) {
								this.list = this.citylist
							} else {
								this.list = this.zimulist
							}
							return
						}
					}
				}
			},
			// 删除操作
			deleteTo() {
				if (this.inpIndex == 0) {
					// this.inplist[0].title = ''
				} else if (this.inpIndex == 1) {
					this.inplist[0].title = ''
					this.inpIndex = 0
					this.list = this.citylist
				} else {
					if (this.inplist[2].title.length > 0) {
						this.ary.pop()
						this.inplist[2].title = this.ary.join("")
					} else {
						this.inplist[1].title = ''
						this.inpIndex = 1
						this.list = this.zimulist
					}
				}
				this.$emit('getCarNum', this.inplist);
			},
			// 点击车牌框
			changeIndex(index) {
				if (this.inpIndex != index) {
					if (index == 1 || index == 2) {
						this.list = this.zimulist
						this.inpIndex = index
						this.noorder = true
					} else {
						this.list = this.citylist
						this.inpIndex = index
						this.noorder = true
					}
				}
			}
		}
	}
</script>
<style scoped lang="scss">
	/* flex布局 */
	.flex-row {
		display: flex;
		flex-direction: row;
	}
 
	/* flex布局,自动换行 */
	.flex-row-wrap {
		display: flex;
		flex-wrap: wrap;
	}
 
	/* 水平两端对齐 */
	.flex_between {
		@extend .flex-row;
		justify-content: space-between;
	}
 
	/* 水平居中对齐 */
	.flex_center {
		@extend .flex-row;
		justify-content: center;
	}
 
	/* 水平平均垂直居中 */
	.flex_center_around {
		@extend .flex-row;
		justify-content: space-around;
		align-items: center;
	}
 
	.uni-popup {
		position: fixed;
		/*  #ifdef  H5 || APP-PLUS  */
		top: 0px;
		// top: 50px;
		/*  #endif  */
		/*  #ifndef  H5 || APP-PLUS  */
		top: 0px;
		/*  #endif  */
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 99999;
		overflow: hidden;
 
		&__mask {
			position: absolute;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			z-index: 998;
			background-color: rgba(0, 0, 0, 0.4);
			opacity: 0;
 
			&.ani {
				transition: all 0.3s;
			}
 
			&.uni-top,
			&.uni-bottom,
			&.uni-center {
				opacity: 1;
			}
		}
 
		&__wrapper {
			position: absolute;
			z-index: 999;
			box-sizing: border-box;
 
			&.ani {
				transition: all 0.3s;
			}
 
			&.top {
				top: 10%;
				left: 0;
				width: 100%;
				transform: translateY(-100%);
			}
 
			&.bottom {
				bottom: 0;
				left: 0;
				width: 100%;
				transform: translateY(100%);
			}
 
			&.center {
				width: 100%;
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				transform: scale(1.2);
				opacity: 0;
			}
 
			&-box {
				position: relative;
				box-sizing: border-box;
			}
 
			&.uni-custom {
				& .uni-popup__wrapper-box {
					// padding: 30rpx;
					background-color: #fff;
				}
 
				&.center {
					& .uni-popup__wrapper-box {
						position: relative;
						max-width: 80%;
						max-height: 80%;
						overflow-y: scroll;
						border-radius: 10rpx;
					}
				}
 
				&.top,
				&.bottom {
					& .uni-popup__wrapper-box {
						width: 100%;
						max-height: 500px;
						overflow-y: scroll;
					}
				}
 
				&.bottom {
					& .uni-popup__wrapper-box {
						border-top-right-radius: 30rpx;
						border-top-left-radius: 30rpx;
					}
				}
 
				&.top {
					& .uni-popup__wrapper-box {
						border-bottom-right-radius: 30rpx;
						border-bottom-left-radius: 30rpx;
					}
				}
			}
 
			&.uni-top,
			&.uni-bottom {
				transform: translateY(0);
			}
 
			&.uni-center {
				transform: scale(1);
				opacity: 1;
			}
		}
	}
 
	.title_outer {
		padding: 30rpx;
		border-bottom: 1rpx solid #DEDEDE;
 
		.close_title {
			font-size: 34rpx;
		}
 
		.center_title {
			font-size: 34rpx;
		}
 
		.cancle_title {
			font-size: 34rpx;
			color: red;
		}
	}
 
	.inp_outer {
		margin: 20rpx 180rpx;
 
		.left_inp {
			width: 80rpx;
		}
 
		.right_inp {
			width: 190rpx;
		}
 
		.public_title {
			height: 80rpx;
			border-radius: 6rpx;
			border: 1rpx solid #DEDEDE;
			font-weight: bold;
			font-size: 34rpx;
		}
 
		.active {
			border: 1rpx solid red !important;
		}
	}
 
	.keyboard {
		background-color: #F1F1F1;
		width: 98%;
		margin-left: 1%;
		// margin: 5rpx 0;
		margin-bottom: 1%;
		position: relative;
 
		.keyboard_title {
			width: 16%;
			height: 80rpx;
			background-color: #FFFFFF;
			margin: 0.33%;
			box-shadow: 2rpx 2rpx 5rpx 2rpx #888888;
			border-radius: 8rpx;
		}
 
		.keyboard_title:active {
			background-color: #AAAAAA;
			opacity: 0.5; //这里重要，就是通过这个透明度来设置
		}
 
		.zmactive {
			color: #999999;
			background-color: #F1F1F1;
		}
 
		.close {
			width: 16%;
			height: 80rpx;
			background-color: #FFFFFF;
			box-shadow: 2rpx 2rpx 5rpx 2rpx #888888;
			border-radius: 8rpx;
			position: absolute;
			bottom: 0.33%;
			right: 0.33%;
 
			.close_img {
				width: 50rpx;
			}
		}
	}
</style>
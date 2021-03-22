<template>
	<view>
		<view class="plate-context">
			<view class="ak_row_black">
			</view>
			<view class="ak_row_title">
				<text>{{communityName}}</text>
			</view>

			<view class="tips_block">
			</view>

			<view class='tips'>
				<text>点击方框输入车牌号</text>
			</view>
			<view class="plate-input-body">
				<view class="plate-input-content" v-if="flag">
					<view bindtap="inputClick" data-id="0" :class="inputOnFocusIndex=='0'?'plate-nums-foc':'plate-nums-first'">
						<text class="plate-num-text">{{inputPlates.index0}}</text>
					</view>
					<view bindtap="inputClick" data-id="1" :class="inputOnFocusIndex=='1'?'plate-nums-foc':'plate-nums-first'">
						<text class="plate-num-text">{{inputPlates.index1}}</text>
					</view>
					<view bindtap="inputClick" data-id="2" :class="inputOnFocusIndex=='2'?'plate-nums-foc':'plate-nums-first'">
						<text class="plate-num-text">{{inputPlates.index2}}</text>
					</view>
					<view bindtap="inputClick" data-id="3" :class="inputOnFocusIndex=='3'?'plate-nums-foc':'plate-nums-first'">
						<text class="plate-num-text">{{inputPlates.index3}}</text>
					</view>
					<view bindtap="inputClick" data-id="4" :class="inputOnFocusIndex=='4'?'plate-nums-foc':'plate-nums-first'">
						<text class="plate-num-text">{{inputPlates.index4}}</text>
					</view>
					<view bindtap="inputClick" data-id="5" :class="inputOnFocusIndex=='5'?'plate-nums-foc':'plate-nums-first'">
						<text class="plate-num-text">{{inputPlates.index5}}</text>
					</view>
					<view bindtap="inputClick" data-id="6" :class="inputOnFocusIndex=='6'?'plate-nums-foc':'plate-nums-first'">
						<text class="plate-num-text">{{inputPlates.index6}}</text>
					</view>
				</view>
				<view class="new-plate-input-content" v-else>
					<view bindtap="inputClick" data-id="0" :class="inputOnFocusIndex=='0'?'plate-nums-foc':'plate-nums-first'">
						<text class="plate-num-text">{{inputPlates.index0}}</text>
					</view>
					<view bindtap="inputClick" data-id="1" :class="inputOnFocusIndex=='1'?'plate-nums-foc':'plate-nums-first'">
						<text class="plate-num-text">{{inputPlates.index1}}</text>
					</view>
					<view bindtap="inputClick" data-id="2" :class="inputOnFocusIndex=='2'?'plate-nums-foc':'plate-nums-first'">
						<text class="plate-num-text">{{inputPlates.index2}}</text>
					</view>
					<view bindtap="inputClick" data-id="3" :class="inputOnFocusIndex=='3'?'plate-nums-foc':'plate-nums-first'">
						<text class="plate-num-text">{{inputPlates.index3}}</text>
					</view>
					<view bindtap="inputClick" data-id="4" :class="inputOnFocusIndex=='4'?'plate-nums-foc':'plate-nums-first'">
						<text class="plate-num-text">{{inputPlates.index4}}</text>
					</view>
					<view bindtap="inputClick" data-id="5" :class="inputOnFocusIndex=='5'?'plate-nums-foc':'plate-nums-first'">
						<text class="plate-num-text">{{inputPlates.index5}}</text>
					</view>
					<view bindtap="inputClick" data-id="6" :class="inputOnFocusIndex=='6'?'plate-nums-foc':'plate-nums-first'">
						<text class="plate-num-text">{{inputPlates.index6}}</text>
					</view>
					<view bindtap="inputClick" data-id="7" :class="inputOnFocusIndex=='7'?'plate-nums-foc':'plate-nums-first'">
						<text class="plate-num-text">{{inputPlates.index7}}</text>
					</view>
				</view>
			</view>
			<view class='plate-input-flag' bindtap='changeplate'>
				<text>{{carNumBtn}}</text>
			</view>

			<view class="plat-btn-black"></view>

			<view class="plat-btn">
				<van-button type="primary" :disabled="carNumBtnDisable" bind:click="queryCarNum" block>立即查询</van-button>

			</view>
		</view>
		<!--键盘-->
		<view class="keyboard" v-if="isKeyboard">
			<view class="kb_top">
				<text @click="tapSpecBtn" data-index="1" style="position:absolute;right:0;display:block;height:74rpx;padding:0 34rpx; color:#03BF70;line-height:74rpx; font-size: 30rpx;">关闭</text>
			</view>
			<view style="width:100%; text-align:center;" v-if="!isNumberKB">
				<view style="width:99%;display:flex;text-align:center;margin:0 auto">
					<view @click="tapKeyboard" class="td td_nor" data-index="idx" data-val="itemName" hoverClass="board_bg"
					 hoverStartTime="0" hoverStayTime="80" v-if="idx<=9" v-for="(itemName,index) in keyboard1" v-for-index="idx"
					 v-for-item="itemName" v-key="itemName">
						{{itemName}}
					</view>
				</view>
				<view style="display:flex;text-align:center; width:90%;margin:0 auto">
					<view @click="tapKeyboard" class="td td_nor" data-index="idx" data-val="itemName" hoverClass="board_bg"
					 hoverStartTime="0" hoverStayTime="80" v-if="idx<=18&&idx>9" v-for="(itemName,index) in keyboard1" v-key="itemName">
						{{itemName}}
					</view>
				</view>
				<view style="display:flex;text-align:center; width:70%;margin:0 auto">
					<view @click="tapKeyboard" class="td td_nor" data-index="idx" data-val="itemName" hoverClass="board_bg"
					 hoverStartTime="0" hoverStayTime="80" v-if="idx<=25&&idx>18" v-for="(itemName,index) in keyboard1" v-for-index="idx"
					 v-for-item="itemName" v-key="itemName">
						{{itemName}}
					</view>
				</view>
				<view style="display:flex; width:50%;margin:0 auto;text-align:center;">
					<view @click="tapKeyboard" class="td td_nor" data-index="idx" data-val="itemName" hoverClass="board_bg"
					 hoverStartTime="0" hoverStayTime="80" v-if="idx>25" v-for="(itemName,index) in keyboard1" v-for-index="idx"
					 v-for-item="itemName" v-key="itemName">
						{{itemName}}
					</view>
				</view>
				<view bindtap="tapSpecBtn" class="del-first" data-index="0" hoverClass="del-hover" hoverStartTime="0" hoverStayTime="80">
					<!-- <image class="del-img" data-index="0" mode="scaleToFill" src="../../images/delete.png"></image> -->
					<text data-index="0" class="iconfont iconiconfonttuige2"></text>
				</view>
			</view>
			<view style="width:100%; text-align:center;" v-if="isNumberKB">
				<view style="width:99%;display:flex;text-align:center;margin:0 auto">
					<view class="td td_num board_bg" v-if="!tapNum&&idx<=9" v-for="(itemName,index) in keyboardNumber" v-for-index="idx"
					 v-for-item="itemName" v-key="itemName">
						{{itemName}}
					</view>
				</view>
				<view style="width:99%;display:flex;text-align:center;margin:0 auto">
					<view @click="tapKeyboard" class="td td_num" data-index="idx" data-val="itemName" hoverClass="board_bg"
					 hoverStartTime="0" hoverStayTime="80" v-if="tapNum&&idx<=9" v-for="(itemName,index) in keyboardNumber"
					 v-for-index="idx" v-for-item="itemName" v-key="itemName">
						{{itemName}}
					</view>
				</view>
				<view style="width:99%;display:flex;text-align:center;margin:0 auto">
					<view @click="tapKeyboard" class="td td_num" data-index="idx" data-val="itemName" hoverClass="board_bg"
					 hoverStartTime="0" hoverStayTime="80" v-if="idx>9&&idx<=19" v-for="(itemName,index) in keyboardNumber"
					 v-for-index="idx" v-for-item="itemName" v-key="itemName">
						{{itemName}}
					</view>
				</view>
				<view style="width:99%;display:flex;text-align:center;margin:0 auto">
					<view @click="tapKeyboard" class="td td_num" data-index="idx" data-val="itemName" hoverClass="board_bg"
					 hoverStartTime="0" hoverStayTime="80" v-if="idx>19&&idx<=29" v-for="(itemName,index) in keyboardNumber"
					 v-for-index="idx" v-for-item="itemName" v-key="itemName">
						{{itemName}}
					</view>
				</view>
				<view style="width:69%;display:flex;text-align:left; margin-left:5rpx;">
					<view @click="tapKeyboard" class="td td_num" data-index="idx" data-val="itemName" hoverClass="board_bg"
					 hoverStartTime="0" hoverStayTime="80" v-if="idx>29&&idx<=33" v-for="(itemName,index) in keyboardNumber"
					 v-for-index="idx" v-for-item="itemName" v-key="itemName">
						{{itemName}}
					</view>
					<view class="td td_num board_bg" v-if="!tapNum&&idx>33" v-for="(itemName,index) in keyboardNumber" v-for-index="idx"
					 v-for-item="itemName" v-key="index">
						{{itemName}}
					</view>
					<view @click="tapKeyboard" class="td td_num" data-index="idx" data-val="itemName" hoverClass="board_bg"
					 hoverStartTime="0" hoverStayTime="80" v-if="tapNum&&idx>33" v-for="(itemName,index) in keyboardNumber"
					 v-for-index="idx" v-for-item="itemName" v-key="itemName">
						{{itemName}}
					</view>
				</view>
				<view bindtap="tapSpecBtn" class="del-first" data-index="0" hoverClass="del-hover" hoverStartTime="0" hoverStayTime="80">
					<text data-index="0" class="iconfont iconiconfonttuige2"></text>

				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isKeyboard: !1,
				isNumberKB: !1,
				tapNum: !1,
				disableKey: "1234567890港澳学",
				keyboardNumber: "1234567890ABCDEFGHJKLMNPQRSTUVWXYZ港澳学",
				keyboard1: "京沪粤津冀晋蒙辽吉黑苏浙皖闽赣鲁豫鄂湘桂琼渝川贵云藏陕甘青宁新",
				inputPlates: {
					index0: "青",
					index1: "A",
					index2: "",
					index3: "",
					index4: "",
					index5: "",
					index6: "",
					index7: ""
				},
				inputOnFocusIndex: "",
				flag: true,
				communityName: '',
				communityId: '',
				carNumBtn: '新能源车牌',
				carNum: '',
				carNumBtnDisable: true
			}
		},
		methods: {
			//切换车牌
			changeplate: function(e) {
				var that = this;
				let _flag = this.flag;
				let _carNumBtn = '新能源车牌';
				if (_flag) {
					_flag = false;
					_carNumBtn = '普通车牌';
				} else {
					_flag = true;
					_carNumBtn = '新能源车牌';
				}
				that.flag = _flag;
				that.carNumBtn = _carNumBtn;
				that.inputPlates = {
					index0: "青",
					index1: "A",
					index2: "",
					index3: "",
					index4: "",
					index5: "",
					index6: "",
					index7: ""
				}
			},
			//切换车牌
			changeplate1: function() {
				var that = this;
				let _flag = this.flag;
				if (_flag) {
					_flag = false;
				} else {
					_flag = true;
				}
				that.flag = _flag;
				that.inputPlates = {
					index0: "青",
					index1: "A",
					index2: "",
					index3: "",
					index4: "",
					index5: "",
					index6: "",
					index7: ""
				}
			},

			inputClick: function(t) {
				var that = this;
				console.log('输入框:', t)
				this.inputOnFocusIndex = t.target.dataset.id;
				this.isKeyboard = !0

				if ("0" == this.inputOnFocusIndex) {
					this.tapNum = !1;
					this.isNumberKB = !1
				} else if ("1" == this.inputOnFocusIndex) {
					this.tapNum = !1;
					this.isNumberKB = !0
				} else {
					this.tapNum = !0,
						this.isNumberKB = !0
				}

			},

			//键盘点击事件
			tapKeyboard: function(t) {
				t.target.dataset.index;
				var a = t.target.dataset.val;
				switch (this.inputOnFocusIndex) {
					case "0":
						this.setData({
							"inputPlates.index0": a,
							inputOnFocusIndex: "1"
						});
						break;

					case "1":
						this.setData({
							"inputPlates.index1": a,
							inputOnFocusIndex: "2"
						});
						break;

					case "2":
						this.setData({
							"inputPlates.index2": a,
							inputOnFocusIndex: "3"
						});
						break;

					case "3":
						this.setData({
							"inputPlates.index3": a,
							inputOnFocusIndex: "4"
						});
						break;

					case "4":
						this.setData({
							"inputPlates.index4": a,
							inputOnFocusIndex: "5"
						});
						break;

					case "5":
						this.setData({
							"inputPlates.index5": a,
							inputOnFocusIndex: "6"
						});
						break;

					case "6":
						this.setData({
							"inputPlates.index6": a,
							inputOnFocusIndex: "7"
						});
						break;

					case "7":
						this.setData({
							"inputPlates.index7": a,
							inputOnFocusIndex: "7"
						});

				}
				var n = this.inputPlates.index0 + this.inputPlates.index1 + this.inputPlates.index2 + this.inputPlates
					.index3 + this.inputPlates.index4 + this.inputPlates.index5 + this.inputPlates.index6 + this.inputPlates
					.index7
				console.log('车牌号:', n);
				this.setData({
					carNum: n
				})
				this.checkedSubmitButtonEnabled();
			},
			//键盘关闭按钮点击事件
			tapSpecBtn: function(t) {
				var a = this,
					e = t.target.dataset.index;
				if (0 == e) {
					switch (parseInt(this.inputOnFocusIndex)) {
						case 0:
							this.setData({
								"inputPlates.index0": "",
								inputOnFocusIndex: "0"
							});
							break;

						case 1:
							this.setData({
								"inputPlates.index1": "",
								inputOnFocusIndex: "0"
							});
							break;

						case 2:
							this.setData({
								"inputPlates.index2": "",
								inputOnFocusIndex: "1"
							});
							break;

						case 3:
							this.setData({
								"inputPlates.index3": "",
								inputOnFocusIndex: "2"
							});
							break;

						case 4:
							this.setData({
								"inputPlates.index4": "",
								inputOnFocusIndex: "3"
							});
							break;

						case 5:
							this.setData({
								"inputPlates.index5": "",
								inputOnFocusIndex: "4"
							});
							break;

						case 6:
							this.setData({
								"inputPlates.index6": "",
								inputOnFocusIndex: "5"
							});
							break;

						case 7:
							this.setData({
								"inputPlates.index7": "",
								inputOnFocusIndex: "6"
							});
					}

				} else 1 == e && a.setData({
					isKeyboard: !1,
					isNumberKB: !1,
					inputOnFocusIndex: ""
				});
				this.checkedSubmitButtonEnabled();
			},
			//键盘切换
			checkedKeyboard: function() {
				var t = this;
				"0" == this.inputOnFocusIndex ? t.setData({
					tapNum: !1,
					isNumberKB: !1
				}) : "1" == this.inputOnFocusIndex ? t.setData({
					tapNum: !1,
					isNumberKB: !0
				}) : this.inputOnFocusIndex.length > 0 && t.setData({
					tapNum: !0,
					isNumberKB: !0
				});
			},

			checkedSubmitButtonEnabled: function() {
				this.checkedKeyboard();
				var t = !0;
				for (var a in this.inputPlates)
					if ("index7" != a && this.inputPlates[a].length < 1) {
						this.setData({
							carNumBtnDisable: true
						})
						t = !1;
						break;
					}
				if (t) {
					this.setData({
						carNumBtnDisable: false
					})
				}

			},
			queryCarNum: function() {
				let carNum = this.carNum;
				let _that = this;
				if (carNum == '') {
					wx.showToast({
						title: '请重新输入车牌号',
					});
					return;
				}

				//查询车辆是否在该 小区停车场中
				let _objData = {
					communityId: this.communityId,
					carNum: carNum,
					state: '100300,100600',
					page: 1,
					row: 1
				}

				context.request({
					url: constant.url.listCarIn,
					header: context.getHeaders(),
					method: "GET",
					data: _objData, //动态数据
					success: function(res) {
						console.log("请求返回信息：", res);
						if (res.statusCode == 200) {
							let _carInouts = res.data.carInouts;
							if (_carInouts == null || _carInouts.length == 0) {
								wx.showToast({
									title: "未查询到在场车辆或已支付",
									icon: 'none',
									duration: 2000
								});
								return;
							}
							let _tmpCarInout = _carInouts[0];
							_tmpCarInout['communityId'] = _that.data.communityId;
							_tmpCarInout['communityName'] = _that.data.communityName;

							wx.navigateTo({
								url: '/pages/tempParkingFeePay/tempParkingFeePay?carInfo=' + JSON.stringify(_carInouts[0]),
							});
							return;
						}
						wx.showToast({
							title: "服务器异常了",
							icon: 'none',
							duration: 2000
						})
					},
					fail: function(e) {
						wx.showToast({
							title: "服务器异常了",
							icon: 'none',
							duration: 2000
						})
					}
				})
			}
		}
	}
</script>

<style>
	@import "./tempParkingFee.css";
</style>

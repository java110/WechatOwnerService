<template>
	<view class="content">
		<view>
			<!-- 选择场馆 -->
			<form>
				<view class="cu-form-group">
					<view class="title">选择场馆</view>
					<picker @change="PickerChange" :value="selectChangGuan" :range="picker">
						<view class="picker">
							{{selectChangGuan>-1?picker[selectChangGuan]:'立德羽毛球馆'}}
						</view>
					</picker>
				</view>
			</form>

			<!-- 预约日期 -->
			<view style="position: sticky;top: 0ch;z-index: 999;">
				<scroll-view class="bg-white nav" scroll-with-animation scroll-x>
					<view class="scroll-view-item_H" @click="SelectHeader(item, i)" v-for="(item, i) in WeekList"
						:key="i" :class="selectHeader == i ? 'bg-cyan text-shadow' : 'bg-blue'">
						<view style="text-align: center;padding-left: 30px;">
							<view :class="selectHeader == i ? 'bottom-cyan' : 'text-black'">{{ item.name }}</view>
							<view :class="selectHeader == i ? 'bottom-cyan bottom-cyan-line' : 'text-black'">
								{{ item.code | formatTime }}
							</view>
						</view>
					</view>
				</scroll-view>

				<view class="barHeight"></view>

				<view class="barConten">
					<view class="flex justify-between">
						<view class="radius text-df">选择预约时间段</view>
						<view class="radius text-sm">共{{ CDList.length }}场地</view>
					</view>
				</view>
			</view>

			<scroll-view scroll-with-animation scroll-y>
				<!-- 球场信息列表 -->
				<view class="BiaoGe">

					<!-- 左侧时间 -->
					<view class="Ceng">
						<view style="height: 20px;"></view>
						<view class="BiaoTou" v-for="(item,index) in TimeList" :key="index">
							<view class="LouCeng bg-gray">{{item}}</view>
						</view>
					</view>

					<!-- 预约内容 -->
					<ul style="display: block;white-space: nowrap;">
						<li v-if="CDList.length<=0"
							style="display:inline-block;margin-left: 20px;margin-top: 20px;font-size: 14px;">暂无订场信息</li>
						<li style="display:inline-block;" v-for="(item,index) in CDList" :key="index">
							<view>
								<!-- 场馆 -->
								<view class="Fang" style="border-top: solid 0.5px #D7D3D3">{{ item.name }}</view>
								<view style="background-color: #ffffff;">
								   <view :class="'Fang ' + ChangDiStatus(item_x)"
										@click="SelectCd(item_x,index,open_x)"
										v-for="(item_x,open_x) in item.openTimes" :key="open_x">
										<view style="display: block;">{{item.feeMoney}}</view>
									</view>
								</view>
							</view>
						</li>
					</ul>
				</view>
			</scroll-view>

			<!-- 已预约 -->
			<view style="position: fixed;bottom: 0px;width: 100%;height: auto;">
				<view style="border-top:#dedede 1px solid;background-color: white;">
					<view class="dashed-bottom p-3" style="padding-bottom: 5px;padding-left: 10px;padding-top: 5px;">
						<view class="cu-capsule radius">
							<view class='cu-tag bg-grey' style="background-color: #dedede;">-</view>
							<view class="cu-tag line-grey">不可约</view>
						</view>
						<view class="cu-capsule radius">
							<view class="cu-tag bg-white" style="border:solid 1px #b8b8b8;">-</view>
							<view class="cu-tag line-grey">可约</view>
						</view>
						<view class="cu-capsule radius">
							<view class="cu-tag bg-blue" style="background-color: #8799a3;">-</view>
							<view class="cu-tag line-grey">已有约</view>
						</view>
						<view class="cu-capsule radius">
							<view class="cu-tag bg-cyan">-</view>
							<view class="cu-tag line-grey">已选择</view>
						</view>
					</view>

					<!-- 已选行	-->
					<div class="navbar-list" v-if="CurList.length>0">
						<ul class="flex-imd">
							<li v-for="(item,index) in CurList" :key="index" class="navbar-item">
								<view style="line-height: 15px;">
									<view
										style="width: 84px;text-align: center; padding-top:3px; background-color:#1cbbb4;height: 23px;color:#ffffff;font-size: 10px;">
										{{ HoursStr(item.hours) }}
									</view>
									<view
										style="padding-top:3px; text-align: center; background-color: white;height: 23px;font-size: 14px;">
										{{ item.changdiName }}
									</view>
								</view>
							</li>
						</ul>
					</div>


					<view class="cu-form-group">
						<view class="title">总计:
							<text class="solid-bottom text-xxl text-price text-red">{{totalMoney}}</text>
						</view>
						<button @click="confCd()" class="cu-btn round bg-blue"
							style="background-color: #1cbbb4;">提交订单</button>
					</view>
				</view>
			</view>

		</view>
	</view>
	</view>
</template>

<script>
	import {
		getWeekTime
	} from "./utils/index.js";
	// import "../colorui/main.css";
	// import "../colorui/icon.css";
	import {
		getChangdi,
		getChangGuan,
		getBetweenTime
	} from '@/api/appointment/appointmentApi.js';
	import {
		getBooks
	} from '../../api/booking/bookingApi.js';
	import SysParams from "../../constant/param";

	export default {
		name: 'appointment',
		props: {
			// contentList: {
			// 	type: Array,
			// 	default: []
			// },
			// TimeList: {
			// 	type: Array,
			// 	default: function() {
			// 		return ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00",
			// 			"18:00", "19:00", "20:00", "21:00", "22:00", "23:00", "00:00"
			// 		];
			// 	}
			// }
		},
		data() {
			return {
				selectHeader: 0,
				selectChangGuan: 0, //选择场馆
				WeekList: getWeekTime(new Date(), 3, false),
				triggered: false,
				picker: [],
				totalMoney: 0,
				selectDate: '', // 当前选中的日期,默认今天
				communityId: '',
				page: 1,
				row: 100,
				CGList: [], // 场馆列表
				curChangGuanVenueId: 0, // 当前场馆 venueId
				CDList: [], // 场地列表
				CurList: [], // 用户选择列
				TimeList: [] // 场馆开的时间段列表
			};
		},
		filters: {
			formatTime(val) {
				let data = new Date(val)
				var M = (data.getMonth() + 1 < 10 ? "0" + (data.getMonth() + 1) : data.getMonth() + 1) + "-";
				// debugger
				var D = (data.getDate() < 10 ? "0" + (data.getDate()) : data.getDate());
				return M + D;
			}
		},
		methods: {
			PickerChange(item) {
				// debugger
				this.PickerChoose(item.detail.value);
				this._loadChangdiList();
			},
			// 选择场馆
			PickerChoose(cIndex) {
				let _that = this;
				_that.selectChangGuan = cIndex;
				_that.selectIndex = cIndex;
				_that.curChangGuanVenueId = _that.CGList[cIndex]['venueId'];
				_that.CurList = [];
				_that.CDList = [];
				_that.totalMoney = 0;
				_that.initTimeLine();
			},
			// 初始化左侧时间段
			initTimeLine() {
				this.TimeList = [];
				let startTime = this.CGList[this.selectChangGuan]['startTime'];
				let endTime = this.CGList[this.selectChangGuan]['endTime'];
				if (startTime != "" && endTime != "") {
					this.TimeList = getBetweenTime(startTime, endTime);
				}
			},
			ChangDiStatus(status) {
				if (status.isOpen == "N") return "FeiShou";
				if (status.isOpen == "C") return "yiXuan";
				if (status.isOpen == "S") return "yiShou";
				// debugger
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			// 选择头部日期
			SelectHeader(item, i) {
				this.ChooseHeader(item.code, i);
			},
			// 头部日期选择事件 2022/10/09
			ChooseHeader(date, index) {
				this.selectHeader = index;
				this.selectDate = date;
				this._loadChangdiList();
			},
			// 时间转换
			HoursStr(hours) {
				let hourSlot = hours + ":00-" + (Number(hours) + 1) + ":00";
				return hourSlot;
			},
			//  初始化 场地信息 2022/10/09
			_loadChangdiList() {
				let that = this;
				// 变更时间或场地,要清空已选信息
				that.CurList = [];
				that.CDList = [];
				that.totalMoney = 0;
				uni.showLoading({
					title: '加载中',
					mask: true
				});
				let params = {
					page: this.page,
					row: this.row,
					communityId: this.communityId,
					appointmentTime: this.selectDate,
					venueId: this.curChangGuanVenueId
				}

				getChangdi(params)
					.then(function(result) {
						// debugger
						wx.hideLoading();
						if (result.data.length > 0) {
							let Data = that._filtersChangdiTime(result.data);
							that.CDList = Data;
							that._loadIsBookList();
						} else {
							
						}
					})
			},

			//  初始化 已订场地信息 2022/10/09
			_loadIsBookList() {
				let that = this;
				// 变更时间或场地,要清空已选信息			
				let params = {
					page: this.page,
					row: this.row,
					communityId: this.communityId,
					appointmentTime: this.selectDate,
					venueId: this.curChangGuanVenueId
				}

				getBooks(1)
					.then(function(data) {
							wx.hideLoading();
						if (data == "-1") {
							
							return;
						}
						// debugger
						let _bookings = data.data;
						let _bookingList = [];

						for (var col = 0; col < _bookings.length; col++) {
							let _times = _bookings[col].times;
							for (var cola = 0; cola < _times.length; cola++) {
								let book = {
									appointmentTime: _bookings[col].appointmentTime, // 预约时间
									spaceId: _bookings[col].spaceId, //场地id
									spaceName: _bookings[col].spaceName, // 场地名称
									timeId: _times[cola].timeId, // 场次id
									hours: _times[cola].hours, // 时间
									personName: _bookings[col].personName, //  预约人								
									personTel: _bookings[col].personTel, // 预约电话
									communityId: _bookings[col].communityId, // 物业id
									state: _times[cola].state, // 订单状态
								};
								// debugger
								_bookingList.push(book);
							}
						}

						for (var clindex = 0; clindex < that.CDList.length; clindex++) {
							let _item = that.CDList[clindex];
							_item.openTimes.forEach(function(eItem) {
								if (eItem.isOpen == "Y") {
									// debugger
									let h= eItem.hours;
									if (h<10){
										h="0"+h;
									}
									let da = that.selectDate +" "+ h + ":00:00";
									let nowD = new Date();
									let itemD = new Date(da);
									eItem['nd']=nowD.getTime();
									eItem['itd']=itemD.getTime();
									eItem['mathc']=nowD.getTime() -itemD.getTime();
									if (nowD.getTime() > itemD.getTime()) {
										eItem.isOpen = "N";
									} else {
										_bookingList.forEach(function(bkItem) {
											if (bkItem.spaceId == eItem.spaceId && bkItem.hours ==
												eItem
												.hours && bkItem.appointmentTime == that.selectDate &&
												bkItem.state != "Y") {
												// debugger
												eItem.isOpen = "S";
												// debugger;
												return;
											}
										})
									}
								}
							})
						}

					
						// debugger
					})
			},

			// 根据营业时间过滤场地信息
			_filtersChangdiTime(d) {
				for (var col = 0; col < d.length; col++) {
					let f = d[col].openTimes;
					let g = [];
					// 循环 openTimes 判断 每个场地的时间
					for (var cola = 0; cola < f.length; cola++) {
						//为保持一致判断
						let hoursDouble = f[cola].hours < 10 ? "0" + (f[cola].hours) : f[cola].hours;
						let h = hoursDouble + ":00";
						let k = "false";
						for (var colb = 0; colb < this.TimeList.length - 1; colb++) {
							if (h == this.TimeList[colb]) {
								// debugger
								k = "true";
								break;
							}
						}
						if (k == "true") {
							g.push(f[cola]);
						}
					}
					// debugger
					// 这里是需要添加多一个时间段到列表中,如设置闭馆时间是22点,那就要加多一个,让21-22点的时间节点加进去
					// g.push(f[Number(g[g.length - 1].hours) + 1]);
					d[col].openTimes = g;
				}
				return d;
			},
			// 初始化 场馆场馆信息 2022/10/09
			_loadChangGuan() {
				let _that = this;
				let params = {
					page: _that.page,
					row: _that.row,
					communityId: _that.communityId
				}

				getChangGuan(params)
					.then(function(result) {
						let Data = result.data;
						_that.CGList = Data;
						let e = [];

						for (var col = 0; col < _that.CGList.length; col++) {
							e.push(_that.CGList[col]['name'])
						}
						_that.picker = e;
						// 默认选择 1
						_that.PickerChoose(_that.selectChangGuan);
						_that.ChooseHeader(_that.selectDate.code, _that.selectHeader);
					})
			},

			// 选择场地 当前选中列表的索引 当前选中的场地,当前选中时间的详细
			SelectCd(obj, changdi, cdIndex) {
				let cdMoney = Number(this.CDList[changdi].feeMoney); // 场地的费用
				obj['changdiIndex'] = changdi; // 场地索引
				obj['spaceId'] = this.CDList[changdi].spaceId; // 场地id
				obj['changdiName'] = this.CDList[changdi].name; // 场地名称
				obj['cdMoney'] = cdMoney; // 场地费用

				if (obj.isOpen === "C") {
					this.CDList[changdi].openTimes[cdIndex].isOpen = "Y";
					let index_1 = this.CurList.findIndex(item_1 => {
						if (item_1 == obj) {
							return true
						};
					});
					this.CurList.splice(index_1, 1); //index 当前元素索引；1：需要删除的元素个数
					this.totalMoney = Number(this.totalMoney - cdMoney).toFixed(2);
				} else if (obj.isOpen === "Y") {
					this.CDList[changdi].openTimes[cdIndex].isOpen = "C";
					// debugger
					this.CurList.push(obj);
					this.totalMoney = (Number(this.totalMoney) + Number(cdMoney)).toFixed(2);
				}
			},
			// 提交预约
			confCd() {
				let param = {
					bookDate: this.selectDate, // 订场日期
					cgName: this.picker[this.selectChangGuan], // 场馆名称
					cgIndex: this.selectChangGuan, // 场管索引ID
					bookList: JSON.stringify(this.CurList), // 订场列表
					totalMoney: this.totalMoney, // 总价
				}
				if (this.CurList.length <= 0) {
					uni.showToast({
						title: '还没有选择场地哦!',
						duration: 2000
					});
				} else {
					uni.setStorageSync(SysParams.CART_TYPE.BOOKING, JSON.stringify(param));
					wx.navigateTo({
						url: '/pages/appointment/appointmentPay?fee=' + JSON.stringify(param),
					})

					this.$emit('confCd', param);
				}
			},
			onPulling(e) {
				this.$emit('onPulling', e);
			},
			onRefresh() {
				if (this._freshing) return;
				this._freshing = true;
				setTimeout(() => {
					this.triggered = false;
					this._freshing = false;
				}, 1000);
			},
			onRestore() {
				this.triggered = 'restore'; // 需要重置
				console.log('onRestore');
			}
		},
		mounted() {
			//自动加载indexs方法
			// this.selectDate = this.WeekList[0];
			this._freshing = false;
			setTimeout(() => {
				this.triggered = true;
			}, 1000);
			let _that = this;
			this.vc.getCurCommunity()
				.then(function(_communityInfo) {

					_that.communityId = _communityInfo.communityId;
					_that._loadChangGuan();
					_that.selectDate = _that.WeekList[0];
				})
		}
	};
</script>

<style lang="scss">
	@import "./mgb-appointment.css";
</style>

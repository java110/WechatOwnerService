<template>
	<view>
		<scroll-view scroll-x class="bg-white nav">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="active==0?'text-green cur':''" @tap="_tabSelect(0)">
					旧货出售
				</view>
				<view class="cu-item flex-sub" :class="active==1?'text-green cur':''" @tap="_tabSelect(1)">
					求购需求
				</view>
			</view>
		</scroll-view>
		<view v-if="active==0">
			<view v-for="(item,index) in junks" :key="index" class="bg-white margin-bottom margin-top padding-top padding-bottom-sm">
				<view class="flex justify-between margin-left margin-right ">
					<view class="">
						<view class="cu-avatar round" :style="{backgroundImage: 'url(' + item.headerImage + ')' }"></view>
						<text class="margin-left-xs text-black">{{item.publishUserName}}</text>
					</view>
					<view class="text-grey align-center">
						<text>{{item.createTime}}</text>
					</view>
				</view>
				<view class="margin-top-sm margin-left margin-right">
					<text class="text-df">{{item.context}}</text>
				</view>
				<view class="margin-top-sm margin-left margin-right grid text-center col-3 grid-square" v-if="item.photos.length > 0">
					<view class="" v-for="(_item,index) in item.photos" :key="index">
						<image mode="scaleToFill" :data-url="_item.url" :src="_item.url" @tap="preview"></image>
					</view>
				</view>
				<view class="solid-top padding-top-sm flex justify-around align-center">
					<view class="">
						<text class="lg text-red cuIcon-moneybag"></text>
						<text class="margin-left-xs text-red">{{item.referencePrice}}</text>
					</view>
					<view @tap="_callpublishUser(item.publishUserLink)">
						<text class="lg text-green cuIcon-phone"></text>
						<text class="margin-left-xs text-green">联系</text>
					</view>

				</view>
			</view>
		</view>

		<view v-if="active==1">
			<view v-for="(item,index) in requirements" :key="index" class="bg-white margin-bottom margin-top padding-top padding-bottom-sm">
				<view class="flex justify-between margin-left margin-right ">
					<view class="">
						<view class="cu-avatar round" :style="{backgroundImage: 'url(' + item.headerImage + ')' }"></view>
						<text class="margin-left-xs text-black">{{item.publishUserName}}</text>
					</view>
					<view class="text-grey align-center">
						<text>{{item.createTime}}</text>
					</view>
				</view>
				<view class="margin-top-sm margin-left margin-right margin-bottom-sm">
					<text class="text-df">{{item.context}}</text>
				</view>
				<view class="solid-top padding-top-sm flex justify-around align-center">
					<view class="">
						<text class="lg text-red cuIcon-moneybag"></text>
						<text class="margin-left-xs text-red">{{item.referencePrice}}</text>
					</view>
					<view @tap="_callpublishUser(item.publishUserLink)">
						<text class="lg text-green cuIcon-phone"></text>
						<text class="margin-left-xs text-green">联系</text>
					</view>

				</view>
			</view>
		</view>

		<flixedadd backgroundColor="#228B22" selectbackgroundColor="#FFB233" color="#FFB233"
		 selectcolor="#228B22" :addlistdata="addlistdata" @addlisttap="addlisttap"></flixedadd>


		<view class="cu-modal" :class="viewImage?'show':''">
			<view class="cu-dialog">
				<view class="bg-img" :style="'background-image: url('+ viewImageSrc +');height:800rpx;'">
					<view class="cu-bar justify-end text-white">
						<view class="action" @tap="closeViewImage()">
							<text class="cuIcon-close "></text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const context = require("../../context/Java110Context.js");
	const constant = context.constant;
	const factory = context.factory;
	import flixedadd from "../../components/flixedadd/flixedadd.vue";
	export default {
		components: {
			flixedadd
		},
		data() {
			return {
				active: 0,
				viewImage: false,
				viewImageSrc: '',
				communityId:'',
				junks:[],
				requirements:[],
				addlistdata:[
					{
						title:"我的发布",
						src:"/static/images/market_my.png"
					},
					{
						title:"发布信息",
						src:"/static/images/market_add.png"
					}
				]
			}
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			context.onLoad(options);
			let _that = this;
			if(context.checkLoginStatus()){
				context.getOwner(res => {
					_that.communityId = res.communityId;
				});
			}
			
			_that._loadMarket(_that.active);
			
			
		},
		methods: {
			_tabSelect: function(_active) {
				this.active = _active;
				this._loadMarket(_active);
			},
			_loadMarket: function(_active) {
				let that = this;
				let _typeCd = '';
				if(_active == 0){
					_typeCd = '222222';
				}else{
					_typeCd = '333333';
				}
				this.loading = true;
				let _paramIn = {
					"communityId": that.communityId,
					"typeCd": _typeCd,
					"state":'13001',
					"page":1,
					"row":15
				};

				context.request({
					url: constant.url.listJunkRequirements,
					header: context.getHeaders(),
					method: "GET",
					data: _paramIn,
					success: function(res) {
						console.log('res',res);
						if (res.statusCode == 200) {
							let _junkRequirements = res.data.junkRequirements;
							_junkRequirements.forEach(function(_jr){
								let _date = _jr.createTime.replace(" ", ":").replace(/\:/g, "-").split("-");
								let _simDate = "" + _date[1].split("")[1] + "-" + _date[2] + "\t" + _date[3] + ":" + _date[4] + "";
								_jr.createTime = _simDate;
								if(_typeCd == '222222'){
									_jr.photos.forEach(function(_photoTmp){
										_photoTmp.url = constant.url.baseUrl + _photoTmp.url;
									});
								}
								
								_jr.headerImage = constant.url.getOwnerPhotoPath + "?objId=" + _jr.memberId + "&communityId=" + _jr.communityId +"&fileTypeCd=10000";
								
							});
							if(_typeCd == '222222'){
								that.junks = _junkRequirements;
								
							}else{
								that.requirements = _junkRequirements;
							}
						}
					},
					fail: function(e) {
						wx.showToast({
							title: "服务器异常了",
							icon: 'none',
							duration: 2000
						})
					}
				});
			},
			preview: function(e) {
				console.log('图片地址',e);
				let _url = e.target.dataset.url;
				this.viewImageSrc = _url;
				this.viewImage = true;
			},
			closeViewImage: function() {
				this.viewImage = false;
			},
			addlisttap:function(index){/*第一个序列为0,第二个为1,以此类推;当值为-1代表点击的是遮慕层*/
				let login = context.checkLoginStatus();
				if(!login){
					this.vc.navigateTo({
						url: '../showlogin/showlogin'
					});
					return;
				}
				let _that = this;
				if(index == 0){
					this.vc.navigateTo({
						url:'/pages/myJunk/myJunk'
					});
					return ;	
				}
				if(index == 1){
					
					this.vc.navigateTo({
						url:"/pages/newJunk/newJunk?active=" + this.active
					});
					return ;
				}
				
			},
			_callpublishUser:function(_link){
				let _that = this;
				let login = context.checkLoginStatus();
				if(!login){
					this.vc.navigateTo({
						url: '../showlogin/showlogin'
					});
					return;
				}
				uni.makePhoneCall({
					// 手机号
					phoneNumber: _link,
					// 成功回调
					success: (res) => {
						console.log('调用成功!')
					},
					// 失败回调
					fail: (res) => {
						console.log('调用失败!')
					}
				});
			}
		}
	}
</script>

<style>

</style>

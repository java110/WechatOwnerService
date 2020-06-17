<template>
	<view>
		<view class="cu-form-group">
			<view class="title">类型</view>
			<picker :range="typeCds" :value="index" @change="changeTypeCd">
				<view class="picker">
					{{typeCdName}}
				</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title">分类</view>
			<picker :value="classificationIndex" :range="classifications" @change="_changeClassifications">
				<view class="picker">
					{{classificationName}}
				</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title">参考价格</view>
			<input v-model="referencePrice" type="number" placeholder="请输入参考价格"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">联系人</view>
			<input v-model="publishUserName" placeholder="请输入联系人,如:吴先生"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">联系电话</view>
			<input v-model="publishUserLink" type="number" placeholder="请输入联系电话"></input>
		</view>
		<view class="cu-form-group margin-top">
			<textarea v-model="context" placeholder="请输入内容"></textarea>
		</view>

		<view class="cu-bar bg-white margin-top" v-if="typeCd == 222222">
			<view class="action">
				图片上传
			</view>
			<view class="action">
				{{imgList.length}}/6
			</view>
		</view>
		<view class="cu-form-group" v-if="typeCd == 222222">
			<view class="grid col-3 grid-square flex-sub">
				<view class="bg-img" v-for="(img,index) in imgList" :key="index" :data-url="imgList[index]">
					<image :src='imgList[index]' mode='aspectFill'></image>
					<view class="cu-tag bg-red" @tap="deleteImage(index)" :data-index="index">
						<text class="cuIcon-close"></text>
					</view>
				</view>
				<view class="solids" @tap="ChooseImage" v-if="imgList.length<6">
					<text class="cuIcon-cameraadd"></text>
				</view>
			</view>
		</view>
		<view class="flex flex-direction margin">
			<button class="cu-btn bg-green margin-tb-sm lg" @tap="submitJunk()">发布</button>
		</view>
	</view>
</template>

<script>
	const context = require("../../context/Java110Context.js");
	const constant = context.constant;
	const factory = context.factory;
	export default {
		data() {
			return {
				imgList: [],
				photos: [],
				typeCds: ['旧货', '需求'],
				index: 0,
				typeCdIds: ['222222', '333333'],
				typeCdName: '请选择',
				typeCd: '',
				classificationName: '请选择',
				classificationIndex: 0,
				classificationId: '',
				classifications: ['家具', '电器'],
				classificationIds: ['10008', '10002'],
				classification: '',
				referencePrice: '',
				publishUserId: '',
				publishUserName: '',
				publishUserLink: '',
				context: '',
				communityId: ''

			}
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			let _that = this;
			context.onLoad(options);
			context.getOwner(res => {
				console.log('_ownerInfo', res);
				_that.publishUserId = res.userId;
				_that.communityId = res.communityId;
				_that.publishUserLink = res.link;
				_that.publishUserName = res.appUserName;
			});
		},
		methods: {
			changeTypeCd: function(e) {
				let index = e.detail.value
				this.typeCdName = this.typeCds[index];
				this.typeCd = this.typeCdIds[index];
			},
			_changeClassifications: function(e) {
				let _index = e.detail.value
				this.classificationName = this.classifications[_index];
				this.classification = this.classificationIds[_index];

			},
			submitJunk: function() {

				let obj = {
					"typeCd": this.typeCd,
					"classification": this.classification,
					"context": this.context,
					"referencePrice": this.referencePrice,
					"publishUserName": this.publishUserName,
					"publishUserLink": this.publishUserLink,
					"photos": [],
					"publishUserId": this.publishUserId,
					"communityId": this.communityId
				};
				let _photos = this.photos;

				_photos.forEach(function(_item) {
					obj.photos.push({
						"photo": _item
					});
				});
				let msg = "";
				if (obj.typeCd == "") {
					msg = "类型为空";
				} else if (obj.classification == "") {
					msg = "分类为空";
				} else if (obj.context == "") {
					msg = "发布内容为空";
				} else if (obj.referencePrice == "") {
					msg = "参考价格为空";
				} else if (obj.publishUserName == "") {
					msg = "发布人为空";
				} else if (obj.publishUserLink == "") {
					msg = "联系方式为空";
				} else if (obj.publishUserId == "") {
					msg = "发布信息为空";
				} else if (obj.communityId == "") {
					msg = "小区信息为空";
				}

				if (msg != "") {
					wx.showToast({
						title: msg,
						icon: 'none',
						duration: 2000
					});
				} else {
					console.log("提交数据", obj);
					context.request({
						url: constant.url.saveJunkRequirement,
						header: context.getHeaders(),
						method: "POST",
						data: obj,
						//动态数据
						success: function(res) {
							console.log(res); //成功情况下跳转
							if (res.statusCode != 200) {
								uni.showToast({
									icon: 'none',
									title: res.data,
									duration: 2000
								});
								return;
							}
							uni.showToast({
								icon: 'none',
								title: '处理成功',
								duration: 2000
							});

							uni.navigateBack({
								delta: 1
							});

						},
						fail: function(e) {
							console.log(e);
							wx.showToast({
								title: "服务器异常了",
								icon: 'none',
								duration: 2000
							});
						}
					});
				}
			},
			removePhoto: function(e) {
				console.log(e.detail.index);
				let _imgList = [];
				this.imgList.forEach(function(item, index) {
					if (index != e.detail.index) {
						_imgList.push(item);
					}
				});
				let _photos = [];
				this.photos.forEach(function(item, index) {
					if (index != e.detail.index) {
						_photos.push(item);
					}
				});
				this.photos = _photos;
				this.imgList = _imgList;
			},
			deleteImage: function(e) {
				console.log(e);
				let imageArr = this.$data.imgList;
				imageArr.splice(e, 1);
			},
			ChooseImage: function(e) {
				let that = this;
				wx.chooseImage({
					count: 4, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						console.log(res);
						that.$data.imgList.push(res.tempFilePaths[0]);
						let _base64Photo = '';
						factory.base64.urlTobase64(res.tempFilePaths[0]).then(function(_res) {
							_base64Photo = _res;
							console.log('base64', _base64Photo);
							that.photos.push(_base64Photo);
						});
					}
				});
			},
		}
	}
</script>

<style>

</style>

let MIXIN = {
	data() {
		return {
			share:{
			   title: '自定义分享标题',
			   imageUrl:'http://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
			}
		}
	},
	onShareAppMessage(res) { //发送给朋友
		return {
			title: this.share.title,
			imageUrl: this.share.imageUrl,
		}
	},
	onShareTimeline(res) {//分享到朋友圈
		return {
			title: this.share.title,
			imageUrl: this.share.imageUrl,
		}
	},
};
export default MIXIN;
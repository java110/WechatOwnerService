<template>
	<view>
		<view v-if="xiaosikaifa_camouflage_flag" class="xiaosikaifa_camouflage" @tap="addlisttap(-1)"></view>
		<view @tap="addtap()" :animation="animationadd" class="xiaosikaifa_add" :style="{backgroundColor:showBackgroundColor,color:showColor}">+</view>
		<view v-if="xiaosikaifa_add_list_flag" :animation="animationaddlist" class="xiaosikaifa_add_list">
			
			
			<view v-for="(listvalue, index) in addlistdata" :key="index" class="xiaosikaifa_add_list_item" @tap="addlisttap(index)">
				<!-- <text>{{listvalue.title}}</text> -->
				<image :src="listvalue.src"></image>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data () {
            return {
				xiaosikaifa_camouflage_flag:false,/*用于控制遮慕层显示的变量*/
				animationadd: "",
				animationaddlist:"",
				xiaosikaifa_add_list_flag:false,
				defaultbackgroundcolor:null,
				defaultcolor:null,
				tapflag:true,/*用于判断点击事件是否可以执行*/
				showColor:this.color,
				showBackgroundColor:this.backgroundColor
			}
        },
		props:{/*由于*/
			backgroundColor:{/*默认加号背景色*/
				type:String,
				default:"#228B22"
			},
			selectbackgroundColor:{/*选中的加号背景颜色*/
				type:String,
				default:"#FFFFFF"
			},
			color:{/*默认的字体颜色*/
				type:String,
				default:"#FFFFFF"
			},
			selectcolor:{/*选中的字体颜色*/
				type:String,
				default:"#228B22"
			},
			addlistdata:{/*传入数据格式:[{"title":"内容1","src":"图片的绝对路径或网址路径（不可是相对路径）"},{"title":"内容2","src":"图片的绝对路径或网址路径"}]*/
				type:Array,
				default:function(){
					return [];
				}
			}
		},
		methods:{
			addlisttap:function(index){/*-1代表代表点击的是遮慕层*/
				if(this.tapflag){
					this.animationadd = uni.createAnimation({
					  duration: 250
					});
					/*关闭相关*/
					this.animationadd.rotateX(0).rotate(0).step();
					this.showBackgroundColor=this.defaultbackgroundcolor;
					this.showColor=this.defaultcolor;
					this.animationaddlist = uni.createAnimation({
					  duration: 100
					});
					this.animationaddlist.translateY(65).step();
					
					setTimeout(function() {
						this.xiaosikaifa_add_list_flag=false;
						this.xiaosikaifa_camouflage_flag=false;
						this.$emit('addlisttap',index);/*将点击的序号传回父组件*/
						this.tapflag = true;
					}.bind(this), 100);
				}
				this.tapflag = false;
			},
			addtap:function () {/*悬浮的加号点击事件*/
				if(this.tapflag){
					this.animationadd = uni.createAnimation({
					  duration: 250
					});
					
					if(!this.xiaosikaifa_camouflage_flag){
						this.animationadd.rotateX(180).rotate(45).step();
						this.defaultbackgroundcolor=this.showBackgroundColor;
						this.showBackgroundColor=this.selectbackgroundColor;
						this.defaultcolor=this.showColor;
						this.showColor=this.selectcolor;
						this.xiaosikaifa_camouflage_flag=true;
						this.xiaosikaifa_add_list_flag=true;/*显示加号点击后的内容*/
						
						/*加号点击内容的动画*/
						this.animationaddlist = uni.createAnimation({
						  duration: 0
						});
						this.animationaddlist.translateY(65).step();
						setTimeout(function() {
							this.animationaddlist = uni.createAnimation({
							  duration: 100
							});
							this.animationaddlist.translateY(0).step();
							this.tapflag = true;
						}.bind(this), 10);
					}else{
						this.animationadd.rotateX(0).rotate(0).step();
						this.showBackgroundColor=this.defaultbackgroundcolor;
						this.showColor=this.defaultcolor;
						
						this.animationaddlist = uni.createAnimation({
						  duration: 100
						});
						this.animationaddlist.translateY(65).step();
						
						setTimeout(function() {
							this.xiaosikaifa_add_list_flag=false;
							this.xiaosikaifa_camouflage_flag=false;
							this.tapflag = true;
						}.bind(this), 100);
					}
				}
				this.tapflag = false;
			}
		}
	}
	
</script>

<style>
	.xiaosikaifa_add{/*悬浮的加号*/
		/*基础*/
		position: fixed;/*相对于手机屏幕布局*/
		z-index: 99;/*叠层设置*/
		/*设置内部加号居中*/
		display: flex;
		align-items:center;
		justify-content:center;
		/*宽高*/
		width: 90upx;
		height: 90upx;
		/*位于屏幕的位置（可根据需求改）*/
		bottom: 30px;
		right:50upx;
		/*圆形（若需要正方形的加号可以去掉此样式）*/
		border-radius: 40px;
		/*四边阴影（让加号看起来有立体感）*/
		-webkit-box-shadow: #808080 0px 0px 4px;
		-moz-box-shadow: #808080 0px 0px 4px;
		box-shadow: #808080 0px 0px 4px;
		/*加号大小*/
		font-size:65upx;
	}
	.xiaosikaifa_add_list{
		position: fixed;
		bottom: 90px;
		right:50upx;
		z-index: 98;
		display: flex;
		flex-direction:column-reverse;
		align-items:flex-end;
		line-height: 50px;
	}
	.xiaosikaifa_add_list_item{
		display: flex;
		align-items:center;
		font-size: 15px;
		padding-top: 20px;
		color: #FFFFFF;
	}
	.xiaosikaifa_add_list_item image{
		margin-left: 15px;
		width: 45px;
		height:45px;
	}
	.xiaosikaifa_camouflage{/*遮慕层*/
		/*基础*/
		position: fixed;/*相对于手机屏幕布局*/
		width:100%;
		height:100%;
		top:0;
		z-index: 97;/*叠层设置(（注意：值一定要比悬浮加号低）)*/
		/*遮慕背景色*/
		background-color:rgba(0,0,0,0.4);
		opacity:0;
	}
	
</style>
<template>
    <view class="container">
        <swiper class="banner" indicator-dots="true" autoplay="true" interval="3000" duration="1000">
            <swiper-item wx:for="{{banner}}" wx:key="id">
                <block wx:if="{{item.link>0}}">
                    <navigator url="/pages/goods/goods?id={{item.link}}">
                        <image src="{{item.url}}" background-size="cover"></image>
                    </navigator>
                </block>
                <block wx:else>
                    <image src="{{item.url}}" background-size="cover"></image>
                </block>
            </swiper-item>
        </swiper>
        <view class="rent-house">
            <view class="rent-left">
                <view class="rent-name">宝安公园旁豪华大单间</view>
                <view class="rent-pay">押二付一</view>
            </view>
            <view class="rent-right">
                <text class="rent-price">*****元/月</text>
            </view>
            <view style="clear:both;"></view>
        </view>
        <view class="rent-properties">
            <view class="rent-properties-box">
                <view class="rent-properties-title">1室0厅1卫</view>
                <view class="rent-properties-type">户型</view>
            </view>
            <view class="rent-properties-box">
                <view class="rent-properties-title">25m<sup>2</sup></view>
                <view class="rent-properties-type">面积</view>
            </view>
            <view style="padding:5rpx;">
                <view class="rent-properties-title">1/1</view>
                <view class="rent-properties-type">楼层</view>
            </view>
            <view style="padding:5rpx;">
                <view class="rent-properties-title"有</view>
                <view class="rent-properties-type">电梯</view>
            </view>
        </view>
        <view class="rent-spec">
            <view class="rent-left">
                <label class="rent-lable">租房方式：</label>整租
            </view>
            <view class="rent-right"><label class="rent-lable">入住日期：</label>可立即入住</view>
        </view>
        <view class="rent-spec">
            <label class="rent-lable">房屋特色：</label>拎包入住
        </view>

        <view class="m-menu" style="margin-top:4rpx;">
            <navigator class="item" url="/pages/category/category?id={{item.id}}" wx:for="{{channel}}" wx:key="id">
                <image src="{{item.iconUrl}}" background-size="cover"></image>
                <text>{{item.name}}</text>
            </navigator>
        </view>
        
        <view style="width:750rpx;background:#fff;margin-top:4rpx;padding:20rpx 30rpx;">
            <text style="display:block;font-size:32rpx;margin-bottom:10rpx;">房源描述</text>
            <text style="font-size:24rpx;line-height:28rpx;">全新装修，品牌家电，知能操控，拎包入住，可停车，安静。全新装修，品牌家电，知能操控，拎包入住，可停车，安静。</text>
        </view>
        <view style="width:750rpx;background:#fff;margin-top:4rpx;padding:20rpx 30rpx;">
            <text style="font-size:30rpx;">房屋位置</text>
            <map style="margin-top:10rpx;" id="map" longitude="113.324520" latitude="23.099994" scale="14" style="height:200rpx;"></map>
        </view>
        <view class="rent-contact-box">
            <view class="rent-contact-item">
                <image src="/static/images/phone.png"></image>
                <text >电话咨询</text>
            </view>
            <button size="default" >预约看房</button>
            <view style="clear:both;"></view>
        </view>
    </view>
</template>

<script>
</script>

<style>
    @import url("./rentDetail.css");
</style>

<template>
  <view class="car-keyboard">
    <view class="status-bar">
      <view class="close" @click="hideHandler">
        关闭
      </view>
    </view>

    <view class="keys-container">
      <view class="row" v-for="(row, index) in keys" :key="index">
        <view 
          :class="[
            'key', 
            { last: j === row.length - 1 },
            { 'is-delete': deleteKeys.includes(key) },
          ]" 
          v-for="(key, j) in row" 
          :key="key"
          @click="keyTapHandler(key)"
        >
          <view class="txt" v-if="!deleteKeys.includes(key)">
            {{key}}
          </view>

          <view class="delete" v-else></view>
        </view>  
      </view>
    </view>
  </view>
</template>

<script>
	export default {
    name: 'KeyBoard',
		components: {
    },
    props: {
      value: {
        type: Boolean,
        default: false,
      },
      type: {
        type: String,
        default: 'provinces',
        validator: (value) => {
          return ['provinces', 'areas'].indexOf(value) !== -1
        }
      },
    },
		data() {
			return {
        deleteKeys: ['-', '='], // 避免2个删除按钮key冲突
        provinces: [
          [ "京", "津", "沪", "渝", "川", "新", "藏", "宁", "桂", "贵" ],
          [ "云", "黑", "吉", "辽", "晋", "冀", "青", "鲁", "豫", "苏" ],
          [ "皖", "浙", "闽", "赣", "湘", "鄂", "粤", "琼", "甘", "陕" ],
          [ "蒙", "港", "澳", "台", "使", "领", "警", "学", "=" ],
        ],
        areas: [
          [ "1", "2", "3", "4", "5", "6", "7", "8", "9", "0" ],
          [ "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P" ],
          [ "A", "S", "D", "F", "G", "H", "J", "K", "L" ],
          [ "Z", "X", "C", "V", "B", "N", "M", "-" ],
        ],
			}
    },
    watch: {
    },
    computed: {
      keys() {
        return this[this.type];
      },
    },
		methods: {
      keyTapHandler(key) {
        if (this.deleteKeys.includes(key)) {
          this.$emit('on-delete');
          return;
        }

        this.$emit('on-input', key);
      },
      hideHandler() {
        this.$emit('on-hide');
      }
		},
		beforeMount() {
    },
    mounted() {
    },
	}
</script>

<style scoped lang="less">
  .car-keyboard {
	z-index: 99;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #F5F5F5;
  }

  .status-bar {
    height: 80rpx;
    background: #DFE8E7;
    color: #323330;
    display: flex;
    flex-direction: row-reverse;
  }

  .close {
    font-size: 30rpx;
    height: 100%;
    padding: 0 20rpx;
    display: flex;
    align-items: center;
  }

  .keys-container {
    padding: 23rpx 13rpx 30rpx 13rpx;
    
  }

  .row {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 14rpx;
  }

  .key {
    width: 60rpx;
    height: 72rpx;
    background: #FFFFFF;
    border: 1rpx solid #E6E6E6;
    box-sizing: border-box;
    border-radius: 4rpx;
    color: #323330;
    font-size: 36rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 14rpx;
    
    .delete {
      width: 66rpx;
      height: 40rpx;
      background: url(../../static/codecook-keyboard/icon_delete.png) no-repeat;
      background-size: 100% 100%;
    }

    &.is-delete {
      width: 134rpx;
    }

    &.last {
      margin-right: 0;
    }
  }
</style>

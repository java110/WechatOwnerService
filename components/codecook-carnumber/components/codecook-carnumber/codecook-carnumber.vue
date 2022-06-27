<template>
  <view class="car-number">
    <!-- <view class="new-energy">新能源</view> -->
    <view class="wrap" @tap="focusHandler">
      <view 
        :class="[
          'cell', 
          { last: index === length - 1}, 
          { 'no-border': index === length - 1 || index === length - 2 }, 
          { active: index === current },
        ]" 
        v-for="(val, index) in fill" 
        :key="index"
        @tap.stop="focusHandler(index)"
      >
        <view class="val">{{val}}</view>
        <view class="border"></view>
      </view>
    </view>

    <key-board 
      v-if="focus"
      :type="kType"
      @on-delete="keyDeleteHandler"
      @on-input="keyInputHandler"
      @on-hide="keyHideHandler"
    ></key-board>
  </view>
</template>

<script>
  import KeyBoard from '../codecook-keyboard/codecook-keyboard.vue';
  
	export default {
    name: 'CarNumber',
		components: {
      KeyBoard
    },
    props: {
      value: {
        type: String,
        default: '',
      },
      length: {
        type: Number,
        default: 8
      }
    },
		data() {
			return {
        focus: false,
        current: 0,
        fill: new Array(this.length).fill(''),
			}
    },
    computed: {
      kType() {
        return this.current === 0 ? 'provinces' : 'areas';
      },
    },
    watch: {
      fill(val) {
        this.$emit('input', val.join(''));
        this.$emit('change', val);
      },
    },
		methods: {
      focusHandler(index = 0) {
        this.focus = true;

        this.current = index;
        console.log(this.current);
      },
      keyDeleteHandler() {
        this.$set(this.fill, this.current, '');

        if (this.current <= 0) {
          return;
        }

        this.current -= 1;
      },
      keyInputHandler(key) {
        this.$set(this.fill, this.current, key);

        if (this.current >= this.length - 1) {
          return;
        }

        this.current += 1;
      },
      keyHideHandler() {
        this.focus = false;
      },
		},
		beforeMount() {
      if (this.value) {
        this.value.split('').forEach((key, index) => {
          if (index >= this.length) {
            return;
          }
          this.$set(this.fill, index, key);
        });

        this.current = Math.min(this.value.length, this.length - 1);
      }
    },
    mounted() {
      this.focus = false;  
    },
	}
</script>

<style scoped lang="less">
  .car-number {
    position: relative;
    width: 100%;

    .wrap {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      border: 1rpx solid #E6E6E6;
      box-sizing: border-box;
      border-radius: 8rpx;
      box-shadow: 0rpx 6rpx 6rpx 0rpx rgba(128, 128, 128, 0.1);
      padding: 15rpx 0;
    }

    .new-energy {
      font-size: 24rpx;
      color: #333232;
      margin-bottom: 13rpx;
      display: flex;
      flex-direction: row-reverse;
      padding-right: 5rpx;
    }

    .cell {
      box-sizing: border-box;
      padding: 14rpx 0;
      flex: 1;
      color: #666666;
      font-size: 34rpx;
      border-right: 1rpx solid #CCCCCC;
      text-align: center;
      border-bottom: 1rpx solid transparent;
      box-sizing: border-box;
      padding: 0 10rpx;
      display: flex;
      flex-direction: column;
      position: relative; 
      height: 70rpx;

      .val {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .border {
        flex-shrink: 0;
        flex-grow: 0;
        height: 2rpx;
        background: transparent;
        width: 100%;
      }

      &.active {
        .border {
          background: #FE8525;
        }
      }
      &.no-border {
        border-right: none;
      }

      &.last:after {
        content: '';
        width: 100%;
        border: 2px solid #00FF00;
        border-radius: 8rpx;
        margin: -18rpx 0;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        box-sizing: border-box;
      }
    }
	}
</style>

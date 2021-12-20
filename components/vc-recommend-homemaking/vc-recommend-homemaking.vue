<template>
  <view v-if="products.length > 0">

    <view v-for="(item,indexs) in products" :key="indexs" class="margin-top recommend-block">
      <view class="text-left ">
        <text class="recommend-title">{{ item.categoryName }}</text>
      </view>

      <view class="grid text-center col-4">
        <view v-for="(product,i) in item.mainCategoryProducts"
              :key="i" class="margin-top-xs margin-bottom-sm">
          <view :class="i%2 == 0 ? 'margin-right-xs' : 'margin-left-xs'" class="padding-sm  bg-white goods "
                @tap="_toGoodsDetail(product)">
            <view class="goods-image-block">
              <image :src="product.coverPhoto?product.coverPhoto:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3466819736,3178401028&fm=26&gp=0.jpg'" class="goods-image c-radius"></image>
              <view class="cu-tag bg-gradual-orange round goods-tag">
                专业
              </view>
            </view>
            <view class="margin-top-sm text-left">
              <text>{{ product.prodName }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import {getRecommendProduct} from '../../api/goods/goodsApi.js'
import param from "../../constant/param"
import {getMallCommunityId} from '../../api/community/communityApi.js';

export default {
  props: {
    // 专区目录类别传参，默认首页
    categoryType:{
      type: String,
      default: param.CATEGORY_TYPE.HOMEMAKING
    }
  },
  data() {
    return {
      products: [],
	  communityId: ""
    }
  },
  mounted() {
    this._loadRecommendProdcut()
  },
  methods: {
    _loadRecommendProdcut: function () {
	  let _that = this;
	  _that.communityId = getMallCommunityId();
      let _data = {
        page: 1,
        row: 6,
		communityId:_that.communityId,
        categoryType: this.categoryType
      }
      getRecommendProduct(_data)
          .then((products) => {
            _that.products = products
          })
    },
    _toGoodsDetail: function (_product) {
      this.vc.navigateToMall({
        url: '/pages/homemaking/detail?servId=' + _product.productId + "&shopId=" + _product.shopId
      }, true)
    }
  }
}
</script>

<style>
.recommend-block{
  background: white;
  border-radius: 10px;
  padding: 10px;
}
.recommend-title {
  font-size: 20px;
  font-weight: 600;
  color: #3c3c3c;
}
.goods-image-block{
  position: relative;
}
.goods-tag {
  position: absolute;
  left: 5upx;
  top: 5upx;
  height: 18px;
  width: 35px;
}

.goods {
  border-radius: 20upx;
}

.goods-image {
  height: 150upx;
}
</style>

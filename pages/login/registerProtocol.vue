<template>
	<view class="padding">
		<jyf-parser :html="protocol" ref="article"></jyf-parser>
	</view>
</template>

<script>
	import {
		getRegisterProtocol
	} from '../../api/common/commonApi.js';
	import jyfParser from "@/components/jyf-parser/jyf-parser";
	export default {
		data() {
			return {
				protocol: ''
			}
		},
		onLoad() {
			this._loadProtocol();
		},
		components: {
			jyfParser
		},
		methods: {
			_loadProtocol: function() {
				let _that = this;
				getRegisterProtocol().then(_data => {
					_that.protocol = _data[0].userProtocol
				})
			}
		}
	}
</script>

<style>

</style>

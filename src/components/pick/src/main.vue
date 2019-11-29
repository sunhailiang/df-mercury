<template>
	<div
		class="pick-warp"
		ref="pick"
		@touchstart="touchstart"
		@touchmove="touchmove"
		@touchend="touchend"
	>
		<div
			class="pick"
			:style="style"
		>
			<div
					v-for="(item,index) in data"
					:key="'pick-select-'+index"
					class="pick-item"
					:class="{'pick-item-select':index===select}"
			>
				{{item[label]}}
			</div>
		</div>
		<div class="pick-line pick-top-line"></div>
		<div class="pick-line pick-bottom-line"></div>
	</div>
</template>
<script>
import propsMixins from '../mixins/props';
import eventMixins from '../mixins/event';
import apiMixins from '../mixins/api';
export default {
	name: "pick",
	mixins:[propsMixins,eventMixins,apiMixins]
}
</script>
<style scoped lang="scss" src="../index.scss"></style>

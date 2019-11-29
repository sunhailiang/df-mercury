<template>
	<select-model
		type="address"
		:value="value"
		@input="valueInput"
		:mode="mode"
	>
		<div class="model-address">
			<div class="model-address-item">
				<address-pick
					@change="change"
				></address-pick>
				<div @click="confirm" class="model-address-view" >
					<img class="model-address-img-left" src="@/assets/image/xiao_but_icon.png"/>
					<span >确定</span>
					<img class="model-address-img-right" src="@/assets/image/xiao_but_icon.png"/>
				</div>
			</div>
		</div>
	</select-model>
</template>

<script>
	import SelectModel from "../../select-model/src/main";
	import AddressPick from "../../address-pick/main/main";
	export default {
		name: "model-address",
		components: {AddressPick, SelectModel},
		props:{
			value:{
				type:Boolean,
				default:true
			},
			mode:{
				type:String,
				default:'fade'
			}
		},
		methods:{
			change:function (data) {
				this.data = data;
			},
			valueInput:function (value) {
				this.$emit('input',value);
			},
			confirm:function () {
				this.valueInput(false);
				this.$emit('confirm',this.data);
			}
		},
		created() {
			this.data = {};
		}
	}
</script>

<style scoped lang="scss" src="../index.scss"></style>

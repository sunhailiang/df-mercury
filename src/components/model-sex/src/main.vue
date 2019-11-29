<template>
	<select-model
		type="sex"
		:value="value"
		@input="valueInput"
		:mode="mode"
	>
		<div class="model-address">
			<div class="model-address-item">
				<div class="model-address-view"
					:class="{'model-sex-select':c_item.name === item.name,'model-sex-top':index !== 0}"
					v-for="(c_item,index) in sex"
					:key="'model-address-'+index"
					 @click="confirm(c_item)"
				>
					<img class="model-address-img-left" v-show="c_item.name !== item.name" src="@/assets/image/xiao_but_icon.png"/>
					<img class="model-address-img-left" v-show="c_item.name === item.name" src="@/assets/image/huisebs.png"/>
					<span >{{c_item.name}}</span>
					<img class="model-address-img-right" v-show="c_item.name !== item.name" src="@/assets/image/xiao_but_icon.png"/>
					<img class="model-address-img-right" v-show="c_item.name === item.name" src="@/assets/image/huisebs.png"/>
				</div>
			</div>
		</div>
	</select-model>
</template>

<script>
	import SelectModel from "../../select-model/src/main";
	import AddressPick from "../../address-pick/main/main";
	export default {
		name: "model-sex",
		components: {AddressPick, SelectModel},
		props:{
			value:{
				type:Boolean,
				default:true
			},
			item:{
				type:Object,
				default:function () {
					return {};
				}
			},
			mode:{
				type:String,
				default:'fade'
			}
		},
		data:function(){
			return {
				sex:[
					{
						name:'男',
						value:'Man'
					},
					{
						name:'女',
						value:'Woman'
					}
				]
			}
		},
		methods:{
			valueInput:function (value) {
				this.$emit('input',value);
			},
			confirm:function (item) {
				this.valueInput(false);
				this.$emit('change',item);
			}
		}
	}
</script>

<style scoped lang="scss" src="../index.scss"></style>

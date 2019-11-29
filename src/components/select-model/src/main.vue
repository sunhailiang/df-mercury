<template>
	<transition
		:name="mode"
	>
		<!--@click="M_hide"-->
		<div  class="select-model" v-show="show">
			<div @touchmove="noScroll" class="select-item"
				:class="['select-item-'+type]"
			>
				<slot></slot>
				<div  class="select-close">
					<img @click="M_hide" src="@/assets/image/select-model/close.png" />
				</div>
			</div>
		</div>
	</transition>

</template>

<script>
	export default {
		name: "select-model",
		props:{
			type:{
				type:String,
				default:'address'
			},
			value:{
				type:Boolean,
				default:false
			},
			mode:{
				type:String,
				default:'fade'
			}
		},
		watch:{
			value:function (value) {
				if (this.show != value) {
					this.show = value;
				}
			}
		},
		data:function () {
			return {
				show:false
			}
		},
		created:function(){
			this.show = this.value;
		},
		methods:{
			M_hide:function () {
				if (!this.show) return;
				this.show = false;
				this.$emit('input',this.show);
			},
			M_show:function () {
				if (this.show) return;
				this.show = true;
				this.$emit('input',this.show);
			},
			noScroll:function (evt) {
				evt = evt || event;
				evt.preventDefault();
			}
		},
	}
</script>

<style scoped lang="scss" src="../index.scss"></style>

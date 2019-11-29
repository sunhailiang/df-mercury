export default {
	props:{
		data:{
			type:Array,
			default:function () {
				return [
					{
						id:1,
						name:'北京北'
					},
					{
						id:1,
						name:'南京'
					},
					{
						id:1,
						name:'山东省'
					},
					{
						id:1,
						name:'另一省'
					},
					{
						id:1,
						name:'省市区'
					},
					{
						id:1,
						name:'卧槽'
					},
				]
			}
		},
		label:{
			type:String,
			default:'name'
		},
		unique:{
			type:String,
			default:'id'
		},
		name:{
			type:String,
			default:''
		},
		value:{
			type:Number,
			default:0,
		}
	},

	watch:{
		value:function (value) {
			if (this.select !== value){
				this.select = value;
				this.conf.now = this.select * this.conf.height * -1;
				this.setStyle({
					y: this.conf.now,
					duration:0
				},false);
			}
		}
	}
}

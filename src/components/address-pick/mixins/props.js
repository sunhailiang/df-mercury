export default {
	props:{
		value:{
			type:Array,
			default:function () {
				return [{},{}]
			}
		},
		showKey:{
			type:Array,
			default:function () {
				// 省   市  区
				//  可以 随意更改顺序
				// ['provide','city','area']
				return ['provide','city'];
			},
		},
		unique:{
			type:String,
			default:'id'
		},
		label:{
			type:String,
			default:'label',
		},
		children:{
			type:String,
			default:'children'
		}
	}
}

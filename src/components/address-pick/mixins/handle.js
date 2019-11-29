import addressList from '../data/address';
export default {

	data:function(){
		return {
			data:{
				provide:{
					data:[],
					select:0,
					next:'city'
				},
				city:{
					data:[],
					select:0,
					next:'area'
				},
				area:{
					data:[],
					select:0
				}
			}
		}
	},

	methods:{
		setData:function (value) {
			this.data.provide.data = addressList;
			this.data.city.data = addressList[this.data.provide.select][this.children];
			this.data.area.data =this.data.city.data[this.data.city.select][this.children];
			this.changeValue();
		}
	},
	created:function () {
		this.setData();
	}

}

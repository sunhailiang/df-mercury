export default {

	methods:{
		change:function (obj) {
			if (obj.select === this.data[obj.name].select) return;
			this.data[obj.name].select = obj.select;

			let target = this.data[obj.name];
			let name = obj.name;
			while (target.next) {

				let nextKey = target.next;
				let children = this.data[name].data[target.select][this.children];
				let count = children.length - 1;
				if (this.data[nextKey].select > count) {
					this.data[nextKey].select = 0;
				}
				this.data[nextKey].data = children;
				name = nextKey;
				target = this.data[nextKey];
			}
			// value:[],
			this.changeValue();
		},
		changeValue:function () {
			let data = {
				value:[],
				id:[],
				select:[],
				data:[]
			};
			this.showKey.map((key)=>{
				let select = this.data[key].select;
				let item = this.data[key].data[select];
				data.select.push(select);
				data.data.push(item);
				data.value.push(item[this.label]);
				data.id.push(item[this.unique]);
			});

			this.$emit('change',data);
		}
	}

}

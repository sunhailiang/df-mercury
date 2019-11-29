export default {

	// 移除空格
	trim_reg:/^\s*|\s*$/,
	trim:function (str = ''){
		return str.replace(this.trim_reg,'');
	},

	//  校验字符串是否为空
	empty:function(str){
		if (typeof str === 'string') {
			return this.trim(str) !== '';
		}else {
			return !!str;
		}
	},

	// 手机号校验
	mobile_reg:/^1\d{10}$/,
	mobile:function(mobile){
		if (typeof mobile === 'string' || typeof mobile === 'number'){
			return this.mobile_reg.test(mobile);
		} else {
			return false;
		}
	},

	/*
	*  email  邮箱格式
	*/
	email_reg:/^\w+@[a-z0-9]+\.[a-z]{2,4}$/,
	email:function(value){
		return this.email_reg.test(value);
	},

	/*
	* 校验 长度
	* 	如果为 String | Array | Object 执行校验 length
	* 	如果 Object 没有 length  将使用 Object.keys 转为数组
	* 	如果为 Number 执行比较值
	*   如果为 Boolean 转为 Number 类型
	*
	*   object  配置
	*   	type:'eq' || ['eq','lt']  // 可选值 eq , lt , gt , neq
	*   	value 需要对比的值
	* */
	length:function(value,obj){

		let length = obj.value || 0;
		let count = 0;
		if (value) {
			if (typeof value==='object'  || typeof value === 'string') {
				count = value.length;
				if (count === undefined) {
					count = Object.keys(value).length || 0;
				}
			} else {
				if (typeof value === 'number') {
					count = value;
				} else {
					count = Number(value) || 0;
				}
			}
		}  else {
			return false;
		};

		let type = obj.type || ['eq'];

		if (typeof type === 'string') type = [type];
		for (let i=0,fCount = type.length;i<fCount;i++) {
			if (typeof this[type[i]] === 'function') {
				if (this[type[i]](count,{
					...obj,
					value:length
				})) return true;

			} else {
				return false;
			}
		}

		return false;

	},

	/*
	*  eq 判断是否相等
	*  	object 配置
	*		strict Boolean false 如果开启使用恒等
	*		value  需要对比的值
	*/
	eq:function(value,obj){

		if (obj.strict) {
			return value === obj.value;
		} else {
			return value == obj.value;
		}

	},

	/*
	*  neq 判断是否不相等
	*  	object 配置
	*		strict Boolean false 如果开启使用恒等
	*		value  需要对比的值
	*/
	neq:function(value,obj){

		if (obj.strict) {
			return value !== obj.value;
		} else {
			return value != obj.value;
		}

	},

	/*
	*  lt 判断是否相等
	*  	object 配置
	*		value  需要对比的值
	*/
	lt:function(value,obj){
		return value < obj.value;
	},

	/*
	*  gt 判断是否相等
	*  	object 配置
	*		value  需要对比的值
	*/
	gt:function(value,obj){
		return value > obj.value;
	},


	/*
	*  value 需要检测的值
	*  key   如果 值检测成功 需要导出的key值
	*  test  是否需要校验  默认为 true
	*  rules:  校验
	*  	String | Array  如果为 String 默认为 empty
	*  object  校验配置项
	*/
	testObject:function (obj = {}) {

		if (typeof obj.rules === 'string')  obj.rules = {empty:obj.rules};

		if (obj.test === undefined) obj.test = true;

		if (obj.test) {
			for (let key in obj.rules) {
				if (obj.rules.hasOwnProperty(key)) {

					if (this[key]) {
						if(!this[key](obj.value || '',obj.obj || {})){
							return {
								test:false,
								msg:obj.rules[key],
							}
						}
					}

				}
			}
		}

		return {
			test:true,
			data:{
				[obj.key]:obj.value,
			}
		}

	},


	// 同时校验多个
	testArray:function (arr = []) {
		let item = {};
		let data = {};
		for (let i =0,count = arr.length;i<count;i++) {
			item = this.testObject(arr[i]);
			if (!item.test) {
				return item;
			}else {
				item = null;
				data[arr[i].key] = arr[i].value;
			}
		}

		return {
			test:true,
			data:data
		}

	}

};

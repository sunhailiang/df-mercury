import axios from 'axios';
export default {

	data:function () {
		return {
			count_down_now:0,  // 当前倒计时
			count_down_end:0,  // 结束时间
			count_down_time:60,  // 倒计时 60秒
			count_down_storage:'',  // 缓存的文本
			count_down_key:'code',  // 使用对象
			count_down_phone:'inputPhone',
			count_down_code:2,
			count_down_event:'register',
			count_down_url :' https://demo.clarabeautynism.com/Mercury/TraditionalMedicalConstitution/GetPhoneCode',
			count_down_info:''
		}
	},
	methods:{
		count_down_send:function () {
			if(this.count_down_data.buttonStatus) return;

			if( !/^1\d{10}$/.test(this[this.count_down_phone])) {
				return this.toast('手机号格式不正确');
			}

			// let params = {phoneNumber:this[this.count_down_phone]};
			let formData = new FormData();
			formData.append('phoneNumber',this[this.count_down_phone]);
			console.log('post=', this.count_down_url, formData);
			axios.post(this.count_down_url, formData, {
					headers: { 'Content-Type': 'multipart/form-data'}
				}).then(({data,status,headers,config}) => {
					console.log('res=', status, data);
					this.count_down_info = data.phoneInfo;
					// this.toast.success('短息发送成功');
				}).catch((e) => {
					this.count_down_end_time();
					this.toast.fail('网络错误');
				})

			// 结束倒计时 的代码
			// 	this.count_down_end_time();

			// 执行 倒计时操作
			this.count_down_init();


		},
		// 获取当前时间戳
		count_down_get_time:function(){
			return parseInt(new Date().valueOf()/1000);
		},
		// 绑定倒计时
		count_down_init:function () {
			clearTimeout(this.count_down_set_time);
			this.count_down_data.buttonStatus = true;
			this.count_down_end = this.count_down_get_time() + this.count_down_time;
			this.count_down_run();
		},
		// 执行倒计时
		count_down_run:function () {
			let diff = parseInt(this.count_down_end - this.count_down_get_time() );
			if (diff > 0) {
				this.count_down_data.buttonText = '重新发送('+diff+'s)';
				this.count_down_set_time = setTimeout(()=> this.count_down_run(),1000);
			} else {
				this.count_down_end_time();
			}
		},
		// 结束倒计时
		count_down_end_time:function () {
			clearTimeout(this.count_down_set_time);
			this.count_down_data.buttonText = this.count_down_storage;
			this.count_down_data.buttonStatus = false;
		}
	},
	created:function () {
		this.count_down_set_time = '';
		this.count_down_data = this[this.count_down_key] || [];
		this.count_down_storage = this.count_down_data.buttonText || '发送验证码';
	}

}

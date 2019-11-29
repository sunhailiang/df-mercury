import rem from '../script/rem';
export default {
	data:function(){
		return {
			style:{},
			select:0
		}
	},
	methods:{
		touchstart:function (evt) {
			if (!this.conf.run) {
				evt.preventDefault();
				evt = evt || event;
				this.conf.run = true;
				this.conf.start.y = this.getMoveY(evt.touches);
			}
		},
		touchmove:function (evt) {
			if (this.conf.run) {
				evt = evt || event;
				// 禁止冒泡
				evt.preventDefault();
				// 获取当前的 实际移动距离
				let y = this.getMoveY(evt.touches) - this.conf.start.y;
				this.conf.move.spend = this.conf.move.y - y;
				this.conf.move.y = y;
				// 设置 style
				this.setStyle({
					y:this.conf.move.y,
					time:0
				});
			}
		},
		touchend:function () {
			if (this.conf.run) {
				this.conf.run = false;
				this.endSpeed();
			}
		},

	},

}

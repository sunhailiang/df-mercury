import rem from "../script/rem";
export default {
	methods:{
		// 获取移动距离的 y
		getMoveY:function (touch) {
			touch = touch.length ? touch[0]:touch;
			return touch.clientY - this.conf.offsetTop + this.conf.now;
		},

		// 设置 style 移动距离
		setStyle:function (obj = {},move=true) {

			obj.y = obj.y  || 0;
			obj.duration = obj.duration || 0;
			let moveY = this.conf.now;
			if (move) {
				moveY = moveY + obj.y;
				moveY = this.getMaxY(moveY);
				this.select = this.getNowSelect(moveY);
			}

			this.style = {
				transform:'translate(0px,'+moveY+'px)',
				transitionDuration:obj.duration+'ms',
				transitionTimingFunction:obj.function || "linear"
			};

		},

		// 执行重新计算
		getMaxY:function(moveY,move = true){
			let max = (this.data.length -  1) * this.conf.height * -1;
			let diff = 0;
			// maxMargin
			// 如果 移动 小于最大允许移动距离触发
			if (moveY < max) {
				if (move) {
					diff = moveY + Math.abs(max);
					diff *= this.conf.speed_diff;
					diff = diff <= -this.conf.maxMargin ?-this.conf.maxMargin:diff;
					moveY = max;
					moveY += diff;
				} else {
					moveY = max;
				}

			} else if ( moveY > 0) {
				if (move) {
					diff = moveY;
					diff *= this.conf.speed_diff;
					diff = diff >= this.conf.maxMargin ?this.conf.maxMargin:diff;
					moveY = 0;
					moveY += diff;
				} else {
					moveY = 0;
				}

			}

			return moveY;

		},

		// 获取当前 选中
		getNowSelect:function (moveY = 0) {

			moveY = -moveY;

			let now = Math.round(moveY / this.conf.height);

			now  = now < 0 ? 0 : now;

			let max = this.data.length -  1;

			now  = now > max ? max : now;

			return now;

		},

		// 设置松手后的操作
		endSpeed:function () {
			this.conf.now = this.select * this.conf.height * -1;
			// 触发 change 函数
			this.$emit('change',{
				data:this.data,
				select:this.select,
				item:this.data[this.select],
				name:this.name
			});
			this.setStyle({
				y: this.conf.now,
				duration: this.conf.duration
			},false);
		}
	},
	mounted:function () {

		this.conf = {
			count:5,   // 一行展示数量
			height:rem.unit(100),  // 一个高度
			margin:2,   // 间隔 2 个 第三个 属于选中
			top: 0,
			start:{
				y:0
			},
			move:{
				y:0,
				spend:0
			},
			run:false,  // 是否正在执行
			offsetTop:this.$refs.pick.offsetTop,
			now:0,
			maxMargin: rem.unit(15),  // 超出后最大移动距离
			speed_diff:0.1,  // 减速 一半
			duration:400,
		};

		this.conf.top = this.conf.margin * this.conf.height;

		this.conf.now = this.select * this.conf.height;

		this.setStyle();
	}
}

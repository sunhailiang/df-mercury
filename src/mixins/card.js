export default {

	data:function(){
		return {
			signTransition:0
		}
	},

	methods:{

		/*
		*   x  目标X轴
		* 	y  目标Y轴
		*   X  当前X
		*   Y  当前Y
		* */
		responseHandle:function (obj) {

			if (this.config.response) return;

			let diffX = Math.abs(obj.x - obj.X);
			let diffY = Math.abs(obj.y - obj.Y);

			if (diffX > diffY) {
				this.config.response = 'x';
			}else if (diffX < diffY) {
				this.config.response = 'y';
			}else {
				this.config.response = this.config.responseX ? 'x':'y';
			}

		},
		clearResponseHandle:function () {
			this.config.response = undefined;
		},

		/*
		*   单选题 的 x 轴的移动
		*/
		SingleOptionHandleX:function (startX,endX,x) {

			clearTimeout(this.horMoveTime);
			if (this.signTransition !== 0) {
				this.signTransition = 0;
			}

			let moveX =  endX + x - startX;
			let max = -this.getSingleMax();


			if (moveX >= this.cardOption.SingleOption.avg) {
				let diff = moveX - this.cardOption.SingleOption.avg;
				moveX = this.cardOption.SingleOption.avg + diff * 0.1;
			} else if (moveX <=  max ){
				let diff = moveX - max;
				moveX = max + diff * 0.1;
			}

			this.getSelectIndexSingLe(moveX);

			this.horeMoveSpeed = moveX - this.horMoveX;

			this.horMoveX = moveX;

		},

		// 获取当前选中哪一个
		getSelectIndexSingLe:function(moveX){

			let max = -this.getSingleMax();
			let count = this.horList.length;
			if (moveX >= this.cardOption.SingleOption.avg) {
				moveX = this.cardOption.SingleOption.avg;
			} else if (moveX <=  max ){
				moveX = max;
			}

			moveX += this.cardOption.SingleOption.avg;

			let width = this.cardOption.SingleOption.width + this.cardOption.SingleOption.margin;

			let i = Math.floor(moveX / width);
			i = Math.abs(i);

			if (i === this.horeMoveSpeedBeforeI) {

				if (Math.abs(this.horeMoveSpeed) >= this.cardOption.SingleOption.speed) {

					if (this.horeMoveSpeed <= 0){
						i++;
					}else {
						i--;
					}
				}

			}

			i = i<= 0? 0: i;
			i = i >= count ? (count - 1):i;
			return i;

		},

		// 松手后 触发
		SingleOptionHandleEndX:function(moveX,index){
			this.signTransition = 0.5;

			let i = index !== undefined?index:this.getSelectIndexSingLe(moveX);

			this.horeMoveSpeedBeforeI = i;

			this.horMoveX = this.cardOption.SingleOption.avg + i * (this.cardOption.SingleOption.width + this.cardOption.SingleOption.margin) * -1;
			this.horMoveEndX = this.horMoveX;
			if (index === undefined) {
				this.horMoveTime = setTimeout(()=>{
					this.singleOnClick(this.horList[i]);
				},500);
			}


		},
		// 获取 最大 移动距离 如果超出 执行 减速操作
		getSingleMax:function () {
			let count = this.horList.length - 1;
			let maxWidth =  count * this.cardOption.SingleOption.width;
			let margin = count * this.cardOption.SingleOption.margin;

			return maxWidth + margin - this.cardOption.SingleOption.avg;

		}


	},

	created:function () {


		this.config = {
			responseDiff: 20,   //  响应 值差  (比如X优先响应 则 Y 必须大于 20才会被响应)
			responseX:true,     // 是否优先响应 X轴
			response:undefined,      // 当前响应的轴
		};

		this.cardOption = {
			xMove:['SingleOption','Scoring'],
			SingleOption:{
				event:'SingleOptionHandleX',
				endEvent:'SingleOptionHandleEndX',
				width: unitParse(360),
				margin: unitParse(60),
				maxWidth: unitParse(630),
				speed: 5,  // 超出多大速度 可以移动至 下一个
				avg:0,  // 距离左侧的avg
				init:function () {
					this.avg = (this.maxWidth - this.width) / 2;
				}
			},
		};
		this.cardOption.SingleOption.init();
		this.horeMoveSpeedBeforeI =0;
	}

}

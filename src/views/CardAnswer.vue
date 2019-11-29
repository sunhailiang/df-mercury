<template>
    <div class="main-div-box">
        <div class="logo-view">
            <img class="logo" src="../assets/image/logo2.png"/>
        </div>
        <div class="context-title">
            <div class="context-heng"></div>
            <p class="context-p"><b>诫·糖健康打卡体质自测</b></p>
        </div>
        <div class="timu-view">
            <span>{{uiTextContent}}</span>
        </div>
        <div class="div-fen">
            <span v-show="showClassDiv == typeScoring">{{scorNum}}分</span>
        </div>
        <!-- <div class="div-ka-bg" @click="newCardsToast"> -->
        <div class="div-ka-bg">
            <!-- 拉取很多卡牌的动画效果div -->
            <div v-show="!showToastDiv" v-for="item in bgData" :key="item.id" :ref="'kb'+item.id" class="div-ka-view"
                :style="{ transform: 'translateX(-'+ kslX +') translateY(-'+ kslY +')' }"
            >
            </div>
            <!-- 常驻背景 -->
            <div v-show="showToastDiv && showBg" class="div-ka-view"></div>

            <!-- 可操作卡牌 单选 双选项 可拖动的效果 -->
            <div v-show="showToastDiv && showBooleanTypeDiv" class="div-ka-bg" ref="kapai"
                :style="{ transform: 'translateX('+ finalMoveX +'px) translateY('+ finalMoveY +'px) rotate('+ finalRotate +'deg)' }"
                @touchstart='touchStart' @touchmove='touchMove' @touchend='touchEnd'
            >
                <!-- 可操作卡牌背面 -->
                <div v-show="!showCardsBackOrCardsFront" class="div-ka-view"></div>
                <!-- 可操作性卡牌正面 -->
                <div v-show="showCardsBackOrCardsFront" :class="['div-kazheng-view', direction == 'left' ? 'div-kazheng-img-left' : 'div-kazheng-img-right']">
                    <!-- 固定在底部的 提示蒙层 -->
                    <div class="div-mengceng">
                        <img src="../assets/image/shous_wz_icon.png" class="mc-img-left"/>
                        <img src="../assets/image/shous_wy_icon.png" class="mc-img-right"/>
                    </div>
                    <div v-show="this.finalMoveX >= 0" ref="daleft" class="div-ka-xuanxiang-left"
                        :style="{ transform: 'translateY('+ optionY +'px)' }"
                    >
                        <p>{{uiTextLeft}}</p>
                    </div>
                    <div v-show="this.finalMoveX < 0" ref="daright" class="div-ka-xuanxiang-right"
                        :style="{ transform: 'translateY('+ optionY +'px)' }"
                    >
                        <p>{{uiTextRight}}</p>
                    </div>
                </div>
            </div>

            <!-- 其他效果 -->
            <div v-show="showToastDiv && !showBooleanTypeDiv" class="div-ka-bg-s" ref="blackkapai"
                :style="{ transform: 'translateX('+ finalHorMoveX +'px) translateY('+ finalHorMoveY +'px)' }"
                @touchstart='touchStart' @touchmove='touchMove' @touchend='touchEnd'
            >
                <!-- 可操作卡牌背面 -->
                <div v-show="!showCardsBackOrCardsFront" class="div-ka-view"></div>
                <!-- 可操作页面的正面 -->

                <!-- 单选题 - 多个选项 -->
                <div v-show="showClassDiv===typeSingleOption && showCardsBackOrCardsFront" class="single-div-bg">
                    <div class="single-div"
                        :style="{ width: horizontalWidth, transform: 'translateX('+ horMoveX +'px)','transition': signTransition+'s' }"
                    >
                        <div v-for="(item, index) in horList" :key="index" :class="['single-div-item-bg',item.is ? 'single-div-item-bg-s' : 'single-div-item-bg-n']" @click.stop="singleOnClick(item,true)">
                            <img v-show="!item.is" src="../assets/image/da_but_icon.png" class="single-img-left"/>
                            <img v-show="!item.is" src="../assets/image/da_but_icon.png" class="single-img-right"/>

                            <img v-show="item.is" src="../assets/image/huisebs.png" class="single-img-left"/>
                            <img v-show="item.is" src="../assets/image/huisebs.png" class="single-img-right"/>
                            <span>{{item.title}}</span>
                        </div>
                    </div>
                    <div class="single-span-div">
                        <span class="single-span">左右滑动，点击选中</span><br/>
                        <span class="single-span">再向下滑动，确定并开始下一题</span>
                    </div>
                </div>

                <!-- 多选题 -->
                <div v-show="showClassDiv===typeMultiOption && showCardsBackOrCardsFront" class="multi-div">
                    <div class="multi-div-item-box">
                        <div v-for="(item, index) in multiList" :key="index" :class="['multi-div-item',item.is ? 'multi-div-item-bg-s' : 'multi-div-item-bg-n']" @click="multiOnClick(item)">
                            <img v-show="!item.is" src="../assets/image/da_but_icon.png" class="multi-img-left"/>
                            <img v-show="!item.is" src="../assets/image/da_but_icon.png" class="multi-img-right"/>

                            <img v-show="item.is" src="../assets/image/huisebs.png" class="multi-img-left"/>
                            <img v-show="item.is" src="../assets/image/huisebs.png" class="multi-img-right"/>
                            <span>{{item.title}}</span>
                        </div>
                    </div>
                    <div class="multi-span-div">
                        <span class="multi-span">向下滑动，确定并开始下一题</span>
                    </div>
                </div>

                <!-- 评分题 -->
                <div v-show="showClassDiv===typeScoring && showCardsBackOrCardsFront" class="scoring-div">
                    <div class="scoring-box">
                        <div v-show="scorNum >= 1" class="scoring-chong-1"></div>
                        <div v-show="scorNum >= 2" class="scoring-chong-2"></div>
                        <div v-show="scorNum >= 3" class="scoring-chong-3"></div>
                        <div v-show="scorNum >= 4" class="scoring-chong-4"></div>
                        <div v-show="scorNum >= 5" class="scoring-chong-5"></div>
                    </div>
                    <div class="scoring-span-div">
                        <span class="scoring-span">左右滑动，点击选中</span><br/>
                        <span class="scoring-span">再向下滑动，确定并开始下一题</span>
                    </div>
                </div>

                <!-- 填空题 -->
                <div v-show="showClassDiv===typeTextBox && showCardsBackOrCardsFront" class="textbox-div">
                    <div class="textbox-box">
                        <input class="input-textbox" placeholder="点击填写您的回答" v-model="text"/>
                    </div>
                    <div class="textbox-span-div">
                        <span class="textbox-span">向下滑动，确定并开始下一题</span>
                    </div>
                </div>

                <!-- 拍照题 -->
                <div v-show="(showClassDiv===typePhotoGraph || showClassDiv===typeUploadFiles) && showCardsBackOrCardsFront" class="photo_graph_div">
                    <div>
                        <ul class="img-list">
                            <li v-for='(value, key) in imgs' :key="key" class="img-item img-pos">
                                <img class="img-del" src="../assets/image/shanc_but.png"  @click="delImg(key)" alt="">
                                <img :src="getObjectURL(value)" alt="" srcset="">
                            </li>
                            <div id="inputFile" class="photo_graph_box" :style="{'display':imgLen > 3 ? 'none':'block'}" :class="imgLen == 0? 'photo_graph_top':'img-item'">
                                <div class="photo_graph_box_img"></div>
                                <input type="file" accept='image/*' name="" ref="inputer" @change="photoGraphAddImg"/>
                            </div>
                        </ul>
                    </div>
                    <div class="photo-span-div">
                        <span class="photo-span">向下滑动，上传并开始下一题</span>
                    </div>
                </div>

                <!-- 上传文件题目  同上 -->
                <!-- <div v-show="showClassDiv===typeUploadFiles && showCardsBackOrCardsFront" class="photo_graph_div">
                    <div>
                        <ul class="img-list">
                            <li v-for='(value, key) in imgs' :key="key" class="img-item img-pos">
                                <img class="img-del" src="../assets/image/shanc_but.png"  @click="delImg(key)" alt="">
                                <img :src="getObjectURL(value)" alt="" srcset="">
                            </li>
                            <div id="inputFile" class="photo_graph_box" :style="{'display':imgLen > 3 ? 'none':'block'}" :class="imgLen == 0? 'photo_graph_top':'img-item'">
                                <div class="photo_graph_box_img"></div>
                                <input type="file" accept='image/*' name="" ref="inputer" @change="photoGraphAddImg"/>
                            </div>
                        </ul>
                    </div>
                    <div class="photo-span-div">
                        <span class="photo-span">向下滑动，上传并开始下一题</span>
                    </div>
                </div> -->
            </div>
        </div>

        <div class="div-class-title">
            <span>{{uiTextClassName}}</span>
        </div>
        <div class="div-class">
            <div class="div-class-bg">
                <p>{{titleNumber}}</p>
            </div>
        </div>
        <div class="div-btm">
            <span>本测评来源于中国中医药学会体质测评标准</span>
        </div>
        <!-- 这里是吐司的轻提示动画框 -->
        <div class="div-toast-div-f" v-show="newToastShow" ref="toastfp"
            :style="{ transform: 'translateY(-'+toastFixY+')' }"
        >
            <div class="div-toast-bg-img">
                <span>{{toastText}}</span>
            </div>
        </div>
    </div>
</template>

<script>
//Velocity 这玩意，执行动画的数组 前后的每一个参数值都不能相同，否则动画就不执行
import Velocity from 'velocity-animate';
import axios from 'axios';
import { Toast } from 'vant';
import { setTimeout } from 'timers';
import cardConfMixins from '../mixins/card';

export default {
    mixins:[cardConfMixins],
    data(){
        return{
            // bgData 是执行新卡牌加入队列的卡牌张数
            bgData : [
                { id : '1' },{ id : '2' },{ id : '3' },{ id : '4' },{ id : '5' },
                { id : '6' },{ id : '7' },{ id : '8' },{ id : '9' },{ id : '10' },
                { id : '11' },{ id : '12' },{ id : '13' },{ id : '14' },{ id : '15' },
                { id : '16' },{ id : '17' },{ id : '18' },{ id : '19' }
            ],
            kacIs : true, //控制新卡组展示
            showToastDiv : false, // 是否展示 吐司 加载更多 卡牌嗖嗖嗖出来的动画
            showCardsBackOrCardsFront : false, //展示卡牌的背面还是正面 false背面   true正面

            showBooleanTypeDiv : true, //展示单选拖动效果 还是 其他效果，默认单选拖动=true  false为其他效果
            showClassDiv : '', //这里设置显示哪种类型的样式
            showBg : true, //是否展示 单选 左右拖动的 默认背景 配合showToastDiv使用

            token : '',
            guid : '646d6895-4cf4-40a1-80f4-d1a552654f82', //guid 646d6895-4cf4-40a1-80f4-d1a552654f82(这个是每道题目的类型都不一样的测试guid)
            answerUrl : 'https://demo.clarabeautynism.com/Mercury/Questionnaire/BeginTheAnswer',
            answerUploadFile : 'https://demo.clarabeautynism.com/Mercury/Upload/BeginUpload',
            answerHeader : '',

            uiTextClassName : '单选题', //题目类型 默认单选题

            uiTextContent : '',
            uiTextLeft : '',
            uiTextRight : '',
            uiTextIndex : 0,

            typeBooleanOption : 'BooleanOption',  //可以左右拖动的 单选题目
            typeSingleOption : 'SingleOption', //单选题，存在很多很多选项的那种
            typeMultiOption : 'MultiOption', //多选题目
            typeScoring : 'Scoring', //评分题目  0-5分选一
            typeTextBox : 'TextBox', //填空题
            typePhotoGraph : 'PhotoGraph', //拍照题目
            typeUploadFiles : 'UploadFiles', //上传文件题目 与拍照题目基本一致
            typeToastNotice : 'ToastNotice', //执行新的吐司 加载卡牌的动画 不做功能处理
            typeConclusion : 'Conclusion', //结束 看似最后一题
            typeBreakConclusion : 'BreakConclusion', //结束 中断 就是最后一题 必带url
            type : '', //

            typeActive : '', //当前题目的题型
            titleNumber : 0, //题目序号

            //屏幕宽度 用于滑动适配
            clientWidth : document.documentElement.clientWidth,
            //卡牌 单选题 左右滑动距离 超过后坠落效果 距离控制
            cltFallWidth : document.documentElement.clientWidth / 3,
            //初始 洗牌 多张卡牌洗入牌组的初始位置
            kslX : unit(750,true),
            kslY : unit(160,true),
            //翻转卡牌的最远位置
            fpX : unit(390,true),
            fpY : unit(80,true),
            //手指开始触碰的时候的坐标点
            touchStartX : 0,
            touchStartY : 0,
            //滑动过程中 调转左右方向时候的坐标点（也就是往左划，然后再往右滑动记录最左边的坐标点）
            touchContraryX : 0,
            touchContraryY : 0,
            touchContraryIndex : 0,
            //掉头开始时候 记录当前卡牌xy移动的位置
            moveContraryX : 0,
            moveContraryY : 0,
            moveContraryRotate : 0,
            //实时监听滑动过程中的屏幕坐标点
            touchMoveX : 0,
            touchMoveY : 0,
            //滑动结束后的 坐标点
            touchEndX : 0,
            touchEndY : 0,
            //计算之后的 卡片xy坐标
            finalMoveX : 0,
            finalMoveY : 0,
            finalRotate : 0,
            //计算之后的 卡片上 答案的xy坐标，只有y坐标移动，x不会动 还有相反的旋转角度
            finalAnswerX : 0,
            finalAnswerY : 0,
            finalAnswerRotate : 0,

            //答案坠落方向
            direction : 'left',
            //蒙层选项的坐标
            optionX : 0,
            optionY : 0,
            optionRotate : 0,

            //其他效果的参数设置
            horizontalWidth : unit(750*3,true), //这里是单选横向滚动的总宽度，根据item计算
            horMoveX : 0,
            horMoveY : 0,
            horMoveStartX : 0, //横向滚动横向滑动坐标
            horMoveStartY : 0, //y
            horMoveEndX : 0, //结束后的记录
            horMoveEndY : 0, //y
            horList : [
                { is : true, title : '1' },
                { is : false, title : '2' },
                { is : false, title : '3' },
            ],
            finalHorMoveX : 0,
            finalHorMoveY : 0,

            //多选题效果
            multiList : [
                { is : true, title : '1' },
                { is : false, title : '2' },
                { is : false, title : '3' },
                { is : false, title : '4' },
                { is : false, title : '5' },
                { is : false, title : '6' },
            ],

            //评分题分数设置 -- 这两个默认值必须设置的一样
            scorNum : 2, //评分题目的分数设置 - 动态
            scorFinalNum : 2, //固定最后的结果
            //评分滑动距离设置
            scorDistance : document.documentElement.clientWidth / 15,
            scoringTurnX : 0, //滑动调转方向时候的坐标
            scoringTurnY : 0,
            scoringMoveX : 0, //实时统计滑动的坐标位置
            scoringMoveY : 0,
            scoringFX : 0, //0=向左 1=向右

            text : '',

            imgLen : 0, //图片张数
            fil : [], //原始图片路径
            imgs : {}, //上传图片路径
            formData : new FormData(),

            //吐司浮层定位 动画进入初始位置
            toastFixY : unit(1100,true), //
            toastText : '',
            newToastShow : true,

            isOver : false, //是否完成所有答题
            prohibitMove : false, //动画执行过程中 禁止其他操作


        }
    },
    created(){
        Toast.setDefaultOptions({
            className : 'toast-box',
        })
        //开始初始化程序第一题的 guid
        this.guid = '646d6895-4cf4-40a1-80f4-d1a552654f82'; //这个是顺序 一样一个
        // this.guid = '03092485-fadc-4aa2-8d36-87f0457182f2'; //这个是乱序 好多好多
        //执行首次的吐司动画 - 调用自动登录 - 并加载第一题
        this.newCardsToast();
        // this.toastFanpai();
    },
    methods: {
        /**
         * 简介：这里是监听手势 开始点击的时候的监听
         * 功能：
         * 1.记录每次滑动开始时候的坐标
         * 2.监听顶点坐标的重置位置
         */
        touchStart(e) {
            if(this.prohibitMove){
                console.log('禁止移动');
                return;
            }
            //滑动开始
            e = e || event;
            // let pageX = unit(Number(e.touches[0].pageX),false);
            // let pageY = unit(Number(e.touches[0].pageY),false);
            let pageX = Number(e.touches[0].pageX);
            let pageY = Number(e.touches[0].pageY);

            if(this.showBooleanTypeDiv){
                //这里是单选可拖拽动画的处理逻辑
                //记录每次滑动事件开始的位置
                this.touchStartX = pageX;
                this.touchStartY = pageY;
                //向左向右顶点的坐标在每次开始滑动时重新赋值 和开始坐标一致
                this.touchContraryX = pageX;
                this.touchContraryY = pageY;
            }else{
                //
                //这里是除了单选之外的操作逻辑处理
                this.horMoveStartX = pageX;
                this.horMoveStartY = pageY;
                //评分题目 初始化左右滑动的位置信息
                this.scoringTurnX = pageX;
                this.scoringTurnY = pageY;
            }
        },
        /**
         * 简介：这里是监听手势 滑动过程中 实时监听位置信息
         * 功能：
         * 1.监听位置，处理数据，处理动画效果 （ 分为 单选类型滚动效果、评分效果、其他效果 ）
         */
        touchMove (e) {
            if(this.prohibitMove){
                console.log('禁止移动');
                return;
            }
            //滑动中
            e = e || event;
            e.preventDefault();
            // let pageX = unit(Number(e.touches[0].pageX),false);
            // let pageY = unit(Number(e.touches[0].pageY),false);
            let pageX = Number(e.touches[0].pageX);
            let pageY = Number(e.touches[0].pageY);

            if(this.showBooleanTypeDiv){
                //这里是单选可拖拽动画的处理逻辑

                //根据 处理 实际的移动像素来适配动画效果的参数
                let xExc = 0.8; //用乘法来加快滑动速度
                let yExc = 10; //用除法来减缓速度
                let rExc = 6; //用除法来减缓速度

                //首先计算，滑动方向，向左还是向右
                if(pageX > this.touchMoveX){
                    //向右滑动ing...
                    //console.log('向右滑动ing...',this.touchContraryIndex);
                    //首先给进行一次计算后的 坐标监听字段赋值
                    this.touchMoveX = pageX;
                    this.touchMoveY = pageY;
                    if(this.touchContraryIndex == 0){
                        // console.log('------右转，掉头');
                        this.touchContraryIndex = 1;
                        //记录掉头的坐标点
                        this.touchContraryX = pageX;
                        this.touchContraryY = pageY;
                        this.moveContraryX = this.finalMoveX;
                        this.moveContraryY = this.finalMoveY;
                        this.moveContraryRotate = this.finalRotate;
                    }else{
                        //正常滑动
                    }
                    //正常向右滑动 计算向右的滑动坐标
                    this.finalMoveX = this.moveContraryX + (this.touchMoveX - this.touchContraryX) * xExc;
                    this.finalMoveY = this.moveContraryY + (this.touchMoveY - this.touchContraryY) / yExc;
                    this.finalRotate = this.moveContraryRotate + (this.touchMoveX - this.touchContraryX) * 375 / this.clientWidth / rExc ;
                    //计算答案的高度以及旋转
                    //向右滑动是 正数
                    this.setOptionXY();
                }else{
                    //向左滑动ing...
                    //console.log('向左滑动ing...',this.touchContraryIndex);
                    //首先给进行一次计算后的 坐标监听字段赋值
                    this.touchMoveX = pageX;
                    this.touchMoveY = pageY;
                    if(this.touchContraryIndex == 1){
                        // console.log('------左转，掉头');
                        this.touchContraryIndex = 0;
                        //记录掉头的坐标点
                        this.touchContraryX = pageX;
                        this.touchContraryY = pageY;
                        this.moveContraryX = this.finalMoveX;
                        this.moveContraryY = this.finalMoveY;
                        this.moveContraryRotate = this.finalRotate;
                    }else{
                        //正常滑动
                    }
                    //正常向左滑动 计算向左的滑动坐标
                    this.finalMoveX = this.moveContraryX + (this.touchMoveX - this.touchContraryX) * xExc;
                    this.finalMoveY = this.moveContraryY + (this.touchMoveY - this.touchContraryY) / yExc;
                    this.finalRotate = this.moveContraryRotate + (this.touchMoveX - this.touchContraryX) * 375 / this.clientWidth / rExc ;
                    //计算答案的高度以及旋转
                    //向左滑动是 负数
                    this.setOptionXY();
                }
            }else{

                // 如果 该卡牌存在 X 轴移动触发
                if (this.cardOption.xMove.indexOf(this.showClassDiv) >= 0)  {
                    if(!this.config.response) {
                        let horMoveX = this.horMoveEndX + (pageX - this.horMoveStartX);
                        let finalHorMoveY = (pageY - this.horMoveStartY) / 2;
                        this.responseHandle({
                            x: horMoveX,
                            y:finalHorMoveY,
                            X: this.horMoveX,
                            Y: this.finalHorMoveY
                        });
                    }
                    if (this.config.response  === 'x') {
                        if (this.cardOption[this.showClassDiv]) {
                            this[this.cardOption[this.showClassDiv].event](this.horMoveStartX,this.horMoveEndX,pageX);
                        } else {
                            this.horMoveX = this.horMoveEndX + (pageX - this.horMoveStartX);
                        }
                    } else {
                        this.finalHorMoveY = (pageY - this.horMoveStartY) / 2;
                    }
                } else {
                    this.finalHorMoveY = (pageY - this.horMoveStartY) / 2;
                }


                //这里是其他类型的拖动方式的处理方式
                // 控制 X 轴
                // this.horMoveX = this.horMoveEndX + (pageX - this.horMoveStartX);
                //this.finalHorMoveX = (this.horMoveEndX + (pageX - this.horMoveStartX)) * 0.05;
                // 控制 Y 轴
                // this.finalHorMoveY = (pageY - this.horMoveStartY) / 2;


                if(this.showClassDiv == this.typeScoring){
                    //评分题 - 左右滑动 增减星星的算法
                    let jl = pageX - this.scoringTurnX;
                    if(jl < 0){ jl = -jl }
                    let num = parseInt(jl / this.scorDistance);
                    this.scorNum = this.scorFinalNum;
                    if(pageX >= this.scoringTurnX){
                        //最终向右 增加
                        this.scorNum = (this.scorNum + num) > 5 ? 5 : (this.scorNum + num);
                    }else{
                        //向左减去
                        this.scorNum = (this.scorNum - num) >= 1 ? (this.scorNum - num) : 1;
                    }

                    //如果掉头，重新计算起点坐标
                    //首先计算，滑动方向，向左还是向右
                    // if(pageX > this.scoringMoveX){
                    //     //向右滑动
                    //     this.scoringMoveX = pageX;
                    //     if(this.scoringFX == 0){
                    //         //把向左改成向右
                    //         this.scoringFX = 1;
                    //         this.scoringTurnX = pageX;

                    //     }
                    //     //计算分数 向右 增加分数
                    //     this.scorNum = this.scorFinalNum;
                    //     let num = this.scorNum + parseInt((this.scoringMoveX - this.scoringTurnX) / this.scorDistance);
                    //     this.scorNum = num > 5 ? 5 : num;
                    // }else{
                    //     //向左滑动
                    //     this.scoringMoveX = pageX;
                    //     if(this.scoringFX == 1){
                    //         //把向右改成向左
                    //         this.scoringFX = 0;
                    //         this.scoringTurnX = pageX;
                    //     }
                    //     //计算分数 向左 递减分数
                    //     this.scorNum = this.scorFinalNum;
                    //     let num = this.scorNum + parseInt((this.scoringMoveX - this.scoringTurnX) / this.scorDistance);
                    //     this.scorNum = num > 5 ? 5 : num;
                    // }
                }
            }
        },
        /**
         * =========================================================================================================================
         * =========================================================================================================================
         * =========================================================================================================================
         * =========================================================================================================================
         * =========================================================================================================================
         * =========================================================================================================================
         *
         *
         *
         * 主要手势操作逻辑页面
         *
         * 简介：这里是监听手势 滑动结束后，处理动画事件的方法
         * 功能：(各种手势操作)
         *
         *
         *
         * =========================================================================================================================
         * =========================================================================================================================
         * =========================================================================================================================
         * =========================================================================================================================
         * =========================================================================================================================
         * =========================================================================================================================
         */
        touchEnd (e) {
            if(this.prohibitMove){
                console.log('禁止移动');
                return;
            }


            //滑动之后
            e = e || event;
            if(this.showBooleanTypeDiv){
                //这里是单选处理的方式代码
                if(this.finalMoveX > this.cltFallWidth || this.finalMoveX < -this.cltFallWidth){
                    this.velocity_Boolean_Restore();
                }else{
                    this.velocity_Boolean_Springback();
                }
            }else if(this.showClassDiv === this.typeSingleOption || this.showClassDiv === this.typeMultiOption ||
                this.showClassDiv === this.typeScoring){
                //处理单选题目的代码
                this.horMoveEndX = this.horMoveX;
                this.horMoveEndY = this.horMoveY;

                console.log(this.clientWidth / 7);
                if(this.showClassDiv === this.typeSingleOption){
                    if(this.finalHorMoveY < 0 || this.finalHorMoveY < this.clientWidth / 7){

                        if (this.config.response === 'x') {
                            this.SingleOptionHandleEndX(this.horMoveX);
                            this.horMoveEndX = this.horMoveX;
                        }

                        //拖动距离不足，还原操作动画执行
                        this.velocity_Single_Springback();
                    }else{
                        //超过距离，进行动画处理
                        this.velocity_Single_Restore();
                    }
                }

                if(this.showClassDiv === this.typeMultiOption){
                    if(this.finalHorMoveY < 0 || this.finalHorMoveY < this.clientWidth / 7){
                        //拖动距离不足，还原操作动画执行
                        this.velocity_Multi_Springback();
                    }else{
                        //超过距离，进行动画处理
                        this.velocity_Multi_Restore();
                    }
                }

                //如果是评分题 还需要设置分数
                if(this.showClassDiv === this.typeScoring){
                    this.scorFinalNum = this.scorNum;
                    if(this.finalHorMoveY < 0 || this.finalHorMoveY < this.clientWidth / 7){
                        //拖动距离不足，还原操作动画执行
                        this.velocity_Scoring_Springback();
                    }else{
                        //超过距离，进行动画处理
                        this.velocity_Scoring_Restore();
                    }
                }
            }else if(this.showClassDiv === this.typeTextBox || this.showClassDiv === this.typePhotoGraph ||
                this.showClassDiv === this.typeUploadFiles){

                //填空题
                if(this.showClassDiv === this.typeTextBox){
                    if(this.finalHorMoveY < 0 || this.finalHorMoveY < this.clientWidth / 7){
                        //拖动距离不足，还原操作动画执行
                        this.velocity_textbox_Springback();
                    }else{
                        //超过距离，进行动画处理
                        this.velocity_textbox_Restore();
                    }
                }

                // 拍照题
                if(this.showClassDiv === this.typePhotoGraph){
                    if(this.finalHorMoveY < 0 || this.finalHorMoveY < this.clientWidth / 7){
                        //拖动距离不足，还原操作动画执行
                        this.velocity_PhotoGraph_Springback();
                    }else{
                        if(this.imgLen == 0){
                            //提示请先上传图片 然后执行动画回弹
                            Toast.fail('请至少先选择一张图片\n');
                            this.velocity_PhotoGraph_Springback();
                        }else{
                            //超过距离，进行动画处理
                            this.velocity_PhotoGraph_Restore();
                        }
                    }
                }

                // 上传文件
                if(this.showClassDiv === this.typeUploadFiles){
                    if(this.finalHorMoveY < 0 || this.finalHorMoveY < this.clientWidth / 7){
                        //拖动距离不足，还原操作动画执行
                        this.velocity_PhotoGraph_Springback();
                    }else{
                        if(this.imgLen == 0){
                            //提示请先上传图片 然后执行动画回弹
                            Toast.fail('请至少先选择一张图片\n');
                            this.velocity_PhotoGraph_Springback();
                        }else{
                            //超过距离，进行动画处理
                            this.velocity_PhotoGraph_Restore();
                        }
                    }
                }
            }
            // 清除限制 某一个轴
            this.clearResponseHandle();
        },
        /**
         * touch 监听处理数据逻辑的方法 缩减为公共方法
         * 计算左右
         */
        setOptionXY(){
            let sc = this.clientWidth / 375;
            if(this.finalMoveX < 0 && this.finalMoveX > -100*sc){
                this.optionY = -this.finalMoveX;
                if(this.finalMoveX < -85*sc){
                    this.optionY = 85*sc;
                }
                // console.log('左边 = ',this.optionY);
            }else if(this.finalMoveX >= 0 && this.finalMoveX < 100*sc){
                this.optionY = this.finalMoveX;
                if(this.finalMoveX > 85*sc){
                    this.optionY = 85*sc;
                }
                // console.log('右边 = ',this.optionY);
            }
        },
        /**
         * touch 监听处理数据逻辑的方法 缩减为公共方法
         * 清空所有值
         */
        restoreAllData(){
            //手指开始触碰的时候的坐标点
            this.touchStartX = 0;
            this.touchStartY = 0;
            //滑动过程中 调转左右方向时候的坐标点（也就是往左划，然后再往右滑动记录最左边的坐标点）
            this.touchContraryX = 0;
            this.touchContraryY = 0;
            this.touchContraryIndex = 0;
            //掉头开始时候 记录当前卡牌xy移动的位置
            this.moveContraryX = 0;
            this.moveContraryY = 0;
            this.moveContraryRotate = 0;
            //实时监听滑动过程中的屏幕坐标点
            this.touchMoveX = 0;
            this.touchMoveY = 0;
            //滑动结束后的 坐标点
            this.touchEndX = 0;
            this.touchEndY = 0;
            //计算之后的 卡片xy坐标
            this.finalMoveX = 0;
            this.finalMoveY = 0;
            this.finalRotate = 0;
            //计算之后的 卡片上 答案的xy坐标，只有y坐标移动，x不会动 还有相反的旋转角度
            this.finalAnswerX = 0;
            this.finalAnswerY = 0;
            this.finalAnswerRotate = 0; //
        },
        /**
         * 单选手势操作的翻转卡牌的动画 -- 过时
         *
         */
        fanpai(){
            //翻转卡牌上半段
            Velocity(this.$refs.kapai,
                { transform: [ 'translateX(-'+this.fpX+') translateY(-'+this.fpY+') rotateY(270deg)','translateX(0) translateY(0) rotateY(360deg)' ] },
                {
                    duration: 400,
                    queue: 'fp',
                    complete: (elements, activeCall) => {
                        this.showCardsBackOrCardsFront = true;
                    }
                }
            )
            //翻转卡牌下半段
            Velocity(this.$refs.kapai,
                { transform: [ 'translateX(0) translateY(0) rotateY(0)','translateX(-'+this.fpX+') translateY(-'+this.fpY+') rotateY(90deg)' ] },
                {
                    duration: 200,
                    queue: 'fp',
                    complete: (elements, activeCall) => {
                        //所有动画执行结束 允许进行手势操作 设置为false
                        this.prohibitMove = false;
                    }
                }
            )
        },
        /**
         * 单选手势操作的翻转卡牌的动画
         *
         */
        fanpaiBool(){
            let direction = this.direction;
            if(direction == 'left'){
                //单选题向左滑动的答案
                //翻转卡牌上半段
                Velocity(this.$refs.kapai,
                    { transform: [ 'translateX(-'+this.fpX+') translateY(-'+this.fpY+') rotateY(270deg)','translateX(0) translateY(0) rotateY(360deg)' ] },
                    {
                        duration: 400,
                        queue: 'myUp',
                        complete: (elements, activeCall) => {
                            this.showCardsBackOrCardsFront = true;
                        }
                    }
                )
                //翻转卡牌下半段
                Velocity(this.$refs.kapai,
                    { transform: [ 'translateX(0) translateY(0) rotateY(0)','translateX(-'+this.fpX+') translateY(-'+this.fpY+') rotateY(90deg)' ] },
                    {
                        duration: 200,
                        queue: 'myUp',
                        complete: (elements, activeCall) => {
                            //所有动画执行结束 允许进行手势操作 设置为false
                            this.prohibitMove = false;
                        }
                    }
                )
            } else {
                //向右翻转的答案
                //翻转卡牌上半段
                Velocity(this.$refs.kapai,
                    { transform: [ 'translateX('+this.fpX+') translateY(-'+this.fpY+') rotateY(270deg)','translateX(0) translateY(0) rotateY(360deg)' ] },
                    {
                        duration: 400,
                        queue: 'myUp',
                        complete: (elements, activeCall) => {
                            this.showCardsBackOrCardsFront = true;
                        }
                    }
                )
                //翻转卡牌下半段
                Velocity(this.$refs.kapai,
                    { transform: [ 'translateX(0) translateY(0) rotateY(0)','translateX('+this.fpX+') translateY(-'+this.fpY+') rotateY(90deg)' ] },
                    {
                        duration: 200,
                        queue: 'myUp',
                        complete: (elements, activeCall) => {
                            //所有动画执行结束 允许进行手势操作 设置为false
                            this.prohibitMove = false;
                        }
                    }
                )
            }
        },
        /**
         * 单选多个选项 的翻牌效果
         */
        singleFanka(){
            //翻转卡牌上半段
            Velocity(this.$refs.blackkapai,
                { transform: [ 'translateX(-'+this.fpX+') translateY(-'+this.fpY+') rotateY(270deg)','translateX(0) translateY(0) rotateY(360deg)' ] },
                {
                    duration: 400,
                    queue: 'fp',
                    complete: (elements, activeCall) => {
                        this.showCardsBackOrCardsFront = true;
                    }
                }
            )
            //翻转卡牌下半段
            Velocity(this.$refs.blackkapai,
                { transform: [ 'translateX(0) translateY(0) rotateY(0)','translateX(-'+this.fpX+') translateY(-'+this.fpY+') rotateY(90deg)' ] },
                {
                    duration: 200,
                    queue: 'fp',
                    complete: (elements, activeCall) => {
                        //所有动画执行结束 允许进行手势操作 设置为false
                        this.prohibitMove = false;
                    }
                }
            )
        },
        /**
         *
         */
        toastFanpai(){
            this.$nextTick(()=>{
                Velocity(this.$refs.toastfp,
                    { transform: ['translateY(0)','translateY(-'+ this.toastFixY +')'] },
                    {
                        duration: 1000,
                        complete: (elements, activeCall) => {

                        }
                    }
                )
            })
        },

        //==============================================================
        //=====================*** 新方法整合 ***=========================
        //==============================================================
        /*
            功能方法命名为  _fun 下划线开头，主要处理单独功能
            逻辑方法命名为  src 开头，主要梳理流程贯通
            其他方法随意
        */

        //==============================================================
        //====================*** 逻辑方法整合 ***========================
        //==============================================================
        /**
         * 新卡牌加入，吐司动画
         *
         * 首先还原清空页面，然后执行吐司加载动画，紧接着加载下一题的数据进行渲染新的页面
         *
         * 然后关联执行成功的方法进行后续操作
         */
        newCardsToast(){
            //执行成功后的动画效果 首先禁止手势操作 在公共的翻牌动画中打开
            this.prohibitMove = true;

            //还原所有卡牌
            //执行吐司动画
            //新的卡组开始时 一大群卡牌刷刷刷从左边出来
            if(this.kacIs){
                this.kacIs = false;

                let list = [];
                list = list.concat(this.bgData);
                list.reverse();
                list.map((item,index) => {
                    setTimeout(() => {
                        Velocity(this.$refs['kb'+item.id],
                            { transform: [ 'translateX(0) translateY(0)','translateX(-'+this.kslX+') translateY(-'+this.kslY+')' ] },
                            {
                                duration: 600 - index * 20,
                                complete: (elements, activeCall) => {
                                    this.cardsToastFinish(index);
                                }
                            }
                        )
                    }, 100 * index);
                })
            }
        },
        cardsToastFinish(index){
            if(index >= (this.bgData.length-1)){
                this.showToastDiv = true;
                setTimeout(() => {
                    this.newToastShow = false;
                },500);
                if(!this.token){
                    this._login();
                    //未登录的 登陆后直接拉取题目
                }else{
                    //已经登陆的 去获取下一题目类型
                    let params = {guid : this.guid}
                    console.log('post=', this.answerUrl, params);
                    axios.post(this.answerUrl, params, {
                            headers: { 'Content-Type': 'application/json','Authorization': 'Bearer ' + this.token }
                        }).then(({data,status,headers,config}) => {
                            console.log('res=', status, data);
                            this._distributeCardsClass(data);
                        }).catch((e) => {
                            console.log('err=', e);
                        })
                }
            }
        },


        //==============================================================
        //====================*** 功能方法整合 ***========================
        //==============================================================
        /**
         * 登录方法
         * (功能方法)
         *
         * token失效，或者首次登录的时候执行的方法。
         *
         * 登录获取token值 给获取题目的时候使用
         */
        _login(){
            let params = {
                username : "龙舌兰",
                passwordMD5 : "73f42f6244e73cf3c4d1122e23113073",
            }
            //https://jupiter.clarabeautynism.com/Account/SignIn
            //https://demo.clarabeautynism.com/Jupiter/Account/SignIn
            let url = 'https://demo.clarabeautynism.com/Jupiter/Account/SignIn';
            // === log log log log log log ===
            console.log('post=', url, params);
            axios.post(url, params, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                .then(({data,status,headers,config}) => {
                    // === log log log log log log ===
                    console.log('res=', status, data);
                    this.token = data.data;
                    //获取下一题
                    this._getNextTimu();
                });
        },
        /**
         * 获取下一题目的方法
         *
         * 根据 token 和 上一题的 guid 来拉取下一题目的数据
         *
         * 需要做唯一接口验证，禁止同时调用本接口多次
         */
        _getNextTimu(){
            let params = {
                guid : this.guid,
            }
            console.log('post=', this.answerUrl, params);
            axios.post(this.answerUrl, params, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.token,
                }
            })
            .then(({data,status,headers,config}) => {
                console.log('res=', status, data);
                this._distributeCardsClass(data);
            })
        },
        //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
        /**
         * 调用接口获取题目后
         * 获取卡牌类型之后，分发，处理 渲染不同的操作效果以及动画效果
         */
        _distributeCardsClass(data){
            let className = data.type;
            switch(className){
                case this.typeBooleanOption:
                    //当前题目类型为单选题
                    console.log('class=','单选 两选项');
                    //展示单选两选项的ui
                    this.showBooleanTypeDiv = true,
                    this.showClassDiv = this.typeBooleanOption;
                    this.showBg = true;
                    //guid数据赋值
                    this.guid = data.guid;
                    //展示数据赋值
                    this.uiTextClassName = '单选题';
                    this.uiTextContent = data.content;
                    this.uiTextLeft = data.options.right.text;
                    this.uiTextRight = data.options.left.text;
                    this.uiTextIndex += 1;
                    this.titleNumber += 1;
                    //执行翻转动画
                    // this.fanpai();
                    this.fanpaiBool();
                    break;
                case this.typeSingleOption:
                    //有很多选项的单选题
                    console.log('class=','单选 多选项');
                    this.showBooleanTypeDiv = false,
                    this.showClassDiv = this.typeSingleOption;
                    //guid数据赋值
                    this.guid = data.guid;
                    this.uiTextClassName = '单选题';
                    this.uiTextContent = data.content;
                    let list = [];
                    data.options.map((item,index) => {
                        let param = {
                            is : index == 0 ? true : false,
                            title : item,
                        }
                        list.push(param);
                    })
                    this.horList =list;
                    console.log(this.cardOption.SingleOption);
                    // 设置 x 轴
                    this.horMoveX = this.cardOption.SingleOption.avg;
                    this.horMoveEndX = this.horMoveX;
                    this.uiTextIndex += 1;
                    this.titleNumber += 1;

                    //执行翻转动画
                    this.singleFanka();
                    break;
                case this.typeMultiOption:
                    //多选题
                    console.log('class=','多选题');
                    this.showBooleanTypeDiv = false,
                    this.showClassDiv = this.typeMultiOption;
                    //guid数据赋值
                    this.guid = data.guid;
                    this.uiTextClassName = '多选题';
                    this.uiTextContent = data.content;
                    let listm = [];
                    data.options.map((item,index) => {
                        let param = {
                            is : false,
                            title : item,
                        }
                        listm.push(param);
                    })
                    this.multiList =listm;
                    this.uiTextIndex += 1;
                    this.titleNumber += 1;

                    //执行翻转动画
                    this.singleFanka();
                    break;
                case this.typeScoring:
                    //评分题
                    console.log('class=','评分题');
                    this.showBooleanTypeDiv = false,
                    this.showClassDiv = this.typeScoring;
                    //guid数据赋值
                    this.guid = data.guid;
                    this.uiTextClassName = '评分题';
                    this.uiTextContent = data.content;
                    this.uiTextIndex += 1;
                    this.titleNumber += 1;

                    //执行翻转动画
                    this.singleFanka();
                    break;
                case this.typeTextBox:
                    //填空题
                    console.log('class=','填空题');
                    this.showBooleanTypeDiv = false,
                    this.showClassDiv = this.typeTextBox;
                    //guid数据赋值
                    this.guid = data.guid;
                    this.uiTextClassName = '填空题';
                    this.uiTextContent = data.content;
                    this.uiTextIndex += 1;
                    this.titleNumber += 1;

                    //执行翻转动画
                    this.singleFanka();
                    break;
                case this.typePhotoGraph:
                    //上传图片
                    console.log('class=','上传图片');
                    this.showBooleanTypeDiv = false,
                    this.showClassDiv = this.typePhotoGraph;
                    //guid数据赋值
                    this.guid = data.guid;
                    this.uiTextClassName = '拍照题';
                    this.uiTextContent = data.content;
                    this.uiTextIndex += 1;
                    this.titleNumber += 1;

                    //执行翻转动画
                    this.singleFanka();
                    break;
                case this.typeUploadFiles:
                    //上传文件
                    console.log('class=','上传文件');
                    this.showBooleanTypeDiv = false,
                    this.showClassDiv = this.typeUploadFiles;
                    //guid数据赋值
                    this.guid = data.guid;
                    this.uiTextClassName = '上传文件题';
                    this.uiTextContent = data.content;
                    this.uiTextIndex += 1;
                    this.titleNumber += 1;

                    //执行翻转动画
                    this.singleFanka();
                    break;
                case this.typeToastNotice:
                    //guid数据赋值
                    this.guid = data.guid;
                    this.toastText = data.newCardDescription;
                    //执行吐司
                    console.log('class=','吐司');
                    this.newToastShow = true;
                    this.kacIs = true, //控制新卡组展示
                    this.showToastDiv = false, // 是否展示 吐司 加载更多 卡牌嗖嗖嗖出来的动画
                    this.showCardsBackOrCardsFront = false, //展示卡牌的背面还是正面 false背面   true正面

                    this.newCardsToast();
                    //同时执行加载轻提示向下动画的动画效果
                    this.toastFanpai();
                    break;
                case this.typeConclusion:
                    //结束答题
                    console.log('class=','Conclusion 也是双选项的单选');
                    //展示单选两选项的ui
                    this.showBooleanTypeDiv = true,
                    this.showClassDiv = this.typeBooleanOption;
                    this.showBg = true;
                    //guid数据赋值
                    this.guid = data.guid;
                    //展示数据赋值
                    this.uiTextClassName = '单选题';
                    // this.uiTextContent = data.content;
                    this.uiTextContent = data.title;
                    this.uiTextLeft = data.options.Right.text;
                    this.uiTextRight = data.options.Left.text;
                    this.uiTextIndex += 1;
                    this.titleNumber += 1;

                    //执行翻转动画
                    this.fanpaiBool();
                    break;
                case this.typeBreakConclusion:
                    //结束答题
                    console.log('class=','break 最后一题');
                    //展示单选两选项的ui
                    this.showBooleanTypeDiv = true,
                    this.showClassDiv = this.typeBooleanOption;
                    this.showBg = false;
                    //guid数据赋值
                    this.guid = data.guid;
                    //展示数据赋值
                    this.uiTextClassName = '单选题';
                    this.uiTextContent = data.content;
                    this.uiTextLeft = data.options.right.text;
                    this.uiTextRight = data.options.left.text;
                    this.uiTextIndex += 1;
                    this.titleNumber += 1;

                    this.isOver = true;
                    //执行翻转动画
                    this.fanpaiBool();
                    break;
            }
        },
        /**
         * 点击事件=单选题选中选项的方法
         */
        singleOnClick(items,animate){
            this.horList.map((item,index) => {
                item.is = false;
                if(items.title == item.title){
                    item.is = true;
                    clearTimeout(this.horMoveTime);
                    this.SingleOptionHandleEndX(0,index);
                }
            });
        },
        /**
         * 点击事件=多选题选中选项的方法
         */
        multiOnClick(items){
            this.multiList.map((item,index) => {
                if(items.title == item.title){
                    item.is = !item.is;
                }
            });
        },
        /**
         * 上传图片题目
         */
        photoGraphAddImg(event){
            // console.log(this.imgs)
            let inputDOM = this.$refs.inputer;
            // 通过DOM取文件数据
            this.fil = inputDOM.files;
            let oldLen = this.imgLen;
            let len = this.fil.length+oldLen;
            if(len>4){
                alert('最多可上传4张，您还可以上传'+(4-oldLen)+'张');
                return false;
            }
            for (let i=0; i < this.fil.length; i++) {
                let size = Math.floor(this.fil[i].size / 1024);
                if (size > 5*1024*1024) {
                    alert('请选择5M以内的图片！');
                    return false
                }
                this.imgLen++;
                this.$set(this.imgs,this.fil[i].name+'?'+new Date().getTime()+i,this.fil[i]);
                // console.log(this.fil[i].name+'?'+new Date().getTime()+i);
                // console.log(this.imgs);
            }
            // this.doUpload();
        },
        //生成本地图片地址
        getObjectURL(file) {
            var url = null ;
            if (window.createObjectURL!=undefined) { // basic
                url = window.createObjectURL(file) ;
            } else if (window.URL!=undefined) { // mozilla(firefox)
                url = window.URL.createObjectURL(file) ;
            } else if (window.webkitURL!=undefined) { // webkit or chrome
                url = window.webkitURL.createObjectURL(file) ;
            }
            // console.log(url)
            return url ;
        },
        //删除图片
        delImg(key){
            this.$delete(this.imgs,key);
            this.imgLen--;
        },
        /**
         * 上传文件 事例
         */
        // doUpload(){
        //     console.log('up=',this.imgs);
        //     for(let key in this.imgs){
        //         let name = key.split('?')[0];
        //         this.formData.append('file',this.imgs[key],name);
        //         // console.log('formData=',this.imgs[key],name);
        //     }

        //     axios.post(this.answerUploadFile, this.formData, {
        //             headers: { 'Content-Type': 'multipart/form-data','Authorization': 'Bearer ' + this.token }
        //         }).then(({data,status,headers,config}) => {
        //             console.log('res=', status, data);
        //             // this._distributeCardsClass(data);
        //         }).catch((e) => {
        //             console.log('err=', e);
        //         });
        // },

        //==============================================================
        //====================*** 动画方法整合 ***========================
        //==============================================================
        /**
         * 执行距离不够回弹动画 - 单选 左右动画
         */
        velocity_Boolean_Springback(){
            //未超过拖动距离，动画还原卡牌
            Velocity(this.$refs.kapai,
                { transform: [ 'translateX(0) translateY(0) rotate(0)','translateX('+ this.finalMoveX +'px) translateY('+ ( this.finalMoveY + 0.1 ) +'px) rotate('+ this.finalRotate +'deg)' ] },
                {
                    duration: 200,
                    complete: (elements, activeCall) => {
                        //还原所有值
                        this.restoreAllData();
                    }
                }
            )
            if(this.finalMoveX >= 0){
                //右滑还原 - 右滑是还原左边的答案
                //未超过拖动距离，动画还原 答案选项操作
                Velocity(this.$refs.daleft,
                    { transform: [ 'translateY(0)','translateY('+ this.optionY +'px)' ] },
                    {
                        duration: 200,
                        complete: (elements, activeCall) => {
                            this.optionY = 0;
                        }
                    }
                )
            }else{
                //左滑还原 - 左滑是还原右边的答案
                //未超过拖动距离，动画还原 答案选项操作
                Velocity(this.$refs.daright,
                    { transform: [ 'translateY(0)','translateY('+ this.optionY +'px)' ] },
                    {
                        duration: 200,
                        complete: (elements, activeCall) => {
                            this.optionY = 0;
                        }
                    }
                )
            }
        },
        /**
         * 执行成功后的动画 - 单选 左右动画
         */
        velocity_Boolean_Restore(){
            //执行成功后的动画效果 首先禁止手势操作 在公共的翻牌动画中打开
            this.prohibitMove = true;

            let direction = this.finalMoveX > this.cltFallWidth ? 'right' : this.finalMoveX < -this.cltFallWidth ? 'left' : 'left';
            //两边移动都超过** 则 下坠卡牌
            Velocity(this.$refs.kapai,
                { transform: [ 'translateX('+ this.finalMoveX +'px) translateY('+unit(1200,true)+') rotate('+ this.finalRotate +'deg)','translateX('+ this.finalMoveX +'px) translateY('+ this.finalMoveY +'px) rotate('+ this.finalRotate +'deg)' ] },
                {
                    duration: 400,
                    queue: 'myUp',
                    complete: (elements, activeCall) => {
                        //完成下坠 卡背
                        this.showCardsBackOrCardsFront = false;
                        //卡牌完成下坠之后 再进行更改背景图的操作
                        this.direction = direction;

                        if(this.isOver){
                            Toast.success('完成所有答题');
                            this.$router.replace('result');
                        }else{
                            //下坠卡牌后 调用下一题的数据接口
                            let params = {guid : this.guid,answer : 'left'}
                            if(direction == 'left'){
                                params.answer = 'left';
                            }else{
                                params.answer = 'right';
                            }
                            console.log('post=', this.answerUrl, params);
                            axios.post(this.answerUrl, params, {
                                    headers: { 'Content-Type': 'application/json','Authorization': 'Bearer ' + this.token }
                                }).then(({data,status,headers,config}) => {
                                    console.log('res=', status, data);
                                    this._distributeCardsClass(data);
                                }).catch((e) => {
                                    console.log('err=', e);
                                })
                        }
                    }
                }
            )

            if(this.isOver){

            }else{
                //还原卡牌
                Velocity(this.$refs.kapai,
                    { transform: [ 'translateX(0) translateY(0) rotate(0)','translateX(0.1px) translateY(0.1px) rotate(0.1deg)' ] },
                    {
                        duration: 1,
                        queue: 'myUp',
                        complete: (elements, activeCall) => {
                            //还原所有值
                            this.restoreAllData();
                            //还原opt
                            this.optionY = 0;
                        }
                    }
                )
            }
        },
        /**
         * 执行距离不够回弹动画 - 单选 普通
         */
        velocity_Single_Springback(){
            //未超过拖动距离，动画还原卡牌
            Velocity(this.$refs.blackkapai,
                { transform: [ 'translateX(0) translateY(0)','translateX(0.1px) translateY('+ ( this.finalHorMoveY + 0.1 ) +'px)' ] },
                {
                    duration: 200,
                    complete: (elements, activeCall) => {
                        //还原所有值
                        this.finalHorMoveY = 0;
                    }
                }
            )
        },
        /**
         * 执行成功后的动画 - 单选 普通
         */
        velocity_Single_Restore(){
            //执行成功后的动画效果 首先禁止手势操作 在公共的翻牌动画中打开
            this.prohibitMove = true;

            //两边移动都超过** 则 下坠卡牌
            Velocity(this.$refs.blackkapai,
                { transform: [ 'translateX(0px) translateY('+unit(1200,true)+')','translateX(0.1px) translateY('+ ( this.finalHorMoveY + 0.1 ) +'px)' ] },
                {
                    duration: 400,
                    queue: 'myUp',
                    complete: (elements, activeCall) => {
                        //完成下坠 卡背 展示 其他隐藏
                        this.showCardsBackOrCardsFront = false;

                        //之后 - - -
                        //下坠卡牌后 调用下一题的数据接口
                        let title = '';
                        this.horList.map((item,index) => {
                            if(item.is){
                                title = item.title;
                            }
                        });
                        let params = {guid : this.guid,answer : title}
                        console.log('post=', this.answerUrl, params);
                        axios.post(this.answerUrl, params, {
                                headers: { 'Content-Type': 'application/json','Authorization': 'Bearer ' + this.token }
                            }).then(({data,status,headers,config}) => {
                                console.log('res=', status, data);
                                this._distributeCardsClass(data);
                            }).catch((e) => {
                                console.log('err=', e);
                            })
                    }
                }
            )

            //还原卡牌
            Velocity(this.$refs.blackkapai,
                { transform: [ 'translateX(0) translateY(0)','translateX(0.1px) translateY(0.1px)' ] },
                {
                    duration: 1,
                    queue: 'myUp',
                    complete: (elements, activeCall) => {
                        //还原所有值
                        this.finalHorMoveY = 0;
                    }
                }
            )
        },

        /**
         * 执行距离不够回弹动画 - 多选
         */
        velocity_Multi_Springback(){
            //未超过拖动距离，动画还原卡牌
            Velocity(this.$refs.blackkapai,
                { transform: [ 'translateX(0) translateY(0)','translateX(0.1px) translateY('+ ( this.finalHorMoveY + 0.1 ) +'px)' ] },
                {
                    duration: 200,
                    complete: (elements, activeCall) => {
                        //还原所有值
                        this.finalHorMoveY = 0;
                    }
                }
            )
        },
        /**
         * 执行成功后的动画 - 多选
         */
        velocity_Multi_Restore(){
            //执行成功后的动画效果 首先禁止手势操作 在公共的翻牌动画中打开
            this.prohibitMove = true;

            //两边移动都超过** 则 下坠卡牌
            Velocity(this.$refs.blackkapai,
                { transform: [ 'translateX(0px) translateY('+unit(1200,true)+')','translateX(0.1px) translateY('+ ( this.finalHorMoveY + 0.1 ) +'px)' ] },
                {
                    duration: 400,
                    queue: 'myUp',
                    complete: (elements, activeCall) => {
                        //完成下坠 卡背 展示 其他隐藏
                        this.showCardsBackOrCardsFront = false;

                        //之后 - - -
                        //下坠卡牌后 调用下一题的数据接口
                        let titleList = [];
                        this.multiList.map((item,index) => {
                            if(item.is){
                                titleList.push(item.title);
                            }
                        });
                        let params = {guid : this.guid,answer : titleList}
                        console.log('post=', this.answerUrl, params);
                        axios.post(this.answerUrl, params, {
                                headers: { 'Content-Type': 'application/json','Authorization': 'Bearer ' + this.token }
                            }).then(({data,status,headers,config}) => {
                                console.log('res=', status, data);
                                this._distributeCardsClass(data);
                            }).catch((e) => {
                                console.log('err=', e);
                            })
                    }
                }
            )

            //还原卡牌
            Velocity(this.$refs.blackkapai,
                { transform: [ 'translateX(0) translateY(0)','translateX(0.1px) translateY(0.1px)' ] },
                {
                    duration: 1,
                    queue: 'myUp',
                    complete: (elements, activeCall) => {
                        //还原所有值
                        this.finalHorMoveY = 0;
                    }
                }
            )
        },

        /**
         * 执行距离不够回弹动画 - 评分
         */
        velocity_Scoring_Springback(){
            //未超过拖动距离，动画还原卡牌
            Velocity(this.$refs.blackkapai,
                { transform: [ 'translateX(0) translateY(0)','translateX(0.1px) translateY('+ ( this.finalHorMoveY + 0.1 ) +'px)' ] },
                {
                    duration: 200,
                    complete: (elements, activeCall) => {
                        //还原所有值
                        this.finalHorMoveY = 0;
                    }
                }
            )
        },
        /**
         * 执行成功后的动画 - 评分
         */
        velocity_Scoring_Restore(){
            //执行成功后的动画效果 首先禁止手势操作 在公共的翻牌动画中打开
            this.prohibitMove = true;

            //两边移动都超过** 则 下坠卡牌
            Velocity(this.$refs.blackkapai,
                { transform: [ 'translateX(0px) translateY('+unit(1200,true)+')','translateX(0.1px) translateY('+ ( this.finalHorMoveY + 0.1 ) +'px)' ] },
                {
                    duration: 400,
                    queue: 'myUp',
                    complete: (elements, activeCall) => {
                        //完成下坠 卡背 展示 其他隐藏
                        this.showCardsBackOrCardsFront = false;

                        //之后 - - -
                        //下坠卡牌后 调用下一题的数据接口
                        let params = {guid : this.guid,answer : this.scorFinalNum}
                        console.log('post=', this.answerUrl, params);
                        axios.post(this.answerUrl, params, {
                                headers: { 'Content-Type': 'application/json','Authorization': 'Bearer ' + this.token }
                            }).then(({data,status,headers,config}) => {
                                console.log('res=', status, data);
                                this._distributeCardsClass(data);

                                this.scorNum = 2;
                                this.scorFinalNum = 2;

                            }).catch((e) => {
                                console.log('err=', e);
                            })
                    }
                }
            )

            //还原卡牌
            Velocity(this.$refs.blackkapai,
                { transform: [ 'translateX(0) translateY(0)','translateX(0.1px) translateY(0.1px)' ] },
                {
                    duration: 1,
                    queue: 'myUp',
                    complete: (elements, activeCall) => {
                        //还原所有值
                        this.finalHorMoveY = 0;
                    }
                }
            )
        },
        /**
         * 执行距离不够回弹动画 填空题
         */
        velocity_textbox_Springback(){
            //未超过拖动距离，动画还原卡牌
            Velocity(this.$refs.blackkapai,
                { transform: [ 'translateX(0) translateY(0)','translateX(0.1px) translateY('+ ( this.finalHorMoveY + 0.1 ) +'px)' ] },
                {
                    duration: 200,
                    complete: (elements, activeCall) => {
                        //还原所有值
                        this.finalHorMoveY = 0;
                    }
                }
            )
        },
        /**
         * 执行成功后的动画 填空题
         */
        velocity_textbox_Restore(){
            //执行成功后的动画效果 首先禁止手势操作 在公共的翻牌动画中打开
            this.prohibitMove = true;

            //两边移动都超过** 则 下坠卡牌
            Velocity(this.$refs.blackkapai,
                { transform: [ 'translateX(0px) translateY('+unit(1200,true)+')','translateX(0.1px) translateY('+ ( this.finalHorMoveY + 0.1 ) +'px)' ] },
                {
                    duration: 400,
                    queue: 'myUp',
                    complete: (elements, activeCall) => {
                        //完成下坠 卡背 展示 其他隐藏
                        this.showCardsBackOrCardsFront = false;

                        //之后 - - -
                        //下坠卡牌后 调用下一题的数据接口
                        let params = {guid : this.guid,answer : this.text}
                        console.log('post=', this.answerUrl, params);
                        axios.post(this.answerUrl, params, {
                                headers: { 'Content-Type': 'application/json','Authorization': 'Bearer ' + this.token }
                            }).then(({data,status,headers,config}) => {
                                console.log('res=', status, data);
                                this._distributeCardsClass(data);

                                this.text = '';
                            }).catch((e) => {
                                console.log('err=', e);
                            })
                    }
                }
            )

            //还原卡牌
            Velocity(this.$refs.blackkapai,
                { transform: [ 'translateX(0) translateY(0)','translateX(0.1px) translateY(0.1px)' ] },
                {
                    duration: 1,
                    queue: 'myUp',
                    complete: (elements, activeCall) => {
                        //还原所有值
                        this.finalHorMoveY = 0;
                    }
                }
            )
        },
        /**
         * 执行距离不够回弹动画 拍照题 目
         */
        velocity_PhotoGraph_Springback(){
            //未超过拖动距离，动画还原卡牌
            Velocity(this.$refs.blackkapai,
                { transform: [ 'translateX(0) translateY(0)','translateX(0.1px) translateY('+ ( this.finalHorMoveY + 0.1 ) +'px)' ] },
                {
                    duration: 200,
                    complete: (elements, activeCall) => {
                        //还原所有值
                        this.finalHorMoveY = 0;
                    }
                }
            )
        },
        /**
         * 执行成功后的动画 拍照题 目
         */
        velocity_PhotoGraph_Restore(){
            //执行成功后的动画效果 首先禁止手势操作 在公共的翻牌动画中打开
            this.prohibitMove = true;

            //两边移动都超过** 则 下坠卡牌
            Velocity(this.$refs.blackkapai,
                { transform: [ 'translateX(0px) translateY('+unit(1200,true)+')','translateX(0.1px) translateY('+ ( this.finalHorMoveY + 0.1 ) +'px)' ] },
                {
                    duration: 400,
                    queue: 'myUp',
                    complete: (elements, activeCall) => {
                        //完成下坠 卡背 展示 其他隐藏
                        this.showCardsBackOrCardsFront = false;

                        //拍照题 需要首先上传图片 然后再调用下一题的接口数据
                        // console.log('up=',this.imgs);
                        let fileGuid = [];
                        let imgsLength = 0;
                        for(let key in this.imgs){
                            imgsLength++;
                        }
                        // console.log(imgsLength);
                        for(let key in this.imgs){
                            let formData = new FormData();
                            let name = key.split('?')[0];
                            formData.append('file',this.imgs[key],name);
                            // console.log('formData=',this.imgs[key],name);
                            axios.post(this.answerUploadFile, formData, {
                                    headers: { 'Content-Type': 'multipart/form-data','Authorization': 'Bearer ' + this.token }
                                }).then(({data,status,headers,config}) => {
                                    console.log('res=', status, data);
                                    //在这里存入上传文件后的数据
                                    fileGuid.push(data.uploadGuid);
                                    if(fileGuid.length == imgsLength){
                                        //上传完成
                                        console.log('上传完成');

                                            //之后 - - -
                                            //下坠卡牌后 调用下一题的数据接口 传入上传文件后拿到的guid的数组
                                            let params = {guid : this.guid,answer : fileGuid}
                                            console.log('post=', this.answerUrl, params);

                                            axios.post(this.answerUrl, params, {
                                                    headers: { 'Content-Type': 'application/json','Authorization': 'Bearer ' + this.token }
                                                }).then(({data,status,headers,config}) => {
                                                    console.log('res=', status, data);

                                                    //在这里重置图片属性控制字段
                                                    this.imgLen = 0, //图片张数
                                                    this.fil = [], //原始图片路径
                                                    this.imgs = {}, //上传图片路径
                                                    this.formData = new FormData(),
                                                    ///////////////////////////////

                                                    this._distributeCardsClass(data);
                                                }).catch((e) => {
                                                    console.log('err=', e);
                                                })

                                    }
                                }).catch((e) => {
                                    console.log('err=', e);
                                });
                        }


                    }
                }
            )

            //还原卡牌
            Velocity(this.$refs.blackkapai,
                { transform: [ 'translateX(0) translateY(0)','translateX(0.1px) translateY(0.1px)' ] },
                {
                    duration: 1,
                    queue: 'myUp',
                    complete: (elements, activeCall) => {
                        //还原所有值
                        this.finalHorMoveY = 0;
                    }
                }
            )
        }
    }
}
</script>

<style scoped lang="scss">
    .main-div-box {
        position: relative;
        overflow: hidden;
    }
    .logo-view{
        margin: 0 auto;
        text-align: center;
    }
    .logo {
        width: 428px;
        height: 38px;
        margin-top: 120px;
    }
    .context-title {
        height: 56px;
        margin: 75px auto 0;
        font-size: 40px;
        color : #ffffff;
        text-align: center;
    }
    .context-p {
        text-align: center;
        position: relative;
        top: -50px;
    }
    .context-heng {
        width: 410px;
        height: 10px;
        background-color: #4D201D;
        border-radius: 5px;
        margin: 0 auto;
    }
    .timu-view {
        width: 580px;
        height: 120px;
        margin: 0 auto 10px;
        text-align: center;
        span {
            font-size: 28px;
            color: #ffffff;
        }
    }
    .div-fen {
        width: 100px;
        height: 55px;
        margin: 0 auto;
        text-align: center;
        span {
            font-size: 28px;
            color: #784340;
        }
    }
    .div-ka-bg {
        width: 630px;
        height: 720px;
        margin: 0 auto;
        position: relative;
    }
    .div-ka-bg-s {
        width: 630px;
        height: 720px;
        margin: 0 auto;
        position: relative;
    }
    .div-ka-view {
        position: absolute;
        top: 0;
        width: 630px;
        height: 720px;
        background-image: url('../assets/image/img_kabei.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        -moz-background-size:100% 100%;
        margin: 0 auto;
    }
    .div-kazheng-view {
        position: absolute;
        top: 0;
        width: 630px;
        height: 720px;
        margin: 0 auto;
        overflow: hidden;
        border-radius: 20px;
    }
    .div-kazheng-img-left {
        background-image: url('../assets/image/yh_img.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        -moz-background-size:100% 100%;
    }
    .div-kazheng-img-right {
        background-image: url('../assets/image/zh_img.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        -moz-background-size:100% 100%;
    }
    .div-class-title {
        margin: 35px auto 30px;
        text-align: center;
        span {
            color: #ffffff;
            font-size: 28px;
        }
    }
    .div-class {
        margin: 0 auto;
    }
    .div-class-bg {
        margin: 0 auto;
        width: 196px;
        height: 33px;
        background-image: url('../assets/image/img_fuhao.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        -moz-background-size:100% 100%;
        text-align: center;
        p {
            color: #8E6868;
            font-size: 32px;
            line-height: 30px;
        }
    }
    .div-btm {
        margin: 50px auto;
        text-align: center;
        span {
            color: #999999;
            font-size: 24px;
        }
    }
    .div-ka-xuanxiang-left {
        width: 280px;
        height: 200px;
        background-color: rgba($color: #000000, $alpha: 0.3);
        position: relative;
        top: -200px;
        left: -30px;
        border-bottom-right-radius: 280px;
        text-align: center;
        p {
            color: #D9C3B3;
            font-size: 32px;
            line-height: 200px;
        }
    }
    .div-ka-xuanxiang-right {
        width: 280px;
        height: 200px;
        // background-color: #00000066;
        background-color: rgba($color: #000000, $alpha: 0.3);
        position: relative;
        top: -200px;
        right: -30px;
        float: right;
        border-bottom-left-radius: 280px;
        text-align: center;
        p {
            color: #D9C3B3;
            font-size: 32px;
            line-height: 200px;
        }
    }
    .div-mengceng {
        position: absolute;
        top: 0;
        width: 630px;
        height: 720px;
        background-image: url('../assets/image/kamian_tis_bg.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        -moz-background-size:100% 100%;
    }
    .mc-img-left {
        width: 100px;
        height: 100px;
        position: absolute;
        bottom: 55px;
        left: 50px;
    }
    .mc-img-right {
        width: 100px;
        height: 100px;
        position: absolute;
        bottom: 55px;
        right: 50px;
    }
    .single-div-bg {
        width: 630px;
        height: 720px;
        background-image: url('../assets/image/kamian01_img.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        -moz-background-size:100% 100%;
    }
    .single-div {
        padding-top: 240px;
    }
    .single-div-item-bg {
        width: 360px;
        height: 180px;
        background-color: #784340;
        border-radius: 5px;
        float: left;
        margin-right: 60px;
        margin-bottom: 70px;
        position: relative;
        line-height: 180px;
        text-align: center;
        span {
            width: 200px;
            font-size: 32px;
            color: #ffffff;
        }
    }
    .single-div-item-bg:last-child{
        margin-right:0;
    }
    .single-div-item-bg-s {
        background-color: #ffffff;
        span {
            color: #784340;
        }
    }
    .single-div-item-bg-n {
        background-color: #784340;
    }
    .single-span-div {
        text-align: center;
        line-height: 32px;
    }
    .single-span {
        font-size: 24px;
        color: #cccccc;
    }
    .single-img-left {
        width: 17px;
        height: 80px;
        position: absolute;
        top: 50px;
        left: 26px;
    }
    .single-img-right {
        width: 17px;
        height: 80px;
        position: absolute;
        top: 50px;
        right: 26px;
    }
    .multi-div {
        width: 630px;
        height: 720px;
        position: absolute;
        top: 0;
        background-image: url('../assets/image/kamian01_img.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        -moz-background-size:100% 100%;
    }
    .multi-div-item {
        width: 180px;
        height: 70px;
        background-color: #784340;
        border-radius: 5px;
        float: left;
        margin: 36px 40px;
        position: relative;
        line-height: 70px;
        text-align: center;
        span {
            width: 180px;
            font-size: 30px;
            color: #ffffff;
        }
    }
    .multi-div-item-bg-s {
        background-color: #ffffff;
        span {
            color: #784340;
        }
    }
    .multi-div-item-bg-n {
        background-color: #784340;
    }
    .multi-div-item-box {
        width: 520px;
        height: 426px;
        margin: 90px auto 0;
    }
    .multi-span-div {
        text-align: center;
        line-height: 32px;
        margin-top: 40px;
    }
    .multi-span {
        font-size: 24px;
        color: #cccccc;
    }
    .multi-img-left {
        width: 12px;
        height: 50px;
        position: absolute;
        top: 11px;
        left: 12px;
    }
    .multi-img-right {
        width: 12px;
        height: 50px;
        position: absolute;
        top: 11px;
        right: 12px;
    }
    .scoring-div {
        width: 630px;
        height: 720px;
        position: absolute;
        top: 0;
        background-image: url('../assets/image/kamian01_img.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        -moz-background-size:100% 100%;
    }
    .scoring-box {
        width: 286px;
        height: 456px;
        margin: 90px auto 0px;
        background-image: url('../assets/image/pingf_renwu_img.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        -moz-background-size:100% 100%;
        position: relative;
    }
    .scoring-span-div {
        text-align: center;
        line-height: 32px;
        margin-top: 21px;
    }
    .scoring-span {
        font-size: 24px;
        color: #cccccc;
    }
    .scoring-chong-1{
        width: 76px;
        height: 46px;
        background: url('../assets/image/pingfen_img_1.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        -moz-background-size:100% 100%;
        position: absolute;
        top: 120px;
        left: 49px;
    }
    .scoring-chong-2{
        width: 74px;
        height: 72px;
        background: url('../assets/image/pingfen_img_2.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        -moz-background-size:100% 100%;
        position: absolute;
        top: 105px;
        left: 200px;
    }
    .scoring-chong-3{
        width: 89px;
        height: 63px;
        background: url('../assets/image/pingfen_img_3.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        -moz-background-size:100% 100%;
        position: absolute;
        top: 200px;
        left: 80px;
    }
    .scoring-chong-4{
        width: 69px;
        height: 75px;
        background: url('../assets/image/pingfen_img_4.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        -moz-background-size:100% 100%;
        position: absolute;
        top: 225px;
        left: 210px;
    }
    .scoring-chong-5{
        width: 69px;
        height: 55px;
        background: url('../assets/image/pingfen_img_5.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        -moz-background-size:100% 100%;
        position: absolute;
        top: 310px;
        left: 165px;
    }
    .textbox-div {
        width: 630px;
        height: 720px;
        position: absolute;
        top: 0;
        background-image: url('../assets/image/kamian01_img.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        -moz-background-size:100% 100%;
    }
    .textbox-box {
        margin: 300px auto 0;
        width: 420px;
        height: 90px;
        color: #000000;
        border-top-width: 0px;
        border-left-width: 0px;
        border-right-width: 0px;
        border-bottom-width: 2px;
        border-bottom-color: #ffffff;
        border-bottom-style: solid;
    }
    .input-textbox {
        font-size: 28px;
        width: 420px;
        background-color: #784340;
        line-height: 90px;
        text-align: center;
        color: #ffffff;
        background-color: transparent;
        border-width: 0;
        border-color: transparent;
    }
    .textbox-span-div {
        text-align: center;
        line-height: 32px;
        margin-top: 180px;
    }
    .textbox-span {
        font-size: 24px;
        color: #cccccc;
    }
    .photo_graph_div {
        width: 630px;
        height: 720px;
        position: absolute;
        top: 0;
        background-image: url('../assets/image/kamian01_img.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        -moz-background-size:100% 100%;
    }
    .photo_graph_box {
        width: 182px;
        height: 182px;
        margin: auto;
        background-color: #4E201D;
        border-radius: 8px;
        position: relative;
        // top: 245px;
    }
    .photo_graph_top{
       top: 138px;
    }
    .photo_graph_box_img {
        width: 96px;
        height: 96px;
        margin: auto;
        border-radius: 8px;
        background-image: url('../assets/image/xiangj_icon.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        -moz-background-size:100% 100%;
        // position: relative;
        // top: 44px;
        position: absolute;
        top: 50%;
        left:50%;
        transform: translate(-50%,-50%);
        z-index: 3;
    }

    .photo_graph_box input {
        width: 182px;
        height: 182px;
        display: block;
        line-height: 96px;
        position: absolute;
        z-index: 3;
        opacity: 0;
    }

    .photo-span-div {
        position: absolute;
        width: 100%;
        bottom:100px;
        text-align: center;
        line-height: 32px;
        // margin-top: 310px;
    }
    .photo-span {
        font-size: 24px;
        color: #cccccc;
    }
    // .uploadfiles_div {
    //     width: 630px;
    //     height: 720px;
    //     position: absolute;
    //     top: 0;
    //     background-image: url('../assets/image/kamian01_img.png');
    //     background-repeat: no-repeat;
    //     background-size: 100% 100%;
    //     -moz-background-size:100% 100%;
    // }
    // .uploadfiles_box {
    //     width: 630px;
    //     height: 720px;
    // }
    .img-list{
        display: flex;
        width: 424px;
        margin: 106px auto 0;
        flex-wrap: wrap;
    }
    .img-item{
        width: 192px;
        height: 192px;
        margin: 10px;
        border-radius: 8px;
    }
    .img-item img{
        display: block;
        width: 100%;
        height: 100%;
        border-radius: 8px;
    }
    .img-pos{
        position: relative;
    }
    .img-pos .img-del{
        width:36px;
        height:36px;
        right: -18px;
        top:-18px;
        position: absolute;
    }
    .div-toast-div-f {
        width: 750px;
        height: 320px;
        background-color: rgba($color: #000000, $alpha: 0.6);
        position: fixed;
        top: 650px;
    }
    .div-toast-bg-img {
        width: 600px;
        height: 220px;
        margin: 47px auto 0;
        background-image: url('../assets/image/xdkp_img.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        span {
            display: inline-block;
            width: 100%;
            font-size: 30px;
            color: #ffffff;
            text-align: right;
            margin-top: 153px;
            margin-right: 30px;
        }
    }

</style>

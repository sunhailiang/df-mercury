<template>
  <div>
    <div class="bg">
      <div class="logo-view">
        <img class="logo" src="@/assets/image/logo2.png" />
      </div>
      <div class="context-title">
        <div class="context-heng"></div>
        <p class="context-p">
          <b>顾客您好!</b>
        </p>
      </div>
      <div class="content-line-1">
        <p>
          <b>欢迎您参加</b>
        </p>
        <p>
          <b>CLARABEAUTYNISM诫·糖控热饮</b>
        </p>
        <p>
          <b>&nbsp;30天健康打卡计划。</b>
        </p>
      </div>
      <div class="content-line-2">
        <p>CLARA BEAUTYNISM诚·糖控热饮是目前国内首款可以从根源抵御糖化对人体健康危害的一款抗糖化产品,为了让食谱更加贴合您的体质,请您认真完成以下答卷!</p>
        <p>我们专业的营养师和专业中医师会根据您的实际体质和健康状况给出更加适合您的食谱,一对一个性化定制服务!</p>
        <p>问卷眈误您5-10分钟左右时间,请您根据问题第一时间的反馈为答案。</p>
      </div>
      <div class="logo-xia-view">
        <img class="logo-xia" src="../assets/image/img_01.png" />
      </div>
      <div class="context-title">
        <div class="context-heng1"></div>
        <p class="context-p">
          <b>填写个人资料</b>
        </p>
      </div>
      <form class="from">
        <div class="input-view">
          <span class="input-hint-x">*&nbsp;</span>
          <span class="input-hint">姓名</span>
          <input class="input-name" placeholder="填写您的姓名" v-model="inputName" />
        </div>
        <div class="input-view input-view-top">
          <span class="input-hint-x">*&nbsp;</span>
          <span class="input-hint">性别</span>
          <img class="logo-xuan" src="../assets/image/xz_icon.png" />
          <span @click="sex_show = true" class="input-text">{{sex_data.name || '选择'}}</span>
        </div>
        <div class="input-view input-view-top">
          <span class="input-hint-x">*&nbsp;</span>
          <span class="input-hint">城市</span>
          <img class="logo-xuan" src="../assets/image/xz_icon.png" />
          <span
            class="input-text"
            @click="address_show = true"
          >{{address_data.length == 0 ? '选择' : address_data.join('/')}}</span>
        </div>
        <div class="input-view input-view-top">
          <span class="input-hint-x">*&nbsp;</span>
          <span class="input-hint">手机号码</span>
          <input class="input-name" placeholder="填写手机号码" v-model="inputPhone" />
        </div>
        <div class="input-view input-view-top input-yan-padding">
          <input class="input-yan-text" placeholder="填写验证码" v-model="inputSms" />
          <span class="input-yan-span" @click="count_down_send">{{code.buttonText}}</span>
        </div>
        <div class="input-save-view" @click="start">
          <img class="input-save-img input-save-img-left" src="../assets/image/xiao_but_icon.png" />
          <span class="input-save-text">开始答题</span>
          <img class="input-save-img input-save-img-right" src="../assets/image/xiao_but_icon.png" />
        </div>
      </form>
      <!-- <div class="hint-view">
        <span class="hint-text">{{hinText}}</span>
      </div>-->
    </div>
    <div class="bottom-view">
      <img class="bottom-logo" src="../assets/image/logo2.png" />
      <p class="bottom-text">本测评来源于中国中医药学会体质测评标准</p>
    </div>

    <model-address v-model="address_show" @confirm="confirmAddress"></model-address>
    <model-sex v-model="sex_show" :item="sex_data" @change="sexChange"></model-sex>
  </div>
</template>

<script>
import ModelAddress from "../components/model-address/src/main";
import ModelSex from "../components/model-sex/src/main";
import countDown from "@/mixins/count-down";
import axios from "axios";
import { Toast } from "vant";
import test from "../libs/test.js";
import Loading from "../components/Loading.vue";

export default {
  components: { ModelSex, ModelAddress, Loading },
  mixins: [countDown],
  data: function() {
    return {
      publicPath: process.env.BASE_URL,
      address_show: false,
      address_data: [],
      sex_show: false,
      sex_data: {},
      code: {
        buttonText: "发送验证码",
        buttonStatus: false
      },
      inputName: "",
      inputPhone: "",
      inputSms: "",
      // hinText : '验证码输入错误，请重新输入',
      send_url:
        "https://demo.clarabeautynism.com/Mercury/TraditionalMedicalConstitution/FastRegistration"
    };
  },
  methods: {
    start: function() {
      let testData = [
        {
          value: this.inputName,
          rules: "请输入您的姓名",
          key: "userName"
        },
        {
          value: this.sex_data.value || "",
          rules: "请选择性别",
          key: "userGender"
        },
        {
          value: this.address_data.join("-"),
          rules: "请选择城市",
          key: "city"
        },
        {
          value: this.inputPhone,
          rules: {
            empty: "请输入手机号",
            mobile: "手机号格式不正确"
          },
          key: "phoneNumber"
        },
        {
          value: this.inputSms,
          rules: "请输入验证码",
          key: "phoneCode"
        }
      ];

      testData = test.testArray(testData);

      if (!testData.test) {
        return this.toast(testData.msg);
      }

      let obj = testData.data;

      obj["phoneInfo"] = this.count_down_info;
      let city = obj["city"].split("-");
      obj["province"] = city[0];
      obj["city"] = city[1];

      let formData = new FormData();
      for (let key in obj) {
        formData.append(key, obj[key]);
      }

      axios
        .post(this.send_url, formData, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(data => {
          //开始答题-提交表单
          this.$router.push({ path: "/cardanswer" });
        })
        .catch(() => {
          this.toast.fail("验证码有误");
        });
    },
    confirmAddress: function(data) {
      this.address_data = data.value;
    },
    sexChange: function(item) {
      console.log(item);
      this.sex_data = item;
    }
  },
  created() {
    Toast.setDefaultOptions({
      className: "toast-box"
    });
    this.toast = Toast;
  }
};
</script>

<style scoped lang="scss">
.bg {
  width: 630px;
  height: 2212px;
  background-color: black;
  margin: 116px auto 60px;
  background-image: url("../assets/image/zily_bg.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  -moz-background-size: 100% 100%;
}
.logo-view {
  margin: 0 auto;
  text-align: center;
}
.logo {
  width: 435px;
  height: 39px;
  margin-top: 164px;
}
.context-title {
  height: 56px;
  margin: 75px auto 0;
  font-size: 40px;
  color: #ffffff;
  text-align: center;
}
.context-p {
  text-align: center;
  position: relative;
  top: -50px;
}
.context-heng {
  width: 174px;
  height: 10px;
  background-color: #4d201d;
  border-radius: 5px;
  margin: 0 auto;
}
.content-line-1 {
  width: 510px;
  margin: 0 auto;
  font-size: 32px;
  color: #ffffff;
  text-align: center;
}
.content-line-2 {
  width: 510px;
  margin: 0 auto;
  font-size: 28px;
  color: #ccc;
  // text-align: left;
  text-align: center;
  p {
    margin-top: 25px;
  }
}
.logo-xia-view {
  text-align: center;
}
.logo-xia {
  width: 20px;
  height: 20px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  -moz-background-size: 100% 100%;
  margin-top: 50px;
}
.context-heng1 {
  width: 240px;
  height: 10px;
  background-color: #4d201d;
  border-radius: 5px;
  margin: 0 auto;
}
.from {
  margin-top: 10px;
}
.input-view {
  width: 480px;
  height: 90px;
  border-width: 0;
  border-bottom-width: 1px;
  border-color: #ccc;
  border-style: solid;
  margin: 0 auto;
}
.input-view-top {
  margin-top: 20px;
}
.input-hint-x {
  font-size: 28px;
  color: #ff0000;
  line-height: 90px;
}
.input-hint {
  font-size: 28px;
  color: #ffffff;
  line-height: 90px;
}
.input-name {
  width: 300px;
  line-height: 90px;
  float: right;
  background-color: transparent;
  border-width: 0;
  border-color: transparent;
  font-size: 28px;
  color: #ffffff;
  text-align: right;
}
.logo-xuan {
  width: 23px;
  height: 13px;
  background-repeat: no-repeat;
  float: right;
  margin-top: 41px;
}
.input-text {
  width: 300px;
  font-size: 28px;
  color: #ffffff;
  line-height: 90px;
  float: right;
  margin-right: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  -ms-text-overflow: ellipsis;
  display: box;
  display: -webkit-box;
  line-clamp: 1;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  text-align: right;
}
.input-yan-span {
  float: right;
  font-size: 28px;
  color: #ffffff;
  line-height: 90px;
}
.input-yan-text {
  width: 170px;
  line-height: 90px;
  float: left;
  background-color: transparent;
  border-width: 0;
  border-color: transparent;
  font-size: 28px;
  color: #ffffff;
  text-align: left;
}
.input-yan-padding {
  padding-left: 30px;
  padding-right: 30px;
}
.input-save-view {
  width: 480px;
  height: 80px;
  border-radius: 5px;
  background-color: #784340;
  text-align: center;
  margin: 50px auto 0;
}
.input-save-view:active {
  background-color: #784340cc;
}
.input-save-text {
  font-size: 28px;
  color: #ffffff;
  line-height: 80px;
}
.input-save-img {
  width: 11px;
  height: 48px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  -moz-background-size: 100% 100%;
  margin-top: 14px;
}
.input-save-img-left {
  float: left;
  margin-left: 30px;
}
.input-save-img-right {
  float: right;
  margin-right: 30px;
}
.hint-view {
  width: 510px;
  margin: 0 auto;
  margin-top: 30px;
  text-align: center;
}
.hint-text {
  font-size: 24px;
  color: #d9c3b3;
}
.bottom-view {
  text-align: center;
  margin: 90px auto 110px;
}
.bottom-text {
  margin-top: 6px;
  font-size: 24px;
  color: #999999;
}
.bottom-logo {
  width: 293px;
  height: 26px;
}
</style>

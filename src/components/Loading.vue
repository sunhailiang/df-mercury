<template>
  <div class="container" v-show="!loading">
    <div class="loading">
      <div class="pre-load-imgs">
        <img class="pre-img" src="@/assets/image/logo2.png" alt />
        <img class="pre-img" src="@/assets/image/da_but_icon.png" alt />
        <img class="pre-img" src="@/assets/image/diq_bg.png" alt />
        <img class="pre-img" src="@/assets/image/guanb_but.png" alt />
        <img class="pre-img" src="@/assets/image/huisebs.png" alt />
        <img class="pre-img" src="@/assets/image/img_01.png" alt />
        <img class="pre-img" src="@/assets/image/img_fuhao.png" alt />
        <img class="pre-img" src="@/assets/image/img_fuhao_left.png" alt />
        <img class="pre-img" src="@/assets/image/img_fuhao_right.png" alt />
        <img class="pre-img" src="@/assets/image/img_kabei.png" alt />
        <img class="pre-img" src="@/assets/image/jieguo_bg.png" alt />
        <img class="pre-img" src="@/assets/image/jieguo_fens_bg.png" alt />
        <img class="pre-img" src="@/assets/image/jieguo_mingc_img.png" alt />
        <img class="pre-img" src="@/assets/image/kamian_tis_bg.png" alt />
        <img class="pre-img" src="@/assets/image/kamian01_img.png" alt />
        <img class="pre-img" src="@/assets/image/kamian02_img.png" alt />
        <img class="pre-img" src="@/assets/image/logo.png" alt />
        <img class="pre-img" src="@/assets/image/logo2.png" alt />
        <img class="pre-img" src="@/assets/image/pingf_renwu_img.png" alt />
        <img class="pre-img" src="@/assets/image/pingf_xiaoyu_img.png" alt />
        <img class="pre-img" src="@/assets/image/pingfen_img_1.png" alt />
        <img class="pre-img" src="@/assets/image/pingfen_img_2.png" alt />
        <img class="pre-img" src="@/assets/image/pingfen_img_3.png" alt />
        <img class="pre-img" src="@/assets/image/pingfen_img_4.png" alt />
        <img class="pre-img" src="@/assets/image/pingfen_img_5.png" alt />
        <img class="pre-img" src="@/assets/image/shanc_but.png" alt />
        <img class="pre-img" src="@/assets/image/shous_wy_icon.png" alt />
        <img class="pre-img" src="@/assets/image/shous_wz_icon.png" alt />
        <img class="pre-img" src="@/assets/image/xdkp_img.png" alt />
        <img class="pre-img" src="@/assets/image/xiangj_icon.png" alt />
        <img class="pre-img" src="@/assets/image/xiao_but_icon.png" alt />
        <img class="pre-img" src="@/assets/image/xz_icon.png" alt />
        <img class="pre-img" src="@/assets/image/yh_img.png" alt />
        <img class="pre-img" src="@/assets/image/zh_img.png" alt />
        <img class="pre-img" src="@/assets/image/zily_bg.png" alt />
        <img class="pre-img" src="@/assets/image/select-model/address-model.png" alt />
        <img class="pre-img" src="@/assets/image/select-model/close.png" alt />
        <img class="pre-img" src="@/assets/image/select-model/sex-model.png" alt />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background-image: url("../assets/image/loading.gif");
  background-size: 100% 100%;
}
.pre-load-imgs {
  visibility: hidden;
}
@keyframes loading {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

<script>
import { log } from "util";
import { Image } from "vant";
import { watch } from "fs";
export default {
  name: "Loading",
  data() {
    return {
      count: 0,
      loading: false
    };
  },
  methods: {
    loadFunc() {
      this.loading = true;
      console.log("加载完成");
      this.$emit("loadingStatus", this.loading);
    }
  },
  mounted() {
    let that = this;
    let imgs = document.querySelectorAll(".pre-img");
    Array.from(imgs).forEach(item => {
      item.onload = () => {
        that.count++;
      };
    });
  },
  watch: {
    count(val, oldVal) {
      if (val == 38) {
        setTimeout(this.loadFunc, 1000);
      }
    }
  }
};
</script>
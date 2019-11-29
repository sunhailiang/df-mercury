<template>
  <div id="app">
    <Loading @loadingStatus="getLoadingStatus" />
    <router-view v-if="loading" />
  </div>
</template>
<style lang="scss">
@import "assets/css/base.css";
#app {
  background-color: black;
}
</style>
<style>
.toast-box {
  width: 7.8125rem;
  height: 2.8125rem;
}
.van-toast__icon {
  font-size: 80px;
}
.van-toast__text {
  font-size: 30px;
  line-height: 40px;
}
</style>
<script>
import Loading from "@/components/Loading";
import wx from "weixin-js-sdk";
export default {
  data() {
    return {
      loading:false
    };
  },
  components: {
    Loading
  },
  methods: {
    getLoadingStatus(data) {
      console.log("data",data);
      
      this.loading=data
    }
  },
  mounted() {
    // wx.config
  }
};
</script>

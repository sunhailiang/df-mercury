<template>
  <div class="warp">
    <div class="header">
      <div class="header-left">
        <div class="header-left-title">Hello，暴击2000</div>
        <div class="header-left-info">你好，感谢你耐心做完本次测试</div>
      </div>
      <img src="@/assets/image/img02.png" class="header-img" />
    </div>
    <div class="content">
      <div class="content-title">测评结果</div>
      <div class="content-content">
        恭喜你完成体质测试!
        <br />体质说明:中医理论中将人分为九种常见体质
        分别是:平和质、阳虚质、阴虚质、湿热质、痰湿质、气郁质、气虚质、血瘀质、特禀质。体质的形成用一句话来概括就是:秉承于先天,得养与后天。
        <br />
        <br />不同地区,不同饮食习惯、作息习惯等,每个人会呈现出来多种体质并存的体质,了解各体质的特征有利于日常保养对症。
      </div>
    </div>
    <div class="result">
      <div class="content-title">得分分析</div>
      <div class="result-type">
        <div class="result-item">
          <div class="result-item-content">
            <div class="result-title">
              <img src="@/assets/image/img_fuhao_left.png" />
              <span>阳虚质</span>
              <img src="@/assets/image/img_fuhao_right.png" />
            </div>
            <div class="result-tab">
              <div class="result-tab-title">18分</div>
              <div class="result-tab-info">标准分18.2</div>
            </div>
            <div class="result-content-title">发病倾向</div>
            <div class="result-content-content">易患痰佽、肿胀、泄泻等病;感邪易从寒化。女性易形成寒滞,宮寒等。</div>
          </div>
          <div class="result-item-content">
            <div class="result-title">
              <img src="@/assets/image/img_fuhao_left.png" />
              <span>阳虚质</span>
              <img src="@/assets/image/img_fuhao_right.png" />
            </div>
            <div class="result-tab">
              <div class="result-tab-title">18分</div>
              <div class="result-tab-info">标准分18.2</div>
            </div>
            <div class="result-content-title">发病倾向</div>
            <div class="result-content-content">易患痰佽、肿胀、泄泻等病;感邪易从寒化。女性易形成寒滞,宮寒等。</div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom-view">
      <img class="bottom-logo" src="@/assets/image/logo2.png" />
      <p class="bottom-text">本测评来源于中国中医药学会体质测评标准</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "result"
};
</script>

<style scoped lang="scss" >
.warp {
  overflow: hidden;
  width: 630px;
  margin: 0 auto;
}
.header {
  display: flex;
  height: 120px;
  align-items: center;
  margin-top: 20px;
}
.header-left {
  flex: 1;
  overflow: hidden;
  margin-right: 30px;
}
.header-left-title {
  font-size: 40px;
  line-height: 50px;
  color: #fff;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.header-left-info {
  margin-top: 20px;
  line-height: 28px;
  font-size: 28px;
  color: #ccc;
}
.header-img {
  width: 60px;
  height: 94px;
}
.content {
  margin-top: 60px;
  border-top: 2px #404040 solid;
  padding-bottom: 60px;
  border-bottom: 2px #404040 solid;
}
.content-title {
  font-size: 36px;
  color: #fff;
  font-weight: bold;
  margin: 30px 0;
}
.content-content {
  font-size: 28px;
  color: #ccc;
}
.result-type {
  margin-top: 60px;
  height: 1160px;
  background: url("../assets/image/jieguo_bg.png") no-repeat;
  -webkit-background-size: 100%;
  background-size: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.result-item {
  width: 480px;
}
.result-title {
  display: flex;
  font-size: 40px;
  color: #fff;
  justify-content: center;
  align-items: center;
}
.result-title span {
  margin: 0 40px;
}
.result-title img {
  width: 80px;
  height: 30px;
}
.result-tab {
  height: 120px;
  width: 100%;
  background: linear-gradient(
    270deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(255, 255, 255, 0.15) 46%,
    rgba(0, 0, 0, 0) 100%
  );
  margin: 40px 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.result-tab-title {
  font-size: 40px;
  color: #fff;
  font-weight: bold;
}
.result-tab-info {
  font-size: 24px;
  color: #c58181;
  margin-top: 5px;
}
.result-content-title {
  font-size: 32px;
  color: #fff;
  text-align: center;
}
.result-content-content {
  font-size: 28px;
  color: #e4e4e4;
  margin-top: 10px;
  height: 80px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.result-item-content {
  margin-top: 30px;
  padding-bottom: 30px;
  border-bottom: 2px dashed rgba(255, 255, 255, 0.15);
}
.result-item-content:first-child {
  margin-top: 0;
}
.bottom-view {
  text-align: center;
  margin: 30px auto 100px;
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

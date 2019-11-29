const baseSize = 32;
// 计算的比例
window.radio = 0;
// 设置 rem 函数
function setRem () {
  // 当前页面宽度相对于 750 宽的缩放比例，可根据自己需要修改。
  const scale = document.documentElement.clientWidth / 750;
  window.radio = scale;
  // 设置页面根节点字体大小
  document.documentElement.style.fontSize = (baseSize * Math.min(scale, 2)) + 'px'
}
// 初始化
setRem()
// 改变窗口大小时重新设置 rem
window.onresize = function () {
  setRem()
}
/*
  单位转换
  @params value Number 转换的 px单位 数据
  @params unit Boolean | String   如果为 布尔(true) 默认为 rem 单位  为 字符串 默认使用字符串单位  默认 ---> false 不添加任何单位   返回 Number 类型数据
  @import  window.radio Number  rem -> px 单位比例
*/
window.unit = function(value, unit=false){
  value = parseFloat(value);
  if(value !== value || typeof value !== 'number') return 0;
  return ((value * radio) / (baseSize * radio) ) +  (unit ? typeof unit == 'boolean' ? 'rem' : unit : 0);
};


// 将 px 转为 相同比例的 大小
window.unitParse = function (value) {

  value = parseFloat(value);

  return value * radio;

};

/**
 * 右键配置
 */
const rightMenuOption = {};
const toolbarOption = {
  // 不写默认使用fce自带的render方法
  render: function() {
    return document.createElement("div");
  },
  icon: {
    src: "img/xxx.png",
    width: 12,
    height: 12
  },
  classes: "", // 样式
  isShow() {},
  hide() {},
  show() {},
  addClass(_class) {},
  hasClass(_class) {},
  removeClass(_class) {},
  fce: null, // 这里是fce的指针
  id: "point",
  title: "指针",
  onclick: function() {
    // 这里的this是当前bar
  }
};
/**
 * 默认配置信息
 */
const defaultOptions = {
  el: null,
  mode: "DESIGN",
  ready() {
    console.log("fce加载完成！");
  },
  renderFooter: function() {
    // footer内容，可以自定义
  },
  rightMenus: [], // 右键配置 默认没有
  toolbars: [] // toolbar配置 默认没有
};
export { defaultOptions, rightMenuOption, toolbarOption };
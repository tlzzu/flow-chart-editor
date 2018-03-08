import utils from "../../../utils/index";
import Listener from "../../../core/Listener";
import Auto from "./Auto";
import Manual from "./Manual";
/**
 * 重置位置
 */
const resetPosition = function() {
  const div = this.__private__.dom;
  div.style.left = ~~(
    this.__private__.dom.parentElement.offsetLeft -
    1 -
    (div.offsetWidth - div.parentElement.offsetWidth) / 2
  ) + "px"; //-1是边框
};

const Animation = function() {
  this.__private__ = this.__private__ || {};
  // this.__private__.fce = {}; //fce对象实例
  // this.__private__.parentElement = null; //
  // this.__private__.dom = null;
  // this.__private__.bars = { auto: null, manual: null };
  this.init = function(parent, fce) {
    const dom = document.createElement("div");
    dom.className = "fce-tool-bar-temp";
    //todo 添加动画bar的样式效果
    parent.dom.appendChild(dom);
    this.__private__.dom = dom;
    const auto = new Auto();
    auto.render(this);
    //todo 手动动画
    // const manual = new Manual();
    // manual.render(this);
    resetPosition.call(this);
    dom.className = "fce-tool-bar-ext";
  };
};
//添加监听事件
utils.forEachObject(Listener, function(item, key) {
  Animation.prototype[key] = item;
});

export default {
  name: "animation",
  icon: require("../../../../images/animation.png"),
  className: "fce-tool-bar-animation",
  title: "动画",
  render(fce, toolbars) {
    // const div = document.createElement("div");
    // div.className = "fce-tool-bar-temp";
    // //todo 添加动画bar的样式效果
    // this.dom.appendChild(div);
    // renderAnimationBar.call(this, div);
    // resetPosition.call(this);
    // div.className = "fce-tool-bar-ext";
    // utils.registerEvent(div, "click", function(evt) {
    //   //todo 触发动画事件
    //   utils.preventDefault(evt); //防止toolbar点击事件被触发
    // });
    const animation = new Animation();
    animation.init(this, fce, toolbars);
  },
  unselect() {},

  exec() {}
};
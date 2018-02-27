//保证同时只能有一个触发事件
import listener from "./listener";
import utils from "../utils/index";
import BaseBar from "./basebar";
const init = function() {
  const dom = document.createElement("div"),
    self = this;
  dom.className = this.options.className;
  dom.classList.add("fce-base-bars");
  utils.registerEvent(
    dom,
    "click",
    function(evt) {
      //todo 往上找，找到 fce-base-bar 的name，作为对比
      debugger;
      self.fireEvent("change", self.bars["pointer"]);
    }.bind(self)
  );
  this.dom = dom;
  initBars.call(self);
};
/**
 * 初始化bars
 */
const initBars = function() {
  const barOpts = this.options.bars || [],
    self = this;
  for (let i = 0, l = barOpts.length; i < l; i++) {
    const barOpt = barOpts[i],
      bar = new BaseBar(barOpt);
    self.dom.appendChild(bar.dom);
    self.bars[bar.name] = bar;
  }
};
const Basebars = function(options) {
  //{bars:[{name:'不能重复',icon:'',className:'',title:'',isActive:true,change(){}}],activeClass:'',activeName:'',className:''}
  if (!this.options) {
    if (!options) return;
    this.options = options;
  }
  this.bars = {}; //basebars类型 所有的初始化的bar
  this.activeBar = null; //basebars类型 当前激活的bar
  this.__allListeners__ = this.__allListeners__ || {}; //所有的change事件：change事件
  init.call(this);
};
//将事件管理器赋予BaseBars
Basebars.prototype = listener;
/**
 * 设置激活状态的bar
 * @param {String} name 当前bar的活动名
 */
Basebars.prototype.setActiveBar = function(name) {
  if (!this.bars[name]) return;
  for (let b in this.bars) {
    const bar = this.bars[b];
    bar.removeClass(this.activeClass);
  }
  this.bars[name].addClass(this.activeClass);
};
//基础
export default Basebars;
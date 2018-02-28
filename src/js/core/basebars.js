//保证同时只能有一个触发事件
import listener from "./Listener";
import utils from "../utils/index";
import BaseBar from "./basebar";
const init = function() {
  const dom = document.createElement("div"),
    self = this;
  dom.className = this.options.className;
  dom.classList.add("fce-base-bars");

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
      bar = new this.BarType(barOpt);
    self.dom.appendChild(bar.dom);
    self.bars[bar.name] = bar;
  }
};
/**
 * bar的基类，不可直接被new
 */
const Basebars = function() {
  //{bars:[{name:'不能重复',icon:'',className:'',title:'',isActive:true,change(){}}],activeClass:'',activeName:'',className:''}
  if (!this.options) {
    return;
  }
  this.BarType = this.BarType ? this.BarType : BaseBar;
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
    bar.removeClass(this.options.activeClass);
  }
  this.bars[name].addClass(this.options.activeClass);
  this.activeBar = this.bars[name];
};
//基础
export default Basebars;
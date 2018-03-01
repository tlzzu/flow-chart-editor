//保证同时只能有一个触发事件
import listener from "./Listener";
import utils from "../utils/index";
import BaseBar from "./basebar";

/**
 * 初始化bars
 */
const initBars = function() {
  const barOpts = this.options.bars || [],
    self = this;
  utils.forEach(barOpts, function(barOpt) {
    const bar = new self.BarType(barOpt);
    self.dom.appendChild(bar.dom);
    if (bar.options.render) {
      bar.options.render.call(bar);
    }
    self.bars[bar.name] = bar;
  });
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
  const dom = document.createElement("div");
  dom.className = this.options.className;
  dom.classList.add("fce-base-bars");
  this.dom = dom;
};
//将事件管理器赋予BaseBars
Basebars.prototype = listener;
/**
 * 设置激活状态的bar
 * @param {String} name 当前bar的活动名
 */
Basebars.prototype.setActiveBar = function(name) {
  if (!this.bars[name]) return;
  this.cancelActiveBar(name);
  this.bars[name].addClass(this.options.activeClass);
  this.activeBar = this.bars[name];
};
Basebars.prototype.render = function() {
  initBars.call(this);
};
Basebars.prototype.cancelActiveBar = function(name) {
  if (!name && this.activeBar) {
    this.activeBar.removeClass(this.options.activeClass);
  } else {
    if (!this.bars[name]) return;
    for (let b in this.bars) {
      const bar = this.bars[b];
      if (bar.hasClass(this.options.activeClass)) {
        bar.removeClass(this.options.activeClass);
        this.activeBar = null;
      }
    }
  }
  this.activeBar = null;
};
//基础
export default Basebars;
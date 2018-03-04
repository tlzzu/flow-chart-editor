import Basebars from "./basebars";
import Toolbar from "./Toolbar";
import utils from "../utils/index";
import ToolbarItems from "./Toolbar/index";
import { jquery } from "../lib";

const defaultOptions = {
    activeClass: "fce-tool-bar-active",
    activeName: "",
    className: "fce-tool-bars",
    change() {},
    bars: null
  },
  barClassName = "fce-tool-bar";
const insideListener = function() {
  const self = this;
  utils.registerEvent(
    this.dom,
    "click",
    function(evt) {
      // 往上找，找到 fce-base-bar 的name，作为对比
      const current = utils.findParentElement(evt.target, "fce-base-bar");
      if (current) {
        const name = current.getAttribute ?
          current.getAttribute("name") :
          undefined;
        if (this.activeBar && this.activeBar.name === name) {
          this.cancelActiveBar(name);
          //this.fce.navbars.setActiveBar("pointer");
          this.fce.navbars.setNavActiveBar("pointer");
          //todo  取消选中
        } else if (name) {
          this.setActiveBar(name);
          //this.fce.navbars.cancelActiveBar(this.fce.navbars.activeBar.name);
          this.fce.navbars.setNavActiveBar();
          this.fireEvent("change", this.bars[name]);
        }
      }
    }.bind(self)
  );
};
const Toolbars = function(options) {
  //todo 处理toolbar事件
  if (!options) return;
  options = jquery.extend(true, defaultOptions, { bars: options });
  if (!options.bars) {
    options.bars = [];
  }
  utils.forEach(options.bars, function(item, index) {
    if (typeof item === "string") {
      const bar = ToolbarItems[item];
      if (bar) {
        options.bars.splice(index, 1, bar);
      }
    } else {
      //对于自定义的bar，要给与其 className =barClassName
      const arr = utils.trim(item.className).split(/\s+/);
      if (!arr.includes(barClassName)) {
        arr.splice(0, 0, barClassName);
        item.className = item.join(" ");
      }
    }
  });
  this.options = options;
  //bar的类型
  this.BarType = Toolbar;
  this.__allListeners__ = {
    change: [] //change事件
  };
  Basebars.call(this);

  if (this.options.activeName) {
    this.setActiveBar(this.options.activeName);
  }

  const _render = this.render;
  this.render = function() {
    _render.call(this);
    insideListener.call(this);
  };
};
Toolbars.prototype = new Basebars();
Toolbars.prototype.constructor = Toolbars;

export default Toolbars;
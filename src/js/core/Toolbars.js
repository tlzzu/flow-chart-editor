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
  barClassName = "fce-base-bar"; //"fce-tool-bar";
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
        if (!name) return;
        if (this.activeBar && this.activeBar.name === name) {
          //再次点击 取消选中
          this.cancelActiveBar(name);
          //this.fce.navbars.setActiveBar("pointer");
          this.fce.navbars.setNavActiveBar("pointer");
        } else if (name) {
          this.setActiveBar(name);
          //this.fce.navbars.cancelActiveBar(this.fce.navbars.activeBar.name);
          this.fce.navbars.setNavActiveBar();
          this.fireEvent("change", this.bars[name]);
        }
        const bar = this.getBarByName(name);
        if (bar && bar.options && bar.options.click) {
          bar.options.click.call(this.fce, bar);
        }
      }
    }.bind(self)
  );
};
const Toolbars = function(options) {
  if (!options) return;
  if (!this.__private__) this.__private__ = {};
  const _options = jquery.extend(true, defaultOptions, { bars: options });
  if (!_options.bars) {
    _options.bars = [];
  }
  utils.forEach(_options.bars, function(item, index) {
    if (typeof item === "string") {
      const bar = ToolbarItems[item];
      if (bar) {
        _options.bars.splice(index, 1, bar);
      }
    } else {
      //对于自定义的bar，要给与其 className =barClassName
      const arr = utils.trim(item.className).split(/\s+/);
      if (!arr.includes(barClassName)) {
        arr.splice(0, 0, barClassName);
        item.className = arr.join(" ");
      }
    }
  });
  this.options = _options;
  //bar的类型
  this.BarType = Toolbar;
  this.__private__.allListeners = {
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
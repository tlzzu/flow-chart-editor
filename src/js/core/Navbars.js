import Basebars from "./basebars";
import Navbar from "./Navbar";
import utils from "../utils/index";

const defaultOptions = {
  activeClass: "fce-nav-bar-active",
  activeName: "pointer",
  className: "fce-nav-bars",
  change() {},
  bars: [{
      name: "pointer",
      icon: require("../../images/icon/pointer.png"),
      className: "fce-nav-bar",
      title: "指针",
      exec() {}
    },
    {
      name: "line",
      icon: require("../../images/icon/line-solid.png"),
      className: "fce-nav-bar",
      title: "连线",
      exec() {}
    }
  ]
};
const insideListener = function() {
  const self = this;
  utils.registerEvent(
    self.dom,
    "click",
    function(evt) {
      // 往上找，找到 fce-base-bar 的name，作为对比
      const current = utils.findParentElement(evt.target, "fce-base-bar");
      if (current) {
        const name = current.getAttribute ?
          current.getAttribute("name") :
          undefined;
        if (name) {
          this.setActiveBar(name);
          this.fireEvent("change", this.bars[name]);
        }
      }
    }.bind(self)
  );
};
/**
 * navbars的对象
 * bar:fce-nav-bar
 * @param {Object} options 配置项
 */
const Navbars = function(options) {
  this.options = options || defaultOptions;
  //bar的类型
  this.BarType = Navbar;
  this.__allListeners__ = {
    change: [] //change事件
  };
  Basebars.call(this);
  const _render = this.render;
  this.render = function() {
    _render.call(this);
    insideListener.call(this);
  };
};
Navbars.prototype = new Basebars();
Navbars.prototype.constructor = Navbars;
export default Navbars;
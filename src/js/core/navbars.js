import Basebars from "./basebars";
const defaultOptions = {
  activeClass: "fce-nav-bar-active",
  activeName: "pointer",
  className: "fce-nav-bars",
  change() {},
  bars: [{
      name: "pointer",
      icon: require("../../img/icon/pointer.png"),
      className: "fce-nav-bar",
      title: "指针",
      click() {}
    },
    {
      name: "line",
      icon: require("../../img/icon/line-solid.png"),
      className: "fce-nav-bar",
      title: "连线",
      click() {}
    }
  ]
};
/**
 * navbars的对象
 * bar:fce-nav-bar
 * @param {Object} options 配置项
 */
const Navbars = function(options) {
  this.options = options || defaultOptions;
  this.__allListeners__ = {
    change: [] //change事件
  };
  Basebars.call(this);
};
Navbars.prototype = new Basebars();
Navbars.prototype.constructor = Navbars;
export default Navbars;
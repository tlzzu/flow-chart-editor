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
        //取消toolbar的选中状态
        if (this.fce.toolbars.activeBar) {
          this.fce.toolbars.cancelActiveBar(this.fce.toolbars.activeBar.name);
        }

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
  if (!this.__private__) this.__private__ = {};
  //bar的类型
  this.BarType = Navbar;
  this.__private__.allListeners = {
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
/**
 * 设置nav的活跃bar
 * @param {String} name 如果那么、为空，则为初始化
 */
Navbars.prototype.setNavActiveBar = function(name) {
  const self = this.fce;
  if (!name || name === "pointer") {
    self.__private__.allElements.cy.classList.remove("canvas-line");
    self.__private__.allElements.cy.classList.add("canvas-pointer");
    const handleNodes = self.cy.$(
      ".eh-handle,.eh-hover,.eh-source,.eh-target,.eh-preview,.eh-ghost-edge"
    );
    if (handleNodes && handleNodes.length > 0) {
      self.cy.remove(handleNodes);
    }
    self.cyExtensions.edgehandles.disable();

    if (name) {
      this.setActiveBar("pointer");
    } else if (!name) {
      self.cyExtensions.nodeResize.removeGrapples();
      if (this.activeBar) {
        this.cancelActiveBar(this.activeBar.name);
      }
    }
  } else if (name === "line") {
    self.__private__.allElements.cy.classList.remove("canvas-pointer");
    self.__private__.allElements.cy.classList.add("canvas-line");
    self.cyExtensions.edgehandles.enable();
    self.cyExtensions.nodeResize.removeGrapples();
    this.setActiveBar("line");
  } else {
    self.__private__.allElements.cy.classList.remove("canvas-line");
    self.__private__.allElements.cy.classList.add("canvas-pointer");
    console.error("未知nav-bar!");
    console.error(name);
  }
};
export default Navbars;
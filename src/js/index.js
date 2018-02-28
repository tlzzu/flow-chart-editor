"use strict";
import { defaultOptions } from "./defaultOptions";
import { jquery } from "./dependencies";
import listener from "./core/Listener";
import fceDom from "./core/Dom";
import Zoom from "./core/Zoom";
import Navbars from "./core/Navbars";
import Toolbars from "./core/Toolbars";
import { initCy } from "./cytoscapeHelper";
require("../css/default.scss");

/**
 * 缩放组件
 * @param {*} options
 */
const zoomChange = function(value) {
  this.cy.zoom(value);
  const elements = this.cy.elements(),
    firstEle = elements && elements.length ? elements[0] : null;
  if (firstEle) {
    this.cy.center(firstEle);
  }
};
const initNavbarsListener = function(navbars) {
  const self = this;
  navbars.addListener("change", function() {
    // 这里出发navbar变更事件
    const bar = arguments.length > 1 ? arguments[1] : null;
    if (!bar) return;
    if (bar.name === "pointer") {
      self.__allElements__["cy"].style.cursor = "default";
      const handleNodes = self.cy.$(
        ".eh-handle,.eh-hover,.eh-source,.eh-target,.eh-preview,.eh-ghost-edge"
      );
      if (handleNodes && handleNodes.length > 0) {
        self.cy.remove(handleNodes);
      }
      self.cyExtensions["edgehandles"].disable();
    } else if (bar.name === "line") {
      self.__allElements__["cy"].style.cursor = "crosshair";
      self.cyExtensions["edgehandles"].enable();
    } else {
      console.error("未知nav-bar!");
      console.error(bar);
    }
  });
};
const initZoomListener = function(zoom) {
  const self = this;
  zoom.addChange(function(item) {
    zoomChange.call(self, this.getCyZoom(item));
  });
}; 
const FCE = function(options) {
  const opt = jquery.extend(true, defaultOptions, options);
  if (!opt || !opt.el) {
    console.log("页面中不存在用于承载fce对象的dom元素");
    return;
  } else if (opt.el && typeof opt.el === "string") {
    opt.el = document.querySelector("#" + opt.el);
  }
  const self = this;
  //所有的结构化的element元素
  const allElements = fceDom(opt.el),
    zoom = new Zoom(),
    navbars = new Navbars(),
    toolbars = new Toolbars(opt.toolbars);

  allElements["toolbar"].appendChild(toolbars.dom);
  allElements["zoom"].appendChild(zoom.dom);
  allElements["zoom"].appendChild(navbars.dom);

  //两个下划线表示不希望用户操作的对象

  this.__allElements__ = allElements;
  this.__options__ = opt;
  initCy.call(self, {
    container: allElements["cy"]
  });
  initNavbarsListener.call(self, navbars);
  initZoomListener.call(self, zoom);
  zoomChange.call(this, zoom.getCyZoom());
};
FCE.prototype = {
  constructor: FCE,
  // 根据id找到bar
  getToolbarById(id) {
    //查找toolbar对象
  },
  /**
   * 添加监听
   * @param {String} types 方法类型
   * @param {Function} listener 具体监听方法
   */
  addListener() {
    return listener.addListener.apply(this, arguments);
  },
  /**
   * 移除监听方法
   * @param {String} type 方法类型
   * @param {Function} listener 具体监听方法
   */
  removeListener() {
    return listener.removeListener.apply(this, arguments);
  },
  /**
   * 触发监听方法
   * @param {String} types 类型
   * @param {arguments} args 参数
   */
  fireEvent() {
    return listener.fireEvent.apply(this, arguments);
  },
  // 注销
  destroy() {}
};
window.FCE = FCE;
export default FCE;
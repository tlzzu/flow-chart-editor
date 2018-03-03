//"use strict";
require("../css/default.scss");
import { defaultOptions } from "./defaultOptions";
import { jquery } from "./lib";
import fceDom from "./core/Dom";
import Zoom from "./core/Zoom";
import Navbars from "./core/Navbars";
import Toolbars from "./core/Toolbars";
import { initCy } from "./cytoscapeHelper";
import Listener from "./core/Listener";
import navbarsListener from "./Listeners/navbarsListener";
import { zoomChange, initZoomListener } from "./Listeners/zoomListener";

/**
 * 缩放组件
 * @param {*} options
 */

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
  toolbars.render();
  allElements["zoom"].appendChild(zoom.dom);
  allElements["zoom"].appendChild(navbars.dom);
  navbars.render();
  if (navbars.options.activeName) {
    navbars.setActiveBar(navbars.options.activeName);
  }
  //两个下划线表示不希望用户操作的对象
  this.__allElements__ = allElements;
  this.__options__ = opt;
  this.__allListeners__ = {
    click: []
  };
  initCy.call(self, {
    container: allElements["cy"]
  });
  navbarsListener.call(self, navbars);
  initZoomListener.call(self, zoom);
  zoomChange.call(this, zoom.getCyZoom());
  self.zoom = zoom;
  self.toolbars = toolbars;
};
FCE.prototype = Listener;
/**
 * 根据id查找toolbar对象
 * @param {String} id id
 */
FCE.prototype.getToolbarById = function(id) {
  //
};
/**
 * 注销
 */
FCE.prototype.destroy = function() {
  //查找toolbar对象
};

if (process.env.NODE_ENV === "dev" || process.env.NODE_ENV === "prod") {
  window.FCE = FCE;
} else {
  module.exports = module.exports.default = FCE;
}
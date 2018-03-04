//"use strict";
require("../css/default.scss");
import { defaultOptions } from "./defaultOptions";
import utils from "./utils/index";
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
    add_click: [],
    context_menus_rename: [], //右键重命名
    context_menus_remove: []
  };
  initCy.call(self, {
    container: allElements["cy"]
  });
  navbarsListener.call(self, navbars);
  initZoomListener.call(self, zoom);
  zoomChange.call(this, zoom.getCyZoom());
  self.zoom = zoom;
  toolbars.fce = self;
  self.toolbars = toolbars;
  navbars.fce = self;
  self.navbars = navbars;
};
FCE.prototype = Listener;
/**
 * 根据id查找toolbar对象
 * @param {String} id id
 */
FCE.prototype.getToolbarById = function(id) {
  //todo
};
/**
 * 添加元素
 * @param {Object} opt {data:{}}
 */
FCE.prototype.add = function(opt) {
  this.cy.add(opt);
};
/**
 * 添加node
 * @param {Object} opt
 */
FCE.prototype.addNode = function(data, type) {
  const def = {
    group: "nodes",
    position: this.mouseClickPosition,
    classes: "fce-shape-" + type
  };
  this.add(jquery.extend(true, def, { data: data }));
};
/**
 * 添加元素
 * @param {Object} opt
 */
FCE.prototype.addEdge = function(opt) {
  const def = { group: "edges" };
  this.add(jquery.extend(true, def, { data: data }));
};
/**
 * 重命名元素
 * @param {Object} data {id:'id',label:'label'}
 */
FCE.prototype.rename = function(data) {
  this.cy.$("#" + data.id).data("label", data.label);
};
/**
 * 删除元素
 * @param {String} id
 */
FCE.prototype.remove = function(id) {
  this.cy.$("#" + id).remove();
};
// FCE.prototype.renameNode = function () { };
// FCE.prototype.renameEdge = function () { };
/**
 * 导出文件
 * @param {String} type 文件类型 png、jpg、json默认为json
 * @param {String} fileName 文件名 默认以当前时间为文件名
 */
FCE.prototype.exportFile = function(type, fileName = new Date().toJSON()) {
  type = utils.trim(type || "json").toLowerCase();
  let data;
  switch (type) {
    case "png":
      data = this.cy.png({ full: true, quality: 1 }); //完整内容
    case "jpg":
      data = this.cy.jpg({ full: true, quality: 1 });
    case "json":
      {
        const json = this.cy.json();
        //todo 添加动画内容
        data =
        "data:text/plain;charset=utf-8," +
        encodeURIComponent(JSON.stringify(json));
      }
  }
  const a = document.createElement("a");
  a.setAttribute("download", fileName + "." + type);
  a.setAttribute("href", data);
  a.click();
};
/**
 * 注销
 */
FCE.prototype.destroy = function() {
  //todo 查找toolbar对象
};

if (process.env.NODE_ENV === "dev" || process.env.NODE_ENV === "prod") {
  window.FCE = FCE;
} else {
  module.exports = module.exports.default = FCE;
}
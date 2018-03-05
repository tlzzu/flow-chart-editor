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
  if (!this.__private__) this.__private__ = {};
  const self = this;
  //所有的结构化的element元素
  const allElements = fceDom(opt.el),
    zoom = new Zoom(),
    _navbars = new Navbars(),
    _toolbars = new Toolbars(opt.toolbars);
  allElements["toolbar"].appendChild(_toolbars.dom);
  _toolbars.render();
  allElements["zoom"].appendChild(zoom.dom);
  allElements["zoom"].appendChild(_navbars.dom);
  _navbars.render();
  if (_navbars.options.activeName) {
    _navbars.setActiveBar(_navbars.options.activeName);
  }
  //__private__ 表示不希望用户操作的对象
  self.__private__.allElements = allElements;
  self.__private__.options = opt;
  self.__private__.allListeners = {
    add_click: [],
    context_menus_rename: [], //右键重命名
    context_menus_remove: []
  };
  initCy.call(self, {
    container: allElements["cy"]
  });
  navbarsListener.call(self, _navbars);
  initZoomListener.call(self, zoom);
  zoomChange.call(this, zoom.getCyZoom());
  self.zoom = zoom;
  _toolbars.fce = self;
  self.toolbars = _toolbars;
  _navbars.fce = self;
  self.navbars = _navbars;
};
utils.forEachObject(Listener, function(item, key) {
  FCE.prototype[key] = item;
});
//指定constructor 对象
//FCE.prototype.constructor = FCE;
/**
 * 根据id查找toolbar对象
 * @param {String} id id
 */
FCE.prototype.getToolbarById = function(id) {
  if (!id) return;
  const current = this.__private__.allElements.toolbar.querySelector("#" + id);
  const name = current ? current.getAttribute("name") : null;
  if (!name) return;
  return this.getToolbarByName(name);
};
/**
 * 根据name获取到toolbar
 * @param {String} name
 */
FCE.prototype.getToolbarByName = function(name) {
  return this.toolbars.getBarByName(name);
};
/**
 * 根据id获取编辑器中的元素
 * @param {String} id 
 */
FCE.prototype.getElementById = function (id) { 
  if (!id) return;
  return this.cy.getElementById(id);
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
FCE.prototype.addEdge = function(data) {
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
FCE.prototype.import = function (json) {
  //todo 导入数据 重新new cy
  json = (typeof json === 'string') ? JSON.parse(json) : json;
  this.cy.json({
    elements: json.elements,
    //style: json.style,
    zoom: json.zoom,
    // pan: json.pan,
    // zoomingEnabled:json.zoomingEnabled,
    // userZoomingEnabled:json.userZoomingEnabled,
    // panningEnabled:json.panningEnabled,
    // userPanningEnabled:json.userPanningEnabled,
    // boxSelectionEnabled:json.boxSelectionEnabled,
    // autolock:json.autolock,
    // autoungrabify:json.autoungrabify,
    // autounselectify:json.autounselectify
  });
};
/**
 * 重做
 */
FCE.prototype.redo = function () {
  this.cyExtensions.undoRedo.redo();
};
/**
 * 撤销
 */
FCE.prototype.undo = function () {
  this.cyExtensions.undoRedo.undo();
};
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
      break;
    case "jpg":
      data = this.cy.jpg({ full: true, quality: 1 });
      break;
    case "json":
      {
        const json = this.cy.json();
        this.navbars.setNavActiveBar('');
        //todo 添加动画内容
        data =
        "data:text/plain;charset=utf-8," +
        encodeURIComponent(JSON.stringify(json));
      }
      break;
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
  this.__private__.allElements.root.remove();
  this.cy.destroy();
};
FCE.prototype.hide = function() {
  this.__private__.allElements.root.style.display = "none";
};
FCE.prototype.show = function() {
  this.__private__.allElements.root.style.display = "block";
};

if (process.env.NODE_ENV === "dev" || process.env.NODE_ENV === "prod") {
  window.FCE = FCE;
} else {
  module.exports = module.exports.default = FCE;
}
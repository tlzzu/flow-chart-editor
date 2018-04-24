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
  Object.assign(this, { __private__: { allListeners: {} } });
  const self = this,
    allElements = fceDom(opt.el), //所有的结构化的element元素
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
  Object.assign(self.__private__.allListeners, {
    add_click: [],
    context_menus_rename: [], //右键重命名
    context_menus_remove: []
  });
  initCy.call(self, {
    container: allElements["cy"],
    rightMenus: options.rightMenus || []
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
// utils.forEachObject(Listener, function(item, key) {
//   FCE.prototype[key] = item;
// });
Object.assign(FCE.prototype, Listener, {
  /**
   * 根据id查找toolbar对象
   * @param {String} id id
   */
  getToolbarById(id = '测试') {
    if (!id) return;
    const current = this.__private__.allElements.toolbar.querySelector("#" + id);
    const name = current ? current.getAttribute("name") : null;
    if (!name) return;
    return this.getToolbarByName(name);
  },
  /**
   * 根据name获取到toolbar
   * @param {String} name
   */
  getToolbarByName(name) {
    return this.toolbars.getBarByName(name);
  },
  /**
   * 根据id获取编辑器中的元素
   * @param {String} id 
   */
  getElementById(id) {
    if (!id) return;
    return this.cy.getElementById(id);
  },
  /**
   * 添加元素
   * @param {Object} opt {data:{}}
   */
  add(opt) {
    this.cy.add(opt);
  },
  /**
   * 设置模式
   * @param {String} mode  可选，如果为空则为获取当前模式，否则就是设置为指定模式。READONLY只读--查看、DESIGN设计--可编辑
   */
  mode(mode) {
    if (mode) {
      mode = utils.trim(mode).toUpperCase();
      //todo 修改模式
      this.__private__.options.mode = mode;
    } else {
      // 获取当前模式
      return this.__private__.options.mode;
    }
  },
  /**
   * 添加node
   * @param {Object} opt
   */
  addNode(data, type) {
    const def = {
      group: "nodes",
      position: this.mouseClickPosition,
      classes: "fce-shape-" + type
    };
    this.add(jquery.extend(true, def, { data: data }));
  },
  /**
   * 添加线条
   * @param {Object} opt
   */
  addEdge(data) {
    const def = { group: "edges" };
    this.add(jquery.extend(true, def, { data: data }));
  },
  /**
   * 重命名元素
   * @param {Object} data {id:'id',label:'label'}
   */
  rename(data) {
    this.cy.$("#" + data.id).data("label", data.label);
  },
  /**
   * 删除元素
   * @param {String} id
   */
  remove(id) {
    this.cy.$("#" + id).remove();
  },
  /**
   * 导入json
   * @param {String} json 导出json
   */
  import (json) {
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
  },
  /**
   * 重做
   */
  redo() {
    this.cyExtensions.undoRedo.redo();
  },
  /**
   * 撤销
   */
  undo() {
    this.cyExtensions.undoRedo.undo();
  },
  /**
   * 导出文件
   * @param {String} type 文件类型 png、jpg、json默认为json
   * @param {String} fileName 文件名 默认以当前时间为文件名
   */
  exportFile(type, fileName = new Date().toJSON()) {
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
  },
  /**
   * 注销
   */
  destroy() {
    this.__private__.allElements.root.remove();
    this.cy.destroy();
  },
  /**
   * 隐藏
   */
  hide() {
    this.__private__.allElements.root.style.display = "none";
  },
  /**
   * 显示
   */
  show() {
    this.__private__.allElements.root.style.display = "block";
  }
});

const obj = { name: 'tongling' };
const newObj = Object.assign({}, obj, { age: 22 });
console.log(newObj);

if (process.env.NODE_ENV === "dev" || process.env.NODE_ENV === "prod") {
  window.FCE = FCE;
} else {
  module.exports = module.exports.default = FCE;
}
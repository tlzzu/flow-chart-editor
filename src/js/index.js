"use strict";
import defOptions from "./defaultOptions";
import deps from "./dependencies";
import listener from "./core/listener";
import nav from "./navbars/index";
import fceDom from "./core/dom";
require("../css/default.scss");

let FCE = function(options) {
  const opt = deps.jquery.extend(true, defOptions.defaultOptions, options);
  // rootElement = document.createElement("div");
  // rootElement.classList.add("fce");
  if (!opt || !opt.el) {
    console.log("页面中不存在用于承载fce对象的dom元素");
    return;
  } else if (opt.el && typeof opt.el === "string") {
    opt.el = document.querySelector("#" + opt.el);
  }
  //所有的结构化的element元素
  const allElements = fceDom(opt.el),
    cy = new deps.cytoscape({
      container: allElements["cy"],
      boxSelectionEnabled: false,
      autounselectify: true,
      userZoomingEnabled: false,
      maxZoom: 9,
      zoom: 1,
      minZoom: 0.1,
      elements: {
        nodes: [{ data: { id: "n", label: "Tap me" } }]
      },
      layout: {
        name: "grid"
      }
    });

  // if (opt.toolbars && opt.toolbars.length > 0) {
  //   opt.toolbars.forEach(a => {
  //     toolbars.push(deps.jquery.extend(true, defOptions.toolbarOption, a));
  //   });
  // }
  // if (opt.rightMenus && opt.rightMenus.length > 0) {
  //   opt.rightMenus.forEach(a => {
  //     rightMenus.push(deps.jquery.extend(true, defOptions.rightMenuOption, a));
  //   });
  // }

  this.allElements = allElements;
  this.options = opt;
  this.cy = cy;
  //this.toolbars = toolbars;
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
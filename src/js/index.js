"use strict";
import defOptions from "./defaultOptions";
import deps from "./dependencies";
import listener from "./core/listener";
import nav from "./navbars/index";
import fceDom from "./core/dom";
import Zoom from "./core/zoom";
require("../css/default.scss");

/**
 * 核心对象
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
/**
 * 初始化cy对象
 * @param {Object} options 配置项
 */
const initCy = function(options) {
  const cy = new deps.cytoscape(options);
  cy.gridGuide({
    snapToGridDuringDrag: true, //对齐功能
    snapToAlignmentLocationOnRelease: true,
    snapToAlignmentLocationDuringDrag: true,
    centerToEdgeAlignment: true,
    guidelinesTolerance: true,
    guidelinesStyle: {
      strokeStyle: "black",
      horizontalDistColor: "#ff0000",
      verticalDistColor: "green",
      initPosAlignmentColor: "#0000ff"
    }
  });
  return cy;
};
const FCE = function(options) {
  const opt = deps.jquery.extend(true, defOptions.defaultOptions, options);
  // rootElement = document.createElement("div");
  // rootElement.classList.add("fce");
  if (!opt || !opt.el) {
    console.log("页面中不存在用于承载fce对象的dom元素");
    return;
  } else if (opt.el && typeof opt.el === "string") {
    opt.el = document.querySelector("#" + opt.el);
  }
  const self = this;
  //所有的结构化的element元素
  const allElements = fceDom(opt.el),
    zoom = new Zoom();
  zoom.addChange(function(item) {
    zoomChange.call(self, this.getCyZoom(item));
  });
  allElements["zoom"].appendChild(zoom.dom);
  //两个下划线表示不希望用户操作的对象

  this.__allElements__ = allElements;
  this.__options__ = opt;
  this.cy = initCy({
    container: allElements["cy"],
    boxSelectionEnabled: false,
    autounselectify: true,
    userZoomingEnabled: false,
    maxZoom: 9,
    zoom: 1,
    minZoom: 0.1,
    elements: {
      nodes: [
        { data: { id: "n1", label: "Tap me1" } },
        { data: { id: "n2", label: "Tap me2" } }
      ]
    },
    layout: {
      name: "grid"
    }
  });
  zoomChange.call(this, zoom.getCyZoom());
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
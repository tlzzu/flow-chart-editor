import utils from "../utils/index";

const DEFAULT_WIDTH = 10,
  DEFAULT_HEIGHT = 110,
  DEFAULT_SURPLUS = 21,
  zoomOption = {
    defaultSize: 0,
    items: [
      { label: "缩小2倍", value: -2 },
      { label: "缩小1倍", value: -1 },
      { label: "正常", value: 0 },
      { label: "放大1倍", value: 1 },
      { label: "放大2倍", value: 2 }
    ]
  };
const _resetActiveDom = function() {
  const items = this.__private__.options.items,
    item = this.__private__.selectItem;
  for (let i = 0, l = items.length; i < l; i++) {
    if (items[i].value === item.value) {
      this.activeDom.style.top = ~~(DEFAULT_HEIGHT * (1 - i / (l - 1)) - DEFAULT_WIDTH / 2) +
        DEFAULT_SURPLUS +
        "px";
    }
  }
  this.activeDom.setAttribute("title", this.__private__.selectItem.label);
};
/**
 * 重新设置当前位置
 * @param {Boolean} bo 是否第一次加载，默认为否
 */
const _resetValue = function(bo = false) {
  const item = this.__private__.selectItem;
  _resetActiveDom.call(this);
  if (!bo) {
    for (let i = 0, l = this.__private__.changeListeners.length; i < l; i++) {
      this.__private__.changeListeners[i].call(this, item);
    }
  }
};
/**
 * 获取当前对象
 * @param {Array} arr
 * @param {Int} val
 * @param {Int} mult 缩放多少倍
 */
const _getItem = function(arr, val, mult = 0) {
  if (!arr) return null;
  for (let i = 0, l = arr.length; i < l; i++) {
    const item = arr[i];
    if (item.value === val) {
      if (mult !== 0) {
        const newIndex = i + mult;
        if (newIndex < 0) {
          return arr[0];
        } else if (newIndex >= l) {
          return arr[l - 1];
        } else {
          return arr[newIndex];
        }
      }
      return item;
    }
  }
  return arr[arr.length - 1];
};
/**
 * 新建Zoom Element值
 */
const _createZoomElement = function() {
  const self = this,
    root = document.createElement("div");
  root.classList.add("fce-zoom-dom");
  root.style.height = DEFAULT_HEIGHT + "px";
  root.style.width = DEFAULT_WIDTH + "px";
  //加
  const plus = document.createElement("div");
  plus.classList.add("fce-zoom-dom-plus");
  plus.setAttribute("title", "放大");
  const plusImg = document.createElement("img");
  plusImg.src = require("../../images/icon/fce-zoom-dom-plus.png");
  utils.registerEvent(plus, "click", function() {
    self.times(1);
  });
  plus.appendChild(plusImg);
  root.appendChild(plus);

  const bg = document.createElement("div");
  bg.classList.add("fce-zoom-dom-background");
  root.appendChild(bg);
  const _defalut = document.createElement("div");
  _defalut.classList.add("fce-zoom-dom-default");
  _defalut.style.top = ~~(DEFAULT_HEIGHT / 2) + DEFAULT_SURPLUS + "px";
  _defalut.style.width = DEFAULT_WIDTH + "px";
  _defalut.setAttribute("title", "正常");
  utils.registerEvent(_defalut, "click", function() {
    self.set(self.__private__.options.defaultSize);
  });
  root.appendChild(_defalut);
  const active = document.createElement("div");
  active.classList.add("fce-zoom-dom-active");
  active.style.width = DEFAULT_WIDTH + "px";
  self.activeDom = active;
  root.appendChild(active);
  //减
  const reduce = document.createElement("div");
  reduce.classList.add("fce-zoom-dom-reduce");
  reduce.setAttribute("title", "缩小");
  const reduceImg = document.createElement("img");
  reduceImg.src = require("../../images/icon/fce-zoom-dom-reduce.png");
  reduce.appendChild(reduceImg);
  utils.registerEvent(reduce, "click", function() {
    self.times(-1);
  });
  root.appendChild(reduce);
  return root;
};
/**
 * 初始化zoom对象
 * @param {Object} options {defaultSize:1,items:[{label:'正常',value:0}],change(){}}
 */
const Zoom = function(options) {
  options = options || zoomOption;
  if (!this.__private__) this.__private__ = {};
  this.__private__.selectItem = _getItem(options.items, options.defaultSize); //{label:'正常',value:0}
  this.__private__.changeListeners = [];
  this.__private__.options = options;
  this.dom = _createZoomElement.call(this);
  _resetValue.call(this, true);
};
Zoom.prototype = {
  /**
   * 设置值
   * @param {Number} value 设置为多少倍
   */
  set: function(value) {
    const temp = _getItem(this.__private__.options.items, value);
    if (temp.value === this.__private__.selectItem.value) {
      return;
    }
    this.__private__.selectItem = temp;
    _resetValue.call(this);
  },
  /**
   * 获取当前值
   * @returns {Number} 返回当前值
   */
  get: function() {
    return this.__private__.selectItem.value;
  },
  /**
   * 设置倍数
   * @param {Number} mult 多少倍，正则为放大多少倍，负则为缩小多少倍
   */
  times: function(mult = 0) {
    const temp = _getItem(
      this.__private__.options.items,
      this.__private__.selectItem.value,
      mult
    );
    if (temp.value === this.__private__.selectItem.value) {
      return;
    }
    this.__private__.selectItem = temp;
    _resetValue.call(this);
  },
  getCyZoom: function(item) {
    const zoom = item || this.get();
    switch (zoom.value) {
      case -2:
        return 0.1;
      case -1:
        return 0.3;
      case 0:
        return 1;
      case 1:
        return 3;
      case 2:
        return 9;
      default:
        return 1;
    }
  },
  /**
   * 绑定变化时的监听函数
   */
  addChange: function(handler) {
    this.__private__.changeListeners.push(handler);
  },
  /**
   * 移除监听
   */
  removeChange: function(handler) {
    const listeners = this.__private__.changeListeners;
    for (let i = 0, l = listeners.length; i < l; i++) {
      const listener = listeners[i];
      if (listener === handler) {
        listeners.splice(i, 1);
        i--;
      }
    }
  }
};
export default Zoom;
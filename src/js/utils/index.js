export default {
  /**
   * 去除空格
   * @param {String} str 需要去除空格的字符串
   */
  trim(str) {
    return str.replace(/(^[ \t\n\r]+)|([ \t\n\r]+$)/g, "");
  },
  /**
   * 注册事件
   * @param {Element} ele
   * @param {String} type
   * @param {Function} handler
   * @param {Object} params
   */
  registerEvent(ele, type, handler, params) {
    if (ele.addEventListener) {
      ele.addEventListener(type, handler, params, false);
    } else if (ele.attachEvent) {
      // 如果支持attachEvent 就使用attachEvent去注册事件
      ele.attachEvent("on" + type, handler, params);
    } else {
      // 如果 attachEvent 和 addEventListner都不支持 就是用 onclick这种方式
      ele["on" + type] = handler;
    }
  },
  /**
   * 移除事件
   * @param {Element} ele
   * @param {String} type
   * @param {Function} handler
   */
  removeEvent(ele, type, handler) {
    if (ele.addEventListener) {
      ele.removeEventListener(type, handler, false);
    } else if (ele.attachEvent) {
      // 如果支持attachEvent 就使用attachEvent去注册事件
      ele.detachEvent("on" + type, handler);
    } else {
      // 如果 attachEvent 和 addEventListner都不支持 就是用 onclick这种方式
      ele["on" + type] = null;
    }
  }
};
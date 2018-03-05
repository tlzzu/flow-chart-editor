export default {
  /**
   * 去除空格
   * @param {String} str 需要去除空格的字符串
   */
  trim(str) {
    return str ? str.replace(/(^[ \t\n\r]+)|([ \t\n\r]+$)/g, "") : "";
  },
  /**
   * 将字符串按照规定切割符分割为数组
   * @param {String} str 数组
   * @param {String} splitStr  分隔符
   */
  classNamesToArray(str, splitStr = /\s+/) {
    return this.trim(str).split(splitStr);
  },
  /**
   * 阻止事件默认行为（包括事件冒泡）
   * @param {Event} evt 事件对象
   */
  preventDefault(evt) {
    evt.preventDefault ? evt.preventDefault() : (evt.returnValue = false);
    evt.stopPropagation();
  },
  /**
   * 循环方法
   * @param {Array} arr 数组
   * @param {Function} handler  如果返回true，则中断不予返回
   */
  forEach(arr, handler) {
    if (!arr || !arr.length) return;
    for (let i = 0, l = arr.length; i < l; i++) {
      const item = arr[i];
      if (handler) {
        if (handler(item, i)) {
          return;
        }
      }
    }
  },
  /**
   * 循环对象
   * @param {Object} obj 被循环对象
   * @param {Function} handler 回调函数，如返回true，则停止循环
   */
  forEachObject(obj, handler) {
    if (!obj) return;
    for (let key in obj) {
      const item = obj[key];
      if (handler) {
        if (handler(item, key)) {
          return;
        }
      }
    }
  },
  /**
   * 想让找到符合要求的element元素
   * @param {Element} ele 元素
   * @param {String} classNames  样式
   */
  findParentElement(ele, classNames) {
    if (!ele) return null;
    classNames =
      typeof classNames === "string" ?
      this.trim(classNames).split(/\s+/) :
      classNames;
    let bo = false;
    this.forEach(classNames, item => {
      if (!bo && ele && ele.classList && ele.classList.contains(item)) {
        bo = true;
      }
      return bo;
    });
    if (bo) {
      return ele;
    }
    if (ele && ele.parentElement && ele.parentElement.nodeName !== "BODY") {
      return this.findParentElement(ele.parentElement, classNames);
    }
  },
  /**
   * 注册事件
   * @param {Element} ele
   * @param {String} type
   * @param {Function} handler
   * @param {Object} params
   */
  registerEvent(ele, type, handler, params) {
    if (!ele) {
      console.error("绑定事件时Element实例为空！");
      return;
    }
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
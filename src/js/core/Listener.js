// /**
//  * 这里包含对Listener的管理具体有：
//  * mousedown：鼠标按下
//  * mouseup：鼠标松开
//  * click：点击
//  * beforeAddNode：新加node节点之前
//  * afterAddNode：加入node之后
//  */
import utils from "../utils/index";

/**
 * 添加事件监听
 * @param {String} types 方法类型
 * @param {Function} listener 具体监听方法
 */
const addListener = function(types, listener) {
  if (!types) return;
  const typeArray = utils.classNamesToArray(types),
    self = this;
  utils.forEach(typeArray, function(type) {
    getListener.call(self, type).push(listener);
  });
};
/**
 * 移除监听的方法
 * @param {String} type 方法类型
 * @param {Function} listener 具体监听方法
 */
const removeListener = function(type, listener) {
  if (!type) return;
  const listeners = getListener.call(this, type) || [];
  for (var i = 0, l = listeners.length; i < l; i++) {
    if (listeners[i] === listener) {
      listeners.splice(i, 1);
      i--;
    }
  }
};
/**
 * 查询监听方法
 * @param {String} type 查询类型
 * @returns {Array} 返回一个数组
 */
const getListener = function(type) {
  const listeners = this.__private__.allListeners;
  type = type.toLowerCase();
  if (listeners[type]) {
    return listeners[type];
  } else {
    console.error("不存在该[" + type + "]类型事件！");
    console.trace();
    return [];
  }
  //return listeners[type] ? listeners[type] : [];
};
/**
 * 触发事件
 */
const fireEvent = function() {
  const args = arguments,
    types = args[0],
    self = this,
    typeArray = utils.classNamesToArray(types);
  if (!typeArray && !typeArray.length) return;
  utils.forEach(typeArray, function(type) {
    const listeners = getListener.call(self, type);
    if (listeners) {
      let index = listeners.length;
      while (index--) {
        if (!listeners[index]) continue;
        listeners[index].apply(self, args);
      }
    }
  });
};

export default { addListener, removeListener, fireEvent };
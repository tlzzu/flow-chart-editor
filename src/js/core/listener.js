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
  const typeArray = utils.trim(types).split(/\s+/),
    self = this;
  for (let i = 0, l = typeArray.length; i < l; i++) {
    getListener.call(self, typeArray[i]).push(listener);
  }
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
  const listeners = this.allListeners;
  type = type.toLowerCase();
  return listeners ? listeners[type] : [];
};
/**
 * 触发事件
 */
const fireEvent = function() {
  const types = arguments[0];
  if (!types) return;
  const typeArray = utils.trim(types),
    self = this;
  for (let i = 0, l = typeArray.length; i < l; i++) {
    const type = typeArray[i],
      listeners = getListener.call(self, type);
    if (listeners) {
      let index = listeners.length;
      while (index--) {
        if (!listeners[index]) continue;
        listeners[index].apply(self, arguments);
      }
    }
  }
};

export default { addListener, removeListener, fireEvent };
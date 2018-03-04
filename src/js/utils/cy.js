/**
 * 获取点击元素类型。node元素，line连线，空则为空白
 * @param {Event} evt
 */
const getClickType = function(evt) {
  if (!evt || !evt.target) {
    return "";
  }
  const target = evt.target || cyTarget;
  if (!target) return "";
  else if (target.isNode && target.isNode()) return "node";
  else if (target.isEdge && target.isEdge()) return "line";
  else return "";
};

export { getClickType };
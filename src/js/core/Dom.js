//所有的dom操作都在这里

/**
 * 创建element对象
 * @param {String} str
 * @returns {Element} el对象
 */
const createElement = str => {
  return document.createElement(str);
};
/**
 * 初始化dom
 * @param {Element} el
 * @returns {Object} 返回一个object对象，{root:Element,toolbar:Element,cy:Element,zoom:Element,footer:Element,}
 */

export default function(el) {
  const root = createElement("div");
  root.classList.add("fce");

  const toolbar = createElement("div");
  toolbar.classList.add("fce-toolbars");

  root.appendChild(toolbar);

  const searcher = createElement("div");
  searcher.classList.add("fce-searcher");
  const txtSearch = createElement("input");
  txtSearch.setAttribute("placeholder", "搜索当前流程图");
  txtSearch.setAttribute("type", "text");
  searcher.appendChild(txtSearch);
  root.appendChild(searcher);

  const cy = createElement("div");
  cy.classList.add("fce-cy");
  root.appendChild(cy);

  const zoom = createElement("div");
  zoom.classList.add("fce-navbar");
  root.appendChild(zoom);

  const footer = document.createElement("div");
  footer.classList.add("fce-footer");
  footer.innerHTML = "footer";
  root.appendChild(footer);
  el.appendChild(root);
  return { root, toolbar, searcher, cy, zoom, footer };
}
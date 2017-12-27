'use strict'
import defOptions from './defaultOptions'
import deps from './dependencies'
require('../css/default.scss')

// 事件及对应触发函数
let _event = {}, // 存放事件
  toolbars = [],
  rightMenus = [],
  cy_dom = null,
  toolbars_dom = null,
  zoom_dom = null,
  footer_dom = null,
  cy = null
let FCE = function(options) {
  let opt = deps.jquery.extend(true, defOptions.defaultOptions, options),
    dom = document.createElement('div')
  dom.classList.add('fce')
  if (!dom) {
    console.log('页面中不存在用于承载fce对象的dom元素')
    return
  }

  if (opt.toolbars && opt.toolbars.length > 0) {
    opt.toolbars.forEach(a => {
      toolbars.push(deps.jquery.extend(true, defOptions.toolbarOption, a))
    })
  }
  if (opt.rightMenus && opt.rightMenus.length > 0) {
    opt.rightMenus.forEach(a => {
      rightMenus.push(deps.jquery.extend(true, defOptions.rightMenuOption, a))
    })
  }

  function init_dom(_dom) {
    // 初始化toolbars节点
    toolbars_dom = document.createElement('div')
    toolbars_dom.classList.add('fce-toolbars')
    toolbars_dom.innerHTML = 'toolbar'
    _dom.appendChild(toolbars_dom)
      // 初始化cy节点
    cy_dom = document.createElement('div')
    cy_dom.classList.add('fce-cy')
    _dom.appendChild(cy_dom)
      // 初始化zoomBar节点
    zoom_dom = document.createElement('div')
    zoom_dom.classList.add('fce-zoombar')
    zoom_dom.innerHTML = 'z'
    _dom.appendChild(zoom_dom)
      // 设置底部信息
    footer_dom = document.createElement('div')
    footer_dom.classList.add('fce-footer')
    footer_dom.innerHTML = 'footer'
    _dom.appendChild(footer_dom)
  }
  init_dom(dom)
  opt.el.appendChild(dom)

  function init_cy() {
    cy = new deps.cytoscape({
      container: cy_dom,
      boxSelectionEnabled: false,
      autounselectify: true,
      userZoomingEnabled: false,
      maxZoom: 9,
      zoom: 1,
      minZoom: 0.1,
      elements: {
        nodes: [
          { data: { id: 'n', label: 'Tap me' } }
        ]
      },
      layout: {
        name: 'grid'
      }
    })
  }
  init_cy()
  this.dom = dom
  this.options = opt
  this.toolbars = toolbars
}
FCE.prototype = {
  constructor: FCE,
  // 根据id找到bar
  getToolbarById(id) {},
  on(event, fun) {},
  fire(event) {},
  // 注销
  destroy() {}
}
window.FCE = FCE
export default FCE
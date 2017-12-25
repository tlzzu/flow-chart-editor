'use strict'
// var defOptions = require('./defaultOptions')
// var deps = require('./dependencies')
// var jquery = require('jquery')
import defOptions from './defaultOptions'
import deps from './dependencies'
// import jquery from 'jquery'

// 事件及对应触发函数
let _event = {}, // 存放事件
  toolbars = [],
  rightMenus = []
let FCE = function(options) {
  let opt = deps.jquery.extend(true, defOptions.defaultOptions, options),
    dom = opt.id
  if (!dom) {
    console.log('页面中不存在用于承载fce对象的dom元素')
    return
  }
  debugger
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
  debugger
  this.dom = dom
  this.options = opt
  this.toolbars = toolbars
}
FCE.prototype = {
  constructor: FCE,
  // 根据id找到bar
  getToolbarById(id) {},
  on(event, fun) {},
  fire(event) {}
}
window.FCE = FCE
export default FCE
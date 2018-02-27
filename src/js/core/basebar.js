import utils from "../utils/index";
const init = function() {
  const dom = document.createElement("div");
  dom.setAttribute("name", this.name);
  dom.className = this.options.className;
  dom.classList.add("fce-base-bar");

  const img = document.createElement("img");
  img.src = this.options.icon;
  img.setAttribute("title", this.options.title);
  dom.appendChild(img);
  this.dom = dom;
};
/**
 * 单个的bar
 * {name:'不能重复',icon:'',className:'',title:'',click(){}}
 */
const BaseBar = function(options) {
  this.options = options;
  this.name = options.name;
  this.dom = null;
  init.call(this);
};
BaseBar.prototype = {
  click(item) {
    //这里要改变this指向
    this.options.click.call(this, item);
  },
  addClass(classNames) {
    const arr = utils.trim(classNames).split(/\s+/);
    for (let i = 0, l = arr.length; i < l; i++) {
      const className = arr[i];
      if (!this.dom.classList.contains(className)) {
        this.dom.classList.add(className);
      }
    }
  },
  removeClass(classNames) {
    const arr = utils.trim(classNames).split(/\s+/);
    for (let i = 0, l = arr.length; i < l; i++) {
      const className = arr[i];
      if (this.dom.classList.contains(className)) {
        this.dom.classList.remove(className);
      }
    }
  }
};

export default BaseBar;
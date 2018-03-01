import utils from "../utils/index";
const render = function() {
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
const Basebar = function() {
  if (!this.options) {
    return;
  }
  this.name = this.options.name;
  this.dom = null;
  // if (this.options.render) {
  //   this.options.render.call(this);
  // } else if (this.render) {
  //   this.render();
  // } else {
  //   render.call(this);
  // }
  render.call(this);
};
Basebar.prototype = {
  //   click(item) {
  //     //这里要改变this指向
  //     this.options.click.call(this, item);
  //   },
  hasClass(className) {
    return this.dom.classList.contains(className);
  },
  addClass(classNames) {
    if (!classNames) return;
    const arr = utils.classNamesToArray(classNames),
      self = this;
    utils.forEach(arr, function(className) {
      if (!self.dom.classList.contains(className)) {
        self.dom.classList.add(className);
      }
    });
  },
  removeClass(classNames) {
    if (!classNames) return;
    const arr = utils.classNamesToArray(classNames),
      self = this;
    utils.forEach(arr, function(className) {
      if (self.dom.classList.contains(className)) {
        self.dom.classList.remove(className);
      }
    });
  }
};

export default Basebar;
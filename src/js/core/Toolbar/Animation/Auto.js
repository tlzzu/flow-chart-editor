import utils from "../../../utils/index";
//自动模式
const options = {
  root: {
    icon: require("../../../../images/icon/auto_play.png"),
    name: "auto_play",
    title: "自动播放"
  }
};
// const initRender = function() {};

// const initChildrenRender = function() {};

const Auto = function() {
  this.__private__ = this.__private__ || {};
  this.__private__.options = options;
  this.__private__.childrenDom = null; //详细按钮
  this.render = function(rootDom) {
    const dom = document.createElement("div"),
      img = document.createElement("img");
    dom.setAttribute("title", options.root.title);
    dom.setAttribute("name", options.root.name);
    dom.classList.add("bar-auto_play");
    utils.registerEvent(dom, "click", function(evt) {
      alert("敬请期待！");
      utils.preventDefault(evt);
    });
    img.src = options.root.icon;
    dom.appendChild(img);

    rootDom.__private__.dom.appendChild(dom);
    this.__private__.dom = dom;
    this.__private__.rootDom = rootDom; //根对象
  };
};

export default Auto;
import utils from "../../utils/index";
export default {
  name: "animation",
  icon: require("../../../images/animation.png"),
  className: "fce-tool-bar-animation",
  title: "动画",
  render() {
    const div = document.createElement("div");
    div.className = "fce-tool-bar-temp";
    //todo 添加动画bar的样式效果
    this.dom.appendChild(div);
    div.style.left = ~~(
      this.dom.offsetLeft -
      1 -
      (div.parentElement.offsetWidth - div.offsetWidth) / 2
    ) + "px"; //-1是边框
    div.className = "fce-tool-bar-ext";
    utils.registerEvent(div, "click", function(evt) {
      //todo 触发动画事件
      utils.preventDefault(evt); //防止toolbar点击事件被触发
    });
  },
  beforeSelect() {},

  exec() {
    debugger;
  }
};
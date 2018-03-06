import utils from "../../utils/index";
/**
 * 重置位置
 */
const resetPosition = function() {
  const div = this.dom.lastElementChild;
  div.style.left = ~~(
    this.dom.offsetLeft -
    1 -
    div.offsetWidth / 2 +
    div.parentElement.offsetWidth / 2
  ) + "px"; //-1是边框
};
/**
 * 渲染动画事件按钮
 * @param {Element} root
 */
const renderAnimationBar = function(root) {
  const rec_auto = document.createElement("div"), //自动播放
    rec_ctrl = document.createElement("div"); //手动播放
  //todo test！
  rec_auto.style.float = rec_ctrl.style.float = "left";
  rec_auto.innerHTML = "自动播放";
  rec_ctrl.innerHTML = "手动播放";

  root.appendChild(rec_auto);
  root.appendChild(rec_ctrl);
  this.bars = {
    rec_auto: {
      dom: rec_auto,
      onselected() {
        console.log("选中rec_auto");
      }
    },
    rec_ctrl: {
      dom: rec_ctrl,
      onselected() {
        console.log("选中rec_ctrl");
      }
    }
  };
};
export default {
  name: "animation",
  icon: require("../../../images/animation.png"),
  className: "fce-tool-bar-animation",
  title: "动画",
  render(fce, toolbars) {
    const div = document.createElement("div");
    div.className = "fce-tool-bar-temp";
    //todo 添加动画bar的样式效果
    this.dom.appendChild(div);
    renderAnimationBar.call(this, div);
    resetPosition.call(this);
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
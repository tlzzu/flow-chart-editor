import { getClickType } from "../utils/cy";
export default function() {
  const self = this;
  self.cy.on("tap", function(evt) {
    //只有nav没有控件选中时才可以添加，否则就是移动

    if (!self.navbars.activeBar) {
      const clickType = getClickType(evt),
        clickObject = clickType && evt.target ? evt.target.data() : null;
      self.mouseClickPosition = evt.position ?
        { x: evt.position.x, y: evt.position.y } :
        null;
      if (
        self.toolbars.activeBar &&
        self.toolbars.activeBar.options &&
        self.toolbars.activeBar.options.exec
      ) {
        self.toolbars.activeBar.options.exec.call(
          self,
          evt,
          clickType,
          clickObject
        );
      }
      self.fireEvent("add_click", evt, clickType, clickObject);
    }
  });
  self.cy.on("select", "node", function(evt) {
    if (!(self.navbars.activeBar && self.navbars.activeBar.name === "pointer")) {
      self.cyExtensions.nodeResize.removeGrapples();
    }
    //todo 这里需要出发选中节点事件，给予监听
  });
}
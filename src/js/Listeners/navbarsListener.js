export default function(navbars) {
  const self = this;
  navbars.addListener("change", function() {
    // 这里出发navbar变更事件
    const bar = arguments.length > 1 ? arguments[1] : null;
    if (!bar) return;
    if (bar.name === "pointer") {
      self.__allElements__["cy"].style.cursor = "default";
      const handleNodes = self.cy.$(
        ".eh-handle,.eh-hover,.eh-source,.eh-target,.eh-preview,.eh-ghost-edge"
      );
      if (handleNodes && handleNodes.length > 0) {
        self.cy.remove(handleNodes);
      }
      self.cyExtensions["edgehandles"].disable();
    } else if (bar.name === "line") {
      self.__allElements__["cy"].style.cursor = "crosshair";
      self.cyExtensions["edgehandles"].enable();
    } else {
      console.error("未知nav-bar!");
      console.error(bar);
    }
  });
}
export default function() {
  const self = this;
  self.cy.on("tap", function(evt) {
    if (
      self.toolbars.activeBar &&
      self.toolbars.activeBar.options &&
      self.toolbars.activeBar.options.exec
    ) {
      self.toolbars.activeBar.options.exec.call(self);
    }
    self.fireEvent("click");
  });
}
const zoomChange = function(value) {
  this.cy.zoom(value);
  const elements = this.cy.elements(),
    firstEle = elements && elements.length ? elements[0] : null;
  if (firstEle) {
    this.cy.center(firstEle);
  }
};
const initZoomListener = function(zoom) {
  const self = this;
  zoom.addChange(function(item) {
    zoomChange.call(self, this.getCyZoom(item));
  });
};
export { zoomChange, initZoomListener };
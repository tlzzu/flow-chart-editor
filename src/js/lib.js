let cytoscape, jquery;
if (process.env.NODE_ENV === "prod") {
  cytoscape = window.cytoscape;
  jquery = window.jQuery;
} else {
  require("../../static/css/cytoscape-context-menus.css");
  cytoscape = require("cytoscape");
  jquery = require("jquery");
  const cytoscape_grid = require("cytoscape-grid-guide");
  const edgehandles = require("cytoscape-edgehandles");
  const contextMenus = require("cytoscape-context-menus");
  const edgeBendEditing = require("cytoscape-edge-bend-editing");
  const undoRedo = require("cytoscape-undo-redo");
  const viewUtilities = require("cytoscape-view-utilities");
  const nodeResize = require("cytoscape-node-resize");
  const konva = require("konva");
  cytoscape_grid(cytoscape, jquery);
  contextMenus(cytoscape, jquery);
  edgeBendEditing(cytoscape, jquery);
  undoRedo(cytoscape);
  viewUtilities(cytoscape, jquery);
  nodeResize(cytoscape, jquery, konva);
  cytoscape.use(edgehandles, jquery);
}

export { jquery, cytoscape };
import cytoscape from "cytoscape";
import cytoscape_grid from "cytoscape-grid-guide";
import edgehandles from "cytoscape-edgehandles";
import contextMenus from "cytoscape-context-menus";
import edgeBendEditing from "cytoscape-edge-bend-editing";
import undoRedo from "cytoscape-undo-redo";
import viewUtilities from "cytoscape-view-utilities";
import jquery from "jquery";
// var cytoscape = require('cytoscape')
// var cytoscape_grid = require('cytoscape-grid-guide')
// var edgehandles = require('cytoscape-edgehandles')
// var contextMenus = require('cytoscape-context-menus')
// var edgeBendEditing = require('cytoscape-edge-bend-editing')
// var undoRedo = require('cytoscape-undo-redo')
// var viewUtilities = require('cytoscape-view-utilities')
// var jquery = require('jquery')
window.$ = jquery;
cytoscape_grid(cytoscape, jquery);
contextMenus(cytoscape, jquery);
edgeBendEditing(cytoscape, jquery);
undoRedo(cytoscape);
viewUtilities(cytoscape, jquery);
cytoscape.use(edgehandles);
export {
  cytoscape,
  cytoscape_grid,
  edgehandles,
  contextMenus,
  edgeBendEditing,
  undoRedo,
  viewUtilities,
  jquery
};
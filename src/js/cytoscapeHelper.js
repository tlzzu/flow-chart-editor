import { cytoscape, jquery } from "./dependencies";
import listener from './cytoscapeListener';
const cyOption = {
  //container: allElements["cy"],
  // boxSelectionEnabled: false,
  // autounselectify: true,
  userZoomingEnabled: false,
  maxZoom: 9,
  zoom: 1,
  minZoom: 0.1,
  zoomDelay: 45,
  elements: {
    nodes: [
      { data: { id: "n1", label: "Tap me1" } },
      { data: { id: "n2", label: "Tap me2" } },
      { data: { id: "n3", label: "Tap me3" } }
    ],
    edges: [{ data: { source: "n1", target: "n2", id: "e1" } }]
  },
  layout: {
    name: "preset"
  },
  style: [{
      selector: "node",
      style: {
        // shape: 'data(faveShape)',
        content: "data(label)",
        // width: 'mapData(weight, 40, 80, 20, 60)',
        "text-valign": "center"
      }
    },
    {
      selector: "node:selected",
      style: {
        "border-width": "6px",
        "border-color": "#AAD8FF",
        "border-opacity": "0.5",
        "background-color": "#77828C",
        "text-outline-color": "#77828C"
      }
    },
    {
      selector: "edge",
      style: {
        label: "data(label)",
        "font-size": 10,
        "curve-style": "bezier",
        "line-style": "solid", // solid, dotted, or dashed.
        "target-arrow-shape": "triangle"
      }
    },
    {
      selector: "edge:selected",
      style: {
        "border-width": "6px",
        "border-color": "#AAD8FF",
        "border-opacity": "0.5",
        "background-color": "yellow", // "#77828C",
        "text-outline-color": "#77828C"
      }
    }
  ]
};
/**
 * 初始化cy对象
 * @param {Object} options 配置项
 */
const initCy = function(options) {
  options = jquery.extend(true, cyOption, options);
  const self = this,
    cy = new cytoscape(options),
    gridGuide = cy.gridGuide({
      //网格功能
      //snapToGridDuringDrag: true, //todo 为了操作的灵活性，暂时去掉对齐功能
      snapToAlignmentLocationOnRelease: true,
      snapToAlignmentLocationDuringDrag: true,
      centerToEdgeAlignment: true,
      guidelinesTolerance: true,
      guidelinesStyle: {
        strokeStyle: "red",
        horizontalDistColor: "#ff0000",
        verticalDistColor: "green",
        initPosAlignmentColor: "#0000ff"
      }
    }),
    //右键 contextMenus
    contextMenus = cy.contextMenus({ menuItems: [] }),
    //连线
    edgehandles = cy.edgehandles({
      preview: true,
      hoverDelay: 150,
      handleNodes: "node", //连线节点必须满足样式
      handlePosition: "middle",
      handleInDrawMode: false,
      edgeType: function(sourceNode, targetNode) {
        return "flat";
      },
      loopAllowed: function(node) {
        return false;
      },
      nodeLoopOffset: -50,
      nodeParams: function(sourceNode, targetNode) {
        return {};
      },
      edgeParams: function(sourceNode, targetNode, i) {},
      disable: function() {},
      enable: function() {},
      show: function() {},
      hide: function() {},
      start: function() {},
      stop: function() {},
      cancel: function() {},
      hoverover: function() {},
      hoverout: function() {},
      previewon: function() {},
      previewoff: function() {},
      drawon: function() {},
      drawoff: function() {},
      complete: function(sourceNode, targetNode, addedEles) {}
    }),
    //连线折叠
    edgeBendEditing = cy.edgeBendEditing({
      bendPositionsFunction: function(ele) {
        return ele.data("bendPointPositions");
      },
      initBendPointsAutomatically: true,
      undoable: true,
      bendShapeSizeFactor: 6,
      enabled: true,
      addBendMenuItemTitle: "添加弯曲点",
      removeBendMenuItemTitle: "移除弯曲点"
    }),
    //初始化撤销、重做
    undoRedo = cy.undoRedo({
      isDebug: false,
      actions: {},
      undoableDrag: true,
      stackSizeLimit: undefined,
      ready: function() {}
    }),
    viewUtilities = cy.viewUtilities({
      neighbor: function(node) {
        return node.closedNeighborhood();
      },
      neighborSelectTime: 1000
    });
  //默认取消连线扩展
  edgehandles.disable();
  self.cy = cy;
  
  self.cyExtensions = {
    gridGuide,
    undoRedo,
    edgehandles,
    edgeBendEditing,
    viewUtilities,
    contextMenus
  }; listener.call(self);
};

export { initCy };
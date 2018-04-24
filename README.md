# flow-chart-editor 流程设计器

## 背景

最近做的项目中有流程设计这个功能，且要求设计器具有可嵌套子流程功能，业务比较复杂，当时没有找到合适的设计器，最后选型 cytoscapejs，用 vue 架构了一个流程设计器，不过相对而言太复杂，业务特征太明显，故计划年后做出版较为通用的流程设计器，且增加演示动画功能（待完善）。本文是对目前所做设计器的一个展示。后续还会继续完善。

[![npm](https://img.shields.io/npm/v/flow-chart-editor.svg?maxAge=3600)](https://www.npmjs.com/package/flow-chart-editor)
[![NPM downloads](http://img.shields.io/npm/dm/flow-chart-editor.svg)](https://npmjs.org/package/flow-chart-editor)
![JS gzip size](http://img.badgesize.io/tlzzu/flow-chart-editor/master/lib/index.js.svg?compression=gzip&label=gzip%20size:%20JS)
![CSS gzip size](http://img.badgesize.io/tlzzu/flow-chart-editor/master/lib/style.css.svg?compression=gzip&label=gzip%20size:%20CSS)
[![Join the chat at https://gitter.im/tlzzu/flow-chart-editor](https://badges.gitter.im/tlzzu/flow-chart-editor.svg)](https://gitter.im/tlzzu/flow-chart-editor?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

基于[cytoscape.js](https://github.com/cytoscape/cytoscape.js)的流程设计器。[演示文档 Demo](https://tlzzu.github.io/flow-chart-editor/dist/index.html)。已纳入 SoDiao 豪华套餐。(_^▽^_)

优点如下：

```
1.  支持实/虚线、连线弯曲、撤销重做、放大缩小;
2.  可导出 json/png/jpg 文档；
3.  toolbar自定义；
4.  允许在流程中嵌套**子流程**；
5.  支持只读、设计两种模式（敬请期待）;
6.  支持设置**流程动画**（敬请期待）;
7.  ……后续再完善……
```

> 在此，感谢 easyicon.net 提供的图标。

[1. 预览-Preview](#1-预览-preview)

[2. 安装使用-Install](#2-安装使用-install)

[3. 二次开发-Build](#3-二次开发-build)

[4. 文档-Document](#4-文档-document)

[5. 依赖-Dependencies](#5-依赖-dependencies)

[6. 错误提交-Bug](#6-错误提交-bug)

[7. 捐赠-Donation](#6-捐赠-donation)

[8. 许可证-LICENSE](#7-许可证-license)

## 1. 预览-Preview

预览效果如下：
![](https://images2018.cnblogs.com/blog/544734/201803/544734-20180309005503770-1121231687.gif)
![](https://images2018.cnblogs.com/blog/544734/201803/544734-20180309005628409-455120421.gif)
![](https://images2018.cnblogs.com/blog/544734/201803/544734-20180309005635324-1573303451.gif)
![](https://images2018.cnblogs.com/blog/544734/201803/544734-20180309005652863-1604639382.gif)

## 2. 安装使用-Install

### npm 安装

推荐使用 npm 安装

```
npm i flow-chart-editor -S
```

可在页面中引用

```
import FCE from "flow-chart-editor";

var fce=new FCE({
  el: document.getElementById("fce"),//初始化节点
  toolbars: [{//自定义toolbar
      name: "rectangle",//节点名称
      icon: "images/rectangle.png",//toolbar的图片
      className: "",//自定义样式
      title: "矩形",//title值
      exec(evt, clickType, obj) {//选中该节点后，点击编辑区域后被触发事件
        const label = prompt("请输入节点名称："),
          data = { id: new Date().getTime(), label: label };
        if (!label) return;
        if (clickType === "node") {
          data.parent = obj.id;
        }
        this.addNode(data, "rectangle");
      }
    },  
    "animation"]//这里FCE内置的一种制作流程动画组件
  });
```

### 脚本引用

```
<!DOCTYPE html>
<html>
  <head>
    <title>flow-chart-editor流程设计器</title>
    <link href="css/cytoscape-context-menus.css" rel="stylesheet">
    <link href="css/fce.1.0.0.min.css?a643cc98a261f0b1586b" rel="stylesheet">
    <script type="text/javascript" src="js/lib/cytoscape.js"></script>
    <script type="text/javascript" src="js/lib/jquery.js"></script>
    <script type="text/javascript" src="js/lib/konva.min.js"></script>
    <script type="text/javascript" src="js/lib/cytoscape-node-resize.js"></script>
    <script type="text/javascript" src="js/lib/cytoscape-grid-guide.js"></script>
    <script type="text/javascript" src="js/lib/cytoscape-edgehandles.js"></script>
    <script type="text/javascript" src="js/lib/cytoscape-context-menus.js"></script>
    <script type="text/javascript" src="js/lib/cytoscape-edge-bend-editing.js"></script>
    <script type="text/javascript" src="js/lib/cytoscape-undo-redo.js"></script>
    <script type="text/javascript" src="js/lib/cytoscape-view-utilities.js"></script>
    <script type="text/javascript" src="js/fce.1.0.0.min.js?a643cc98a261f0b1586b"></script>
  </head>
  <body>
    <div id="fce"></div>
    <script>
      var fce=new FCE({
        el: document.getElementById("fce"),//初始化节点
        rightMenus:[{
          id: "id_alert",
          content: "弹出窗",
          tooltipText: "弹出窗",
          selector: "node,edge",//当在node,edge元素上右键时才显示
          onClickFunction: function(evt) {//点击后触发事件
            var target = evt.target || evt.cyTarget;
            alert('弹出信息！');
          },
          hasTrailingDivider: true
        }],
        toolbars: [{//自定义toolbar
          name: "rectangle",//节点名称
          icon: "images/rectangle.png",//toolbar的图片
          className: "",//自定义样式
          title: "矩形",//title值
          exec(evt, clickType, obj) {//选中该节点后，点击编辑区域后被触发事件
            const label = prompt("请输入节点名称："),
              data = { id: new Date().getTime(), label: label };
            if (!label) return;
            if (clickType === "node") {
              data.parent = obj.id;
            }
            this.addNode(data, "rectangle");
          }
        },  
        "animation"]//这里FCE内置的一种制作流程动画组件
      });
    </script>
  </body>
</html>
```

## 3. 二次开发-Build

二次开发前请确保已经安装`node`及`webpack`。在控制台中执行 `npm run <target>`，其中：

* `dev`：开发模式，执行后可直接访问[http://localhost:9110/](http://localhost:9110/)直接调试。
* `build`：执行打包，dist 中的文件会重新打包。

## 4. 文档-Document

```
//todo 稍后完善。
```

## 5. 依赖-Dependencies

[jquery ^3.2.1](https://github.com/jquery/jquery)

[cytoscape ^3.2.0](https://github.com/cytoscape/cytoscape.js)

## 6. 错误提交-Bug

1.  可邮件至[dd@sodiao.org](mailto://dd@sodiao.org/)；
2.  可以在 github 中的[ISS](https://github.com/tlzzu/flow-chart-editor/issues)中提交；

## 7. 捐赠-Donation

表示您对本项目的支持
![image](https://github.com/tlzzu/SoDiaoEditor.v2/raw/master/data/img/ds.png)

## 8. 许可证-LICENSE

MIT.

欢迎下载适用！

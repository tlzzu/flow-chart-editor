var fce;
window.onload = function() {
  fce = new FCE({
    el: document.getElementById("fce"),
    toolbars: [{
        name: "rectangle",
        icon: "images/rectangle.png",
        className: "",
        title: "矩形",
        exec(evt, clickType, obj) {
          const label = prompt("请输入节点名称："),
            data = { id: new Date().getTime(), label: label };
          if (!label) return;
          if (clickType === "node") {
            data.parent = obj.id;
          }
          this.addNode(data, "rectangle");
        }
      },
      {
        name: "rounded_rectangle",
        icon: "images/rounded_rectangle.png",
        className: "",
        title: "圆角矩形",
        exec(evt, clickType, obj) {
          const label = prompt("请输入节点名称："),
            data = { id: new Date().getTime(), label: label };
          if (!label) return;
          if (clickType === "node") {
            data.parent = obj.id;
          }
          this.addNode(data, "roundrectangle");
        }
      },
      {
        name: "choice",
        icon: "images/choice.png",
        className: "",
        title: "菱形",
        exec(evt, clickType, obj) {
          const label = prompt("请输入节点名称："),
            data = { id: new Date().getTime(), label: label };
          if (!label) return;
          if (clickType === "node") {
            data.parent = obj.id;
          }
          this.addNode(data, "diamond");
        }
      },
      {
        name: "round",
        icon: "images/round.png",
        className: "",
        title: "圆形",
        exec(evt, clickType, obj) {
          const label = prompt("请输入节点名称："),
            data = { id: new Date().getTime(), label: label };
          if (!label) return;
          if (clickType === "node") {
            data.parent = obj.id;
          }
          this.addNode(data, "ellipse");
        }
      },
      {
        name: "download-json",
        icon: "images/download.png",
        className: "",
        title: "下载json文件",
        click(bar) {
          this.exportFile("json", "导出JSON文件");
          bar.cancelActive(); //取消自身选中
        }
      },
      {
        name: "download-png",
        icon: "images/download.png",
        className: "",
        title: "下载png文件",
        click(bar) {
          this.exportFile("png");
          bar.cancelActive(); //取消自身选中
        }
      },
      {
        name: "download-jpg",
        icon: "images/download.png",
        className: "",
        title: "下载jpg文件",
        click(bar) {
          this.exportFile("jpg");
          bar.cancelActive(); //取消自身选中
        }
      },

      {
        name: "import",
        icon: "images/import.png",
        className: "",
        title: "导入JSON文件",
        click(bar) {
          bar.cancelActive(); //取消自身选中
          var file = document.createElement("input"),self=this;
          file.setAttribute("type", "file");
          file.onchange = function(evt) {
            var target = evt.target;
            if (target.files && target.files.length) {
              var fileInfo = target.files[0],
                name = fileInfo.name;
              if (!name.toLowerCase().endsWith(".json")) {
                alert("上传文件类型不符合要求！");
              } else {
                var reader = new FileReader();
                reader.onload = function(evt) {
                  var json = JSON.parse(evt.target.result.toString());
                  self.import(json);
                };
                reader.readAsText(fileInfo);
              }
            }
          };
          file.click();
          // this.import(json);
          // bar.cancelActive(); //取消自身选中
        }
      },
      "animation"
    ]
  });
  fce.addListener("add_click", function() {
    console.log("编辑器被点击！");
  });
  fce.addListener("context_menus_rename", function(type, evt, clickType, data) {
    const label = prompt("请输入节点新名称：", data.label);
    if (label) {
      data.label = label;
      this.rename(data);
    }
  });
  fce.addListener("context_menus_remove", function(type, evt, clickType, data) {
    if (confirm("您确定要删除该节点吗？")) {
      debugger;
      this.remove(data.id);
    }
  });
};

// var fce
// window.onload = function() {
//   fce = new FCE({
//     rightMenu: [{//右键菜单

//     }],
//     toolbars: [{
//       //不写默认使用fce自带的render方法
//       render: function() {
//         return document.createElement('div')
//       },
//       icon: {
//         src: "img/xxx.png",
//         width: 12,
//         height: 12,
//       },
//       class: '', //样式

//       fce: null, //这里是fce的指针
//       id: 'point',
//       title: "指针",
//       onclick: function() {
//         //这里的this是当前bar
//       }
//     }]
//   })
//   window.fce = fce
// }

// var bar = fce.getToolbarById('id') //根据id获取组件
// bar.isShow() //true/false
// bar.hide()
// bar.show()
// bar.addClass()
// bar.removeClass() //空则为移除所有样式
//   //可以通过fire触发某事件，通过fce.on绑定某事件
// fce.on('click', function() {
//   //绑定事件
// })
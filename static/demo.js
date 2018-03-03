var fce;
window.onload = function() {
  fce = new FCE({
    el: document.getElementById("fce"),
    toolbars: [{
        name: "rectangle",
        icon: "images/rectangle.png",
        className: "fce-tool-bar",
        title: "矩形",
        exec() {}
      },
      {
        name: "rounded_rectangle",
        icon: "images/rounded_rectangle.png",
        className: "fce-tool-bar",
        title: "圆角矩形",
        exec() {}
      },
      {
        name: "choice",
        icon: "images/choice.png",
        className: "fce-tool-bar",
        title: "菱形",
        exec() {}
      },

      {
        name: "round",
        icon: "images/round.png",
        className: "fce-tool-bar",
        title: "圆形",
        exec() {
          debugger;
        }
      },
      "animation"
    ]
  });
  fce.addListener("click", function() {
    console.log("编辑器被点击！");
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
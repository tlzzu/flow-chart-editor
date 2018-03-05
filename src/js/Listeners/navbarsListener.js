export default function(navbars) {
  const self = this;
  navbars.addListener("change", function() {
    // 这里出发navbar变更事件
    const bar = arguments.length > 1 ? arguments[1] : null;
    if (!bar) return;
    self.navbars.setNavActiveBar(bar.name);
  });
}
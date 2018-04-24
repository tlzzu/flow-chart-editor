export default function(navbars) {
  const self = this;
  navbars.addListener('change', function(bar) {
    // 这里出发navbar变更事件
    if (!bar) return;
    self.navbars.setNavActiveBar(bar.name);
  });
}
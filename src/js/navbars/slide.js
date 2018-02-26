let dom = null
const render = function() {
  if (dom) return dom
  dom = document.createElement('div')
  dom.innerHTML = 'ttt'
  return dom
}

function slider() {
  this.render = render
}
export default slider
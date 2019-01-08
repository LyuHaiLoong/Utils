//———————————————判断目标值是否为DOM———————————————：
// 是DOM节点或DOM节点集合的话，返回DOM
// 否则返回typeof值

function isDOM(dom) {
  if (/\[object (HTMLCollection|HTML.+(Element)?|NodeList)\]/.test(dom)) return "DOM";
  else return typeof dom;
}
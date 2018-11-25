//———————————————DOM查找———————————————
// 查找文档节点
// x: 目标DOM元素属性，必须为字符串。不是字符串的话，直接返回x参数本身（可用于其他封装其他函数时的参数判断 ，如果参数本身已经是节点，不执行查找操作）
// y: 默认为document全局查找，可传入DOM节点或字符串，若传入字符串则先执行一遍查找y
function find(x,y = document) { // y默认参数为document
    // 第一个参数x必须为字符串，返回参数本身
    if (typeof x !== "string") return x; 
    // 如果y传入的是字符串，那么就先查找y节点
    if (typeof y === "string") y = find(y);
    // 如果x是字符串，则查找x元素 
    x.replace(/([#\.]?)(.+)/,function($0,$1,$2){ // $0为完整的x字符串，$1如有结果则为#或者.，#2为#或.后的字符串（没有#或.就是完整字符串）
        switch($1) {
          case "#":
            x =  y.querySelector($0); // ID查找，因为getElementById前缀只支持document，所以这里直接统一成querySelector
          break;
          case ".":
            x =  y.getElementsByClassName($2); // class查找
          break;
          default: // name或tagName查找
            x =  y.getElementsByTagName($2).length ? y.getElementsByTagName($2) : y.getElementsByName($2);
        }
    })
    // 返回查找后的结果x
    return x;
}
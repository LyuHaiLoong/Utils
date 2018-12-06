//———————————————————————————————————————————DOM操作———————————————————————————————————————————————————
// 改变节点style
// ele: 目标DOM节点，配合find.js使用，支持单节点操作与多节点同时操作
// attr: 目标属性名，支持输入数组，与val及boolean参数对应，实现多属性同时赋值
// val: 目标属性值，支持输入数组.与attr及boolean参数对应，实现多属性同时赋值。如果val为数组，那么attr必须为数组；
//      支持数字、px、em、%的输入（数字赋值仅支持opacity及line-height，诸如width、height等属性，如果输入数字，默认添加px单位。em、%参数输入单位）;
//      默认值为""空;
// boolean: 可选参数，如果为true则为在当前值基础上叠加val值。默认为undefined，即false;
// 提示
// 附带部分ES6新特性，如果在低版本浏览器中使用，请自行更改;（新版本才是王道！）
function changeStyle(ele, attr, val = "", boolean) {
  if (ele instanceof Array) ele = this.find(...ele);
  else ele = this.find(ele);

  if (ele.nodeType) {
    if (attr instanceof Array) {
      if (val instanceof Array) {
        for (let i = 0; i < attr.length; i++) {
          this.changeStyle(ele, attr[i], val[i], boolean);
        }
      } else {
        for (let v of attr) {
          this.changeStyle(ele, v, val, boolean);
        }
      }
    } else {
      if (
        /^(animation|transition|transform|background|box|overflow|((border-color|borderColor|bordercolor|position|float|border.*style|font-family|display|color|visibility)$))/
        .test(attr)) {
        if (boolean) throw new Error(`Invalid attribute ${attr} to add`);
        else ele.style[attr] = val;
      } else {
        // 个别属性名去-
        if (/-/g.test(attr)) {
          attr.replace(/-/, ($0, $1) => {
            attr = attr.slice(0, $1) + attr[$1 + 1].toUpperCase() + attr.slice($1 + 2);
          })
        }
        if (boolean) {
          const cur = parseFloat(getComputedStyle(ele)[attr]); // 带单位
          if (/^opacity$/.test(attr)) ele.style[attr] = cur + val;
          else if (/^lineHeight$/.test(attr)) ele.style[attr] = cur + val + (/(px|em|%)/.test(val) ? RegExp[
            "$1"] : "");
          else ele.style[attr] = cur + val + (/(em|%)/.test(val) ? RegExp["$1"] : "px");
        } else {
          if (/^opacity$/.test(attr)) ele.style[attr] = val;
          else if (/^lineHeight$/.test(attr)) ele.style[attr] = val + (/(px|em|%)/.test(val) ? RegExp["$1"] :
            "");
          else ele.style[attr] = val + (/(em|%)/.test(val) ? RegExp["$1"] : "px");
        }
      }
    }
  } else {
    for (let v of ele) {
      this.changeStyle(v, attr, val, boolean);
    }
  }
}
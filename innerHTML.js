//———————————————修改或获取DOM节点内容———————————————
// dom: 目标DOM元素，可以是目标的class、id或tagName，亦可是DOM节点或DOM节点集合。如果没有目标DOM元素的话，报错
// value: 可选参数，默认值null用于判断：
//        - 如果输入了非null的值，则给dom目标赋值；
//        - 否则获取dom目标值；
// index: 可选参数，默认不输入：
//        - value === null的情况下，输入index，获取dom下索引为index的节点的值
//        - value !== null的情况下，输入index，匹配value中索引为index的值
//         （如果是字符串就获取对应的字符），将获取值赋值给目标dom节点

function innerHTML(dom, value = null, index) {
  if (isDOM(dom) === "string") dom = find(dom);
  if (isDOM(dom) !== "DOM") error("DOM");
  if (dom.nodeType) {
    if (value !== null) {
      if (value instanceof Array) {
        dom.innerHTML = value[index];
      } else if (isDOM(value) === "DOM") {
        if (value.nodeType) {
          value = value.innerHTML.trim();
          if (index !== undefined) {
            dom.innerHTML = value[index];
          } else {
            dom.innerHTML = value;
          }
        } else {
          value = value[index].innerHTML.trim();
          dom.innerHTML = value;
        }
      } else {
        value = value + "";
        if (inedx !== undefined) {
          dom.innerHTML = value[index];
        } else {
          dom.innerHTML = value;
        }
      }
    } else {
      return index === undefined ? dom.innerHTML.trim() : dom.innerHTML.trim()[index];
    }
  } else {
    if (value !== null) {
      if (value instanceof Array) {
        if (inedx !== undefined) {
          for (let i = 0; i < dom.length; i++) {
            dom[i].innerHTML = value[index];
          }
        } else {
          for (let i = 0; i < dom.length; i++) {
            dom[i].innerHTML = value[i];
          }
        }
      } else if (isDOM(value) === "DOM") {
        if (value.nodeType) {
          value = value.innerHTML.trim();
          if (index !== undefined) {
            value = value[index];
          }
          for (const v of dom) {
            v.innerHTML = value;
          }
        } else {
          if (index !== undefined) {
            value = value[index].innerHTML.trim();
            for (const v of dom) {
              v.innerHTML = value;
            }
          } else {
            for (let i = 0; i < dom.length; i++) {
              dom[i].innerHTML = value[i].innerHTML.trim();
            }
          }
        }
      } else {
        value = value + "";
        if (index !== undefined) {
          value = value[index];
        }
        for (const v of dom) {
          v.innerHTML = value;
        }
      }
    } else {
      if (index !== undefined) return dom[index].innerHTML.trim();

      const result = [];
      for (let i = 0; i < dom.length; i++) {
        result[i] = dom[i].innerHTML.trim();
      }
      return result;
    }
  }
}
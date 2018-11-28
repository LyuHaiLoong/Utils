// ********************参数********************
// f: 对象数据中的父节点属性名;
// s: 对象数据中子节点属性名;
// x: 父元素标签默认ul;
// y: 子元素标签默认li;
// a: 父元素class;
// b: 子元素class;
// m: 子元素需要添加的图标元素;
// n: 图标元素class;
// ********************说明********************
// 根据常见无限极菜单效果制作，默认父元素内容在插入的图标标签内。如果没有相应变量值，请用输入任意判定为false的变量跳过判断，如"";
// 因为数据结构不尽相同，需要根据实际情况自行修改;

// 无限极菜单——文档树生成封装函数，支持数据类型为数组-对象（[{}]），根据实际数据模式，需要自行修改
function renderTree(data,f,s,a,b,m,n,x = "ul",y = "li") { 
    // 创建父节点
    let temp = a ? `<${x} class="${a}">` : `<${x}>`;
    // data类型为数组-对象结构，所以可以通过forEach，此处可修改
    data.forEach((val) => {
        if (val[s]) {
            if (b) { // 子节点有class 
                if (m) { // 有符号插入
                    // 符号有class
                    if (n) temp += `<${y} class="${b}"><${m} class="${n}">${val[f]}${/^(input|img)$/.test(m) ? "" : `</${m}>`}${renderTree(val[s],f,s,a,b,m,n,x,y)}</${y}>`;
                    // 符号没class
                    else temp += `<${y} class="${b}"><${m}>${val[f]}${/^(input|img)$/.test(m) ? "" : `</${m}>`}${renderTree(val[s],f,s,a,b,m,n,x,y)}</${y}>`;
                }
                // 没有符号，也就没有符号class
                else temp += `<${y} class="${b}">${val[f]}${renderTree(val[s],[f,s,x,y,a,b,m,n])}</${y}>`;
            }
            else { // 子节点无class
                if (m) { // 有符号插入
                    // 符号有class
                    if (n) temp += `<${y}><${m} class="${n}">${val[f]}${/^(input|img)$/.test(m) ? "" : `</${m}>`}${renderTree(val[s],f,s,a,b,m,n,x,y)}</${y}>`;
                    // 符号无class
                    else temp += `<${y}><${m}>${val[f]}${/^(input|img)$/.test(m) ? "" : `</${m}>`}${renderTree(val[s],f,s,a,b,m,n,x,y)}</${y}>`;
                }
                // 没有符号，也就没有符号class
                else temp += `<${y}>${val[f]}${renderTree(val[s],f,s,a,b,m,n,x,y)}</${y}>`;
            }
        }
        else {
            if (b) { // 子节点有class 
                temp += `<${y} class="${b}">${val[f]}</${y}>`;
            }
            else { // 子节点无class
                temp += `<${y}>${val[f]}</${y}>`;
            }    
        }            
    });

    temp += `</${x}>`;

    return temp;
}
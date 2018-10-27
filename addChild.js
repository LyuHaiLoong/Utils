// 父元素末尾添加节点
// ele: 父节点，支持输入变量，id值，class值，标签值。除变量外，其余值必须为字符串
// node: 添加的标签名，值为字符串
// n: 节点添加个数
// className: 节点绑定的class名，，值为字符串，多个class名用空格隔开
// boolean: 是否选中所有目标父节点。可选参数，不输入则判定为false，则只匹配选中的第一个节点
function addChild(ele, node, n, className, boolean) {
    //获取节点
    let parent = null;

    if (typeof ele !== "string") parent = ele;
    else if (ele[0] === "#") parent = document.getElementById(ele.slice(1));
    else if (ele[0] === ".") {
        if (boolean === false) parent = document.getElementsByClassName(ele.slice(1))[0];
        else parent = document.getElementsByClassName(ele.slice(1));
    } else {
        if (boolean === false) parent = docuemnt.getElementsByTagName(ele)[0];
        else parent = document.getElementsByTagNameNS(ele);
    }

    //声明用于存储父节点及子节点的对象 
    const obj = {
        "parent": parent,
        "children": []
    };

    //添加节点
    if (boolean) {
        for (let i = 0; i < parent.length; i++) {
            obj.children[i] = [];
            for (let j = 0; j < n; j++) {
                const target = document.createElement(node);
                target.className = className;
                parent[i].appendChild(target);
                obj.children[i][j] = target;
            }
        }
    } else {
        for (let i = 0; i < n; i++) {
            const target = document.createElement(node);
            target.className = className;
            parent.appendChild(target);

            obj.children.push(target);
        }
    }

    //返回参数，供动画函数调用
    return obj;
}
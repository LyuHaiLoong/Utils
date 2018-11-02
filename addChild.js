//———————————————————————————————————————————DOM操作———————————————————————————————————————————————————
// 添加节点
// ele: 父节点，支持输入变量，id值，class值，标签值。除变量外，其余值必须为字符串
// node: 添加的标签名，值为字符串
// html: 待添加节点内容
// n: 节点添加个数
// className: 节点绑定的class名，，值为字符串，多个class名用空格隔开
// boolean: 是否选中所有目标父节点。可选参数，不输入则判定为false，则只匹配选中的第一个节点
function addChild(obj) {
    //默认参数
    const parameter = {
        ele: document,
        node: "div",
        html: "",
        num: 1,
        className: "",
        boolean: false
    }

    Object.assign(parameter,obj); //参数覆盖

    //获取节点
    let parent = parameter.ele;
    const node = parameter.node,
          html = parameter.html,
          n = parameter.num,
          className = parameter.className,
          boolean = parameter.boolean;

    if (typeof parent !== "string") parent = parent;
    else if (parent[0] === "#") parent = document.getElementById(parent.slice(1));
    else if (parent[0] === ".") {
        if (boolean === false) parent = document.getElementsByClassName(parent.slice(1))[0];
        else parent = document.getElementsByClassName(parent.slice(1));
    } else {
        if (boolean === false) parent = docuemnt.getElementsByTagName(parent)[0];
        else parent = document.getElementsByTagName(parent);
    }

    //声明用于存储父节点及子节点的对象 
    const result = {
        "parent": parent,
        "children": []
    };

    //添加节点
    if (boolean) {
        for (let i = 0; i < parent.length; i++) {
            //创建容器碎片
            const fragment = document.createDocumentFragment();
            //保存子节点，用于返回值
            result.children[i] = [];

            for (let j = 0; j < n; j++) {
                const target = document.createElement(node);
                target.className = className;
                target.innerHTML = html;
                fragment.appendChild(target);
                //添加子节点到数组，用于返回值
                result.children[i][j] = target;
            }

            parent[i].appendChild(fragment)
        }
    } else {
        //创建碎片容器
        const fragment = document.createDocumentFragment();

        for (let i = 0; i < n; i++) {
            const target = document.createElement(node);
            target.className = className;
            target.innerHTML = html;
            fragment.appendChild(target);
            //添加子节点，用于返回值
            result.children[i] = target;
        }
        //将碎片容器一次性添加到父节点
        parent.appendChild(fragment);
    }

    //返回参数，供动画函数调用
    return result;
}
//———————————————DOM查找———————————————
// 查找文档节点
// x: 目标DOM元素属性，必须为字符串。不是字符串的话，直接返回x参数本身（可用于其他封装其他函数时的参数判断 ，如果参数本身已经是节点，不执行查找操作）
// y: 默认为document全局查找，可传入DOM节点或字符串，若传入字符串则先执行一遍查找y

// version 1.1
/*
function find(x, y = document) { // y默认参数为document
	// 第一个参数x必须为字符串，返回参数本身
	if (typeof x !== "string") return x;
	// 如果y传入的是字符串，那么就先查找y节点
	if (typeof y === "string") y = find(y);
	// 如果x是字符串，则查找x元素 
	x.replace(/([#\.]?)(.+)/, function($0, $1, $2) { // $0为完整的x字符串，$1如有结果则为#或者.，#2为#或.后的字符串（没有#或.就是完整字符串）
		switch ($1) {
			case "#":
				x = y.querySelector($0); // ID查找，因为getElementById前缀只支持document，所以这里直接统一成querySelector
				break;
			case ".":
				x = y.getElementsByClassName($2); // class查找
				break;
			default: // name或tagName
				x = y.getElementsByTagName($2).length ? y.getElementsByTagName($2) : y.getElementsByName($2);
		}
	})
	// 返回查找后的结果x
	return x;
}
*/

// version 1.2
//**********更新内容**********
// 1）精确参数判断
// 2）丰富查找功能，第二个参数支持节点集合。可以在多个节点下查找目标元素，返回结果相互独立的数组。返回结果不是原生节点集合数据类型
// 3）增加可选参数index，用于参数y。如果参数y为节点集合，作为索引值选择集合中的单独节点

function find(x, y = document, index) {
	//————————判断x的类型————————
	// 判断x是否为元素节点。是则直接返回
	if (x.nodeType === 1) return x;
	// 如果x不是元素节点，也不是字符串，就报错
	if (typeof x !== "string") throw new Error("Invalid parameter 1.");

	//————————判断y的类型————————
	{
		// 创建判断元素，复用
		const flag = y.toString(); // toString查看具体类型，只查看字符串、HTMLCollection、NodeList。其他类型交给原生报错
		// 字符串
		if (flag === y) {
			y = this.find(y); // 查找y，并重新赋值
			x = this.find(x, y, index); // 递归重新判断y，并将结果赋值给x（赋值给其他变量也行，如新声明个变量） 
			return x;
		}
		// HTMLCollection节点集合
		else if (flag === "[object HTMLCollection]") {
			if (index !== undefined) y = y[index]; // 如果传入了index参数，就在集合中查找目标，并给y重新赋值
			else {
				const HTMLCollectionArray = []; // 因为HTMLCollection无法合并，所以创建个空数组，用于存放查找到的每个HTMLCollection集合
				if (y.length) { // 如果不是空集合，就循环递归查找
					for (let val of y) {
						HTMLCollectionArray.push(this.find(x, val));
					}
					return HTMLCollectionArray;
				} else throw new Error("The target node has no parentNode."); // 是空集合就报错
			}
		}
		// NodeList节点集合
		else if (flag === "[object NodeList]") {
			if (index !== undefined) y = y[index]; // 如果传入了index参数，就在集合中查找目标，并给y重新赋值    	
			else {
				const NodeListArray = []; // NodeList同HTMLCollection无法合并，所以创建个空数组，用于存放查找到的每个NodeList集合
				if (y.length) { // 如果不是空集合，就循环递归查找
					for (let val of y) {
						NodeListArray.push(this.find(x, val))
					}
					return NodeListArray;
				} else throw new Error("The target node has no parentNode."); // 是空集合就报错
			}
		}
	}

	//************switch无法return打断函数执行************
	// switch(y.toString()) { 
	//   case y: // 字符串类型
	//     y = this.find(y);
	//     this.find(x,y);
	//   break; 
	//   case "[object HTMLCollection]": // HTMLCollection动态节点集合
	//     const HTMLCollectionArray = [];
	//     if (y.length) {
	//       for (let val of y) {
	//         HTMLCollectionArray.push(this.find(x,val));
	//       }
	//       return HTMLCollectionArray;
	//     }
	//     else throw new Error("Invalid variable y");
	//   break;
	//   case "[Object NodeList]": // NodeList静态节点集合
	//     const NodeListArray = [];
	//     if (y.length) {
	//       for (let val of y) {
	//         NodeListArray.push(this.find(x,val))
	//       }
	//       return NodeListArray;
	//     }
	//     else throw new Error("Invalid variable y");
	//   break;
	// }

	//————————查找目标元素x————————
	// 判断x输入的查找字符串类型，调用原生方法查找
	x.replace(/([#.]?)(.+)/, function($0, $1, $2) {
		switch ($1) {
			case "#":
				x = y.querySelector($0);
				break;
			case ".":
				x = y.getElementsByClassName($2);
				break;
			default:
				x = y.getElementsByTagName($2).length ? y.getElementsByTagName($2) : y.getElementsByName($2);
		}
	})

	//————————返回结果x————————
	return x;
}
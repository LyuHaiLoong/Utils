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
/*
function find(x, y = document, i) {
	//————————判断x的类型————————
	// 判断x是否为元素节点。是则直接返回
	if (/^\[object (HTMLCollection|NodeList|HTML.+Element)\]$/.test(x.toString())) return x;
	// 如果x不是元素节点，也不是字符串，就报错
	if (typeof x !== "string") throw new Error("Invalid parameter 1.");

	//————————判断y的类型————————
	{
		// 创建判断元素，复用
		const flag = y.toString(); // toString查看具体类型，只查看字符串、HTMLCollection、NodeList。其他类型交给原生报错
		// 字符串
		if (flag === y) {
			y = this.find(y); // 查找y，并重新赋值
			x = this.find(x, y, i); // 递归重新判断y，并将结果赋值给x（赋值给其他变量也行，如新声明个变量） 
			return x;
		}
		// HTMLCollection节点集合
		else if (flag === "[object HTMLCollection]") {
			if (i !== undefined) y = y[i]; // 如果传入了index参数，就在集合中查找目标，并给y重新赋值
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
			if (i !== undefined) y = y[i]; // 如果传入了index参数，就在集合中查找目标，并给y重新赋值    	
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
*/

// version 1.3.1
//**********更新内容**********
// 1）增加对参数x的判断，通过输入数组形式的参数x，支持在同一y节点下查找不同x，或在不同y下查找不同x，或在不同y下查找同一x

function find(x, y = document, i) {
	if (/^\[object (HTMLCollection|NodeList|HTML.+Element)\]$/.test(x.toString())) return x;
	if (typeof x !== "string") {
		if (x instanceof Array) {
			const DOMXArray = [];
			if (y instanceof Array) {
				for (let j = 0; j < x.length; j++) {
					DOMXArray[i] = this.find(x[j], y[j], i); // 还没执行到i判断，所以递归时把i也传参
				}
			} else {
				for (let j = 0; j < x.length; j++) {
					DOMXArray[i] = this.find(x[j], y, i);
				}
			}
			return DOMXArray;
		} else throw new Error("Invalid parameter 1.");
	}
	if (y instanceof Array) {
		if (i !== undefined) {
			y = y[i];
			x = this.find(x, y[i]);
			return x;
		} else {
			if (y.length) {
				const DOMYArray = [];
				for (let i = 0; i < y.length; i++) {
					const _y = this.find(y[i]); // for动态循环，每次循环都重新获取y的length值。改为_y
					DOMArray[i] = this.find(x, _y);
				}
				return DOMArray;
			} else throw new Error("Invalid parameter 2.")
		}
	}
	const flag = y.toString();
	if (flag === y) {
		if (i !== undefined) y = this.find(y)[i];
		else {
			y = this.find(y);
			x = this.find(x, y);
			return x;
		}
	} else if (flag === "[object HTMLCollection]") {
		if (i !== undefined) y = y[i];
		else {
			if (y.length) {
				const HTMLCollectionArray = [];
				for (let i = 0; i < y.length; i++) { // 这种循环写法，运行时间相对更稳定，平均用时更短，性能较好
					// if (!y[i].nodeType) continue; //如果用for-in写的话，HTMLCollection的length会被枚举，同理NodeList也一样。
					// for-of不会枚举length
					HTMLCollectionArray[i] = this.find(x, y[i]);
				}
				return HTMLCollectionArray;
			} else throw new Error("The target node has no parentNode.");
		}
	} else if (flag === "[object NodeList]") {
		if (i !== undefined) y = y[i];
		else {
			if (y.length) {
				const NodeListArray = [];
				for (let i = 0; i < y.length; i++) {
					NodeListArray[i] = this.find(x, y[i])
				}
				return NodeListArray;
			} else throw new Error("The target node has no parentNode.");
		}
	}

	x.replace(/([#.]?)(.+)/, ($0, $1, $2) => {
		switch ($1) {
			case "#":
				x = y.querySelector($0);
				break;
			case ".":
				x = y.getElementsByClassName($2);
				break;
			default:
				x = y.getElementsByTagName($2).length ? y.getElementsByTagName($2) : document.getElementsByName($2);
		}
	})

	return x;
}

// version 1.3.2
//**********更新内容**********
// 1）作为1.3.1的简化版，取消了对x、y的数组判断，在书写逻辑时对结构调整更便捷。
// 2）增加了可选参数b，b为最终结果的索引值。在于其他方法联调时，数组形式的传参更友好
// 3）修正getElementsByName的书写错误，getElementsByName前缀只能为document
// 4）对报错处理作出优化，指向更明确
// 5）优化了书写结构

function find(x, y = document, a, b) { // x為目標，y為目標查找的祖先節點，a為y的索引，b為x的索引
	// 判断x
	if (/^\[object (HTML.+|NodeList)\]$/.test(x.toString())) return x;
	if (typeof x !== "string") throw new Error(`The parameter ${x} must be DOM or String`);

	// 判断y
	if (typeof y === "string") y = this.find(y);

	const flag = y.toString();
	if (/^\[object HTMLCollection\]$/.test(flag)) {
		if (y.length) {
			if (a) y = y[a];
			else {
				const HTMLCollectionArray = [];
				for (let i = 0; i < y.length; i++) {
					HTMLCollectionArray[i] = this.find(x, y[i], a, b);
				}
				return HTMLCollectionArray;
			}
		} else throw new Error(`Invalid parameter ${y}`);
	} else if (/^\[object NodeList\]$/.test(flag)) {
		if (y.length) {
			if (a) y = y[a];
			else {
				const NodeListArray = [];
				for (let i = 0; i < y.length; i++) {
					NodeListArray[i] = this.find(x, y[i], a, b);
				}
				return NodeListArray;
			}
		} else throw new Error(`Invalid parameter ${y}`);
	} else if (/^\[object HTML(.+)\]$/.test(flag)) {
		if (RegExp.$1 !== "Document" && a) throw new Error(`Error index: the length of parameter ${y} is 1.`)
	} else {
		throw new Error(`Invalid parameter ${y}`);
	}

	x.replace(/([.#])?(.+)/, ($0, $1, $2) => {
		switch ($1) {
			case "#":
				x = y.querySelector($0);
				break;
			case ".":
				x = typeof b === "number" ? y.getElementsByClassName($2)[b] : y.getElementsByClassName($2);
				break;
			default:
				x = y.getElementsByTagName($2).length ? (typeof b === "number" ? y.getElementsByTagName($2)[b] : y.getElementsByTagName(
					$2)) : (typeof b === "number" ? document.getElementsByName($2)[b] : document.getElementsByName($2));
		}
	})

	return x;
}
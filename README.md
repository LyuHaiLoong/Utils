# Utils
函数封装库

根据日常开发及demo制作时的使用，封装的各种小方法
<br>
发现bug欢迎提醒~

**不定时更新**


> ### [requestAnimation](https://github.com/LyuHaiLoong/Utils/blob/master/requestAnimation.js)

- 根据requestAnimationFrame封装的动画方法
- 支持width、height、position属性、opacity等涉及数值改变的运动
- 不支持transform

> ### [addChild](https://github.com/LyuHaiLoong/Utils/blob/master/addChild.js)

- 根据appendChild封装的末尾添加节点方法
- 支持单节点或多节点同时添加
- 仅能添加className，添加其他属性值需调用返回值

> ### [debounce](https://github.com/LyuHaiLoong/Utils/blob/master/debounce.js)
- UNDERSCORE.JS内封装的函数防抖方法

> ### [throttle](https://github.com/LyuHaiLoong/Utils/blob/master/throttle.js)
- UNDERSCORE.JS内封装的函数节流方法

> ### [find](https://github.com/LyuHaiLoong/Utils/blob/master/find.js)
- DOM节点查找方法
- 支持ID、calssName、tagName、name查找
- 添加多个版本，譬如恶心版、极端情况版、常用版……

> ### [renderTree](https://github.com/LyuHaiLoong/Utils/blob/master/renderTree.js)
- 无限极菜单树生成方法
- 因为数据结构各有不同，需要根据实际数据情况酌情调改。目前只支持[{}]数组-对象类型结构，对象键值对2对

> ### [changeStyle](https://github.com/LyuHaiLoong/Utils/blob/master/changeStyle.js)
- 改变DOM节点style属性方法
- 与find.js关联，可自行修改
- 支持多节点、多属性同时赋值
- 支持直接赋值或在当前值基础上叠加

> ### [isDOM](https://github.com/LyuHaiLoong/Utils/blob/master/isDOM.js)
- 判断参数是否为DOM节点

> ### [error](https://github.com/LyuHaiLoong/Utils/blob/master/error.js)
- 报错控制
- 根据需要自行修改

> ### [innerHTML](https://github.com/LyuHaiLoong/Utils/blob/master/innerHTML.js)
- 获取或修改节点的innerHTML
- 与find、isDOM、error关联
- 支持多节点获取或修改
- 支持查找匹配，然后获取或修改

> ### [isEqual](https://github.com/LyuHaiLoong/Utils/blob/master/isEqual.js)
- 根据目标key值，判断[{},{}...]格式下的新、旧两组数据是否完全相等
- 作用后结果包含——两组数据的相互不重复项、更新后的新数据、含有删除及添加项的对象

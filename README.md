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

> ### [renderTree](https://github.com/LyuHaiLoong/Utils/blob/master/renderTree.js)
- 无限极菜单树生成方法
- 因为数据结构各有不同，需要根据实际数据情况酌情调改。目前只支持[{}]数组-对象类型结构，对象键值对2对

> ### [changeStyle](https://github.com/LyuHaiLoong/Utils/blob/master/changeStyle.js)
- 改变DOM节点style属性方法
- 与find.js关联，可自行修改
- 支持多节点、多属性同时赋值
- 支持直接赋值或在当前值基础上叠加

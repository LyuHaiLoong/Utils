//———————————————根据目标key值，判断[{},{}...]格式下的新、旧两组是否完全相等———————————————
// a: 新数据
// b: 旧数据
// key: 用于判断对象相等的唯一key值
// flag：作用结果是否改变源数据
// 作用结果：
//     ——a：两组数据中的所有不重复项，将赋值给a（包括b中有但a中没有，以及a中有但b中没有的对象）
//     ——b：保留a与b的重复项，删除b中有但a中没有的项，添加a中有但b中没有的项
//     ——返回值：对象，包含add及del
//            ——add：a中添加到b中不重复项
//            ——del：b中删除的不重复项
// 关于作用结果：
//     ——因为参数a、b均为引用数据，函数默认直接改变了源数据。
//     ——增加了不改变源数据的判断，返回结果为更改后的数据a、b及result。但是返回结果最好还是根据需要修改

function isEqual(a, b, key, flag) { // 是否改变源数据，默认改变
  if (!(a instanceof Array) || !(b instanceof Array)) throw new Error(
    "Invalid Paramters: The parameters must be Array");

  // 不改变源数据
  if (flag) {
    a = JSON.parse(JSON.stringify(a));
    b = JSON.parse(JSON.stringify(b));
  }
  // 返回结果
  let result = {
    add: [],
    del: []
  };
  // 特殊情况判断
  if (!a.length) return result;
  if (!b.length) {
    b = JSON.parse(JSON.stringify(a));
    result.add = b;

    return result;
  }

  const obj = {}; // 存放a的索引
  let len = a.length; // 保存a的初试长度，用于最后的切割

  // 添加a的key值为obj的key
  for (let i = 0; i < a.length; i++) {
    obj[a[i][key]] = i;
  }
  // b去重
  for (let i = b.length - 1; i >= 0; i--) {
    if (obj[b[i][key]] === undefined) { // b中有但a中没有
      // 将b中的不重复项添加到a及result.del中，然后b中删除不重复项
      a.push(b[i]);
      result.del.push(b[i]);
      b.splice(i, 1);
    } else {
      // 删除重复项索引
      delete obj[b[i][key]];
    }
  }
  // a去重,并且将不重复项添加到b与result.add中
  if (Object.values(obj).length) {
    const values = Object.values(obj);
    for (const i of values) {
      b.push(a[i]);
      a.push(a[i]);
      result.add.push(a[i]);
    }
  }
  // 切割a,splice改变原数组
  a.splice(0, len);

  if (flag) {
    return {
      newA: a,
      newB: b,
      result: result
    }
  }
  return result;
}